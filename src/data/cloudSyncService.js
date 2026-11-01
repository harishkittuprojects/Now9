// Universal Cross-Device Real-Time Cloud Synchronization for NowNine
// Bridges mobile phones and laptop/desktop admin dashboards anywhere across the internet
// Uses ultra-fast, zero-config public pub/sub (ntfy.sh) + local fallback

const CLOUD_TOPIC = 'now9_electoral_sync_v2_live';
const CLOUD_PUB_URL = `https://ntfy.sh/${CLOUD_TOPIC}`;
const CLOUD_SUB_URL = `https://ntfy.sh/${CLOUD_TOPIC}/sse`;
const CLOUD_POLL_URL = `https://ntfy.sh/${CLOUD_TOPIC}/json?poll=1&since=30m`;

let isPublishing = false;
let lastPublishedPayload = null;

/**
 * Publish an event to the cloud channel so all connected laptops & devices receive it instantly.
 * @param {string} type - 'CITIZEN_LOGIN' | 'BALLOT_CAST' | 'CUSTOMER_ACTIVITY' | 'BALLOT_RESET'
 * @param {object} payload - The event data
 */
export async function publishCloudEvent(type, payload) {
  if (typeof window === 'undefined') return;

  const bodyString = JSON.stringify({
    type,
    payload,
    deviceId: getOrCreateDeviceId(),
    timestamp: Date.now()
  });

  lastPublishedPayload = bodyString;

  try {
    // Non-blocking fetch
    fetch(CLOUD_PUB_URL, {
      method: 'POST',
      body: bodyString,
      headers: {
        'Title': `Now9 ${type}`,
        'Priority': 'default'
      }
    }).catch(err => {
      console.warn('[CloudSync] Publish network warning:', err);
    });
  } catch (err) {
    console.warn('[CloudSync] Publish error:', err);
  }
}

/**
 * Subscribe to cloud events across devices.
 * Uses native EventSource (SSE) for sub-second push updates, plus an initial poll.
 * @param {function} onEvent - Callback receiving ({ type, payload, deviceId, timestamp })
 * @returns {function} Unsubscribe cleanup function
 */
export function subscribeCloudEvents(onEvent) {
  if (typeof window === 'undefined') return () => {};

  const currentDeviceId = getOrCreateDeviceId();
  let eventSource = null;
  let pollInterval = null;
  let isClosed = false;

  // Process and deduplicate incoming cloud messages
  const processMessage = (rawText) => {
    try {
      const data = JSON.parse(rawText);
      // Ignore if sent by the exact same browser tab to avoid loops
      if (data.deviceId === currentDeviceId && data.payload?.isLocalOrigin) {
        return;
      }
      if (data.type && onEvent) {
        onEvent(data);
      }
    } catch (e) {
      // not JSON or malformed
    }
  };

  // 1. Initial poll for recently published cloud events (last 30 mins)
  const fetchRecentEvents = async () => {
    try {
      const res = await fetch(CLOUD_POLL_URL);
      if (res.ok) {
        const text = await res.text();
        const lines = text.trim().split('\n');
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const wrapper = JSON.parse(line);
            if (wrapper.event === 'message' && wrapper.message) {
              processMessage(wrapper.message);
            }
          } catch (e) {}
        }
      }
    } catch (err) {
      console.warn('[CloudSync] Initial poll failed:', err);
    }
  };

  fetchRecentEvents();

  // 2. Setup real-time Server-Sent Events (SSE)
  try {
    if ('EventSource' in window) {
      eventSource = new EventSource(CLOUD_SUB_URL);
      
      eventSource.onmessage = (event) => {
        if (isClosed) return;
        try {
          const wrapper = JSON.parse(event.data);
          if (wrapper.event === 'message' && wrapper.message) {
            processMessage(wrapper.message);
          } else if (wrapper.type) {
            processMessage(event.data);
          }
        } catch (e) {
          processMessage(event.data);
        }
      };

      eventSource.onerror = (err) => {
        // SSE error, will auto-reconnect or fallback to interval polling
        console.warn('[CloudSync] SSE connection warning, will keep active.');
      };
    }
  } catch (err) {
    console.warn('[CloudSync] EventSource initialization failed:', err);
  }

  // 3. Robust backup poll every 5 seconds in case SSE drops
  pollInterval = setInterval(() => {
    if (isClosed) return;
    fetch(`https://ntfy.sh/${CLOUD_TOPIC}/json?poll=1&since=6s`)
      .then(r => r.text())
      .then(text => {
        const lines = text.trim().split('\n');
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const wrapper = JSON.parse(line);
            if (wrapper.event === 'message' && wrapper.message) {
              processMessage(wrapper.message);
            }
          } catch (e) {}
        }
      })
      .catch(() => {});
  }, 5000);

  return () => {
    isClosed = true;
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  };
}

function getOrCreateDeviceId() {
  if (typeof window === 'undefined') return 'server';
  try {
    let id = sessionStorage.getItem('now9_device_id_v2');
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      sessionStorage.setItem('now9_device_id_v2', id);
    }
    return id;
  } catch (e) {
    return 'dev_unknown';
  }
}
