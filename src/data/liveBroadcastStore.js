// Central Store for Now9 Live Broadcast & Recorded Sessions
// Connects Admin Studio <-> Citizen Website in real-time

export const NOW9_ACTIVE_BROADCAST_KEY = 'now9_active_broadcast_v1';
export const NOW9_RECORDED_BROADCASTS_KEY = 'now9_recorded_broadcasts_v1';
export const BROADCAST_EVENT = 'now9_broadcast_changed';

export const DEFAULT_RECORDED_SESSIONS = [
  {
    id: 'rec-1',
    title: 'పాలమూరు ప్రాజెక్ట్ & ఉపాధి అవకాశాలు - ప్రత్యేక విశ్లేషణ',
    host: 'Now9 Senior Editor',
    constituency: 'Mahabubnagar',
    date: '30 Oct 2026',
    duration: '28:40',
    views: '14.8K views',
    thumbnail: '/assets/news_debate_studio.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'rec-2',
    title: 'రైతు సంక్షేమం & రుణమాఫీ అమలు - లైవ్ గ్రౌండ్ రిపోర్ట్',
    host: 'Now9 Rural Correspondent',
    constituency: 'Nagarkurnool',
    date: '29 Oct 2026',
    duration: '21:15',
    views: '19.2K views',
    thumbnail: '/assets/farmer_portrait.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'rec-3',
    title: 'యువత ఉపాధి & ఐటీ రంగంలో విస్తరణ - పబ్లిక్ చర్చ',
    host: 'Now9 Prime Desk',
    constituency: 'Jubilee Hills',
    date: '28 Oct 2026',
    duration: '35:10',
    views: '26.5K views',
    thumbnail: '/assets/youth_speaker_mic.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  }
];

export function getActiveBroadcast() {
  if (typeof window === 'undefined') {
    return { isLive: false };
  }
  try {
    const raw = localStorage.getItem(NOW9_ACTIVE_BROADCAST_KEY);
    if (!raw) return { isLive: false };
    return JSON.parse(raw);
  } catch (e) {
    return { isLive: false };
  }
}

export function getRecordedSessions() {
  if (typeof window === 'undefined') {
    return DEFAULT_RECORDED_SESSIONS;
  }
  try {
    const raw = localStorage.getItem(NOW9_RECORDED_BROADCASTS_KEY);
    if (!raw) {
      localStorage.setItem(NOW9_RECORDED_BROADCASTS_KEY, JSON.stringify(DEFAULT_RECORDED_SESSIONS));
      return DEFAULT_RECORDED_SESSIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_RECORDED_SESSIONS;
  } catch (e) {
    return DEFAULT_RECORDED_SESSIONS;
  }
}

export function startLiveBroadcast({ title, host = 'Now9 Prime Editor', constituency = 'Mahabubnagar' }) {
  if (typeof window === 'undefined') return;
  
  const activeData = {
    isLive: true,
    id: `live-${Date.now()}`,
    title: title?.trim() || '2026 ఎన్నికలు: ప్రజా తీర్పు & లైవ్ చర్చ',
    host: host || 'Now9 Prime Editor',
    constituency: constituency || 'Mahabubnagar',
    startedAt: Date.now(),
    viewers: 14280,
    thumbnail: '/assets/news_debate_studio.jpg'
  };

  try {
    localStorage.setItem(NOW9_ACTIVE_BROADCAST_KEY, JSON.stringify(activeData));
    window.dispatchEvent(new CustomEvent(BROADCAST_EVENT, { 
      detail: { type: 'started', activeBroadcast: activeData } 
    }));
  } catch (e) {}

  return activeData;
}

export function endLiveBroadcast() {
  if (typeof window === 'undefined') return;

  const current = getActiveBroadcast();
  let newRecorded = null;

  if (current && current.isLive) {
    const durationSeconds = Math.max(12, Math.floor((Date.now() - (current.startedAt || Date.now())) / 1000));
    const mins = Math.floor(durationSeconds / 60);
    const secs = durationSeconds % 60;
    const durationStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    newRecorded = {
      id: `rec-${Date.now()}`,
      title: current.title,
      host: current.host,
      constituency: current.constituency,
      date: today,
      duration: durationStr,
      views: `${(current.viewers ? (current.viewers / 1000).toFixed(1) : '14.2')}K views`,
      thumbnail: current.thumbnail || '/assets/news_debate_studio.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    };

    const existing = getRecordedSessions();
    const updated = [newRecorded, ...existing.filter(s => s.id !== newRecorded.id)];
    
    try {
      localStorage.setItem(NOW9_RECORDED_BROADCASTS_KEY, JSON.stringify(updated));
    } catch (e) {}
  }

  const inactive = { isLive: false };
  try {
    localStorage.setItem(NOW9_ACTIVE_BROADCAST_KEY, JSON.stringify(inactive));
    window.dispatchEvent(new CustomEvent(BROADCAST_EVENT, { 
      detail: { type: 'ended', activeBroadcast: inactive, newRecorded } 
    }));
  } catch (e) {}

  return newRecorded;
}

export function deleteRecordedSession(id) {
  if (typeof window === 'undefined') return;
  const existing = getRecordedSessions();
  const updated = existing.filter(s => s.id !== id);
  try {
    localStorage.setItem(NOW9_RECORDED_BROADCASTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BROADCAST_EVENT, { 
      detail: { type: 'deleted', deletedId: id } 
    }));
  } catch (e) {}
  return updated;
}

export const NOW9_SELECTED_DEBATE_KEY = 'now9_selected_debate_v1';

export function setSelectedDebate(debate) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(NOW9_SELECTED_DEBATE_KEY, JSON.stringify(debate));
    window.dispatchEvent(new CustomEvent('now9_selected_debate_changed', { detail: debate }));
  } catch (e) {}
}

export function getSelectedDebate() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(NOW9_SELECTED_DEBATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function subscribeBroadcast(callback) {
  if (typeof window === 'undefined') return () => {};

  const handler = () => {
    callback({
      activeBroadcast: getActiveBroadcast(),
      recordedSessions: getRecordedSessions()
    });
  };

  window.addEventListener(BROADCAST_EVENT, handler);
  window.addEventListener('storage', handler);

  return () => {
    window.removeEventListener(BROADCAST_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
