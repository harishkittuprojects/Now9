// Advanced Automatic Geolocation, Address Resolution, and Constituency Database for NowNine

// ALL MAJOR POLITICAL PARTIES FOR TELANGANA (తెలంగాణ సమగ్ర పార్టీల జాబితా)
export function getTelanganaAllParties(assembly = 'Telangana Assembly', locality = 'Local Area', overrides = {}) {
  const cleanAssembly = (assembly || '').replace(/\s*Assembly\s*Constituency\s*/gi, '').replace(/\s*Assembly\s*/gi, '');
  return [
    {
      id: 'inc',
      name: 'Congress (INC)',
      teluguName: 'భారత జాతీయ కాంగ్రెస్ (INC)',
      code: 'INC',
      symbol: '✋',
      candidate: overrides.inc?.candidate || `Congress Candidate (${cleanAssembly})`,
      role: overrides.inc?.role || 'Ruling Party in Telangana',
      status: overrides.inc?.status || 'Ruling Party in Telangana',
      color: '#0284C7',
      badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      voteShare: overrides.inc?.voteShare || 39.4,
      focus: overrides.inc?.focus || 'రైతు భరోసా, 6 గ్యారెంటీలు, సివిక్ రోడ్ల విస్తరణ',
      keyFocus: overrides.inc?.keyFocus || 'రైతు భరోసా, 6 గ్యారెంటీలు, సివిక్ రోడ్ల విస్తరణ',
      promises: overrides.inc?.promises || [`24/7 drinking water in ${locality}`, 'Indiramma Housing assistance', 'Women free travel desks'],
      manifestoPromises: overrides.inc?.manifestoPromises || [`24/7 drinking water in ${locality}`, 'Indiramma Housing assistance', 'Women free travel desks']
    },
    {
      id: 'brs',
      name: 'BRS',
      teluguName: 'భారత్ రాష్ట్ర సమితి (BRS)',
      code: 'BRS',
      symbol: '🚗',
      candidate: overrides.brs?.candidate || `BRS Nominee (${cleanAssembly})`,
      role: overrides.brs?.role || 'Principal Opposition',
      status: overrides.brs?.status || 'Principal Opposition',
      color: '#E11D48',
      badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      voteShare: overrides.brs?.voteShare || 36.5,
      focus: overrides.brs?.focus || 'రైతు బంధు, సంక్షేమ పథకాలు, స్థానిక సమస్యలపై పోరాటం',
      keyFocus: overrides.brs?.keyFocus || 'రైతు బంధు, సంక్షేమ పథకాలు, స్థానిక సమస్యలపై పోరాటం',
      promises: overrides.brs?.promises || [`Local ward infrastructure upgrade in ${locality}`, 'Drainage and road repair guarantee'],
      manifestoPromises: overrides.brs?.promises || [`Local ward infrastructure upgrade in ${locality}`, 'Drainage and road repair guarantee']
    },
    {
      id: 'bjp',
      name: 'BJP',
      teluguName: 'భారతీయ జనతా పార్టీ (BJP)',
      code: 'BJP',
      symbol: '🪷',
      candidate: overrides.bjp?.candidate || `BJP Candidate (${cleanAssembly})`,
      role: overrides.bjp?.role || 'National Party / Key Challenger',
      status: overrides.bjp?.status || 'National Party / Key Challenger',
      color: '#FF6F00',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      voteShare: overrides.bjp?.voteShare || 15.2,
      focus: overrides.bjp?.focus || 'అవినీతి రహిత పాలన, కేంద్ర పథకాల అమలు, స్మార్ట్ సిటీ నిధులు',
      keyFocus: overrides.bjp?.keyFocus || 'అవినీతి రహిత పాలన, కేంద్ర పథకాల అమలు, స్మార్ట్ సిటీ నిధులు',
      promises: overrides.bjp?.promises || ['PM Awas Yojana urban houses', 'Smart surveillance & Clean roads'],
      manifestoPromises: overrides.bjp?.promises || ['PM Awas Yojana urban houses', 'Smart surveillance & Clean roads']
    },
    {
      id: 'aimim',
      name: 'AIMIM',
      teluguName: 'ఎంఐఎం (AIMIM)',
      code: 'AIMIM',
      symbol: '🪁',
      candidate: overrides.aimim?.candidate || `AIMIM Contestant (${cleanAssembly})`,
      role: overrides.aimim?.role || 'Regional Minority Representation',
      status: overrides.aimim?.status || 'Regional Minority Representation',
      color: '#059669',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      voteShare: overrides.aimim?.voteShare || 3.8,
      focus: overrides.aimim?.focus || 'మైనార్టీ హక్కులు, పాతబస్తీ అభివృద్ధి, ఉచిత విద్యా కేంద్రాలు',
      keyFocus: overrides.aimim?.keyFocus || 'మైనార్టీ హక్కులు, పాతబస్తీ అభివృద్ధి, ఉచిత విద్యా కేంద్రాలు',
      promises: overrides.aimim?.promises || ['Local community centers', 'Vocational training clinics'],
      manifestoPromises: overrides.aimim?.promises || ['Local community centers', 'Vocational training clinics']
    },
    {
      id: 'jsp',
      name: 'JanaSena (JSP)',
      teluguName: 'జనసేన పార్టీ (JSP)',
      code: 'JSP',
      symbol: '🍵',
      candidate: overrides.jsp?.candidate || `JSP Youth Leader (${cleanAssembly})`,
      role: overrides.jsp?.role || 'Youth & Change Vanguard',
      status: overrides.jsp?.status || 'Youth & Change Vanguard',
      color: '#DC2626',
      badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
      voteShare: overrides.jsp?.voteShare || 2.2,
      focus: overrides.jsp?.focus || 'యువత ఉపాధి, జవాబుదారీతనం, నవతరం రాజకీయాలు',
      keyFocus: overrides.jsp?.keyFocus || 'యువత ఉపాధి, జవాబుదారీతనం, నవతరం రాజకీయాలు',
      promises: overrides.jsp?.promises || ['Youth employment coaching centers', 'Citizen grievance helpline'],
      manifestoPromises: overrides.jsp?.promises || ['Youth employment coaching centers', 'Citizen grievance helpline']
    },
    {
      id: 'cpi',
      name: 'CPI / Left Front',
      teluguName: 'సీపీఐ / సీపీఎం (వామపక్షాలు)',
      code: 'LEFT',
      symbol: '🌾',
      candidate: overrides.cpi?.candidate || `Left Front Nominee (${cleanAssembly})`,
      role: overrides.cpi?.role || 'Working Class & Farmers Movement',
      status: overrides.cpi?.status || 'Working Class & Farmers Movement',
      color: '#BE123C',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      voteShare: overrides.cpi?.voteShare || 1.1,
      focus: overrides.cpi?.focus || 'కార్మికుల కనీస వేతనాలు, భూమి సమస్యలు, ఉచిత విద్య & వైద్యం',
      keyFocus: overrides.cpi?.keyFocus || 'కార్మికుల కనీస వేతనాలు, భూమి సమస్యలు, ఉచిత విద్య & వైద్యం',
      promises: overrides.cpi?.promises || ['Workers grievance cell', 'Affordable civic housing'],
      manifestoPromises: overrides.cpi?.promises || ['Workers grievance cell', 'Affordable civic housing']
    },
    {
      id: 'bsp',
      name: 'BSP',
      teluguName: 'బహుజన్ సమాజ్ పార్టీ (BSP)',
      code: 'BSP',
      symbol: '🐘',
      candidate: overrides.bsp?.candidate || `BSP Nominee (${cleanAssembly})`,
      role: overrides.bsp?.role || 'Bahujan Representation',
      status: overrides.bsp?.status || 'Bahujan Representation',
      color: '#1D4ED8',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      voteShare: overrides.bsp?.voteShare || 0.8,
      focus: overrides.bsp?.focus || 'సామాజిక న్యాయం, బహుజన రాజ్యాధికారం, విద్యారంగ అభివృద్ధి',
      keyFocus: overrides.bsp?.keyFocus || 'సామాజిక న్యాయం, బహుజన రాజ్యాధికారం, విద్యారంగ అభివృద్ధి',
      promises: overrides.bsp?.promises || ['Ambedkar Study Circles', 'Scholarship guarantee desks'],
      manifestoPromises: overrides.bsp?.promises || ['Ambedkar Study Circles', 'Scholarship guarantee desks']
    },
    {
      id: 'oth',
      name: 'Others & Independents',
      teluguName: 'స్వతంత్రులు & ఇతరులు',
      code: 'IND',
      symbol: '🗳️',
      candidate: overrides.oth?.candidate || `Independent Contenders (${cleanAssembly})`,
      role: overrides.oth?.role || 'Grassroots Contenders',
      status: overrides.oth?.status || 'Grassroots Contenders',
      color: '#64748B',
      badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
      voteShare: overrides.oth?.voteShare || 1.0,
      focus: overrides.oth?.focus || 'స్థానిక సమస్యల తక్షణ పరిష్కారం, అవినీతి నిర్మూలన',
      keyFocus: overrides.oth?.keyFocus || 'స్థానిక సమస్యల తక్షణ పరిష్కారం, అవినీతి నిర్మూలన',
      promises: overrides.oth?.promises || ['Local sanitation monitoring', 'Direct ward complaints cell'],
      manifestoPromises: overrides.oth?.promises || ['Local sanitation monitoring', 'Direct ward complaints cell']
    }
  ];
}

