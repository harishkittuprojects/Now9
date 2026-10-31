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

export default function NowNineAdminDashboard({ 
  onClose, 
  onSwitchToMobile,
  currentLocation = null 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'constituencies' | 'surveys' | 'live-debates' | 'news' | 'boss-house' | 'audit' | 'settings'
  const [selectedConstituencyKey, setSelectedConstituencyKey] = useState('mahabubnagar');
  const [regionFilter, setRegionFilter] = useState('All'); // 'All' | 'Telangana' | 'Andhra Pradesh'
  const [searchQuery, setSearchQuery] = useState('');
  const [isEmbargoActive, setIsEmbargoActive] = useState(true);
  const [toastMsg, setToastMsg] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  // Live Broadcast & Stream Conduct State
  const [isLiveStreamModalOpen, setIsLiveStreamModalOpen] = useState(false);
  const [liveStreamModalMode, setLiveStreamModalMode] = useState('conduct');
  const [isInlineBroadcasting, setIsInlineBroadcasting] = useState(false);
  const [inlineBroadcastDuration, setInlineBroadcastDuration] = useState(0);
  const [isInlineMicOn, setIsInlineMicOn] = useState(true);
  const [isInlineCameraOn, setIsInlineCameraOn] = useState(true);
  const [activeBroadcastTopic, setActiveBroadcastTopic] = useState('2026 ఎన్నికలు: ఎవరికి అవకాశాలు? (Live Civic Townhall)');
  const [speakerQueue, setSpeakerQueue] = useState([
    { id: 1, name: 'K. Ramesh (Mahabubnagar)', topic: 'Palamuru Lift Irrigation Water Issues', time: '1m ago', status: 'pending' },
    { id: 2, name: 'M. Sunitha (LB Nagar)', topic: 'Badangpet Road Widening Guarantee', time: '3m ago', status: 'pending' },
    { id: 3, name: 'Dr. V. Prasad (Jubilee Hills)', topic: 'Youth Employment in IT Hubs', time: '5m ago', status: 'pending' },
  ]);

  useEffect(() => {
    let interval;
    if (isInlineBroadcasting) {
      interval = setInterval(() => {
        setInlineBroadcastDuration(prev => prev + 1);
      }, 1000);
    } else {
      setInlineBroadcastDuration(0);
    }
    return () => clearInterval(interval);
  }, [isInlineBroadcasting]);

  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  // Detailed Assembly Standings Data
  const ALL_CONSTITUENCIES = {
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
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Yennam Srinivas Reddy (Sitting MLA)', symbol: '✋', voteShare: 45.6, votes: 15891, color: '#0284C7', trend: '+3.1%' },
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'V. Srinivas Goud (Ex-Minister)', symbol: '🚗', voteShare: 40.2, votes: 14010, color: '#EC4899', trend: '-1.4%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'A.P. Mithun Kumar Reddy', symbol: '🪷', voteShare: 11.8, votes: 4112, color: '#F97316', trend: '+1.2%' },
        { id: 'oth', name: 'Others & Independents', telugu: 'ఇతరులు', candidate: 'Independent Contenders', symbol: '🗳️', voteShare: 2.4, votes: 837, color: '#64748B', trend: '-0.3%' },
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
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Madhu Yaskhi Goud (Ruling Nominee)', symbol: '✋', voteShare: 41.2, votes: 17378, color: '#0284C7', trend: '+2.1%' },
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'Devireddy Sudheer Reddy (Sitting MLA)', symbol: '🚗', voteShare: 37.5, votes: 15817, color: '#EC4899', trend: '-0.8%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'Sama Ranga Reddy', symbol: '🪷', voteShare: 16.8, votes: 7086, color: '#F97316', trend: '+1.4%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independent Contenders', symbol: '🗳️', voteShare: 4.5, votes: 1899, color: '#64748B', trend: '-0.3%' },
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
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'Maganti Gopinath (Sitting MLA)', symbol: '🚗', voteShare: 41.5, votes: 16151, color: '#EC4899', trend: '+1.2%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Mohammed Azharuddin', symbol: '✋', voteShare: 35.8, votes: 13933, color: '#0284C7', trend: '+0.5%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'Lankala Deepak Reddy', symbol: '🪷', voteShare: 18.2, votes: 7083, color: '#F97316', trend: '-1.0%' },
        { id: 'aimim', name: 'AIMIM / Others', telugu: 'మజ్లిస్ / ఇతరులు', candidate: 'Local Corporator', symbol: '🪁', voteShare: 4.5, votes: 1753, color: '#16A34A', trend: '-0.7%' },
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
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'Arekapudi Gandhi', symbol: '🚗', voteShare: 43.8, votes: 25509, color: '#EC4899', trend: '+1.8%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Jagadeeshwar Goud', symbol: '✋', voteShare: 38.1, votes: 22189, color: '#0284C7', trend: '+1.1%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'Ravi Kumar Yadav', symbol: '🪷', voteShare: 15.3, votes: 8910, color: '#F97316', trend: '-2.0%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 2.8, votes: 1632, color: '#64748B', trend: '-0.9%' },
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
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Komatireddy Raj Gopal Reddy', symbol: '✋', voteShare: 43.8, votes: 14081, color: '#0284C7', trend: '+3.4%' },
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'Kusukuntla Prabhakar Reddy', symbol: '🚗', voteShare: 34.2, votes: 10995, color: '#EC4899', trend: '-2.1%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'Boora Narsaiah Goud', symbol: '🪷', voteShare: 18.0, votes: 5787, color: '#F97316', trend: '+0.8%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 4.0, votes: 1287, color: '#64748B', trend: '-2.1%' },
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
        { id: 'brs', name: 'BRS', telugu: 'భారత్ రాష్ట్ర సమితి', candidate: 'K. Chandrashekar Rao', symbol: '🚗', voteShare: 52.4, votes: 19073, color: '#EC4899', trend: '+1.5%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'Thumkunta Narsa Reddy', symbol: '✋', voteShare: 39.8, votes: 14487, color: '#0284C7', trend: '-0.4%' },
        { id: 'bjp', name: 'BJP', telugu: 'బీజేపీ', candidate: 'Eatala Rajender', symbol: '🪷', voteShare: 7.8, votes: 2840, color: '#F97316', trend: '-1.1%' },
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
        { id: 'tdp', name: 'TDP (NDA Alliance)', telugu: 'తెలుగుదేశం పార్టీ (కూటమి)', candidate: 'Pulivarthi Nani', symbol: '🚲', voteShare: 51.2, votes: 15974, color: '#EAB308', trend: '+2.8%' },
        { id: 'ysrcp', name: 'YSRCP', telugu: 'వైఎస్సార్సీపీ', candidate: 'Chevireddy Mohith Reddy', symbol: '🚁', voteShare: 42.8, votes: 13353, color: '#16A34A', trend: '-2.2%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'K. Balaram', symbol: '✋', voteShare: 4.2, votes: 1310, color: '#0284C7', trend: '-0.3%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 1.8, votes: 563, color: '#64748B', trend: '-0.3%' },
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
        { id: 'tdp', name: 'TDP (NDA Alliance)', telugu: 'తెలుగుదేశం పార్టీ (కూటమి)', candidate: 'Bonda Umamaheswara Rao', symbol: '🚲', voteShare: 49.3, votes: 19473, color: '#EAB308', trend: '+3.2%' },
        { id: 'ysrcp', name: 'YSRCP', telugu: 'వైఎస్సార్సీపీ', candidate: 'Velampalli Srinivasa Rao', symbol: '🪭', voteShare: 42.6, votes: 16827, color: '#0EA5E9', trend: '-2.5%' },
        { id: 'inc', name: 'Congress (INC)', telugu: 'కాంగ్రెస్', candidate: 'City President Nominee', symbol: '✋', voteShare: 5.8, votes: 2291, color: '#10B981', trend: '-0.4%' },
        { id: 'oth', name: 'Others', telugu: 'ఇతరులు', candidate: 'Independents', symbol: '🗳️', voteShare: 2.3, votes: 909, color: '#64748B', trend: '-0.3%' },
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
  const [bossContestants, setBossContestants] = useState([
    { id: 'c1', name: 'Prerana', role: 'Actress', votes: 94250, percent: 31.4, status: 'Safe', avatar: '👑' },
    { id: 'c2', name: 'Nikhil', role: 'YouTuber', votes: 81400, percent: 27.1, status: 'Safe', avatar: '⚡' },
    { id: 'c3', name: 'Vishnupriya', role: 'Anchor', votes: 58900, percent: 19.6, status: 'Safe', avatar: '🌟' },
    { id: 'c4', name: 'Gautham', role: 'Doctor/Actor', votes: 41200, percent: 13.7, status: 'Danger Zone', avatar: '🔥' },
    { id: 'c5', name: 'Teja', role: 'Content Creator', votes: 24250, percent: 8.2, status: 'Nominated', avatar: '🎭' },
  ]);

// Real-time auditStream managed via voteStore

  // Live News Management
  const [newsFeed, setNewsFeed] = useState([
    { id: 1, title: 'మహబూబ్‌నగర్: పాలమూరు-రంగారెడ్డి ఎత్తిపోతల ప్రాజెక్టుపై ఎమ్మెల్యే సమీక్ష', time: '15m ago', category: 'Mahabubnagar', views: '28.4K', isLive: true },
    { id: 2, title: 'తెలంగాణ కాంగ్రెస్ ప్రభుత్వం: 6 గ్యారెంటీల అమల్లో కీలక ముందడుగు', time: '40m ago', category: 'State Politics', views: '45.1K', isLive: true },
    { id: 3, title: 'జీహెచ్‌ఎంసీ పరిధిలో రోడ్ల ఆధునీకరణకు రూ. 1,500 కోట్లు కేటాయింపు', time: '1h ago', category: 'Hyderabad', views: '19.8K', isLive: false },
    { id: 4, title: 'ఏపీలో పింఛన్ల పంపిణీ: ఇంటింటికీ చేరిన ప్రభుత్వ సంక్షేమం', time: '2h ago', category: 'Andhra Pradesh', views: '32.6K', isLive: false },
  ]);

  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('Mahabubnagar');

  const handleAddNews = (e) => {
    e.preventDefault();
    if (!newNewsTitle.trim()) return;
    const item = {
      id: Date.now(),
      title: newNewsTitle.trim(),
      time: 'Just now',
      category: newNewsCategory,
      views: '1',
      isLive: true
    };
    setNewsFeed([item, ...newsFeed]);
    setNewNewsTitle('');
    showToast('📰 Breaking News Alert published live to mobile feed!');
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
    if (regionFilter !== 'All' && c.state !== regionFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || 
           c.locality.toLowerCase().includes(q) || 
           c.district.toLowerCase().includes(q) ||
           c.code.toLowerCase().includes(q);
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
      <header className="h-14 bg-[#0E0E14] border-b border-[#20202E] px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 z-40 sticky top-0 shadow-lg">
        {/* Brand & System Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img 
              src="/now9_icon.png" 
              alt="now9 logo" 
              className="w-8 h-8 object-contain rounded-xl shadow-md ring-1 ring-amber-400/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-tight text-white">
                  now<span className="text-[#F5C754]">nine</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[#F5C754] text-[8px] font-black uppercase tracking-wider">
                  COMMAND CENTER
                </span>
              </div>
              <p className="text-[8.5px] text-gray-400 leading-none">
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
          </div>
        </div>

        {/* Global Controls & Actions */}
        <div className="flex items-center gap-2.5">
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
            className={`px-3 py-1.5 rounded-xl border text-[10px] font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
              isEmbargoActive
                ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/25'
                : 'bg-red-500/15 border-red-400/50 text-red-300 hover:bg-red-500/25'
            }`}
            title="Toggle Public Results Visibility"
          >
            {isEmbargoActive ? <Lock className="w-3.5 h-3.5 text-emerald-400" /> : <Unlock className="w-3.5 h-3.5 text-red-400" />}
            <span className="hidden sm:inline">
              {isEmbargoActive ? 'Results Embargo: LOCKED (Confidential)' : 'Results Embargo: UNLOCKED'}
            </span>
          </button>

          {/* Export CSV Report */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl bg-[#161622] hover:bg-[#1E1E30] border border-[#2B2B3E] text-amber-300 hover:text-white text-[10.5px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
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
            className="p-2 rounded-xl bg-[#161622] hover:bg-[#1E1E30] border border-[#2B2B3E] text-gray-300 hover:text-amber-300 transition-all cursor-pointer"
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
            className="px-3 py-1.5 rounded-xl bg-[#161622] hover:bg-[#1E1E30] border border-amber-500/40 text-amber-300 hover:text-white text-[10.5px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            title="Copy Direct Admin Link"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Copy Admin Link</span>
          </button>

          {/* Switch to Citizen Mobile View */}
          <button
            type="button"
            onClick={onSwitchToMobile || onClose}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#F8CD55] to-[#E3A336] text-black font-extrabold text-[10.5px] shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            title="Return to Citizen Mobile App"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Open Mobile App</span>
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar Navigation + Dynamic Admin Views */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        
        {/* Left Admin Navigation Sidebar */}
        <aside className="w-56 sm:w-64 bg-[#0A0A0F] border-r border-[#1C1C28] p-3 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-2.5 py-1 block">
              Core Modules
            </span>

            {[
              { id: 'overview', label: 'Dashboard Overview', icon: BarChart3, badge: 'Live' },
              { id: 'constituencies', label: 'Constituency Standings', icon: Vote, count: '8 Hot' },
              { id: 'surveys', label: '5-Question Pulse', icon: FileText, count: '124K' },
              { id: 'live-debates', label: 'Live On & Debates', icon: Radio, badge: 'Active' },
              { id: 'news', label: 'News & Flash Ticker', icon: Newspaper, count: '4' },
              { id: 'boss-house', label: 'Boss of House Voting', icon: Eye, count: '300K+' },
              { id: 'audit', label: 'Ballot Security & Audit', icon: ShieldCheck, badge: 'GPS' },
              { id: 'settings', label: 'Embargo & Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/20 text-[#FDE047] border border-amber-400/40 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-[#14141E]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5C754]' : 'text-gray-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-red-600/80 text-white text-[7.5px] font-black uppercase animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                  {tab.count && (
                    <span className="px-1.5 py-0.2 rounded bg-white/10 text-gray-300 text-[8px] font-mono">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Info Card at Sidebar Bottom */}
          <div className="pt-3 border-t border-[#1C1C28]">
            <div className="p-2.5 rounded-xl bg-[#12121A] border border-[#20202E] text-[8.5px] space-y-1">
              <div className="flex items-center justify-between text-gray-400">
                <span>Electoral Version</span>
                <span className="font-mono text-amber-300 font-bold">2026.4 v2</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Target Assemblies</span>
                <span className="text-white font-bold">Telangana & AP</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Encrypted Hash</span>
                <span className="font-mono text-emerald-400">SHA-256 ✓</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Content Panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#07070A]">

          {/* VIEW 1: DASHBOARD OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* SECTION-WISE VISUAL FLOW INSPECTOR (Shows crystal-clearly what happens on every vote) */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#1A1828] via-[#141422] to-[#0D0D14] border-2 border-amber-500/50 shadow-2xl space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#252538]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 font-black text-xl shadow-inner">
                      ⚡
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-black text-white">
                          Live Voting Inspector • Section-by-Section Flow
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9.5px] font-mono font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                          <span>LIVE SYNC ACTIVE</span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mt-0.5">
                        Whenever someone presses vote on the mobile website, watch how each section below reacts in real-time:
                      </p>
                    </div>
                  </div>

                  {/* One-Click Real Test Voter Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-gray-400">Quick Test Vote:</span>
                    <button
                      type="button"
                      onClick={() => handleCastVoterChoice('Congress (INC)', 'Yennam Srinivas Reddy', 'inc', 0)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <span>✋ Vote Congress</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCastVoterChoice('BRS', 'V. Srinivas Goud', 'brs', 1)}
                      className="px-3 py-1.5 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <span>🚗 Vote BRS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCastVoterChoice('BJP', 'A.P. Mithun Kumar Reddy', 'bjp', 2)}
                      className="px-3 py-1.5 rounded-xl bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <span>🪷 Vote BJP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resetAllBallotsToZero();
                        showToast('🗑️ Cleared everything! All sections reset back to 0.');
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      title="Reset everything to 0"
                    >
                      <RotateCcw className="w-3 h-3 text-red-400" />
                      <span>Reset 0</span>
                    </button>
                  </div>
                </div>

                {/* 4 Interactive Visual Cards Explaining Exactly What Happens Section-by-Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  
                  {/* Section 1 Card */}
                  <div className="p-3.5 rounded-2xl bg-[#0F0F1A] border border-amber-500/30 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                        SECTION 1
                      </span>
                      <span className="text-[10px] text-gray-400">Total Ballots</span>
                    </div>
                    <h3 className="text-sm font-black text-white">Electoral Counters</h3>
                    <p className="text-[11px] text-gray-300 leading-snug">
                      Immediately ticks up by <strong className="text-emerald-400 font-mono">+1</strong> across all cluster nodes.
                    </p>
                    <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10.5px] font-mono">
                      <span className="text-gray-400">Count:</span>
                      <span className="font-black text-amber-400 text-xs">{totalVotesCount} Ballots</span>
                    </div>
                  </div>

                  {/* Section 2 Card */}
                  <div className="p-3.5 rounded-2xl bg-[#0F0F1A] border border-sky-500/30 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono text-[10px]">
                        SECTION 2
                      </span>
                      <span className="text-[10px] text-gray-400">Standings</span>
                    </div>
                    <h3 className="text-sm font-black text-white">Candidate Vote Share</h3>
                    <p className="text-[11px] text-gray-300 leading-snug">
                      Increments selected candidate's tally and animates percentage bar.
                    </p>
                    <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10.5px] font-mono">
                      <span className="text-gray-400">Leading:</span>
                      <span className="font-black text-sky-400 text-xs truncate max-w-[130px]">{activeConstituency.leadingParty}</span>
                    </div>
                  </div>

                  {/* Section 3 Card */}
                  <div className="p-3.5 rounded-2xl bg-[#0F0F1A] border border-emerald-500/30 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                        SECTION 3
                      </span>
                      <span className="text-[10px] text-gray-400">Governance</span>
                    </div>
                    <h3 className="text-sm font-black text-white">5-Question Sentiment</h3>
                    <p className="text-[11px] text-gray-300 leading-snug">
                      Logs answers to Road & Drainage, Water, and MLA Accessibility in live bars.
                    </p>
                    <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10.5px] font-mono">
                      <span className="text-gray-400">Sample:</span>
                      <span className="font-black text-emerald-400 text-xs">{totalVotesCount} Voters</span>
                    </div>
                  </div>

                  {/* Section 4 Card */}
                  <div className="p-3.5 rounded-2xl bg-[#0F0F1A] border border-rose-500/30 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono text-[10px]">
                        SECTION 4
                      </span>
                      <span className="text-[10px] text-gray-400">Audit Trail</span>
                    </div>
                    <h3 className="text-sm font-black text-white">Tamper-Proof Ledger</h3>
                    <p className="text-[11px] text-gray-300 leading-snug">
                      Logs SHA-256 integrity block, timestamp, and geofence verification tag.
                    </p>
                    <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10.5px] font-mono">
                      <span className="text-gray-400">Last Hash:</span>
                      <span className="font-black text-rose-400 text-[10px] truncate max-w-[120px]">{auditStream[0]?.id || 'None'}</span>
                    </div>
                  </div>

                </div>

                {/* If a ballot was received, show glowing confirmation banner */}
                {auditStream.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="font-bold text-emerald-300">
                        ⚡ Most Recent Citizen Vote: <strong>{auditStream[0].party}</strong> ({auditStream[0].candidate}) in <strong>{auditStream[0].locality}</strong>
                      </span>
                    </div>
                    <span className="text-[10.5px] font-mono text-emerald-400 font-bold">
                      {auditStream[0].id} • {auditStream[0].time}
                    </span>
                  </div>
                )}
              </div>

              {/* Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1E1E2C]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>Central Electoral Command Center</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 font-bold">
                      Live Stream Active
                    </span>
                  </h1>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Real-time citizen opinion aggregation, constituency mapping, and anti-tamper ballot monitoring
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedConstituencyKey}
                    onChange={(e) => setSelectedConstituencyKey(e.target.value)}
                    className="bg-[#12121C] border border-[#2B2B3E] text-white text-xs font-bold rounded-xl px-3 py-2 outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {Object.values(ALL_CONSTITUENCIES).map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                    ))}
                  </select>

                  {/* Real-time Demo Controls: Reset to 0 and +1 Test Vote */}
                  <button
                    type="button"
                    onClick={() => {
                      resetAllBallotsToZero();
                      showToast('🗑️ All ballots reset to 0! Ledger cleared.');
                    }}
                    className="px-2.5 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                    title="Reset ballot count to 0"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-red-400" />
                    <span>Reset to 0</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      recordLiveBallot({
                        party: { name: 'Congress (INC)', candidate: 'Yennam Srinivas Reddy', id: 'inc' },
                        location: { assembly: 'Mahabubnagar Assembly Constituency', locality: 'Yenugonda', state: 'Telangana' },
                        answers: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
                      });
                      showToast('🗳️ 1 Live ballot recorded from Yenugonda (Mahabubnagar)!');
                    }}
                    className="px-2.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                    title="Cast 1 test vote to demonstrate real-time count increment"
                  >
                    <Vote className="w-3.5 h-3.5 text-amber-400" />
                    <span>+1 Test Vote</span>
                  </button>
                </div>
              </div>

              {/* SECTION 1: ELECTORAL COUNTERS & LIVE KPI METRICS */}
              <div className="flex items-center justify-between pt-1">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[10.5px] font-black border border-amber-400/30 flex items-center gap-1.5">
                  <span>SECTION 1</span> • <span>ELECTORAL COUNTERS & REAL-TIME BALLOTS</span>
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  Auto-updates on every voter submit
                </span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#161622] to-[#0E0E14] border border-[#262638] shadow-md">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span className="font-extrabold text-white">Total Ballots Received</span>
                    <Vote className="w-4 h-4 text-[#F5C754]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {totalVotesCount.toLocaleString()}
                  </div>
                  {totalVotesCount === 0 ? (
                    <span className="text-[10px] text-gray-400 font-bold mt-1 inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                      0 recorded votes • Waiting for first voter
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-bold mt-1 inline-flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +{totalVotesCount} verified real vote${totalVotesCount === 1 ? '' : 's'} recorded live
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#161622] to-[#0E0E14] border border-[#262638] shadow-md">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>Target Constituencies</span>
                    <MapPin className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    294
                  </div>
                  <span className="text-[10px] text-sky-300 font-bold mt-1 block">
                    119 Telangana • 175 Andhra Pradesh
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#161622] to-[#0E0E14] border border-[#262638] shadow-md">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>GPS Ingestion Integrity</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    99.8%
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold mt-1 block">
                    Zero duplicate votes per device ID
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#161622] to-[#0E0E14] border border-[#262638] shadow-md">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>Public Results Embargo</span>
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#F5C754] font-mono">
                    LOCKED
                  </div>
                  <span className="text-[10px] text-amber-300 font-bold mt-1 block">
                    Confidential • Hidden from voter app
                  </span>
                </div>
              </div>

              {/* SECTION 2: CONSTITUENCY CANDIDATE STANDINGS & VOTE SHARES */}
              <div className="flex items-center justify-between pt-2">
                <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono text-[10.5px] font-black border border-sky-400/30 flex items-center gap-1.5">
                  <span>SECTION 2</span> • <span>CONSTITUENCY CANDIDATE STANDINGS & VOTE SHARES</span>
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  {activeConstituency.totalVotes} votes in {activeConstituency.name}
                </span>
              </div>
              <div className="p-5 rounded-3xl bg-gradient-to-b from-[#181826] via-[#12121C] to-[#0D0D14] border border-amber-500/30 shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#232334] gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-white">
                        {activeConstituency.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[9px] font-mono font-bold">
                        {activeConstituency.code}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-telugu mt-0.5">
                      {activeConstituency.teluguName} • {activeConstituency.locality}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Total Ballots Counted</span>
                      <span className="text-base font-black text-white font-mono">
                        {activeConstituency.totalVotes.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Frontrunner Lead</span>
                      <span className="text-base font-black text-emerald-400 font-mono">
                        {activeConstituency.margin}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Candidate Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {activeConstituency.parties.map((party, rank) => (
                    <div 
                      key={party.id} 
                      className="p-3.5 rounded-2xl bg-[#0F0F18] border border-[#222232] space-y-2 hover:border-amber-400/50 transition-all shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#1A1A28] border border-white/10 flex items-center justify-center text-xs font-mono font-bold">
                            #{rank + 1}
                          </span>
                          <span className="text-2xl">{party.symbol}</span>
                          <div>
                            <h3 className="font-extrabold text-sm text-white leading-tight">
                              {party.name}
                            </h3>
                            <span className="text-[9px] text-gray-400 font-telugu">{party.telugu}</span>
                          </div>
                        </div>
                        <span className="text-sm font-black font-mono" style={{ color: party.color }}>
                          {party.voteShare}%
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-300 line-clamp-1">
                        {party.candidate}
                      </p>

                      <div className="space-y-1 pt-1">
                        <div className="h-2 bg-[#1C1C28] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${party.voteShare}%`, backgroundColor: party.color }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-[8.5px] text-gray-400 font-mono">
                          <span>{party.votes.toLocaleString()} votes</span>
                          <span className={party.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}>
                            {party.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two Column Section: SECTION 3 (Key Battlegrounds / Pulse) & SECTION 4 (Audit Stream) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Battleground Assemblies Summary */}
                <div className="p-4 rounded-2xl bg-[#0E0E14] border border-[#20202E] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1E1E2C]">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-black border border-emerald-400/30">
                        SECTION 3
                      </span>
                      <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                        <Vote className="w-4 h-4 text-amber-400" />
                        <span>Battleground Assemblies</span>
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('constituencies')}
                      className="text-[10px] text-[#F5C754] font-bold hover:underline"
                    >
                      View All 8 Assemblies →
                    </button>
                  </div>

                  <div className="space-y-2">
                    {Object.values(ALL_CONSTITUENCIES).slice(0, 5).map(c => (
                      <div 
                        key={c.id}
                        onClick={() => setSelectedConstituencyKey(c.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                          selectedConstituencyKey === c.id 
                            ? 'bg-amber-500/10 border-amber-400/50' 
                            : 'bg-[#12121A] border-[#1E1E28] hover:border-gray-600'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-white">
                            <span>{c.name}</span>
                            <span className="text-[9px] text-gray-400 font-mono">({c.code})</span>
                          </div>
                          <span className="text-[10px] text-gray-400">{c.district} • {c.leadingParty} leading</span>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-black text-amber-300 block">{c.margin}</span>
                          <span className="text-[9px] text-gray-500 font-mono">{c.totalVotes.toLocaleString()} votes</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-Time Geofence Stream */}
                <div className="p-4 rounded-2xl bg-[#0E0E14] border border-[#20202E] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1E1E2C]">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono text-[9px] font-black border border-rose-400/30">
                        SECTION 4
                      </span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-extrabold text-white">Tamper-Proof Ballot Stream</h3>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 font-mono">
                      GPS Stream
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {auditStream.length === 0 ? (
                      <div className="p-4 text-center text-xs text-gray-500 bg-[#12121A] rounded-xl border border-dashed border-[#222232]">
                        <p className="font-bold text-gray-400">0 Ballots Received Yet</p>
                        <p className="text-[10px] text-gray-500 mt-1">Vote on mobile or click "+1 Vote" to see live cryptographic audit logs appear here.</p>
                      </div>
                    ) : (
                      auditStream.slice(0, 5).map((log) => (
                        <div key={log.id} className="p-2 rounded-xl bg-[#12121A] border border-[#1E1E28] flex items-center justify-between text-[10.5px]">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400 text-[10px]">{log.id}</span>
                          <span className="font-semibold text-white">{log.party}</span>
                          <span className="text-gray-400 text-[9.5px]">({log.locality})</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[9px]">
                          <span className="text-gray-500">{log.time}</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                            {log.status}
                          </span>
                        </div>
                      </div>
                    ))
                    )}
                  </div>
                </div>
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
                {filteredConstituenciesList.map(c => (
                  <div 
                    key={c.id}
                    className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3 hover:border-amber-400/40 transition-all shadow-md"
                  >
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
                              <span className="text-[9.5px] text-gray-400 font-normal">({p.candidate.split('(')[0]})</span>
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
                ))}
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

          {/* VIEW 4: LIVE ON & DEBATES MANAGEMENT */}
          {activeTab === 'live-debates' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Header with Title and Primary Conduct Live Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#20202E] gap-3">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                    <span>Live On • Stream Moderation & Broadcast Studio</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Conduct live video broadcasts, interview candidates, take live citizen calls, and moderate streams
                  </p>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span>14,280 Viewers Online</span>
                  </span>

                  {/* MAIN PRIMARY BUTTON TO CONDUCT LIVE */}
                  <button
                    type="button"
                    onClick={() => {
                      setLiveStreamModalMode('conduct');
                      setIsLiveStreamModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:brightness-110 text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-red-600/40 active:scale-95 transition-all cursor-pointer border border-red-400/40"
                    title="Launch Studio to Conduct Live Video Stream"
                  >
                    <Radio className="w-4 h-4 animate-pulse text-white" />
                    <span>🔴 Conduct Live Stream</span>
                  </button>
                </div>
              </div>

              {/* Broadcast Studio Station Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#201014] via-[#141422] to-[#111118] border-2 border-red-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center shrink-0">
                    <Radio className="w-6 h-6 text-red-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-white">Now9 Live Broadcast Studio & Host Station</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        isInlineBroadcasting 
                          ? 'bg-red-500/30 border border-red-400 text-red-300 animate-pulse' 
                          : 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300'
                      }`}>
                        {isInlineBroadcasting ? '● YOU ARE BROADCASTING LIVE' : 'STUDIO CONSOLE READY'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Target Audience: <strong className="text-amber-300">{activeConstituency.name}</strong> • 119 Assemblies Linked • Ultra Low Latency 1080p WebRTC
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
                  {/* Primary Video Broadcast Studio Launcher (Streamlined single action) */}
                  <button
                    type="button"
                    onClick={() => {
                      setLiveStreamModalMode('conduct');
                      setIsLiveStreamModalOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:brightness-110 text-white text-xs font-black flex items-center gap-2 shadow-xl shadow-red-600/40 active:scale-95 transition-all cursor-pointer border border-red-400/40"
                  >
                    <Radio className="w-4 h-4 animate-pulse text-white" />
                    <span>🔴 Launch Live Broadcast Studio</span>
                  </button>
                </div>
              </div>

              {/* Grid: Player/Studio View + Citizen Speaker Queue */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* Active Debate Player / Conduct Live Studio Card */}
                <div className="lg:col-span-2 p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-black relative overflow-hidden flex items-center justify-center border border-white/10">
                    
                    {isInlineBroadcasting ? (
                      /* ACTIVE INLINE LIVE BROADCAST STUDIO */
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#180A0E] to-black flex flex-col justify-between p-5 text-center">
                        {/* Top Live Bar */}
                        <div className="flex items-center justify-between z-10">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase flex items-center gap-1.5 shadow-md">
                              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                              <span>ON AIR (HOST LIVE)</span>
                            </span>
                            <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-mono border border-emerald-500/30">
                              ⏱ {formatDuration(inlineBroadcastDuration)}
                            </span>
                          </div>
                          <span className="bg-black/60 px-2.5 py-1 rounded text-xs text-amber-300 font-bold border border-white/10">
                            👥 14,280 Citizens Tuned In
                          </span>
                        </div>

                        {/* Center Visualizer & Audio Waves */}
                        <div className="flex flex-col items-center justify-center my-auto space-y-3">
                          <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-red-600/20 border-2 border-red-500/60 flex items-center justify-center animate-pulse">
                              <Radio className="w-12 h-12 text-red-400" />
                            </div>
                            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </span>
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-black text-white">
                              {activeBroadcastTopic}
                            </h3>
                            <p className="text-xs text-emerald-400 font-medium mt-1">
                              📡 Microphone Active • High-Definition Stream Broadcasting to {activeConstituency.name}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Studio Controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/10 z-10">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsInlineMicOn(!isInlineMicOn);
                                showToast(isInlineMicOn ? '🔇 Host Microphone Muted' : '🎙️ Host Microphone Unmuted');
                              }}
                              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                isInlineMicOn 
                                  ? 'bg-[#1C1C28] text-white border-gray-600' 
                                  : 'bg-red-500/20 text-red-400 border-red-500/40'
                              }`}
                              title={isInlineMicOn ? 'Mute Mic' : 'Unmute Mic'}
                            >
                              {isInlineMicOn ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4 text-red-400" />}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setIsInlineCameraOn(!isInlineCameraOn);
                                showToast(isInlineCameraOn ? '📷 Camera Off' : '📷 Camera On');
                              }}
                              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                isInlineCameraOn 
                                  ? 'bg-[#1C1C28] text-white border-gray-600' 
                                  : 'bg-red-500/20 text-red-400 border-red-500/40'
                              }`}
                              title={isInlineCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
                            >
                              {isInlineCameraOn ? <Video className="w-4 h-4 text-emerald-400" /> : <VideoOff className="w-4 h-4 text-red-400" />}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setLiveStreamModalMode('conduct');
                                setIsLiveStreamModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold hover:bg-amber-500/30 cursor-pointer"
                            >
                              Expand Studio Fullscreen
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setIsInlineBroadcasting(false);
                              showToast('⏹️ Broadcast ended');
                            }}
                            className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs transition-all cursor-pointer shadow-md"
                          >
                            End Broadcast
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* REGULAR PREVIEW PLAYER */
                      <>
                        <img 
                          src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop&q=80" 
                          alt="Debate stream" 
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-black uppercase">LIVE NOW</span>
                          <span className="text-xs font-bold text-white">2026 ఎన్నికలు: ఎవరికి అవకాశాలు?</span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gray-300">
                          <span>Moderator: Senior Political Editor</span>
                          <span className="font-mono text-amber-300">4 Active Speakers</span>
                        </div>

                        {/* Center Play Overlay Trigger to Conduct */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setLiveStreamModalMode('conduct');
                              setIsLiveStreamModalOpen(true);
                            }}
                            className="px-4 py-2.5 rounded-2xl bg-black/75 hover:bg-red-600/90 border border-white/20 hover:border-red-400 text-white font-extrabold text-xs shadow-2xl backdrop-blur-md flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer"
                          >
                            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                            <span>Conduct Live Stream as Host</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 gap-2">
                    <span className="text-xs font-bold text-gray-300">
                      Channel: <strong className="text-white">Now9 Telugu Prime Debates</strong> • Constituency: {activeConstituency.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => {
                          setLiveStreamModalMode('conduct');
                          setIsLiveStreamModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span>Conduct Live</span>
                      </button>

                      <button 
                        type="button" 
                        onClick={() => showToast('🎙️ Moderator audio broadcast enabled')}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold hover:bg-amber-500/30 cursor-pointer"
                      >
                        Join as Moderator
                      </button>
                    </div>
                  </div>
                </div>

                {/* Speaker Queue Approvals & Live On-Air Citizens */}
                <div className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-sm text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-400" />
                        <span>Citizen Speaker Queue</span>
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono">
                        {speakerQueue.filter(s => s.status === 'pending').length} Pending
                      </span>
                    </h3>

                    <div className="space-y-2">
                      {speakerQueue.map((spk) => (
                        <div key={spk.id} className="p-2.5 rounded-xl bg-[#12121A] border border-[#1E1E28] space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{spk.name}</span>
                            <span className="text-[9px] text-gray-500">{spk.time}</span>
                          </div>
                          <p className="text-[10px] text-gray-400">{spk.topic}</p>
                          
                          {spk.status === 'on_air' ? (
                            <div className="flex items-center justify-between pt-1">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9.5px] font-black flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                                <span>ON AIR 🎙️</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setSpeakerQueue(prev => prev.map(s => s.id === spk.id ? { ...s, status: 'pending' } : s));
                                  showToast(`Muted and removed ${spk.name} from live audio`);
                                }}
                                className="px-2 py-0.5 rounded bg-gray-700 text-gray-300 hover:text-white text-[9.5px] font-bold"
                              >
                                End Mic
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 pt-1">
                              <button 
                                type="button" 
                                onClick={() => {
                                  setSpeakerQueue(prev => prev.map(s => s.id === spk.id ? { ...s, status: 'on_air' } : s));
                                  showToast(`🎙️ Approved ${spk.name} to speak LIVE on air!`);
                                }}
                                className="flex-1 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                <span>Approve Mic</span>
                              </button>
                              <button 
                                type="button" 
                                onClick={() => {
                                  setSpeakerQueue(prev => prev.filter(s => s.id !== spk.id));
                                  showToast('✕ Declined speaker request');
                                }}
                                className="px-2 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[10px] font-bold transition-all cursor-pointer"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Broadcast Push Alert Trigger */}
                  <div className="pt-2 border-t border-[#1E1E2C]">
                    <button
                      type="button"
                      onClick={() => showToast(`📲 Push Notification broadcasted to all ${activeConstituency.name} voters: "Now9 Live Debate is ON AIR!"`)}
                      className="w-full py-2 rounded-xl bg-[#161622] hover:bg-[#1E1E30] border border-[#2B2B3E] text-amber-300 hover:text-amber-200 text-[10.5px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Bell className="w-3.5 h-3.5 text-amber-400" />
                      <span>Notify Citizens "Debate is Live"</span>
                    </button>
                  </div>
                </div>
              </div>
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
                <h3 className="font-extrabold text-sm text-white">Publish Immediate Breaking Bulletin</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newNewsTitle}
                    onChange={(e) => setNewNewsTitle(e.target.value)}
                    placeholder="Enter breaking news headline (Telugu or English)..."
                    className="flex-1 bg-[#12121A] border border-[#2B2B3E] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
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
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F8CD55] to-[#E3A336] text-black font-extrabold text-xs shadow-md shadow-amber-500/20 hover:brightness-110 cursor-pointer"
                  >
                    Publish News Live
                  </button>
                </div>
              </form>

              {/* Active Published Stories Table */}
              <div className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3">
                <h3 className="font-extrabold text-sm text-white">Live News Feed Stream</h3>
                <div className="space-y-2">
                  {newsFeed.map(item => (
                    <div key={item.id} className="p-3 rounded-xl bg-[#12121A] border border-[#1E1E28] flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-400/30">
                            {item.category}
                          </span>
                          <span className="font-telugu font-bold text-white text-xs">{item.title}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-0.5 block">{item.time} • {item.views} readers</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setNewsFeed(newsFeed.filter(n => n.id !== item.id));
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
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#20202E]">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-amber-400" />
                    <span>Boss of House (Telugu) • Live Elimination Tally</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Live votes tally, contestant rankings, and safe/danger zone analytics
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('🔄 Elimination votes reset for new voting week')}
                  className="px-3 py-1.5 rounded-xl bg-[#161622] border border-[#2B2B3E] text-amber-300 text-xs font-bold hover:bg-[#1E1E2E] cursor-pointer"
                >
                  Reset Week Tally
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bossContestants.map((c, rank) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{c.avatar}</span>
                        <div>
                          <h3 className="font-extrabold text-sm text-white">{c.name}</h3>
                          <span className="text-[10px] text-gray-400">{c.role}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                        c.status === 'Safe' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-red-500/20 text-red-300 border border-red-400/40'
                      }`}>
                        {c.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-400">{c.votes.toLocaleString()} votes</span>
                        <span className="text-amber-400 font-bold">{c.percent}%</span>
                      </div>
                      <div className="h-2 bg-[#1C1C28] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" 
                          style={{ width: `${c.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 7: BALLOT AUDIT & SECURITY */}
          {activeTab === 'audit' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#20202E]">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Ballot Audit Trail & GPS Geofence Verification</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Real-time ingestion of anonymous encrypted ballots with anti-fraud geo-verification
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 cursor-pointer"
                >
                  Export Audit Log
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#0E0E14] border border-[#222232] space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#1E1E28] text-gray-400 text-[10px] uppercase font-mono">
                        <th className="pb-2">Transaction ID</th>
                        <th className="pb-2">Locality / Constituency</th>
                        <th className="pb-2">Voted Candidate</th>
                        <th className="pb-2">Timestamp</th>
                        <th className="pb-2">GPS Verification</th>
                        <th className="pb-2">Integrity Hash</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A24]">
                      {auditStream.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-500 font-mono text-xs">
                            No ballots recorded in ledger yet. Start by voting on the citizen mobile app or clicking "+1 Vote".
                          </td>
                        </tr>
                      ) : (
                        auditStream.map((log) => (
                        <tr key={log.id} className="text-gray-300 hover:bg-[#12121C]">
                          <td className="py-2.5 font-mono text-amber-400 font-bold">{log.id}</td>
                          <td className="py-2.5 font-semibold text-white">{log.locality}</td>
                          <td className="py-2.5">{log.candidate} ({log.party})</td>
                          <td className="py-2.5 font-mono text-gray-500">{log.time}</td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-[9px] font-bold">
                              {log.status}
                            </span>
                          </td>
                          <td className="py-2.5 font-mono text-gray-500 text-[10px]">{log.hash}</td>
                        </tr>
                      ))
                      )}
                    </tbody>
                  </table>
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

