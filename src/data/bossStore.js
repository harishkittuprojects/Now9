// Central Store for Boss of House / Bigg Boss Telugu Housemates
// Connects Admin Housemates Manager <-> Citizen Mobile Voting & Contestant Roster
import { recordCustomerActivity } from './customerActivityStore';

export const BOSS_STORAGE_KEY = 'now9_boss_housemates_v1';
export const BOSS_EVENT = 'now9_boss_housemates_updated';

export const INITIAL_HOUSEMATES = [
  { id: 'h1', name: 'Prerana', teluguName: 'ప్రేరణ', role: 'Actress', status: 'Safe', avatar: '👑', votes: 94250, percent: 31.4, isNominated: false },
  { id: 'h2', name: 'Nikhil', teluguName: 'నిఖిల్', role: 'YouTuber', status: 'Safe', avatar: '⚡', votes: 81400, percent: 27.1, isNominated: false },
  { id: 'h3', name: 'Vishnupriya', teluguName: 'విష్ణుప్రియ', role: 'Anchor', status: 'Nominated', avatar: '🌟', votes: 58900, percent: 19.6, isNominated: true },
  { id: 'h4', name: 'Gautham', teluguName: 'గౌతమ్', role: 'Doctor/Actor', status: 'Danger Zone', avatar: '🔥', votes: 41200, percent: 13.7, isNominated: true },
  { id: 'h5', name: 'Teja', teluguName: 'తేజ', role: 'Content Creator', status: 'Nominated', avatar: '🎭', votes: 24250, percent: 8.2, isNominated: true },
];

function recalculatePercentages(list) {
  const totalVotes = list.reduce((sum, h) => sum + (h.votes || 0), 0);
  return list.map(h => ({
    ...h,
    percent: totalVotes > 0 ? Math.round(((h.votes || 0) / totalVotes) * 1000) / 10 : 0
  }));
}

export function getPublishedHousemates() {
  if (typeof window === 'undefined') return INITIAL_HOUSEMATES;
  try {
    const raw = localStorage.getItem(BOSS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BOSS_STORAGE_KEY, JSON.stringify(INITIAL_HOUSEMATES));
      return INITIAL_HOUSEMATES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_HOUSEMATES;
  } catch (e) {
    return INITIAL_HOUSEMATES;
  }
}

export function addHousemate({ name, teluguName = '', role = 'Contestant', status = 'Nominated', avatar = '🌟' }) {
  if (typeof window === 'undefined') return null;
  const current = getPublishedHousemates();
  
  const isNominated = status === 'Nominated' || status === 'Danger Zone';
  const newHousemate = {
    id: `h_${Date.now()}`,
    name: name.trim(),
    teluguName: teluguName.trim() || name.trim(),
    role: role.trim() || 'Housemate',
    status: status || 'Nominated',
    avatar: avatar || '🌟',
    votes: 0,
    percent: 0,
    isNominated: isNominated
  };

  const updated = recalculatePercentages([...current, newHousemate]);
  try {
    localStorage.setItem(BOSS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOSS_EVENT, { detail: { type: 'added', item: newHousemate, list: updated } }));
  } catch (e) {}

  return newHousemate;
}

export function updateHousemate(id, updates) {
  if (typeof window === 'undefined') return;
  const current = getPublishedHousemates();
  const updatedRaw = current.map(h => {
    if (h.id === id) {
      const nextStatus = updates.status !== undefined ? updates.status : h.status;
      const isNom = nextStatus === 'Nominated' || nextStatus === 'Danger Zone';
      return { ...h, ...updates, isNominated: isNom };
    }
    return h;
  });
  const updated = recalculatePercentages(updatedRaw);
  try {
    localStorage.setItem(BOSS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOSS_EVENT, { detail: { type: 'updated', id, list: updated } }));
  } catch (e) {}
  return updated;
}

export function deleteHousemate(id) {
  if (typeof window === 'undefined') return;
  const current = getPublishedHousemates();
  const filtered = current.filter(h => h.id !== id);
  const updated = recalculatePercentages(filtered);
  try {
    localStorage.setItem(BOSS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOSS_EVENT, { detail: { type: 'deleted', id, list: updated } }));
  } catch (e) {}
  return updated;
}

export function resetHousemateVotes() {
  if (typeof window === 'undefined') return;
  const current = getPublishedHousemates();
  const resetList = current.map(h => ({ ...h, votes: 0, percent: 0 }));
  try {
    localStorage.setItem(BOSS_STORAGE_KEY, JSON.stringify(resetList));
    window.dispatchEvent(new CustomEvent(BOSS_EVENT, { detail: { type: 'reset', list: resetList } }));
  } catch (e) {}
  return resetList;
}

export function voteForHousemate(id) {
  if (typeof window === 'undefined') return;
  const current = getPublishedHousemates();
  let votedPerson = null;
  const updatedRaw = current.map(h => {
    if (h.id === id) {
      votedPerson = h;
      return { ...h, votes: (h.votes || 0) + 1 };
    }
    return h;
  });
  const updated = recalculatePercentages(updatedRaw);
  try {
    localStorage.setItem(BOSS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOSS_EVENT, { detail: { type: 'voted', id, list: updated } }));
    
    if (votedPerson) {
      recordCustomerActivity({
        type: 'boss-house',
        title: 'Boss of House Elimination Vote',
        detail: `Citizen voted to save "${votedPerson.name} (${votedPerson.teluguName || votedPerson.name})" from elimination`,
        location: 'Citizen App (Boss of House)',
        icon: votedPerson.avatar || '👑',
        badgeColor: 'rose',
        badgeText: 'Boss of House'
      });
    }
  } catch (e) {}
  return updated;
}

export function subscribeHousemates(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => {
    callback(getPublishedHousemates());
  };
  window.addEventListener(BOSS_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(BOSS_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
