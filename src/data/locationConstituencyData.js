// Data for Automatic Address Detection and Local Constituency Political Parties

export const DEFAULT_DETECTED_LOCATION = {
  id: 'hyderabad-jubilee',
  locality: 'Jubilee Hills',
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '500033',
  ward: 'Ward No. 98 (Khairatabad Division)',
  assembly: 'Jubilee Hills / Khairatabad Assembly',
  parliament: 'Secunderabad Lok Sabha',
  formattedAddress: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana - 500033',
  gpsCoordinates: '17.4325° N, 78.4071° E',
  detectionMethod: 'Auto-detected via GPS & Network 🛰️',
  parties: [
    {
      id: 'inc',
      name: 'Congress (INC)',
      teluguName: 'భారత జాతీయ కాంగ్రెస్',
      candidate: 'Danam Nagender / Azharuddin',
      role: 'Local MLA / Contestant',
      color: '#0284C7',
      badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      voteShare: 38.6,
      focus: 'ఉద్యోగాల కల్పన, ఉచిత బస్సు ప్రయాణం, సివిక్ రోడ్ల విస్తరణ',
      promises: ['New IT Skill Center in Jubilee Hills', 'Underground Drainage Modernization', '24/7 Citizen Health Clinic']
    },
    {
      id: 'brs',
      name: 'BRS',
      teluguName: 'భారత్ రాష్ట్ర సమితి',
      candidate: 'Maganti Gopinath',
      role: 'Sitting MLA / Candidate',
      color: '#E11D48',
      badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      voteShare: 36.2,
      focus: 'ఫ్లైఓవర్లు, మెట్రో ఫేజ్ 2, మిషన్ భగీరథ నీరు',
      promises: ['Madhapur-Jubilee Link Flyover', 'Durgam Cheruvu Lake Rejuvenation', 'Free drinking water taps']
    },
    {
      id: 'bjp',
      name: 'BJP',
      teluguName: 'భారతీయ జనతా పార్టీ',
      candidate: 'Lankala Deepak Reddy',
      role: 'Senior Leader / Constituency Incharge',
      color: '#FF6F00',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      voteShare: 18.4,
      focus: 'అవినీతి రహిత పాలన, డ్రైనేజ్ ఆధునీకరణ, కేంద్ర నిధులు',
      promises: ['Smart Ward Digital Surveillance', 'Property Tax Rationalization', 'Clean Drinking Water RO Plants']
    },
    {
      id: 'aimim',
      name: 'AIMIM / Others',
      teluguName: 'మజ్లిస్ / ఇతరులు',
      candidate: 'Local Corporator / Independent',
      role: 'Ward Representative',
      color: '#16A34A',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      voteShare: 6.8,
      focus: 'బస్తీ దవాఖానాలు, వీధి దీపాలు, స్థానిక సదుపాయాలు',
      promises: ['Community Hall renovation', 'Free Street light maintenance', 'Sanitation worker welfare']
    }
  ]
};

