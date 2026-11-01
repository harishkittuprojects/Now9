// Central Customer / Citizen Live Activity Store for NowNine
// Captures and streams EVERY customer action from the website directly to the Admin Dashboard
// Bridges real-time citizen tasks between mobile phones and laptops across the cloud
import { publishCloudEvent, subscribeCloudEvents } from './cloudSyncService.js';

export const CUSTOMER_ACTIVITY_KEY = 'now9_customer_activities_v1';
export const CUSTOMER_ACTIVITY_EVENT = 'now9_customer_activity_event';

// Initial sample activities so admin always has realistic context on first load
export const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-901',
    type: 'vote',
    title: 'Constituency Ballot Cast',
    detail: 'Citizen cast official ballot for TDP (NDA) in Visakhapatnam East',
    location: 'Rushikonda, Visakhapatnam',
    time: 'Just now',
    timestamp: Date.now() - 15000,
    icon: '🗳️',
    badgeColor: 'emerald',
    badgeText: 'Electoral Vote'
  },
  {
    id: 'ACT-902',
    type: 'survey',
    title: 'Governance Survey Answered',
    detail: 'Citizen answered Priority #1: "నాయకత్వంపై నమ్మకం (Leadership Trust)"',
    location: 'Visakhapatnam Constituency',
    time: '1m ago',
    timestamp: Date.now() - 65000,
    icon: '📊',
    badgeColor: 'amber',
    badgeText: '5-Question Pulse'
  },
  {
    id: 'ACT-903',
    type: 'boss-house',
    title: 'Boss of House Elimination Vote',
    detail: 'Citizen voted to save "Vishnupriya (విష్ణుప్రియ)" from elimination',
    location: 'Jubilee Hills, Hyderabad',
    time: '2m ago',
    timestamp: Date.now() - 130000,
    icon: '👑',
    badgeColor: 'rose',
    badgeText: 'Boss of House'
  },
  {
    id: 'ACT-904',
    type: 'live',
    title: 'Live Debate Joined',
    detail: 'Citizen tuned into live broadcast: "2026 ఎన్నికలు: ఎవరికి అవకాశాలు?"',
    location: 'Beach Road, Visakhapatnam',
    time: '4m ago',
    timestamp: Date.now() - 240000,
    icon: '🔴',
    badgeColor: 'red',
    badgeText: 'Live Broadcast'
  },
  {
    id: 'ACT-905',
    type: 'news',
    title: 'News Article Read',
    detail: 'Citizen opened breaking report: "ఆంధ్రప్రదేశ్ అసెంబ్లీ నియోజకవర్గాల్లో ముమ్మర ప్రచారం"',
    location: 'MVP Colony, Visakhapatnam',
    time: '7m ago',
    timestamp: Date.now() - 420000,
    icon: '📰',
    badgeColor: 'blue',
    badgeText: 'News Reader'
  },
  {
    id: 'ACT-906',
    type: 'location',
    title: 'GPS Location Verified',
    detail: 'Citizen geofence verified in Visakhapatnam District (Rushikonda / East Assembly)',
    location: 'Rushikonda, Visakhapatnam',
    time: '10m ago',
    timestamp: Date.now() - 600000,
    icon: '📍',
    badgeColor: 'sky',
    badgeText: 'GPS Verified'
  }
];

export function getCustomerActivities() {
  if (typeof window === 'undefined') return INITIAL_ACTIVITIES;
  try {
    const raw = localStorage.getItem(CUSTOMER_ACTIVITY_KEY);
    if (!raw) {
      localStorage.setItem(CUSTOMER_ACTIVITY_KEY, JSON.stringify(INITIAL_ACTIVITIES));
      return INITIAL_ACTIVITIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ACTIVITIES;
  } catch (e) {
    return INITIAL_ACTIVITIES;
  }
}

let counter = Date.now() % 10000;

export function recordCustomerActivity({
  type = 'general',
  title = 'Customer Interaction',
  detail = '',
  location = 'Citizen App',
  icon = '⚡',
  badgeColor = 'amber',
  badgeText = 'Activity',
  metadata = {}
}) {
  if (typeof window === 'undefined') return null;

  counter += 1;
  const newActivity = {
    id: `ACT-${counter}`,
    type,
    title,
    detail,
    location,
    time: 'Just now',
    timestamp: Date.now(),
    icon,
    badgeColor,
    badgeText,
    metadata
  };

  const current = getCustomerActivities();
  // Filter out any existing activity with same id
  const updated = [newActivity, ...current.filter(a => a.id !== newActivity.id)].slice(0, 80);

  try {
    localStorage.setItem(CUSTOMER_ACTIVITY_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent(CUSTOMER_ACTIVITY_EVENT, { detail: { newActivity, activities: updated } })
    );

    // Cross-device cloud publish
    publishCloudEvent('CUSTOMER_ACTIVITY', newActivity);
  } catch (e) {
    console.error('Failed to save customer activity:', e);
  }

  return newActivity;
}

export function clearCustomerActivities() {
  if (typeof window === 'undefined') return [];
  try {
    localStorage.setItem(CUSTOMER_ACTIVITY_KEY, JSON.stringify([]));
    window.dispatchEvent(
      new CustomEvent(CUSTOMER_ACTIVITY_EVENT, { detail: { newActivity: null, activities: [] } })
    );
  } catch (e) {}
  return [];
}

export function subscribeCustomerActivities(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => {
    callback(getCustomerActivities());
  };
  window.addEventListener(CUSTOMER_ACTIVITY_EVENT, handler);
  window.addEventListener('storage', handler);

  // Cross-device cloud sync listener
  const unsubCloud = subscribeCloudEvents((cloudData) => {
    if (cloudData.type === 'CUSTOMER_ACTIVITY' && cloudData.payload) {
      const newAct = cloudData.payload;
      try {
        const cur = getCustomerActivities();
        if (!cur.some(a => a.id === newAct.id)) {
          const merged = [newAct, ...cur].slice(0, 80);
          localStorage.setItem(CUSTOMER_ACTIVITY_KEY, JSON.stringify(merged));
          callback(merged);
        }
      } catch (err) {}
    }
  });

  return () => {
    window.removeEventListener(CUSTOMER_ACTIVITY_EVENT, handler);
    window.removeEventListener('storage', handler);
    unsubCloud();
  };
}
