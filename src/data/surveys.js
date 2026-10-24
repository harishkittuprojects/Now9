export const surveysData = [
  {
    id: "politics-telangana-pulse",
    categoryId: "politics",
    categoryName: "Politics",
    title: "Telangana Political & Governance Survey 2025",
    description: "Evaluate Congress 6-Guarantees performance, BRS opposition role, BJP regional growth, and AIMIM civic impact across all 33 districts.",
    estimatedTime: "2 mins",
    participants: "84,920",
    questions: [
      {
        id: "tg_q1",
        question: "Which political party is delivering the most tangible public results in your district?",
        options: [
          { text: "INC (Congress) — Welfare Guarantees & Administration", votes: 44 },
          { text: "BRS — Infrastructure & Past Regional Track Record", votes: 34 },
          { text: "BJP — Alternative Leadership & National Development", votes: 16 },
          { text: "AIMIM / Others / Independent Local Leaders", votes: 6 }
        ]
      },
      {
        id: "tg_q2",
        question: "What should be the top priority for Telangana state governance this year?",
        options: [
          { text: "Farmer welfare & Rythu Bharosa implementation", votes: 41 },
          { text: "IT, industrial investment & Hyderabad expansion", votes: 33 },
          { text: "Youth government job recruitments (TGPSC)", votes: 26 }
        ]
      }
    ]
  },
  {
    id: "politics-andhra-pulse",
    categoryId: "politics",
    categoryName: "Politics",
    title: "Andhra Pradesh Governance & NDA Coalition Poll",
    description: "Rate the TDP-JSP-BJP coalition governance, Amaravati capital development, Polavaram progress, and YSRCP opposition role across all 26 districts.",
    estimatedTime: "2 mins",
    participants: "96,410",
    questions: [
      {
        id: "ap_q1",
        question: "Which political leadership do you trust most for Andhra Pradesh's economic resurgence?",
        options: [
          { text: "TDP (N. Chandrababu Naidu) — Industrialization & Amaravati", votes: 48 },
          { text: "YSRCP (Y.S. Jagan Mohan Reddy) — Direct Welfare & Social Equity", votes: 38 },
          { text: "JSP (Pawan Kalyan) — Rural Panchayats & Youth Empowerment", votes: 10 },
          { text: "BJP / Congress / Others", votes: 4 }
        ]
      },
      {
        id: "ap_q2",
        question: "What is the most critical developmental milestone for Andhra Pradesh right now?",
        options: [
          { text: "Speedy completion of Amaravati Greenfield Capital", votes: 45 },
          { text: "Polavaram Irrigation Project completion & flood protection", votes: 32 },
          { text: "Job generation in Visakhapatnam, Vijayawada & Rayalaseema", votes: 23 }
        ]
      }
    ]
  },
  {
    id: "politics-civic-priorities",
    categoryId: "politics",
    categoryName: "Politics",
    title: "National Civic Priorities & Governance Survey",
    description: "Share your view on government responsiveness, economic resilience, and key public priorities.",
    estimatedTime: "3 mins",
    participants: "24,890",
    questions: [
      {
        id: "q1",
        question: "Which public issue should receive the highest legislative priority this year?",
        options: [
          { text: "Economic growth & controlling cost of living", votes: 42 },
          { text: "Healthcare infrastructure & affordability", votes: 28 },
          { text: "Education reform & youth job creation", votes: 18 },
          { text: "Environmental policy & clean energy", votes: 12 }
        ]
      },
      {
        id: "q2",
        question: "How confident do you feel in public institution transparency today?",
        options: [
          { text: "Highly confident — clear communication", votes: 19 },
          { text: "Moderately confident — room for improvement", votes: 46 },
          { text: "Low confidence — requires significant reform", votes: 35 }
        ]
      }
    ]
  },
  {
    id: "common-workplace-balance",
    categoryId: "common-talks",
    categoryName: "Common Talks",
    title: "The Modern Workplace: Remote, Hybrid, or In-Office?",
    description: "How has daily working culture transformed productivity, mental wellness, and commutes?",
    estimatedTime: "2 mins",
    participants: "36,750",
    questions: [
      {
        id: "q1",
        question: "What is your ideal work model for long-term productivity and happiness?",
        options: [
          { text: "Hybrid (2–3 days office, 2–3 days home)", votes: 58 },
          { text: "100% Fully Remote with flexible hours", votes: 31 },
          { text: "Full In-Office with team colocation", votes: 11 }
        ]
      },
      {
        id: "q2",
        question: "What is the biggest personal benefit of flexible working?",
        options: [
          { text: "Zero daily commute time and fuel savings", votes: 44 },
          { text: "Better balance with family and personal life", votes: 36 },
          { text: "Reduced workplace stress and better focus", votes: 20 }
        ]
      }
    ]
  },
  {
    id: "common-digital-wellness",
    categoryId: "common-talks",
    categoryName: "Common Talks",
    title: "Digital Wellness & Social Media Screen Habits",
    description: "Examining screen time awareness, content fatigue, and healthy digital boundaries.",
    estimatedTime: "3 mins",
    participants: "29,130",
    questions: [
      {
        id: "q1",
        question: "On average, how many hours per day do you spend on non-work digital media?",
        options: [
          { text: "Under 1 hour (strict digital boundaries)", votes: 14 },
          { text: "1 to 3 hours (moderate daily use)", votes: 52 },
          { text: "Over 4 hours (heavy social media consumption)", votes: 34 }
        ]
      },
      {
        id: "q2",
        question: "Have you ever taken an intentional 'digital detox' weekend?",
        options: [
          { text: "Yes, and it noticeably improved focus and calmness", votes: 48 },
          { text: "I've considered it, but work/life makes it hard", votes: 37 },
          { text: "No, staying connected is essential for me", votes: 15 }
        ]
      }
    ]
  }
];
