// Mock Database for Kawach AI - Digital Public Safety Platform

// 1. Geographic Hotspots (Active cybercrime cells and seizure points)
export const mockMapHotspots = [
  {
    id: "hot_jamtara",
    name: "Jamtara Hub (Jharkhand)",
    type: "Phishing & SIM Box Syndicate",
    lat: 24.13,
    lng: 86.80,
    severity: "High",
    cases: 342,
    activeTowers: 14,
    description: "Multi-tower spoofing ring running lottery fraud and electricity bill scam operations."
  },
  {
    id: "hot_mewat",
    name: "Mewat-Bharatpur Corridor (HR/RJ)",
    type: "Digital Arrest & Sextortion Ring",
    lat: 27.89,
    lng: 77.01,
    severity: "Critical",
    cases: 589,
    activeTowers: 28,
    description: "Coordinated cells impersonating CBI and Customs. Focus of active inter-state police sweeps."
  },
  {
    id: "hot_noida",
    name: "Noida Sec-62 (UP)",
    type: "Fake Tech-Support & Call Center",
    lat: 28.57,
    lng: 77.32,
    severity: "Medium",
    cases: 198,
    activeTowers: 5,
    description: "Organized mock-offices running cross-border tech support scams and IRS impersonation."
  },
  {
    id: "hot_bengaluru",
    name: "Bengaluru East (Karnataka)",
    type: "Mule Account Cashout Network",
    lat: 12.97,
    lng: 77.59,
    severity: "High",
    cases: 267,
    activeTowers: 8,
    description: "High volume of quick bank transfers into money mule accounts. ATM withdrawals mapped."
  },
  {
    id: "hot_patna",
    name: "Patna Central (Bihar)",
    type: "Counterfeit Currency Seizure Hub",
    lat: 25.59,
    lng: 85.13,
    severity: "High",
    cases: 112,
    activeTowers: 2,
    description: "Primary distribution center for high-denomination counterfeit notes (FICN) entering via border corridors."
  }
];

// 2. Recent Active Bulletins (Live law enforcement feed)
export const mockRecentCases = [
  {
    id: "CASE-2026-891",
    timestamp: "10 mins ago",
    title: "Spoofed Number Intercepted",
    subtitle: "+91 98110 48212 flagged posing as Mumbai Cyber Cell (CBI).",
    location: "Mewat Hub Target",
    category: "Digital Arrest",
    status: "Intercepted",
    severity: "High"
  },
  {
    id: "CASE-2026-890",
    timestamp: "32 mins ago",
    title: "Mule Account Frozen",
    subtitle: "SBI Account *8901 in Delhi frozen after receiving Rs. 4.5 Lakhs from a Digital Custody scam.",
    location: "Delhi-Bengaluru Link",
    category: "Money Mule",
    status: "Frozen",
    severity: "Critical"
  },
  {
    id: "CASE-2026-889",
    timestamp: "1 hour ago",
    title: "Counterfeit Rs 500 Detected",
    subtitle: "Rs 500 fake note flagged at PNB teller (Kanpur). Serial: 4DP 892013.",
    location: "Kanpur Branch",
    category: "FICN Counterfeit",
    status: "Seized",
    severity: "Medium"
  },
  {
    id: "CASE-2026-888",
    timestamp: "3 hours ago",
    title: "SIM Box Raid Complete",
    subtitle: "Police seized 128-channel SIM box in Jamtara forest cluster.",
    location: "Jamtara (Jharkhand)",
    category: "Infrastructure",
    status: "Neutralized",
    severity: "High"
  }
];

