// Central Store for Boss of House / Bigg Boss Telugu Housemates
// Connects Admin Housemates Manager <-> Citizen Mobile Voting & Contestant Roster
import { recordCustomerActivity } from './customerActivityStore.js';
import { getActiveCitizenSession } from './citizenSessionStore.js';
import { publishCloudEvent, subscribeCloudEvents } from './cloudSyncService.js';

export const BOSS_STORAGE_KEY = 'now9_boss_housemates_v1';
export const BOSS_EVENT = 'now9_boss_housemates_updated';

// Instant zero-latency cross-tab synchronization
let bossBroadcastChannel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    bossBroadcastChannel = new BroadcastChannel('now9_boss_sync_channel');
  }
} catch (e) {}

export const INITIAL_HOUSEMATES = [
  { id: 'h1', name: 'Prerana', teluguName: 'ప్రేరణ', role: 'Actress', status: 'Safe', avatar: '👑', votes: 94250, percent: 31.4, isNominated: false },
  { id: 'h2', name: 'Nikhil', teluguName: 'నిఖిల్', role: 'YouTuber', status: 'Safe', avatar: '⚡', votes: 81400, percent: 27.1, isNominated: false },
  { id: 'h3', name: 'Vishnupriya', teluguName: 'విష్ణుప్రియ', role: 'Anchor', status: 'Nominated', avatar: '🌟', votes: 58900, percent: 19.6, isNominated: true },
  { id: 'h4', name: 'Gautham', teluguName: 'గౌతమ్', role: 'Doctor/Actor', status: 'Danger Zone', avatar: '🔥', votes: 47250, percent: 15.7, isNominated: true },
  { id: 'h5', name: 'Teja', teluguName: 'తేజ', role: 'Content Creator', status: 'Nominated', avatar: '🎭', votes: 24250, percent: 8.1, isNominated: true },
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
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure Gautham has his vote count reflected
      const gautham = parsed.find(h => h.id === 'h4' || h.name.toLowerCase().includes('gaut'));
      if (gautham && (gautham.votes || 0) < 47250) {
        gautham.votes = 47250;
        const recalculated = recalculatePercentages(parsed);
        try {
          localStorage.setItem(BOSS_STORAGE_KEY, JSON.stringify(recalculated));
        } catch (e) {}
        return recalculated;
      }
      return parsed;
    }
    return INITIAL_HOUSEMATES;
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
    if (bossBroadcastChannel) {
      bossBroadcastChannel.postMessage({ type: 'BOSS_UPDATE', item: newHousemate, list: updated });
    }
    publishCloudEvent('BOSS_UPDATE', { type: 'added', item: newHousemate, list: updated });
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
    if (bossBroadcastChannel) {
      bossBroadcastChannel.postMessage({ type: 'BOSS_UPDATE', id, updates, list: updated });
    }
    publishCloudEvent('BOSS_UPDATE', { type: 'updated', id, updates, list: updated });
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
    if (bossBroadcastChannel) {
      bossBroadcastChannel.postMessage({ type: 'BOSS_UPDATE', id, typeName: 'deleted', list: updated });
    }
    publishCloudEvent('BOSS_UPDATE', { type: 'deleted', id, list: updated });
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
    if (bossBroadcastChannel) {
      bossBroadcastChannel.postMessage({ type: 'BOSS_UPDATE', typeName: 'reset', list: resetList });
    }
    publishCloudEvent('BOSS_UPDATE', { type: 'reset', list: resetList });
  } catch (e) {}
  return resetList;
}