// ALL MAJOR POLITICAL PARTIES FOR ANDHRA PRADESH (ఆంధ్రప్రదేశ్ సమగ్ర పార్టీల జాబితా)
export function getAndhraAllParties(assembly = 'Andhra Assembly', locality = 'Local Area', overrides = {}) {
  const cleanAssembly = (assembly || '').replace(/\s*Assembly\s*Constituency\s*/gi, '').replace(/\s*Assembly\s*/gi, '');
  return [
    {
      id: 'tdp',
      name: 'TDP (Telugu Desam)',
      teluguName: 'తెలుగుదేశం పార్టీ (కూటమి)',
      code: 'TDP',
      symbol: '🚲',
      candidate: overrides.tdp?.candidate || `TDP Nominee / MLA (${cleanAssembly})`,
      role: overrides.tdp?.role || 'Ruling Coalition Leader',
      status: overrides.tdp?.status || 'Ruling Coalition Leader',
      color: '#EAB308',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      voteShare: overrides.tdp?.voteShare || 47.8,
      focus: overrides.tdp?.focus || 'అమరావతి నిర్మాణం, సూపర్ 6 పథకాలు, రోడ్ల అభివృద్ధి',
      keyFocus: overrides.tdp?.keyFocus || 'అమరావతి నిర్మాణం, సూపర్ 6 పథకాలు, రోడ్ల అభివృద్ధి',
      promises: overrides.tdp?.promises || [`New civic roads in ${locality}`, 'Thalliki Vandanam program', 'Yuva Galam employment hub'],
      manifestoPromises: overrides.tdp?.promises || [`New civic roads in ${locality}`, 'Thalliki Vandanam program', 'Yuva Galam employment hub']
    },
    {
      id: 'ysrcp',
      name: 'YSRCP',
      teluguName: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ (YSRCP)',
      code: 'YSRCP',
      symbol: '🪭',
      candidate: overrides.ysrcp?.candidate || `YSRCP Incharge / Ex-MLA (${cleanAssembly})`,
      role: overrides.ysrcp?.role || 'Principal Opposition',
      status: overrides.ysrcp?.status || 'Principal Opposition',
      color: '#0EA5E9',
      badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      voteShare: overrides.ysrcp?.voteShare || 41.5,
      focus: overrides.ysrcp?.focus || 'నవరత్నాలు, సంక్షేమ పథకాలు, బస్తీ ఆరోగ్య కేంద్రాలు',
      keyFocus: overrides.ysrcp?.keyFocus || 'నవరత్నాలు, సంక్షేమ పథకాలు, బస్తీ ఆరోగ్య కేంద్రాలు',
      promises: overrides.ysrcp?.promises || ['Direct social pensions', 'Free municipal clinics', 'Fee reimbursement support'],
      manifestoPromises: overrides.ysrcp?.promises || ['Direct social pensions', 'Free municipal clinics', 'Fee reimbursement support']
    },
    {
      id: 'jsp',
      name: 'JanaSena Party (JSP)',
      teluguName: 'జనసేన పార్టీ (కూటమి)',
      code: 'JSP',
      symbol: '🍵',
      candidate: overrides.jsp?.candidate || `JSP Alliance Nominee (${cleanAssembly})`,
      role: overrides.jsp?.role || 'Ruling Coalition Partner',
      status: overrides.jsp?.status || 'Ruling Coalition Partner',
      color: '#DC2626',
      badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
      voteShare: overrides.jsp?.voteShare || 4.5,
      focus: overrides.jsp?.focus || 'పంచాయతీ రాజ్ బలోపేతం, పర్యావరణ పరిరక్షణ, యువత ఉపాధి',
      keyFocus: overrides.jsp?.keyFocus || 'పంచాయతీ రాజ్ బలోపేతం, పర్యావరణ పరిరక్షణ, యువత ఉపాధి',
      promises: overrides.jsp?.promises || ['Panchayat funds release', 'Farmer support grievance desks'],
      manifestoPromises: overrides.jsp?.promises || ['Panchayat funds release', 'Farmer support grievance desks']
    },
    {
      id: 'bjp',
      name: 'BJP (Bharatiya Janata)',
      teluguName: 'భారతీయ జనతా పార్టీ (కూటమి)',
      code: 'BJP',
      symbol: '🪷',
      candidate: overrides.bjp?.candidate || `BJP Alliance Candidate (${cleanAssembly})`,
      role: overrides.bjp?.role || 'Ruling Coalition Partner',
      status: overrides.bjp?.status || 'Ruling Coalition Partner',
      color: '#FF6F00',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      voteShare: overrides.bjp?.voteShare || 2.4,
      focus: overrides.bjp?.focus || 'కేంద్ర నిధులు, హైవే ప్రాజెక్టులు, పారిశ్రామిక నడవా',
      keyFocus: overrides.bjp?.keyFocus || 'కేంద్ర నిధులు, హైవే ప్రాజెక్టులు, పారిశ్రామిక నడవా',
      promises: overrides.bjp?.promises || ['Industrial corridor linkage', 'Central railway modernization'],
      manifestoPromises: overrides.bjp?.promises || ['Industrial corridor linkage', 'Central railway modernization']
    },
    {
      id: 'inc',
      name: 'Congress (AP)',
      teluguName: 'భారత జాతీయ కాంగ్రెస్ (INC)',
      code: 'INC',
      symbol: '✋',
      candidate: overrides.inc?.candidate || `Congress Nominee (${cleanAssembly})`,
      role: overrides.inc?.role || 'National Opposition',
      status: overrides.inc?.status || 'National Opposition',
      color: '#10B981',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      voteShare: overrides.inc?.voteShare || 1.8,
      focus: overrides.inc?.focus || 'ప్రత్యేక హోదా & పారిశ్రామిక రాయితీలు, పోలవరం పూర్తి',
      keyFocus: overrides.inc?.keyFocus || 'ప్రత్యేక హోదా & పారిశ్రామిక రాయితీలు, పోలవరం పూర్తి',
      promises: overrides.inc?.promises || ['Special Category Status movement', 'Government job recruitment notification'],
      manifestoPromises: overrides.inc?.promises || ['Special Category Status movement', 'Government job recruitment notification']
    },
    {
      id: 'cpi',
      name: 'CPI / Left Front',
      teluguName: 'సీపీఐ / సీపీఎం (వామపక్షాలు)',
      code: 'LEFT',
      symbol: '🌾',
      candidate: overrides.cpi?.candidate || `Left Front Contestant (${cleanAssembly})`,
      role: overrides.cpi?.role || 'People’s Front / Labor Rights',
      status: overrides.cpi?.status || 'People’s Front / Labor Rights',
      color: '#BE123C',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      voteShare: overrides.cpi?.voteShare || 0.7,
      focus: overrides.cpi?.focus || 'విశాఖ స్టీల్ ప్లాంట్ పరిరక్షణ, కనీస వేతనాలు, రైతు గిట్టుబాటు ధర',
      keyFocus: overrides.cpi?.keyFocus || 'విశాఖ స్టీల్ ప్లాంట్ పరిరక్షణ, కనీస వేతనాలు, రైతు గిట్టుబాటు ధర',
      promises: overrides.cpi?.promises || ['Protect public sector jobs', 'Farmer MSP guarantee centers'],
      manifestoPromises: overrides.cpi?.promises || ['Protect public sector jobs', 'Farmer MSP guarantee centers']
    },
    {
      id: 'bsp',
      name: 'BSP',
      teluguName: 'బహుజన్ సమాజ్ పార్టీ (BSP)',
      code: 'BSP',
      symbol: '🐘',
      candidate: overrides.bsp?.candidate || `BSP Nominee (${cleanAssembly})`,
      role: overrides.bsp?.role || 'Bahujan Social Justice',
      status: overrides.bsp?.status || 'Bahujan Social Justice',
      color: '#1D4ED8',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      voteShare: overrides.bsp?.voteShare || 0.5,
      focus: overrides.bsp?.focus || 'సామాజిక న్యాయం, దళిత బహుజన హక్కులు',
      keyFocus: overrides.bsp?.keyFocus || 'సామాజిక న్యాయం, దళిత బహుజన హక్కులు',
      promises: overrides.bsp?.promises || ['Equal educational funding', 'Civic rights assistance'],
      manifestoPromises: overrides.bsp?.promises || ['Equal educational funding', 'Civic rights assistance']
    },
    {
      id: 'oth',
      name: 'Others & Independents',
      teluguName: 'స్వతంత్రులు & ఇతరులు',
      code: 'IND',
      symbol: '🗳️',
      candidate: overrides.oth?.candidate || `Independent Contenders (${cleanAssembly})`,
      role: overrides.oth?.role || 'Independent Candidates',
      status: overrides.oth?.status || 'Independent Candidates',
      color: '#64748B',
      badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
      voteShare: overrides.oth?.voteShare || 0.6,
      focus: overrides.oth?.focus || 'స్థానిక సమస్యల పరిష్కారం, అవినీతి రహిత వార్డు',
      keyFocus: overrides.oth?.keyFocus || 'స్థానిక సమస్యల పరిష్కారం, అవినీతి రహిత వార్డు',
      promises: overrides.oth?.promises || ['Citizen complaints cell', 'Local sanitation monitoring'],
      manifestoPromises: overrides.oth?.promises || ['Citizen complaints cell', 'Local sanitation monitoring']
    }
  ];
}