// 3. Digital Arrest Scenarios (For the active transcript analyzer)
export const mockScamCalls = [
  {
    id: "call_fedex_mumbai",
    callerName: "+91 99120 48831 (Spoofed - Mumbai Customs Office)",
    targetVictim: "Mrs. Anjali Sharma (Pune, IT Professional)",
    callDuration: "3 min 45s",
    riskScore: 92,
    deepfakeProbability: 84,
    spectrogramData: [20, 55, 80, 45, 25, 60, 95, 75, 40, 15, 30, 85, 90, 55, 30, 10],
    status: "Flagged - Active Alert Generated",
    transcript: [
      { speaker: "caller", text: "Hello, this is Inspector Sanjay Patil from the Mumbai Airport Customs Department. Am I speaking with Anjali Sharma?" },
      { speaker: "victim", text: "Yes, this is Anjali. What is this about?" },
      { speaker: "caller", text: "Madam, a FedEx package addressed to you containing 12 expired passports, 5 credit cards, and 250 grams of MDMA (narcotics) was intercepted on its way to Taiwan. This is a very serious offense." },
      { speaker: "victim", text: "MDMA? Taiwan? I haven't sent any package! There must be some mistake." },
      { speaker: "caller", text: "The package has your Aadhaar number card linked to it. You are the prime suspect. We are transferring this call to the CBI cyber headquarters in Delhi for video verification. Do not disconnect the line, otherwise we will send local police to arrest you immediately." },
      { speaker: "victim", text: "Oh my god. Yes, please transfer it. I did not do this, please help me." },
      { speaker: "caller", text: "To verify your innocence, you must enter a private Skype video call. You are now placed under digital arrest. You are forbidden to speak to any family members or call anyone. Do you understand? Keep your camera active. We will verify your banking assets to ensure money laundering did not take place." }
    ],
    checks: {
      spoofSignature: "Telecom Tower ID matches border SIM-box corridor (Mewat), not Mumbai.",
      voiceSpoof: "High probability of AI-cloned assistant voice detected (84% score).",
      keywordsMatched: ["FedEx package", "narcotics", "Taiwan", "Aadhaar number", "digital arrest", "CBI Delhi", "Skype call", "verify banking assets"]
    }
  },
  {
    id: "call_cbi_verify",
    callerName: "+91 88320 11982 (Spoofed - CBI Cyber Cell HQ)",
    targetVictim: "Dr. Ramesh Iyer (Chennai, Retired Professor)",
    callDuration: "5 min 12s",
    riskScore: 98,
    deepfakeProbability: 96,
    spectrogramData: [15, 35, 65, 80, 95, 85, 50, 30, 45, 70, 80, 95, 70, 40, 20, 5],
    status: "Blocked - MHA Dispatch Transmitted",
    transcript: [
      { speaker: "caller", text: "This is Deputy Commissioner Verma from Delhi CBI Headquarters. A bank account under your name at Canara Bank has been found linked to a Rs. 42 Crore money laundering scam run by Naresh Goyal." },
      { speaker: "victim", text: "This is impossible! I have been a college professor my entire life. I have no connections with any money laundering." },
      { speaker: "caller", text: "Sir, the Supreme Court has issued an official digital custody warrant against you. I am sending it to your WhatsApp now. See the signature of Chief Justice. It is an official document." },
      { speaker: "victim", text: "Yes, I see the document on my phone. It looks official... What should I do? I am an old man, my health is not good." },
      { speaker: "caller", text: "Do not panic, sir. If you cooperate, we can do a digital verification. You must transfer your savings of Rs. 8,50,000 into our Reserve Bank clearance account. This is only for auditing. Once audit is complete in 30 minutes, the Supreme Court will release the funds back to your account." },
      { speaker: "victim", text: "Okay, I will open my mobile banking now. Please confirm the account number again so that I do not make a mistake." }
    ],
    checks: {
      spoofSignature: "Account verification reveals the destination bank account belongs to a private citizen in Mewat, not RBI.",
      voiceSpoof: "Caller speaking from Mewat tower segment using VoIP gateway.",
      keywordsMatched: ["money laundering", "CBI Headquarters", "Supreme Court", "digital custody warrant", "Reserve Bank clearance account", "transfer your savings", "auditing"]
    }
  }
];

