// Complete dataset for the 9-Screen NowNine Political + Community Video App

export const SCREENS = [
  { id: 'splash', name: 'Splash Screen', badge: '1', short: 'Splash' },
  { id: 'home', name: 'Home Screen', badge: '2', short: 'Home' },
  { id: 'survey', name: 'Political Survey', badge: '3', short: 'Survey' },
  { id: 'live-debates', name: 'Live Debates', badge: '4', short: 'Debates' },
  { id: 'short-videos', name: 'Short Videos Feed', badge: '5', short: 'Shorts' },
  { id: 'common-people', name: 'Common People', badge: '6', short: 'People' },
  { id: 'area-specials', name: 'Area Specials', badge: '7', short: 'Area' },
  { id: 'video-player', name: 'Short Video Player', badge: '8', short: 'Player' },
  { id: 'debate-detail', name: 'Live Debate Studio', badge: '9', short: 'Live Studio' },
];

export const SURVEY_DATA = {
  title: 'Political Survey',
  subtitle: '5 Questions • Your Opinion Matters',
  progress: '1/5',
  percent: 20,
  question: 'మీరు ఈ పార్టీకి ఓటు వేయడానికి ప్రధాన కారణం ఏమిటి?',
  options: [
    { id: 0, text: 'నాయకత్వంపై నమ్మకం', isDefaultSelected: true },
    { id: 1, text: 'అభివృద్ధి పనులు' },
    { id: 2, text: 'సంక్షేమ పథకాలు' },
    { id: 3, text: 'పార్టీ సిద్ధాంతాలు' },
    { id: 4, text: 'ఇతర కారణాలు' }
  ]
};

export const TRENDING_NOW = [
  {
    id: 1,
    title: 'మంత్రివర్గంలో మార్పులు...',
    views: '18.4K',
    speaker: 'Minister Speech',
    img: '/assets/youth_speaker_mic.jpg'
  },
  {
    id: 2,
    title: 'ప్రజలలో చర్చనీయాంశమైన...',
    views: '14.2K',
    speaker: 'Civic Report',
    img: '/assets/hyderabad_it.jpg'
  }
];

export const LIVE_DEBATES = [
  {
    id: 'debate-main',
    title: '2026 ఎన్నికలు : ఎవరికి అవకాశాలు?',
    subtitle: 'Political Debate | Experts | Public Opinion',
    time: 'Today - 07:30 PM',
    views: '12.4K',
    isLive: true,
    img: '/assets/news_debate_studio.jpg'
  },
  {
    id: 'debate-1',
    title: 'గ్రామీణ అభివృద్ధి vs పట్టణ అభివృద్ధి',
    time: 'Today - 07:30 PM',
    views: '8.2K watching',
    isLive: true,
    img: '/assets/news_debate_studio.jpg'
  },
  {
    id: 'debate-2',
    title: 'యువత ఓటు ఎవరికి?',
    time: 'Today - 09:00 PM',
    views: '5.1K watching',
    isLive: false,
    img: '/assets/youth_speaker_mic.jpg'
  },
  {
    id: 'debate-3',
    title: 'రైతు సమస్యలు - పరిష్కారాలు',
    time: 'Tomorrow - 06:00 PM',
    views: '3.3K interested',
    isLive: false,
    img: '/assets/farmer_portrait.jpg'
  }
];

export const SHORT_VIDEOS_FEED = [
  {
    id: 'short-1',
    duration: '1:24',
    title: 'మన గ్రామంలో సమస్యలు ఎంతో ఉన్నాయి...',
    badge: '📍 Local Voice',
    views: '12.4K',
    img: '/assets/farmer_portrait.jpg'
  },
  {
    id: 'short-2',
    duration: '1:12',
    title: 'యువతకి ఉద్యోగాలు ఎలా వస్తాయి?',
    badge: '🎤 Youth Talk',
    views: '8.7K',
    img: '/assets/youth_speaker_mic.jpg'
  },
  {
    id: 'short-3',
    duration: '0:58',
    title: 'మా ఊరి ప్రత్యేకత (Area Special)',
    badge: '🏡 My Village',
    views: '6.3K',
    img: '/assets/hyderabad_it.jpg'
  }
];