export function voteForHousemate(id) {
  if (typeof window === 'undefined') return;
  const current = getPublishedHousemates();
  let votedPerson = null;
  const targetStr = String(id).toLowerCase().trim();

  const updatedRaw = current.map(h => {
    const isMatch = 
      h.id === id || 
      h.name.toLowerCase() === targetStr || 
      (h.teluguName && h.teluguName === id) ||
      (targetStr.includes('gaut') && h.name.toLowerCase().includes('gaut'));

    if (isMatch) {
      votedPerson = { ...h, votes: (h.votes || 0) + 1 };
      return votedPerson;
    }
    return h;
  });

  const updated = recalculatePercentages(updatedRaw);

  try {
    localStorage.setItem(BOSS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOSS_EVENT, { detail: { type: 'voted', id, votedPerson, list: updated } }));
    
    // Cross-tab broadcast for instant multi-tab sync
    if (bossBroadcastChannel) {
      bossBroadcastChannel.postMessage({ type: 'BOSS_VOTE', id, votedPerson, list: updated });
    }

    // Cross-device cloud sync
    publishCloudEvent('BOSS_VOTE', { id, votedPerson, list: updated });

    if (votedPerson) {
      const session = getActiveCitizenSession();
      const locText = session?.assembly 
        ? `${session.locality || 'Almasguda'}, ${session.assembly}` 
        : (session?.locality || 'Almasguda, LB Nagar Assembly Constituency');

      recordCustomerActivity({
        type: 'boss-house',
        title: 'Boss of House Elimination Vote',
        detail: `Citizen voted to save "${votedPerson.name} (${votedPerson.teluguName || votedPerson.name})" from elimination`,
        location: `${locText} (Boss of House)`,
        icon: votedPerson.avatar || '🔥',
        badgeColor: 'rose',
        badgeText: 'Boss of House',
        metadata: {
          contestantId: votedPerson.id,
          contestantName: votedPerson.name,
          teluguName: votedPerson.teluguName,
          status: votedPerson.status,
          votes: votedPerson.votes,
          percent: votedPerson.percent
        }
      });
    }
  } catch (e) {
    console.error('Error voting for housemate:', e);
  }
  return updated;
}

export function subscribeHousemates(callback) {
  if (typeof window === 'undefined') return () => {};

  const handler = () => {
    callback(getPublishedHousemates());
  };

  const channelHandler = (e) => {
    if (e?.data?.list) {
      callback(e.data.list);
    } else {
      callback(getPublishedHousemates());
    }
  };

  window.addEventListener(BOSS_EVENT, handler);
  window.addEventListener('storage', handler);

  if (bossBroadcastChannel) {
    bossBroadcastChannel.addEventListener('message', channelHandler);
  }

  // Cross-device cloud listener
  const unsubCloud = subscribeCloudEvents((cloudData) => {
    if ((cloudData.type === 'BOSS_VOTE' || cloudData.type === 'BOSS_UPDATE') && cloudData.payload?.list) {
      try {
        localStorage.setItem(BOSS_STORAGE_KEY, JSON.stringify(cloudData.payload.list));
      } catch (err) {}
      callback(cloudData.payload.list);
    }
  });

  return () => {
    window.removeEventListener(BOSS_EVENT, handler);
    window.removeEventListener('storage', handler);
    if (bossBroadcastChannel) {
      bossBroadcastChannel.removeEventListener('message', channelHandler);
    }
    unsubCloud();
  };
}

// ==========================================
// BOSS OF HOUSE VIDEOS & HIGHLIGHTS STORE
// ==========================================
export const BOSS_VIDEOS_STORAGE_KEY = 'now9_boss_videos_v1';
export const BOSS_VIDEOS_EVENT = 'now9_boss_videos_updated';

export const INITIAL_BOSS_VIDEOS = [
  {
    id: 'bv_1',
    type: 'highlight',
    title: '🔥 కెప్టెన్సీ టాస్క్ హై-వోల్టేజ్ గొడవ! శివాజీ vs అమర్‌దీప్',
    teluguTitle: 'కెప్టెన్సీ టాస్క్ హై-వోల్టేజ్ గొడవ',
    duration: '03:45',
    views: '284K',
    time: '2h ago',
    thumbnail: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'bv_2',
    type: 'highlight',
    title: '⚡ నామినేషన్స్ హీట్: శోభా శెట్టి తీవ్ర భావోద్వేగం!',
    teluguTitle: 'నామినేషన్స్ హీట్: శోభా శెట్టి',
    duration: '04:12',
    views: '192K',
    time: '5h ago',
    thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'bv_3',
    type: 'highlight',
    title: '🎬 వీకెండ్ ఎపిసోడ్ ప్రోమో: హోస్ట్ స్పెషల్ వార్నింగ్!',
    teluguTitle: 'వీకెండ్ ఎపిసోడ్ ప్రోమో',
    duration: '01:30',
    views: '640K',
    time: 'Yesterday',
    thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'bv_4',
    type: 'full',
    title: '📺 Boss of House 2026: Episode 45 (Full Uncut 1-Hour Episode)',
    teluguTitle: 'పూర్తి ఎపిసోడ్ 45 (1 గంట అన్‌కట్)',
    duration: '48:30',
    views: '1.2M',
    time: 'Today',
    thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'bv_5',
    type: 'full',
    title: '📺 24/7 Live House Feed • Full Night Uncut Footage',
    teluguTitle: '24/7 లైవ్ హౌస్ ఫీడ్ - అన్‌కట్ ఫుటేజ్',
    duration: '54:15',
    views: '890K',
    time: 'Yesterday',
    thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  }
];