// 4. Currency Checkpoint Database (Rs. 500 note specifications)
export const mockCurrencyChecklist = {
  denom: "500",
  features: [
    {
      id: "feat_watermark",
      name: "Mahatma Gandhi Watermark",
      description: "A portrait of Mahatma Gandhi and a multi-directional watermark of '500' must be visible clearly inside the white window when viewed against transmitted light.",
      howToCheck: "Look at the circular white panel on the right side under backlighting.",
      isUvSensitive: false
    },
    {
      id: "feat_thread",
      name: "Color-Shifting Security Thread",
      description: "The windowed security thread contains inscriptions 'BHARAT' (in Devanagari) and '500'. Under ordinary light, the color of the thread shifts from green to blue when the note is tilted.",
      howToCheck: "Tilt the note. Under UV light, the thread glows with high-intensity fluorescent yellow-green.",
      isUvSensitive: true
    },
    {
      id: "feat_microprint",
      name: "Microlettering",
      description: "The text 'RBI' and '500' is printed in micro-lettering between the Mahatma Gandhi portrait and the vertical border. Fake notes usually have blurred or merged letters.",
      howToCheck: "Requires magnification. The letters must be sharp, standalone, and completely legible.",
      isUvSensitive: false
    },
    {
      id: "feat_serial",
      name: "Progressive Serial Number",
      description: "Serial numbers are printed in the bottom-left and top-right corners. The font sizes of the characters increase progressively from left to right (smallest to largest).",
      howToCheck: "Check spacing and the progressive size increase of the serial number digits.",
      isUvSensitive: true
    },
    {
      id: "feat_uv_fibers",
      name: "Fluorescent UV Fibers",
      description: "Under ultraviolet (UV) illumination, scattered security fibers embedded in the paper pulp must glow in shades of blue, yellow, and green.",
      howToCheck: "Simulate UV exposure to verify scattered embedded fibers. Fake notes lack this embedded depth.",
      isUvSensitive: true
    },
    {
      id: "feat_infrared",
      name: "Infrared (IR) Invisible Ink",
      description: "Under infrared wavelengths, only specific parts of the note remain visible (like the Gandhi window and portrait background), while the left-half elements disappear.",
      howToCheck: "Expose note to IR band. Verify left-hand graphics fade away.",
      isUvSensitive: false
    },
    {
      id: "feat_magnetic",
      name: "Magnetic (MG) Resonance",
      description: "The denomination digits and the security thread contain metallic ink that creates magnetic resonance signals when scanned.",
      howToCheck: "Scan note on Magnetic Bed to verify resonance pulse.",
      isUvSensitive: false
    }
  ],
  samples: [
    {
      id: "note_genuine",
      serial: "3EF 781928",
      label: "Genuine Rs 500 Note (Reference)",
      status: "Genuine",
      description: "Verified sample from RBI chest. All intaglio prints, watermarks, microprints, and color thread transitions meet 100% security compliance.",
      uvResult: "Thread glows bright green. Embedded fibers visible. Watermark crisp.",
      irResult: "Pass: Left-side vanishes under IR. Secure watermark window is crisp.",
      mgResult: "Pass: Magnetic ink response verifies genuine iron-oxide thread content.",
      failures: []
    },
    {
      id: "note_fake_mewat",
      serial: "9EP 420919",
      label: "Counterfeit Seized in Mewat (FICN)",
      status: "Counterfeit",
      description: "High-quality offset print seized during a raid. Fails microprinting limits and security thread shift is painted on rather than woven.",
      uvResult: "Security thread does not glow. Background paper glows bright white (indicates cheap chemical wood-pulp paper). No scattered fibers.",
      irResult: "Fail: Entire note remains fully visible under IR (no IR-absorbing ink utilized).",
      mgResult: "Fail: Magnetic resonance signal flatlines (0Hz - generic non-magnetic inks used).",
      failures: ["feat_thread", "feat_microprint", "feat_uv_fibers", "feat_infrared", "feat_magnetic"]
    }
  ]
};

