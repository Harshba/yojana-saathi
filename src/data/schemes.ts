import type { Loc } from "@/lib/i18n";

/* ------------------------------------------------------------------ *
 * Shared vocabularies used by both the forms and the matcher.
 * ------------------------------------------------------------------ */

export type DocKey =
  | "aadhaar"
  | "aadhaarMobile"
  | "voterId"
  | "pan"
  | "bank"
  | "ration"
  | "income"
  | "caste"
  | "domicile"
  | "disability"
  | "land"
  | "ageProof"
  | "widow"
  | "photo"
  | "jobcard"
  | "ayushman"
  | "pensionBook"
  | "marks"
  | "occupationProof"
  | "lifeCertificate";

export type AgeKey = "under14" | "14-17" | "18-25" | "26-44" | "45-59" | "60plus";
export type GenderKey = "female" | "male" | "transgender" | "unspecified";
export type OccupationKey =
  | "cultivator"
  | "agriLabour"
  | "dailyWage"
  | "selfEmployed"
  | "shopkeeper"
  | "artisan"
  | "transport"
  | "migrant"
  | "homemaker"
  | "student"
  | "unemployed"
  | "salaried"
  | "other";
export type IncomeKey = "below60k" | "60k-1.2L" | "1.2L-2.5L" | "2.5L-5L" | "above5L" | "preferNot";
export type DisabilityKey = "yes" | "no" | "unspecified";

export type SchemeCategory =
  | "pension"
  | "healthcare"
  | "insurance"
  | "education"
  | "housing"
  | "employment"
  | "ration";

export const categoryLabels: Record<SchemeCategory, Loc> = {
  pension: { en: "Pension", hi: "पेंशन" },
  healthcare: { en: "Healthcare", hi: "स्वास्थ्य" },
  insurance: { en: "Insurance", hi: "बीमा" },
  education: { en: "Education", hi: "शिक्षा" },
  housing: { en: "Housing", hi: "आवास" },
  employment: { en: "Employment", hi: "रोज़गार" },
  ration: { en: "Ration card", hi: "राशन कार्ड" },
};

export const documentLabels: Record<DocKey, Loc> = {
  aadhaar: { en: "Aadhaar card", hi: "आधार कार्ड" },
  aadhaarMobile: { en: "Mobile linked to Aadhaar", hi: "आधार से जुड़ा मोबाइल नंबर" },
  voterId: { en: "Voter ID card", hi: "मतदाता पहचान पत्र" },
  pan: { en: "PAN card", hi: "पैन कार्ड" },
  bank: { en: "Bank passbook (Aadhaar-seeded / DBT enabled)", hi: "बैंक पासबुक (आधार सीडेड / DBT सक्षम)" },
  ration: { en: "Ration card (NFSA)", hi: "राशन कार्ड (NFSA)" },
  income: { en: "Income certificate", hi: "आय प्रमाण पत्र" },
  caste: { en: "Caste certificate (SC/ST/OBC/EBC)", hi: "जाति प्रमाण पत्र (अ.स./स.ज./प.स./अ.व.स.)" },
  domicile: { en: "Domicile / residence certificate", hi: "निवास प्रमाण पत्र" },
  disability: { en: "Disability certificate (UDID)", hi: "दिव्यांगता प्रमाण पत्र (यू.डी.आई.डी.)" },
  land: { en: "Land record (Khatauni / Khata)", hi: "जमीन का रिकॉर्ड (खतौनी / खता)" },
  ageProof: { en: "Age proof (birth or school certificate)", hi: "आयु प्रमाण (जन्म/विद्यालय प्रमाण पत्र)" },
  widow: { en: "Husband's death certificate", hi: "पति के मृत्यु प्रमाण पत्र" },
  photo: { en: "Passport-size photographs", hi: "पासपोर्ट आकार के फ़ोटो" },
  jobcard: { en: "MGNREGA job card", hi: "मनरेगा जॉब कार्ड" },
  ayushman: { en: "Ayushman card", hi: "आयुष्मान कार्ड" },
  pensionBook: { en: "Pension payment book", hi: "पेंशन भुगतान पुस्तिका" },
  marks: { en: "Last marksheet / admission proof", hi: "अंतिम अंक पत्र / प्रवेश प्रमाण" },
  occupationProof: { en: "Occupation proof or self-declaration", hi: "व्यावसाय प्रमाण / स्व-घोषणा पत्र" },
  lifeCertificate: { en: "Survival / life certificate (for pensions)", hi: "जीवित प्रमाण पत्र (पेंशन हेतु)" },
};

/* ------------------------------------------------------------------ *
 * Scheme record
 * ------------------------------------------------------------------ */

export type Criterion = {
  ages?: AgeKey[];
  genders?: GenderKey[];
  occupations?: OccupationKey[];
  incomes?: IncomeKey[];
  /** household must hold at least one of these documents */
  anyDocs?: DocKey[];
  /** household must hold every one of these documents */
  allDocs?: DocKey[];
  /** household must NOT hold any of these documents */
  noDocs?: DocKey[];
  /** "yes" = a person with benchmark disability in the household */
  disability?: "yes" | "no";
};

export type RuleSet = {
  /** Every condition inside criteria must match. */
  criteria: Criterion;
  /** Shown to the user as the reason this scheme appeared. */
  reason: Loc;
};

export type Scheme = {
  slug: string;
  name: Loc;
  shortName: Loc;
  categories: SchemeCategory[];
  tagline: Loc;
  cardSummary: Loc;
  benefit: Loc;
  potentialBeneficiaries: Loc;
  icon: "HandCoins" | "HeartPulse" | "HardHat" | "Briefcase" | "ShieldCheck" | "GraduationCap" | "House" | "Wheat";
  overview: Loc[];
  eligibility: Loc[];
  benefits: Loc[];
  requiredDocs: DocKey[];
  optionalDocs: DocKey[];
  process: Loc[];
  officialUrl: string;
  officialLabel: Loc;
  myschemeHint: Loc;
  ruleSets: RuleSet[];
  /** Applications planned for the 600-application pilot target. */
  pilotTargetApplications: number;
};

const lowIncome: IncomeKey[] = ["below60k", "60k-1.2L", "1.2L-2.5L"];
const unorganised: OccupationKey[] = [
  "cultivator",
  "agriLabour",
  "dailyWage",
  "selfEmployed",
  "shopkeeper",
  "artisan",
  "transport",
  "migrant",
  "homemaker",
  "unemployed",
];

export const reviewedOn = "October 2026";