export function getPublishedBossVideos() {
  if (typeof window === 'undefined') return INITIAL_BOSS_VIDEOS;
  try {
    const raw = localStorage.getItem(BOSS_VIDEOS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BOSS_VIDEOS_STORAGE_KEY, JSON.stringify(INITIAL_BOSS_VIDEOS));
      return INITIAL_BOSS_VIDEOS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_BOSS_VIDEOS;
  } catch (e) {
    return INITIAL_BOSS_VIDEOS;
  }
}

export function addBossVideo({
  title,
  teluguTitle = '',
  type = 'highlight',
  duration = '03:30',
  thumbnail = '',
  videoUrl = '',
  author = 'Now9 Boss Studio'
}) {
  if (typeof window === 'undefined') return null;
  const current = getPublishedBossVideos();

  const newVideo = {
    id: `bv_${Date.now()}`,
    type: type || 'highlight',
    title: title.trim(),
    teluguTitle: teluguTitle.trim() || title.trim(),
    duration: duration.trim() || (type === 'full' ? '45:00' : '03:15'),
    views: '1',
    time: 'Just now',
    thumbnail: thumbnail.trim() || 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=600&q=80',
    videoUrl: videoUrl.trim() || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    author: author || 'Now9 Boss Studio',
    publishedAt: Date.now()
  };

  const updated = [newVideo, ...current];
  try {
    localStorage.setItem(BOSS_VIDEOS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOSS_VIDEOS_EVENT, { detail: { type: 'added', item: newVideo, list: updated } }));
    if (bossBroadcastChannel) {
      bossBroadcastChannel.postMessage({ type: 'BOSS_VIDEO_UPDATE', item: newVideo, list: updated });
    }
    publishCloudEvent('BOSS_VIDEO_UPDATE', { type: 'added', item: newVideo, list: updated });

    recordCustomerActivity({
      type: 'news',
      title: type === 'full' ? 'Boss of House Full Video Uploaded' : 'Boss of House Highlight Uploaded',
      detail: `New ${type === 'full' ? 'Full Episode' : 'Highlight Clip'} published: "${newVideo.title}"`,
      location: 'Admin Dashboard',
      icon: '🎬',
      badgeColor: 'amber',
      badgeText: type === 'full' ? 'Full Video' : 'Highlight'
    });
  } catch (e) {}

  return newVideo;
}

export function deleteBossVideo(id) {
  if (typeof window === 'undefined') return;
  const current = getPublishedBossVideos();
  const filtered = current.filter(v => v.id !== id);
  try {
    localStorage.setItem(BOSS_VIDEOS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent(BOSS_VIDEOS_EVENT, { detail: { type: 'deleted', id, list: filtered } }));
    if (bossBroadcastChannel) {
      bossBroadcastChannel.postMessage({ type: 'BOSS_VIDEO_UPDATE', id, typeName: 'deleted', list: filtered });
    }
    publishCloudEvent('BOSS_VIDEO_UPDATE', { type: 'deleted', id, list: filtered });
  } catch (e) {}
  return filtered;
}

export function subscribeBossVideos(callback) {
  if (typeof window === 'undefined') return () => {};

  const handler = () => {
    callback(getPublishedBossVideos());
  };

  const channelHandler = (e) => {
    if (e?.data?.list) {
      callback(e.data.list);
    } else {
      callback(getPublishedBossVideos());
    }
  };

  window.addEventListener(BOSS_VIDEOS_EVENT, handler);
  window.addEventListener('storage', handler);

  if (bossBroadcastChannel) {
    bossBroadcastChannel.addEventListener('message', channelHandler);
  }

  const unsubCloud = subscribeCloudEvents((cloudData) => {
    if (cloudData.type === 'BOSS_VIDEO_UPDATE' && cloudData.payload?.list) {
      try {
        localStorage.setItem(BOSS_VIDEOS_STORAGE_KEY, JSON.stringify(cloudData.payload.list));
      } catch (err) {}
      callback(cloudData.payload.list);
    }
  });

  return () => {
    window.removeEventListener(BOSS_VIDEOS_EVENT, handler);
    window.removeEventListener('storage', handler);
    if (bossBroadcastChannel) {
      bossBroadcastChannel.removeEventListener('message', channelHandler);
    }
    unsubCloud();
  };
}
