import type { Loc } from "@/lib/i18n";
import type { AgeKey, DisabilityKey, GenderKey, IncomeKey, OccupationKey } from "./schemes";

/* ------------------------------------------------------------------ *
 * Pilot facts (from the Yojana Saathi project design document)
 * ------------------------------------------------------------------ */

export const pilot = {
  name: { en: "Bharauli pilot", hi: "भौराली पायलट" },
  location: {
    en: "Bharauli Village, Shahpur Block, Bhojpur District, Bihar 802731, India",
    hi: "भौराली गाँव, शाहपुर प्रखंड, भोजपुर जिला, बिहार 802731, भारत",
  },
  /* Approximate coordinates for the block area; shown as indicative only. */
  map: {
    lat: 25.1281,
    lng: 84.4527,
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=Bharauli%2C%20Shahpur%2C%20Bhojpur%2C%20Bihar",
    osmEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=84.33%2C25.04%2C84.57%2C25.22&layer=mapnik&marker=25.1281%2C84.4527",
  },
  targets: {
    households: 750,
    applications: 600,
    benefits: 450,
    saathis: 2,
    durationMonths: 6,
    budgetINR: 135000,
  },
} as const;

export const budgetRows: { label: Loc; amount: number; note: Loc }[] = [
  {
    label: { en: "Saathi training and monthly stipend support (2 women)", hi: "साथी प्रशिक्षण एवं मासिक भत्ता सहायता (2 महिलाएँ)" },
    amount: 60000,
    note: { en: "Three-week training, refreshers, stipend", hi: "तीन सप्ताह प्रशिक्षण, रिफ़्रेशर, भत्ता" },
  },
  {
    label: { en: "Field rounds, travel and camp days", hi: "फ़ील्ड भ्रमण, यातायात एवं शिविर दिवस" },
    amount: 33000,
    note: { en: "Fuel/local travel, camp hall, drinking water", hi: "स्थानीय यातायात, शिविर स्थल, पानी" },
  },
  {
    label: { en: "Printing, photocopies, device and data", hi: "छपाई, फ़ोटोकॉपी, उपकरण व डेटा" },
    amount: 27000,
    note: { en: "Forms, checklists, data packs, printouts", hi: "फ़ॉर्म, चेकलिस्ट, डेटा पैक, प्रिंटआउट" },
  },
  {
    label: { en: "Coordinator, monitoring, documentation", hi: "समन्वयक, निगरानी एवं प्रलेखन" },
    amount: 15000,
    note: { en: "Case review, reporting, audit trail", hi: "केस समीक्षा, रिपोर्टिंग, लेखा-परीक्षण" },
  },
];

