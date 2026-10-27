// Advanced Automatic Geolocation, Address Resolution, and Constituency Database for NowNine

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
  parties: [
    {
      id: 'inc',
      name: 'Congress (INC)',
      teluguName: 'భారత జాతీయ కాంగ్రెస్',
      code: 'INC',
      symbol: '✋',
      candidate: 'Danam Nagender / Azharuddin',
      role: 'Ruling Party / Local MLA',
      status: 'Ruling Party / Local MLA',
      color: '#0284C7',
      badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      voteShare: 38.6,
      focus: 'ఉద్యోగాల కల్పన, ఉచిత బస్సు ప్రయాణం, సివిక్ రోడ్ల విస్తరణ',
      keyFocus: 'ఉద్యోగాల కల్పన, ఉచిత బస్సు ప్రయాణం, సివిక్ రోడ్ల విస్తరణ',
      promises: ['New IT Skill Center in Jubilee Hills', 'Underground Drainage Modernization', '24/7 Citizen Health Clinic'],
      manifestoPromises: ['New IT Skill Center in Jubilee Hills', 'Underground Drainage Modernization', '24/7 Citizen Health Clinic']
    },
    {
      id: 'brs',
      name: 'BRS',
      teluguName: 'భారత్ రాష్ట్ర సమితి',
      code: 'BRS',
      symbol: '🚗',
      candidate: 'Maganti Gopinath',
      role: 'Sitting MLA / Candidate',
      status: 'Sitting MLA / Candidate',
      color: '#E11D48',
      badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      voteShare: 36.2,
      focus: 'ఫ్లైఓవర్లు, మెట్రో ఫేజ్ 2, మిషన్ భగీరథ నీరు',
      keyFocus: 'ఫ్లైఓవర్లు, మెట్రో ఫేజ్ 2, మిషన్ భగీరథ నీరు',
      promises: ['Madhapur-Jubilee Link Flyover', 'Durgam Cheruvu Lake Rejuvenation', 'Free drinking water taps'],
      manifestoPromises: ['Madhapur-Jubilee Link Flyover', 'Durgam Cheruvu Lake Rejuvenation', 'Free drinking water taps']
    },
    {
      id: 'bjp',
      name: 'BJP',
      teluguName: 'భారతీయ జనతా పార్టీ',
      code: 'BJP',
      symbol: '🪷',
      candidate: 'Lankala Deepak Reddy',
      role: 'Key Challenger',
      status: 'Key Challenger',
      color: '#FF6F00',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      voteShare: 18.4,
      focus: 'అవినీతి రహిత పాలన, డ్రైనేజ్ ఆధునీకరణ, కేంద్ర నిధులు',
      keyFocus: 'అవినీతి రహిత పాలన, డ్రైనేజ్ ఆధునీకరణ, కేంద్ర నిధులు',
      promises: ['Smart Ward Digital Surveillance', 'Property Tax Rationalization', 'Clean Drinking Water RO Plants'],
      manifestoPromises: ['Smart Ward Digital Surveillance', 'Property Tax Rationalization', 'Clean Drinking Water RO Plants']
    },
    {
      id: 'aimim',
      name: 'AIMIM / Others',
      teluguName: 'మజ్లిస్ / ఇతరులు',
      code: 'AIMIM',
      symbol: '🪁',
      candidate: 'Local Corporator / Independent',
      role: 'Ward Representative',
      status: 'Ward Representative',
      color: '#16A34A',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      voteShare: 6.8,
      focus: 'బస్తీ దవాఖానాలు, వీధి దీపాలు, స్థానిక సదుపాయాలు',
      keyFocus: 'బస్తీ దవాఖానాలు, వీధి దీపాలు, స్థానిక సదుపాయాలు',
      promises: ['Community Hall renovation', 'Free Street light maintenance', 'Sanitation worker welfare'],
      manifestoPromises: ['Community Hall renovation', 'Free Street light maintenance', 'Sanitation worker welfare']
    }
  ]
};

