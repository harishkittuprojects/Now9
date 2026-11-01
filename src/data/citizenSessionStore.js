// Central Citizen Session & Active Constituency Sync for NowNine
// Synchronizes active mobile login / location directly with Admin Dashboard in real-time
// Supports both same-device instant sync (BroadcastChannel/localStorage) and cross-device cloud sync (publishCloudEvent)
import { recordCustomerActivity } from './customerActivityStore.js';
import { publishCloudEvent, subscribeCloudEvents } from './cloudSyncService.js';

export const ACTIVE_CITIZEN_SESSION_KEY = 'now9_active_citizen_session_v2';
export const CITIZEN_SESSION_EVENT = 'now9_citizen_session_updated';

// Cross-tab broadcast channel for instant multi-tab sync on same device
let citizenBroadcastChannel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    citizenBroadcastChannel = new BroadcastChannel('now9_citizen_sync_channel');
  }
} catch (e) {}

export function getConstituencyKeyFromLocation(location) {
  if (!location) return 'kurnool';
  const text = `${location.id || ''} ${location.assembly || ''} ${location.city || ''} ${location.locality || ''} ${location.district || ''} ${location.exactAddress || ''} ${location.formattedAddress || ''}`.toLowerCase();
  
  // Visakhapatnam / Vizag (including Rushikonda, Bheemili, MVP Colony, Gajuwaka)
  if (
    text.includes('visakhapatnam') || 
    text.includes('vishaka') || 
    text.includes('vizag') || 
    text.includes('rushikonda') || 
    text.includes('ఋషికొండ') ||
    text.includes('bheemili') || 
    text.includes('భీమిలి') ||
    text.includes('mvp') || 
    text.includes('gajuwaka') || 
    text.includes('గాజువాక') ||
    text.includes('pendurthi') || 
    text.includes('anakapalle') ||
    text.includes('విశాఖ')
  ) {
    return 'visakhapatnam';
  }

  // Kurnool
  if (text.includes('kurnool') || text.includes('కర్నూలు') || text.includes('c-camp')) return 'kurnool';

  // Chandragiri
  if (text.includes('chandragiri') || text.includes('చంద్రగిరి') || text.includes('rangampeta')) return 'chandragiri';

  // Tirupati
  if (text.includes('tirupati') || text.includes('తిరుపతి') || text.includes('alipiri') || text.includes('tirumala')) return 'tirupati';

  // Vijayawada
  if (text.includes('vijayawada') || text.includes('విజయవాడ') || text.includes('benz') || text.includes('moghalrajpuram') || text.includes('governorpet')) return 'vijayawada';

  // Guntur
  if (text.includes('guntur') || text.includes('గుంటూరు') || text.includes('brodipet') || text.includes('arundelpet') || text.includes('pattabhipuram')) return 'guntur';
  
  // Telangana Constituencies
  if (text.includes('mahabubnagar') || text.includes('మహబూబ్‌నగర్') || text.includes('yenugonda') || text.includes('palamuru')) return 'mahabubnagar';
  if (text.includes('lb nagar') || text.includes('lbnagar') || text.includes('ఎల్బీ') || text.includes('badangpet') || text.includes('almasguda') || text.includes('saroornagar') || text.includes('meerpet')) return 'lbnagar';
  if (text.includes('jubilee') || text.includes('జూబ్లీ') || text.includes('banjara') || text.includes('film nagar') || text.includes('khairatabad')) return 'jubileehills';
  if (text.includes('serilingampally') || text.includes('శేరిలింగంపల్లి') || text.includes('gachibowli') || text.includes('hitec') || text.includes('madhapur') || text.includes('kondapur') || text.includes('miyapur')) return 'serilingampally';
  if (text.includes('kukatpally') || text.includes('కూకట్‌పల్లి') || text.includes('kphb') || text.includes('moosapet')) return 'kukatpally';
  if (text.includes('munugode') || text.includes('మునుగోడు') || text.includes('choutuppal') || text.includes('chandur') || text.includes('marriguda')) return 'munugode';
  if (text.includes('gajwel') || text.includes('గజ్వేల్') || text.includes('siddipet') || text.includes('toopran') || text.includes('wargal')) return 'gajwel';
  if (text.includes('warangal') || text.includes('వరంగల్') || text.includes('hanamkonda')) return 'warangal';
  if (text.includes('secunderabad') || text.includes('సికింద్రాబాద్')) return 'secunderabad';
  
  // If in AP by state, default to kurnool or visakhapatnam
  if ((location?.state || '').toLowerCase().includes('andhra')) return 'visakhapatnam';
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
  const assembly = location?.assembly || `${locality} Assembly Constituency`;
  const state = location?.state || ((constituencyKey === 'kurnool' || constituencyKey === 'chandragiri' || constituencyKey === 'vijayawada' || constituencyKey === 'guntur' || constituencyKey === 'visakhapatnam' || constituencyKey === 'tirupati') ? 'Andhra Pradesh' : 'Telangana');
  const district = location?.district || (constituencyKey === 'visakhapatnam' ? 'Visakhapatnam' : location?.city || '');
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
    // 1. Local Storage
    localStorage.setItem(ACTIVE_CITIZEN_SESSION_KEY, JSON.stringify(session));
    window.dispatchEvent(new CustomEvent(CITIZEN_SESSION_EVENT, { detail: session }));
    
    // 2. Same-device cross-tab broadcast
    if (citizenBroadcastChannel) {
      citizenBroadcastChannel.postMessage({ type: 'CITIZEN_LOGIN', session });
    }

    // 3. CROSS-DEVICE CLOUD SYNC (Pushes to laptop admin across the internet)
    publishCloudEvent('CITIZEN_LOGIN', session);

    // 4. Record as prominent customer activity
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

  // CROSS-DEVICE CLOUD LISTENER (Receives live login from mobile phone on laptop admin!)
  const unsubCloud = subscribeCloudEvents((cloudData) => {
    if (cloudData.type === 'CITIZEN_LOGIN' && cloudData.payload) {
      try {
        localStorage.setItem(ACTIVE_CITIZEN_SESSION_KEY, JSON.stringify(cloudData.payload));
      } catch (err) {}
      callback(cloudData.payload);
    }
  });

  return () => {
    window.removeEventListener(CITIZEN_SESSION_EVENT, handler);
    window.removeEventListener('storage', handler);
    if (citizenBroadcastChannel) {
      citizenBroadcastChannel.removeEventListener('message', channelHandler);
    }
    unsubCloud();
  };
}