export const COMMON_PEOPLE_STORIES = [
  {
    id: 'cp-1',
    duration: '2:15',
    title: 'రైతుకు నిజంగా ఏం కావాలి?',
    role: 'Farmer',
    icon: '🧑‍🌾',
    views: '22.4K',
    img: '/assets/farmer_portrait.jpg'
  },
  {
    id: 'cp-2',
    duration: '1:48',
    title: 'ఉద్యోగాలే మా పెద్ద ఆశ',
    role: 'Student',
    icon: '🎓',
    views: '19.7K',
    img: '/assets/youth_speaker_mic.jpg'
  },
  {
    id: 'cp-3',
    duration: '2:10',
    title: 'మహిళల భద్రతపై ప్రభుత్వం చర్యలు తీసుకోవాలి',
    role: 'Housewife',
    icon: '👩',
    views: '15.2K',
    img: '/assets/farmer_portrait.jpg'
  },
  {
    id: 'cp-4',
    duration: '1:32',
    title: 'మా ప్రాంతంలో రోడ్లు కావాలి',
    role: 'Local People',
    icon: '👥',
    views: '12.6K',
    img: '/assets/hyderabad_it.jpg'
  }
];

export const AREA_SPECIALS_UPDATES = [
  {
    id: 'as-1',
    category: 'News',
    badgeColor: 'bg-red-600',
    title: 'హైదరాబాద్‌లో కొత్త IT పార్క్ కంపెనీలకు సిద్ధం',
    time: '2h ago',
    img: '/assets/hyderabad_it.jpg'
  },
  {
    id: 'as-2',
    category: 'Development',
    badgeColor: 'bg-emerald-600',
    title: 'మేడ్చల్‌లో కొత్త రోడ్డు పనులు ప్రారంభం',
    time: '4h ago',
    img: '/assets/hyderabad_it.jpg'
  },
  {
    id: 'as-3',
    category: 'Events',
    badgeColor: 'bg-pink-600',
    title: 'బోనాల జాతర ఏర్పాట్లు పూర్తి',
    time: '6h ago',
    img: '/assets/parliament_circular.jpg'
  },
  {
    id: 'as-4',
    category: 'Alerts',
    badgeColor: 'bg-amber-600',
    title: 'ఈరోజు హైదరాబాద్‌లో వర్షాలు వచ్చే అవకాశం',
    time: '8h ago',
    img: '/assets/hyderabad_it.jpg'
  }
];

export const DEBATE_PANELISTS = [
  {
    id: 1,
    name: 'Raghuveer',
    role: 'Political Analyst',
    color: 'from-amber-600 to-yellow-500'
  },
  {
    id: 2,
    name: 'Suresh Reddy',
    role: 'Senior Journalist',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 3,
    name: 'Anjali',
    role: 'Economist',
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 4,
    name: 'Venkat',
    role: 'Social Activist',
    color: 'from-emerald-600 to-teal-500'
  }
];

export const LIVE_CHAT_MESSAGES = [
  {
    id: 1,
    user: 'RameshV123',
    text: 'గ్రామీణ ప్రాంతాలపై మరింత దృష్టి పెట్టాలి.',
    time: '07:32 PM',
    avatarBg: 'bg-orange-600'
  },
  {
    id: 2,
    user: 'Sravani',
    text: 'యువతకి ఉద్యోగాలు చాలా ముఖ్యం.',
    time: '07:33 PM',
    avatarBg: 'bg-pink-600'
  },
  {
    id: 3,
    user: 'Karthik',
    text: 'బాగా చెప్పారు...',
    time: '07:34 PM',
    avatarBg: 'bg-blue-600'
  }
];