// 5. Fraud Syndicate Network Linkage (Nodes and connections for D3 mapping)
export const mockNetworkGraph = {
  nodes: [
    // Scammers (Red Alert)
    { id: "S-101", label: "SIM Box (Mewat Hub)", type: "scammer", details: "Coordinated SIM array operating 32 active VoIP channels." },
    { id: "S-102", label: "Caller: 'patil_cbi'", type: "scammer", details: "Voice signature matches Sanjay Patil scammer profile." },
    
    // Victim Reports (Orange warning)
    { id: "V-201", label: "Victim: Mrs. Sharma (Pune)", type: "victim", details: "Lost Rs 4.5 Lakhs. Filed complaint 1902/UP." },
    { id: "V-202", label: "Victim: Dr. Iyer (Chennai)", type: "victim", details: "Scam intercepted at fund-transfer step. Saved Rs 8.5L." },
    
    // Mule Accounts (Saffron alerts)
    { id: "M-301", label: "Mule SBI (Delhi Branch)", type: "mule", details: "Account holder: R. Kumar. Rs 12L transactions in 48 hours." },
    { id: "M-302", label: "Mule PNB (Jamnagar Branch)", type: "mule", details: "Account holder: K. Shah. Linked to cash withdraws in Gujarat." },
    
    // Infrastructure (Gray nodes)
    { id: "I-401", label: "IMEI: 358921004812", type: "infrastructure", details: "Handset linked to Mewat syndicate active spoof calls." },
    { id: "I-402", label: "IP: 103.42.201.89", type: "infrastructure", details: "VoIP gateway route used to route spoofed calls." }
  ],
  links: [
    // Scammer connection to Victims
    { source: "S-101", target: "V-201", relation: "Spoofed Call Sent" },
    { source: "S-102", target: "V-202", relation: "Spoofed Call Sent" },
    
    // Scammers to Infrastructure
    { source: "S-101", target: "I-401", relation: "SIM Hosted on Device" },
    { source: "S-102", target: "I-402", relation: "VoIP gateway routing" },
    
    // Victim funds flow to Mule Accounts
    { source: "V-201", target: "M-301", relation: "Rs 4.5L Bank Transfer" },
    { source: "V-202", target: "M-301", relation: "Attempted transfer" },
    
    // Mule Account inter-connections
    { source: "M-301", target: "M-302", relation: "Siphoned Fund Flow" },
    { source: "M-302", target: "S-101", relation: "Syndicate Cashout payouts" }
  ]
};