export const pilotPhases: {
  month: number;
  title: Loc;
  activities: Loc[];
  output: Loc;
}[] = [
  {
    month: 1,
    title: { en: "Mobilise & baseline", hi: "गतिरोधन व आधार-रेखा" },
    activities: [
      { en: "Meeting with the gram panchayat, awareness announcements, ward mapping", hi: "ग्राम पंचायत बैठक, जागरूकता घोषणा, वार्ड मानचित्रण" },
      { en: "Recruit and begin training the two Saathis", hi: "दो साथी का चयन व प्रशिक्षण आरंभ" },
      { en: "Set up the case register, consent forms and document checklist", hi: "केस रजिस्टर, सहमति पत्र व दस्तावेज़ चेकलिस्ट तैयार" },
    ],
    output: { en: "Baseline register ready, 120 households contacted", hi: "आधार-रेखा रजिस्टर तैयार, 120 परिवारों से मुलाक़ात" },
  },
  {
    month: 2,
    title: { en: "Household survey wave 1", hi: "परिवार सर्वे — चरण 1" },
    activities: [
      { en: "Door-to-door survey of 250 households using the standard form", hi: "तय फ़ॉर्म पर 250 परिवारों का घर-घर सर्वे" },
      { en: "Prepare personal document files; list missing certificates", hi: "व्यक्तिगत दस्तावेज़ फ़ाइल बनाएँ; गुम प्रमाणों की सूची" },
      { en: "First two camp days at the panchayat bhawan", hi: "पंचायत भवन में पहले दो शिविर दिवस" },
    ],
    output: { en: "250 households profiled, 70 applications filed", hi: "250 परिवार चिह्नित, 70 आवेदन दाखिल" },
  },
  {
    month: 3,
    title: { en: "Applications & document drives", hi: "आवेदन एवं दस्तावेज़ अभियान" },
    activities: [
      { en: "File pension, Ayushman, e-Shram and job-card applications", hi: "पेंशन, आयुष्मान, ई-श्रम व जॉब कार्ड आवेदन" },
      { en: "Organise a camp for certificates with the block functionary", hi: "प्रखंड अधिकारी के साथ प्रमाण-पत्र शिविर" },
      { en: "Survey the next 150 households", hi: "अगले 150 परिवारों का सर्वे" },
    ],
    output: { en: "400 households covered, 160 applications filed", hi: "400 परिवार कवर, 160 आवेदन दाखिल" },
  },
  {
    month: 4,
    title: { en: "Tracking & first benefits", hi: "ट्रैकिंग एवं प्रथम लाभ" },
    activities: [
      { en: "Status check of every filed application using acknowledgement numbers", hi: "हर आवेदन की स्थिति स्वीकृति संख्या से जाँचें" },
      { en: "Verify bank seeding and e-KYC to unblock DBT payments", hi: "DBT हेतु खाता-सीडिंग व e-KYC सत्यापन" },
      { en: "Complete survey of 550 households", hi: "550 परिवारों का सर्वे पूर्ण" },
    ],
    output: { en: "280 applications filed, first benefit credits confirmed", hi: "280 आवेदन दाखिल, प्रथम लाभ जमा की पुष्टि" },
  },
  {
    month: 5,
    title: { en: "Rejection resolution drive", hi: "रद्द आवेधान निवारण अभियान" },
    activities: [
      { en: "Read every rejection remark; classify defect types", hi: "प्रत्येक रद्दीकरण टिप्पणी पढ़ें; कमी का वर्गीकरण" },
      { en: "Correct documents, file appeals and re-applications", hi: "दस्तावेज़ सुधार, अपील व पुनः-आवेदन" },
      { en: "Grievance follow-up at block/district level", hi: "ब्लॉक/जिला स्तर पर शिकायत फ़ॉलो-अप" },
    ],
    output: { en: "680 households covered, 420 applications, 300 benefits", hi: "680 परिवार, 420 आवेदन, 300 लाभ" },
  },
  {
    month: 6,
    title: { en: "Verification & published report", hi: "सत्यापन एवं सार्वजनिक रिपोर्ट" },
    activities: [
      { en: "Cross-verify credits in passbooks with families", hi: "परिवारों के साथ पासबुक में जमा का क्रॉस-सत्यापन" },
      { en: "Close pending files with a written next step for each", hi: "प्रत्येक शेष फ़ाइल पर लिखित अगला कदम देकर बंद करें" },
      { en: "Publish the pilot report and the block expansion plan", hi: "पायलट रिपोर्ट व प्रखंड विस्तार योजना प्रकाशित" },
    ],
    output: { en: "750 households, 600 applications, 450 benefits reported", hi: "750 परिवार, 600 आवेदन, 450 लाभ रिपोर्ट" },
  },
];

/* ------------------------------------------------------------------ *
 * Impact dashboard — targets, plan and demo verified figures
 * ------------------------------------------------------------------ */

export type KpiStatus = "target" | "estimate" | "verified" | "planned";