export const DEFAULT_DETECTED_LOCATION = {
  id: 'hyderabad-jubilee',
  locality: 'Jubilee Hills',
  city: 'Hyderabad',
  district: 'Hyderabad',
  state: 'Telangana',
  pincode: '500033',
  ward: 'Ward No. 98 (Khairatabad Division)',
  assembly: 'Jubilee Hills / Khairatabad Assembly',
  parliament: 'Secunderabad Lok Sabha',
  formattedAddress: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana - 500033',
  exactAddress: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana - 500033',
  gpsCoordinates: '17.4325° N, 78.4071° E',
  detectionMethod: 'Auto-detected via GPS & Network 🛰️',
  parties: getTelanganaAllParties('Jubilee Hills / Khairatabad Assembly', 'Jubilee Hills', {
    inc: { candidate: 'Danam Nagender / Azharuddin', voteShare: 38.6 },
    brs: { candidate: 'Maganti Gopinath', voteShare: 36.2 },
    bjp: { candidate: 'Lankala Deepak Reddy', voteShare: 16.8 },
    aimim: { candidate: 'Rashed Faraz Dildar', voteShare: 4.5 }
  })
};

// Comprehensive Database covering key Telangana & Andhra Pradesh Constituencies
export const CONSTITUENCY_DATABASE = [
  {
    id: 'telangana-mahabubnagar',
    locality: 'Yenugonda (యెనుగొండ)',
    city: 'Mahabubnagar',
    district: 'Mahabubnagar',
    state: 'Telangana',
    pincode: '509001',
    ward: 'Ward No. 12 (Yenugonda / Mahabubnagar Urban)',
    assembly: 'Mahabubnagar Assembly Constituency',
    parliament: 'Mahabubnagar Lok Sabha',
    formattedAddress: 'Yenugonda, Mahabubnagar, Telangana - 509001',
    exactAddress: 'Yenugonda, Mahabubnagar, Telangana - 509001',
    gpsCoordinates: '16.7645° N, 77.9860° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: getTelanganaAllParties('Mahabubnagar Assembly Constituency', 'Yenugonda', {
      inc: { candidate: 'Yennam Srinivas Reddy (Sitting MLA)', voteShare: 45.6 },
      brs: { candidate: 'V. Srinivas Goud (Ex-Minister)', voteShare: 40.2 },
      bjp: { candidate: 'A.P. Mithun Kumar Reddy', voteShare: 11.8 }
    })
  },
  DEFAULT_DETECTED_LOCATION,
  {
    id: 'hyderabad-serilingampally',
    locality: 'HITEC City & Gachibowli',
    city: 'Hyderabad',
    district: 'Ranga Reddy / Cyberabad',
    state: 'Telangana',
    pincode: '500081',
    ward: 'Ward No. 107 (Serilingampally Division)',
    assembly: 'Serilingampally Assembly',
    parliament: 'Chevella Lok Sabha',
    formattedAddress: 'Financial District, Gachibowli, Hyderabad, Telangana - 500081',
    exactAddress: 'Financial District, Gachibowli, Hyderabad, Telangana - 500081',
    gpsCoordinates: '17.4401° N, 78.3489° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: getTelanganaAllParties('Serilingampally Assembly', 'Gachibowli', {
      brs: { candidate: 'Arekapudi Gandhi (Incumbent MLA)', voteShare: 41.5 },
      inc: { candidate: 'Jagadeeshwar Goud', voteShare: 35.8 },
      bjp: { candidate: 'Ravi Kumar Yadav', voteShare: 18.2 }
    })
  },
  {
    id: 'hyderabad-kukatpally',
    locality: 'Kukatpally & KPHB Colony',
    city: 'Hyderabad',
    district: 'Medchal-Malkajgiri',
    state: 'Telangana',
    pincode: '500072',
    ward: 'Ward No. 114 (KPHB 6th Phase)',
    assembly: 'Kukatpally Assembly',
    parliament: 'Malkajgiri Lok Sabha',
    formattedAddress: 'Road No. 1, KPHB Colony, Kukatpally, Hyderabad, Telangana - 500072',
    exactAddress: 'Road No. 1, KPHB Colony, Kukatpally, Hyderabad, Telangana - 500072',
    gpsCoordinates: '17.4938° N, 78.3995° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: getTelanganaAllParties('Kukatpally Assembly', 'Kukatpally', {
      brs: { candidate: 'Madhavaram Krishna Rao (Sitting MLA)', voteShare: 43.8 },
      inc: { candidate: 'Bandi Ramesh', voteShare: 34.2 },
      bjp: { candidate: 'M. Prem Kumar', voteShare: 18.0 }
    })
  },
  {
    id: 'hyderabad-secunderabad',
    locality: 'Secunderabad & Begumpet',
    city: 'Hyderabad',
    district: 'Hyderabad',
    state: 'Telangana',
    pincode: '500003',
    ward: 'Ward No. 147 (Monda Market)',
    assembly: 'Secunderabad Assembly',
    parliament: 'Secunderabad Lok Sabha',
    formattedAddress: 'MG Road, Secunderabad Clock Tower, Hyderabad, Telangana - 500003',
    exactAddress: 'MG Road, Secunderabad Clock Tower, Hyderabad, Telangana - 500003',
    gpsCoordinates: '17.4411° N, 78.4983° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: getTelanganaAllParties('Secunderabad Assembly', 'Secunderabad Clock Tower', {
      brs: { candidate: 'T. Padma Rao Goud', voteShare: 42.1 },
      inc: { candidate: 'Adam Santosh Kumar', voteShare: 33.9 },
      bjp: { candidate: 'Mekala Sarangapani', voteShare: 20.3 }
    })
  },
  {
    id: 'vijayawada-central',
    locality: 'Governorpet & Benz Circle',
    city: 'Vijayawada',
    district: 'NTR District',
    state: 'Andhra Pradesh',
    pincode: '520002',
    ward: 'Ward 24 (VMC Benz Circle)',
    assembly: 'Vijayawada Central Assembly',
    parliament: 'Vijayawada Lok Sabha',
    formattedAddress: 'MG Road, Benz Circle, Vijayawada, Andhra Pradesh - 520002',
    exactAddress: 'MG Road, Benz Circle, Vijayawada, Andhra Pradesh - 520002',
    gpsCoordinates: '16.5062° N, 80.6480° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: getAndhraAllParties('Vijayawada Central Assembly', 'Benz Circle', {
      tdp: { candidate: 'Bonda Umamaheswara Rao', voteShare: 46.2 },
      ysrcp: { candidate: 'Vellampalli Srinivas', voteShare: 43.1 },
      inc: { candidate: 'YS Sharmila / Nominee', voteShare: 7.2 }
    })
  },
  {
    id: 'vizag-east',
    locality: 'MVP Colony & Beach Road',
    city: 'Visakhapatnam',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    pincode: '530017',
    ward: 'Ward 18 (GVMC MVP Sector)',
    assembly: 'Visakhapatnam East Assembly',
    parliament: 'Visakhapatnam Lok Sabha',
    formattedAddress: 'Beach Road, MVP Colony, Visakhapatnam, Andhra Pradesh - 530017',
    exactAddress: 'Beach Road, MVP Colony, Visakhapatnam, Andhra Pradesh - 530017',
    gpsCoordinates: '17.7289° N, 83.3328° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: getAndhraAllParties('Visakhapatnam East Assembly', 'MVP Colony', {
      tdp: { candidate: 'Velagapudi Ramakrishna Babu (Ruling MLA)', voteShare: 52.4 },
      ysrcp: { candidate: 'MVV Satyanarayana', voteShare: 39.8 }
    })
  },
  {
    id: 'warangal-west',
    locality: 'Hanamkonda & Subedari',
    city: 'Warangal',
    district: 'Hanamkonda',
    state: 'Telangana',
    pincode: '506001',
    ward: 'Ward 12 (GWMC Subedari)',
    assembly: 'Warangal West Assembly',
    parliament: 'Warangal Lok Sabha',
    formattedAddress: 'Collectorate Road, Subedari, Hanamkonda, Warangal, Telangana - 506001',
    exactAddress: 'Collectorate Road, Subedari, Hanamkonda, Warangal, Telangana - 506001',
    gpsCoordinates: '17.9784° N, 79.5941° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: getTelanganaAllParties('Warangal West Assembly', 'Hanamkonda', {
      inc: { candidate: 'Naini Rajender Reddy (Ruling MLA)', voteShare: 44.5 },
      brs: { candidate: 'Dasyam Vinay Bhasker', voteShare: 37.8 },
      bjp: { candidate: 'Rao Padma', voteShare: 15.3 }
    })
  },
  {
    id: 'guntur-west',
    locality: 'Brodipet & Arundelpet',
    city: 'Guntur',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    pincode: '522002',
    ward: 'Ward 15 (GMC)',
    assembly: 'Guntur West Assembly',
    parliament: 'Guntur Lok Sabha',
    formattedAddress: 'Main Road, Brodipet, Guntur, Andhra Pradesh - 522002',
    exactAddress: 'Main Road, Brodipet, Guntur, Andhra Pradesh - 522002',
    gpsCoordinates: '16.3067° N, 80.4365° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: getAndhraAllParties('Guntur West Assembly', 'Brodipet', {
      tdp: { candidate: 'Galla Madhavi (Ruling MLA)', voteShare: 49.3 },
      ysrcp: { candidate: 'Vidadala Rajini', voteShare: 42.6 }
    })
  },
  {
    id: 'tirupati-urban',
    locality: 'Alipiri & KT Road',
    city: 'Tirupati',
    district: 'Tirupati',
    state: 'Andhra Pradesh',
    pincode: '517501',
    ward: 'Ward 8 (TMC)',
    assembly: 'Tirupati Assembly',
    parliament: 'Tirupati Lok Sabha',
    formattedAddress: 'Alipiri Road, Tirupati, Andhra Pradesh - 517501',
    exactAddress: 'Alipiri Road, Tirupati, Andhra Pradesh - 517501',
    gpsCoordinates: '13.6288° N, 79.4192° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: getAndhraAllParties('Tirupati Assembly', 'Alipiri Road', {
      tdp: { candidate: 'Arani Srinivasulu (Ruling MLA)', voteShare: 51.2 },
      ysrcp: { candidate: 'Bhumana Abhinay Reddy', voteShare: 42.8 }
    })
  },
  {
    id: 'ap-kurnool',
    locality: 'C-Camp & Old City (కర్నూలు)',
    city: 'Kurnool',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    pincode: '518002',
    ward: 'Ward No. 18 (KMC Kurnool)',
    assembly: 'Kurnool Assembly Constituency',
    parliament: 'Kurnool Lok Sabha',
    formattedAddress: 'C-Camp Centre, Kurnool, Andhra Pradesh - 518002',
    exactAddress: 'C-Camp Centre, Kurnool, Andhra Pradesh - 518002',
    gpsCoordinates: '15.8281° N, 78.0373° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: getAndhraAllParties('Kurnool Assembly Constituency', 'C-Camp Centre', {
      tdp: { candidate: 'T.G. Bharath (Sitting MLA / Minister)', voteShare: 48.4 },
      ysrcp: { candidate: 'A. Md. Imtiaz (Ex-Collector)', voteShare: 42.1 },
      inc: { candidate: 'Shaik Jailani Basha', voteShare: 3.2 }
    })
  }
];

