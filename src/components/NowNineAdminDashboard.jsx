import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Vote, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  Unlock,
  CheckCircle2, 
  RefreshCw, 
  Download, 
  Filter, 
  Eye, 
  AlertCircle,
  FileText,
  Sliders,
  Menu,
  X,
  Check,
  Search,
  Radio,
  Newspaper,
  Play,
  Pause,
  Plus,
  Trash2,
  ExternalLink,
  Smartphone,
  Layers,
  Settings,
  HelpCircle,
  Clock,
  Activity,
  Globe,
  Bell,
  CheckSquare,
  XCircle,
  UserCheck,
  Share2,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  Square,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import LiveStreamModal from './LiveStreamModal';
import { getStoredBallotData, recordLiveBallot, resetAllBallotsToZero, VOTE_CAST_EVENT } from '../data/voteStore';
import { CONSTITUENCY_DATABASE, DEFAULT_DETECTED_LOCATION } from '../data/locationConstituencyData';
import { SURVEY_QUESTIONS } from '../data/nowNineAppFlowData';
import { 
  getActiveBroadcast, 
  getRecordedSessions, 
  startLiveBroadcast, 
  endLiveBroadcast, 
  deleteRecordedSession, 
  subscribeBroadcast 
} from '../data/liveBroadcastStore';
import { 
  getPublishedNews, 
  publishNewsItem, 
  deleteNewsItem, 
  subscribeNews 
} from '../data/newsStore';
import { 
  getPublishedHousemates, 
  addHousemate, 
  updateHousemate, 
  deleteHousemate, 
  resetHousemateVotes, 
  subscribeHousemates 
} from '../data/bossStore';
import { 
  getCustomerActivities, 
  recordCustomerActivity, 
  clearCustomerActivities, 
  subscribeCustomerActivities 
} from '../data/customerActivityStore';
import { 
  getActiveCitizenSession, 
  subscribeCitizenSession, 
  recordCitizenLogin, 
  getConstituencyKeyFromLocation 
} from '../data/citizenSessionStore';

