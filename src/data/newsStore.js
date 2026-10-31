// Central News Store for NowNine
// Synchronizes Admin News Publisher <-> Citizen Mobile News Feed & Flash Tickers

export const NEWS_STORAGE_KEY = 'now9_published_news_v1';
export const NEWS_EVENT = 'now9_news_updated';

export const INITIAL_NEWS_ITEMS = [
  {
    id: 1,
    tag: 'Breaking',
    tagColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    title: '2026 తెలంగాణ ఎన్నికల కార్యాచరణ: పార్టీల ముమ్మర సన్నాహాలు',
    summary: 'రాష్ట్రవ్యాప్తంగా రాజకీయ సమీకరణాలు వేడెక్కాయి. అన్ని ప్రధాన పార్టీలు క్షేత్రస్థాయిలో ప్రచారానికి రంగం సిద్ధం చేస్తున్నాయి.',
    time: '12m ago',
    reads: '48.2K readers',
    category: 'Elections 2026',
    source: 'NowNine Political Desk',
    img: '/assets/news_debate_studio.jpg',
    isLive: true
  },
  {
    id: 2,
    tag: 'Development',
    tagColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    title: 'హైదరాబాద్ మెట్రో ఫేజ్-2 కి కేబినెట్ ఆమోదం - 5 కొత్త కారిడార్లు',
    summary: 'రూ. 24,000 కోట్ల అంచనా వ్యయంతో విమానాశ్రయ ఎక్స్‌ప్రెస్ మార్గంతో సహా శంషాబాద్, ఓల్డ్ సిటీ మార్గాల్లో విస్తరణ పనులకు ఆమోదం.',
    time: '45m ago',
    reads: '36.5K readers',
    category: 'Hyderabad',
    source: 'Civic Infrastructure',
    img: '/assets/hyderabad_it.jpg',
    isLive: true
  },
  {
    id: 3,
    tag: 'Welfare',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    title: 'మహబూబ్‌నగర్: పాలమూరు-రంగారెడ్డి ఎత్తిపోతల ప్రాజెక్టుపై ఎమ్మెల్యే సమీక్ష',
    summary: 'నీటి విడుదల మరియు స్థానిక ఆయకట్టు రైతులకు సాగునీటి సరఫరాపై ఉన్నతాధికారులతో సమీక్ష సమావేశం.',
    time: '1h ago',
    reads: '28.4K readers',
    category: 'Mahabubnagar',
    source: 'District Reporter',
    img: '/assets/farmer_portrait.jpg',
    isLive: true
  },
  {
    id: 4,
    tag: 'State Politics',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    title: 'తెలంగాణ కాంగ్రెస్ ప్రభుత్వం: 6 గ్యారెంటీల అమల్లో కీలక ముందడుగు',
    summary: 'మహిళలకు ఉచిత బస్సు ప్రయాణం, రైతు భరోసా, రూ. 500 గ్యాస్ సిలిండర్ పథకాల తాజా లబ్ధిదారుల వివరాలు విడుదల.',
    time: '2h ago',
    reads: '45.1K readers',
    category: 'Telangana',
    source: 'State Secretariat',
    img: '/assets/news_debate_studio.jpg',
    isLive: false
  },
  {
    id: 5,
    tag: 'Andhra Pradesh',
    tagColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    title: 'ఏపీలో పింఛన్ల పంపిణీ: ఇంటింటికీ చేరిన ప్రభుత్వ సంక్షేమం',
    summary: 'రాష్ట్రవ్యాప్తంగా సామాజిక భద్రతా పింఛన్ల పంపిణీ మొదటి రోజే 95% పైగా పూర్తి.',
    time: '3h ago',
    reads: '32.6K readers',
    category: 'Andhra Pradesh',
    source: 'Andhra Bureau',
    img: '/assets/youth_speaker_mic.jpg',
    isLive: false
  }
];

export function getPublishedNews() {
  if (typeof window === 'undefined') return INITIAL_NEWS_ITEMS;
  try {
    const raw = localStorage.getItem(NEWS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(INITIAL_NEWS_ITEMS));
      return INITIAL_NEWS_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_NEWS_ITEMS;
  } catch (e) {
    return INITIAL_NEWS_ITEMS;
  }
}

export function publishNewsItem({ title, category = 'Mahabubnagar', summary = '' }) {
  if (typeof window === 'undefined') return null;
  const current = getPublishedNews();

  const tagColors = {
    'Breaking': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Mahabubnagar': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    'Hyderabad': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Telangana': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Andhra Pradesh': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    'Elections 2026': 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  };

  const newItem = {
    id: Date.now(),
    tag: category === 'Elections 2026' ? 'Breaking' : category,
    tagColor: tagColors[category] || 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    title: title.trim(),
    summary: summary.trim() || `${category} పరిధిలో తాజా తాజా విశేషాలు మరియు ప్రభుత్వ నిర్ణయాల ప్రత్యక్ష నివేదిక.`,
    time: 'Just now',
    reads: '1.2K readers',
    category: category,
    source: 'NowNine Live Wire',
    img: '/assets/news_debate_studio.jpg',
    isLive: true
  };

  const updated = [newItem, ...current];
  try {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(NEWS_EVENT, { detail: { type: 'added', item: newItem, list: updated } }));
  } catch (e) {}

  return newItem;
}

export function deleteNewsItem(id) {
  if (typeof window === 'undefined') return;
  const current = getPublishedNews();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(NEWS_EVENT, { detail: { type: 'deleted', id, list: updated } }));
  } catch (e) {}
  return updated;
}

export function subscribeNews(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => {
    callback(getPublishedNews());
  };
  window.addEventListener(NEWS_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(NEWS_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