export const impactKpis: {
  key: string;
  label: Loc;
  target: number;
  current: number;
  status: KpiStatus;
  unit?: string;
  note: Loc;
}[] = [
  {
    key: "households",
    label: { en: "Households surveyed", hi: "सर्वे किए गए परिवार" },
    target: 750,
    current: 0,
    status: "target",
    note: { en: "Counted once per household, not per visit", hi: "परिवार प्रति बार, प्रति भ्रम नहीं" },
  },
  {
    key: "applications",
    label: { en: "Applications filed", hi: "दाखिल आवेदन" },
    target: 600,
    current: 0,
    status: "target",
    note: { en: "Filed only when an official acknowledgement exists", hi: "आधिकारिक स्वीकृति होने पर ही गिना जाता है" },
  },
  {
    key: "benefits",
    label: { en: "Benefits received", hi: "प्राप्त लाभ" },
    target: 450,
    current: 0,
    status: "target",
    note: { en: "Confirmed from passbook or bank statement", hi: "पासबुक/खाता विवरण से पुष्टि" },
  },
  {
    key: "saathis",
    label: { en: "Women trained", hi: "प्रशिक्षित महिलाएँ" },
    target: 2,
    current: 0,
    status: "target",
    note: { en: "Full three-week curriculum plus refreshers", hi: "तीन सप्ताह पाठ्यक्रम + रिफ़्रेशर" },
  },
];

export const monthlyPlan: {
  month: number;
  households: number;
  applications: number;
  benefits: number;
}[] = [
  { month: 1, households: 120, applications: 20, benefits: 0 },
  { month: 2, households: 250, applications: 70, benefits: 0 },
  { month: 3, households: 400, applications: 160, benefits: 30 },
  { month: 4, households: 550, applications: 280, benefits: 120 },
  { month: 5, households: 680, applications: 420, benefits: 300 },
  { month: 6, households: 750, applications: 600, benefits: 450 },
];

export const financialModel: { label: Loc; value: string; kind: "cash" | "cover" | "days"; note: Loc }[] = [
  {
    label: { en: "Pension credits for 60 enrolled households", hi: "60 पंजीकृत परिवारों की पेंशन जमा" },
    value: "₹7.92 lakh / year",
    kind: "cash",
    note: { en: "60 × ₹1,100 × 12 months", hi: "60 × ₹1,100 × 12 माह" },
  },
  {
    label: { en: "Housing assistance for 12 selected houses", hi: "12 चयनित आवासों हेतु आवास सहायता" },
    value: "₹14.40 lakh",
    kind: "cash",
    note: { en: "12 × ₹1,20,000 (plain area unit)", hi: "12 × ₹1,20,000 (मैदानी इकाई)" },
  },
  {
    label: { en: "Wage employment days generated", hi: "सृजित मज़दूरी रोज़गार दिन" },
    value: "15,000 person-days",
    kind: "days",
    note: { en: "150 households × 100 days at the notified state rate", hi: "150 परिवार × 100 दिन, अधिसूचित राज्य दर पर" },
  },
  {
    label: { en: "Health cover unlocked for 40 families", hi: "40 परिवारों हेतु खुली स्वास्थ्य सुरक्षा" },
    value: "₹2 crore cover",
    kind: "cover",
    note: { en: "40 × ₹5 lakh per family per year (not cash in hand)", hi: "40 × ₹5 लाख प्रति परिवार वार्षिक (हाथ में नकद नहीं)" },
  },
  {
    label: { en: "Accident cover for 70 enrolled workers", hi: "70 पंजीकृत श्रमिकों हेतु दुर्घटना कवरेज" },
    value: "₹1.40 crore cover",
    kind: "cover",
    note: { en: "70 × ₹2 lakh sum insured", hi: "70 × ₹2 लाख बीमित राशि" },
  },
];