export default function NowNineAdminDashboard({ 
  onClose, 
  onSwitchToMobile,
  currentLocation = null 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'constituencies' | 'surveys' | 'live-debates' | 'news' | 'boss-house' | 'audit' | 'settings'
  const [activeCitizenSession, setActiveCitizenSession] = useState(() => getActiveCitizenSession());
  const [selectedConstituencyKey, setSelectedConstituencyKey] = useState(() => {
    const saved = getActiveCitizenSession();
    if (saved?.constituencyKey) return saved.constituencyKey;
    if (currentLocation) return getConstituencyKeyFromLocation(currentLocation);
    return 'kurnool';
  });
  const [regionFilter, setRegionFilter] = useState('All'); // 'All' | 'Telangana' | 'Andhra Pradesh'
  const [searchQuery, setSearchQuery] = useState('');
  const [isEmbargoActive, setIsEmbargoActive] = useState(true);
  const [toastMsg, setToastMsg] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Live Broadcast & Stream Conduct State (Synced to Citizen Website)
  const [isLiveStreamModalOpen, setIsLiveStreamModalOpen] = useState(false);
  const [liveStreamModalMode, setLiveStreamModalMode] = useState('conduct');
  const [activeBroadcast, setActiveBroadcast] = useState(() => getActiveBroadcast());
  const [recordedSessions, setRecordedSessions] = useState(() => getRecordedSessions());
  const [customDebateTitle, setCustomDebateTitle] = useState('2026 ఎన్నికలు: ఎవరికి అవకాశాలు?');
  const [selectedDebateConstituency, setSelectedDebateConstituency] = useState('Mahabubnagar');
  const [debateHostName, setDebateHostName] = useState('Now9 Prime Editor');
  const [previewRecordedModal, setPreviewRecordedModal] = useState(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [liveDuration, setLiveDuration] = useState(0);

  // Subscribe to live broadcast store changes
  useEffect(() => {
    const unsub = subscribeBroadcast(({ activeBroadcast: ab, recordedSessions: rs }) => {
      if (ab) setActiveBroadcast(ab);
      if (rs) setRecordedSessions(rs);
    });
    return unsub;
  }, []);

  // Duration timer for active broadcast
  useEffect(() => {
    let interval;
    if (activeBroadcast?.isLive) {
      const updateDuration = () => {
        const elapsed = Math.max(0, Math.floor((Date.now() - (activeBroadcast.startedAt || Date.now())) / 1000));
        setLiveDuration(elapsed);
      };
      updateDuration();
      interval = setInterval(updateDuration, 1000);
    } else {
      setLiveDuration(0);
    }
    return () => clearInterval(interval);
  }, [activeBroadcast?.isLive, activeBroadcast?.startedAt]);

  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartConductLive = () => {
    const broadcast = startLiveBroadcast({
      title: customDebateTitle.trim() || '2026 ఎన్నికలు: ఎవరికి అవకాశాలు?',
      host: debateHostName.trim() || 'Now9 Prime Editor',
      constituency: selectedDebateConstituency || activeConstituency?.name || 'Mahabubnagar'
    });
    setActiveBroadcast(broadcast);
    showToast('🔴 LIVE Broadcast is now ON AIR! Immediately visible on the citizen website.');
  };

  const handleEndConductLive = () => {
    const saved = endLiveBroadcast();
    setActiveBroadcast({ isLive: false });
    setRecordedSessions(getRecordedSessions());
    showToast(`⏹️ Broadcast ended & saved to Recorded Sessions on the website!`);
  };

  const handleDeleteRecordedSession = (id) => {
    const updated = deleteRecordedSession(id);
    setRecordedSessions(updated);
    showToast('🗑️ Recorded session deleted from website.');
  };

  // Live Real-Time Voting Metrics (starts strictly at 0)
  const initialBallotData = getStoredBallotData();
  const [totalVotesCount, setTotalVotesCount] = useState(initialBallotData.count);
  const [auditStream, setAuditStream] = useState(initialBallotData.logs);
  const [liveConstituencyVotes, setLiveConstituencyVotes] = useState(initialBallotData.constituencyVotes);
  const [liveQuestionVotes, setLiveQuestionVotes] = useState(initialBallotData.questionVotes);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Real-time listener for incoming citizen votes
  useEffect(() => {
    const handleLiveVote = (e) => {
      const detail = e.detail || getStoredBallotData();
      setTotalVotesCount(detail.count ?? 0);
      if (detail.log) {
        setAuditStream(prev => [detail.log, ...prev.filter(item => item.id !== detail.log.id)].slice(0, 50));
      } else if (detail.count === 0) {
        setAuditStream([]);
      }
      if (detail.constituencyVotes) {
        setLiveConstituencyVotes(detail.constituencyVotes);
      }
      if (detail.questionVotes) {
        setLiveQuestionVotes(detail.questionVotes);
      }
    };

    const handleStorageChange = () => {
      const data = getStoredBallotData();
      setTotalVotesCount(data.count);
      setAuditStream(data.logs);
      setLiveConstituencyVotes(data.constituencyVotes);
      setLiveQuestionVotes(data.questionVotes);
    };

    window.addEventListener(VOTE_CAST_EVENT, handleLiveVote);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener(VOTE_CAST_EVENT, handleLiveVote);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Real-time synchronization: when a citizen logs in from Kurnool or any constituency in the live preview,
  // automatically update the admin dashboard view to match their constituency instantly!
  useEffect(() => {
    const unsubSession = subscribeCitizenSession((session) => {
      if (session) {
        setActiveCitizenSession(session);
        if (session.constituencyKey) {
          setSelectedConstituencyKey(session.constituencyKey);
          
          // Auto un-filter if citizen state is currently excluded by regionFilter
          const isApKey = ['kurnool', 'chandragiri', 'vijayawada', 'guntur', 'visakhapatnam', 'tirupati'].includes(session.constituencyKey);
          if (isApKey) {
            setRegionFilter(prev => prev === 'Telangana' ? 'All' : prev);
          } else {
            setRegionFilter(prev => prev === 'Andhra Pradesh' ? 'All' : prev);
          }
          
          setToastMsg(`⚡ Auto-Synced: Live citizen active in ${session.assembly || session.locality} (${session.method || 'Mobile App'})`);
          setTimeout(() => setToastMsg(null), 4500);
        }
      }
    });
    return unsubSession;
  }, []);

  // Sync if parent passes updated currentLocation
  useEffect(() => {
    if (currentLocation) {
      const key = getConstituencyKeyFromLocation(currentLocation);
      if (key) {
        setSelectedConstituencyKey(key);
      }
    }
  }, [currentLocation]);

  // Live Citizen Activity Stream State (Captures everything customers do on website)
  const [customerActivities, setCustomerActivities] = useState(() => getCustomerActivities());
  const [activityFilter, setActivityFilter] = useState('all'); // 'all' | 'vote' | 'survey' | 'boss-house' | 'live' | 'news' | 'location'
  const [activitySearch, setActivitySearch] = useState('');

  useEffect(() => {
    const unsub = subscribeCustomerActivities((updated) => {
      setCustomerActivities(updated);
    });
    return unsub;
  }, []);

  const handleSimulateCustomerTask = () => {
    const sampleTasks = [
      {
        type: 'vote',
        title: 'Constituency Ballot Cast',
        detail: 'Citizen voted for BRS - V. Srinivas Goud in Yenugonda',
        location: 'Yenugonda, Mahabubnagar',
        icon: '🗳️',
        badgeColor: 'emerald',
        badgeText: 'Electoral Vote'
      },
      {
        type: 'survey',
        title: '5-Question Pulse Response',
        detail: 'Citizen answered Priority #3: "ఉద్యోగాలు, ఉపాధి (Employment & Jobs)"',
        location: 'Mahabubnagar Constituency',
        icon: '📊',
        badgeColor: 'amber',
        badgeText: '5-Question Pulse'
      },
      {
        type: 'boss-house',
        title: 'Boss of House Elimination Vote',
        detail: 'Citizen voted to save "Vishnupriya (విష్ణుప్రియ)" from elimination',
        location: 'Jubilee Hills, Hyderabad',
        icon: '👑',
        badgeColor: 'rose',
        badgeText: 'Boss Elimination'
      },
      {
        type: 'live',
        title: 'Tuned into Live Stream',
        detail: 'Citizen joined live stream: "2026 ఎన్నికలు: ఎవరికి అవకాశాలు?"',
        location: 'LB Nagar, Hyderabad',
        icon: '🔴',
        badgeColor: 'red',
        badgeText: 'Live Stream'
      },
      {
        type: 'news',
        title: 'News Headline Read',
        detail: 'Citizen opened breaking report: "తెలంగాణ అసెంబ్లీ నియోజకవర్గాల్లో ముమ్మర ప్రచారం"',
        location: 'Khairatabad, Hyderabad',
        icon: '📰',
        badgeColor: 'blue',
        badgeText: 'News Reader'
      },
      {
        type: 'location',
        title: 'GPS Geofence Verified',
        detail: 'Citizen verified location in Serilingampally (Gachibowli)',
        location: 'Serilingampally, Hyderabad',
        icon: '📍',
        badgeColor: 'sky',
        badgeText: 'GPS Verified'
      }
    ];
    const picked = sampleTasks[Math.floor(Math.random() * sampleTasks.length)];
    recordCustomerActivity(picked);
    showToast(`⚡ Live Citizen Task Logged: ${picked.title}`);
  };

  const handleClearActivities = () => {
    clearCustomerActivities();
    setCustomerActivities([]);
    showToast('🗑️ Citizen activity log cleared.');
  };

  // Detailed Assembly Standings Data covering ALL Parties across AP & Telangana
  const ALL_CONSTITUENCIES = {
    kurnool: {
      id: 'kurnool',
      code: 'AP-138',
      name: 'Kurnool Assembly Constituency',
      teluguName: 'కర్నూలు శాసనసభ నియోజకవర్గం',
      locality: 'C-Camp (సి-క్యాంప్), Old City, Birla Gate',
      district: 'Kurnool',
      state: 'Andhra Pradesh',
      totalVotes: 37400,
      turnoutRate: '76.8%',
      verifiedRate: '99.8%',
      leadingParty: 'TDP / NDA Alliance',
      leadingCandidate: 'T.G. Bharath',
      margin: '+9.3% (3,478 Votes)',
      parliament: 'Kurnool Lok Sabha',
      parties: [
        { id: 'tdp', name: 'TDP (NDA Alliance)', telugu: 'తెలుగుదేశం పార్టీ (కూటమి)', candidate: 'T.G. Bharath (Sitting MLA / Minister)', symbol: '🚲', voteShare: 48.4, votes: 18101, color: '#EAB308', trend: '+4.1%' },
        { id: 'ysrcp', name: 'YSRCP', telugu: 'వైఎస్సార్సీపీ', candidate: 'A. Md. Imtiaz (Ex-Collector)', symbol: '🪭', voteShare: 42.1, votes: 15745, color: '#0EA5E9', trend: '-2.8%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ (కూటమి)', candidate: 'District Alliance Contender', symbol: '🍵', voteShare: 4.6, votes: 1720, color: '#DC2626', trend: '+1.4%' },
        { id: 'bjp', name: 'BJP', telugu: 'భారతీయ జనతా పార్టీ (కూటమి)', candidate: 'Kurnool City President', symbol: '🪷', voteShare: 2.2, votes: 822, color: '#FF6F00', trend: '+0.5%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Shaik Jailani Basha', symbol: '✋', voteShare: 1.5, votes: 561, color: '#10B981', trend: '-0.8%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Workers Union Nominee', symbol: '🌾', voteShare: 0.5, votes: 187, color: '#BE123C', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Bahujan Nominee', symbol: '🐘', voteShare: 0.4, votes: 150, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others & Independents', telugu: 'ఇతరులు', candidate: 'Independent Contenders', symbol: '🗳️', voteShare: 0.3, votes: 114, color: '#64748B', trend: '-0.5%' },
      ]
    },
    chandragiri: {
      id: 'chandragiri',
      code: 'AP-166',
      name: 'Chandragiri Assembly Constituency',
      teluguName: 'చంద్రగిరి శాసనసభ నియోజకవర్గం',
      locality: 'Chandragiri, Rangampeta, Tirupati Rural',
      district: 'Tirupati',
      state: 'Andhra Pradesh',
      totalVotes: 31200,
      turnoutRate: '84.2%',
      verifiedRate: '99.5%',
      leadingParty: 'TDP / NDA Alliance',
      leadingCandidate: 'Pulivarthi Nani',
      margin: '+8.4% (2,620 Votes)',
      parliament: 'Chittoor Lok Sabha',
      parties: [
        { id: 'tdp', name: 'TDP (NDA Alliance)', telugu: 'తెలుగుదేశం పార్టీ (కూటమి)', candidate: 'Pulivarthi Nani (Sitting MLA)', symbol: '🚲', voteShare: 48.2, votes: 15038, color: '#EAB308', trend: '+2.8%' },
        { id: 'ysrcp', name: 'YSRCP', telugu: 'వైఎస్సార్సీపీ', candidate: 'Chevireddy Mohith Reddy', symbol: '🪭', voteShare: 42.1, votes: 13135, color: '#0EA5E9', trend: '-2.2%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ (కూటమి)', candidate: 'Tirupati Rural Incharge', symbol: '🍵', voteShare: 4.8, votes: 1497, color: '#DC2626', trend: '+1.5%' },
        { id: 'bjp', name: 'BJP', telugu: 'భారతీయ జనతా పార్టీ (కూటమి)', candidate: 'Alliance Nominee', symbol: '🪷', voteShare: 2.3, votes: 717, color: '#FF6F00', trend: '+0.4%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'K. Balaram', symbol: '✋', voteShare: 1.4, votes: 437, color: '#10B981', trend: '-0.3%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Left Contender', symbol: '🌾', voteShare: 0.5, votes: 156, color: '#BE123C', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Bahujan Nominee', symbol: '🐘', voteShare: 0.4, votes: 125, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 0.3, votes: 95, color: '#64748B', trend: '-0.3%' },
      ]
    },
    vijayawada: {
      id: 'vijayawada',
      code: 'AP-80',
      name: 'Vijayawada Central Assembly',
      teluguName: 'విజయవాడ సెంట్రల్ అసెంబ్లీ',
      locality: 'Benz Circle, Moghalrajpuram, Governorpet',
      district: 'NTR / Krishna',
      state: 'Andhra Pradesh',
      totalVotes: 39500,
      turnoutRate: '75.6%',
      verifiedRate: '99.7%',
      leadingParty: 'TDP / NDA Alliance',
      leadingCandidate: 'Bonda Umamaheswara Rao',
      margin: '+9.4% (3,713 Votes)',
      parliament: 'Vijayawada Lok Sabha',
      parties: [
        { id: 'tdp', name: 'TDP (NDA Alliance)', telugu: 'తెలుగుదేశం పార్టీ (కూటమి)', candidate: 'Bonda Umamaheswara Rao', symbol: '🚲', voteShare: 47.2, votes: 18644, color: '#EAB308', trend: '+3.2%' },
        { id: 'ysrcp', name: 'YSRCP', telugu: 'వైఎస్సార్సీపీ', candidate: 'Velampalli Srinivasa Rao', symbol: '🪭', voteShare: 41.5, votes: 16392, color: '#0EA5E9', trend: '-2.5%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ (కూటమి)', candidate: 'Pothina Mahesh / Youth Alliance', symbol: '🍵', voteShare: 5.8, votes: 2291, color: '#DC2626', trend: '+1.6%' },
        { id: 'bjp', name: 'BJP', telugu: 'భారతీయ జనతా పార్టీ (కూటమి)', candidate: 'City Leader', symbol: '🪷', voteShare: 2.6, votes: 1027, color: '#FF6F00', trend: '+0.5%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'City President Nominee', symbol: '✋', voteShare: 1.8, votes: 711, color: '#10B981', trend: '-0.4%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Labor Union Nominee', symbol: '🌾', voteShare: 0.5, votes: 198, color: '#BE123C', trend: '-0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Bahujan Nominee', symbol: '🐘', voteShare: 0.3, votes: 118, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 0.3, votes: 119, color: '#64748B', trend: '-0.3%' },
      ]
    },
    guntur: {
      id: 'guntur',
      code: 'AP-86',
      name: 'Guntur West Assembly',
      teluguName: 'గుంటూరు పశ్చిమ శాసనసభ నియోజకవర్గం',
      locality: 'Brodipet, Arundelpet, Pattabhipuram',
      district: 'Guntur',
      state: 'Andhra Pradesh',
      totalVotes: 35500,
      turnoutRate: '78.2%',
      verifiedRate: '99.6%',
      leadingParty: 'TDP / NDA Alliance',
      leadingCandidate: 'Galla Madhavi',
      margin: '+8.2% (2,911 Votes)',
      parliament: 'Guntur Lok Sabha',
      parties: [
        { id: 'tdp', name: 'TDP (NDA Alliance)', telugu: 'తెలుగుదేశం పార్టీ (కూటమి)', candidate: 'Galla Madhavi (Sitting MLA)', symbol: '🚲', voteShare: 48.5, votes: 17217, color: '#EAB308', trend: '+3.1%' },
        { id: 'ysrcp', name: 'YSRCP', telugu: 'వైఎస్సార్సీపీ', candidate: 'Vidadala Rajini (Ex-Minister)', symbol: '🪭', voteShare: 41.8, votes: 14839, color: '#0EA5E9', trend: '-2.1%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ (కూటమి)', candidate: 'Alliance Incharge', symbol: '🍵', voteShare: 4.8, votes: 1704, color: '#DC2626', trend: '+1.4%' },
        { id: 'bjp', name: 'BJP', telugu: 'భారతీయ జనతా పార్టీ (కూటమి)', candidate: 'City Incharge', symbol: '🪷', voteShare: 2.3, votes: 816, color: '#FF6F00', trend: '+0.4%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Guntur INC President', symbol: '✋', voteShare: 1.6, votes: 568, color: '#10B981', trend: '-0.3%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Labor Union Nominee', symbol: '🌾', voteShare: 0.5, votes: 178, color: '#BE123C', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Guntur Bahujan Nominee', symbol: '🐘', voteShare: 0.4, votes: 142, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others & Independents', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 0.5, votes: 178, color: '#64748B', trend: '-0.2%' },
      ]
    },
    visakhapatnam: {
      id: 'visakhapatnam',
      code: 'AP-20',
      name: 'Visakhapatnam East Assembly',
      teluguName: 'విశాఖపట్నం తూర్పు శాసనసభ నియోజకవర్గం',
      locality: 'Rushikonda, MVP Colony, Beach Road',
      district: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      totalVotes: 47600,
      turnoutRate: '71.5%',
      verifiedRate: '99.9%',
      leadingParty: 'TDP / NDA Alliance',
      leadingCandidate: 'Velagapudi Ramakrishna Babu',
      margin: '+12.8% (6,092 Votes)',
      parliament: 'Visakhapatnam Lok Sabha',
      parties: [
        { id: 'tdp', name: 'TDP (NDA Alliance)', telugu: 'తెలుగుదేశం పార్టీ (కూటమి)', candidate: 'Velagapudi Ramakrishna Babu (Sitting MLA)', symbol: '🚲', voteShare: 51.4, votes: 24466, color: '#EAB308', trend: '+4.2%' },
        { id: 'ysrcp', name: 'YSRCP', telugu: 'వైఎస్సార్సీపీ', candidate: 'MVV Satyanarayana', symbol: '🪭', voteShare: 38.6, votes: 18374, color: '#0EA5E9', trend: '-2.8%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ (కూటమి)', candidate: 'Vizag North Alliance Team', symbol: '🍵', voteShare: 5.2, votes: 2475, color: '#DC2626', trend: '+1.8%' },
        { id: 'bjp', name: 'BJP', telugu: 'భారతీయ జనతా పార్టీ (కూటమి)', candidate: 'Vizag City President', symbol: '🪷', voteShare: 2.4, votes: 1142, color: '#FF6F00', trend: '+0.6%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Steel Plant Forum / INC', symbol: '✋', voteShare: 1.4, votes: 666, color: '#10B981', trend: '-0.4%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Save Vizag Steel Forum', symbol: '🌾', voteShare: 0.6, votes: 286, color: '#BE123C', trend: '+0.2%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Vizag Bahujan Nominee', symbol: '🐘', voteShare: 0.4, votes: 190, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others & Independents', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 0.4, votes: 191, color: '#64748B', trend: '-0.3%' },
      ]
    },
    tirupati: {
      id: 'tirupati',
      code: 'AP-168',
      name: 'Tirupati Assembly Constituency',
      teluguName: 'తిరుపతి శాసనసభ నియోజకవర్గం',
      locality: 'Alipiri, KT Road, Tirumala Footway',
      district: 'Tirupati',
      state: 'Andhra Pradesh',
      totalVotes: 38900,
      turnoutRate: '81.4%',
      verifiedRate: '99.7%',
      leadingParty: 'TDP / NDA Alliance',
      leadingCandidate: 'Arani Srinivasulu',
      margin: '+8.6% (3,345 Votes)',
      parliament: 'Tirupati Lok Sabha',
      parties: [
        { id: 'tdp', name: 'TDP (NDA Alliance)', telugu: 'తెలుగుదేశం పార్టీ (కూటమి)', candidate: 'Arani Srinivasulu (Sitting MLA)', symbol: '🚲', voteShare: 50.8, votes: 19761, color: '#EAB308', trend: '+3.5%' },
        { id: 'ysrcp', name: 'YSRCP', telugu: 'వైఎస్సార్సీపీ', candidate: 'Bhumana Abhinay Reddy', symbol: '🪭', voteShare: 42.2, votes: 16416, color: '#0EA5E9', trend: '-2.4%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ (కూటమి)', candidate: 'Tirupati Urban Incharge', symbol: '🍵', voteShare: 4.2, votes: 1634, color: '#DC2626', trend: '+1.2%' },
        { id: 'bjp', name: 'BJP', telugu: 'భారతీయ జనతా పార్టీ (కూటమి)', candidate: 'Temple City Leader', symbol: '🪷', voteShare: 1.6, votes: 622, color: '#FF6F00', trend: '+0.3%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'City Incharge', symbol: '✋', voteShare: 0.6, votes: 233, color: '#10B981', trend: '-0.2%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Pilgrim Workers Union', symbol: '🌾', voteShare: 0.6, votes: 233, color: '#BE123C', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Bahujan Nominee', symbol: '🐘', voteShare: 0.5, votes: 194, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others & Independents', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 0.6, votes: 234, color: '#64748B', trend: '-0.3%' },
      ]
    },
    mahabubnagar: {
      id: 'mahabubnagar',
      code: 'TS-74',
      name: 'Mahabubnagar Assembly Constituency',
      teluguName: 'మహబూబ్‌నగర్ శాసనసభ నియోజకవర్గం',
      locality: 'Yenugonda (యెనుగొండ) & Mahabubnagar Urban',
      district: 'Mahabubnagar',
      state: 'Telangana',
      totalVotes: 34850,
      turnoutRate: '78.4%',
      verifiedRate: '99.8%',
      leadingParty: 'Congress (INC)',
      leadingCandidate: 'Yennam Srinivas Reddy',
      margin: '+5.4% (1,881 Votes)',
      parliament: 'Mahabubnagar Lok Sabha',
      parties: [
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Yennam Srinivas Reddy (Sitting MLA)', symbol: '✋', voteShare: 44.2, votes: 15403, color: '#0284C7', trend: '+2.8%' },
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'V. Srinivas Goud (Ex-Minister)', symbol: '🚗', voteShare: 38.8, votes: 13521, color: '#EC4899', trend: '-1.4%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'A.P. Mithun Kumar Reddy', symbol: '🪷', voteShare: 11.5, votes: 4007, color: '#F97316', trend: '+1.1%' },
        { id: 'aimim', name: 'AIMIM', telugu: 'మజ్లిస్ (AIMIM)', candidate: 'Constituency Incharge', symbol: '🪁', voteShare: 1.8, votes: 627, color: '#059669', trend: '+0.2%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ', candidate: 'Palamuru Youth President', symbol: '🍵', voteShare: 1.6, votes: 557, color: '#DC2626', trend: '+0.5%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Rythu Sangham Nominee', symbol: '🌾', voteShare: 0.8, votes: 278, color: '#BE123C', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Bahujan Nominee', symbol: '🐘', voteShare: 0.7, votes: 244, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others & Independents', telugu: 'ఇతరులు', candidate: 'Independent Contenders', symbol: '🗳️', voteShare: 0.6, votes: 209, color: '#64748B', trend: '-0.3%' },
      ]
    },
    lbnagar: {
      id: 'lbnagar',
      code: 'TS-51',
      name: 'LB Nagar Assembly Constituency',
      teluguName: 'ఎల్బీ నగర్ శాసనసభ నియోజకవర్గం',
      locality: 'Almasguda, Badangpet, Meerpet, Saroornagar',
      district: 'Ranga Reddy',
      state: 'Telangana',
      totalVotes: 42180,
      turnoutRate: '69.2%',
      verifiedRate: '99.5%',
      leadingParty: 'Congress (INC)',
      leadingCandidate: 'Madhu Yaskhi Goud',
      margin: '+3.7% (1,560 Votes)',
      parliament: 'Chevella / Malkajgiri Lok Sabha',
      parties: [
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Madhu Yaskhi Goud (Ruling Nominee)', symbol: '✋', voteShare: 40.2, votes: 16956, color: '#0284C7', trend: '+2.1%' },
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'Devireddy Sudheer Reddy (Sitting MLA)', symbol: '🚗', voteShare: 36.8, votes: 15522, color: '#EC4899', trend: '-0.8%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'Sama Ranga Reddy', symbol: '🪷', voteShare: 17.2, votes: 7254, color: '#F97316', trend: '+1.4%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ', candidate: 'Ranga Reddy Youth Incharge', symbol: '🍵', voteShare: 2.4, votes: 1012, color: '#DC2626', trend: '+0.6%' },
        { id: 'aimim', name: 'AIMIM', telugu: 'మజ్లిస్ (AIMIM)', candidate: 'Local Contender', symbol: '🪁', voteShare: 1.6, votes: 674, color: '#059669', trend: '+0.1%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Workers Union Nominee', symbol: '🌾', voteShare: 0.7, votes: 295, color: '#BE123C', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Bahujan Contestant', symbol: '🐘', voteShare: 0.6, votes: 253, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independent Contenders', symbol: '🗳️', voteShare: 0.5, votes: 214, color: '#64748B', trend: '-0.3%' },
      ]
    },
    jubileehills: {
      id: 'jubileehills',
      code: 'TS-61',
      name: 'Jubilee Hills Assembly Constituency',
      teluguName: 'జూబ్లీ హిల్స్ శాసనసభ నియోజకవర్గం',
      locality: 'Jubilee Hills, Film Nagar, Banjara Hills',
      district: 'Hyderabad',
      state: 'Telangana',
      totalVotes: 38920,
      turnoutRate: '64.5%',
      verifiedRate: '99.9%',
      leadingParty: 'BRS',
      leadingCandidate: 'Maganti Gopinath',
      margin: '+5.7% (2,218 Votes)',
      parliament: 'Secunderabad Lok Sabha',
      parties: [
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'Maganti Gopinath (Sitting MLA)', symbol: '🚗', voteShare: 39.5, votes: 15373, color: '#EC4899', trend: '+1.2%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Mohammed Azharuddin', symbol: '✋', voteShare: 35.2, votes: 13699, color: '#0284C7', trend: '+0.5%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'Lankala Deepak Reddy', symbol: '🪷', voteShare: 17.5, votes: 6811, color: '#F97316', trend: '-1.0%' },
        { id: 'aimim', name: 'AIMIM', telugu: 'మజ్లిస్ (AIMIM)', candidate: 'Rashed Faraz Dildar', symbol: '🪁', voteShare: 4.8, votes: 1868, color: '#059669', trend: '-0.7%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ', candidate: 'Youth Wing Candidate', symbol: '🍵', voteShare: 1.4, votes: 545, color: '#DC2626', trend: '+0.4%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Left Contender', symbol: '🌾', voteShare: 0.6, votes: 233, color: '#BE123C', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Bahujan Nominee', symbol: '🐘', voteShare: 0.5, votes: 195, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 0.5, votes: 196, color: '#64748B', trend: '-0.4%' },
      ]
    },
    serilingampally: {
      id: 'serilingampally',
      code: 'TS-52',
      name: 'Serilingampally Assembly Constituency',
      teluguName: 'శేరిలింగంపల్లి శాసనసభ నియోజకవర్గం',
      locality: 'Gachibowli, HITEC City, Madhapur, Kondapur, Miyapur',
      district: 'Ranga Reddy',
      state: 'Telangana',
      totalVotes: 58240,
      turnoutRate: '61.8%',
      verifiedRate: '99.7%',
      leadingParty: 'BRS',
      leadingCandidate: 'Arekapudi Gandhi',
      margin: '+5.7% (3,319 Votes)',
      parliament: 'Chevella Lok Sabha',
      parties: [
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'Arekapudi Gandhi (Sitting MLA)', symbol: '🚗', voteShare: 42.5, votes: 24752, color: '#EC4899', trend: '+1.8%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Jagadeeshwar Goud', symbol: '✋', voteShare: 37.2, votes: 21665, color: '#0284C7', trend: '+1.1%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'Ravi Kumar Yadav', symbol: '🪷', voteShare: 15.5, votes: 9027, color: '#F97316', trend: '-2.0%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ', candidate: 'IT Corridor Youth Wing', symbol: '🍵', voteShare: 2.4, votes: 1397, color: '#DC2626', trend: '+0.4%' },
        { id: 'aimim', name: 'AIMIM', telugu: 'మజ్లిస్ (AIMIM)', candidate: 'Local Corporator Candidate', symbol: '🪁', voteShare: 1.0, votes: 582, color: '#059669', trend: '+0.1%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Labour Forum Nominee', symbol: '🌾', voteShare: 0.6, votes: 349, color: '#BE123C', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Cyberabad Bahujan Nominee', symbol: '🐘', voteShare: 0.5, votes: 291, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 0.8, votes: 468, color: '#64748B', trend: '-0.9%' },
      ]
    },
    kukatpally: {
      id: 'kukatpally',
      code: 'TS-46',
      name: 'Kukatpally Assembly Constituency',
      teluguName: 'కూకట్‌పల్లి శాసనసభ నియోజకవర్గం',
      locality: 'KPHB Colony, Kukatpally, Moosapet',
      district: 'Medchal-Malkajgiri',
      state: 'Telangana',
      totalVotes: 43800,
      turnoutRate: '65.4%',
      verifiedRate: '99.7%',
      leadingParty: 'BRS',
      leadingCandidate: 'Madhavaram Krishna Rao',
      margin: '+9.6% (4,220 Votes)',
      parliament: 'Malkajgiri Lok Sabha',
      parties: [
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'Madhavaram Krishna Rao (Sitting MLA)', symbol: '🚗', voteShare: 43.8, votes: 19184, color: '#EC4899', trend: '+1.6%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Bandi Ramesh', symbol: '✋', voteShare: 34.2, votes: 14979, color: '#0284C7', trend: '+0.8%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'M. Prem Kumar', symbol: '🪷', voteShare: 17.5, votes: 7665, color: '#F97316', trend: '-1.4%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ', candidate: 'KPHB Colony Alliance Wing', symbol: '🍵', voteShare: 2.5, votes: 1095, color: '#DC2626', trend: '+0.5%' },
        { id: 'aimim', name: 'AIMIM', telugu: 'మజ్లిస్ (AIMIM)', candidate: 'Constituency Nominee', symbol: '🪁', voteShare: 0.8, votes: 350, color: '#059669', trend: '+0.1%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'KPHB Left Union Nominee', symbol: '🌾', voteShare: 0.6, votes: 262, color: '#BE123C', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Bahujan Nominee', symbol: '🐘', voteShare: 0.5, votes: 219, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others & Independents', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 1.2, votes: 527, color: '#64748B', trend: '-0.3%' },
      ]
    },
    munugode: {
      id: 'munugode',
      code: 'TS-93',
      name: 'Munugode Assembly Constituency',
      teluguName: 'మునుగోడు శాసనసభ నియోజకవర్గం',
      locality: 'Chandur, Choutuppal, Marriguda',
      district: 'Nalgonda',
      state: 'Telangana',
      totalVotes: 32150,
      turnoutRate: '86.4%',
      verifiedRate: '99.4%',
      leadingParty: 'Congress (INC)',
      leadingCandidate: 'Komatireddy Raj Gopal Reddy',
      margin: '+9.6% (3,086 Votes)',
      parliament: 'Bhongir Lok Sabha',
      parties: [
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Komatireddy Raj Gopal Reddy (Sitting MLA)', symbol: '✋', voteShare: 43.1, votes: 13856, color: '#0284C7', trend: '+3.4%' },
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'Kusukuntla Prabhakar Reddy', symbol: '🚗', voteShare: 33.8, votes: 10866, color: '#EC4899', trend: '-2.1%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'Boora Narsaiah Goud', symbol: '🪷', voteShare: 17.8, votes: 5722, color: '#F97316', trend: '+0.8%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Left Contender', symbol: '🌾', voteShare: 3.2, votes: 1028, color: '#BE123C', trend: '+0.5%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ', candidate: 'Youth Wing Nominee', symbol: '🍵', voteShare: 1.1, votes: 353, color: '#DC2626', trend: '+0.2%' },
        { id: 'aimim', name: 'AIMIM', telugu: 'మజ్లిస్ (AIMIM)', candidate: 'Nalgonda District AIMIM Incharge', symbol: '🪁', voteShare: 0.8, votes: 257, color: '#059669', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Bahujan Nominee', symbol: '🐘', voteShare: 0.6, votes: 193, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 1.0, votes: 325, color: '#64748B', trend: '-2.1%' },
      ]
    },
    gajwel: {
      id: 'gajwel',
      code: 'TS-40',
      name: 'Gajwel Assembly Constituency',
      teluguName: 'గజ్వేల్ శాసనసభ నియోజకవర్గం',
      locality: 'Gajwel, Toopran, Wargal',
      district: 'Siddipet',
      state: 'Telangana',
      totalVotes: 36400,
      turnoutRate: '88.1%',
      verifiedRate: '99.6%',
      leadingParty: 'BRS',
      leadingCandidate: 'K. Chandrashekar Rao',
      margin: '+12.6% (4,586 Votes)',
      parliament: 'Medak Lok Sabha',
      parties: [
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'K. Chandrashekar Rao (Sitting MLA)', symbol: '🚗', voteShare: 51.5, votes: 18746, color: '#EC4899', trend: '+1.5%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Thumkunta Narsa Reddy', symbol: '✋', voteShare: 39.2, votes: 14268, color: '#0284C7', trend: '-0.4%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'Eatala Rajender', symbol: '🪷', voteShare: 6.8, votes: 2475, color: '#F97316', trend: '-1.1%' },
        { id: 'jsp', name: 'JanaSena (JSP)', telugu: 'జనసేన పార్టీ', candidate: 'Alliance Candidate', symbol: '🍵', voteShare: 1.1, votes: 400, color: '#DC2626', trend: '+0.2%' },
        { id: 'cpi', name: 'CPI / Left Front', telugu: 'సీపీఐ / వామపక్షాలు', candidate: 'Peasant Forum Contender', symbol: '🌾', voteShare: 0.7, votes: 255, color: '#BE123C', trend: '+0.1%' },
        { id: 'aimim', name: 'AIMIM', telugu: 'మజ్లిస్ (AIMIM)', candidate: 'Medak District AIMIM Incharge', symbol: '🪁', voteShare: 0.8, votes: 291, color: '#059669', trend: '+0.1%' },
        { id: 'bsp', name: 'BSP', telugu: 'బహుజన్ సమాజ్ పార్టీ', candidate: 'Bahujan Nominee', symbol: '🐘', voteShare: 0.5, votes: 182, color: '#1D4ED8', trend: '0.0%' },
        { id: 'oth', name: 'Others & Independents', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 0.7, votes: 256, color: '#64748B', trend: '-0.3%' },
      ]
    }
  };

  // 100% DYNAMIC REAL-TIME CONSTITUENCY COMPUTATION
  const baseConstituency = ALL_CONSTITUENCIES[selectedConstituencyKey] || ALL_CONSTITUENCIES.mahabubnagar;
  const currentConstVotes = liveConstituencyVotes[selectedConstituencyKey] || { total: 0, parties: {} };
  const realConstTotalVotes = currentConstVotes.total || 0;
  
  const activeConstituencyParties = baseConstituency.parties.map(party => {
    const pVotes = currentConstVotes.parties?.[party.id] || 0;
    const pShare = realConstTotalVotes > 0 
      ? Math.round((pVotes / realConstTotalVotes) * 1000) / 10 
      : 0;
    return {
      ...party,
      votes: pVotes,
      voteShare: pShare,
      trend: pVotes > 0 ? `+${pVotes} Votes` : '0 Votes'
    };
  }).sort((a, b) => b.votes - a.votes);

  const topParty = activeConstituencyParties[0];
  const secondParty = activeConstituencyParties[1];
  const leadingMargin = realConstTotalVotes === 0 
    ? '0 Votes • Waiting for first ballot' 
    : (topParty.votes === secondParty?.votes 
        ? `Tied (${topParty.votes} Votes each)`
        : `+${Math.round((topParty.voteShare - (secondParty?.voteShare || 0)) * 10) / 10}% (${topParty.votes - (secondParty?.votes || 0)} Votes Lead)`);

  const activeConstituency = {
    ...baseConstituency,
    totalVotes: realConstTotalVotes,
    leadingParty: realConstTotalVotes === 0 ? 'Awaiting First Vote' : topParty.name,
    leadingCandidate: realConstTotalVotes === 0 ? 'No votes cast yet' : topParty.candidate,
    margin: leadingMargin,
    parties: activeConstituencyParties
  };

  const handleCastVoterChoice = (partyName, candidateName, partyId, optIdx = 0) => {
    const constName = activeConstituency.name;
    const locality = activeConstituency.locality?.split(',')[0] || 'Yenugonda';
    recordLiveBallot({
      party: { name: partyName, candidate: candidateName, id: partyId },
      location: { assembly: constName, locality: locality, state: activeConstituency.state },
      answers: { 0: optIdx, 1: 0, 2: 0, 3: 0, 4: 0 }
    });
    showToast(`⚡ Voted ${partyName} in ${constName}! Check Sections 1, 2, 3, 4 below.`);
  };

  // Dynamic Survey Questions List (persisted in localStorage)
  const [surveyQuestionsList, setSurveyQuestionsList] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('now9_custom_questions_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return SURVEY_QUESTIONS || [];
  });

  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [newQuestionCategory, setNewQuestionCategory] = useState('');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOptions, setNewQuestionOptions] = useState([
    'చాలా బాగుంది (Very Good)',
    'మెరుగుపడాలి (Needs Improvement)',
    'అసంతృప్తికరం (Poor)',
    'స్పందించలేదు (No Opinion)'
  ]);

  const handleAddNewQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) {
      showToast('⚠️ Please enter the question text.');
      return;
    }
    const validOptions = newQuestionOptions.filter(opt => opt.trim().length > 0);
    if (validOptions.length < 2) {
      showToast('⚠️ Please provide at least 2 voting options for the question.');
      return;
    }

    const nextStep = surveyQuestionsList.length + 1;
    const newQ = {
      step: nextStep,
      id: `q${nextStep}_${Date.now()}`,
      headerLabel: `${nextStep} of ${nextStep}`,
      category: newQuestionCategory.trim() || `Priority #${nextStep}: స్థానిక సమస్యలు (Civic Issue)`,
      question: newQuestionText.trim(),
      options: validOptions,
      defaultSelected: 0,
      isCustom: true
    };

    const nextList = [...surveyQuestionsList, newQ];
    setSurveyQuestionsList(nextList);
    try {
      localStorage.setItem('now9_custom_questions_v1', JSON.stringify(nextList));
      window.dispatchEvent(new CustomEvent('now9_questions_updated', { detail: nextList }));
    } catch (err) {}

    setIsAddQuestionModalOpen(false);
    setNewQuestionText('');
    setNewQuestionCategory('');
    setNewQuestionOptions([
      'చాలా బాగుంది (Very Good)',
      'మెరుగుపడాలి (Needs Improvement)',
      'అసంతృప్తికరం (Poor)',
      'స్పందించలేదు (No Opinion)'
    ]);
    showToast(`✅ Question #${nextStep} published live to Citizen Survey!`);
  };

  const handleDeleteQuestion = (qId) => {
    const nextList = surveyQuestionsList.filter(q => q.id !== qId).map((q, idx) => ({
      ...q,
      step: idx + 1,
      headerLabel: `${idx + 1} of ${surveyQuestionsList.length - 1}`
    }));
    setSurveyQuestionsList(nextList);
    try {
      localStorage.setItem('now9_custom_questions_v1', JSON.stringify(nextList));
      window.dispatchEvent(new CustomEvent('now9_questions_updated', { detail: nextList }));
    } catch (err) {}
    showToast('🗑️ Custom question removed from survey.');
  };

  // Real-Time Question Analytics computed from dynamic list
  const QUESTION_ANALYTICS = surveyQuestionsList.map((q, qIdx) => {
    const qVotes = liveQuestionVotes[qIdx] || {};
    const totalQVotes = Object.values(qVotes).reduce((sum, v) => sum + v, 0);
    const optionsWithVotes = q.options.map((opt, optIdx) => {
      const votes = qVotes[optIdx] || 0;
      const percent = totalQVotes > 0 ? Math.round((votes / totalQVotes) * 1000) / 10 : 0;
      return {
        label: opt,
        votes: votes,
        percent: percent,
        color: ['#0284C7', '#EAB308', '#10B981', '#8B5CF6'][optIdx % 4]
      };
    });
    return {
      id: q.id || `q${qIdx + 1}`,
      step: qIdx + 1,
      category: q.category || `Priority #${qIdx + 1}`,
      title: q.question,
      totalSample: totalQVotes,
      options: optionsWithVotes,
      isCustom: !!q.isCustom
    };
  });

  // Boss of House (Entertainment Contestants) Voting
  const [bossContestants, setBossContestants] = useState(() => getPublishedHousemates());
  const [newHousemateName, setNewHousemateName] = useState('');
  const [newHousemateTelugu, setNewHousemateTelugu] = useState('');
  const [newHousemateRole, setNewHousemateRole] = useState('Actress / Actor');
  const [newHousemateStatus, setNewHousemateStatus] = useState('Nominated');
  const [newHousemateAvatar, setNewHousemateAvatar] = useState('🌟');

  useEffect(() => {
    const unsub = subscribeHousemates((updatedList) => {
      setBossContestants(updatedList);
    });
    return unsub;
  }, []);

  const handleAddHousemate = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newHousemateName.trim()) {
      showToast('⚠️ Please enter the housemate name.');
      return;
    }
    const created = addHousemate({
      name: newHousemateName.trim(),
      teluguName: newHousemateTelugu.trim() || newHousemateName.trim(),
      role: newHousemateRole.trim() || 'Housemate',
      status: newHousemateStatus,
      avatar: newHousemateAvatar
    });
    if (created) {
      setBossContestants(getPublishedHousemates());
      setNewHousemateName('');
      setNewHousemateTelugu('');
      showToast(`✅ Housemate "${created.name}" published live to Boss of House voting!`);
    }
  };

  const handleToggleHousemateStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Nominated' ? 'Safe' : (currentStatus === 'Safe' ? 'Danger Zone' : 'Nominated');
    const updated = updateHousemate(id, { status: nextStatus });
    setBossContestants(updated);
    showToast(`Status updated to "${nextStatus}"`);
  };

  const handleDeleteHousemate = (id, name) => {
    const updated = deleteHousemate(id);
    setBossContestants(updated);
    showToast(`🗑️ Removed ${name} from housemates.`);
  };

  const handleResetHousemateTally = () => {
    const reset = resetHousemateVotes();
    setBossContestants(reset);
    showToast('🔄 Elimination votes reset to 0 for the new voting week!');
  };

// Real-time auditStream managed via voteStore

  // Live News Management (Connected to News Store)
  const [newsFeed, setNewsFeed] = useState(() => getPublishedNews());
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('Mahabubnagar');

  useEffect(() => {
    const unsub = subscribeNews((updatedList) => {
      setNewsFeed(updatedList);
    });
    return unsub;
  }, []);

  const handleAddNews = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newNewsTitle.trim()) {
      showToast('⚠️ Please enter a news headline to publish live.');
      return;
    }
    const published = publishNewsItem({
      title: newNewsTitle.trim(),
      category: newNewsCategory
    });
    if (published) {
      setNewsFeed(getPublishedNews());
      setNewNewsTitle('');
      showToast('📰 Breaking News Alert published live! Now visible on Citizen Mobile App.');
    }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Constituency_ID,Constituency_Name,District,State,Total_Ballots,Party,Candidate,Vote_Share,Votes\n" +
      Object.values(ALL_CONSTITUENCIES).flatMap(c => 
        c.parties.map(p => `"${c.code}","${c.name}","${c.district}","${c.state}",${c.totalVotes},"${p.name}","${p.candidate}",${p.voteShare}%,${p.votes}`)
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Now9_Election_Standings_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Official CSV Report downloaded successfully (8 Assemblies, 32 Candidates)');
  };

  // Filtered constituencies list based on region and search query
  const filteredConstituenciesList = Object.values(ALL_CONSTITUENCIES).filter(c => {
    // If this constituency is where the citizen is currently logged in, NEVER filter it out
    const isCitizenActive = activeCitizenSession?.constituencyKey === c.id;
    if (isCitizenActive) return true;
    if (regionFilter !== 'All' && c.state !== regionFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || 
           c.locality.toLowerCase().includes(q) || 
           c.district.toLowerCase().includes(q) ||
           c.code.toLowerCase().includes(q);
  }).sort((a, b) => {
    const aActive = activeCitizenSession?.constituencyKey === a.id;
    const bActive = activeCitizenSession?.constituencyKey === b.id;
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;
    return 0;
  });

  return (
    <div className="w-full min-h-screen bg-[#070709] text-white flex flex-col font-sans select-none antialiased">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-4 right-6 z-50 bg-[#1A160E] border-2 border-amber-400 text-amber-300 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl animate-fadeIn flex items-center gap-2.5 backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Global Command Bar */}
      <header className="h-14 bg-[#0E0E14] border-b border-[#20202E] px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-3 shrink-0 z-40 sticky top-0 shadow-lg">
        {/* Brand & Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-xl bg-[#161622] hover:bg-[#1E1E30] border border-[#2B2B3E] text-amber-300 transition-colors cursor-pointer"
            title="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2">
            <img 
              src="/now9_icon.png" 
              alt="now9 logo" 
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-xl shadow-md ring-1 ring-amber-400/40"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-tight text-white">
                  now<span className="text-[#F5C754]">nine</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[#F5C754] text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider">
                  COMMAND
                </span>
              </div>
              <p className="text-[8px] text-gray-400 leading-none hidden sm:block">
                Electoral Data Monitoring & Live Standings
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#20202E]">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>24/7 Live Ingestion Online</span>
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              Total Ballots: <strong className="text-white">{totalVotesCount.toLocaleString()}</strong>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[10px] font-extrabold ml-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Active Citizen: <strong className="text-white font-black">{activeCitizenSession?.assembly?.replace(' Assembly Constituency', '').replace(' Assembly', '') || baseConstituency.name.replace(' Assembly Constituency', '')}</strong> ({activeCitizenSession?.locality || baseConstituency.locality})</span>
            </span>
          </div>
        </div>

        {/* Global Controls & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Embargo Control Pill */}
          <button
            type="button"
            onClick={() => {
              const next = !isEmbargoActive;
              setIsEmbargoActive(next);
              showToast(next 
                ? '🔒 Public Embargo ACTIVE: Survey results are hidden from ordinary voters' 
                : '⚠️ Public Embargo OFF: Standings exposed publicly');
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-[10px] font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
              isEmbargoActive
                ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/25'
                : 'bg-red-500/15 border-red-400/50 text-red-300 hover:bg-red-500/25'
            }`}
            title="Toggle Public Results Visibility"
          >
            {isEmbargoActive ? <Lock className="w-3.5 h-3.5 text-emerald-400" /> : <Unlock className="w-3.5 h-3.5 text-red-400" />}
            <span className="hidden md:inline">
              {isEmbargoActive ? 'Results Embargo: LOCKED' : 'Results Embargo: OPEN'}
            </span>
          </button>

          {/* Export CSV Report */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="hidden sm:flex px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#161622] hover:bg-[#1E1E30] border border-[#2B2B3E] text-amber-300 hover:text-white text-[10.5px] font-bold items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            title="Download CSV Electoral Report"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Export CSV</span>
          </button>

          {/* Refresh Data */}
          <button
            type="button"
            onClick={() => {
              setRefreshCount(prev => prev + 1);
              showToast('🔄 Real-time polling database refreshed across all clusters');
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-[#161622] hover:bg-[#1E1E30] border border-[#2B2B3E] text-gray-300 hover:text-amber-300 transition-all cursor-pointer"
            title="Refresh Live Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Copy Direct Admin Link */}
          <button
            type="button"
            onClick={() => {
              const adminUrl = window.location.origin + window.location.pathname + '#admin';
              navigator.clipboard?.writeText(adminUrl);
              showToast(`📋 Admin URL copied: ${adminUrl}`);
            }}
            className="hidden sm:flex px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#161622] hover:bg-[#1E1E30] border border-amber-500/40 text-amber-300 hover:text-white text-[10.5px] font-bold items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            title="Copy Direct Admin Link"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Copy Link</span>
          </button>

          {/* Switch to Citizen Mobile View */}
          <button
            type="button"
            onClick={onSwitchToMobile || onClose}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#F8CD55] to-[#E3A336] text-black font-extrabold text-[10.5px] shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            title="Return to Citizen Mobile App"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Mobile App</span>
            <span className="sm:hidden">App</span>
          </button>
        </div>
      </header>

      {/* Universal Top Horizontal Module Switcher Bar (Placed Horizontally Across Desktop, Laptops & Mobile) */}
      <div className="w-full bg-[#0A0A0F] border-b border-[#1C1C28] px-2 sm:px-6 py-2.5 overflow-x-auto phone-scroll shrink-0 z-30 shadow-md">
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-max">
          {[
            { id: 'overview', label: 'Dashboard Overview', shortLabel: 'Overview', icon: BarChart3, badge: 'Live' },
            { id: 'customer-tasks', label: 'Live Citizen Tasks', shortLabel: 'Citizen Tasks', icon: Activity, count: `${customerActivities.length}` },
            { id: 'constituencies', label: 'Constituency Standings', shortLabel: 'Standings', icon: Vote, count: '8 Hot' },
            { id: 'surveys', label: '5-Question Pulse', shortLabel: 'Surveys', icon: FileText, count: '124K' },
            { id: 'live-debates', label: 'Live On & Debates', shortLabel: 'Live Debates', icon: Radio, badge: 'Active' },
            { id: 'news', label: 'News & Flash Ticker', shortLabel: 'News', icon: Newspaper, count: '4' },
            { id: 'boss-house', label: 'Boss of House Voting', shortLabel: 'Boss House', icon: Eye, count: '300K+' },
            { id: 'settings', label: 'Embargo & Settings', shortLabel: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-black font-black shadow-lg shadow-amber-500/25 ring-1 ring-amber-300 scale-[1.02]'
                    : 'bg-[#14141E] text-gray-400 hover:text-white hover:bg-[#1C1C28] border border-[#232332]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-black stroke-[2.5]' : 'text-amber-400'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                {tab.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[8px] font-black uppercase tracking-wider ${
                    isActive ? 'bg-black text-amber-300' : 'bg-red-600 text-white animate-pulse'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-mono font-bold ${
                    isActive ? 'bg-black/30 text-black font-black' : 'bg-white/10 text-gray-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Citizen Active Constituency Sync Bar (Shown on secondary tabs for quick context) */}
      {activeCitizenSession && activeTab !== 'overview' && (
        <div className="w-full bg-gradient-to-r from-amber-500/20 via-[#13121F] to-emerald-500/15 border-b border-amber-400/30 px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0 z-20 shadow-md">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-amber-300">
              ⚡ Live Citizen Login Auto-Synced:
            </span>
            <span className="text-xs font-black text-white px-2.5 py-0.5 rounded-lg bg-black/50 border border-amber-400/40">
              📍 {activeCitizenSession.assembly || activeCitizenSession.locality} ({activeCitizenSession.locality}, {activeCitizenSession.state})
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-gray-300">
              via <span className="font-mono text-emerald-400 font-bold">{activeCitizenSession.method || 'Mobile App'}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedConstituencyKey(activeCitizenSession.constituencyKey);
              setActiveTab('constituencies');
              showToast(`Viewing live standings for ${activeCitizenSession.assembly}`);
            }}
            className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <Vote className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>View {activeCitizenSession.assembly?.replace(' Assembly Constituency', '').replace(' Assembly', '')} Standings & Parties →</span>
          </button>
        </div>
      )}

      {/* Main Layout: Dynamic Admin Views (100% Full-Width) */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0 w-full">
        {/* Right Main Content Panel (100% width on mobile, full responsiveness) */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 bg-[#07070A] w-full min-w-0">

          {/* VIEW 1: DASHBOARD OVERVIEW (Executive, Clean & Crystal Clear) */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Sleek Executive Header Bar: Active Ingestion & Constituency Selector */}
              <div className="p-4 rounded-2xl bg-[#0F0F16] border border-[#222232] shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black shadow-inner shrink-0">
                    <Vote className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                        Electoral Command Overview
                      </h1>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-400/30 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Ingestion Active
                      </span>
                      {activeCitizenSession && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/30 flex items-center gap-1">
                          📍 Citizen Synced: {activeCitizenSession.locality}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Focus: <strong className="text-white">{activeConstituency.name} ({activeConstituency.code})</strong> • {activeConstituency.locality}, {activeConstituency.state}
                    </p>
                  </div>
                </div>

                {/* Constituency Selector + Subtle Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-[#14141E] border border-[#2A2A3E] rounded-xl px-2.5 py-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <select
                      value={selectedConstituencyKey}
                      onChange={(e) => setSelectedConstituencyKey(e.target.value)}
                      className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer pr-1"
                    >
                      {Object.values(ALL_CONSTITUENCIES).map(c => (
                        <option key={c.id} value={c.id} className="bg-[#12121C] text-white">
                          {c.name} ({c.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      recordLiveBallot({
                        party: { name: activeConstituency.parties[0]?.name || 'Congress (INC)', candidate: activeConstituency.parties[0]?.candidate || '', id: activeConstituency.parties[0]?.id || 'inc' },
                        location: { assembly: activeConstituency.name, locality: activeConstituency.locality?.split(',')[0] || 'Center', state: activeConstituency.state },
                        answers: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
                      });
                      showToast(`🗳️ 1 Live ballot recorded for ${activeConstituency.parties[0]?.name} in ${activeConstituency.name}!`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    title="Cast 1 test vote to test live increment"
                  >
                    <Vote className="w-3.5 h-3.5 text-amber-400" />
                    <span>+1 Test Vote</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetAllBallotsToZero();
                      showToast('🗑️ All ballots reset to 0! Ledger cleared.');
                    }}
                    className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all cursor-pointer"
                    title="Reset ballot count to 0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 4 Clean Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-[#0F0F16] border border-[#222232] shadow-sm hover:border-[#32324A] transition-all">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span className="font-bold text-gray-300">Total Ballots Cast</span>
                    <Vote className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {totalVotesCount > 0 ? totalVotesCount.toLocaleString() : activeConstituency.totalVotes.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Verified Cryptographic Trail
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0F0F16] border border-[#222232] shadow-sm hover:border-[#32324A] transition-all">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span className="font-bold text-gray-300">Active Constituency</span>
                    <MapPin className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white truncate">
                    {activeConstituency.name}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono mt-1 block">
                    {activeConstituency.code} • {activeConstituency.district}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0F0F16] border border-[#222232] shadow-sm hover:border-[#32324A] transition-all">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span className="font-bold text-gray-300">Leading Trend</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-lg sm:text-xl font-black text-amber-300 truncate">
                    {activeConstituency.leadingParty}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono mt-1 block truncate">
                    {activeConstituency.margin}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0F0F16] border border-[#222232] shadow-sm hover:border-[#32324A] transition-all">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span className="font-bold text-gray-300">Turnout & Integrity</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    {activeConstituency.turnoutRate || '78.4%'}
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold mt-1 block">
                    99.8% Geofence Verified
                  </span>
                </div>
              </div>

              {/* Main Executive Two-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* LEFT COLUMN: ACTIVE CONSTITUENCY LIVE STANDINGS (ALL 8 PARTIES) */}
                <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#0F0F16] border border-[#222232] shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1E1E2C]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-black text-white">
                          {activeConstituency.name}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[9px] font-mono font-bold">
                          {activeConstituency.code}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-telugu mt-0.5">
                        {activeConstituency.teluguName} • {activeConstituency.locality}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block font-mono">Counted Ballots</span>
                      <span className="text-sm font-black text-white font-mono">
                        {activeConstituency.totalVotes.toLocaleString()} votes
                      </span>
                    </div>
                  </div>

                  {/* All 8 Parties Standings List */}
                  <div className="space-y-3">
                    {activeConstituency.parties.map((party, rank) => (
                      <div 
                        key={party.id}
                        className="p-3 rounded-xl bg-[#14141E] border border-[#20202E] hover:border-[#323248] transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-[#1A1A28] border border-white/10 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                              #{rank + 1}
                            </span>
                            <span className="text-xl shrink-0">{party.symbol}</span>
                            <div className="min-w-0 truncate">
                              <span className="font-extrabold text-white text-xs sm:text-sm block truncate">
                                {party.name}
                              </span>
                              <span className="text-[10px] text-gray-400 truncate block">
                                {party.candidate}
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0 ml-2">
                            <span className="text-sm font-black font-mono block" style={{ color: party.color }}>
                              {party.voteShare}%
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {party.votes.toLocaleString()} votes
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 bg-[#1C1C28] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${Math.max(party.voteShare, 1)}%`, backgroundColor: party.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab('constituencies')}
                      className="text-xs text-amber-400 hover:text-amber-300 font-bold hover:underline transition-colors cursor-pointer"
                    >
                      View All 13 Assembly Standings & Vote Shares →
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: LIVE CITIZEN TASKS & ACTIVITY FEED */}
                <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#0F0F16] border border-[#222232] shadow-md space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#1E1E2C]">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <h2 className="text-sm sm:text-base font-black text-white">
                          Live Citizen Activity Stream
                        </h2>
                      </div>
                      <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 font-mono font-bold">
                        {customerActivities.length} Tasks
                      </span>
                    </div>

                    <div className="space-y-2.5 mt-3">
                      {customerActivities.length === 0 ? (
                        <div className="p-6 text-center text-xs text-gray-500 bg-[#12121A] rounded-xl border border-dashed border-[#222232]">
                          <p className="font-bold text-gray-400">Waiting for live citizen actions</p>
                          <p className="text-[10px] text-gray-500 mt-1">Actions performed on the citizen app appear here live.</p>
                        </div>
                      ) : (
                        customerActivities.slice(0, 7).map((act) => (
                          <div 
                            key={act.id}
                            className="p-2.5 rounded-xl bg-[#14141E] border border-[#20202E] flex items-start justify-between gap-2 text-xs"
                          >
                            <div className="flex items-start gap-2 min-w-0">
                              <span className="text-base shrink-0 mt-0.5">{act.icon || '⚡'}</span>
                              <div className="min-w-0">
                                <span className="font-bold text-white block text-[11.5px] truncate">
                                  {act.title}
                                </span>
                                <span className="text-[10px] text-gray-300 block truncate">
                                  {act.detail}
                                </span>
                                <span className="text-[9px] text-gray-500 block">
                                  {act.location}
                                </span>
                              </div>
                            </div>
                            <span className="text-[9px] text-gray-500 font-mono shrink-0 whitespace-nowrap">
                              {act.time}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1E1E2C] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleSimulateCustomerTask}
                      className="text-xs text-gray-400 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Simulate 1 Task</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('customer-tasks')}
                      className="text-xs text-amber-400 hover:text-amber-300 font-bold hover:underline transition-colors cursor-pointer"
                    >
                      View All Citizen Tasks →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW: STANDALONE LIVE CITIZEN TASKS MONITOR */}
          {activeTab === 'customer-tasks' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#20202E] gap-3">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <span>Live Citizen Tasks & Omnichannel Activity</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Real-time monitor tracking every single action citizen users execute on the Now9 platform
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSimulateCustomerTask}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>+ Simulate Citizen Task</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearActivities}
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>Clear Feed</span>
                  </button>
                </div>
              </div>

              {/* KPI Metrics on Customer Tasks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#0F0F18] border border-[#222232]">
                  <span className="text-[10px] text-gray-400 font-bold block">Total Citizen Tasks</span>
                  <span className="text-2xl font-black text-white font-mono">{customerActivities.length}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0F0F18] border border-emerald-500/30">
                  <span className="text-[10px] text-emerald-400 font-bold block">Electoral Ballots</span>
                  <span className="text-2xl font-black text-emerald-300 font-mono">
                    {customerActivities.filter(a => a.type === 'vote').length}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0F0F18] border border-amber-500/30">
                  <span className="text-[10px] text-amber-400 font-bold block">Governance Surveys</span>
                  <span className="text-2xl font-black text-amber-300 font-mono">
                    {customerActivities.filter(a => a.type === 'survey').length}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0F0F18] border border-rose-500/30">
                  <span className="text-[10px] text-rose-400 font-bold block">Boss of House Votes</span>
                  <span className="text-2xl font-black text-rose-300 font-mono">
                    {customerActivities.filter(a => a.type === 'boss-house').length}
                  </span>
                </div>
              </div>

              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: 'All Tasks', icon: '⚡' },
                    { id: 'vote', label: 'Electoral Ballots', icon: '🗳️' },
                    { id: 'survey', label: 'Surveys', icon: '📊' },
                    { id: 'boss-house', label: 'Boss House', icon: '👑' },
                    { id: 'live', label: 'Live Debates', icon: '🔴' },
                    { id: 'news', label: 'News', icon: '📰' },
                    { id: 'location', label: 'GPS', icon: '📍' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActivityFilter(f.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                        activityFilter === f.id
                          ? 'bg-emerald-500 text-black font-black shadow-md'
                          : 'bg-[#14141E] text-gray-400 hover:text-white border border-[#232332]'
                      }`}
                    >
                      <span>{f.icon}</span>
                      <span>{f.label}</span>
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={activitySearch}
                    onChange={(e) => setActivitySearch(e.target.value)}
                    placeholder="Search tasks or locality..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-[#12121A] border border-[#222232] text-xs text-white placeholder-gray-500 outline-none focus:border-emerald-400 w-full sm:w-60"
                  />
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-2.5">
                {customerActivities
                  .filter(a => activityFilter === 'all' || a.type === activityFilter)
                  .filter(a => {
                    if (!activitySearch.trim()) return true;
                    const q = activitySearch.toLowerCase();
                    return a.title?.toLowerCase().includes(q) || a.detail?.toLowerCase().includes(q) || a.location?.toLowerCase().includes(q);
                  })
                  .map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-2xl bg-[#0E0E14] border border-[#222232] hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <span className="text-2xl p-2.5 rounded-xl bg-[#141420] border border-[#252538] shrink-0">
                          {act.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-black uppercase ${
                              act.badgeColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' :
                              act.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' :
                              act.badgeColor === 'rose' ? 'bg-rose-500/20 text-rose-300 border border-rose-400/30' :
                              act.badgeColor === 'red' ? 'bg-red-500/20 text-red-300 border border-red-400/30' :
                              act.badgeColor === 'blue' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                              'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                            }`}>
                              {act.badgeText || act.type}
                            </span>
                            <h4 className="font-extrabold text-sm text-white">{act.title}</h4>
                            <span className="font-mono text-[10px] text-gray-500">{act.id}</span>
                          </div>
                          <p className="text-xs text-gray-300 mt-1 font-medium">{act.detail}</p>
                          <div className="flex items-center gap-2 text-[10.5px] text-gray-400 mt-1">
                            <span className="flex items-center gap-1 text-sky-400">
                              <MapPin className="w-3 h-3" />
                              {act.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                        <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          {act.time}
                        </span>
                        <span className="text-[9.5px] text-gray-500 font-mono">
                          {new Date(act.timestamp || Date.now()).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* VIEW 2: ALL CONSTITUENCIES STANDINGS */}
          {activeTab === 'constituencies' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#20202E] gap-3">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Vote className="w-5 h-5 text-amber-400" />
                    <span>Live Constituency Standings & Vote Shares</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Select any constituency to inspect candidate-level vote counts, percentage shares, and trends
                  </p>
                </div>

                {/* Region & Search Filters */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#12121A] border border-[#2B2B3E] rounded-xl p-0.5 text-xs font-bold">
                    {['All', 'Telangana', 'Andhra Pradesh'].map(region => (
                      <button
                        key={region}
                        type="button"
                        onClick={() => setRegionFilter(region)}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          regionFilter === region 
                            ? 'bg-[#F5C754] text-black font-extrabold shadow-sm' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search constituency..."
                      className="bg-[#12121A] border border-[#2B2B3E] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-amber-400 w-44"
                    />
                  </div>
                </div>
              </div>

              {/* Grid of All Target Assemblies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredConstituenciesList.map(c => {
                  const isCitizenActive = activeCitizenSession?.constituencyKey === c.id;
                  return (
                    <div 
                      key={c.id}
                      className={`p-4 rounded-2xl transition-all shadow-md relative space-y-3 ${
                        isCitizenActive 
                          ? 'bg-[#12111A] border-2 border-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_30px_rgba(245,199,84,0.25)]' 
                          : 'bg-[#0E0E14] border border-[#222232] hover:border-amber-400/40'
                      }`}
                    >
                      {isCitizenActive && (
                        <div className="flex items-center justify-between px-3 py-1.5 -mt-1 -mx-1 mb-2 bg-gradient-to-r from-amber-500/25 via-emerald-500/20 to-amber-500/25 rounded-xl border border-amber-400/50 text-[11px] font-black text-amber-300 animate-pulse">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                            <span>🔴 LIVE CITIZEN LOGGED IN HERE</span>
                          </span>
                          <span className="text-gray-200 font-mono text-[10px] bg-black/40 px-2 py-0.5 rounded border border-amber-400/30">
                            {activeCitizenSession?.locality || c.locality} • Auto-Synced
                          </span>
                        </div>
                      )}
                    <div className="flex items-center justify-between pb-2 border-b border-[#1E1E28]">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-sm text-white">{c.name}</h3>
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold border border-amber-400/30">
                            {c.code}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-telugu mt-0.5">
                          {c.teluguName} • {c.locality}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-amber-400 block">{c.margin}</span>
                        <span className="text-[9px] text-gray-500 font-mono">{c.totalVotes.toLocaleString()} votes</span>
                      </div>
                    </div>

                    {/* Parties Progress Bars */}
                    <div className="space-y-2">
                      {c.parties.map(p => (
                        <div key={p.id} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white flex items-center gap-1.5">
                              <span>{p.symbol}</span>
                              <span>{p.name}</span>
                              <span className="text-[9.5px] text-gray-400 font-normal">({p.candidate})</span>
                            </span>
                            <span className="font-mono font-black" style={{ color: p.color }}>
                              {p.voteShare}%
                            </span>
                          </div>
                          <div className="h-2 bg-[#1A1A24] rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-700" 
                              style={{ width: `${p.voteShare}%`, backgroundColor: p.color }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          )}

          {/* VIEW 3: CITIZEN GOVERNANCE SURVEY PULSE */}
          {activeTab === 'surveys' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Header with Title and "Add Extra Question" Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#20202E] gap-3">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-400" />
                    <span>{surveyQuestionsList.length}-Question Citizen Governance Pulse ({totalVotesCount} Respondents)</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Official breakdown of public priorities, leader trust factors, and custom civic survey questions
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* ADD EXTRA QUESTION BUTTON */}
                  <button
                    type="button"
                    onClick={() => setIsAddQuestionModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-110 text-black text-xs font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add Extra Question</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="px-3 py-1.5 rounded-xl bg-[#161622] border border-[#2B2B3E] text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#1E1E2E]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export Dataset</span>
                  </button>
                </div>
              </div>

              {/* Questions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {QUESTION_ANALYTICS.map((q) => (
                  <div key={q.step} className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3 relative group hover:border-amber-500/40 transition-all shadow-md">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#1E1E28]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#F5C754]">{q.category}</span>
                        {q.isCustom && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[8.5px] font-bold">
                            Custom Added
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-mono">Step {q.step} of {surveyQuestionsList.length}</span>
                        {q.isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                            title="Delete this question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-xs text-white leading-snug">
                      {q.title}
                    </h3>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-300 truncate max-w-[75%]">{opt.label}</span>
                            <span className="font-mono font-bold text-white">
                              {opt.percent}% <span className="text-gray-500 font-normal">({opt.votes.toLocaleString()})</span>
                            </span>
                          </div>
                          <div className="h-2 bg-[#1C1C28] rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-700" 
                              style={{ width: `${opt.percent}%`, backgroundColor: opt.color }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Inline "Add New Question" Card at the end of the grid */}
                <div 
                  onClick={() => setIsAddQuestionModalOpen(true)}
                  className="p-6 rounded-2xl bg-[#0B0B10] border-2 border-dashed border-[#26263A] hover:border-amber-400/60 flex flex-col items-center justify-center text-center cursor-pointer transition-all group min-h-[220px]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                    Add Extra Survey Question
                  </h4>
                  <p className="text-[11px] text-gray-400 max-w-xs mt-1">
                    Add Step #{surveyQuestionsList.length + 1} to the citizen voting survey with custom Telugu or English questions and voting options.
                  </p>
                </div>
              </div>

              {/* MODAL: ADD EXTRA SURVEY QUESTION */}
              {isAddQuestionModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
                  <div className="bg-[#12121A] border-2 border-amber-500/40 rounded-3xl max-w-lg w-full text-white shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-[#232332]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                          ➕
                        </div>
                        <div>
                          <h3 className="font-black text-base text-white">Add Extra Survey Question</h3>
                          <p className="text-[11px] text-gray-400">Step #{surveyQuestionsList.length + 1} in the Citizen Survey Flow</p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setIsAddQuestionModalOpen(false)}
                        className="text-gray-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleAddNewQuestion} className="space-y-4">
                      {/* Question Category / Label */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-300">Question Category / Header (Optional)</label>
                        <input
                          type="text"
                          value={newQuestionCategory}
                          onChange={(e) => setNewQuestionCategory(e.target.value)}
                          placeholder={`e.g. Priority #${surveyQuestionsList.length + 1}: స్థానిక సమస్యలు (Civic Needs)`}
                          className="w-full bg-[#181824] border border-[#2B2B3E] focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>

                      {/* Question Text */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-300">
                          Question Text (in Telugu or English) <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          rows={3}
                          value={newQuestionText}
                          onChange={(e) => setNewQuestionText(e.target.value)}
                          placeholder="e.g. మీ నియోజకవర్గంలో మహిళా రక్షణ, శాంతిభద్రతల పరిస్థితి ఎలా ఉంది? (How do you rate women's safety & law order?)"
                          className="w-full bg-[#181824] border border-[#2B2B3E] focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none resize-none"
                          required
                        />
                      </div>

                      {/* Options List */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-300">Voting Options (Minimum 2)</label>
                          <button
                            type="button"
                            onClick={() => setNewQuestionOptions([...newQuestionOptions, `Option ${newQuestionOptions.length + 1}`])}
                            className="text-[11px] text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Option</span>
                          </button>
                        </div>

                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {newQuestionOptions.map((opt, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-xs font-mono text-gray-500 w-5 text-right">{idx + 1}.</span>
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                  const updated = [...newQuestionOptions];
                                  updated[idx] = e.target.value;
                                  setNewQuestionOptions(updated);
                                }}
                                className="flex-1 bg-[#181824] border border-[#2B2B3E] focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
                                required
                              />
                              {newQuestionOptions.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => setNewQuestionOptions(newQuestionOptions.filter((_, i) => i !== idx))}
                                  className="text-gray-500 hover:text-red-400 text-xs p-1"
                                  title="Remove option"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Modal Action Buttons */}
                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#232332]">
                        <button
                          type="button"
                          onClick={() => setIsAddQuestionModalOpen(false)}
                          className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-black text-xs font-black shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Publish Question Live 🗳️</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* VIEW 4: LIVE ON & DEBATES MANAGEMENT (SIMPLIFIED) */}
          {activeTab === 'live-debates' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#20202E] gap-3">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                    <span>Live On & Debates Management</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Conduct live broadcasts to the citizen website, and manage recorded sessions for on-demand playback.
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {activeBroadcast?.isLive ? (
                    <span className="px-3 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 text-xs font-black flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                      <span>ON AIR LIVE NOW</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Studio Ready</span>
                    </span>
                  )}
                </div>
              </div>

              {/* MODULE 1: CONDUCT LIVE (లైవ్ నిర్వహించండి) */}
              <div className="p-5 rounded-2xl bg-[#0E0E14] border-2 border-[#20202E] space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-[#1E1E28]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
                      🔴
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white">1. Conduct Live Broadcast</h3>
                      <p className="text-[11px] text-gray-400">When you start live, it appears instantly on the citizen website</p>
                    </div>
                  </div>

                  {activeBroadcast?.isLive && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Live on Website</span>
                    </span>
                  )}
                </div>

                {!activeBroadcast?.isLive ? (
                  /* SETUP & START LIVE FORM */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-300 block mb-1">
                          Debate Title / Topic (చర్చా శీర్షిక)
                        </label>
                        <input
                          type="text"
                          value={customDebateTitle}
                          onChange={(e) => setCustomDebateTitle(e.target.value)}
                          placeholder="ఉదా: 2026 ఎన్నికలు : ఎవరికి అవకాశాలు?"
                          className="w-full bg-[#12121A] border border-[#2B2B3E] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-red-500 font-telugu"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-bold text-gray-300 block mb-1">
                            Target Constituency
                          </label>
                          <select
                            value={selectedDebateConstituency}
                            onChange={(e) => setSelectedDebateConstituency(e.target.value)}
                            className="w-full bg-[#12121A] border border-[#2B2B3E] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-red-500 cursor-pointer"
                          >
                            <option value="Mahabubnagar">Mahabubnagar</option>
                            <option value="LB Nagar">LB Nagar</option>
                            <option value="Jubilee Hills">Jubilee Hills</option>
                            <option value="Nagarkurnool">Nagarkurnool</option>
                            <option value="Guntur West">Guntur West</option>
                            <option value="Vijayawada Central">Vijayawada Central</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-gray-300 block mb-1">
                            Host / Moderator
                          </label>
                          <input
                            type="text"
                            value={debateHostName}
                            onChange={(e) => setDebateHostName(e.target.value)}
                            className="w-full bg-[#12121A] border border-[#2B2B3E] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-red-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Preset Topics */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-gray-500 font-semibold mr-1">Quick Topics:</span>
                      {[
                        '2026 ఎన్నికలు : ఎవరికి అవకాశాలు?',
                        'పాలమూరు-రంగారెడ్డి ఎత్తిపోతల & నీటి సమస్యలు',
                        'యువత ఉపాధి & జాబ్ క్యాలెండర్ హామీలు',
                        'రైతు సంక్షేమం & రుణమాఫీ అమలు'
                      ].map((topic, tIdx) => (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={() => setCustomDebateTitle(topic)}
                          className="px-2.5 py-1 rounded-lg bg-[#151522] hover:bg-[#1E1E30] border border-[#262638] text-gray-300 hover:text-amber-300 text-[10px] font-telugu transition-colors cursor-pointer"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>

                    {/* Start Live Action Button */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleStartConductLive}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:brightness-110 active:scale-95 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 flex items-center gap-2 cursor-pointer transition-all border border-red-400/40"
                      >
                        <Radio className="w-5 h-5 text-white animate-pulse" />
                        <span>🔴 Start Live Broadcast (Go Live)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setLiveStreamModalMode('conduct');
                          setIsLiveStreamModalOpen(true);
                        }}
                        className="px-4 py-3 rounded-xl bg-[#1A1A26] hover:bg-[#222234] border border-[#303046] text-gray-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Video className="w-4 h-4 text-amber-400" />
                        <span>Launch Full WebRTC Camera Studio</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ACTIVE LIVE BROADCASTING CARD */
                  <div className="p-4 rounded-xl bg-gradient-to-br from-red-950/40 via-[#180E12] to-[#101018] border border-red-500/50 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-red-500/20">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase flex items-center gap-1 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                            <span>ON AIR</span>
                          </span>
                          <span className="text-xs font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30">
                            ⏱ {formatDuration(liveDuration)}
                          </span>
                          <span className="text-xs font-bold text-amber-300 bg-black/60 px-2.5 py-0.5 rounded border border-amber-500/30">
                            👥 14,280 Citizens Watching Now
                          </span>
                        </div>
                        <h4 className="text-base font-black text-white font-telugu mt-1.5">
                          {activeBroadcast.title}
                        </h4>
                        <p className="text-xs text-gray-300">
                          Host: <strong className="text-white">{activeBroadcast.host}</strong> • Constituency: <strong className="text-amber-300">{activeBroadcast.constituency}</strong>
                        </p>
                      </div>

                      {/* End Broadcast Action */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleEndConductLive}
                          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-xl active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Square className="w-4 h-4 fill-white" />
                          <span>⏹️ End Broadcast & Save Recording</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Stream Monitor Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsMicMuted(!isMicMuted);
                            showToast(isMicMuted ? '🎙️ Host Mic Unmuted' : '🔇 Host Mic Muted');
                          }}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isMicMuted ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-[#181824] text-emerald-400 border-emerald-500/40'
                          }`}
                        >
                          {isMicMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                          <span>{isMicMuted ? 'Mic Muted' : 'Mic Active'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsCameraOff(!isCameraOff);
                            showToast(isCameraOff ? '📷 Camera On' : '📷 Camera Off');
                          }}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isCameraOff ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-[#181824] text-emerald-400 border-emerald-500/40'
                          }`}
                        >
                          {isCameraOff ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                          <span>{isCameraOff ? 'Camera Off' : 'Camera On'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Visible to all citizens on website & mobile</span>
                        </span>
                        <button
                          type="button"
                          onClick={onSwitchToMobile || onClose}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold cursor-pointer transition-all"
                        >
                          View Citizen Website 📱
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* MODULE 2: RECORDED SESSIONS (వెబ్‌సైట్‌లో రికార్డెడ్ సెషన్స్) */}
              <div className="p-5 rounded-2xl bg-[#0E0E14] border-2 border-[#20202E] space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-[#1E1E28]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      🎬
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white">2. Recorded Sessions (Watchable on Website)</h3>
                      <p className="text-[11px] text-gray-400">Past debates archived for citizens to watch and replay anytime</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-400 font-mono">
                    {recordedSessions.length} Sessions Available
                  </span>
                </div>

                {recordedSessions.length === 0 ? (
                  <div className="p-8 text-center rounded-xl bg-[#12121A] border border-[#222232] text-gray-400 text-xs">
                    No recorded sessions yet. Start a live broadcast above and click "End Broadcast & Save" to create one.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {recordedSessions.map((rec) => (
                      <div
                        key={rec.id}
                        className="rounded-xl overflow-hidden bg-[#12121A] border border-[#20202C] hover:border-amber-500/40 transition-all flex flex-col justify-between"
                      >
                        <div className="relative aspect-video w-full overflow-hidden bg-black">
                          <img
                            src={rec.thumbnail || '/assets/news_debate_studio.jpg'}
                            alt={rec.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                          
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-amber-400 text-[8px] font-black border border-amber-400/30 uppercase">
                            RECORDED
                          </span>

                          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white font-mono text-[9px]">
                            ⏱ {rec.duration || '25:00'}
                          </span>
                        </div>

                        <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-telugu text-xs font-bold text-white line-clamp-2 leading-snug">
                              {rec.title}
                            </h4>
                            <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                              <span>{rec.host || 'Now9 Editor'}</span>
                              <span className="text-amber-400/90">{rec.views || '14.8K views'}</span>
                            </div>
                            <span className="text-[9px] text-gray-500 block mt-0.5">
                              📅 {rec.date || 'Recent'} • {rec.constituency}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#1C1C26] gap-2">
                            <button
                              type="button"
                              onClick={() => setPreviewRecordedModal(rec)}
                              className="flex-1 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Watch Recording</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteRecordedSession(rec.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors"
                              title="Delete from website"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Preview Recorded Video Modal */}
              {previewRecordedModal && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="max-w-2xl w-full bg-[#12121A] border border-[#2E2E3E] rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-3 bg-[#181822] border-b border-[#242432] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                          RECORDED SESSION
                        </span>
                        <h4 className="text-xs font-bold text-white font-telugu truncate max-w-md">
                          {previewRecordedModal.title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewRecordedModal(null)}
                        className="text-gray-400 hover:text-white p-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="aspect-video w-full bg-black relative">
                      <video
                        src={previewRecordedModal.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-3 bg-[#14141E] flex items-center justify-between text-xs text-gray-300">
                      <span>Host: <strong className="text-white">{previewRecordedModal.host}</strong> ({previewRecordedModal.constituency})</span>
                      <span className="text-amber-400">Duration: {previewRecordedModal.duration} • {previewRecordedModal.views}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* VIEW 5: NEWS & FLASH TICKER PUBLISHER */}
          {activeTab === 'news' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#20202E]">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-amber-400" />
                    <span>NowNine News & Flash Ticker Publisher</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Publish breaking stories, constituency alerts, and live ticker bulletins directly to users
                  </p>
                </div>
              </div>

              {/* Publish News Form */}
              <form onSubmit={handleAddNews} className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-white">Publish Immediate Breaking Bulletin</h3>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Syncs Live to Citizen App
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newNewsTitle}
                    onChange={(e) => setNewNewsTitle(e.target.value)}
                    placeholder="Enter breaking news headline (Telugu or English)..."
                    className="flex-1 bg-[#12121A] border border-[#2B2B3E] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                  <select
                    value={newNewsCategory}
                    onChange={(e) => setNewNewsCategory(e.target.value)}
                    className="bg-[#12121A] border border-[#2B2B3E] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Mahabubnagar">Mahabubnagar</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Telangana">Telangana State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Elections 2026">Elections 2026</option>
                  </select>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F8CD55] to-[#E3A336] hover:brightness-110 active:scale-95 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 cursor-pointer transition-all shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>Publish News Live</span>
                  </button>
                </div>

                {/* 1-Click Quick Suggestions */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] text-gray-500 font-semibold mr-1">Quick Suggestions:</span>
                  {[
                    'మహబూబ్‌నగర్ జిల్లాలో కొత్త రహదారుల విస్తరణ పనులకు ఆమోదం',
                    '2026 ఎన్నికల స్పెషల్: తాజా నియోజకవర్గ సర్వే ఫలితాలు',
                    'యువతకు స్కిల్ డెవలప్‌మెంట్ సెంటర్ ప్రారంభం'
                  ].map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setNewNewsTitle(sug)}
                      className="px-2.5 py-1 rounded-lg bg-[#181824] hover:bg-[#222234] border border-[#2A2A3C] text-gray-300 hover:text-amber-300 text-[10px] font-telugu transition-colors cursor-pointer"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </form>

              {/* Active Published Stories Table */}
              <div className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-white">Live News Feed Stream</h3>
                  <span className="text-[10px] text-amber-400 font-bold">{newsFeed.length} Stories Active</span>
                </div>
                <div className="space-y-2">
                  {newsFeed.map(item => (
                    <div key={item.id} className="p-3 rounded-xl bg-[#12121A] border border-[#1E1E28] flex items-center justify-between text-xs hover:border-amber-500/30 transition-colors">
                      <div className="pr-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-400/30 shrink-0">
                            {item.category || item.tag}
                          </span>
                          <span className="font-telugu font-bold text-white text-xs">{item.title}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-0.5 block">{item.time} • {item.reads || (item.views + ' readers')}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            deleteNewsItem(item.id);
                            setNewsFeed(getPublishedNews());
                            showToast('🗑️ News story removed from live feed');
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 cursor-pointer"
                          title="Delete News Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 6: BOSS OF HOUSE VOTING */}
          {activeTab === 'boss-house' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#20202E] gap-3">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-amber-400" />
                    <span>Boss of House (Telugu) • Contestants & Elimination Voting</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Enter housemate names, publish contestants live to the mobile voting screen, and monitor live tallies
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-amber-400 font-mono px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 font-bold">
                    {bossContestants.length} Housemates Live
                  </span>
                  <button
                    type="button"
                    onClick={handleResetHousemateTally}
                    className="px-3 py-1.5 rounded-xl bg-[#161622] border border-[#2B2B3E] text-amber-300 text-xs font-bold hover:bg-[#1E1E2E] cursor-pointer transition-colors"
                  >
                    Reset Week Tally
                  </button>
                </div>
              </div>

              {/* Form to Enter Housemate Names and Publish */}
              <form onSubmit={handleAddHousemate} className="p-5 rounded-2xl bg-[#0E0E14] border-2 border-[#20202E] space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-[#1E1E28]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      👥
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white">Enter Housemate Details & Publish Names</h3>
                      <p className="text-[11px] text-gray-400">Add housemates to appear in the citizen mobile app for live elimination voting</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Syncs Live to Mobile Voting
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Housemate Name (English) *
                    </label>
                    <input
                      type="text"
                      value={newHousemateName}
                      onChange={(e) => setNewHousemateName(e.target.value)}
                      placeholder="e.g. Sivaji, Prerana, Harish..."
                      className="w-full bg-[#12121A] border border-[#2B2B3E] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Telugu Name (తెలుగు పేరు)
                    </label>
                    <input
                      type="text"
                      value={newHousemateTelugu}
                      onChange={(e) => setNewHousemateTelugu(e.target.value)}
                      placeholder="ఉదా: శివాజీ, ప్రేరణ..."
                      className="w-full bg-[#12121A] border border-[#2B2B3E] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400 font-telugu"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Profession / Role
                    </label>
                    <input
                      type="text"
                      value={newHousemateRole}
                      onChange={(e) => setNewHousemateRole(e.target.value)}
                      placeholder="e.g. Actress, Anchor, Singer..."
                      className="w-full bg-[#12121A] border border-[#2B2B3E] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Nomination / Voting Status
                    </label>
                    <select
                      value={newHousemateStatus}
                      onChange={(e) => setNewHousemateStatus(e.target.value)}
                      className="w-full bg-[#12121A] border border-[#2B2B3E] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="Nominated">Nominated (Voting Open 🗳️)</option>
                      <option value="Danger Zone">Danger Zone (Bottom 2 🔥)</option>
                      <option value="Safe">Safe (Not in Elimination ✅)</option>
                      <option value="Captain">Captain of the House 👑</option>
                    </select>
                  </div>
                </div>

                {/* Emoji Avatar Selector & Publish Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#1C1C28]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-semibold">Avatar Badge:</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {['🌟', '👑', '⚡', '🔥', '🌾', '🎭', '🎤', '💃', '🥊'].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setNewHousemateAvatar(emoji)}
                          className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all cursor-pointer ${
                            newHousemateAvatar === emoji 
                              ? 'bg-amber-500/30 border border-amber-400 scale-110 shadow-md' 
                              : 'bg-[#181824] border border-[#28283A] text-gray-300 hover:scale-105'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 active:scale-95 text-black font-extrabold text-xs shadow-lg shadow-amber-500/25 cursor-pointer flex items-center justify-center gap-2 transition-all"
                  >
                    <Plus className="w-4 h-4 text-black stroke-[3]" />
                    <span>Publish Housemate Live</span>
                  </button>
                </div>
              </form>

              {/* Published Housemates Directory & Standings */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-white">Live Housemates Roster & Elimination Votes</h3>
                  <span className="text-xs text-gray-400">Click any status badge to quickly toggle Safe/Nominated</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bossContestants.map((c) => (
                    <div key={c.id} className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3 hover:border-amber-500/30 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl p-1.5 rounded-xl bg-[#14141E] border border-[#242436]">{c.avatar}</span>
                          <div>
                            <h3 className="font-extrabold text-sm text-white">{c.name}</h3>
                            <span className="text-[10px] text-gray-400 font-telugu block">{c.teluguName || c.name} • {c.role}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleHousemateStatus(c.id, c.status)}
                            className={`px-2 py-0.5 rounded-full text-[9px] font-black cursor-pointer transition-all ${
                              c.status === 'Safe' 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' 
                                : (c.status === 'Danger Zone' 
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-400/40' 
                                  : 'bg-red-500/20 text-red-300 border border-red-400/40')
                            }`}
                            title="Click to toggle nomination status"
                          >
                            {c.status}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteHousemate(c.id, c.name)}
                            className="p-1 rounded-lg text-gray-500 hover:text-red-400 hover:bg-white/5 cursor-pointer"
                            title="Remove housemate"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-gray-400">{(c.votes || 0).toLocaleString()} votes</span>
                          <span className="text-amber-400 font-bold">{c.percent || 0}%</span>
                        </div>
                        <div className="h-2 bg-[#1C1C28] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500" 
                            style={{ width: `${c.percent || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 8: SETTINGS & RESULTS EMBARGO CONTROLS */}
          {activeTab === 'settings' && (
            <div className="space-y-5 animate-fadeIn max-w-3xl">
              <div className="pb-3 border-b border-[#20202E]">
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-400" />
                  <span>Election Controls & Platform Settings</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Configure results embargo, security policies, and client presentation settings
                </p>
              </div>

              {/* Embargo Control Box */}
              <div className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Public Results Embargo (Voter Confidentiality)</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      When enabled, voting standings and percentages are concealed from ordinary voters and only visible in this Admin Panel.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !isEmbargoActive;
                      setIsEmbargoActive(next);
                      showToast(next ? '🔒 Public Results Embargo Enabled' : '⚠️ Results Embargo Disabled');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isEmbargoActive
                        ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                        : 'bg-red-600 text-white shadow-md'
                    }`}
                  >
                    {isEmbargoActive ? 'EMBARGO ACTIVE ✓' : 'EMBARGO DISABLED'}
                  </button>
                </div>
              </div>

              {/* Client Demo Presentation Mode */}
              <div className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      <span>📱 Citizen Mobile App Preview</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Switch instantly to the mobile user app to show clients how citizens cast their votes.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onSwitchToMobile || onClose}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F8CD55] to-[#E3A336] text-black font-extrabold text-xs shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    Open Mobile App View
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
      {/* Live Stream Studio Modal for Conducting Broadcasts */}
      <LiveStreamModal 
        isOpen={isLiveStreamModalOpen}
        onClose={() => setIsLiveStreamModalOpen(false)}
        presentDistrict={{
          districtName: activeConstituency?.name || 'Mahabubnagar',
          stateName: activeConstituency?.state || 'Telangana'
        }}
        initialMode={liveStreamModalMode}
      />
    </div>
  );
}

