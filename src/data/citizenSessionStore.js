// Central Citizen Session & Active Constituency Sync for NowNine
// Synchronizes active mobile login / location directly with Admin Dashboard in real-time
import { recordCustomerActivity } from './customerActivityStore.js';

export const ACTIVE_CITIZEN_SESSION_KEY = 'now9_active_citizen_session_v2';
export const CITIZEN_SESSION_EVENT = 'now9_citizen_session_updated';

export function getConstituencyKeyFromLocation(location) {
  if (!location) return 'mahabubnagar';
  const text = `${location.id || ''} ${location.assembly || ''} ${location.city || ''} ${location.locality || ''} ${location.district || ''}`.toLowerCase();
  
  if (text.includes('kurnool')) return 'kurnool';
  if (text.includes('mahabubnagar') || text.includes('yenugonda') || text.includes('palamuru')) return 'mahabubnagar';
  if (text.includes('lb nagar') || text.includes('badangpet') || text.includes('almasguda') || text.includes('saroornagar')) return 'lbnagar';
  if (text.includes('jubilee') || text.includes('banjara') || text.includes('khairatabad')) return 'jubileehills';
  if (text.includes('serilingampally') || text.includes('gachibowli') || text.includes('hitec') || text.includes('madhapur') || text.includes('kondapur')) return 'serilingampally';
  if (text.includes('munugode') || text.includes('choutuppal') || text.includes('chandur')) return 'munugode';
  if (text.includes('gajwel') || text.includes('siddipet') || text.includes('toopran')) return 'gajwel';
  if (text.includes('chandragiri') || text.includes('tirupati')) return 'chandragiri';
  if (text.includes('vijayawada') || text.includes('benz')) return 'vijayawada';
  if (text.includes('guntur')) return 'guntur';
  if (text.includes('visakhapatnam') || text.includes('vizag')) return 'visakhapatnam';
  
  return 'mahabubnagar';
}

export function getActiveCitizenSession() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ACTIVE_CITIZEN_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function recordCitizenLogin({ location, userPhone = '9876543210', method = 'Mobile OTP' }) {
  if (typeof window === 'undefined') return null;

  const constituencyKey = getConstituencyKeyFromLocation(location);
  const locality = location?.locality || location?.city || 'Local Area';
  const assembly = location?.assembly || `${locality} Constituency`;
  const state = location?.state || 'Telangana / AP';
  const district = location?.district || location?.city || '';

  const session = {
    id: `SES-${Date.now().toString().slice(-4)}`,
    constituencyKey,
    locality,
    assembly,
    district,
    state,
    userPhone,
    method,
    loginTime: Date.now(),
    timestampFormatted: new Date().toLocaleTimeString(),
    status: 'Live Active Citizen'
  };

  try {
    localStorage.setItem(ACTIVE_CITIZEN_SESSION_KEY, JSON.stringify(session));
    window.dispatchEvent(new CustomEvent(CITIZEN_SESSION_EVENT, { detail: session }));
    
    // Also record as a prominent customer activity in the activity stream
    recordCustomerActivity({
      type: 'login',
      title: `Citizen Logged In (${assembly})`,
      detail: `Citizen signed in via ${method} from ${locality} (${district ? district + ', ' : ''}${state}). Admin dashboard auto-synced.`,
      location: `${locality}, ${assembly}`,
      icon: '📍',
      badgeColor: 'emerald',
      badgeText: 'Live Citizen Login',
      metadata: { constituencyKey, assembly, locality }
    });
  } catch (e) {
    console.error('Failed to save citizen session:', e);
  }

  return session;
}

export function subscribeCitizenSession(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e) => {
    if (e?.detail) {
      callback(e.detail);
    } else {
      callback(getActiveCitizenSession());
    }
  };
  window.addEventListener(CITIZEN_SESSION_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CITIZEN_SESSION_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