export const schemes: Scheme[] = [
  {
    slug: "bihar-social-security-pension",
    name: {
      en: "Bihar Social Security Pension Yojana",
      hi: "बिहार सामाजिक सुरक्षा पेंशन योजना",
    },
    shortName: { en: "Bihar Pension", hi: "बिहार पेंशन" },
    categories: ["pension"],
    tagline: {
      en: "Old age, widow and disability pension",
      hi: "वृद्धावस्था, विधवा एवं दिव्यांग पेंशन",
    },
    cardSummary: {
      en: "A monthly pension for senior citizens, widows and persons with benchmark disability, paid through DBT into the beneficiary's own bank account.",
      hi: "बुज़ुर्गों, विधवाओं एवं दिव्यांगजनों के लिए मासिक पेंशन, जो DBT के माध्यम से लाभार्थी के अपने बैंक खाते में दी जाती है।",
    },
    benefit: {
      en: "₹1,100 per month (state notification effective June 2025; previously ₹400)",
      hi: "₹1,100 प्रति माह (जून 2025 से प्रभावी राज्य अधिसूचना; पहले ₹400 थी)",
    },
    potentialBeneficiaries: {
      en: "Residents of Bihar aged 60 and above, eligible widows, and persons with a benchmark disability.",
      hi: "60 वर्ष या उससे अधिक आयु के बिहार निवासी, पात्र विधवाएँ एवं benchmark दिव्यांगजन।",
    },
    icon: "HandCoins",
    overview: [
      {
        en: "The Bihar Social Security Pension Scheme is run by the Social Welfare Department and covers three groups: senior citizens (Mukhyamantri Vridhjan Pension Yojana), widows (Laxmibai Samajik Suraksha Pension Yojana) and persons with disability. From June 2025 the monthly amount was raised from ₹400 to ₹1,100.",
        hi: "बिहार सामाजिक सुरक्षा पेंशन योजना सामाजिक कल्याण वि द्वारा चलाई जाती है और इसमें तीन समूह आते हैं — वरिष्ठ नागरिक (मुख्यमंत्री वृद्धजन पेंशन योजना), विधवाएँ (लक्ष्मीबाई सामाजिक सुरक्षा पेंशन योजना) एवं दिव्यांगजन। जून 2025 से मासिक राशि ₹400 से ₹1,100 की गई है।",
      },
      {
        en: "Pension is credited through Direct Benefit Transfer on a fixed monthly cycle. The state has linked payment to Aadhaar seeding in the bank account and to periodic e-KYC of the pensioner — a large share of stopped pensions is caused by missing e-KYC, not by loss of eligibility.",
        hi: "पेंशन निश्चित मासिक चक्र पर डी.बी.टी. से जमा होती है। राज्य ने भुगतान को बैंक खाते में आधार सीडिंग और समय-समय पर होने वाले e-KYC से जोड़ा है — रुकी हुई पेंशन का बड़ा कारण e-KYC की कमी है, पात्रता का नहीं।",
      },
    ],
    eligibility: [
      {
        en: "Old-age pension: applicant is a resident of Bihar and has completed 60 years.",
        hi: "वृद्धावस्था पेंशन: आवेदक बिहार के निवासी हों और 60 वर्ष पूर्ण हो चुके हों।",
      },
      {
        en: "Widow pension: the applicant is a widow resident of the state, as defined in the scheme guidelines.",
        hi: "विधवा पेंशन: आवेदक राज्य की निवासी विधवा हों, जैसाकि योजना दिशानिर्देश में परिभाषित है।",
      },
      {
        en: "Disability pension: applicant holds a valid disability certificate of the notified benchmark.",
        hi: "दिव्यांग पेंशन: आवेदक के पास अधिसूचित benchmark का मान्य दिव्यांगता प्रमाण पत्र हो।",
      },
      {
        en: "An Aadhaar-seeded bank account in the applicant's own name and completed e-KYC are required for payment.",
        hi: "भुगतान के लिए आवेदक के अपने नाम का आधार-सीडेड बैंक खाता और पूर्ण e-KYC आवश्यक है।",
      },
      {
        en: "The state notification sets the final conditions; the department publishes and verifies the beneficiary list.",
        hi: "अंतिम शर्तें राज्य अधिसूचना से तय होती हैं; लाभार्थी सूची का सत्यापन एवं प्रकाशन विभाग द्वारा होता है।",
      },
    ],
    benefits: [
      { en: "₹1,100 per month, credited directly to the bank account", hi: "₹1,100 प्रति माह, सीधे बैंक खाते में जमा" },
      { en: "No contribution from the beneficiary", hi: "लाभार्थी से कोई अंशदान नहीं" },
      { en: "One pensioner can be paid across all three heads only as per scheme rules", hi: "तीनों शीर्षकों पर एक साथ पात्रता योजना नियमों के अनुसार ही" },
      { en: "Payment on the notified monthly date through DBT", hi: "अधिसूचित मासिक तिथि पर DBT से भुगतान" },
    ],
    requiredDocs: ["aadhaar", "bank", "domicile", "ageProof", "photo", "lifeCertificate"],
    optionalDocs: ["ration", "widow", "disability", "pensionBook", "aadhaarMobile"],
    process: [
      {
        en: "Confirm which head applies — old age, widow or disability — and check that the bank account is in the applicant's name and Aadhaar-seeded.",
        hi: "पहले तय करें कि कौन-सा शीर्षक लागू होता है — वृद्धावस्था, विधवा या दिव्यांगता — और खाता आवेदक के नाम पर आधार-सीडेड है, यह जाँचें।",
      },
      {
        en: "Apply online through the Bihar e-District / service portal (serviceonline.bihar.gov.in) or submit the printed form at the block office or through the panchayat.",
        hi: "बिहार e-District / सेवा पोर्टल (serviceonline.bihar.gov.in) से ऑनलाइन आवेदन करें या छपा फ़ॉर्म ब्लॉक कार्यालय/पंचायत के माध्यम से जमा करें।",
      },
      {
        en: "The application is verified by the functionary named in the state process and forwarded for sanction.",
        hi: "राज्य प्रक्रिया में नामित अधिकारी आवेदन का सत्यापन करते हैं और स्वीकृति के लिए अग्रेषित करते हैं।",
      },
      {
        en: "After sanction, complete e-KYC and keep the mobile linked to Aadhaar so payment instructions are not held back.",
        hi: "स्वीकृति के बाद e-KYC पूर्ण करें और मोबाइल को आधार से जोड़े रखें ताकि भुगतान रुके नहीं।",
      },
      {
        en: "Track the application status with the acknowledgement number; if rejected, get the written reason and correct the defect.",
        hi: "स्वीकृति संख्या से स्थिति जानें; रद्द होने पर लिखित कारण लें और कमी पूरी करें।",
      },
    ],
    officialUrl: "https://serviceonline.bihar.gov.in",
    officialLabel: { en: "Bihar e-District service portal", hi: "बिहार e-District सेवा पोर्टल" },
    myschemeHint: {
      en: "Search 'Social Security Pension' on myscheme.gov.in or ask at the block welfare desk.",
      hi: "myscheme.gov.in पर 'सामाजिक सुरक्षा पेंशन' खोजें या ब्लॉक कल्याण काउंटर पर पूछें।",
    },
    ruleSets: [
      {
        criteria: { ages: ["60plus"] },
        reason: {
          en: "Age 60 or above — the old-age head of the state social security pension is open to senior citizens resident in Bihar.",
          hi: "आयु 60 या अधिक — राज्य सामाजिक सुरक्षा पेंशन का वृद्धावस्था शीर्षक बिहार के निवासी वरिष्ठ नागरिकों के लिए खुला है।",
        },
      },
      {
        criteria: { genders: ["female"], anyDocs: ["widow", "ration"] },
        reason: {
          en: "You indicated the widow document category (death certificate / single-member card). Widows may apply under the Laxmibai head.",
          hi: "आपने विधवा श्रेणी का दस्तावेज़ (मृत्यु प्रमाण पत्र/एक-सदस्य कार्ड) दर्ज किया। विधवाएँ लक्ष्मीबाई शीर्षक पर आवेदन कर सकती हैं।",
        },
      },
      {
        criteria: { disability: "yes" },
        reason: {
          en: "A person with benchmark disability is in the household — the disability pension head applies, subject to a valid UDID certificate.",
          hi: "परिवार में benchmark दिव्यांग सदस्य हैं — दिव्यांगता पेंशन शीर्षक लागू हो सकता है, मान्य यू.डी.आई.डी. प्रमाण पर।",
        },
      },
    ],
    pilotTargetApplications: 120,
  },
  {
    slug: "ayushman-bharat-pmjay",
    name: {
      en: "Ayushman Bharat – PM-JAY",
      hi: "आयुष्मान भारत – पीएम-जय",
    },
    shortName: { en: "Ayushman Bharat", hi: "आयुष्मान भारत" },
    categories: ["healthcare"],
    tagline: { en: "₹5 lakh health cover per family per year", hi: "प्रति परिवार वार्षिक ₹5 लाख स्वास्थ्य सुरक्षा" },
    cardSummary: {
      en: "Cashless cover for secondary and tertiary hospital treatment for families on the government's eligible list, at empanelled public and private hospitals.",
      hi: "सरकारी पात्र सूची में शामिल परिवारों के लिए द्वितीयक एवं तृतीयक अस्पताल उपचार की कैशलेस सुविधा, चयनित सरकारी व निजी अस्पतालों में।",
    },
    benefit: {
      en: "Up to ₹5 lakh per family per year, no cap on family size or age",
      hi: "प्रति परिवार वार्षिक ₹5 लाख तक, परिवार के आकार या आयु की सीमा नहीं",
    },
    potentialBeneficiaries: {
      en: "Families identified through deprivation criteria in official data (DFF / state list), plus senior citizens 70+ under the extension for eligible elders.",
      hi: "आधिकारिक डेटा में वंचना मानदंडों से चिह्नित परिवार (DFF/राज्य सूची), तथा 70+ वर्ष के पात्र वरिष्ठ नागरिक (विस्तार के तहत)।",
    },
    icon: "HeartPulse",
    overview: [
      {
        en: "PM-JAY is a family-based health insurance cover administered by the National Health Authority. Entitlement is decided by whether the family appears in the government's eligible-family list, not by an income certificate the applicant produces.",
        hi: "पीएम-जय एक पारिवारिक स्वास्थ्य बीमा कवरेज है जो राष्ट्रीय स्वास्थ्य प्राधिकरण द्वारा प्रशासित होता है। पात्रता इस बात से तय होती है कि परिवार सरकारी पात्र-सूची में है या नहीं — आवेदक का आय प्रमाण पत्र से नहीं।",
      },
      {
        en: "Eligible families get an Ayushman Card and can get treatment at any empanelled hospital, with the package rate settled between the hospital and the authority. There is no premium to pay.",
        hi: "पात्र परिवारों को आयुष्मान कार्ड मिलता है और वे किसी भी चयनित अस्पताल में उपचार ले सकते हैं; पैकेज दर अस्पताल और निकाय के बीच निपटती है। कोई प्रीमियम नहीं देना होता।",
      },
    ],
    eligibility: [
      {
        en: "The family name must appear in the official eligible list (based on deprivation criteria) or be added under the applicable state extension.",
        hi: "परिवार का नाम आधिकारिक पात्र सूची (वंचना मानदंड आधारित) में हो, या राज्य विस्तार के तहत जोड़ा जाए।",
      },
      {
        en: "No age limit and no contribution for families on the eligible list.",
        hi: "पात्र सूची में शामिल परिवारों के लिए कोई आयु सीमा नहीं, कोई अंशदान नहीं।",
      },
      {
        en: "Aadhaar with a verified mobile number is used to generate the eCard.",
        hi: "eकार्ड बनाने के लिए आधार और सत्यापित मोबाइल नंबर उपयोग होता है।",
      },
      {
        en: "The family must not be excluded under the checklist (for example institutional holders or specified excluded categories) as per current guidelines.",
        hi: "परिवार वर्तमान दिशानिर्देशों की बहिर्सूची (उदा. संस्थागत खाते या निश्चित अपवर्जित श्रेणियाँ) में नहीं होना चाहिए।",
      },
    ],
    benefits: [
      {
        en: "Cashless treatment up to ₹5 lakh a year for secondary and tertiary care at any empanelled hospital across India",
        hi: "देश के किसी भी चयनित अस्पताल में द्वितीयक एवं तृतीयक उपचार हेतु वार्षिक ₹5 लाख तक कैशलेस उपचार",
      },
      {
        en: "Cover is per family and portable — no cap on the number of members or on illness type",
        hi: "कवरेज प्रति परिवार और पोर्टेबल — सदस्यों या रोग के प्रकार की सीमा नहीं",
      },
      {
        en: "No premium, no waiting period for pre-existing conditions under the scheme rules",
        hi: "योजना नियमों के अनुसार कोई प्रीमियम नहीं, पहले से_existing स्थितियों के लिए प्रतीक्षा काल नहीं",
      },
      { en: "Free eCard generation and health check camps at CSCs", hi: "सी.एस.सी. पर निःशुल्क eकार्ड एवं स्वास्थ्य जाँच शिविर" },
    ],
    requiredDocs: ["aadhaar", "ration", "aadhaarMobile", "photo"],
    optionalDocs: ["ageProof", "income", "caste"],
    process: [
      {
        en: "Check the family name on the official 'Am I Eligible' search using Aadhaar or ration card details.",
        hi: "आधिकारिक 'मैं पात्र हूँ?' खोज में आधार या राशन कार्ड विवरण से परिवार का नाम जाँचें।",
      },
      {
        en: "If the name is on the list, generate the Ayushman eCard at a CSC / Ayushman facilitator desk with biometric or OTP verification.",
        hi: "नाम सूची में हो तो सी.एस.सी./आयुष्मान सुविधा केंद्र पर बायोमेट्रिक या OTP सत्यापन से eकार्ड बनवाएँ।",
      },
      {
        en: "If the family qualifies under the senior-citizen extension (70+), apply through that notified route.",
        hi: "यदि परिवार वरिष्ठ नागरिक विस्तार (70+) के तहत पात्र है, तो अधिसूचित माध्यम से आवेदन करें।",
      },
      {
        en: "At the hospital, present the card at the Ayushman desk; the hospital completes the pre-authorisation with the authority.",
        hi: "अस्पताल में कार्ड आयुष्मान काउंटर पर दिखाएँ; अस्पताल निकाय के साथ pre-authorisation पूरा करता है।",
      },
      {
        en: "Keep the discharge summary and the acknowledgement for the file — needed for follow-up and for future claims.",
        hi: "डिस्चार्ज सारांश और पावती फ़ाइल में रखें — फ़ॉलो-अप और आगे के दावों के लिए ज़रूरी।",
      },
    ],
    officialUrl: "https://pmjay.gov.in",
    officialLabel: { en: "PM-JAY official portal", hi: "पीएम-जय आधिकारिक पोर्टल" },
    myschemeHint: {
      en: "Eligibility check: pmjay.gov.in → 'Am I Eligible'. Helpline 14555.",
      hi: "पात्रता जाँच: pmjay.gov.in → 'मैं पात्र हूँ?'। हेल्पलाइन 14555।",
    },
    ruleSets: [
      {
        criteria: { noDocs: ["ayushman"], occupations: unorganised },
        reason: {
          en: "Your household works in cultivated land, wage work or the unorganised sector and has no Ayushman card yet — the name should be checked on the eligible list.",
          hi: "आपका परिवार खेती, मज़दूरी या असंगठित क्षेत्र से जुड़ा है और अभी आयुष्मान कार्ड नहीं है — नाम पात्र सूची में ज़रूर जाँचें।",
        },
      },
      {
        criteria: { ages: ["60plus"], noDocs: ["ayushman"] },
        reason: {
          en: "A senior citizen of 60+ is in the household; the notified 70+ senior citizen route may make an Ayushman card possible even without a list match.",
          hi: "परिवार में 60+ वरिष्ठ नागरिक हैं; अधिसूचित 70+ वरिष्ठ नागरिक मार्ग से सूची-मेल के बिना भी आयुष्मान कार्ड संभव है।",
        },
      },
      {
        criteria: { anyDocs: ["ayushman"] },
        reason: {
          en: "You already hold an Ayushman card — check that the card lists every family member and that eKYC is complete before hospital admission.",
          hi: "आपके पास आयुष्मान कार्ड है — भर्ती से पहले जाँचें कि कार्ड में सभी सदस्य हों और eKYC पूर्ण है।",
        },
      },
    ],
    pilotTargetApplications: 90,
  },
  {
    slug: "e-shram-uan",
    name: { en: "e-Shram (UMIN / UAN)", hi: "ई-श्रम (यू.ए.एन.)" },
    shortName: { en: "e-Shram", hi: "ई-श्रम" },
    categories: ["employment", "insurance"],
    tagline: { en: "Free identity card for unorganised workers", hi: "असंगठित श्रमिकों हेतु निःशुल्क पहचान पत्र" },
    cardSummary: {
      en: "A free national registration for unorganised, migrant and gig workers that gives a Universal Account Number and links the worker to notified benefits and other schemes.",
      hi: "असंगठित, प्रवासी व गिग श्रमिकों का निःशुल्क राष्ट्रीय पंजीकरण, जिसमें यूनिवर्सल अकाउंट नंबर मिलता है और श्रमिक अधिसूचित लाभों तथा अन्य योजनाओं से जुड़ते हैं।",
    },
    benefit: { en: "Free UAN card; access to notified benefits and scheme linkages", hi: "निःशुल्क यू.ए.एन. कार्ड; अधिसूचित लाभों व योजना-संलग्नता" },
    potentialBeneficiaries: {
      en: "Unorganised-sector workers aged 16 to 60 — cultivators, labourers, daily-wage and home-based workers, migrant and gig workers, small shopkeepers.",
      hi: "16 से 60 वर्ष की आयु के असंगठित क्षेत्र के श्रमिक — किसान, मज़दूर, दिहाड़ी, घरेलू आधारित, प्रवासी व गिग कार्यकर्ता, छोटे दुकानदार।",
    },
    icon: "HardHat",
    overview: [
      {
        en: "e-Shram is a national database of unorganised workers maintained by the Ministry of Labour and Employment. Registration is free and gives a Universal Account Number (UAN) with an Aadhaar-linked profile, family details and occupation.",
        hi: "ई-श्रम श्रम एवं रोज़गार मंत्रालय का असंगठित श्रमिकों का राष्ट्रीय डेटाबेस है। पंजीकरण निःशुल्क है और इसमें आधार-संलग्न प्रोफ़ाइल, परिवार विवरण एवं व्यावसाय के साथ यूनिवर्सल अकाउंट नंबर (UAN) मिलता है।",
      },
      {
        en: "The UAN card is meant to be a single identity a worker can use across states, and it becomes the route through which several other benefits — insurance, social security and scheme linkages — are delivered.",
        hi: "यू.ए.एन. कार्ड एक पहचान है जो श्रमिक विभिन्न राज्यों में उपयोग कर सकता है, और कई अन्य लाभ — बीमा, सामाजिक सुरक्षा व योजना-जुड़ाव — इसी के माध्यम से दिए जाते हैं।",
      },
    ],
    eligibility: [
      { en: "Age 16 to 60 years.", hi: "आयु 16 से 60 वर्ष।" },
      {
        en: "Working in the unorganised sector, self-employed, home-based, migrant, gig or platform work.",
        hi: "असंगठित क्षेत्र, स्वरोजगार, घरेलू आधारित, प्रवासी, गिग या प्लेटफ़ॉर्म कार्य।",
      },
      {
        en: "Aadhaar with a mobile number that can receive OTP.", hi: "आधार, जिससे जुड़ा मोबाइल OTP प्राप्त कर सके।",
      },
      {
        en: "Should not be an income-tax payer and not covered by EPFO/ESIC (as per the registration conditions on the portal).",
        hi: "आयकरदाता नहीं हों और EPFO/ESIC के अंतर्गत नहीं (पोर्टल की पंजीकरण शर्तों के अनुसार)।",
      },
      {
        en: "Bank account details and self-occupation are required to complete the profile.",
        hi: "प्रोफ़ाइल पूर्ण करने हेतु बैंक खाता विवरण एवं स्व-व्यावसाय आवश्यक।",
      },
    ],
    benefits: [
      { en: "Free UAN-cum-e-Shram card, valid as a worker identity", hi: "निःशुल्क यू.ए.एन./ई-श्रम कार्ड, श्रमिक पहचान के रूप में" },
      { en: "Portability across states and occupations", hi: "राज्यों एवं व्यावसायों के बीच पोर्टेबिलिटी" },
      {
        en: "Direct channel for notified benefits such as accident/insurance cover and other labour schemes",
        hi: "दुर्घटना/बीमा कवरेज सहित अधिसूचित लाभों एवं श्रमिक योजनाओं का सीधा माध्यम",
      },
      { en: "Helps establish work history for wage or distress support", hi: "मज़दूरी व आपात सहायता के लिए कार्य-इतिहास स्थापित करना" },
    ],
    requiredDocs: ["aadhaar", "aadhaarMobile", "bank", "occupationProof"],
    optionalDocs: ["pan", "photo", "ration"],
    process: [
      { en: "Open e-Shram registration on eshram.gov.in or through a facilitator at your block office.", hi: "eshram.gov.in पर या ब्लॉक कार्यालय के सहायक केंद्र से पंजीकरण करें।" },
      { en: "Enter Aadhaar and the Aadhaar-linked mobile number, verify by OTP.", hi: "आधार एवं आधार-संलग्न मोबाइल दर्ज करें, OTP से सत्यापित करें।" },
      { en: "Fill family details, occupation and bank account; save the UAN.", hi: "परिवार विवरण, व्यावसाय और बैंक खाता भरें; यू.ए.एन. सुरक्षित करें।" },
      { en: "Download or collect the e-Shram card and keep a copy in the household file.", hi: "ई-श्रम कार्ड डाउनलोड/प्राप्त कर परिवार फ़ाइल में रखें।" },
      { en: "Update the profile on any change of occupation, mobile or bank account.", hi: "व्यावसाय, मोबाइल या खाता बदलने पर प्रोफ़ाइल अद्यतन करें।" },
    ],
    officialUrl: "https://eshram.gov.in",
    officialLabel: { en: "e-Shram national portal", hi: "ई-श्रम राष्ट्रीय पोर्टल" },
    myschemeHint: { en: "UMANG app and CSC centres also offer e-Shram registration.", hi: "उमंग ऐप व सी.एस.सी. केंद्र पर भी पंजीकरण होता है।" },
    ruleSets: [
      {
        criteria: { ages: ["14-17", "18-25", "26-44", "45-59"], occupations: unorganised },
        reason: {
          en: "Age 16–60 and work outside organised employment — the group e-Shram registration is designed for.",
          hi: "आयु 16–60 और संगठित रोज़गार के बाहर का कार्य — यही समूह ई-श्रम पंजीकरण के लिए बना है।",
        },
      },
      {
        criteria: { occupations: ["migrant", "dailyWage", "artisan", "transport", "shopkeeper", "selfEmployed"] },
        reason: {
          en: "Your listed occupation is one of the unorganised-sector categories accepted on the portal.",
          hi: "आपका दर्ज व्यावसाय पोर्टल पर स्वीकार्य असंगठित क्षेत्र श्रेणी में आता है।",
        },
      },
    ],
    pilotTargetApplications: 80,
  },
  {
    slug: "mgnrega-job-card",
    name: { en: "MGNREGA Job Card", hi: "मनरेगा जॉब कार्ड" },
    shortName: { en: "MGNREGA Job Card", hi: "मनरेगा जॉब कार्ड" },
    categories: ["employment"],
    tagline: { en: "Guaranteed rural wage employment", hi: "ग्रामीण न्यूनतम गारंटी मज़दूरी" },
    cardSummary: {
      en: "A household job card that gives the right to demand manual wage work under the employment guarantee, with wages paid into the cardholder's account.",
      hi: "परिवार का जॉब कार्ड, जिससे रोज़गार गारंटी के अंतर्गत शारीरिक श्रम का काम माँगने का अधिकार मिलता है और मज़दूरी खाते में दी जाती है।",
    },
    benefit: {
      en: "At least 100 days of guaranteed wage employment per household per financial year, at the state-notified MGNREGA wage rate",
      hi: "प्रति वित्त वर्ष प्रति परिवार कम-से-कम 100 दिन गारंटीकृत मज़दूरी रोज़गार, राज्य-अधिसूचित दर पर",
    },
    potentialBeneficiaries: {
      en: "Rural households where adult members are willing to do manual unskilled work — priority to landless labourers, small and marginal farmers, SC/ST and BPL households.",
      hi: "ग्रामीण परिवार जिनके वयस्क सदस्य अकुशल शारीरिक श्रम के लिए तैयार हों — भूमिहीन मज़दूर, लघु व सीमांत किसान, अनु.जा./अ.ज.जा. एवं गरीबी रेखा से नीचे के परिवारों को प्राथमिकता।",
    },
    icon: "Briefcase",
    overview: [
      {
        en: "The Mahatma Gandhi National Rural Employment Guarantee Act gives a rural household the right to demand at least 100 days of unskilled manual work in a financial year. Some states have extended the guarantee beyond 100 days by state notification.",
        hi: "महात्मा गांधी ग्रामीण रोज़गार गारंटी अधिनियम ग्रामीण परिवार को प्रति वित्त वर्ष कम-से-कम 100 दिन अकुशल शारीरिक कार्य माँगने का अधिकार देता है। कुछ राज्यों ने राज्य अधिसूचना से यह गारंटी 100 दिन से बढ़ाई है।",
      },
      {
        en: "Work must be offered within fifteen days of demand; if it is not, the household becomes eligible for a social security allowance as notified. Wages are paid into a bank or post office account against muster rolls.",
        hi: "माँग के पंद्रह दिन के भीतर कार्य देय है; न देने पर परिवार को अधिसूचित सामाजिक सुरक्षा भत्ता प्राप्त होता है। मज़दूरी मस्टर रोल के आधार पर बैंक/डाकघर खाते में दी जाती है।",
      },
    ],
    eligibility: [
      { en: "The applicant is an adult member (18+) of a rural household.", hi: "आवेदक ग्रामीण परिवार का वयस्क सदस्य (18+) हो।" },
      { en: "The household is willing to offer manual unskilled labour under the Act.", hi: "परिवार अधिनियम के अंतर्गत अकुशल शारीरिक श्रम देने के लिए तैयार हो।" },
      { en: "One job card per household, carrying every adult member's name and photograph.", hi: "प्रति परिवार एक जॉब कार्ड, जिसमें सभी वयस्क सदस्यों के नाम व फ़ोटो हों।", },
      { en: "A bank or post office account in whose name wage can be paid (joint accounts accepted).", hi: "बैंक/डाकघर खाता जिसमें मज़दूरी दी जा सके (संयुक्त खाता स्वीकार्य)।" },
    ],
    benefits: [
      { en: "Minimum 100 days of wage employment per household per year", hi: "प्रति परिवार वर्ष में न्यूनतम 100 दिन मज़दूरी रोज़गार" },
      { en: "Wage at the notified state rate for the unskilled/skilled category", hi: "अकुशल/कुशल श्रेणी हेतु अधिसूचित राज्य दर पर मज़दूरी" },
      { en: "Work within 15 days of demand, or social security allowance", hi: "माँग के 15 दिन में कार्य, अन्यथा सामाजिक सुरक्षा भत्ता" },
      { en: "Wage paid to account with a wage slip; worksite amenities as per guidelines", hi: "मज़दूरी खाते में, मज़दूरी स्लिप के साथ; कार्यस्थल सुविधाएँ दिशानिर्देश अनुसार" },
    ],
    requiredDocs: ["jobcard", "ration", "aadhaar", "bank", "photo"],
    optionalDocs: ["land", "caste", "ageProof", "voterId"],
    process: [
      { en: "Apply for a job card at the gram panchayat office, or through the state MGNREGA portal.", hi: "ग्राम पंचायत कार्यालय या राज्य मनरेगा पोर्टल से जॉब कार्ड हेतु आवेदन करें।" },
      { en: "The panchayat issues the job card within the notified period; verify all adult names, photos and the account details.", hi: "पंचायत अधिसूचित अवधि में कार्ड जारी करती है; सभी वयस्क नाम, फ़ोटो व खाता विवरण जाँचें।" },
      { en: "Submit the written/online employment demand for the required number of days and keep the receipt number.", hi: "आवश्यक दिनों का लिखित/ऑनलाइन रोज़गार माँग-पत्र दें और पावती संख्या रखें।" },
      { en: "Work is allotted with a duty slip; attendance is in the muster roll and wage follows to the account.", hi: "कार्य आवंटन ड्यूटी स्लिप के साथ; उपस्थिति मस्टर रोल में और मज़दूरी खाते में।" },
      { en: "If work is not provided in fifteen days, apply for the social security allowance with the same receipt.", hi: "15 दिन में कार्य न मिलने पर उसी पावती से सामाजिक सुरक्षा भत्ता माँगें।" },
    ],
    officialUrl: "https://nrega.nic.in",
    officialLabel: { en: "NREGA national portal (soft copies of job cards & reports)", hi: "मनरेगा राष्ट्रीय पोर्टल (जॉब कार्ड व रिपोर्ट)" },
    myschemeHint: { en: "Bihar's state MGNREGA page and the programme office at Shahpur block handle applications.", hi: "बिहार का राज्य मनरेगा पृष्ठ व शाहपुर प्रखंड कार्यालय आवेदन लेते हैं।" },
    ruleSets: [
      {
        criteria: { occupations: ["agriLabour", "dailyWage", "cultivator", "unemployed", "homemaker", "migrant", "artisan", "transport"], incomes: ["below60k", "60k-1.2L", "1.2L-2.5L", "preferNot"] },
        reason: {
          en: "Your household works on wages or small land and income is within the rural-work profile — the employment guarantee applies to any rural household willing to work.",
          hi: "आपका परिवार मज़दूरी या छोटी खेती से जुड़ा है और आय ग्रामीण-कार्य प्रोफ़ाइल में है — कार्य करने को तैयार किसी भी ग्रामीण परिवार पर गारंटी लागू होती है।",
        },
      },
      {
        criteria: { noDocs: ["jobcard"] },
        reason: {
          en: "No job card is on record for this household yet, which is the first thing needed to demand work.",
          hi: "इस परिवार का जॉब कार्ड अभी दर्ज नहीं — काम माँगने के लिए यही पहली शर्त है।",
        },
      },
    ],
    pilotTargetApplications: 95,
  },
  {
    slug: "pm-suraksha-bima-yojana",
    name: { en: "Pradhan Mantri Suraksha Bima Yojana", hi: "प्रधानमंत्री सुरक्षा बीमा योजना" },
    shortName: { en: "PMSBY Insurance", hi: "पीएम सुरक्षा बीमा" },
    categories: ["insurance"],
    tagline: { en: "₹20 a year accident cover", hi: "₹20 वार्षिक प्रीमियम पर दुर्घटना कवरेज" },
    cardSummary: {
      en: "A low-cost yearly accident insurance taken through your own bank or post office account, covering accidental death and disability.",
      hi: "अपने बैंक/डाकघर खाते से ली जाने वाली सस्ती वार्षिक दुर्घटना बीमा, जो दुर्घटनावश मृत्यु एवं दिव्यांगता कवरेज देती है।",
    },
    benefit: {
      en: "₹2 lakh on accidental death or total permanent disability, ₹1 lakh on partial permanent disability, ₹10,000 medical expenses — premium ₹20 a year",
      hi: "दुर्घटनावश मृत्यु/पूर्ण स्थायी दिव्यांगता पर ₹2 लाख, आंशिक स्थायी दिव्यांगता पर ₹1 लाख, चिकित्सा व्यय ₹10,000 — वार्षिक प्रीमियम ₹20",
    },
    potentialBeneficiaries: {
      en: "Savings bank or post office account holders aged 18 to 70 who give consent for auto-debit of the premium.",
      hi: "18 से 70 वर्ष आयु के बचत बैंक/डाकघर खाताधारक जो प्रीमियम auto-debit की सहमति देते हैं।",
    },
    icon: "ShieldCheck",
    overview: [
      {
        en: "PMSBY is administered through the Jan Suraksha portals with insurance companies, and enrolment is done against a single savings bank or post office account through an annual auto-debit mandate of ₹20.",
        hi: "पीएम सुरक्षा बीमा जन सुरक्षा पोर्टल एवं बीमा कंपनियों के माध्यम से संचालित होती है; नामांकन किसी एक बचत बैंक/डाकघर खाते पर ₹20 की वार्षिक auto-debit अनुमति से होता है।",
      },
      {
        en: "The cover runs for one policy year and renews automatically if the premium is debited. One person can join through only one account and one claim is payable.",
        hi: "कवरेज एक बीमा वर्ष के लिए और प्रीमियम कटने पर स्वतः नवीनीकृत; एक व्यक्ति एक ही खाते से जुड़ सकता है और एक ही दावा स्वीकार्य है।",
      },
    ],
    eligibility: [
      { en: "Age 18 to 70 years (age nearer birthday at enrolment).", hi: "आयु 18 से 70 वर्ष (नामांकन पर नजदीकी जन्मदिन आधारित)।" },
      { en: "A savings bank or post office account in the applicant's own name (not an institutional account).", hi: "आवेदक के अपने नाम का बचत बैंक/डाकघर खाता (संस्थागत खाता नहीं)।" },
      { en: "Aadhaar for KYC and consent for auto-debit of the ₹20 premium each year.", hi: "KYC हेतु आधार और वार्षिक ₹20 प्रीमियम auto-debit की सहमति।" },
      { en: "The account must be Aadhaar-seeded so the debit and claim credit can pass.", hi: "खाता आधार-सीडेड हो ताकि प्रीमियम कटौती व दावा जमा हो सके।" },
    ],
    benefits: [
      { en: "₹2,00,000 for accidental death or total permanent disability", hi: "दुर्घटनावश मृत्यु या पूर्ण स्थायी दिव्यांगता पर ₹2,00,000" },
      { en: "₹1,00,000 for partial permanent disability", hi: "आंशिक स्थायी दिव्यांगता पर ₹1,00,000" },
      { en: "₹10,000 towards hospitalisation for the accident", hi: "दुर्घटना के उपचार हेतु ₹10,000" },
      { en: "Premium of only ₹20 a year, debited automatically", hi: "केवल ₹20 वार्षिक प्रीमियम, स्वतः देय" },
    ],
    requiredDocs: ["aadhaar", "bank", "aadhaarMobile"],
    optionalDocs: ["pan", "ageProof", "photo"],
    process: [
      { en: "Collect the PMSBY auto-debit mandate form from your bank branch or the Jan Suraksha portal.", hi: "अपनी शाखा या जन सुरक्षा पोर्टल से auto-debit फ़ॉर्म लें।" },
      { en: "Fill account details and Aadhaar, tick the auto-debit consent for the annual ₹20 premium.", hi: "खाता व आधार विवरण भरें, वार्षिक ₹20 हेतु consent चुनें।" },
      { en: "Submit to the branch/banking correspondent; the insurer issues the policy and a cover note.", hi: "शाखा/बैंकिंग सुविधा केंद्र पर जमा करें; बीमा कंपनी पॉलिसी जारी करती है।" },
      { en: "Renewal happens each year on the due date; make sure the account has the ₹20 on that date.", hi: "हर वर्ष नियत तिथि पर नवीनीकरण; उस दिन खाते में ₹20 रखें।" },
      { en: "For a claim, notify the bank/insurer promptly with the FIR, discharge summary or death certificate as required.", hi: "दावे हेतु तुरंत सूचित करें और एफ़आईआर/डिस्चार्ज सारांश/मृत्यु प्रमाण पत्र दें।" },
    ],
    officialUrl: "https://www.jansuraksha.gov.in",
    officialLabel: { en: "Jan Suraksha official portal", hi: "जन सुरक्षा आधिकारिक पोर्टल" },
    myschemeHint: { en: "Enrolment is also available through banks, post offices and the bank's mobile/online banking.", hi: "बैंक, डाकघर व मोबाइल बैंकिंग से भी नामांकन संभव।" },
    ruleSets: [
      {
        criteria: { ages: ["18-25", "26-44", "45-59", "60plus"], allDocs: ["bank"] },
        reason: {
          en: "You are in the 18–70 enrolment window and hold a savings account, which is what PMSBY needs for premium auto-debit.",
          hi: "आप 18–70 की आयु सीमा में हैं और बचत खाता आपके पास है — प्रीमियम auto-debit के लिए यही चाहिए।",
        },
      },
      {
        criteria: { occupations: unorganised },
        reason: {
          en: "Accident risk is highest in wage, farm and transport work — this cover is designed for exactly that group.",
          hi: "मज़दूरी, खेती व परिवहन के काम में दुर्घटना का जोखिम सर्वाधिक — यह कवरेज उन्हीं के लिए है।",
        },
      },
    ],
    pilotTargetApplications: 70,
  },
  {
    slug: "post-matric-scholarship",
    name: { en: "Post-Matric Scholarship (NSP)", hi: "पोस्ट-मैट्रिक छात्रवृत्ति (एन.एस.पी.)" },
    shortName: { en: "Post-Matric Scholarship", hi: "पोस्ट-मैट्रिक छात्रवृत्ति" },
    categories: ["education"],
    tagline: { en: "Scholarship for study after class 10", hi: "कक्षा 10 के बाद की पढ़ाई पर छात्रवृत्ति" },
    cardSummary: {
      en: "Maintenance allowance and fee support for students studying after class 10, applied for on the National Scholarship Portal and paid to the student's bank account.",
      hi: "कक्षा 10 के बाद पढ़ने वाले विद्यार्थियों हेतु पोषण भत्ता एवं शुल्क सहायता; राष्ट्रीय छात्रवृत्ति पोर्टल पर आवेदन, राशि विद्यार्थी के खाते में।",
    },
    benefit: {
      en: "Maintenance allowance and fee support; the rate depends on category, course group and year of study as notified",
      hi: "पोषण भत्ता एवं शुल्क सहायता; दर श्रेणी, विषय-समूह एवं अध्ययन वर्ष की अधिसूचना पर निर्भर",
    },
    potentialBeneficiaries: {
      en: "Students enrolled in class 11 and above — including ITI, polytechnic and degree courses — who belong to SC/ST/OBC/EBC, minority or other notified categories.",
      hi: "कक्षा 11 एवं उसके बाद — आई.टी.I., पॉलिटेक्निक, स्नातक सहित — के विद्यार्थी, जिनकी श्रेणी अनु.जा./अ.ज.जा./प.स./अ.व.स., अल्पसंख्यक या अन्य अधिसूचित हो।",
    },
    icon: "GraduationCap",
    overview: [
      {
        en: "Post-matric scholarships for school and college students are applied for on the National Scholarship Portal. The ministry schemes fix the categories, the eligible course list and the allowance rates; the institute and the nodal officer then verify the application.",
        hi: "स्कूल एवं महाविद्यालय के विद्यार्थियों हेतु पोस्ट-मैट्रिक छात्रवृत्ति का आवेदन राष्ट्रीय छात्रवृत्ति पोर्टल पर होता है। मंत्रालय की योजनाएँ श्रेणी, पात्र पाठ्यक्रम व भत्ता दर तय करती हैं; संस्थान एवं नोडल अधिकारी सत्यापन करते हैं।",
      },
      {
        en: "Payment goes through DBT to an Aadhaar-seeded account in the student's own name, so a wrong bank detail is the most common reason for money not arriving.",
        hi: "भुगतान DBT से विद्यार्थी के अपने नाम के आधार-सीडेड खाते में जाता है, अतः गलत बैंक विवरण राशि न आने का सबसे आम कारण है।",
      },
    ],
    eligibility: [
      { en: "The student has passed class 10 and is studying post-matric (class 11 onwards, ITI, polytechnic, degree, etc.).", hi: "विद्यार्थी कक्षा 10 उत्तीर्ण कर पोस्ट-मैट्रिक (कक्षा 11 से आगे, आई.टी.I., पॉलिटेक्निक, स्नातक आदि) में अध्ययनरत हों।" },
      { en: "Family income is within the ceiling notified for the particular scholarship.", hi: "पारिवारिक आय संबंधित छात्रवृत्ति की अधिसूचित सीमा के भीतर हो।" },
      { en: "Belongs to the category for which that scholarship is notified (SC/ST/OBC/EBC/minority/pre-portal state schemes).", hi: "उसी श्रेणी से संबंध रखते हैं जिसके लिए योजना अधिसूचित है।" },
      { en: "Minimum attendance / prior-year promotion conditions of the institute apply.", hi: "संस्थान की न्यूनतम उपस्थिति व पूर्व वर्ष की उन्नति शर्तें लागू।" },
      { en: "A bank account in the student's name, Aadhaar-seeded, with mobile-linked IFSC.", hi: "विद्यार्थी के नाम का आधार-सीडेड खाता, मोबाइल-लिंक्ड IFSC के साथ।" },
    ],
    benefits: [
      { en: "Monthly maintenance allowance towards books, stationery, clothing and personal expenses", hi: "पुस्तक, स्टेशनरी, वस्त्र एवं व्यक्तिगत व्यय हेतु मासिक पोषण भत्ता" },
      { en: "Support towards institution fees as per the scheme", hi: "योजना के अनुसार संस्थान शुल्क में सहायता" },
      { en: "One-time help towards admissibility for students with disabilities under the UG-PG scheme", hi: "दिव्यांग विद्यार्थियों हेतु स्नातक-स्नातकोत्तर स्कीम में एककालीन सहायता" },
      { en: "Renewal each year while the course continues with the required result", hi: "अध्ययन जारी रहे और अपेक्षित परिणाम हो हर वर्ष नवीनीकरण" },
    ],
    requiredDocs: ["aadhaar", "bank", "marks", "income", "caste", "photo"],
    optionalDocs: ["ration", "domicile", "ageProof", "aadhaarMobile"],
    process: [
      { en: "Register on scholarships.gov.in with the student's mobile and email before the notified last date.", hi: "अधिसूचित अंतिम तिथि से पहले विद्यार्थी के मोबाइल/ईमेल से scholarships.gov.in पर पंजीकरण करें।" },
      { en: "Select the applicable post-matric scheme, fill academic, family and bank details carefully.", hi: "लागू पोस्ट-मैट्रिक योजना चुनें, शैक्षणिक, पारिवारिक व बैंक विवरण सावधानी से भरें।" },
      { en: "Upload the marksheet, fee receipt, income and category certificate and photo of the student.", hi: "अंक पत्र, शुल्क रसीद, आय व जाति प्रमाण पत्र एवं फ़ोटो अपलोड करें।" },
      { en: "Submit and keep the acknowledgement; the institute verifies, then the district/nodal authority.", hi: "जमा कर पावती रखें; पहले संस्थान, फिर जिला/नोडल अधिकारी सत्यापन करते हैं।" },
      { en: "Track the status on the portal and complete bank-account seeding if the payment is held.", hi: "पोर्टल पर स्थिति जाँचें; भुगतान रुकने पर खाता-सीडिंग पूर्ण करें।" },
    ],
    officialUrl: "https://scholarships.gov.in",
    officialLabel: { en: "National Scholarship Portal", hi: "राष्ट्रीय छात्रवृत्ति पोर्टल" },
    myschemeHint: { en: "Bihar's SC/ST Welfare and EBC directorates also run state post-matric scholarships on the same portal.", hi: "बिहार के अनु.जा./अ.ज.जा. कल्याण एवं अ.व.स. निदेशालय की राज्य छात्रवृत्तियाँ भी इसी पोर्टल पर हैं।" },
    ruleSets: [
      {
        criteria: { ages: ["under14", "14-17", "18-25"], occupations: ["student"] },
        reason: {
          en: "The household has a student — post-matric scholarships apply from class 11 upwards, with category and income conditions.",
          hi: "परिवार में विद्यार्थी है — पोस्ट-मैट्रिक छात्रवृत्ति कक्षा 11 से आगे, श्रेणी व आय शर्तों के साथ लागू होती है।",
        },
      },
      {
        criteria: { ages: ["26-44"], anyDocs: ["marks"] },
        reason: {
          en: "You listed a marksheet/admission document; a family member may still be eligible for a renewal or a course-linked scholarship.",
          hi: "आपने अंक पत्र/प्रवेश दस्तावेज़ दर्ज किया; किसी सदस्य हेतु नवीनीकरण या पाठ्यक्रम-छात्रवृत्ति संभव हो सकती है।",
        },
      },
    ],
    pilotTargetApplications: 55,
  },
  {
    slug: "pmay-gramin",
    name: { en: "Pradhan Mantri Awaas Yojana – Gramin", hi: "प्रधानमंत्री आवास योजना – ग्रामीण" },
    shortName: { en: "PMAY (Gramin)", hi: "पीएमएवाई (ग्रामीण)" },
    categories: ["housing"],
    tagline: { en: "Financial help to build a pucca house", hi: "पक्का मकान बनाने में आर्थिक सहायता" },
    cardSummary: {
      en: "Assistance paid in instalments to identified rural households to build a pucca house, along with toilet support and MGNREGA labour days.",
      hi: "चयनित ग्रामीण परिवारों को पक्का मकान बनाने हेतु किश्तों में दी जाने वाली सहायता, साथ में शौचालय सहायता व मनरेगा श्रम-दिन।",
    },
    benefit: {
      en: "₹1,20,000 per unit in plain areas (60:40 centre–state share), released stage-wise; ₹12,000 for a toilet and 90–95 days of MGNREGA labour",
      hi: "मैदानी क्षेत्र में प्रति इकाई ₹1,20,000 (केंद्र:राज्य 60:40), चरणबद्ध जारी; शौचालय हेतु ₹12,000 एवं 90–95 दिन मनरेगा श्रम",
    },
    potentialBeneficiaries: {
      en: "Rural households that are houseless, or living in a kutcha or dilapidated house, identified through official survey and approved by the gram sabha.",
      hi: "गृहहीन या कच्ची/जर्जर मकान में रहने वाले ग्रामीण परिवार, जिन्हें आधिकारिक सर्वे से चिह्नित कर ग्राम सभा द्वारा स्वीकृत किया जाता है।",
    },
    icon: "House",
    overview: [
      {
        en: "PMAY-Gramin does not accept open applications the way a pension does. Beneficiaries are shortlisted from official survey data (SECC based, plus state house-list exercises such as Bihar's Awas+ survey), verified and approved in the gram sabha, and entered into the scheme MIS.",
        hi: "पीएमएवाई-ग्रामीण में पेंशन की तरह खुला आवेदन नहीं चलता। लाभार्थी आधिकारिक सर्वे डेटा (SECC तथा बिहार के आवास प्लस जैसे राज्य सर्वे) से चुने जाते हैं, ग्राम सभा में सत्यापित/स्वीकृत होते हैं और योजना MIS में दर्ज होते हैं।",
      },
      {
        en: "Money is released in instalments against construction stages (plinth, roof/rateable milestones) after geo-tagging, straight into the beneficiary's account. The minimum house size is 25 sq. m with a space for a toilet.",
        hi: "राशि निर्माण चरणों (नींव/प्लिंथ, छत आदि) पर geo-tagging के बाद किश्तों में सीधे लाभार्थी के खाते में जाती है। न्यूनतम आकार 25 वर्ग मीटर, शौचालय की जगह के साथ।",
      },
    ],
    eligibility: [
      { en: "The household is houseless, or living in a kutcha (ksa) / dilapidated (cad) house.", hi: "परिवार गृहहीन है या कच्ची / जर्जर अवस्था में रहता है।" },
      { en: "No member of the household owns a pucca house with the benefit of any central/state housing scheme.", hi: "परिवार के किसी सदस्य के पास केंद्र/राज्य आवास योजना के लाभ से बना पक्का मकान न हो।" },
      { en: "The name appears in the approved beneficiary list / waitlist of the panchayat.", hi: "नाम पंचायत की स्वीकृत लाभार्थी सूची / प्रतीक्षा सूची में हो।" },
      { en: "An Aadhaar-seeded bank account in the name of the applicant (or joint account with the head of household).", hi: "आवेदक के नाम पर आधार-सीडेड बैंक खाता (परिवार मुखिया के साथ संयुक्त भी)।" },
      { en: "Land or a habitable site is available for construction, as recorded in the file.", hi: "निर्माण हेतु उपलब्ध भूमि/आवासीय स्थल रिकॉर्ड में दर्ज हो।" },
    ],
    benefits: [
      { en: "₹1,20,000 assistance in plain areas for one pucca house unit", hi: "मैदानी क्षेत्र में एक पक्का आवास इकाई हेतु ₹1,20,000 सहायता" },
      { en: "₹12,000 for toilet construction converging with Swachh Bharat Mission (Gramin)", hi: "स्वच्छ भारत मिशन (ग्रामीण) के समन्वय से शौचालय हेतु ₹12,000" },
      { en: "90–95 days of unskilled labour under MGNREGA for house construction", hi: "मकान निर्माण हेतु मनरेगा में 90–95 दिन अकुशल श्रम" },
      { en: "House design suited to local climate and topography", hi: "स्थानीय जलवायु/भू-आकृति अनुकूल गृह-नक्शा" },
    ],
    requiredDocs: ["aadhaar", "bank", "land", "photo", "ration", "jobcard"],
    optionalDocs: ["caste", "income", "domicile", "ageProof"],
    process: [
      { en: "Ask for the household's name to be checked in the panchayat's PMAY-G beneficiary list and waitlist.", hi: "पंचायत की पीएमएवाई-ग्रामीण लाभार्थी सूची व प्रतीक्षा सूची में अपना नाम जाँचने के लिए कहें।" },
      { en: "If the household is not surveyed, request inclusion in the next house-list exercise (Awas+ type survey) at the gram sabha.", hi: "यदि सर्वे नहीं हुआ, ग्राम सभा में आगे के आवास-सर्वे में शामिल करने का अनुरोध करें।" },
      { en: "On sanction, complete the bank seeding and sign the declaration; construction starts with the first instalment for the plinth.", hi: "स्वीकृति पर खाता-सीडिंग व घोषणापत्र पूर्ण करें; पहली किस्त से नींव/प्लिंथ।" },
      { en: "Get each stage geo-tagged from the block/mis portal before the next instalment releases.", hi: "अगली किस्त से पहले प्रत्येक चरण का geo-tagging ब्लॉक/MIS से कराएँ।" },
      { en: "Complete the house within the notified time and obtain the completion verification.", hi: "अधिसूचित समय में आवास पूर्ण कर पूर्णता-सत्यापन कराएँ।" },
    ],
    officialUrl: "https://pmaymis.gov.in",
    officialLabel: { en: "PMAY-Gramin MIS (beneficiary list & status)", hi: "पीएमएवाई-ग्रामीण MIS (सूची व स्थिति)" },
    myschemeHint: { en: "Beneficiary list and waitlist are also displayed at the gram panchayat notice board.", hi: "लाभार्थी व प्रतीक्षा सूची ग्राम पंचायत नोटिस बोर्ड पर भी लगाई जाती है।" },
    ruleSets: [
      {
        criteria: { incomes: lowIncome, anyDocs: ["land", "ration"] },
        reason: {
          en: "Low household income with a record of land or ration card — the profile used in house-list surveys. Ask for your household to be checked in the Awas+/PMAY-G list.",
          hi: "कम आय और खतौनी/राशन कार्ड का रिकॉर्ड — यही आवास-सूची सर्वे की प्रोफ़ाइल है। अपने नाम की आवास प्लस/पीएमएवाई-ग्रामीण सूची में जाँच कराएँ।",
        },
      },
      {
        criteria: { occupations: ["agriLabour", "dailyWage", "migrant", "unemployed"] },
        reason: {
          en: "Landless or wage-dependent households are a priority category in the housing selection criteria.",
          hi: "भूमिहीन या मज़दूरी-निर्भर परिवार आवास चयन में प्राथमिकता श्रेणी हैं।",
        },
      },
    ],
    pilotTargetApplications: 40,
  },
  {
    slug: "nfsa-ration-card-bihar",
    name: { en: "Ration Card (NFSA / ePDS Bihar)", hi: "राशन कार्ड (NFSA / ई-पीडीएस बिहार)" },
    shortName: { en: "Ration Card", hi: "राशन कार्ड" },
    categories: ["ration"],
    tagline: { en: "Subsidised food grains for the household", hi: "परिवार हेतु सहुलियत अनाज" },
    cardSummary: {
      en: "The household card that gives access to subsidised wheat, rice and kerosene through fair price shops, and is the gateway to several other welfare lists.",
      hi: "परिवार का यह कार्ड जो उचित मूल्य की दुकान से सहुलियत गेहूँ, चावल आदि देता है और कई अन्य कल्याण सूचियों की रास्ता भी है।",
    },
    benefit: {
      en: "Food grains at ₹1/₹2/₹3 per kg under NFSA, plus the central free-grain entitlement of 5 kg per person per month as extended by the government",
      hi: "NFSA के अंतर्गत ₹1/₹2/₹3 प्रति किग्रा अनाज, तथा केंद्र सरकार की विस्तारित 5 किग्रा प्रति व्यक्ति प्रति माह मुफ़्त अनाज पात्रता",
    },
    potentialBeneficiaries: {
      en: "Resident households of Bihar entitled under the National Food Security Act, including Antyodaya (AAY) households, priority households, and households without any card yet.",
      hi: "राष्ट्रीय खाद्य सुरक्षा अधिनियम के अंतर्गत बिहार के निवासी परिवार — अन्त्योदय (ए.ए.वाई.), पात्रता परिवार, तथा जिनके पास अभी कोई कार्ड नहीं।",
    },
    icon: "Wheat",
    overview: [
      {
        en: "Ration cards in Bihar are issued and corrected through the state's Public Distribution System portals (ePDS / RC Online) operated by the Food & Consumer Protection Department. Cards are of two broad NFSA types — Antyodaya and Priority — and the household type decides the entitlement.",
        hi: "बिहार में राशन कार्ड राज्य की सार्वजनिक वितरण प्रणाली के पोर्टल (ई-पीडीएस / आर.सी. ऑनलाइन) से, खाद्य एवं उपभोक्ता संरक्षण विभाग द्वारा जारी/संशोधित होते हैं। कार्ड मुख्यतः दो प्रकार के — अन्त्योदय एवं पात्रता; प्रकार से पात्रता तय होती है।",
      },
      {
        en: "Beyond grain, the card is a gateway document: Ayushman, LPG, scholarships and many state schemes check the ration card. Death-name removal, member addition, split cards and eKYC are all handled on the same portal.",
        hi: "अनाज के अलावा कार्ड एक प्रवेश-दस्तावेज़ है: आयुष्मान, एलपीजी, छात्रवृत्ति व कई राज्य योजनाएँ राशन कार्ड जाँचती हैं। मृत सदस्य हटाना, सदस्य जोड़ना, कार्ड विभाजन व eKYC इसी पोर्टल पर होते हैं।",
      },
    ],
    eligibility: [
      { en: "Resident household of the state, with a family head and member details that can be documented.", hi: "राज्य का निवासी परिवार, जिसका मुखिया व सदस्य-विवरण दस्तावेज़ित हो सके।" },
      { en: "Household should not already hold another card in the same state; duplicate cards are rejected or cancelled.", hi: "एक ही राज्य में परिवार का दूसरा कार्ड न हो — दोहरे कार्ड रद्द/अस्वीकृत होते हैं।" },
      { en: "Antyodaya cards go to the poorest households as per state criteria (landless, manual scavenging, widows, disabled, elderly alone, etc.).", hi: "अन्त्योदय कार्ड राज्य मानदंड पर सबसे गरीब परिवारों को (भूमिहीन, विधवा, दिव्यांग, एकल बुज़ुर्ग आदि)।" },
      { en: "Members' Aadhaar/biometric eKYC is required for grain withdrawal at the Fair Price Shop.", hi: "दुकान पर अनाज निकालने हेतु सदस्यों का आधार/जैविक eKYC आवश्यक।" },
      { en: "Final inclusion is verified by the department against revenue and survey records.", hi: "अंतिम समावेश विभाग द्वारा राजस्व/सर्वे रिकॉर्ड से सत्यापित होता है।" },
    ],
    benefits: [
      { en: "Monthly entitlement of food grains per household at NFSA rates", hi: "NFSA दरों पर प्रति परिवार मासिक अनाज पात्रता" },
      { en: "Antyodaya households receive a larger household-level quota", hi: "अन्त्योदय परिवारों को परिवार-स्तरीय बड़ी कोटा" },
      { en: "Free grain entitlement under the central scheme as extended by the government", hi: "केंद्र की योजना के अंतर्गत सरकार के विस्तार तक मुफ़्त अनाज" },
      { en: "Card serves as address and household proof for other welfare services", hi: "कार्ड अन्य कल्याण सेवाओं हेतु पता/परिवार प्रमाण भी है" },
    ],
    requiredDocs: ["ration", "aadhaar", "ageProof", "photo", "bank"],
    optionalDocs: ["domicile", "land", "income", "caste", "aadhaarMobile"],
    process: [
      { en: "Check whether the household already has a card (in any member's name) on the state PDS report before applying for a new one.", hi: "नया आवेदन करने से पहले राज्य PDS रिपोर्ट में जाँचें कि किसी सदस्य के नाम पर कार्ड पहले से तो नहीं।" },
      { en: "Apply for 'New Ration Card (Rural)' on the state ePDS / RC Online portal, or with the block supply officer; keep member-wise Aadhaar and age proofs ready.", hi: "राज्य के ई-पीडीएस / आर.सी. ऑनलाइन पोर्टल पर 'नया राशन कार्ड (ग्रामीण)' हेतु आवेदन करें, या आपूर्ति प्रखंड अधिकारी के पास; प्रत्येक सदस्य का आधार व आयु प्रमाण रखें।" },
      { en: "The application is verified by the BDO/DSO functionary as per the state process; objections are invited publicly.", hi: "आवेदन का सत्यापन बी.डी.ओ./डी.एस.ओ. स्तर पर होता है और आपत्तियाँ सार्वजनिक रूप से आमंत्रित की जाती हैं।" },
      { en: "After issue, complete eKYC at the fair price shop so the whole family can be authenticated at the ePoS machine.", hi: "जारी होने के बाद दुकान पर eKYC पूर्ण करें ताकि पूरा परिवार ePoS पर सत्यापित हो सके।" },
      { en: "For death-name removal, member addition, split or correction, use the same portal with the relevant proof.", hi: "मृत नाम हटाना, सदस्य जोड़ना, विभाजन या सुधार हेतु उसी पोर्टल पर प्रमाण के साथ आवेदन करें।" },
    ],
    officialUrl: "https://epds.bihar.gov.in",
    officialLabel: { en: "ePDS Bihar — Food & Consumer Protection Dept.", hi: "ई-पीडीएस बिहार — खाद्य एवं उपभोक्ता संरक्षण विभाग" },
    myschemeHint: { en: "National entitlement rules are on nfsa.gov.in; Bihar services on epds.bihar.gov.in / rconline.bihar.gov.in.", hi: "राष्ट्रीय पात्रता nfsa.gov.in पर; बिहार की सेवाएँ epds.bihar.gov.in / rconline.bihar.gov.in पर।" },
    ruleSets: [
      {
        criteria: { noDocs: ["ration"] },
        reason: {
          en: "You did not list a ration card. A household without an NFSA card should apply — it also unlocks several other scheme lists.",
          hi: "आपने राशन कार्ड दर्ज नहीं किया। कार्ड के बिना परिवार को आवेदन करना चाहिए — यह कई अन्य सूचियों की चाबी भी है।",
        },
      },
      {
        criteria: { anyDocs: ["ration"], ages: ["60plus", "under14", "14-17", "18-25", "26-44", "45-59"] },
        reason: {
          en: "You hold a card — check that every member is on it, eKYC is complete, and the entitlement is being drawn each month.",
          hi: "कार्ड आपके पास है — जाँचें कि प्रत्येक सदस्य कार्ड में हो, eKYC पूर्ण है और हर माह पात्रता मिल रही है।",
        },
      },
      {
        criteria: { incomes: ["below60k", "60k-1.2L"] },
        reason: {
          en: "Household income is within the range where Antyodaya or priority-household claims are commonly assessed.",
          hi: "पारिवारिक आय उस सीमा में है जहाँ अन्त्योदय या पात्रता-परिवार की पात्रता आमतौर पर परखी जाती है।",
        },
      },
    ],
    pilotTargetApplications: 50,
  },
];

export const schemeBySlug = (slug: string) => schemes.find((s) => s.slug === slug);
