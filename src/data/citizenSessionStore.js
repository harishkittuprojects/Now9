// Central Citizen Session & Active Constituency Sync for NowNine
// Synchronizes active mobile login / location directly with Admin Dashboard in real-time
import { recordCustomerActivity } from './customerActivityStore.js';

export const ACTIVE_CITIZEN_SESSION_KEY = 'now9_active_citizen_session_v2';
export const CITIZEN_SESSION_EVENT = 'now9_citizen_session_updated';

// Cross-tab broadcast channel for instant multi-tab sync
let citizenBroadcastChannel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    citizenBroadcastChannel = new BroadcastChannel('now9_citizen_sync_channel');
  }
} catch (e) {
  // BroadcastChannel unavailable
}

export function getConstituencyKeyFromLocation(location) {
  if (!location) return 'kurnool';
  const text = `${location.id || ''} ${location.assembly || ''} ${location.city || ''} ${location.locality || ''} ${location.district || ''}`.toLowerCase();
  
  if (text.includes('kurnool') || text.includes('కర్నూలు') || text.includes('c-camp')) return 'kurnool';
  if (text.includes('chandragiri') || text.includes('చంద్రగిరి')) return 'chandragiri';
  if (text.includes('vijayawada') || text.includes('విజయవాడ') || text.includes('benz')) return 'vijayawada';
  if (text.includes('guntur') || text.includes('గుంటూరు') || text.includes('brodipet') || text.includes('arundelpet')) return 'guntur';
  if (text.includes('visakhapatnam') || text.includes('విశాఖ') || text.includes('vizag') || text.includes('mvp')) return 'visakhapatnam';
  if (text.includes('tirupati') || text.includes('తిరుపతి') || text.includes('alipiri')) return 'tirupati';
  
  if (text.includes('mahabubnagar') || text.includes('మహబూబ్‌నగర్') || text.includes('yenugonda') || text.includes('palamuru')) return 'mahabubnagar';
  if (text.includes('lb nagar') || text.includes('ఎల్బీ') || text.includes('badangpet') || text.includes('almasguda') || text.includes('saroornagar')) return 'lbnagar';
  if (text.includes('jubilee') || text.includes('జూబ్లీ') || text.includes('banjara') || text.includes('khairatabad')) return 'jubileehills';
  if (text.includes('serilingampally') || text.includes('శేరిలింగంపల్లి') || text.includes('gachibowli') || text.includes('hitec') || text.includes('madhapur') || text.includes('kondapur')) return 'serilingampally';
  if (text.includes('kukatpally') || text.includes('కూకట్‌పల్లి') || text.includes('kphb')) return 'kukatpally';
  if (text.includes('munugode') || text.includes('మునుగోడు') || text.includes('choutuppal') || text.includes('chandur')) return 'munugode';
  if (text.includes('gajwel') || text.includes('గజ్వేల్') || text.includes('siddipet') || text.includes('toopran')) return 'gajwel';
  if (text.includes('warangal') || text.includes('వరంగల్') || text.includes('hanamkonda')) return 'warangal';
  if (text.includes('secunderabad') || text.includes('సికింద్రాబాద్')) return 'secunderabad';
  
  // If in AP by state, default to kurnool or vijayawada
  if ((location?.state || '').toLowerCase().includes('andhra')) return 'kurnool';
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
  const state = location?.state || ((constituencyKey === 'kurnool' || constituencyKey === 'chandragiri' || constituencyKey === 'vijayawada' || constituencyKey === 'guntur' || constituencyKey === 'visakhapatnam' || constituencyKey === 'tirupati') ? 'Andhra Pradesh' : 'Telangana');
  const district = location?.district || location?.city || '';
  const parties = location?.parties || [];

  const session = {
    id: `SES-${Date.now().toString().slice(-4)}`,
    constituencyKey,
    locality,
    assembly,
    district,
    state,
    parties,
    userPhone,
    method,
    loginTime: Date.now(),
    timestampFormatted: new Date().toLocaleTimeString(),
    status: 'Live Active Citizen'
  };

  try {
    localStorage.setItem(ACTIVE_CITIZEN_SESSION_KEY, JSON.stringify(session));
    window.dispatchEvent(new CustomEvent(CITIZEN_SESSION_EVENT, { detail: session }));
    
    // Broadcast to all other open tabs/windows
    if (citizenBroadcastChannel) {
      citizenBroadcastChannel.postMessage({ type: 'CITIZEN_LOGIN', session });
    }

    // Also record as a prominent customer activity in the activity stream
    recordCustomerActivity({
      type: 'login',
      title: `Citizen Logged In (${assembly})`,
      detail: `Citizen signed in via ${method} from ${locality} (${district ? district + ', ' : ''}${state}). Admin dashboard auto-synced.`,
      location: `${locality}, ${assembly}`,
      icon: '📍',
      badgeColor: 'emerald',
      badgeText: 'Live Citizen Login',
      metadata: { constituencyKey, assembly, locality, state }
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

  const channelHandler = (e) => {
    if (e?.data?.session) {
      callback(e.data.session);
    }
  };

  window.addEventListener(CITIZEN_SESSION_EVENT, handler);
  window.addEventListener('storage', handler);
  
  if (citizenBroadcastChannel) {
    citizenBroadcastChannel.addEventListener('message', channelHandler);
  }

  return () => {
    window.removeEventListener(CITIZEN_SESSION_EVENT, handler);
    window.removeEventListener('storage', handler);
    if (citizenBroadcastChannel) {
      citizenBroadcastChannel.removeEventListener('message', channelHandler);
    }
  };
}