export const empowermentMetrics: { label: Loc; target: Loc; note: Loc }[] = [
  {
    label: { en: "Monthly stipend controlled by the woman", hi: "महिला द्वारा नियंत्रित मासिक भत्ता" },
    target: { en: "₹4,000 – ₹6,000", hi: "₹4,000 – ₹6,000" },
    note: { en: "Pilot estimate, paid to her own account", hi: "पायलट अनुमान, अपने खाते में" },
  },
  {
    label: { en: "Portal submissions made independently", hi: "स्वतंत्र रूप से किए गए पोर्टल सबमिशन" },
    target: { en: "10+ per Saathi / month", hi: "प्रति साथी 10+ / माह" },
    note: { en: "Logged in the case register", hi: "केस रजिस्टर में दर्ज" },
  },
  {
    label: { en: "Grievances raised at block level", hi: "ब्लॉक स्तर पर उठाई गई शिकायतें" },
    target: { en: "Tracked to written reply", hi: "लिखित उत्तर तक ट्रैक" },
    note: { en: "Each with date, file number and outcome", hi: "तिथि, फ़ाइल संख्या व परिणाम सहित" },
  },
  {
    label: { en: "Peer training for other women", hi: "अन्य महिलाओं को सहपाठी प्रशिक्षण" },
    target: { en: "2 sessions per quarter", hi: "प्रति त्रैमासिक 2 सत्र" },
    note: { en: "SHG meetings and camp days", hi: "स्व.स.स. बैठकें व शिविर दिवस" },
  },
];

export const stories: {
  name: Loc;
  role: Loc;
  quote: Loc;
  kind: "illustrative";
}[] = [
  {
    name: { en: "Sitara Devi (illustrative)", hi: "सीतारा देवी (दृष्टांत)" },
    role: { en: "Widow, 54, ward 4", hi: "विधवा, 54 वर्ष, वार्ड 4" },
    quote: {
      en: "I was told the pension list was closed. The Saathi found that my name was never entered because the bank passbook did not have Aadhaar linked. The passbook was fixed, the form went in, and the remark on my file changed from 'rejected' to 'approved'.",
      hi: "मुझे बताया गया कि पेंशन की सूची बंद है। साथी ने पाया कि आधार खाते से जुड़ा न होने मेरा नाम दर्ज नहीं हुआ। पासबुक ठीक हुई, फ़ॉर्म गया और फ़ाइल पर 'रद्द' की जगह 'स्वीकृत' टिप्पणी आई।",
    },
    kind: "illustrative",
  },
  {
    name: { en: "Ramesh Prasad (illustrative)", hi: "रमेश प्रसाद (दृष्टांत)" },
    role: { en: "Farmer, 68", hi: "किसान, 68 वर्ष" },
    quote: {
      en: "My son died two years ago and his name is still in the ration card. I could not go to Shahpur again and again for one correction. The girl from our village took the death certificate copy and did it in one visit.",
      hi: "पुत्र की मृत्यु दो वर्ष पहले हुई, उनका नाम अभी भी राशन कार्ड में है। एक सुधार के लिए बार-बार शाहपुर नहीं जा सकता था। गाँव की ही बहने मृत्यु प्रमाण की प्रति ली और एक ही भ्रमण में करवा दिया।",
    },
    kind: "illustrative",
  },
  {
    name: { en: "Anjali Kumari (illustrative)", hi: "अंजलि कुमारी (दृष्टांत)" },
    role: { en: "Candidate for Saathi, class 12", hi: "साथी की प्रत्याशी, कक्षा 12" },
    quote: {
      en: "Filling forms on a phone felt like someone else's work. After training I did my first e-Shram registration myself, for my own uncle. Now families come and ask me first, before going to the shop in the town.",
      hi: "मोबाइल पर फ़ॉर्म भरना दूसरों का काम लगता था। प्रशिक्षण के बाद पहला ई-श्रम पंजीकरण मैंने स्वयं किया — अपने ही ताऊ जी का। अब परिवार शहर की दुकान से पहले मुझसे पूछते हैं।",
    },
    kind: "illustrative",
  },
  {
    name: { en: "Md. Irfan (illustrative)", hi: "मो. इरफ़ान (दृष्टांत)" },
    role: { en: "Migrant worker, 31", hi: "प्रवासी मज़दूर, 31 वर्ष" },
    quote: {
      en: "I work in the city eight months a year. My PMSBY debit failed twice because there was no ₹20 in the account on the due date. The Saathi called me and told me the date to keep money in.",
      hi: "मैं वर्ष में आठ माह शहर में काम करता हूँ। नियत तिथि पर खाते में ₹20 न होने से मेरी पीएम सुरक्षा बीमा की कटौती दो बार रुकी। साथी ने फ़ोन पर तिथि बता दी कि कब पैसा रखना है।",
    },
    kind: "illustrative",
  },
];

