// Common Talks Video Store - Instagram-style Citizen Video Opinions
// Supports Local Video Uploads, Real-Time Cross-Device Sync, Likes & Comments

import { publishCloudEvent, subscribeCloudEvents } from './cloudSyncService';
import { recordCustomerActivity } from './customerActivityStore';

export const COMMON_TALKS_STORAGE_KEY = 'now9_common_talks_videos_v3';
export const COMMON_TALKS_CHANGED_EVENT = 'now9_common_talks_changed';

export const INITIAL_COMMON_TALKS_VIDEOS = [
  {
    id: 'ct-1',
    title: 'రైతు రుణమాఫీ & విత్తనాల సబ్సిడీ - గ్రౌండ్ రియాలిటీ',
    caption: 'మా గ్రామంలో రైతులకు రుణమాఫీ అమలు ఎలా జరుగుతోందో నిజాలు చెబుతున్నాను. #Farmers #Now9 #CommonTalks #RuralVoice',
    author: 'రామయ్య (Ramaiah)',
    authorHandle: '@ramaiah_farmer',
    role: 'Farmer',
    category: 'Farmers',
    topic: '🌾 Farmers & Agriculture',
    location: 'Mahabubnagar, Telangana',
    district: 'Mahabubnagar',
    time: '20 mins ago',
    duration: '1:15',
    likes: 184,
    views: '2.4K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-news-anchor-talking-on-a-studio-set-41315-large.mp4',
    thumbnail: '/assets/farmer_portrait.jpg',
    avatarBg: 'bg-emerald-600',
    isUserUpload: false,
    comments: [
      { id: 1, user: 'Suresh Kumar', text: 'నిజం చెప్పారు అన్నయ్య. క్షేత్రస్థాయిలో సమస్యలు పరిష్కరించాలి.', time: '15m ago' },
      { id: 2, user: 'Venkatesh P.', text: 'సకాలంలో రుణాలు రైతులకు చాలా అవసరం.', time: '5m ago' }
    ]
  },
  {
    id: 'ct-2',
    title: 'హైదరాబాద్‌లో యువతకు ఐటీ జాబ్స్ & స్కిల్ సెంటర్లు',
    caption: 'కాలేజ్ పూర్తి చేసిన ఫ్రెషర్స్‌కి నైపుణ్య శిక్షణ చాలా అవసరం. ప్రభుత్వ స్కిల్ డెవలప్‌మెంట్ ప్రోగ్రామ్స్ ఎలా ఉండాలి? #YouthVoice #Jobs2026 #HyderabadIT #Now9',
    author: 'స్నేహ (Sneha Reddy)',
    authorHandle: '@sneha_tech',
    role: 'Student',
    category: 'Students',
    topic: '🎓 Youth & Employment',
    location: 'Jubilee Hills, Hyderabad',
    district: 'Hyderabad',
    time: '1 hour ago',
    duration: '0:58',
    likes: 245,
    views: '3.8K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-news-anchor-talking-on-a-studio-set-41315-large.mp4',
    thumbnail: '/assets/youth_speaker_mic.jpg',
    avatarBg: 'bg-indigo-600',
    isUserUpload: false,
    comments: [
      { id: 1, user: 'Karthik V.', text: '100% correct! AI & Coding training centres should be established in tier-2 cities too.', time: '40m ago' }
    ]
  },
  {
    id: 'ct-3',
    title: 'నిత్యావసర వస్తువుల ధరలు & మధ్యతరగతి కుటుంబ బడ్జెట్',
    caption: 'గ్యాస్, విద్యుత్ ఛార్జీలు, నిత్యావసర సరుకుల ధరల పెరుగుదలపై గృహిణిగా నా అనుభవం. #WomenEmpowerment #PriceRise #CommonTalks',
    author: 'లక్ష్మి (Lakshmi Devi)',
    authorHandle: '@lakshmi_vizag',
    role: 'Housewife',
    category: 'Women',
    topic: '👩 Women & Living Costs',
    location: 'Visakhapatnam, Andhra Pradesh',
    district: 'Visakhapatnam',
    time: '3 hours ago',
    duration: '1:30',
    likes: 198,
    views: '2.9K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-news-anchor-talking-on-a-studio-set-41315-large.mp4',
    thumbnail: '/assets/farmer_portrait.jpg',
    avatarBg: 'bg-rose-600',
    isUserUpload: false,
    comments: [
      { id: 1, user: 'Sunitha M.', text: 'చాలా స్పష్టంగా చెప్పారు. మధ్యతరగతి పై భారం తగ్గించాలి.', time: '1h ago' }
    ]
  },
  {
    id: 'ct-4',
    title: 'మా వార్డులో డ్రైనేజీ & రోడ్ల పరిస్థితి - మున్సిపల్ రిపోర్ట్',
    caption: 'వర్షం వస్తే రోడ్లపై నీరు నిలిచిపోతోంది. స్థానిక ప్రజాప్రతినిధులు వెంటనే స్పందించాలి! #LocalIssues #CivicVoice #Warangal #Now9',
    author: 'శ్రీనివాస్ (Srinivas G.)',
    authorHandle: '@srinu_warangal',
    role: 'Civic Activist',
    category: 'Civic',
    topic: '🏙️ Local Civic Issues',
    location: 'Warangal, Telangana',
    district: 'Warangal',
    time: '5 hours ago',
    duration: '1:10',
    likes: 132,
    views: '1.9K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-news-anchor-talking-on-a-studio-set-41315-large.mp4',
    thumbnail: '/assets/hyderabad_it.jpg',
    avatarBg: 'bg-amber-600',
    isUserUpload: false,
    comments: [
      { id: 1, user: 'Nagaraju K.', text: 'మేయర్ గారు దీనిపై తక్షణమే చర్యలు తీసుకోవాలి.', time: '3h ago' }
    ]
  }
];

