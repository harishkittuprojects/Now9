export const PARTIES = [
  {
    id: 'bjp',
    name: 'BJP',
    teluguName: 'భారతీయ జనతా పార్టీ',
    color: '#FF6F00',
    barColor: '#F97316',
    bgColor: '#EA580C',
    symbolType: 'lotus',
    resultPercent: 34.2
  },
  {
    id: 'congress',
    name: 'Congress',
    teluguName: 'ఇండియన్ నేషనల్ కాంగ్రెస్',
    color: '#0284C7',
    barColor: '#0EA5E9',
    bgColor: '#0284C7',
    symbolType: 'hand',
    resultPercent: 28.7
  },
  {
    id: 'brs',
    name: 'BRS',
    teluguName: 'భారత్ రాష్ట్ర సమితి',
    color: '#E11D48',
    barColor: '#EC4899',
    bgColor: '#E11475',
    symbolType: 'car',
    resultPercent: 16.8
  },
  {
    id: 'ysrcp',
    name: 'YSRCP',
    teluguName: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ',
    color: '#16A34A',
    barColor: '#22C55E',
    bgColor: '#16A34A',
    symbolType: 'fan',
    resultPercent: 8.9
  },
  {
    id: 'cpm',
    name: 'CPM',
    teluguName: 'భారత కమ్యూనిస్ట్ పార్టీ (మార్క్సిస్టు)',
    color: '#DC2626',
    barColor: '#EF4444',
    bgColor: '#DC2626',
    symbolType: 'hammer',
    resultPercent: 5.4
  },
  {
    id: 'others',
    name: 'Others',
    teluguName: 'ఇతర పార్టీలు',
    color: '#64748B',
    barColor: '#94A3B8',
    bgColor: '#475569',
    symbolType: 'others',
    resultPercent: 5.0
  }
];

export const SURVEY_QUESTIONS = [
  {
    step: 1,
    id: 'q1',
    headerLabel: '1 of 5',
    question: 'మీరు ఈ పార్టీకి ఓటు వేయడానికి ప్రధాన కారణం ఏమిటి?',
    options: [
      'నాయకత్వంపై నమ్మకం',
      'అభివృద్ధి పనులు',
      'సంక్షేమ పథకాలు',
      'పార్టీ సిద్ధాంతాలు',
      'ఇతర కారణాలు'
    ],
    defaultSelected: 0
  },
  {
    step: 2,
    id: 'q2',
    headerLabel: '2 of 5',
    question: 'ఈ పార్టీలో మీకు అత్యంత నచ్చిన అంశం ఏది?',
    options: [
      'పార్టీ నాయకుడు',
      'గత పాలన / పనితీరు',
      'ప్రజలకు ఇచ్చిన హామీలు',
      'పార్టీ మేనిఫెస్టో',
      'స్థానిక అభ్యర్థి'
    ],
    defaultSelected: 0
  },
  {
    step: 3,
    id: 'q3',
    headerLabel: '3 of 5',
    question: 'ఈ పార్టీ అధికారంలోకి వస్తే ఏ విషయంలో మార్పు వస్తుందని ఆశిస్తున్నారు?',
    options: [
      'ఉద్యోగాలు, ఉపాధి',
      'ధరల నియంత్రణ',
      'విద్య, వైద్యం',
      'రైతుల సంక్షేమం',
      'అభివృద్ధి, మౌలిక సదుపాయాలు'
    ],
    defaultSelected: 0
  },
  {
    step: 4,
    id: 'q4',
    headerLabel: '4 of 5',
    question: 'ఈ పార్టీపై మీకు నమ్మకం కలగడానికి ప్రధాన ఆధారం ఏమిటి?',
    options: [
      'గతంలో చేసిన పనులు',
      'నాయకుల ప్రసంగాలు',
      'పార్టీ హామీలు',
      'ప్రజల నుండి వచ్చిన అభిప్రాయాలు',
      'నా స్వంత పరిశీలన'
    ],
    defaultSelected: 0
  },
  {
    step: 5,
    id: 'q5',
    headerLabel: '5 of 5',
    question: 'మీ ఓటు నిర్ణయాన్ని ఎక్కువగా ప్రభావితం చేసిన అంశం ఏది?',
    options: [
      'రాష్ట్ర / దేశ స్థాయి నాయకత్వం',
      'స్థానిక అభ్యర్థి',
      'నా ప్రాంత సమస్యలు',
      'కుటుంబం / స్నేహితుల అభిప్రాయాలు',
      'ఇతర అంశాలు'
    ],
    defaultSelected: 0
  }
];

export const SCREEN_TABS = [
  { id: 'splash', label: '1. Splash Screen', short: 'Splash' },
  { id: 'select-party', label: '2. Select Party', short: 'Party' },
  { id: 'q1', label: '3. Step 1 (Reason)', short: 'Step 1' },
  { id: 'q2', label: '4. Step 2 (Quality)', short: 'Step 2' },
  { id: 'q3', label: '5. Step 3 (Expectations)', short: 'Step 3' },
  { id: 'q4', label: '6. Step 4 (Trust Basis)', short: 'Step 4' },
  { id: 'q5', label: '7. Step 5 (Decision)', short: 'Step 5' },
  { id: 'thank-you', label: '8. Thank You', short: 'Thanks' },
  { id: 'live-results', label: '9. Live Poll Results', short: 'Results' },
  { id: 'outro', label: '10. Democracy Outro', short: 'Outro' },
];