export const targetsTable: { metric: Loc; target: Loc; source: Loc }[] = [
  {
    metric: { en: "Households surveyed", hi: "सर्वे किए गए परिवार" },
    target: { en: "750", hi: "750" },
    source: { en: "Signed household survey forms", hi: "हस्ताक्षरित परिवार सर्वे फ़ॉर्म" },
  },
  {
    metric: { en: "Applications filed", hi: "दाखिल आवेदन" },
    target: { en: "600", hi: "600" },
    source: { en: "Official acknowledgement numbers only", hi: "केवल आधिकारिक स्वीकृति संख्या" },
  },
  {
    metric: { en: "Benefits received", hi: "प्राप्त लाभ" },
    target: { en: "450", hi: "450" },
    source: { en: "Family-confirmed bank credit / passbook", hi: "परिवार से पुष्टि-पत्र / पासबुक जमा" },
  },
  {
    metric: { en: "Rejections resolved", hi: "सुलझे रद्द आवेदन" },
    target: { en: "Not capped — reported as a rate", hi: "सीमा नहीं — दर के रूप में रिपोर्ट" },
    source: { en: "Case register with rejection remark text", hi: "रद्दीकरण टिप्पणी सहित केस रजिस्टर" },
  },
  {
    metric: { en: "Women trained", hi: "प्रशिक्षित महिलाएँ" },
    target: { en: "2", hi: "2" },
    source: { en: "Training attendance and skill test", hi: "प्रशिक्षण उपस्थिति व कौशल परीक्षा" },
  },
  {
    metric: { en: "Cost per household reached", hi: "प्रति पहुँचा परिवार लागत" },
    target: { en: "≈ ₹180", hi: "≈ ₹180" },
    source: { en: "₹1.35 lakh ÷ 750 households", hi: "₹1.35 लाख ÷ 750 परिवार" },
  },
];

/* ------------------------------------------------------------------ *
 * Form option vocabularies
 * ------------------------------------------------------------------ */

export const ageGroups: { key: AgeKey; label: Loc }[] = [
  { key: "under14", label: { en: "Below 14 years", hi: "14 वर्ष से कम" } },
  { key: "14-17", label: { en: "14 – 17 years", hi: "14 – 17 वर्ष" } },
  { key: "18-25", label: { en: "18 – 25 years", hi: "18 – 25 वर्ष" } },
  { key: "26-44", label: { en: "26 – 44 years", hi: "26 – 44 वर्ष" } },
  { key: "45-59", label: { en: "45 – 59 years", hi: "45 – 59 वर्ष" } },
  { key: "60plus", label: { en: "60 years and above", hi: "60 वर्ष या अधिक" } },
];

export const genders: { key: GenderKey; label: Loc }[] = [
  { key: "female", label: { en: "Female", hi: "महिला" } },
  { key: "male", label: { en: "Male", hi: "पुरुष" } },
  { key: "transgender", label: { en: "Transgender", hi: "तृतीयपंथी" } },
  { key: "unspecified", label: { en: "Prefer not to say", hi: "बताना नहीं चाहते" } },
];

