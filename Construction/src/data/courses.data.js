// src/data/courses.data.js

export const COURSES = [
  {
    id: "cscs-green-card",
    pricingKey: "greenCard",
    title: "CSCS Green Card Online Course – Get Qualified Fast",
    shortTitle: "Green Card Course",
    duration: "Under 4 hours",
    isOnline: true,
    isClassroom: false,
    defaultDelivery: "online",
    image: "/images/C2.webp",
    badge: "Most Popular",
    metaTitle: "CSCS Green Card Online Course – Get Qualified in Under 4 Hours",
    metaDescription:
      "Pass your Level 1 Health & Safety qualification in under 4 hours. Online, remote exam, same-day certificate. Book your CSCS Green Card course now.",
    shortDescription:
      "Need a CSCS Green Card to work on construction sites? Our online course gets you certified in under 4 hours — no classrooms, no travel, just results.",
    description:
      "Need a CSCS Green Card to work on construction sites? You'll need the Level 1 Health & Safety qualification first. Our online course gets you certified in under 4 hours — no classrooms, no travel, just results. Study online, take your exam remotely, and receive your certificate the same day.",

    whyChoose: [
      "Complete in under 4 hours – finish in less than half a day",
      "98% pass rate – most students pass first time",
      "Study anywhere – phone, tablet, or laptop",
      "Remote exam – take your test from home (Mon–Sun, 9 AM–10 PM)",
      "Same-day certificate – get your e-certificate immediately after passing",
      "One free retake – included in your course price",
      "CSCS-approved – government-recognised qualification valid for 5 years",
    ],
    howItWorks: [
      {
        step: 1,
        title: "Book & Start Learning",
        desc: "Book online and get instant access to your course materials via email. Start studying straight away.",
      },
      {
        step: 2,
        title: "Complete Your Training",
        desc: "Work through the modules at your own pace. Learn everything you need to know about construction health and safety.",
      },
      {
        step: 3,
        title: "Take Your Online Exam",
        desc: "Choose your exam time (available 7 days a week). Take it remotely from home — no test centres required.",
      },
      {
        step: 4,
        title: "Get Certified & Apply",
        desc: "Pass and receive your official e-certificate instantly. Use it alongside your CITB test pass to apply for your CSCS Green Card.",
      },
    ],
    whatYouLearn: [
      "Health and safety law in construction",
      "Risk assessments and method statements",
      "Accident prevention and reporting procedures",
      "Your responsibilities for site safety",
      "How to work safely on construction sites",
    ],
    whatsIncluded: [
      "Full online training access (24/7 on any device)",
      "Remote exam booking (Mon–Sun, 9 AM–10 PM)",
      "Official Level 1 RQF certificate (lifetime validity)",
      "Instant e-certificate on passing",
      "One free retake if needed",
      "CSCS-approved qualification",
    ],
    nextSteps: [
      "Complete this online course (under 4 hours)",
      "Pass your CITB Health, Safety & Environment Test",
      "Apply for your CSCS Green Card (valid 5 years)",
      "Start earning on construction sites",
    ],
    qualification:
      "Level 1 Award in Health & Safety in a Construction Environment (RQF)",
    validity: "5 years",
  },

  {
    id: "sssts",
    pricingKey: "sssts",
    title: "SSSTS Course – Site Supervisor Safety Training",
    shortTitle: "SSSTS Course",
    duration: "2 days",
    isOnline: true,
    isClassroom: true,
    defaultDelivery: "online",
    image: "/images/C5.webp",
    badge: null,
    metaTitle: "SSSTS Course – Site Supervisor Safety Training | Book Online",
    metaDescription:
      "CITB-approved SSSTS training for construction site supervisors. Online or classroom. 96% pass rate. Book your 2-day SSSTS course now.",
    shortDescription:
      "The essential qualification for construction site supervisors. This 2-day CITB-approved training teaches you how to manage health, safety, and welfare on site.",
    description:
      "SSSTS (Site Supervisor Safety Training Scheme) is the industry-standard qualification for anyone supervising construction work. Recognised by CITB and Build UK, it proves you understand safety law and can lead teams effectively. Our online course runs over 2 consecutive days using live video conferencing.",
    whyChoose: [
      "96% first-time pass rate – proven track record",
      "Flexible delivery – online or classroom",
      "CITB-approved – industry-recognised certification",
      "Free mock exams – full practice tests with instant feedback",
      "Same-day results – know if you've passed immediately",
      "CITB Grant eligible – claim back course costs",
      "Weekend and weekday options available",
    ],
    whatYouLearn: [
      "Health and Safety at Work Act and your legal duties as a supervisor",
      "CDM Regulations (Construction Design and Management)",
      "Risk assessment and method statement writing",
      "Identifying and controlling common site hazards",
      "Working at height and scaffolding safety",
      "Excavation safety and underground services",
      "Manual handling and COSHH",
      "Toolbox talks and site inductions",
      "Accident reporting under RIDDOR",
      "Mental health and occupational health awareness",
    ],
    courseDetails: {
      duration: "2 consecutive days",
      delivery: "Live online or classroom",
      assessment: "Written exam (25 minutes)",
      certificate: "CITB-approved SSSTS",
      validity: "5 years (then 1-day refresher)",
      entryRequirement: "No formal entry requirement. Valid photo ID required.",
    },
    assessment: {
      format: [
        "25 multiple-choice questions",
        "Pass mark: 72% (18 correct answers)",
        "Duration: 25 minutes",
      ],
      passRate: "96%",
    },
    whoShouldAttend: [
      "Construction site supervisors",
      "Foremen and gang leaders",
      "Working chargehands",
      "Anyone stepping into a supervisory role on site",
    ],
    faqs: [
      {
        q: "Do I need previous qualifications to attend?",
        a: "No formal entry requirement — but relevant site experience is beneficial.",
      },
      {
        q: "How long is the SSSTS certificate valid?",
        a: "5 years. After that, a 1-day SSSTS Refresher Course renews your certification.",
      },
      {
        q: "Can I do it online?",
        a: "Yes — our online delivery uses live video conferencing over 2 consecutive days.",
      },
    ],
    validity: "5 years",
  },

  {
    id: "sssts-refresher",
    pricingKey: "sssts_refresher",
    title: "SSSTS Refresher Course – Renew Your Supervisor Qualification",
    shortTitle: "SSSTS Refresher",
    duration: "1 day",
    isOnline: true,
    isClassroom: true,
    defaultDelivery: "online",
    image: "/images/C7.webp",
    badge: null,
    metaTitle: "SSSTS Refresher Course – Renew in 1 Day | Book Online",
    metaDescription:
      "SSSTS certificate expiring? Renew it in 1 day with our CITB-approved SSSTS Refresher. Online or classroom. Book now.",
    shortDescription:
      "SSSTS certificate expiring soon? Renew in just 1 day. This CITB-approved refresher keeps you compliant and updates you on current site safety legislation.",
    description:
      "The SSSTS Refresher is a 1-day update course for supervisors who hold a current SSSTS certificate. It refreshes your knowledge, covers legislative updates, and renews your certification for another 5 years.",
    whyChoose: [
      "Renew in just 1 day",
      "96% first-time pass rate",
      "CITB-approved certification",
      "Online or classroom delivery",
      "CITB Grant eligible",
    ],
    whatYouLearn: [
      "Updates to health and safety legislation",
      "Current HSE priorities and enforcement",
      "Refreshed risk assessment techniques",
      "Behavioural safety and safety culture",
      "Updated RIDDOR reporting requirements",
    ],
    courseDetails: {
      duration: "1 day",
      delivery: "Live online or classroom",
      assessment: "Written exam",
      certificate: "CITB-approved SSSTS Refresher",
      validity: "5 years from completion",
      entryRequirement: "Valid SSSTS certificate (within 5 years) and photo ID",
    },
    faqs: [
      {
        q: "What if my SSSTS is expired?",
        a: "Within 5 years — do the refresher. Over 5 years — you need the full 2-day SSSTS course.",
      },
    ],
    validity: "5 years",
  },

  {
    id: "smsts",
    pricingKey: "smsts",
    title: "SMSTS Course – Site Management Safety Training",
    shortTitle: "SMSTS Course",
    duration: "5 days",
    isOnline: true,
    isClassroom: true,
    defaultDelivery: "online",
    image: "/images/C4.webp",
    badge: null,
    metaTitle: "SMSTS Course – Site Management Safety Training | Book Online",
    metaDescription:
      "CITB-approved SMSTS for construction site managers. 5-day course online or classroom. 96% pass rate. Book now.",
    shortDescription:
      "The essential 5-day CITB-approved qualification for construction site managers. Manage teams, coordinate contractors, and ensure site compliance.",
    description:
      "SMSTS is the industry-standard qualification for anyone in a site management or leadership role. This 5-day CITB-approved programme teaches you your legal, moral, and social responsibilities for maintaining health, safety, and welfare on construction sites. Recognised by major contractors and required by many employers.",
    whyChoose: [
      "96% first-time pass rate – comprehensive support throughout",
      "Flexible delivery – online, classroom, weekday, weekend, or weekly options",
      "Free mock exams – full practice tests with instant feedback",
      "CITB-approved – nationally recognised qualification",
      "Same-day results – know if you've passed immediately",
      "CITB Grant eligible – reclaim course costs",
      "Experienced instructors – learn from construction safety experts",
    ],
    whatYouLearn: [
      "Health and Safety at Work Act (HSWA)",
      "CDM Regulations (Construction Design and Management)",
      "Your legal responsibilities as a construction leader",
      "Conducting risk assessments and method statements (RAMS)",
      "Identifying and controlling site hazards",
      "Managing contractors and subcontractors safely",
      "Working at height and scaffolding safety",
      "Electrical safety and excavation risks",
      "Running effective site inductions",
      "Delivering impactful toolbox talks and briefings",
    ],
    courseDetails: {
      duration: "5 days",
      delivery: "Live online or classroom",
      assessment: "Written exam (35 minutes)",
      certificate: "CITB-approved SMSTS",
      validity: "5 years (then 2-day refresher required)",
      entryRequirement: "Valid photo ID (passport or driving licence)",
    },
    assessment: {
      format: [
        "18 multiple-choice questions (1 mark each)",
        "7 short written-answer questions (2 marks each)",
        "Total: 32 marks",
        "Pass mark: 81% (26 correct answers)",
        "Duration: 35 minutes",
      ],
      passRate: "96%",
    },
    whoShouldAttend: [
      "Site managers running construction projects",
      "Project managers coordinating site activities",
      "Site supervisors stepping up to management",
      "Site engineers with safety responsibilities",
      "Foremen managing teams and contractors",
      "Construction planners and contracts managers",
      "Health and safety coordinators",
    ],
    deliveryOptions: [
      "Fast-Track: 5 consecutive days",
      "Weekend: Study over weekends",
      "Weekly: One day per week over 5 weeks",
      "Online: Live video sessions from home",
      "Classroom: Face-to-face at UK venues",
    ],
    faqs: [
      {
        q: "How long does the SMSTS certificate last?",
        a: "5 years. You must complete a 2-day SMSTS Refresher course before it expires.",
      },
      {
        q: "Can I do it fully online?",
        a: "Yes — our online delivery uses live tutor-led video sessions over 5 days.",
      },
    ],
    validity: "5 years",
  },

  {
    id: "smsts-refresher",
    pricingKey: "smsts_refresher",
    title: "SMSTS Refresher Course – Renew Your Site Manager Qualification",
    shortTitle: "SMSTS Refresher",
    duration: "2 days",
    isOnline: true,
    isClassroom: true,
    defaultDelivery: "online",
    image: "/images/C6.webp",
    badge: null,
    metaTitle: "SMSTS Refresher Course – Renew in 2 Days | Book Online",
    metaDescription:
      "SMSTS expiring? Renew with our 2-day CITB-approved SMSTS Refresher. Online or classroom. Book now.",
    shortDescription:
      "SMSTS certificate expiring soon? The 2-day SMSTS Refresher renews your qualification for another 5 years and updates you on current legislation.",
    description:
      "The SMSTS Refresher is a 2-day update course for site managers who completed the full SMSTS training within the last 5 years. It refreshes your knowledge of site safety, health, welfare, and environmental responsibilities while covering legislative changes and current HSE priorities.",
    whyChoose: [
      "96% first-time pass rate",
      "Free mock exams",
      "Flexible options – online, classroom, weekday, or weekend",
      "CITB-approved",
      "Same-day results",
      "Weekend & weekday classes",
      "CITB Grant eligible",
    ],
    whatYouLearn: [
      "Current HSE priorities and enforcement activities",
      "Changes to construction health and safety law",
      "Updated risk assessment best practices",
      "RIDDOR reporting requirements",
      "Behavioural safety and positive safety culture",
      "Mental health, substance abuse, and occupational health",
      "Updated techniques for site inductions and toolbox talks",
    ],
    courseDetails: {
      duration: "2 consecutive days",
      delivery: "Live online or classroom",
      assessment: "Written exam (35 minutes)",
      certificate: "CITB-approved SMSTS Refresher",
      validity: "5 years from completion",
      entryRequirement: "Valid SMSTS certificate (within 5 years) and photo ID",
    },
    faqs: [
      {
        q: "When should I book my refresher?",
        a: "Book 2–3 months before your certificate expires.",
      },
      {
        q: "What if my certificate has expired?",
        a: "Within 5 years — book the 2-day refresher. Over 5 years — you need the full 5-day SMSTS course.",
      },
    ],
    validity: "5 years",
  },
];

/** Helper: get course by id */
export const getCourseById = (id) => COURSES.find((c) => c.id === id) || null;
