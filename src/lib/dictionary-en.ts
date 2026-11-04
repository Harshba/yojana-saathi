/**
 * English UI strings. Flat keys, one dictionary per language.
 * Data-driven content (schemes, pilot phases, stories) is bilingual inside
 * src/data and is rendered with pick().
 */
const entries = {
  // ---------- Brand / utility ----------
  "brand.name": "Yojana Saathi",
  "brand.tagline": "Har Haq, Har Ghar Tak",
  "brand.subline": "An independent social-impact initiative for rural Bihar",
  "brand.notGov": "Not a government website",

  "top.a11y": "Accessibility",
  "top.textSize": "Text size",
  "top.textDecrease": "Decrease text size",
  "top.textIncrease": "Increase text size",
  "top.textReset": "Reset text size",
  "top.language": "Language / भाषा",
  "top.english": "English",
  "top.hindi": "हिंदी",
  "top.helpline": "Help desk: Mon–Sat, 9:00 am – 6:00 pm",
  "top.support": "Help & Support",
  "top.disclaimer":
    "Independent social-impact initiative. Not affiliated with any government department.",
  "top.officialNote": "Government decisions on eligibility and approval are final.",

  // ---------- Navigation ----------
  "nav.home": "Home",
  "nav.about": "About Us",
  "nav.schemes": "Government Schemes",
  "nav.how": "How It Works",
  "nav.impact": "Our Impact",
  "nav.saathi": "Become a Saathi",
  "nav.contact": "Contact Us",
  "nav.eligibility": "Check Eligibility",
  "nav.privacy": "Privacy & Consent",
  "nav.menu": "Menu",
  "nav.close": "Close menu",
  "nav.cta": "Free eligibility check",
  "nav.section.help": "Help & Support",
  "nav.section.legal": "About this website",

  // ---------- Common ----------
  "common.learnMore": "Learn more",
  "common.details": "Scheme details",
  "common.officialPortal": "Official government portal",
  "common.lastVerified": "Details last checked against official sources",
  "common.demoBadge": "Prototype data",
  "common.demoNote":
    "This website is a public prototype. The figures shown are pilot targets and clearly labelled sample data, not verified service records.",
  "common.optional": "optional",
  "common.requiredField": "This field is required.",
  "common.invalidPhone": "Enter a valid 10-digit mobile number (or leave it empty if optional).",
  "common.invalidEmail": "Enter a valid email address like name@example.com.",
  "common.consentRequired": "Please tick the consent box so we can contact you about this request.",
  "common.selectAtLeast": "Please choose at least one option.",
  "common.submit": "Submit",
  "common.submitting": "Submitting…",
  "common.success": "Request received",
  "common.successBody":
    "Your request has been recorded in the pilot queue. A Saathi will contact you during the door-to-door rounds.",
  "common.reference": "Reference number",
  "common.submitAnother": "Submit another request",
  "common.serverError":
    "We could not save your request just now. Please try again, or call the help desk during working hours.",
  "common.fixErrors": "Please correct the highlighted fields and try again.",
  "common.all": "All",
  "common.clear": "Clear filters",
  "common.results": "schemes shown",
  "common.noResults": "No scheme matches that search yet.",
  "common.yes": "Yes",
  "common.no": "No",
  "common.backToSchemes": "Back to all schemes",
  "common.pilotTarget": "Pilot target",
  "common.verified": "Verified",
  "common.estimate": "Estimate",
  "common.planned": "Planned",
  "common.printNote": "This page can be printed or read aloud with your browser's own tools.",
  "common.home": "Home",
  "common.updatedOn": "Page content reviewed",

  // ---------- Home: hero ----------
  "hero.eyebrow": "Pilot begins in Bharauli village, Bhojpur district, Bihar",
  "hero.title": "Har Haq, Har Ghar Tak",
  "hero.subtitle":
    "Helping every rural family discover, access, and receive the government benefits they deserve.",
  "hero.body":
    "Yojana Saathi trains local women from your own village as Saathis. They check who is eligible, fix the papers, submit the forms, follow up on the file and reopen rejected cases — until the money reaches the family's own bank account.",
  "hero.ctaEligibility": "Check Scheme Eligibility",
  "hero.ctaSaathi": "Become a Saathi",
  "hero.trust1": "No charge for the eligibility check",
  "hero.trust2": "Applications go to the official portal",
  "hero.trust3": "Money is credited to your own bank account",
  "hero.imageCaption":
    "Sample illustration: a trained Saathi verifying scheme documents with a rural household.",

  // ---------- Home: stats ----------
  "stats.eyebrow": "What the six-month pilot is aiming for",
  "stats.title": "Pilot targets, not achieved results",
  "stats.body":
    "These are the numbers our Bharauli pilot is designed to deliver between months 1 and 6. They will be reported as achieved, partial or missed on the impact dashboard every month.",
  "stats.households": "Households targeted",
  "stats.applications": "Applications planned",
  "stats.benefits": "Benefits targeted",
  "stats.saathis": "Local women to be trained",
  "stats.footnote":
    "Targets set in the project design document. Actual results are published separately on the Our Impact page.",

  // ---------- Home: mission ----------
  "mission.eyebrow": "Our mission",
  "mission.title": "Closing the last-mile gap between a scheme and a family",
  "mission.p1":
    "India runs hundreds of welfare schemes, and Bihar adds several more of its own. Most of them are designed to pay directly into a bank account. Yet in many villages the family that qualifies never receives the money — because nobody knew the scheme existed, the papers were incomplete, the form was filled wrongly, or a rejection was never questioned.",
  "mission.p2":
    "Yojana Saathi puts a trained, accountable helper inside the village itself. A Saathi is a neighbour who can read the official lists, use the government portals, and stand beside the family during follow-up. That is how an entitlement on paper becomes cash in a bank account.",
  "mission.point1Title": "Entitlement, not charity",
  "mission.point1Body": "These are rights the family already holds. We only help them claim it.",
  "mission.point2Title": "Direct benefit transfer",
  "mission.point2Body":
    "We never handle the money. Payments go from the government to the beneficiary's own Aadhaar-linked account.",
  "mission.point3Title": "Women-led by design",
  "mission.point3Body":
    "Local women are trained and paid as community representatives, so knowledge stays in the village.",
  "mission.point4Title": "Documents first",
  "mission.point4Body":
    "Most rejections start with a paper problem. We fix the paper before the form is filed.",

  // ---------- Home: how it works ----------
  "how.eyebrow": "How it works",
  "how.title": "Five steps from the village lane to the bank account",
  "how.body":
    "Every family moves through the same transparent sequence. At each step the Saathi records what was done and what is still pending.",
  "how.step1": "Free eligibility check",
  "how.step1Body":
    "The Saathi visits the household or sits at the camp desk, asks a short set of questions — age, work, income, disability, documents held — and lists the schemes the family can potentially claim. This step is always free.",
  "how.step2": "Document preparation",
  "how.step2Body":
    "Missing papers are the most common reason a claim fails. We prepare the list, show where each document is issued, help correct spelling, date of birth and family-member mismatches, and keep scanned copies in a personal file.",
  "how.step3": "Application submission",
  "how.step3Body":
    "The form is filed on the official government portal or submitted at the block office through the notified channel. The family receives a copy of the filled form and the acknowledgement number.",
  "how.step4": "Application tracking",
  "how.step4Body":
    "Status is checked at fixed intervals using the official acknowledgement number, and reported to the family in plain language — pending, under verification, approved, or rejected.",
  "how.step5": "Rejection resolution",
  "how.step5Body":
    "A rejected file is not closed. We read the rejection reason, correct the defect, collect a missing certificate or file the appeal / re-application inside the permitted window.",
  "how.ctaEligibility": "Start with a free eligibility check",
  "how.assistCta": "Ask for help with a scheme",

  // ---------- Home: schemes ----------
  "schemes.eyebrow": "Government schemes we work with",
  "schemes.title": "Eight schemes at the centre of the Bharauli pilot",
  "schemes.body":
    "Selected because they affect the largest number of households in the pilot area and pay directly into bank accounts. Every page lists what to carry and where the application actually goes.",
  "schemes.beneficiaries": "Potential beneficiaries",
  "schemes.documents": "Documents usually required",
  "schemes.viewDetails": "Learn more",
  "schemes.allSchemes": "Open the full scheme directory",
  "schemes.disclaimer":
    "Eligibility, benefit amounts and final approval are decided only by the concerned government department. Yojana Saathi does not sanction, deliver or collect any benefit, and receiving assistance from us does not guarantee approval.",

  // ---------- Home: why choose ----------
  "why.eyebrow": "Why families use Yojana Saathi",
  "why.title": "A service built for people the portals leave behind",
  "why.subtitle": "Seven commitments we publish, so a family can hold us to them.",
  "why.f1Title": "Doorstep assistance",
  "why.f1Body":
    "No need to travel to Shahpur block or take a day off work. The Saathi comes to the house on a announced schedule.",
  "why.f2Title": "Free eligibility assessment",
  "why.f2Body":
    "Finding out what you can claim costs nothing, and nobody is asked for an advance before a service is rendered.",
  "why.f3Title": "Documents-first approach",
  "why.f3Body":
    "The paper checklist is completed before any form is filed, which is what actually reduces rejections.",
  "why.f4Title": "Transparent service charges",
  "why.f4Body":
    "If a paid service is ever introduced after the pilot, the rate card is printed on paper and given to the family before the work starts. No surprise fees, ever.",
  "why.f5Title": "Application tracking",
  "why.f5Body":
    "Every filed application is logged with its acknowledgement number and reviewed on a fixed follow-up cycle.",
  "why.f6Title": "Rejection assistance",
  "why.f6Body":
    "Rejected or stalled files are re-read, the defect is identified and an appeal or fresh application is prepared.",
  "why.f7Title": "Women-led community model",
  "why.f7Body":
    "Two trained women of the village carry the file, and they stay in the village after the funding period ends.",

  // ---------- Home: pilot ----------
  "pilot.eyebrow": "The pilot project",
  "pilot.title": "One village, six months, measurable outcomes",
  "pilot.body":
    "Bharauli is a single-village pilot run in house-hold rounds. The design is deliberately small so that the cost per family, the rejection rate and the Saathi model can be measured before expansion.",
  "pilot.locationLabel": "Pilot location",
  "pilot.location": "Bharauli Village, Shahpur Block, Bhojpur District, Bihar, India",
  "pilot.mapNote":
    "Indicative map location for the pilot area. Exact household coordinates are not published on this website.",
  "pilot.overviewTitle": "Pilot overview",
  "pilot.duration": "Duration",
  "pilot.durationValue": "6 months",
  "pilot.coverage": "Household coverage",
  "pilot.coverageValue": "750 households surveyed",
  "pilot.team": "Field team",
  "pilot.teamValue": "2 Saathis + 1 coordinator",
  "pilot.schemes": "Schemes in scope",
  "pilot.schemesValue": "8 central and state schemes",
  "pilot.budget": "Seed funding required",
  "pilot.budgetValue": "₹1.35 lakh",
  "pilot.mode": "Delivery mode",
  "pilot.modeValue": "Door-to-door rounds + camp days",
  "pilot.timelineTitle": "Six-month implementation timeline",
  "pilot.timelineBody": "Click a month to see the planned activities and the output it must produce.",
  "pilot.month": "Month",
  "pilot.outputLabel": "Required output",
  "pilot.map": "Open in Google Maps",

  // ---------- Home: impact preview ----------
  "impactPreview.eyebrow": "Our impact",
  "impactPreview.title": "The pilot dashboard, updated every month",
  "impactPreview.body":
    "Targets are shown next to what has actually been verified. A number that is an estimate stays labelled as an estimate.",
  "impactPreview.surveyed": "Households surveyed",
  "impactPreview.submitted": "Applications submitted",
  "impactPreview.received": "Benefits received",
  "impactPreview.trained": "Women trained",
  "impactPreview.financial": "Estimated benefit reaching families",
  "impactPreview.full": "Open the full impact dashboard",
  "impactPreview.legend": "Legend",
  "impactProgress.title": "Progress against pilot targets",

  // ---------- Home: funding ----------
  "funding.eyebrow": "Funding and partnerships",
  "funding.title": "Help Us Bring Government Benefits to Every Eligible Family",
  "funding.body":
    "The six-month Bharauli pilot runs on ₹1.35 lakh of seed funding. It pays for Saathi stipends, training, field visits, printing and verification. We are looking for CSR funds, foundation grants, in-kind support and mentors.",
  "funding.support": "Support Our Mission",
  "funding.partner": "Become a Partner",
  "funding.contact": "Contact Our Team",
  "funding.allocTitle": "How the ₹1.35 lakh is planned to be used",
  "funding.alloc1": "Saathi training & stipend support",
  "funding.alloc2": "Field rounds, travel & camp days",
  "funding.alloc3": "Document printing, photocopies & verification",
  "funding.alloc4": "Coordinator time, monitoring & reporting",
  "funding.ofTotal": "of planned budget",
  "funding.supportersTitle": "What partners can give",
  "funding.supporter1": "CSR or foundation grant towards the pilot budget",
  "funding.supporter2": "Devices, printing or data packs as in-kind support",
  "funding.supporter3": "Mentoring on welfare law, data and impact measurement",
  "funding.supporter4": "Volunteer legal help for appeals and rejected files",
  "funding.transparency":
    "Pilot spending and outcomes are published on the impact page. We do not accept money from families for filing a government application.",

  // ---------- Home: stories + CTA band ----------
  "stories.eyebrow": "Voices from the pilot area",
  "stories.title": "What families and Saathis say",
  "stories.note":
    "Sample statements collected during pilot design conversations. Shown for demonstration and labelled as illustrative.",
  "ctaBand.title": "Start with one question: which schemes can your household claim?",
  "ctaBand.body":
    "Fill the short eligibility form, or ask a Saathi to do it with you at home. It takes about five minutes and costs nothing.",
  "ctaBand.cta1": "Check Scheme Eligibility",
  "ctaBand.cta2": "Talk to our team",

  // ---------- About page ----------
  "about.eyebrow": "About us",
  "about.title": "A village-level service for claiming what is already yours",
  "about.lead":
    "Yojana Saathi is an independent social-impact initiative, not a government department. We were started after repeated visits to villages in Bhojpur where families had the right papers, the right age and the right bank account — and still no benefit had ever arrived.",
  "about.storyTitle": "Our story",
  "about.story1":
    "The problem announced itself in ordinary conversations. A widow in her fifties who had been told the pension list was 'full'. An old man whose ration card still carried his deceased son's name. A daughter whose post-matric scholarship application was rejected because her surname was spelled differently in two documents. None of these were policy failures. They were last-mile failures — and last-mile failures can be fixed by a person who lives at the last mile.",
  "about.story2":
    "So the design was kept small and specific: pick one village, train two women from that village, work a defined set of schemes, survey 750 households, and publish what happened. Bharauli, in Shahpur block of Bhojpur district, was chosen for its size, its mix of agricultural and wage households, and the availability of a community space for camp days.",
  "about.visionTitle": "Vision",
  "about.visionBody":
    "A rural household that never loses a welfare entitlement because of paperwork, distance or unfamiliarity with a portal.",
  "about.missionTitle": "Mission",
  "about.missionBody":
    "To help rural families identify eligible government schemes, prepare and correct documents, submit and track applications, and resolve rejected applications — until the benefit reaches their bank account.",
  "about.problemTitle": "The problem we solve",
  "about.problemBody":
    "Welfare schemes are announced centrally and implemented locally, and the gap between the two is where people fall out.",
  "about.problem1": "Awareness gap — eligible families do not know the scheme exists or that they qualify.",
  "about.problem2":
    "Documentation gap — a missing certificate, a name mismatch, an unlinked Aadhaar or a non-DBT bank account stops the file.",
  "about.problem3":
    "Access gap — the block office is far, the queue is long, the portal is in English and a day of wage work is lost for nothing.",
  "about.problem4":
    "Grievance gap — a rejection arrives as a short remark, nobody explains it, and the file is quietly abandoned.",
  "about.approachTitle": "Our approach",
  "about.approach1Title": "Survey every household once, properly",
  "about.approach1Body":
    "A structured household form, not a guess: age, occupation, income band, disability, documents held, schemes already availed.",
  "about.approach2Title": "Work the file, not the queue",
  "about.approach2Body":
    "Each application gets its own tracker with acknowledgement number, follow-up dates and the exact next action.",
  "about.approach3Title": "Explain in the family's language",
  "about.approach3Body":
    "Status, rejection reasons and next steps are communicated verbally in Hindi and in writing on a printed slip.",
  "about.approach4Title": "Publish the numbers",
  "about.approach4Body":
    "Targets, actuals and shortfalls are reported monthly, including the cases we did not manage to resolve.",
  "about.modelTitle": "Our community-led model",
  "about.modelBody":
    "The Saathi is not an outsider with a clipboard. She is a resident of the village, known to the families, accountable to the same panchayat. Training, a simple file system and a supervisor make her competent; the monthly stipend makes the work viable; and the household relationships make her trusted.",
  "about.modelRecruit": "Recruit from the village",
  "about.modelRecruitBody": "Two women, preference for those with prior self-help group or field experience.",
  "about.modelTrain": "Train for three weeks",
  "about.modelTrainBody": "Scheme rules, portals, document reading, data entry, ethics and privacy.",
  "about.modelWork": "Work the rounds",
  "about.modelWorkBody": "Household visits, camp days, submissions and follow-up with the block office.",
  "about.modelReview": "Review & report",
  "about.modelReviewBody": "Weekly review with the coordinator; monthly public dashboard update.",
  "about.transparencyTitle": "Our commitment to transparency",
  "about.transparency1": "No collection of benefit money. Payments move government → beneficiary account only.",
  "about.transparency2": "The eligibility check and the document checklist are free for every household.",
  "about.transparency3": "Any future paid service will use a printed, publicly displayed rate card shared before work begins.",
  "about.transparency4": "Personal data is used only for the requested assistance, with written consent.",
  "about.transparency5": "Pilot finances and outcomes are published, including misses against target.",
  "about.expansionTitle": "Long-term expansion strategy",
  "about.expansionBody":
    "The pilot is a template, not a product. Each stage is repeated only after the previous one has published verified numbers.",
  "about.roadmapTitle": "Expansion roadmap",
  "about.roadmap1": "Bharauli Village",
  "about.roadmap1Body": "Prove the model: 750 households, 2 Saathis, 8 schemes, 6 months.",
  "about.roadmap2": "Shahpur Block",
  "about.roadmap2Body": "Replicate across the block with a Saathi pair per cluster and a block-level tracker.",
  "about.roadmap3": "Bhojpur District",
  "about.roadmap3Body":
    "District-wide last-mile network with partner NGOs, panchayat tie-ups and open reporting.",
  "about.disclaimerTitle": "Important disclaimer",
  "about.disclaimerBody":
    "Yojana Saathi is an independent social-impact initiative. It is not an official website of the Government of India, the Government of Bihar or any ministry or department. Scheme information is provided for guidance only; eligibility, verification and approval are decided solely by the authorised government authority.",

  // ---------- Schemes directory ----------
  "dir.eyebrow": "Scheme directory",
  "dir.title": "Government Schemes",
  "dir.lead":
    "Searchable directory of the welfare schemes we currently support in the Bharauli pilot. Every entry names the official portal so the family can verify the rules independently.",
  "dir.searchLabel": "Search by scheme name, benefit or document",
  "dir.searchPlaceholder": "e.g. pension, hospital, scholarship, Aadhaar, house",
  "dir.filters": "Filter by category",
  "dir.showing": "Showing",
  "dir.of": "of",
  "dir.assistTitle": "Need help applying?",
  "dir.assistBody":
    "Ask a Saathi to check your papers and file the application with you. Requesting assistance is free during the pilot.",
  "dir.assistCta": "Request assistance",
  "dir.category": "Category",
  "dir.monthly": "Indicative benefit",
  "dir.applyHint": "Where the application goes",

  // ---------- Scheme detail ----------
  "detail.overview": "Scheme overview",
  "detail.eligibility": "Potential eligibility criteria",
  "detail.benefits": "Benefits",
  "detail.documents": "Required documents",
  "detail.process": "Application process",
  "detail.official": "Official government application link",
  "detail.officialHint": "Opens the official portal in a new tab.",
  "detail.request": "Request assistance for this scheme",
  "detail.eligibilityHint":
    "Indicative criteria only. The administering department applies its own final rules and lists.",
  "detail.docsHint": "Carry originals plus one photocopy set. A Saathi can help build the file.",
  "detail.myscheme": "View on MyScheme (government portal)",
  "detail.related": "Related schemes",
  "detail.helpTitle": "Ask a Saathi for help with this scheme",
  "help.fieldScheme": "Scheme",
  "help.fieldFor": "Who is the application for",
  "help.forSelf": "Myself",
  "help.forFamily": "A family member",
  "help.forNeighbour": "A neighbour / other household",
  "help.fieldName": "Your name",
  "help.fieldVillage": "Village / ward",
  "help.fieldPhone": "Mobile number",
  "help.fieldDocs": "Document status",
  "help.docsAll": "I have all the documents",
  "help.docsSome": "I have some documents",
  "help.docsNone": "I have almost nothing yet",
  "help.fieldNotes": "Anything we should know (optional)",
  "help.notesPlaceholder": "Example: my Aadhaar name is spelled differently in the ration card.",
  "help.submit": "Send assistance request",
  "help.success": "Assistance request received",
  "help.successBody":
    "Your request is in the pilot queue. A Saathi will call or visit to verify documents and complete the application.",
  "help.consent":
    "I consent to Yojana Saathi storing these details only to contact me about this request, and I have read the privacy notice.",

  // ---------- Eligibility checker ----------
  "elig.eyebrow": "Free preliminary check",
  "elig.title": "Check Scheme Eligibility",
  "elig.lead":
    "Answer ten simple questions. We will list the schemes your household can potentially claim, and tell you which documents are still missing. It takes about five minutes.",
  "elig.disclaimerTitle": "Read this before you start",
  "elig.disclaimerBody":
    "This is a preliminary self-assessment generated from the answers you type. It is not an official eligibility determination. Only the concerned government department, after verification, can confirm whether a benefit is sanctioned.",
  "elig.sectionApplicant": "About you",
  "elig.sectionHousehold": "Your household",
  "elig.sectionDocs": "Documents you already have",
  "elig.sectionInterest": "What you are interested in",
  "elig.name": "Applicant name",
  "elig.namePlaceholder": "Full name as it appears on Aadhaar",
  "elig.village": "Village",
  "elig.villagePlaceholder": "Your village or mohalla",
  "elig.ward": "Ward number",
  "elig.ageGroup": "Age group",
  "elig.gender": "Gender (optional)",
  "elig.occupation": "Occupation",
  "elig.income": "Annual household income",
  "elig.householdSize": "Members in the household",
  "elig.disability": "Does anyone in the household have a benchmark disability? (optional)",
  "elig.documents": "Existing government documents",
  "elig.documentsHint":
    "Tick every document that anyone in the household already holds, including expired ones — a document that exists can usually be corrected.",
  "elig.interests": "Schemes you want to check",
  "elig.interestsHint": "Leave this empty to check all eight pilot schemes.",
  "elig.contactSection": "Contact details (optional)",
  "elig.phone": "Mobile number",
  "elig.contactHint":
    "Only needed if you want a Saathi to call you. You can leave both fields empty and still see your results.",
  "elig.consent":
    "I agree that these details may be stored to follow up on this request, as described in the privacy notice.",
  "elig.submit": "Show potentially relevant schemes",
  "elig.resultTitle": "Schemes that may apply to your household",
  "elig.resultLead":
    "Based on your answers, these schemes are worth checking. Each one shows why it appeared and what to carry.",
  "elig.matched": "Why this appeared",
  "elig.missing": "Still to arrange",
  "elig.notMatched": "Possibly not applicable right now",
  "elig.notMatchedBody":
    "The answers given did not match the main conditions of these schemes. Rules change, so a family may still ask the department.",
  "elig.noneTitle": "No strong match found",
  "elig.noneBody":
    "Nothing obvious came up for this household. Please still ask for a field visit — several state and central schemes are outside this pilot list, and rules change year to year.",
  "elig.noResultsTitle": "No scheme matched the selected filters",
  "elig.noResultsBody":
    "Tick fewer categories, or ask a Saathi for a door-to-door survey which covers schemes beyond this list.",
  "elig.assessmentNote":
    "PRELIMINARY ASSESSMENT — NOT AN OFFICIAL ELIGIBILITY DETERMINATION. Sanction and payment are decided only by the government department after verification.",
  "elig.saved": "Your answers were recorded so a Saathi can prepare before contacting you.",
  "elig.again": "Run the check again",
  "elig.needHelp": "Want someone to do this with you at home?",
  "elig.needHelpBody":
    "Ask for a door-to-door visit. The Saathi will fill this same form with you and start the document file.",
  "elig.needHelpCta": "Request a home visit",
  "elig.officialCheck": "Cross-check on the official portal",

  // ---------- Become a Saathi ----------
  "saathi.eyebrow": "Join the pilot team",
  "saathi.title": "Become a Saathi",
  "saathi.lead":
    "A Saathi is a trained community representative of her own village. She is the service. We are recruiting two women for the Bharauli pilot.",
  "saathi.roleTitle": "The role",
  "saathi.roleBody":
    "You will spend the day inside the village — visiting households, checking papers, filing applications on government portals, following up at the block office and explaining outcomes to families in plain Hindi. You will keep a simple record for every case you handle.",
  "saathi.respTitle": "What you will do",
  "saathi.resp1": "Conduct household surveys using the standard enquiry form",
  "saathi.resp2": "Verify original documents and prepare the application file",
  "saathi.resp3": "Submit applications on official portals and collect acknowledgements",
  "saathi.resp4": "Track every application and inform the family of the status",
  "saathi.resp5": "Read rejection remarks and start the correction or appeal process",
  "saathi.resp6": "Hold camp days at the panchayat and keep attendance records",
  "saathi.resp7": "Report weekly to the coordinator and record data honestly",
  "saathi.trainTitle": "Training you will receive",
  "saathi.trainBody":
    "A three-week residential-style training before fieldwork, plus a half-day refresher every month during the pilot.",
  "saathi.train1": "Scheme rules, eligibility and benefit structure (8 schemes)",
  "saathi.train2": "Hands-on practice on the official portals and mobile apps",
  "saathi.train3": "Document reading, common defects and how to fix them",
  "saathi.train4": "Data entry, the case tracker and photo upload discipline",
  "saathi.train5": "Ethics, privacy, consent and what a Saathi must never do",
  "saathi.train6": "Communication, patience and handling grievances",
  "saathi.skillsTitle": "What we look for",
  "saathi.skill1": "Resident of Bharauli or an immediately neighbouring village",
  "saathi.skill2": "Able to read and write in Hindi comfortably",
  "saathi.skill3": "Own or shared access to a working smartphone",
  "saathi.skill4": "Basic mobile handling: calls, WhatsApp, photos, uploads",
  "saathi.skill5": "Willing to visit households and work fixed field days",
  "saathi.skill6": "Honest about money, paperwork and other people's data",
  "saathi.digitalTitle": "Smartphone and digital requirements",
  "saathi.digitalBody":
    "You do not need to be a computer expert. You do need a smartphone you can use for calls, photos of documents, form filling and WhatsApp updates, plus a working internet pack. If a device is a constraint, tell us in the application — pilot partners may be able to arrange shared device support.",
  "saathi.payTitle": "Stipend during the pilot",
  "saathi.payAmount": "₹4,000 – ₹6,000 / month",
  "saathi.payLabel": "Pilot estimate — not a guaranteed wage",
  "saathi.payBody":
    "This range is an estimate for the six-month pilot, linked to field days completed, records maintained and households served. It is not a contractual salary, it is not a government post, and payment terms are explained in writing before joining.",
  "saathi.applyTitle": "Saathi application form",
  "saathi.applyBody":
    "Fill this in yourself or with help. After you submit, the coordinator calls you for a short in-person conversation at the panchayat.",
  "saathi.fName": "Full name",
  "saathi.fAge": "Age",
  "saathi.fGender": "Gender",
  "saathi.fVillage": "Village / ward",
  "saathi.fPhone": "Mobile number",
  "saathi.fEmail": "Email (optional)",
  "saathi.fEducation": "Highest education completed",
  "saathi.fReading": "How comfortable are you reading official documents?",
  "saathi.fSmartphone": "Do you have access to a smartphone you can use for fieldwork?",
  "saathi.fBank": "Do you have your own Aadhaar-linked bank account?",
  "saathi.fExperience": "Any previous work with SHGs, Panchayati Raj, ASHA/Anganwadi, NGO or field roles? (optional)",
  "saathi.fExperiencePlaceholder": "Tell us briefly what you did and for how long.",
  "saathi.fHours": "How many hours a day can you give to fieldwork?",
  "saathi.fAvailable": "From when can you start?",
  "saathi.submit": "Apply to Become a Saathi",
  "saathi.successTitle": "Application received",
  "saathi.successBody":
    "Thank you. The pilot coordinator reviews applications weekly and will call you for the in-person conversation. Keep your phone reachable.",
  "saathi.consent":
    "I confirm the information given is true, and I consent to it being stored and used only for this recruitment process.",
  "saathi.otherLang": "Can also read/write in (optional)",
  "saathi.availNow": "Immediately",
  "saathi.availMonth": "Within one month",
  "saathi.availTraining": "After the next training batch",

  // ---------- Impact page ----------
  "impactPage.eyebrow": "Impact dashboard",
  "impactPage.title": "Our Impact — pilot dashboard",
  "impactPage.lead":
    "One page, three kinds of numbers. Targets are what the pilot design promised; estimates are modelled from the survey plan; verified results are what we can evidence. They are never mixed in the same chart without a label.",
  "impactPage.overviewTitle": "Pilot overview",
  "impactPage.status": "Current status",
  "impactPage.statusValue": "Design phase — field rounds not yet started",
  "impactPage.dataNoteTitle": "How to read this dashboard",
  "impactPage.dataNote":
    "The pilot has not begun field operations, so the verified column is intentionally empty for now. Sample figures used to demonstrate the dashboard are marked as demo data and will be replaced by monthly field reports.",
  "impactPage.kpiHouseholds": "Households surveyed",
  "impactPage.kpiApplications": "Applications filed",
  "impactPage.kpiBenefits": "Benefits received",
  "impactPage.kpiWomen": "Women trained",
  "impactPage.kpiFinancial": "Estimated benefit reaching families",
  "impactPage.coverageTitle": "Household coverage by scheme",
  "impactPage.coverageBody": "Planned applications per scheme against the 600-application target.",
  "impactPage.monthlyTitle": "Monthly progress plan",
  "impactPage.monthlyBody":
    "Households reached per month, as planned in the pilot design. Actuals are added to this chart each month once fieldwork begins.",
  "impactPage.month": "Month",
  "impactPage.householdsReached": "Households reached",
  "impactPage.applicationsFiled": "Applications filed",
  "impactPage.outcomesTitle": "Applications filed vs benefits received",
  "impactPage.outcomesBody":
    "Not every approved application becomes a payment in the same month; the gap is where follow-up work happens.",
  "impactPage.financialTitle": "Financial impact model",
  "impactPage.financialBody":
    "Indicative annual value of the benefits the pilot expects to unlock for surveyed households, based on notified benefit rates.",
  "impactPage.financialNote":
    "Estimate only. Actual credit depends on sanction, verification and the beneficiary's bank account status.",
  "impactPage.empowerTitle": "Women empowerment metrics",
  "impactPage.empowerBody":
    "The model is measured by what the Saathis gain, not only by files completed.",
  "impactPage.empower1": "Stipend earned and controlled by the woman",
  "impactPage.empower2": "Official portals independently operated per month",
  "impactPage.empower3": "Grievances raised and followed up at block level",
  "impactPage.empower4": "Peer training delivered to other women in the cluster",
  "impactPage.storiesTitle": "Community stories",
  "impactPage.storiesBody":
    "Illustrative narratives based on the situations recorded during pilot design conversations. Names and details are placeholders until fieldwork begins.",
  "impactPage.targetsTitle": "Targets and how they will be judged",
  "impactPage.colMetric": "Metric",
  "impactPage.colTarget": "Pilot target",
  "impactPage.colVerified": "Verified result",
  "impactPage.colSource": "Data source",
  "impactPage.notYet": "Not yet reported",
  "impactPage.methodology": "Methodology and honest limits",
  "impactPage.methodologyBody":
    "Households are counted once per survey, not per visit. An application counts as submitted only when an official acknowledgement exists. A benefit counts as received when the family confirms the credit in their passbook or bank statement — we do not count an approval as a payment.",
  "impactPage.reportCta": "Request the full pilot report",

  // ---------- Contact page ----------
  "contact.eyebrow": "Contact us",
  "contact.title": "Contact, partnerships and grievances",
  "contact.lead":
    "Write to the pilot team for help with a scheme, for CSR or partnership discussions, for volunteering, or to report a complaint about our conduct.",
  "contact.channelsTitle": "How to reach the team",
  "contact.channelsNote":
    "Contact details for the pilot will be published once the field office in Shahpur is operational. Placeholder channels are shown here so the form can be tested.",
  "contact.formTitle": "Send a message",
  "contact.category": "What is your message about?",
  "contact.catSupport": "Support with a scheme application",
  "contact.catPartnership": "Partnership / CSR enquiry",
  "contact.catFeedback": "Feedback or complaint",
  "contact.catGrievance": "Grievance against a team member",
  "contact.catVolunteer": "Volunteer / mentoring",
  "contact.catMedia": "Media or research request",
  "contact.fName": "Your name",
  "contact.fOrg": "Organisation (optional)",
  "contact.fEmail": "Email",
  "contact.fPhone": "Mobile (optional)",
  "contact.fSubject": "Subject",
  "contact.fMessage": "Message",
  "contact.fMessagePlaceholder":
    "Describe your request. For a grievance, include the date, the village and what happened.",
  "contact.fConsent":
    "I consent to this message being stored and answered by the Yojana Saathi team, as described in the privacy notice.",
  "contact.submit": "Send message",
  "contact.successTitle": "Message received",
  "contact.successBody":
    "We read every message during field-office hours. Grievances are acknowledged within 7 working days and carry a reference number for follow-up.",
  "contact.grievanceTitle": "Grievance redressal",
  "contact.grievance1": "Log the complaint with a reference number and the date received.",
  "contact.grievance2": "Acknowledge within 7 working days with the name of the person handling it.",
  "contact.grievance3": "Investigate with the family and the Saathi involved, in writing.",
  "contact.grievance4": "Respond with the finding and the corrective action within 30 days.",
  "contact.grievance5":
    "If the issue involves money, coercion or misuse of documents, it is escalated to the partner organisation and the gram panchayat immediately.",
  "contact.responseTime": "Response time",
  "contact.responseTimeValue": "Within 7 working days",
  "contact.officeTitle": "Pilot office",
  "contact.officeBody": "Field rounds operate from the gram panchayat building in Bharauli, Shahpur block.",
  "contact.hoursTitle": "Working hours",
  "contact.hoursValue": "Monday – Saturday, 9:00 am – 6:00 pm",
  "contact.hoursNote": "Camp days are additionally announced on the panchayat notice board.",
  "contact.emailLabel": "Email (placeholder)",
  "contact.phoneLabel": "Phone",
  "contact.emailValue": "demo@yojanasaathi.org",
  "contact.phoneValue": "+91 70886 86900",
  "contact.areasTitle": "What we can and cannot help with",
  "contact.canTitle": "What we can help with",
  "contact.cannotTitle": "What we cannot do",
  "contact.can1": "Finding schemes a household may qualify for",
  "contact.can2": "Document checklists and correction help",
  "contact.can3": "Filing and tracking applications",
  "contact.can4": "Reading rejection remarks and planning the next step",
  "contact.cannot1": "We cannot sanction, approve or release a benefit",
  "contact.cannot2": "We cannot access government records on your behalf without your documents and consent",
  "contact.cannot3": "We do not accept payment for filing an application",
  "contact.cannot4": "We cannot act as a lawyer or represent you in court",

  // ---------- Footer ----------
  "footer.aboutText":
    "Yojana Saathi is an independent social-impact initiative working with households in Bharauli village, Shahpur block, Bhojpur district, Bihar, to help them claim the government welfare benefits they are entitled to.",
  "footer.quick": "Quick links",
  "footer.schemesCol": "Schemes",
  "footer.resources": "Help & resources",
  "footer.contact": "Contact",
  "footer.disclaimer": "Disclaimer",
  "footer.disclaimerText":
    "This website is not an official government portal and is not affiliated with, endorsed by, or acting on behalf of the Government of India, the Government of Bihar, or any ministry or department. Official logos and emblems are not used. All scheme rules, amounts and decisions belong to the respective government authorities; details here are for guidance and may change.",
  "footer.initiative": "An independent social-impact initiative",
  "footer.pilotIn": "Pilot in Bharauli, Bhojpur, Bihar",
  "footer.rights": "Prototype for demonstration. Content reviewed against official sources.",
  "footer.backTop": "Back to top",
  "footer.privacy": "Privacy & consent policy",
  "footer.terms": "Terms of use",
  "footer.accessibility": "Accessibility statement",
  "footer.helpDesk": "Help & support",
  "footer.reportIssue": "Report a website problem",

  // ---------- Privacy page ----------
  "privacy.title": "Privacy, consent and data handling",
  "privacy.lead":
    "Short version: we collect the minimum needed to help with an application, we ask for consent before we store it, we never sell it, and we never take money from a family for filing a government claim.",
  "privacy.s1": "What we collect",
  "privacy.s1b":
    "On the eligibility, assistance, Saathi and contact forms we ask for name, village, age band, occupation, income band, disability status, documents held, and — only if you choose to give it — a phone number or email. We do not ask for Aadhaar numbers, bank account numbers, ration card numbers or passwords on this website.",
  "privacy.s2": "Why we collect it",
  "privacy.s2b":
    "To identify schemes worth checking, to prepare before a field visit, and to contact the applicant about that specific request. Records are used for pilot monitoring and reporting in aggregated, non-identifiable form.",
  "privacy.s3": "Consent",
  "privacy.s3b":
    "Every form carries a consent tick-box that must be selected before submission. Consent can be withdrawn by contacting the pilot team, after which the record is marked inactive and deleted on the next data-cleanup cycle.",
  "privacy.s4": "Who can see it",
  "privacy.s4b":
    "The pilot coordinator and the assigned Saathi for the purpose of the request, and partner organisation staff for monitoring. Data is not sold, not rented, and not shared for marketing.",
  "privacy.s5": "How long we keep it",
  "privacy.s5b":
    "Assistance requests are retained for the duration of the pilot plus twelve months, so that a rejected file can be reopened if rules change. Recruitments records for unsuccessful applicants are deleted after twelve months.",
  "privacy.s6": "Security measures",
  "privacy.s6b":
    "Access is limited to named team members, forms require consent before storage, and no identity or financial numbers are collected through the website. Document copies, when required, are collected on paper or on a device during the field visit and stored in a locked file, not uploaded here.",
  "privacy.s7": "Corrections and grievances",
  "privacy.s7b":
    "You may ask to see, correct or delete the details you submitted, or file a grievance about how your information was handled, through the contact form.",
  "privacy.s8": "Third-party links",
  "privacy.s8b":
    "Links to official government portals are provided for convenience. Their privacy practices are governed by the respective government, not by us.",
  "privacy.s9": "Prototype notice",
  "privacy.s9b":
    "This website is a public prototype. Sample records shown in the dashboard are demonstration data, not real citizen records.",

  // ---------- Accessibility statement ----------
  "a11y.title": "Accessibility statement",
  "a11y.lead":
    "This website is built for users with limited digital experience, including screen magnification and low-bandwidth reading. Text size can be changed from the top bar, all interactive elements are reachable by keyboard, form fields have visible labels and error messages describe what to fix.",
  "a11y.items":
    "Large tap targets · visible focus outline · contrast tested against WCAG AA targets · plain-language labels · error summary per field · respects reduced-motion settings.",
};

export type DictKey = keyof typeof entries;
export const en: Record<string, string> = entries;