export const CONSTITUENCY_DATABASE = [
  DEFAULT_DETECTED_LOCATION,
  {
    id: 'hyderabad-serilingampally',
    locality: 'HITEC City & Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    ward: 'Ward No. 107 (Serilingampally)',
    assembly: 'Serilingampally Assembly',
    parliament: 'Chevella Lok Sabha',
    formattedAddress: 'Financial District, Gachibowli, Hyderabad, Telangana - 500081',
    gpsCoordinates: '17.4401° N, 78.3489° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: [
      {
        id: 'brs',
        name: 'BRS',
        teluguName: 'భారత్ రాష్ట్ర సమితి',
        candidate: 'Arekapudi Gandhi',
        role: 'Sitting MLA',
        color: '#E11D48',
        badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
        voteShare: 41.5,
        focus: 'మెట్రో ఎయిర్‌పోర్ట్ కారిడార్, అండర్‌పాస్‌లు',
        promises: ['Gachibowli-Airport Metro Station', 'Kondapur Traffic Relief Deck']
      },
      {
        id: 'inc',
        name: 'Congress (INC)',
        teluguName: 'భారత జాతీయ కాంగ్రెస్',
        candidate: 'Jagadeeshwar Goud',
        role: 'Key Contestant',
        color: '#0284C7',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 35.8,
        focus: 'ఐటీ ఉద్యోగుల సమస్యలు, స్థానిక స్కూల్స్ ఆధునీకరణ',
        promises: ['IT Employee Grievance Cell', 'Affordable Public Transport']
      },
      {
        id: 'bjp',
        name: 'BJP',
        teluguName: 'భారతీయ జనతా పార్టీ',
        candidate: 'Ravi Kumar Yadav',
        role: 'Constituency Leader',
        color: '#FF6F00',
        badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        voteShare: 18.2,
        focus: 'కేంద్ర నిధులతో స్మార్ట్ డిస్ట్రిక్ట్',
        promises: ['Central Cyber Security Center', 'Green Eco-corridor in Miyapur']
      },
      {
        id: 'others',
        name: 'Others',
        teluguName: 'ఇతర పార్టీలు',
        candidate: 'Independent Panel',
        role: 'Civic Group',
        color: '#64748B',
        badgeColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        voteShare: 4.5,
        focus: 'చెరువుల సంరక్షణ & పర్యావరణ పరిరక్షణ',
        promises: ['Lake protection committees']
      }
    ]
  },
  {
    id: 'vijayawada-central',
    locality: 'Governorpet & Benz Circle',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    pincode: '520002',
    ward: 'Ward 24 (VMC)',
    assembly: 'Vijayawada Central Assembly',
    parliament: 'Vijayawada Lok Sabha',
    formattedAddress: 'MG Road, Governorpet, Vijayawada, Andhra Pradesh - 520002',
    gpsCoordinates: '16.5062° N, 80.6480° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: [
      {
        id: 'tdp',
        name: 'TDP / NDA Alliance',
        teluguName: 'తెలుగుదేశం పార్టీ (కూటమి)',
        candidate: 'Bonda Umamaheswara Rao',
        role: 'Sitting MLA',
        color: '#EAB308',
        badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        voteShare: 46.2,
        focus: 'అమరావతి రాజధాని నిర్మాణం, సూపర్ 6 పథకాలు',
        promises: ['Amaravati Highway Corridor', 'Youth Unemployment Allowance', 'Free Sand Policy']
      },
      {
        id: 'ysrcp',
        name: 'YSRCP',
        teluguName: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ',
        candidate: 'Velampalli Srinivasa Rao',
        role: 'Former Minister / Candidate',
        color: '#16A34A',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        voteShare: 41.8,
        focus: 'నవరత్నాలు సంక్షేమం, వాలంటీర్ వ్యవస్థ',
        promises: ['Ammavodi Direct Transfer', 'Pension at Doorstep', 'Local Bazar Infrastructure']
      },
      {
        id: 'inc',
        name: 'Congress (INC)',
        teluguName: 'భారత జాతీయ కాంగ్రెస్',
        candidate: 'Sunkara Padmasree',
        role: 'AP PCC Leader',
        color: '#0284C7',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 7.5,
        focus: 'ప్రత్యేక హోదా & విశాఖ రైల్వే జోన్',
        promises: ['Special Category Status Fight', 'Farmer Loan Waiver']
      },
      {
        id: 'others',
        name: 'Others',
        teluguName: 'ఇతరులు',
        candidate: 'Independent Panel',
        role: 'Social Activist',
        color: '#64748B',
        badgeColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        voteShare: 4.5,
        focus: 'స్థానిక రోడ్లు, డ్రైనేజీ సమస్యలు',
        promises: ['Krishna Riverfront Cleanliness']
      }
    ]
  },
  {
    id: 'visakhapatnam-east',
    locality: 'MVP Colony & Beach Road',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    pincode: '530017',
    ward: 'Ward 18 (GVMC)',
    assembly: 'Visakhapatnam East Assembly',
    parliament: 'Visakhapatnam Lok Sabha',
    formattedAddress: 'Sector 4, MVP Colony, Visakhapatnam, Andhra Pradesh - 530017',
    gpsCoordinates: '17.7289° N, 83.3328° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: [
      {
        id: 'tdp',
        name: 'TDP / NDA Alliance',
        teluguName: 'తెలుగుదేశం పార్టీ (కూటమి)',
        candidate: 'Velagapudi Ramakrishna Babu',
        role: 'Sitting MLA',
        color: '#EAB308',
        badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        voteShare: 48.1,
        focus: 'విశాఖ ఉక్కు పరిరక్షణ, ఐటీ హబ్ అభివృద్ధి',
        promises: ['Vizag Steel Plant Protection', 'Bhogapuram Airport Fast Track', 'IT SEZ Expansion']
      },
      {
        id: 'ysrcp',
        name: 'YSRCP',
        teluguName: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ',
        candidate: 'MVV Satyanarayana',
        role: 'Former MP / Key Leader',
        color: '#16A34A',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        voteShare: 39.4,
        focus: 'ఎగ్జిక్యూటివ్ క్యాపిటల్, పేదల ఇళ్లు',
        promises: ['Beach Road Tourist Hub', 'Fishermen Subsidies', 'GVMC Civic Modernization']
      },
      {
        id: 'inc',
        name: 'Congress (INC)',
        teluguName: 'భారత జాతీయ కాంగ్రెస్',
        candidate: 'Gidugu Rudra Raju',
        role: 'Senior Leader',
        color: '#0284C7',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 8.2,
        focus: 'పబ్లిక్ సెక్టార్ రక్షణ & పోర్టు కార్మికుల హక్కులు',
        promises: ['Port Worker Minimum Wage', 'Public School Digital Classrooms']
      },
      {
        id: 'others',
        name: 'Others',
        teluguName: 'ఇతరులు',
        candidate: 'Independent Coalition',
        role: 'Citizen Forum',
        color: '#64748B',
        badgeColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        voteShare: 4.3,
        focus: 'పర్యావరణం, బీచ్ పారిశుద్ధ్యం',
        promises: ['Beach Cleanliness Marshals']
      }
    ]
  },
  {
    id: 'warangal-west',
    locality: 'Hanamkonda & Subedari',
    city: 'Warangal',
    state: 'Telangana',
    pincode: '506001',
    ward: 'Ward 32 (GWMC)',
    assembly: 'Warangal West Assembly',
    parliament: 'Warangal Lok Sabha',
    formattedAddress: 'Subedari, Hanamkonda, Warangal, Telangana - 506001',
    gpsCoordinates: '17.9689° N, 79.5941° E',
    detectionMethod: 'Auto-detected via GPS & Network 🛰️',
    parties: [
      {
        id: 'inc',
        name: 'Congress (INC)',
        teluguName: 'భారత జాతీయ కాంగ్రెస్',
        candidate: 'Naini Rajender Reddy',
        role: 'Sitting MLA',
        color: '#0284C7',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        voteShare: 44.1,
        focus: 'కాకతీయ మెగా టెక్స్‌టైల్ పార్క్, అండర్‌గ్రౌండ్ డ్రైనేజ్',
        promises: ['Textile Job Subsidies for Warangal Youth', 'Underground Stormwater Canal', 'MGM Hospital Super Specialty Wings']
      },
      {
        id: 'brs',
        name: 'BRS',
        teluguName: 'భారత్ రాష్ట్ర సమితి',
        candidate: 'Dasyam Vinay Bhaskar',
        role: 'Former Chief Whip / Candidate',
        color: '#E11D48',
        badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
        voteShare: 37.5,
        focus: 'హెరిటేజ్ సిటీ అభివృద్ధి, కాకతీయ అర్బన్ డెవలప్‌మెంట్',
        promises: ['Bhadrakali Lake Bund Beautification', 'Inner Ring Road Phase 2']
      },
      {
        id: 'bjp',
        name: 'BJP',
        teluguName: 'భారతీయ జనతా పార్టీ',
        candidate: 'Errabelli Pradeep Rao',
        role: 'Senior Leader',
        color: '#FF6F00',
        badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        voteShare: 14.2,
        focus: 'కేంద్ర స్మార్ట్ సిటీ నిధులు, పారదర్శక పాలన',
        promises: ['Direct Transfer of Smart City grants', 'Mamnoor Airport revival']
      },
      {
        id: 'others',
        name: 'Others',
        teluguName: 'ఇతరులు',
        candidate: 'Independent Panel',
        role: 'Citizen Voice',
        color: '#64748B',
        badgeColor: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        voteShare: 4.2,
        focus: 'స్థానిక తాగునీరు, డ్రైనేజ్ సమస్యలు',
        promises: ['Ward level grievance resolution']
      }
    ]
  }
];