export function getCommonTalksVideos() {
  if (typeof window === 'undefined') return INITIAL_COMMON_TALKS_VIDEOS;
  try {
    const raw = localStorage.getItem(COMMON_TALKS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COMMON_TALKS_STORAGE_KEY, JSON.stringify(INITIAL_COMMON_TALKS_VIDEOS));
      return INITIAL_COMMON_TALKS_VIDEOS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_COMMON_TALKS_VIDEOS;
  } catch (e) {
    return INITIAL_COMMON_TALKS_VIDEOS;
  }
}

export function uploadCommonTalksVideo(videoData) {
  if (typeof window === 'undefined') return videoData;

  const current = getCommonTalksVideos();
  const newPost = {
    id: `ct-user-${Date.now()}`,
    title: videoData.title?.trim() || 'Citizen Video Opinion',
    caption: videoData.caption?.trim() || videoData.title?.trim() || 'Shared via Now9 Common Talks #CommonTalks #PublicVoice',
    author: videoData.author?.trim() || 'Citizen Voice',
    authorHandle: videoData.authorHandle?.trim() || `@${(videoData.author || 'citizen').toLowerCase().replace(/\s+/g, '_')}`,
    role: videoData.role || 'Citizen Voice',
    category: videoData.category || 'Public',
    topic: videoData.topic || '💬 Public Opinion',
    location: videoData.location || 'Telangana & Andhra Pradesh',
    district: videoData.district || 'Global',
    time: 'Just now',
    duration: videoData.duration || '0:45',
    likes: 1,
    views: '1',
    videoUrl: videoData.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-news-anchor-talking-on-a-studio-set-41315-large.mp4',
    thumbnail: videoData.thumbnail || '/assets/news_debate_studio.jpg',
    avatarBg: 'bg-gradient-to-tr from-amber-500 to-rose-500',
    isUserUpload: true,
    comments: []
  };

  const updated = [newPost, ...current.filter(v => v.id !== newPost.id)];

  try {
    localStorage.setItem(COMMON_TALKS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(COMMON_TALKS_CHANGED_EVENT, { detail: { type: 'uploaded', video: newPost } }));
    
    // Sync to other phones and admin dashboard
    publishCloudEvent('NEW_COMMON_TALKS_VIDEO', { video: newPost });
    
    // Track in customer activities
    recordCustomerActivity({
      type: 'community',
      title: 'Uploaded Common Talks Video (Reel)',
      detail: `Citizen posted video: "${newPost.title}" (${newPost.location})`,
      location: newPost.location,
      icon: '📹',
      badgeColor: 'rose',
      badgeText: 'Common Talks Video'
    });
  } catch (e) {
    console.warn('Error saving Common Talks video:', e);
  }

  return newPost;
}

export function likeCommonTalksVideo(videoId) {
  if (typeof window === 'undefined') return;
  const current = getCommonTalksVideos();
  const updated = current.map(item => {
    if (item.id === videoId) {
      const isAlreadyLiked = item.hasUserLiked;
      return {
        ...item,
        likes: isAlreadyLiked ? Math.max(0, item.likes - 1) : item.likes + 1,
        hasUserLiked: !isAlreadyLiked
      };
    }
    return item;
  });

  try {
    localStorage.setItem(COMMON_TALKS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(COMMON_TALKS_CHANGED_EVENT, { detail: { type: 'liked', videoId } }));
  } catch (e) {}
}

export function addCommentToCommonTalksVideo(videoId, commentText, authorName = 'You') {
  if (typeof window === 'undefined' || !commentText?.trim()) return;
  const current = getCommonTalksVideos();
  const updated = current.map(item => {
    if (item.id === videoId) {
      const newComment = {
        id: Date.now(),
        user: authorName,
        text: commentText.trim(),
        time: 'Just now'
      };
      return {
        ...item,
        comments: [...(item.comments || []), newComment]
      };
    }
    return item;
  });

  try {
    localStorage.setItem(COMMON_TALKS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(COMMON_TALKS_CHANGED_EVENT, { detail: { type: 'commented', videoId } }));
  } catch (e) {}
}

export function deleteCommonTalksVideo(videoId) {
  if (typeof window === 'undefined') return;
  const current = getCommonTalksVideos();
  const updated = current.filter(item => item.id !== videoId);

  try {
    localStorage.setItem(COMMON_TALKS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(COMMON_TALKS_CHANGED_EVENT, { detail: { type: 'deleted', videoId } }));
    publishCloudEvent('DELETE_COMMON_TALKS_VIDEO', { videoId });
  } catch (e) {}
}

export function subscribeCommonTalksVideos(callback) {
  if (typeof window === 'undefined') return () => {};

  const handler = () => {
    callback(getCommonTalksVideos());
  };

  window.addEventListener(COMMON_TALKS_CHANGED_EVENT, handler);
  window.addEventListener('storage', handler);

  const unsubCloud = subscribeCloudEvents((data) => {
    if (data.type === 'NEW_COMMON_TALKS_VIDEO' && data.payload?.video) {
      const current = getCommonTalksVideos();
      if (!current.some(v => v.id === data.payload.video.id)) {
        const updated = [data.payload.video, ...current];
        try {
          localStorage.setItem(COMMON_TALKS_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        callback(updated);
      }
    }
  });

  return () => {
    window.removeEventListener(COMMON_TALKS_CHANGED_EVENT, handler);
    window.removeEventListener('storage', handler);
    if (unsubCloud) unsubCloud();
  };
}
