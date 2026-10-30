import React, { useState } from 'react';
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
  CheckCircle2, 
  RefreshCw, 
  Download, 
  Filter, 
  Eye, 
  AlertCircle,
  FileText,
  Sliders,
  Check
} from 'lucide-react';
import { CONSTITUENCY_DATABASE, DEFAULT_DETECTED_LOCATION } from '../data/locationConstituencyData';
import { SURVEY_QUESTIONS } from '../data/nowNineAppFlowData';

export default function ScreenAdminPanel({ 
  onBack, 
  onNavigate = () => {}, 
  currentLocation = null 
}) {
  const [selectedConstituencyKey, setSelectedConstituencyKey] = useState(() => {
    const locName = `${currentLocation?.locality || ''} ${currentLocation?.city || ''} ${currentLocation?.assembly || ''}`.toLowerCase();
    if (locName.includes('yenugonda') || locName.includes('యెనుగొండ') || locName.includes('mahabubnagar') || locName.includes('mahbubnagar')) {
      return 'mahabubnagar';
    }
    return 'mahabubnagar';
  });
  const [activeTab, setActiveTab] = useState('standings'); // 'standings' | 'questions' | 'audit'
  const [isEmbargoActive, setIsEmbargoActive] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toastMsg, setToastMsg] = useState(null);

  const loc = currentLocation || DEFAULT_DETECTED_LOCATION;

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Pre-configured constituency data with detailed vote counts and breakdowns
  const CONSTITUENCY_STANDINGS = {
    mahabubnagar: {
      name: 'Yenugonda (Mahabubnagar)',
      assembly: 'Mahabubnagar Assembly #74',
      totalVotes: 14850,
      verifiedRate: '99.5%',
      leadingParty: 'Congress (INC)',
      margin: '+5.4%',
      parties: [
        { id: 'inc', name: 'Congress (INC)', candidate: 'Yennam Srinivas Reddy (Sitting MLA)', symbol: '✋', voteShare: 45.6, votes: 6771, color: '#0284C7', trend: '+3.1%' },
        { id: 'brs', name: 'BRS', candidate: 'V. Srinivas Goud (Ex-Minister)', symbol: '🚗', voteShare: 40.2, votes: 5970, color: '#EC4899', trend: '-1.4%' },
        { id: 'bjp', name: 'BJP', candidate: 'A.P. Mithun Kumar Reddy', symbol: '🪷', voteShare: 11.8, votes: 1752, color: '#F97316', trend: '+1.2%' },
        { id: 'oth', name: 'Others & Independents', candidate: 'Independent Contenders', symbol: '🗳️', voteShare: 2.4, votes: 357, color: '#64748B', trend: '-0.3%' },
      ]
    },
    almasguda: {
      name: 'Almasguda (LB Nagar / Rangareddy)',
      assembly: 'LB Nagar Assembly #51',
      totalVotes: 12418,
      verifiedRate: '99.4%',
      leadingParty: 'Congress (INC)',
      margin: '+3.7%',
      parties: [
        { id: 'inc', name: 'Congress (INC)', candidate: 'Local MLA / Contestant (Almasguda)', symbol: '✋', voteShare: 41.2, votes: 5116, color: '#0284C7', trend: '+2.1%' },
        { id: 'brs', name: 'BRS', candidate: 'BRS Nominee (Almasguda)', symbol: '🚗', voteShare: 37.5, votes: 4657, color: '#EC4899', trend: '-0.8%' },
        { id: 'bjp', name: 'BJP', candidate: 'BJP Candidate (Almasguda)', symbol: '🪷', voteShare: 16.8, votes: 2086, color: '#F97316', trend: '+1.4%' },
        { id: 'oth', name: 'Others & Independents', candidate: 'Independent Contenders', symbol: '🗳️', voteShare: 4.5, votes: 559, color: '#64748B', trend: '-0.3%' },
      ]
    },
    jubileehills: {
      name: 'Jubilee Hills (Hyderabad)',
      assembly: 'Jubilee Hills Assembly #61',
      totalVotes: 18920,
      verifiedRate: '99.8%',
      leadingParty: 'BRS',
      margin: '+2.4%',
      parties: [
        { id: 'brs', name: 'BRS', candidate: 'Maganti Gopinath', symbol: '🚗', voteShare: 41.5, votes: 7852, color: '#EC4899', trend: '+1.2%' },
        { id: 'inc', name: 'Congress (INC)', candidate: 'Mohammed Azharuddin', symbol: '✋', voteShare: 35.8, votes: 6773, color: '#0284C7', trend: '+0.5%' },
        { id: 'bjp', name: 'BJP', candidate: 'L. Deepak Reddy', symbol: '🪷', voteShare: 18.2, votes: 3443, color: '#F97316', trend: '-1.0%' },
        { id: 'oth', name: 'Others', candidate: 'Independents', symbol: '🗳️', voteShare: 4.5, votes: 852, color: '#64748B', trend: '-0.7%' },
      ]
    },
    munugode: {
      name: 'Munugode (Nalgonda)',
      assembly: 'Munugode Assembly #93',
      totalVotes: 24150,
      verifiedRate: '99.2%',
      leadingParty: 'Congress (INC)',
      margin: '+9.6%',
      parties: [
        { id: 'inc', name: 'Congress (INC)', candidate: 'Komatireddy Raj Gopal Reddy', symbol: '✋', voteShare: 43.8, votes: 10578, color: '#0284C7', trend: '+3.4%' },
        { id: 'brs', name: 'BRS', candidate: 'Kusukuntla Prabhakar Reddy', symbol: '🚗', voteShare: 34.2, votes: 8259, color: '#EC4899', trend: '-2.1%' },
        { id: 'bjp', name: 'BJP', candidate: 'Boora Narsaiah Goud', symbol: '🪷', voteShare: 18.0, votes: 4347, color: '#F97316', trend: '+0.8%' },
        { id: 'oth', name: 'Others', candidate: 'Independent Contenders', symbol: '🗳️', voteShare: 4.0, votes: 966, color: '#64748B', trend: '-2.1%' },
      ]
    },
    gajwel: {
      name: 'Gajwel (Siddipet)',
      assembly: 'Gajwel Assembly #40',
      totalVotes: 31200,
      verifiedRate: '99.6%',
      leadingParty: 'BRS',
      margin: '+13.5%',
      parties: [
        { id: 'brs', name: 'BRS', candidate: 'K. Chandrashekar Rao', symbol: '🚗', voteShare: 52.4, votes: 16349, color: '#EC4899', trend: '+1.5%' },
        { id: 'inc', name: 'Congress (INC)', candidate: 'Thumkunta Narsa Reddy', symbol: '✋', voteShare: 39.8, votes: 12418, color: '#0284C7', trend: '-0.4%' },
        { id: 'bjp', name: 'BJP', candidate: 'Eatala Rajender', symbol: '🪷', voteShare: 7.8, votes: 2433, color: '#F97316', trend: '-1.1%' },
      ]
    },
    chandragiri: {
      name: 'Chandragiri (Tirupati, AP)',
      assembly: 'Chandragiri Assembly #166',
      totalVotes: 22800,
      verifiedRate: '99.5%',
      leadingParty: 'TDP - JSP - BJP NDA Alliance',
      margin: '+8.6%',
      parties: [
        { id: 'tdp', name: 'TDP (NDA Alliance)', candidate: 'Pulivarthi Nani', symbol: '🚲', voteShare: 51.2, votes: 11674, color: '#EAB308', trend: '+2.8%' },
        { id: 'ysrcp', name: 'YSRCP', candidate: 'Chevireddy Mohith Reddy', symbol: '🚁', voteShare: 42.8, votes: 9758, color: '#16A34A', trend: '-2.2%' },
        { id: 'inc', name: 'Congress (INC)', candidate: 'K. Balaram', symbol: '✋', voteShare: 4.2, votes: 958, color: '#0284C7', trend: '-0.3%' },
        { id: 'oth', name: 'Others', candidate: 'Independent Contenders', symbol: '🗳️', voteShare: 1.8, votes: 410, color: '#64748B', trend: '-0.3%' },
      ]
    }
  };

  const currentStanding = CONSTITUENCY_STANDINGS[selectedConstituencyKey] || CONSTITUENCY_STANDINGS.almasguda;

  // Question Analytics Mock Data
  const QUESTION_ANALYTICS = [
    {
      step: 1,
      title: '🎯 ప్రాధాన్యత (Priority Issue for Next 5 Years)',
      breakdown: [
        { label: 'Local Road & Drainage Infrastructure', percent: 43.5, votes: 5402 },
        { label: 'Welfare Schemes & Direct Cash Benefits', percent: 28.2, votes: 3502 },
        { label: 'Youth Employment & IT Jobs Hubs', percent: 18.6, votes: 2310 },
        { label: 'Public School & Healthcare Quality', percent: 9.7, votes: 1204 }
      ]
    },
    {
      step: 2,
      title: '⭐ నచ్చిన అంశం (Deciding Factor for Picking Leader)',
      breakdown: [
        { label: 'MLA / Candidate Accessibility & Ground Work', percent: 49.1, votes: 6097 },
        { label: 'State Chief Minister / Top Party Leadership', percent: 29.4, votes: 3651 },
        { label: 'Party Ideology & Manifesto Promises', percent: 14.8, votes: 1838 },
        { label: 'Community & Regional Backing', percent: 6.7, votes: 832 }
      ]
    },
    {
      step: 3,
      title: '📈 ఆశించిన మార్పు (Citizen Governance Satisfaction)',
      breakdown: [
        { label: 'Highly Satisfied with Current Constituency Pace', percent: 42.0, votes: 5215 },
        { label: 'Needs Urgent Accelerated Improvement', percent: 36.4, votes: 4520 },
        { label: 'Dissatisfied / Seeking Leadership Change', percent: 21.6, votes: 2683 }
      ]
    },
    {
      step: 4,
      title: '🤝 విశ్వాసం (Integrity & Trust Factor)',
      breakdown: [
        { label: 'Promises Delivered Transparently', percent: 46.8, votes: 5812 },
        { label: 'Partial Delivery with Genuine Effort', percent: 34.7, votes: 4309 },
        { label: 'Failed to Meet Expectations', percent: 18.5, votes: 2297 }
      ]
    },
    {
      step: 5,
      title: '🗳️ తుది నిర్ణయం (Final Election Decision Readiness)',
      breakdown: [
        { label: '100% Locked & Firm Decision', percent: 71.2, votes: 8842 },
        { label: 'Leaning towards Party but Still Evaluating', percent: 20.5, votes: 2546 },
        { label: 'Completely Undecided Floating Voter', percent: 8.3, votes: 1030 }
      ]
    }
  ];

  // Live Audit Stream
  const RECENT_AUDIT_LOG = [
    { id: '#N9-VOTE-9824', party: 'BJP', candidate: 'BJP Candidate', locality: 'Almasguda', time: '12s ago', status: 'GPS Verified' },
    { id: '#N9-VOTE-9823', party: 'Congress', candidate: 'Local MLA Contestant', locality: 'Almasguda', time: '45s ago', status: 'GPS Verified' },
    { id: '#N9-VOTE-9822', party: 'BRS', candidate: 'BRS Nominee', locality: 'Almasguda', time: '1m ago', status: 'GPS Verified' },
    { id: '#N9-VOTE-9821', party: 'Congress', candidate: 'Mohammed Azharuddin', locality: 'Jubilee Hills', time: '2m ago', status: 'GPS Verified' },
    { id: '#N9-VOTE-9820', party: 'BRS', candidate: 'Maganti Gopinath', locality: 'Jubilee Hills', time: '2m ago', status: 'GPS Verified' },
    { id: '#N9-VOTE-9819', party: 'TDP', candidate: 'Pulivarthi Nani', locality: 'Chandragiri', time: '3m ago', status: 'GPS Verified' },
    { id: '#N9-VOTE-9818', party: 'Congress', candidate: 'Komatireddy Raj Gopal', locality: 'Munugode', time: '4m ago', status: 'GPS Verified' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#07070A] text-white min-h-0 select-none">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="absolute top-12 left-4 right-4 z-50 bg-[#1F190D] border border-amber-400 text-amber-300 px-3 py-2 rounded-xl text-[10px] font-bold text-center shadow-2xl animate-fadeIn flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <div className="px-3 py-2 bg-[#0E0E14] border-b border-[#232330] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={onBack} 
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-[#1A1A26] transition-colors cursor-pointer"
            title="Return to Citizen Mobile View"
          >
            <ChevronLeft className="w-4 h-4 text-[#F5C754]" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white tracking-tight">Now9 Admin Panel</span>
              <span className="text-[7.5px] px-1.5 py-0.2 rounded bg-red-600 font-black text-white tracking-wider uppercase animate-pulse">
                RESTRICTED
              </span>
            </div>
            <p className="text-[8px] text-gray-400 leading-none mt-0.5">
              Central Election Monitoring & Live Ballot Analytics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setRefreshKey(prev => prev + 1);
              showToast('🔄 Real-time survey vote database refreshed');
            }}
            className="p-1 rounded-lg bg-[#161622] hover:bg-[#1E1E30] text-gray-300 hover:text-amber-300 border border-[#2B2B3E] transition-all cursor-pointer"
            title="Refresh Live Standings"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => showToast('📥 Exported Official Results CSV (12,418 Records)')}
            className="p-1 rounded-lg bg-[#161622] hover:bg-[#1E1E30] text-gray-300 hover:text-amber-300 border border-[#2B2B3E] transition-all cursor-pointer"
            title="Export CSV / Audit File"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Admin Status Notice Banner: Explaining Results are Embargoed from Public App */}
      <div className="px-3 py-1.5 bg-[#12121A] border-b border-[#1E1E28] flex items-center justify-between gap-2 shrink-0 text-[8.5px]">
        <div className="flex items-center gap-1.5 text-amber-300 min-w-0">
          <Lock className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="font-bold truncate">
            {isEmbargoActive 
              ? 'Results Embargo: ACTIVE (Results Hidden in User App)' 
              : 'Results Embargo: OFF (Publicly Visible)'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            const next = !isEmbargoActive;
            setIsEmbargoActive(next);
            showToast(next ? '🔒 Public Results Embargo Enabled (Hidden from voters)' : '⚠️ Public Results Embargo Disabled');
          }}
          className={`px-2 py-0.5 rounded-full text-[7.5px] font-black transition-all cursor-pointer border ${
            isEmbargoActive 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30' 
              : 'bg-red-500/20 text-red-300 border-red-400/40 hover:bg-red-500/30'
          }`}
        >
          {isEmbargoActive ? 'Encrypted ✓' : 'Exposed ⚠️'}
        </button>
      </div>

      {/* Constituency Selector Bar */}
      <div className="px-3 py-2 bg-[#0A0A0F] border-b border-[#1E1E28] flex items-center gap-2 shrink-0">
        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider shrink-0">Filter:</span>
        <select
          value={selectedConstituencyKey}
          onChange={(e) => {
            setSelectedConstituencyKey(e.target.value);
            showToast(`📊 Loaded data for ${CONSTITUENCY_STANDINGS[e.target.value]?.name || 'Constituency'}`);
          }}
          className="flex-1 bg-[#14141E] text-white text-[9.5px] font-bold border border-[#2B2B3E] rounded-lg px-2 py-1 outline-none focus:border-amber-400 cursor-pointer"
        >
          <option value="mahabubnagar">Yenugonda (Mahabubnagar Assembly #74)</option>
          <option value="almasguda">Almasguda (LB Nagar / Rangareddy)</option>
          <option value="jubileehills">Jubilee Hills (Hyderabad)</option>
          <option value="munugode">Munugode (Nalgonda)</option>
          <option value="gajwel">Gajwel (Siddipet)</option>
          <option value="chandragiri">Chandragiri (Tirupati, AP)</option>
        </select>
      </div>

      {/* Admin View Navigation Tabs */}
      <div className="px-3 py-1.5 bg-[#0E0E14] border-b border-[#1F1F2C] flex items-center justify-between gap-1 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('standings')}
          className={`flex-1 py-1 px-2 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'standings'
              ? 'bg-amber-500/20 text-[#FDE047] border border-amber-400/40 shadow-xs'
              : 'text-gray-400 hover:text-white hover:bg-[#161622]'
          }`}
        >
          <Vote className="w-3 h-3" />
          <span>Party Standings</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('questions')}
          className={`flex-1 py-1 px-2 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'questions'
              ? 'bg-amber-500/20 text-[#FDE047] border border-amber-400/40 shadow-xs'
              : 'text-gray-400 hover:text-white hover:bg-[#161622]'
          }`}
        >
          <FileText className="w-3 h-3" />
          <span>5 Questions Pulse</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`flex-1 py-1 px-2 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-amber-500/20 text-[#FDE047] border border-amber-400/40 shadow-xs'
              : 'text-gray-400 hover:text-white hover:bg-[#161622]'
          }`}
        >
          <ShieldCheck className="w-3 h-3" />
          <span>Ballot Audit</span>
        </button>
      </div>

      {/* Main Admin Scrollable Content Area */}
      <div className="flex-1 min-h-0 px-3 py-2.5 overflow-y-auto phone-scroll touch-pan-y space-y-3 pb-6">
        
        {/* Top 3 KPI Metrics Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-xl bg-[#12121A] border border-[#252536] text-center">
            <span className="text-[8px] font-bold text-gray-400 block uppercase">Total Ballots</span>
            <span className="text-xs sm:text-sm font-black text-white font-mono mt-0.5 block">
              {currentStanding.totalVotes.toLocaleString()}
            </span>
            <span className="text-[7.5px] font-semibold text-emerald-400">100% Counted</span>
          </div>

          <div className="p-2 rounded-xl bg-[#12121A] border border-[#252536] text-center">
            <span className="text-[8px] font-bold text-gray-400 block uppercase">Frontrunner</span>
            <span className="text-xs sm:text-sm font-black text-[#F5C754] truncate mt-0.5 block">
              {currentStanding.leadingParty}
            </span>
            <span className="text-[7.5px] font-semibold text-amber-300">{currentStanding.margin} Lead</span>
          </div>

          <div className="p-2 rounded-xl bg-[#12121A] border border-[#252536] text-center">
            <span className="text-[8px] font-bold text-gray-400 block uppercase">GPS Integrity</span>
            <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono mt-0.5 block">
              {currentStanding.verifiedRate}
            </span>
            <span className="text-[7.5px] font-semibold text-gray-400">Zero Duplicates</span>
          </div>
        </div>

        {/* TAB 1: OFFICIAL LIVE PARTY STANDINGS */}
        {activeTab === 'standings' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="p-3 rounded-2xl bg-gradient-to-b from-[#181824] via-[#14141C] to-[#0E0E14] border border-amber-500/35 shadow-xl space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#252536]">
                <div>
                  <h3 className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>📊 Live Party Standings</span>
                    <span className="text-amber-400 text-[10px]">({currentStanding.assembly})</span>
                  </h3>
                  <p className="text-[8px] text-gray-400">
                    Official vote breakdown moved from public view to Admin Panel
                  </p>
                </div>
                <span className="text-[8px] px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 font-mono font-bold">
                  {currentStanding.totalVotes.toLocaleString()} Votes
                </span>
              </div>

              {/* Contesting Parties Breakdown */}
              <div className="space-y-2 pt-1">
                {currentStanding.parties.map((party, rank) => (
                  <div key={party.id} className="p-2 rounded-xl bg-[#0D0D14] border border-[#1E1E2C] space-y-1.5 hover:border-amber-400/40 transition-all">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-4 h-4 rounded-full bg-[#1A1A28] border border-white/10 flex items-center justify-center text-xs shrink-0">
                          {rank + 1}
                        </span>
                        <span className="text-base shrink-0">{party.symbol}</span>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-white text-[10.5px] leading-tight truncate">
                            {party.name}
                          </h4>
                          <p className="text-[8px] text-gray-400 truncate">
                            {party.candidate}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono font-black text-xs text-white">
                          {party.voteShare}%
                        </span>
                        <span className="text-[8px] text-gray-400 block font-mono">
                          {party.votes.toLocaleString()} votes ({party.trend})
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar in Party Brand Color */}
                    <div className="h-2 bg-[#1A1A26] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700" 
                        style={{ width: `${party.voteShare}%`, backgroundColor: party.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Certification Card */}
            <div className="p-2.5 rounded-xl bg-[#12121A] border border-[#232330] flex items-center justify-between text-[8.5px]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-white leading-tight">Certified Pre-Poll Aggregation</p>
                  <p className="text-gray-400 text-[8px]">Encrypted multi-node ballot storage</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold text-[8px]">
                Valid 2026
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: 5-QUESTION CITIZEN OPINION PULSE */}
        {activeTab === 'questions' && (
          <div className="space-y-3 animate-fadeIn">
            {QUESTION_ANALYTICS.map((q) => (
              <div key={q.step} className="p-3 rounded-2xl bg-[#12121A] border border-[#252536] space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-[#1E1E2C]">
                  <span className="text-[9.5px] font-black text-amber-300 leading-snug">
                    {q.title}
                  </span>
                  <span className="text-[8px] font-mono text-gray-400">Step {q.step}/5</span>
                </div>

                <div className="space-y-1.5 pt-0.5">
                  {q.breakdown.map((item, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex items-center justify-between text-[8.5px]">
                        <span className="text-gray-300 truncate max-w-[70%]">{item.label}</span>
                        <span className="font-mono font-bold text-white">
                          {item.percent}% <span className="text-gray-500 font-normal">({item.votes})</span>
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#1C1C28] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" 
                          style={{ width: `${item.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: REAL-TIME BALLOT AUDIT STREAM */}
        {activeTab === 'audit' && (
          <div className="space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between px-1">
              <span className="text-[9.5px] font-bold text-white">Real-Time Ingestion Log</span>
              <span className="text-[8px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active Geofence Stream</span>
              </span>
            </div>

            <div className="space-y-1.5">
              {RECENT_AUDIT_LOG.map((log) => (
                <div key={log.id} className="p-2 rounded-xl bg-[#101018] border border-[#20202E] flex items-center justify-between text-[8.5px]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{log.id}</span>
                    <span className="text-white font-semibold">{log.party}</span>
                    <span className="text-gray-400">({log.locality})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500 text-[8px]">{log.time}</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[7px] border border-emerald-400/30">
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Admin Bottom Navigation / Action Dock */}
      <div className="px-3 py-2 bg-[#0E0E14] border-t border-[#232330] flex items-center justify-between gap-2 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2 px-3 rounded-xl bg-[#161622] hover:bg-[#1E1E2E] border border-[#2B2B3E] text-white font-extrabold text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Return to Citizen Mobile View</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#F8CD55] to-[#E3A336] text-black font-extrabold text-[10px] shadow-md shadow-amber-500/20 flex items-center justify-center gap-1 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <span>Home Feed</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