// Helper translation dictionary for conversational citizen portal
export const languageDict = {
  English: {
    welcome: "Welcome to Citizen Fraud Shield. If you received a suspicious call, message, or payment request, I can evaluate your scam threat risk. Select a option below.",
    option1: "Report a Call claiming to be from Police, CBI, or Customs",
    option2: "Analyze a suspicious payment or bank request",
    question1: "Did the caller say a package with illegal items (e.g. drugs, passport) was intercepted in your name?",
    question2: "Did they demand you stay on a video call (Skype/WhatsApp) and forbid you from calling family?",
    question3: "Did they ask you to transfer money to a 'government safety vault' or 'RBI clearance account'?",
    verdictSafe: "Low Risk. Safe.",
    verdictScam: "CRITICAL THREAT! This is a classic 'Digital Arrest' scam template. Official police or CBI agencies never conduct video-call arrests, nor do they ask for bank transfers. DO NOT transfer money. Block the number immediately.",
    advisory: "Actions: 1. Immediately block the caller. 2. File a complaint on national portal cybercrime.gov.in. 3. Draft report text is generated below.",
    draftBtn: "Generate NCRB Draft Report"
  },
  Hindi: {
    welcome: "सिटिजन फ्रॉड शील्ड में आपका स्वागत है। यदि आपको कोई संदिग्ध कॉल, संदेश या भुगतान अनुरोध प्राप्त हुआ है, तो मैं आपके जोखिम का मूल्यांकन कर सकता हूँ।",
    option1: "पुलिस, सीबीआई या सीमा शुल्क (Customs) से होने का दावा करने वाली कॉल की रिपोर्ट करें",
    option2: "एक संदिग्ध बैंक या भुगतान अनुरोध का विश्लेषण करें",
    question1: "क्या कॉल करने वाले ने कहा कि आपके नाम पर अवैध वस्तुओं (जैसे ड्रग्स, पासपोर्ट) वाला कोई पार्सल पकड़ा गया है?",
    question2: "क्या उन्होंने आपसे स्काइप/व्हाट्सएप वीडियो कॉल पर बने रहने को कहा और परिवार को कॉल करने से मना किया?",
    question3: "क्या उन्होंने आपसे 'सरकारी सुरक्षा खाते' या 'आरबीआई निकासी खाते' में पैसे ट्रांसफर करने को कहा?",
    verdictSafe: "कम जोखिम। सुरक्षित।",
    verdictScam: "गंभीर खतरा! यह एक 'डिजिटल अरेस्ट' घोटाला है। सरकारी एजेंसियां कभी भी वीडियो-कॉल पर गिरफ्तारी नहीं करतीं, न ही पैसे ट्रांसफर करने को कहती हैं। पैसे ट्रांसफर न करें। तुरंत नंबर ब्लॉक करें।",
    advisory: "कार्रवाई: 1. तुरंत नंबर ब्लॉक करें। 2. राष्ट्रीय पोर्टल cybercrime.gov.in पर रिपोर्ट दर्ज करें। 3. रिपोर्ट का ड्राफ्ट नीचे तैयार है।",
    draftBtn: "एनसीआरबी ड्राफ्ट रिपोर्ट बनाएं"
  },
  Tamil: {
    welcome: "சிட்டிசன் பிராடு ஷீல்டுக்கு உங்களை வரவேற்கிறோம். சந்தேகத்திற்கிடமான அழைப்பு அல்லது செய்தியைப் பெற்றால், அச்சுறுத்தல் அபாயத்தை நான் மதிப்பிடுவேன்.",
    option1: "போலீஸ், சிபிஐ அல்லது சுங்கத்துறையிலிருந்து வந்ததாகக் கூறும் அழைப்பைப் புகாரளிக்கவும்",
    option2: "சந்தேகத்திற்கிடமான வங்கி பரிமாற்றத்தை பகுப்பாய்வு செய்யவும்",
    question1: "உங்கள் பெயரில் போதைப்பொருள் அல்லது பாஸ்போர்ட் கொண்ட பார்சல் பிடிபட்டதாக அழைப்பவர் கூறினாரா?",
    question2: "வீடியோ காலில் (ஸ்கைப்/வாட்ஸ்அப்) இருக்குமாறு மிரட்டி, குடும்பத்தினரை அழைக்கத் தடை விதித்தார்களா?",
    question3: "பணத்தை 'அரசு பாதுகாப்பு கணக்கு' அல்லது 'ஆர்பிஐ அனுமதி கணக்குக்கு' மாற்றச் சொன்னார்களா?",
    verdictSafe: "குறைந்த ஆபத்து. பாதுகாப்பானது.",
    verdictScam: "மிகவும் ஆபத்தானது! இது ஒரு 'டிஜிட்டல் அரெஸ்ட்' மோசடி. காவல்துறை அல்லது சிபிஐ ஒருபோதும் வீடியோ காலில் கைது செய்யாது, பணத்தைக் கேட்காது. பணத்தை அனுப்ப வேண்டாம். எண்ணை உடனடியாக பிளாக் செய்யவும்.",
    advisory: "நடவடிக்கைகள்: 1. எண்ணை பிளாக் செய்யவும். 2. cybercrime.gov.in இல் புகார் செய்யவும். 3. புகார் அறிக்கை கீழே உள்ளது.",
    draftBtn: "என்சிஆர்பி வரைவு அறிக்கை உருவாக்கு"
  },
  Telugu: {
    welcome: "సిటిజన్ ఫ్రాడ్ షీల్డ్‌కు స్వాగతం. మీకు అనుమానాస్పద కాల్ లేదా మెసేజ్ వస్తే, ప్రమాద తీవ్రతను నేను అంచనా వేస్తాను.",
    option1: "పోలీస్, సిబిఐ లేదా కస్టమ్స్ అధికారులమని చెప్పుకునే కాల్‌ను నివేదించండి",
    option2: "అనుమానాస్పద బ్యాంక్ బదిలీని విశ్లేషించండి",
    question1: "మీ పేరిట డ్రగ్స్ లేదా పాస్‌పోర్ట్ ఉన్న పార్శిల్ పట్టుబడిందని కాలర్ చెప్పారా?",
    question2: "మిమ్మల్ని వీడియో కాల్‌లోనే ఉండమని బెదిరించి, కుటుంబ సభ్యులతో మాట్లాడవద్దని చెప్పారా?",
    question3: "డబ్బును 'ప్రభుత్వ భద్రతా ఖాతా' లేదా 'ఆర్బిఐ క్లియరెన్స్ ఖాతా'కు బదిలీ చేయమని అడిగారా?",
    verdictSafe: "తక్కువ ప్రమాదం. సురక్షితం.",
    verdictScam: "అత్యంత ప్రమాదకరం! ఇది ఒక 'డిజిటల్ అరెస్ట్' మోసం. పోలీసులు లేదా సిబిఐ ఎప్పుడూ వీడియో కాల్‌లో అరెస్టు చేయరు, డబ్బు అడగరు. డబ్బులు పంపవద్దు. వెంటనే నంబర్ బ్లాక్ చేయండి.",
    advisory: "చర్యలు: 1. వెంటనే నంబర్ బ్లాక్ చేయండి. 2. cybercrime.gov.in లో ఫిర్యాదు చేయండి. 3. రిపోర్ట్ డ్రాఫ్ట్ కింద ఇవ్వబడింది.",
    draftBtn: "ఎన్‌సిఆర్‌బి డ్రాఫ్ట్ రిపోర్ట్ సృష్టించు"
  },
  Bengali: {
    welcome: "সিটিজেন ফ্রড শিল্ডে আপনাকে স্বাগত। আপনি যদি কোনো সন্দেহজনক কল বা বার্তা পেয়ে থাকেন, আমি তার ঝুঁকি মূল্যায়ন করতে পারি।",
    option1: "পুলিশ, সিবিআই বা কাস্টমস থেকে দাবি করা কোনো কলের রিপোর্ট করুন",
    option2: "সন্দেহজনক কোনো ব্যাঙ্ক লেনদেন বিশ্লেষণ করুন",
    question1: "কলকারী কি বলেছে যে আপনার নামে কোনো মাদক বা পাসপোর্ট সহ পার্সেল আটক করা হয়েছে?",
    question2: "তারা কি আপনাকে ভিডিও কলে (Skype/WhatsApp) থাকতে বাধ্য করেছে এবং পরিবারকে জানাতে নিষেধ করেছে?",
    question3: "তারা কি আপনাকে কোনো 'সরকারি নিরাপত্তা অ্যাকাউন্ট' বা 'আরবিআই ক্লিয়ারেন্স অ্যাকাউন্টে' টাকা পাঠাতে বলেছে?",
    verdictSafe: "কম ঝুঁকি। নিরাপদ।",
    verdictScam: "মারাত্মক হুমকি! এটি একটি 'ডিজিটাল অ্যারেস্ট' প্রতারণা। পুলিশ বা সিবিআই কখনই ভিডিও কলে গ্রেফতার করে না, বা টাকা পাঠাতে বলে না। টাকা পাঠাবেন না। অবিলম্বে নম্বরটি ব্লক করুন।",
    advisory: "করণীয়: 1. নম্বরটি ব্লক করুন। 2. cybercrime.gov.in পোর্টালে রিপোর্ট করুন। 3. ড্রাফট রিপোর্ট নিচে দেওয়া হলো।",
    draftBtn: "এনসিআরবি ড্রাফট রিপোর্ট তৈরি করুন"
  }
};