// Helper: Dynamically builds constituency & party profile for ANY reverse-geocoded location
export function resolveConstituencyAndParties(detectedInfo) {
  const {
    locality = '',
    city = '',
    district = '',
    state = '',
    pincode = '',
    exactAddress = '',
    lat = 0,
    lon = 0,
    county = '',
    method = 'Auto-detected via Live Device GPS 🛰️'
  } = detectedInfo;

  const searchTarget = `${locality} ${city} ${district} ${county} ${exactAddress}`.toLowerCase();

  // Geofence check for Mahabubnagar / Yenugonda:
  // Coordinates range for Mahabubnagar urban: Lat ~ 16.60 to 16.90, Lon ~ 77.85 to 78.15
  const isMahabubnagarCoordinates = lat && lon && (lat >= 16.60 && lat <= 16.90 && lon >= 77.85 && lon <= 78.15);

  const isYenugondaOrMahabubnagar = isMahabubnagarCoordinates || 
    searchTarget.includes('yenugonda') || 
    searchTarget.includes('యెనుగొండ') || 
    searchTarget.includes('enugonda') || 
    searchTarget.includes('mahbubnagar') || 
    searchTarget.includes('mahabubnagar') || 
    searchTarget.includes('మహబూబ్‌నగర్') || 
    searchTarget.includes('మహబూబ్ నగర్') || 
    searchTarget.includes('palamuru') || 
    searchTarget.includes('పాలమూరు') ||
    pincode === '509001' || pincode === '509002';

  if (isYenugondaOrMahabubnagar) {
    const mbItem = CONSTITUENCY_DATABASE.find(item => item.id === 'telangana-mahabubnagar') || CONSTITUENCY_DATABASE[0];
    const displayLocality = locality || 'యెనుగొండ';
    return {
      ...mbItem,
      locality: displayLocality,
      city: 'Mahabubnagar',
      district: 'Mahabubnagar',
      assembly: 'Mahabubnagar Assembly Constituency',
      parliament: 'Mahabubnagar Lok Sabha',
      pincode: pincode || '509001',
      formattedAddress: exactAddress || `${displayLocality}, Mahabubnagar, Telangana - ${pincode || '509001'}`,
      exactAddress: exactAddress || `${displayLocality}, Mahabubnagar, Telangana - ${pincode || '509001'}`,
      gpsCoordinates: lat && lon ? `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E` : mbItem.gpsCoordinates,
      detectionMethod: method
    };
  }

  // Geofence check for Kurnool (AP-138):
  const isKurnoolCoordinates = lat && lon && (lat >= 15.65 && lat <= 16.00 && lon >= 77.85 && lon <= 78.20);
  const isKurnool = isKurnoolCoordinates ||
    searchTarget.includes('kurnool') ||
    searchTarget.includes('కర్నూలు') ||
    searchTarget.includes('c-camp') ||
    searchTarget.includes('kurnool urban') ||
    (pincode && pincode.startsWith('518'));

  if (isKurnool) {
    const kurnoolItem = CONSTITUENCY_DATABASE.find(item => item.id === 'ap-kurnool');
    if (kurnoolItem) {
      const displayLocality = locality || 'C-Camp (కర్నూలు)';
      return {
        ...kurnoolItem,
        locality: displayLocality,
        city: 'Kurnool',
        district: 'Kurnool',
        assembly: 'Kurnool Assembly Constituency',
        parliament: 'Kurnool Lok Sabha',
        pincode: pincode || '518002',
        formattedAddress: exactAddress || `${displayLocality}, Kurnool, Andhra Pradesh - ${pincode || '518002'}`,
        exactAddress: exactAddress || `${displayLocality}, Kurnool, Andhra Pradesh - ${pincode || '518002'}`,
        gpsCoordinates: lat && lon ? `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E` : kurnoolItem.gpsCoordinates,
        detectionMethod: method
      };
    }
  }

  // Geofence & Keyword check for Visakhapatnam / Vizag (including Rushikonda, MVP Colony, Bheemili, Gajuwaka):
  const isVizagCoordinates = lat && lon && (lat >= 17.50 && lat <= 18.00 && lon >= 83.10 && lon <= 83.50);
  const isVisakhapatnam = isVizagCoordinates ||
    searchTarget.includes('visakhapatnam') ||
    searchTarget.includes('vishaka') ||
    searchTarget.includes('rushikonda') ||
    searchTarget.includes('ఋషికొండ') ||
    searchTarget.includes('bheemili') ||
    searchTarget.includes('భీమిలి') ||
    searchTarget.includes('vizag') ||
    searchTarget.includes('mvp colony') ||
    searchTarget.includes('gajuwaka') ||
    searchTarget.includes('pendurthi') ||
    searchTarget.includes('anakapalle') ||
    searchTarget.includes('విశాఖ') ||
    (pincode && (pincode.startsWith('530') || pincode.startsWith('531')));

  if (isVisakhapatnam) {
    const vizagItem = CONSTITUENCY_DATABASE.find(item => item.id === 'vizag-east');
    const displayLocality = locality || 'Rushikonda (రుషికొండ)';
    return {
      ...(vizagItem || CONSTITUENCY_DATABASE[0]),
      id: 'ap-visakhapatnam',
      locality: displayLocality,
      city: 'Visakhapatnam',
      district: 'Visakhapatnam',
      assembly: 'Visakhapatnam East Assembly',
      parliament: 'Visakhapatnam Lok Sabha',
      state: 'Andhra Pradesh',
      pincode: pincode || '530045',
      formattedAddress: exactAddress || `${displayLocality}, Visakhapatnam, Andhra Pradesh - ${pincode || '530045'}`,
      exactAddress: exactAddress || `${displayLocality}, Visakhapatnam, Andhra Pradesh - ${pincode || '530045'}`,
      gpsCoordinates: lat && lon ? `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E` : '17.7818° N, 83.3794° E',
      detectionMethod: method,
      parties: getAndhraAllParties('Visakhapatnam East Assembly', displayLocality, {
        tdp: { candidate: 'Velagapudi Ramakrishna Babu (Sitting MLA)', voteShare: 51.4 },
        ysrcp: { candidate: 'MVV Satyanarayana', voteShare: 38.6 }
      })
    };
  }

  // 1. Try to find an exact match in our pre-curated database
  const matched = CONSTITUENCY_DATABASE.find(item => {
    const itemTarget = `${item.locality} ${item.city} ${item.assembly}`.toLowerCase();
    return searchTarget.includes(item.locality.toLowerCase()) || 
           (locality && item.locality.toLowerCase().includes(locality.toLowerCase())) ||
           (item.pincode && pincode && item.pincode === pincode);
  });

  if (matched) {
    return {
      ...matched,
      locality: locality || matched.locality,
      exactAddress: exactAddress || matched.exactAddress,
      formattedAddress: exactAddress || matched.formattedAddress,
      pincode: pincode || matched.pincode,
      gpsCoordinates: lat && lon ? `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E` : matched.gpsCoordinates,
      detectionMethod: method
    };
  }

  // 2. Intelligent Assembly Constituency resolver for any other Telangana location
  const isTelangana = state.toLowerCase().includes('telangana') || searchTarget.includes('hyderabad') || searchTarget.includes('secunderabad');
  if (isTelangana) {
    let resolvedAssembly = '';
    let parliamentName = 'State';

    if (searchTarget.includes('almasguda') || searchTarget.includes('అల్మాస్‌గూడ') || searchTarget.includes('badangpet') || searchTarget.includes('meerpet') || searchTarget.includes('lb nagar') || searchTarget.includes('saroornagar')) {
      resolvedAssembly = 'LB Nagar Assembly Constituency';
      parliamentName = 'Malkajgiri / Chevella Lok Sabha';
    } else if (searchTarget.includes('gachibowli') || searchTarget.includes('madhapur') || searchTarget.includes('kondapur') || searchTarget.includes('serilingampally')) {
      resolvedAssembly = 'Serilingampally Assembly Constituency';
      parliamentName = 'Chevella Lok Sabha';
    } else if (searchTarget.includes('kphb') || searchTarget.includes('kukatpally') || searchTarget.includes('nizampet') || searchTarget.includes('bachupally')) {
      resolvedAssembly = 'Kukatpally Assembly Constituency';
      parliamentName = 'Malkajgiri Lok Sabha';
    } else if (searchTarget.includes('jubilee') || searchTarget.includes('banjara') || searchTarget.includes('film nagar')) {
      resolvedAssembly = 'Jubilee Hills Assembly Constituency';
      parliamentName = 'Secunderabad Lok Sabha';
    } else if (searchTarget.includes('khairatabad') || searchTarget.includes('ameerpet') || searchTarget.includes('panjagutta') || searchTarget.includes('somajiguda')) {
      resolvedAssembly = 'Khairatabad Assembly Constituency';
      parliamentName = 'Secunderabad Lok Sabha';
    } else if (searchTarget.includes('secunderabad') || searchTarget.includes('begumpet') || searchTarget.includes('marredpally')) {
      resolvedAssembly = 'Secunderabad Assembly Constituency';
      parliamentName = 'Secunderabad Lok Sabha';
    } else if (searchTarget.includes('uppal') || searchTarget.includes('habsiguda') || searchTarget.includes('ramanthapur') || searchTarget.includes('nacharam')) {
      resolvedAssembly = 'Uppal Assembly Constituency';
      parliamentName = 'Malkajgiri Lok Sabha';
    } else if (searchTarget.includes('malkajgiri') || searchTarget.includes('neredmet') || searchTarget.includes('moula ali')) {
      resolvedAssembly = 'Malkajgiri Assembly Constituency';
      parliamentName = 'Malkajgiri Lok Sabha';
    } else if (searchTarget.includes('quthbullapur') || searchTarget.includes('jeedimetla') || searchTarget.includes('chintal')) {
      resolvedAssembly = 'Quthbullapur Assembly Constituency';
      parliamentName = 'Malkajgiri Lok Sabha';
    } else if (searchTarget.includes('rajendranagar') || searchTarget.includes('attapur') || searchTarget.includes('shamshabad')) {
      resolvedAssembly = 'Rajendranagar Assembly Constituency';
      parliamentName = 'Chevella Lok Sabha';
    } else if (searchTarget.includes('munugode') || searchTarget.includes('choutuppal') || searchTarget.includes('chandur')) {
      resolvedAssembly = 'Munugode Assembly Constituency';
      parliamentName = 'Bhongir Lok Sabha';
    } else if (searchTarget.includes('gajwel') || searchTarget.includes('toopran')) {
      resolvedAssembly = 'Gajwel Assembly Constituency';
      parliamentName = 'Medak Lok Sabha';
    } else if (searchTarget.includes('warangal') || searchTarget.includes('hanamkonda') || searchTarget.includes('kazipet')) {
      resolvedAssembly = 'Warangal West Assembly Constituency';
      parliamentName = 'Warangal Lok Sabha';
    } else if (searchTarget.includes('karimnagar')) {
      resolvedAssembly = 'Karimnagar Assembly Constituency';
      parliamentName = 'Karimnagar Lok Sabha';
    } else if (searchTarget.includes('nizamabad')) {
      resolvedAssembly = 'Nizamabad Urban Assembly Constituency';
      parliamentName = 'Nizamabad Lok Sabha';
    } else if (searchTarget.includes('khammam')) {
      resolvedAssembly = 'Khammam Assembly Constituency';
      parliamentName = 'Khammam Lok Sabha';
    } else if (searchTarget.includes('nalgonda')) {
      resolvedAssembly = 'Nalgonda Assembly Constituency';
      parliamentName = 'Nalgonda Lok Sabha';
    } else if (city && city !== 'Hyderabad' && city.length > 2) {
      resolvedAssembly = `${city} Assembly Constituency`;
      parliamentName = `${city} Lok Sabha`;
    } else if (district && district !== 'Hyderabad' && district.length > 2) {
      resolvedAssembly = `${district} Assembly Constituency`;
      parliamentName = `${district} Lok Sabha`;
    } else {
      resolvedAssembly = 'Jubilee Hills / Khairatabad Assembly';
      parliamentName = 'Secunderabad Lok Sabha';
    }

    const areaName = locality || city || 'Local Area';
    return {
      id: `ts-auto-${Date.now()}`,
      locality: locality || city || 'Local Area',
      city: city || 'Hyderabad',
      district: district || city,
      state: 'Telangana',
      pincode: pincode || '500001',
      ward: `Ward (${areaName} Division)`,
      assembly: resolvedAssembly,
      parliament: parliamentName,
      formattedAddress: exactAddress || `${areaName}, ${city}, Telangana - ${pincode}`,
      exactAddress: exactAddress || `${areaName}, ${city}, Telangana - ${pincode}`,
      gpsCoordinates: lat && lon ? `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E` : '17.3850° N, 78.4867° E',
      detectionMethod: method,
      parties: getTelanganaAllParties(resolvedAssembly, areaName)
    };
  }

  // 3. If located anywhere in Andhra Pradesh (e.g. Nellore, Kurnool, Kadapa, Anantapur, Kakinada, etc.)
  const isAP = state.toLowerCase().includes('andhra') || searchTarget.includes('andhra');
  if (isAP) {
    const areaName = locality || city || district || 'Andhra Locality';
    return {
      id: `ap-auto-${Date.now()}`,
      locality: locality || city || 'Local Area',
      city: city || 'Vijayawada',
      district: district || city,
      state: 'Andhra Pradesh',
      pincode: pincode || '520001',
      ward: `Ward (${areaName} Division)`,
      assembly: `${areaName} Assembly Constituency`,
      parliament: `${city || district || 'State'} Lok Sabha`,
      formattedAddress: exactAddress || `${areaName}, ${city}, Andhra Pradesh - ${pincode}`,
      exactAddress: exactAddress || `${areaName}, ${city}, Andhra Pradesh - ${pincode}`,
      gpsCoordinates: lat && lon ? `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E` : '16.5062° N, 80.6480° E',
      detectionMethod: method,
      parties: getAndhraAllParties(`${areaName} Assembly`, areaName)
    };
  }

  // 4. Default / Other Indian State Fallback
  const detectedTitle = locality || city || 'Local Constituency';
  return {
    ...DEFAULT_DETECTED_LOCATION,
    id: `auto-${Date.now()}`,
    locality: locality || city || DEFAULT_DETECTED_LOCATION.locality,
    city: city || DEFAULT_DETECTED_LOCATION.city,
    state: state || DEFAULT_DETECTED_LOCATION.state,
    pincode: pincode || DEFAULT_DETECTED_LOCATION.pincode,
    assembly: `${detectedTitle} Assembly`,
    exactAddress: exactAddress || DEFAULT_DETECTED_LOCATION.exactAddress,
    formattedAddress: exactAddress || DEFAULT_DETECTED_LOCATION.formattedAddress,
    gpsCoordinates: lat && lon ? `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E` : DEFAULT_DETECTED_LOCATION.gpsCoordinates,
    detectionMethod: method
  };
}