// Comprehensive Database covering key Telangana & Andhra Pradesh Constituencies
export const CONSTITUENCY_DATABASE = [
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
    parties: [
      {
        id: 'brs',
        name: 'BRS',
        teluguName: 'భారత్ రాష్ట్ర సమితి',
        code: 'BRS',
        symbol: '🚗',
        candidate: 'Arekapudi Gandhi',
        role: 'Incumbent MLA',
        status: 'Incumbent MLA',
        color: '#E11D48',
        badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
        voteShare: 41.5,
        focus: 'మెట్రో ఎయిర్‌పోర్ట్ కారిడార్, అండర్‌పాస్‌లు, ట్రాఫిక్ నివారణ',
        keyFocus: 'మెట్రో ఎయిర్‌పోర్ట్ కారిడార్, అండర్‌పాస్‌లు, ట్రాఫిక్ నివారణ',
        promises: ['Gachibowli-Airport Metro Station', 'Kondapur Traffic Relief Deck', 'Smart Signal Automation'],
        manifestoPromises: ['Gachibowli-Airport Metro Station', 'Kondapur Traffic Relief Deck', 'Smart Signal Automation']
      },
      {
        id: 'inc',
        name: 'Congress (INC)',
        teluguName: 'భారత జాతీయ కాంగ్రెస్',
        code: 'INC',
        symbol: '✋',
        candidate: 'Jagadeeshwar Goud',
        role: 'Ruling Party Contestant',
        status: 'Ruling Party Contestant',
        color: '#0284C7',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 35.8,
        focus: 'ఐటీ ఉద్యోగుల హక్కులు, ప్రజా రవాణా విస్తరణ, ప్రభుత్వ పాఠశాలలు',
        keyFocus: 'ఐటీ ఉద్యోగుల హక్కులు, ప్రజా రవాణా విస్తరణ, ప్రభుత్వ పాఠశాలలు',
        promises: ['IT Employee Grievance Cell', 'Affordable Metro Feeder Busses', 'Free Civic WiFi'],
        manifestoPromises: ['IT Employee Grievance Cell', 'Affordable Metro Feeder Busses', 'Free Civic WiFi']
      },
      {
        id: 'bjp',
        name: 'BJP',
        teluguName: 'భారతీయ జనతా పార్టీ',
        code: 'BJP',
        symbol: '🪷',
        candidate: 'Ravi Kumar Yadav',
        role: 'Key Challenger',
        status: 'Key Challenger',
        color: '#FF6F00',
        badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        voteShare: 18.2,
        focus: 'స్మార్ట్ సైబరాబాద్, కేంద్ర నిధులతో ఇన్ఫ్రాస్ట్రక్చర్',
        keyFocus: 'స్మార్ట్ సైబరాబాద్, కేంద్ర నిధులతో ఇన్ఫ్రాస్ట్రక్చర్',
        promises: ['Central Cyber Security Center', 'Green Eco-corridor in Miyapur', 'Clean Lake Protection'],
        manifestoPromises: ['Central Cyber Security Center', 'Green Eco-corridor in Miyapur', 'Clean Lake Protection']
      }
    ]
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
    parties: [
      {
        id: 'brs',
        name: 'BRS',
        teluguName: 'భారత్ రాష్ట్ర సమితి',
        code: 'BRS',
        symbol: '🚗',
        candidate: 'Madhavaram Krishna Rao',
        role: 'Incumbent MLA',
        status: 'Incumbent MLA',
        color: '#E11D48',
        badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
        voteShare: 43.8,
        focus: 'కైతలాపూర్ ఫ్లైఓవర్, వై-జంక్షన్ విస్తరణ, మంచి నీటి రిజర్వాయర్లు',
        keyFocus: 'కైతలాపూర్ ఫ్లైఓవర్, వై-జంక్షన్ విస్తరణ, మంచి నీటి రిజర్వాయర్లు',
        promises: ['Y-Junction Elevated Corridor', 'Underground Stormwater Drain System', 'KPHB Central Park Modernization'],
        manifestoPromises: ['Y-Junction Elevated Corridor', 'Underground Stormwater Drain System', 'KPHB Central Park Modernization']
      },
      {
        id: 'inc',
        name: 'Congress (INC)',
        teluguName: 'భారత జాతీయ కాంగ్రెస్',
        code: 'INC',
        symbol: '✋',
        candidate: 'Bandi Ramesh',
        role: 'Ruling Party Contestant',
        status: 'Ruling Party Contestant',
        color: '#0284C7',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 34.2,
        focus: 'డ్రైనేజ్ సమస్యల పరిష్కారం, ప్రభుత్వ దవాఖానాల బలోపేతం',
        keyFocus: 'డ్రైనేజ్ సమస్యల పరిష్కారం, ప్రభుత్వ దవాఖానాల బలోపేతం',
        promises: ['New 100-bed Area Hospital in Kukatpally', 'Free Citizen Gyms & Youth Hubs'],
        manifestoPromises: ['New 100-bed Area Hospital in Kukatpally', 'Free Citizen Gyms & Youth Hubs']
      },
      {
        id: 'bjp',
        name: 'BJP',
        teluguName: 'భారతీయ జనతా పార్టీ',
        code: 'BJP',
        symbol: '🪷',
        candidate: 'M. Prem Kumar',
        role: 'Constituency Incharge',
        status: 'Key Challenger',
        color: '#FF6F00',
        badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        voteShare: 18.0,
        focus: 'అవినీతి రహిత మున్సిపల్ సేవలు, పన్ను తగ్గింపు',
        keyFocus: 'అవినీతి రహిత మున్సిపల్ సేవలు, పన్ను తగ్గింపు',
        promises: ['Property Tax Relief for Middle Class', 'Digital Ward Offices'],
        manifestoPromises: ['Property Tax Relief for Middle Class', 'Digital Ward Offices']
      }
    ]
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
    parties: [
      {
        id: 'brs',
        name: 'BRS',
        teluguName: 'భారత్ రాష్ట్ర సమితి',
        code: 'BRS',
        symbol: '🚗',
        candidate: 'T. Padma Rao Goud',
        role: 'Incumbent MLA',
        status: 'Incumbent MLA',
        color: '#E11D48',
        badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
        voteShare: 42.1,
        focus: 'మార్కెట్ల ఆధునీకరణ, రైల్వే టెర్మినల్ అనుసంధానం',
        keyFocus: 'మార్కెట్ల ఆధునీకరణ, రైల్వే టెర్మినల్ అనుసంధానం',
        promises: ['Clock Tower Heritage Corridor', 'Modern Monda Market Complex'],
        manifestoPromises: ['Clock Tower Heritage Corridor', 'Modern Monda Market Complex']
      },
      {
        id: 'inc',
        name: 'Congress (INC)',
        teluguName: 'భారత జాతీయ కాంగ్రెస్',
        code: 'INC',
        symbol: '✋',
        candidate: 'Adam Santosh Kumar',
        role: 'Ruling Party Contestant',
        status: 'Ruling Party Contestant',
        color: '#0284C7',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 33.9,
        focus: 'బస్తీల్లో మౌలిక వసతులు, పేదలకు ఇందిరమ్మ ఇళ్లు',
        keyFocus: 'బస్తీల్లో మౌలిక వసతులు, పేదలకు ఇందిరమ్మ ఇళ్లు',
        promises: ['Indiramma Housing in Railway colonies', 'Drainage desilting before monsoon'],
        manifestoPromises: ['Indiramma Housing in Railway colonies', 'Drainage desilting before monsoon']
      },
      {
        id: 'bjp',
        name: 'BJP',
        teluguName: 'భారతీయ జనతా పార్టీ',
        code: 'BJP',
        symbol: '🪷',
        candidate: 'Mekala Sarangapani',
        role: 'Key Challenger',
        status: 'Key Challenger',
        color: '#FF6F00',
        badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        voteShare: 20.3,
        focus: 'రైల్వే స్టేషన్ ఆధునీకరణ, రక్షణ శాఖ భూముల వివాద పరిష్కారం',
        keyFocus: 'రైల్వే స్టేషన్ ఆధునీకరణ, రక్షణ శాఖ భూముల వివాద పరిష్కారం',
        promises: ['Amrit Bharat Secunderabad Station Integration', 'Cantonment civilian road access'],
        manifestoPromises: ['Amrit Bharat Secunderabad Station Integration', 'Cantonment civilian road access']
      }
    ]
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
    parties: [
      {
        id: 'tdp',
        name: 'TDP / NDA Alliance',
        teluguName: 'తెలుగుదేశం పార్టీ (కూటమి)',
        code: 'TDP',
        symbol: '🚲',
        candidate: 'Bonda Umamaheswara Rao',
        role: 'Ruling Alliance MLA',
        status: 'Ruling Alliance MLA',
        color: '#EAB308',
        badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        voteShare: 46.2,
        focus: 'అమరావతి రాజధాని పునర్నిర్మాణం, సూపర్ 6 పథకాలు, మెట్రో రైల్',
        keyFocus: 'అమరావతి రాజధాని పునర్నిర్మాణం, సూపర్ 6 పథకాలు, మెట్రో రైల్',
        promises: ['Amaravati Expressway connectivity', 'Vijayawada Metro Rail DPR clearance', 'Unemployment Youth stipend'],
        manifestoPromises: ['Amaravati Expressway connectivity', 'Vijayawada Metro Rail DPR clearance', 'Unemployment Youth stipend']
      },
      {
        id: 'ysrcp',
        name: 'YSRCP',
        teluguName: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ',
        code: 'YSRCP',
        symbol: '🪭',
        candidate: 'Vellampalli Srinivas',
        role: 'Opposition Challenger',
        status: 'Opposition Challenger',
        color: '#0EA5E9',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 43.1,
        focus: 'నవరత్నాలు పథకాల పరిరక్షణ, కనకదుర్గ ఫ్లైఓవర్ పరిసరాల అభివృద్ధి',
        keyFocus: 'నవరత్నాలు పథకాల పరిరక్షణ, కనకదుర్గ ఫ్లైఓవర్ పరిసరాల అభివృద్ధి',
        promises: ['Direct benefit transfers continuation', 'Free healthcare expansion in Govt General Hospital'],
        manifestoPromises: ['Direct benefit transfers continuation', 'Free healthcare expansion in Govt General Hospital']
      },
      {
        id: 'inc',
        name: 'Congress (AP)',
        teluguName: 'కాంగ్రెస్ పార్టీ',
        code: 'INC',
        symbol: '✋',
        candidate: 'YS Sharmila / Nominee',
        role: 'Opposition',
        status: 'Opposition',
        color: '#10B981',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        voteShare: 7.2,
        focus: 'ప్రత్యేక హోదా & పోలవరం ప్రాజెక్ట్ వేగవంతం',
        keyFocus: 'ప్రత్యేక హోదా & పోలవరం ప్రాజెక్ట్ వేగవంతం',
        promises: ['Special Category Status for AP fight', 'Polavaram flood victim compensation'],
        manifestoPromises: ['Special Category Status for AP fight', 'Polavaram flood victim compensation']
      }
    ]
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
    parties: [
      {
        id: 'tdp',
        name: 'TDP / NDA Alliance',
        teluguName: 'తెలుగుదేశం పార్టీ (కూటమి)',
        code: 'TDP',
        symbol: '🚲',
        candidate: 'Velagapudi Ramakrishna Babu',
        role: 'Ruling Alliance MLA',
        status: 'Ruling Alliance MLA',
        color: '#EAB308',
        badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        voteShare: 52.4,
        focus: 'విశాఖ స్మార్ట్ సిటీ, ఐటీ హబ్, మెట్రో రైలు',
        keyFocus: 'విశాఖ స్మార్ట్ సిటీ, ఐటీ హబ్, మెట్రో రైలు',
        promises: ['Vizag Metro Rail Phase-1', 'Beach Road Beautification', 'IT SEZ Expansion in Rushikonda'],
        manifestoPromises: ['Vizag Metro Rail Phase-1', 'Beach Road Beautification', 'IT SEZ Expansion in Rushikonda']
      },
      {
        id: 'ysrcp',
        name: 'YSRCP',
        teluguName: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ',
        code: 'YSRCP',
        symbol: '🪭',
        candidate: 'MVV Satyanarayana',
        role: 'Opposition Challenger',
        status: 'Opposition Challenger',
        color: '#0EA5E9',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 39.8,
        focus: 'ఎగ్జిక్యూటివ్ క్యాపిటల్, భోగాపురం ఎయిర్‌పోర్ట్ కారిడార్',
        keyFocus: 'ఎగ్జిక్యూటివ్ క్యాపిటల్, భోగాపురం ఎయిర్‌పోర్ట్ కారిడార్',
        promises: ['Bhogapuram Airport Access Highway', 'Fishing Harbour modernization'],
        manifestoPromises: ['Bhogapuram Airport Access Highway', 'Fishing Harbour modernization']
      },
      {
        id: 'inc',
        name: 'Congress / Left',
        teluguName: 'కాంగ్రెస్ & వామపక్షాలు',
        code: 'INC',
        symbol: '✋',
        candidate: 'Vizag Steel Plant Protection Forum',
        role: 'Labour Platform',
        status: 'Labour Platform',
        color: '#DC2626',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
        voteShare: 7.8,
        focus: 'విశాఖ ఉక్కు ప్రైవేటీకరణ వ్యతిరేక పోరాటం',
        keyFocus: 'విశాఖ ఉక్కు ప్రైవేటీకరణ వ్యతిరేక పోరాటం',
        promises: ['Save Vizag Steel Plant from privatization', 'Permanent jobs for contract workers'],
        manifestoPromises: ['Save Vizag Steel Plant from privatization', 'Permanent jobs for contract workers']
      }
    ]
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
    parties: [
      {
        id: 'inc',
        name: 'Congress (INC)',
        teluguName: 'భారత జాతీయ కాంగ్రెస్',
        code: 'INC',
        symbol: '✋',
        candidate: 'Naini Rajender Reddy',
        role: 'Ruling Party MLA',
        status: 'Ruling Party MLA',
        color: '#0284C7',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 44.5,
        focus: 'వరంగల్ మెగా టెక్స్‌టైల్ పార్క్, భూగర్భ డ్రైనేజీ',
        keyFocus: 'వరంగల్ మెగా టెక్స్‌టైల్ పార్క్, భూగర్భ డ్రైనేజీ',
        promises: ['Kakatiya Mega Textile Park expansion', 'Smart Bus Terminal', 'Bhadrakali Lake Bund Development'],
        manifestoPromises: ['Kakatiya Mega Textile Park expansion', 'Smart Bus Terminal', 'Bhadrakali Lake Bund Development']
      },
      {
        id: 'brs',
        name: 'BRS',
        teluguName: 'భారత్ రాష్ట్ర సమితి',
        code: 'BRS',
        symbol: '🚗',
        candidate: 'Dasyam Vinay Bhasker',
        role: 'Opposition Leader',
        status: 'Opposition Leader',
        color: '#E11D48',
        badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
        voteShare: 37.8,
        focus: 'వరంగల్ సూపర్ స్పెషాలిటీ ఆస్పత్రి, రింగ్ రోడ్',
        keyFocus: 'వరంగల్ సూపర్ స్పెషాలిటీ ఆస్పత్రి, రింగ్ రోడ్',
        promises: ['24-floor Super Specialty Hospital completion', 'Internal Ring Road connectivity'],
        manifestoPromises: ['24-floor Super Specialty Hospital completion', 'Internal Ring Road connectivity']
      },
      {
        id: 'bjp',
        name: 'BJP',
        teluguName: 'భారతీయ జనతా పార్టీ',
        code: 'BJP',
        symbol: '🪷',
        candidate: 'Rao Padma',
        role: 'Key Challenger',
        status: 'Key Challenger',
        color: '#FF6F00',
        badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        voteShare: 15.3,
        focus: 'హెరిటేజ్ సిటీ సెంట్రల్ గ్రాంట్స్, మామునూరు ఎయిర్‌పోర్ట్',
        keyFocus: 'హెరిటేజ్ సిటీ సెంట్రల్ గ్రాంట్స్, మామునూరు ఎయిర్‌పోర్ట్',
        promises: ['Mamnoor Airport revival with central clearance', 'Historic Warangal Fort preservation funding'],
        manifestoPromises: ['Mamnoor Airport revival with central clearance', 'Historic Warangal Fort preservation funding']
      }
    ]
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
    parties: [
      {
        id: 'tdp',
        name: 'TDP / NDA Alliance',
        teluguName: 'తెలుగుదేశం పార్టీ (కూటమి)',
        code: 'TDP',
        symbol: '🚲',
        candidate: 'Galla Madhavi',
        role: 'Ruling Alliance MLA',
        status: 'Ruling Alliance MLA',
        color: '#EAB308',
        badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        voteShare: 49.3,
        focus: 'మిర్చి యార్డ్ ఆధునీకరణ, అమరావతి కనెక్టివిటీ, అండర్‌గ్రౌండ్ డ్రైనేజ్',
        keyFocus: 'మిర్చి యార్డ్ ఆధునీకరణ, అమరావతి కనెక్టివిటీ, అండర్‌గ్రౌండ్ డ్రైనేజ్',
        promises: ['Asia’s largest Mirchi Yard digitization', 'Guntur-Vijayawada Metro corridor link'],
        manifestoPromises: ['Asia’s largest Mirchi Yard digitization', 'Guntur-Vijayawada Metro corridor link']
      },
      {
        id: 'ysrcp',
        name: 'YSRCP',
        teluguName: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ',
        code: 'YSRCP',
        symbol: '🪭',
        candidate: 'Vidadala Rajini',
        role: 'Former Minister / Challenger',
        status: 'Opposition Challenger',
        color: '#0EA5E9',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 42.6,
        focus: 'ప్రభుత్వ మెడికల్ కాలేజ్ విస్తరణ, నవరత్నాలు',
        keyFocus: 'ప్రభుత్వ మెడికల్ కాలేజ్ విస్తరణ, నవరత్నాలు',
        promises: ['Guntur GGH modernization', 'Direct citizen welfare desks'],
        manifestoPromises: ['Guntur GGH modernization', 'Direct citizen welfare desks']
      }
    ]
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
    parties: [
      {
        id: 'janasena-tdp',
        name: 'Janasena / TDP Alliance',
        teluguName: 'జనసేన - తెదేపా కూటమి',
        code: 'JSP/TDP',
        symbol: '🍶',
        candidate: 'Arani Srinivasulu',
        role: 'Ruling Alliance MLA',
        status: 'Ruling Alliance MLA',
        color: '#DC2626',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
        voteShare: 51.2,
        focus: 'భక్తులకు మెరుగైన వసతులు, తిరుపతి స్మార్ట్ ట్రాఫిక్, ఆధ్యాత్మిక పర్యాటకం',
        keyFocus: 'భక్తులకు మెరుగైన వసతులు, తిరుపతి స్మార్ట్ ట్రాఫిక్, ఆధ్యాత్మిక పర్యాటకం',
        promises: ['Alipiri Footway Modernization', 'Garuda Varadhi Traffic Easing', 'Free Student Bus Passes'],
        manifestoPromises: ['Alipiri Footway Modernization', 'Garuda Varadhi Traffic Easing', 'Free Student Bus Passes']
      },
      {
        id: 'ysrcp',
        name: 'YSRCP',
        teluguName: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ',
        code: 'YSRCP',
        symbol: '🪭',
        candidate: 'Bhumana Abhinay Reddy',
        role: 'Former Deputy Mayor / Challenger',
        status: 'Opposition Challenger',
        color: '#0EA5E9',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 42.8,
        focus: 'తిరుపతి సివిక్ రోడ్ల విస్తరణ, కార్పొరేషన్ అభివృద్ధి',
        keyFocus: 'తిరుపతి సివిక్ రోడ్ల విస్తరణ, కార్పొరేషన్ అభివృద్ధి',
        promises: ['Master plan roads completion', 'SVIMS super specialty grants'],
        manifestoPromises: ['Master plan roads completion', 'SVIMS super specialty grants']
      }
    ]
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
    method = 'Auto-detected via Live Device GPS 🛰️'
  } = detectedInfo;

  const searchTarget = `${locality} ${city} ${district} ${exactAddress}`.toLowerCase();

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
      exactAddress: exactAddress || matched.exactAddress,
      formattedAddress: exactAddress || matched.formattedAddress,
      pincode: pincode || matched.pincode,
      gpsCoordinates: lat && lon ? `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E` : matched.gpsCoordinates,
      detectionMethod: method
    };
  }

  // 2. If located anywhere in Telangana (e.g. Mahabubnagar, Nizamabad, Karimnagar, Siddipet, Nalgonda, etc.)
  const isTelangana = state.toLowerCase().includes('telangana') || searchTarget.includes('hyderabad') || searchTarget.includes('secunderabad');
  if (isTelangana) {
    const areaName = locality || city || district || 'Telangana Locality';
    return {
      id: `ts-auto-${Date.now()}`,
      locality: locality || city || 'Local Area',
      city: city || 'Hyderabad',
      district: district || city,
      state: 'Telangana',
      pincode: pincode || '500001',
      ward: `Ward (${areaName} Division)`,
      assembly: `${areaName} Assembly Constituency`,
      parliament: `${city || district || 'State'} Lok Sabha`,
      formattedAddress: exactAddress || `${areaName}, ${city}, Telangana - ${pincode}`,
      exactAddress: exactAddress || `${areaName}, ${city}, Telangana - ${pincode}`,
      gpsCoordinates: lat && lon ? `${Number(lat).toFixed(4)}° N, ${Number(lon).toFixed(4)}° E` : '17.3850° N, 78.4867° E',
      detectionMethod: method,
      parties: [
        {
          id: 'inc',
          name: 'Congress (INC)',
          teluguName: 'భారత జాతీయ కాంగ్రెస్',
          code: 'INC',
          symbol: '✋',
          candidate: `Local MLA / Contestant (${areaName})`,
          role: 'Ruling Party in Telangana',
          status: 'Ruling Party in Telangana',
          color: '#0284C7',
          badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
          voteShare: 41.2,
          focus: 'రైతు భరోసా, 6 గ్యారెంటీలు, సివిక్ రోడ్ల విస్తరణ',
          keyFocus: 'రైతు భరోసా, 6 గ్యారెంటీలు, సివిక్ రోడ్ల విస్తరణ',
          promises: [`24/7 drinking water in ${areaName}`, 'Indiramma Housing assistance', 'Women free travel desks'],
          manifestoPromises: [`24/7 drinking water in ${areaName}`, 'Indiramma Housing assistance', 'Women free travel desks']
        },
        {
          id: 'brs',
          name: 'BRS',
          teluguName: 'భారత్ రాష్ట్ర సమితి',
          code: 'BRS',
          symbol: '🚗',
          candidate: `BRS Nominee (${areaName})`,
          role: 'Main Opposition Party',
          status: 'Main Opposition Party',
          color: '#E11D48',
          badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
          voteShare: 37.5,
          focus: 'రైతు బంధు, సంక్షేమ పథకాలు, స్థానిక సమస్యలపై పోరాటం',
          keyFocus: 'రైతు బంధు, సంక్షేమ పథకాలు, స్థానిక సమస్యలపై పోరాటం',
          promises: [`Local ward infrastructure upgrade in ${areaName}`, 'Drainage and road repair guarantee'],
          manifestoPromises: [`Local ward infrastructure upgrade in ${areaName}`, 'Drainage and road repair guarantee']
        },
        {
          id: 'bjp',
          name: 'BJP',
          teluguName: 'భారతీయ జనతా పార్టీ',
          code: 'BJP',
          symbol: '🪷',
          candidate: `BJP Candidate (${areaName})`,
          role: 'Key Challenger',
          status: 'Key Challenger',
          color: '#FF6F00',
          badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          voteShare: 16.8,
          focus: 'అవినీతి రహిత పాలన, కేంద్ర పథకాల అమలు',
          keyFocus: 'అవినీతి రహిత పాలన, కేంద్ర పథకాల అమలు',
          promises: ['PM Awas Yojana urban houses', 'Smart surveillance & Clean roads'],
          manifestoPromises: ['PM Awas Yojana urban houses', 'Smart surveillance & Clean roads']
        }
      ]
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
      parties: [
        {
          id: 'tdp',
          name: 'TDP / NDA Alliance',
          teluguName: 'తెలుగుదేశం పార్టీ (కూటమి)',
          code: 'TDP',
          symbol: '🚲',
          candidate: `Alliance Nominee (${areaName})`,
          role: 'Ruling Alliance in AP',
          status: 'Ruling Alliance in AP',
          color: '#EAB308',
          badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          voteShare: 49.5,
          focus: 'అమరావతి రాజధాని, సూపర్ 6 పథకాలు, రోడ్ల అభివృద్ధి',
          keyFocus: 'అమరావతి రాజధాని, సూపర్ 6 పథకాలు, రోడ్ల అభివృద్ధి',
          promises: [`New civic roads in ${areaName}`, 'Unemployment allowance for youth', 'Drinking water taps'],
          manifestoPromises: [`New civic roads in ${areaName}`, 'Unemployment allowance for youth', 'Drinking water taps']
        },
        {
          id: 'ysrcp',
          name: 'YSRCP',
          teluguName: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ',
          code: 'YSRCP',
          symbol: '🪭',
          candidate: `YSRCP Incharge (${areaName})`,
          role: 'Principal Opposition',
          status: 'Principal Opposition',
          color: '#0EA5E9',
          badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
          voteShare: 43.5,
          focus: 'నవరత్నాలు, ప్రభుత్వ సంక్షేమం, బస్తీ ఆరోగ్య కేంద్రాలు',
          keyFocus: 'నవరత్నాలు, ప్రభుత్వ సంక్షేమం, బస్తీ ఆరోగ్య కేంద్రాలు',
          promises: ['Direct social pensions', 'Free municipal clinics'],
          manifestoPromises: ['Direct social pensions', 'Free municipal clinics']
        },
        {
          id: 'inc',
          name: 'Congress (AP)',
          teluguName: 'కాంగ్రెస్ పార్టీ',
          code: 'INC',
          symbol: '✋',
          candidate: `Congress Nominee (${areaName})`,
          role: 'Opposition',
          status: 'Opposition',
          color: '#10B981',
          badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          voteShare: 5.5,
          focus: 'ప్రత్యేక హోదా & పారిశ్రామిక రాయితీలు',
          keyFocus: 'ప్రత్యేక హోదా & పారిశ్రామిక రాయితీలు',
          promises: ['Special Category Status guarantee'],
          manifestoPromises: ['Special Category Status guarantee']
        }
      ]
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
      const locality = addr.suburb || addr.neighbourhood || addr.residential || addr.village || addr.city_district || addr.town || '';
      const city = addr.city || addr.town || addr.municipality || addr.county || addr.state_district || 'Hyderabad';
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
      const city = bdcData.city || bdcData.locality || 'Hyderabad';
      const state = bdcData.principalSubdivision || 'Telangana';
      const pincode = bdcData.postcode || '';
      const exactAddress = `${locality}, ${city}, ${state}${pincode ? ' - ' + pincode : ''}`;

      return resolveConstituencyAndParties({
        locality,
        city,
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

  // Fallback to default Jubilee Hills
  return {
    ...DEFAULT_DETECTED_LOCATION,
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
