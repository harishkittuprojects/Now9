// Central Customer / Citizen Live Activity Store for NowNine
// Captures and streams EVERY customer action from the website directly to the Admin Dashboard

export const CUSTOMER_ACTIVITY_KEY = 'now9_customer_activities_v1';
export const CUSTOMER_ACTIVITY_EVENT = 'now9_customer_activity_event';

// Initial sample activities so admin always has realistic context on first load
export const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-901',
    type: 'vote',
    title: 'Constituency Ballot Cast',
    detail: 'Citizen cast official ballot for Congress (INC) - Yennam Srinivas Reddy in Mahabubnagar',
    location: 'Yenugonda, Mahabubnagar',
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
    location: 'Mahabubnagar Constituency',
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
    location: 'LB Nagar, Hyderabad',
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
    detail: 'Citizen opened breaking report: "తెలంగాణ అసెంబ్లీ నియోజకవర్గాల్లో ముమ్మర ప్రచారం"',
    location: 'Khairatabad, Hyderabad',
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
    detail: 'Citizen geofence verified in Mahabubnagar District (Assembly Constituency #74)',
    location: 'Mahabubnagar (GPS Lat: 16.74, Lon: 77.98)',
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
  // Keep latest 80 activities
  const updated = [newActivity, ...current].slice(0, 80);

  try {
    localStorage.setItem(CUSTOMER_ACTIVITY_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent(CUSTOMER_ACTIVITY_EVENT, { detail: { newActivity, activities: updated } })
    );
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
  return () => {
    window.removeEventListener(CUSTOMER_ACTIVITY_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