export const occupations: { key: OccupationKey; label: Loc }[] = [
  { key: "cultivator", label: { en: "Cultivator / small or marginal farmer", hi: "किसान / लघु-सीमांत किसान" } },
  { key: "agriLabour", label: { en: "Agricultural labourer", hi: "कृषि मज़दूर" } },
  { key: "dailyWage", label: { en: "Daily wage worker", hi: "दिहाड़ी मज़दूर" } },
  { key: "selfEmployed", label: { en: "Self-employed (non-farm)", hi: "स्वरोजगार (गैर-कृषि)" } },
  { key: "shopkeeper", label: { en: "Small shop / tea-stall owner", hi: "छोटी दुकान / चाय-पान" } },
  { key: "artisan", label: { en: "Artisan / handicraft work", hi: "कारीगर / हस्तशिल्प" } },
  { key: "transport", label: { en: "Rickshaw, cart or vehicle work", hi: "रिक्शा, ठेला या वाहन कार्य" } },
  { key: "migrant", label: { en: "Migrant worker", hi: "प्रवासी मज़दूर" } },
  { key: "homemaker", label: { en: "Homemaker", hi: "गृहिणी" } },
  { key: "student", label: { en: "Student", hi: "विद्यार्थी" } },
  { key: "unemployed", label: { en: "Unemployed / seeking work", hi: "बेरोज़गार / कार्य खोज रहे" } },
  { key: "salaried", label: { en: "Salaried job", hi: "वेतन पर नौकरी" } },
  { key: "other", label: { en: "Other", hi: "अन्य" } },
];

export const incomeBands: { key: IncomeKey; label: Loc }[] = [
  { key: "below60k", label: { en: "Below ₹60,000", hi: "₹60,000 से कम" } },
  { key: "60k-1.2L", label: { en: "₹60,000 – ₹1.2 lakh", hi: "₹60,000 – ₹1.2 लाख" } },
  { key: "1.2L-2.5L", label: { en: "₹1.2 – ₹2.5 lakh", hi: "₹1.2 – ₹2.5 लाख" } },
  { key: "2.5L-5L", label: { en: "₹2.5 – ₹5 lakh", hi: "₹2.5 – ₹5 लाख" } },
  { key: "above5L", label: { en: "Above ₹5 lakh", hi: "₹5 लाख से अधिक" } },
  { key: "preferNot", label: { en: "Prefer not to say", hi: "बताना नहीं चाहते" } },
];

export const disabilityOptions: { key: DisabilityKey; label: Loc }[] = [
  { key: "no", label: { en: "No", hi: "नहीं" } },
  { key: "yes", label: { en: "Yes, someone has a disability certificate or can obtain one", hi: "हाँ, दिव्यांगता प्रमाण पत्र है या बनवाया जा सकता है" } },
  { key: "unspecified", label: { en: "Prefer not to say", hi: "बताना नहीं चाहते" } },
];

export const educationLevels: { key: string; label: Loc }[] = [
  { key: "below-matric", label: { en: "Studied up to class 10", hi: "कक्षा 10 तक" } },
  { key: "matric", label: { en: "Class 10 passed", hi: "कक्षा 10 उत्तीर्ण" } },
  { key: "intermediate", label: { en: "Class 12 / intermediate passed", hi: "कक्षा 12 / इंटर उत्तीर्ण" } },
  { key: "graduate", label: { en: "Graduate", hi: "स्नातक" } },
  { key: "post-graduate", label: { en: "Post-graduate", hi: "स्नातकोत्तर" } },
];

export const readingLevels: { key: string; label: Loc }[] = [
  { key: "confident", label: { en: "I can read and explain official papers to others", hi: "मैं सरकारी काग़ज़ पढ़कर दूसरों को समझा सकती हूँ" } },
  { key: "comfortable", label: { en: "I can read them with a little time", hi: "थोड़ा समय लेकर पढ़ सकती हूँ" } },
  { key: "basic", label: { en: "I can read simple Hindi only", hi: "केवल सरल हिंदी पढ़ सकती हूँ" } },
];

export const hourOptions: { key: string; label: Loc }[] = [
  { key: "2-3", label: { en: "2 – 3 hours a day", hi: "दिन में 2 – 3 घंटे" } },
  { key: "4-5", label: { en: "4 – 5 hours a day", hi: "दिन में 4 – 5 घंटे" } },
  { key: "6plus", label: { en: "6 hours or more, on fixed field days", hi: "6 या अधिक घंटे, तय फ़ील्ड दिवसों पर" } },
];