// Live GPS Reverse Geocoder (Uses Nominatim + BigDataCloud fallback)
export async function fetchLiveUserAddress(lat, lon) {
  try {
    // 1. Primary: OpenStreetMap Nominatim
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    const res = await fetch(nominatimUrl, {
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const road = addr.road || addr.pedestrian || addr.suburb || '';
      const locality = addr.suburb || addr.neighbourhood || addr.residential || addr.village || addr.city_district || addr.town || addr.hamlet || '';
      const city = addr.city || addr.town || addr.municipality || addr.county || addr.state_district || 'Mahabubnagar';
      const district = addr.county || addr.state_district || city;
      const state = addr.state || 'Telangana';
      const pincode = addr.postcode || '';
      const exactAddress = [road, locality, city, state, pincode].filter(Boolean).join(', ') || data.display_name;

      return resolveConstituencyAndParties({
        locality: locality || road || city,
        city,
        district,
        state,
        pincode,
        county: addr.county || '',
        exactAddress,
        lat,
        lon,
        method: 'Live Device GPS Coordinates 🛰️'
      });
    }
  } catch (err) {
    console.warn('Nominatim reverse geocode failed, trying fallback...', err);
  }

  try {
    // 2. Secondary fallback: BigDataCloud Reverse Geocoder (Free, no CORS, fast)
    const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const bdcRes = await fetch(bdcUrl);
    if (bdcRes.ok) {
      const bdcData = await bdcRes.json();
      const locality = bdcData.locality || bdcData.city || '';
      const city = bdcData.city || bdcData.locality || 'Mahabubnagar';
      const state = bdcData.principalSubdivision || 'Telangana';
      const pincode = bdcData.postcode || '';
      const exactAddress = `${locality}, ${city}, ${state}${pincode ? ' - ' + pincode : ''}`;

      return resolveConstituencyAndParties({
        locality,
        city,
        district: city,
        state,
        pincode,
        exactAddress,
        lat,
        lon,
        method: 'Live Device GPS Coordinates 🛰️'
      });
    }
  } catch (err2) {
    console.warn('BigDataCloud reverse geocode failed:', err2);
  }

  // Fallback with coordinates geofence check
  const isMahabubnagar = lat && lon && (lat >= 16.60 && lat <= 16.90 && lon >= 77.85 && lon <= 78.15);
  const fallbackLocation = isMahabubnagar 
    ? (CONSTITUENCY_DATABASE.find(item => item.id === 'telangana-mahabubnagar') || DEFAULT_DETECTED_LOCATION)
    : DEFAULT_DETECTED_LOCATION;

  return {
    ...fallbackLocation,
    gpsCoordinates: `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E`,
    detectionMethod: 'Auto-detected via GPS Coordinates 🛰️'
  };
}

// Search constituencies helper
export function searchConstituencies(query) {
  if (!query || !query.trim()) return CONSTITUENCY_DATABASE;
  const q = query.toLowerCase().trim();
  return CONSTITUENCY_DATABASE.filter(item => {
    return item.locality.toLowerCase().includes(q) ||
           item.city.toLowerCase().includes(q) ||
           item.assembly.toLowerCase().includes(q) ||
           item.pincode.includes(q) ||
           item.exactAddress.toLowerCase().includes(q);
  });
}
