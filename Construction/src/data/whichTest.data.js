// src/data/whichTest.data.js

export const WHICH_TEST_PAGE = {
  hero: {
    heading: "Which CITB Test Do I Need?",
    subheading:
      "Not sure which CITB Health, Safety & Environment Test you need to book? Use this guide to find the right test for your role and CSCS card.",
    ctaLabel: "Book Your Test",
    ctaHref: "/citb",
  },

  overview: {
    heading: "About the CITB HS&E Test",
    paragraphs: [
      "The CITB Health, Safety and Environment (HS&E) Test is a computer-based assessment required for most CSCS cards. It tests your knowledge of health, safety, and environmental topics relevant to your role on a UK construction site.",
      "There are four versions of the test — each designed for a different level of responsibility. Selecting the correct test is essential: you must take the version that matches the CSCS card you're applying for.",
      "Tests are available at approved CITB test centres across the UK. The Operatives Test is also available in multiple languages.",
    ],
  },

  tests: [
    {
      id: "operatives",
      icon: "hard-hat",
      color: "green",
      title: "CITB Health, Safety & Environment Operatives Test",
      subtitle: "For General Construction Workers",
      description:
        "The most commonly taken CITB test. Designed for workers in unskilled or semi-skilled roles on construction sites.",
      whoShouldTake: [
        "General labourers and construction operatives",
        "Site cleaners, gatemen, and banksmen",
        "Traffic marshals and hod carriers",
        "Anyone applying for the CSCS Green Card",
        "Red Card applicants (apprentices and trainees)",
      ],
      relatedCards: [
        "CSCS Green Card (Labourer)",
        "Red CSCS Apprentice Card",
        "Red Experienced Technical CSCS Card",
        "Trainee CSCS Card",
      ],
      duration: "45 minutes",
      questions: 50,
      passScore: "45/50 (90%)",
      languages: "Available in 25+ languages",
      ctaLabel: "Book Operatives Test",
      ctaHref: "/citb",
    },
    {
      id: "specialists",
      icon: "tools",
      color: "blue",
      title: "CITB Health, Safety & Environment Specialist Test",
      subtitle: "For Skilled Tradespeople",
      description:
        "For construction workers in specialist or skilled roles working towards a Blue or Gold Skilled Worker CSCS Card.",
      whoShouldTake: [
        "Carpenters, bricklayers, plasterers, plumbers",
        "Electricians, painters, roofers, tilers",
        "Any skilled tradesperson with NVQ Level 2",
        "Workers applying for the Blue Skilled Worker Card",
        "Advanced tradespeople seeking the Gold Skilled Worker Card",
      ],
      specialistTestInfo:
        "The Specialist test covers everything in the standard Operative test, plus trade-specific health and safety questions for your occupation. There are 12 approved Specialist tests:",
      specialistTestTypes: [
        "Supervisory",
        "Demolition",
        "Plumbing",
        "Highway Works",
        "Working at Height",
        "Lifts and Escalators",
        "Tunnelling",
        "HVACR – Heating and Plumbing Services",
        "HVACR – Pipefitting and Welding",
        "HVACR – Ductwork",
        "HVACR – Refrigeration and Air Conditioning",
        "HVACR – Service and Facilities Maintenance",
      ],
      relatedCards: [
        "Blue Skilled Worker CSCS Card",
        "Gold Skilled Worker CSCS Card",
      ],
      duration: "45 minutes",
      questions: 50,
      passScore: "45/50 (90%)",
      languages: "English only",
      ctaLabel: "Book Specialists Test",
      ctaHref: "/citb",
    },
    {
      id: "supervisors",
      icon: "clipboard",
      color: "gold",
      title: "CITB Health, Safety & Environment Supervisors & Managers Test",
      subtitle: "For Site Supervisors",
      description:
        "Designed for workers in a supervisory capacity. Required for the Gold Supervisory CSCS Card.",
      whoShouldTake: [
        "Site supervisors and working foremen",
        "Gang leaders with supervisory responsibilities",
        "Workers with NVQ Level 3 or 4",
        "Anyone applying for the Gold Supervisory Card",
      ],
      relatedCards: ["Gold Supervisory CSCS Card"],
      duration: "45 minutes",
      questions: 50,
      passScore: "45/50 (90%)",
      languages: "English only",
      ctaLabel: "Book Supervisors Test",
      ctaHref: "/citb",
    },
    {
      id: "managers",
      icon: "briefcase",
      color: "black",
      title: "CITB Health, Safety & Environment Managers & Professionals Test",
      subtitle: "For Site Managers and Directors",
      description:
        "The most advanced CITB test. Required for senior managers, directors, and professionals applying for the Black Manager Card.",
      whoShouldTake: [
        "Construction site managers",
        "Project managers and contracts managers",
        "Site directors and senior professionals",
        "Anyone with NVQ Level 6 applying for the Black Manager Card",
        "PQP Card applicants (professionally qualified persons)",
      ],
      relatedCards: ["Black Manager CSCS Card", "PQP CSCS Card"],
      duration: "45 minutes",
      questions: 50,
      passScore: "45/50 (90%)",
      languages: "English only",
      ctaLabel: "Book Managers Test",
      ctaHref: "/citb",
    },
  ],

  // quickFinder: {
  //   heading: "Not Sure? Use Our Quick Finder",
  //   subheading: "Select your role type to instantly see which test you need.",
  //   roles: [
  //     {
  //       label: "Labourer / Unskilled Worker",
  //       testId: "operatives",
  //       card: "Green Card",
  //     },
  //     { label: "Apprentice / Trainee", testId: "operatives", card: "Red Card" },
  //     {
  //       label: "Skilled Tradesperson (e.g. Carpenter, Bricklayer)",
  //       testId: "specialists",
  //       card: "Blue Card",
  //     },
  //     {
  //       label: "Advanced Tradesperson (NVQ Level 3)",
  //       testId: "specialists",
  //       card: "Gold Skilled Worker Card",
  //     },
  //     {
  //       label: "Site Supervisor / Foreman",
  //       testId: "supervisors",
  //       card: "Gold Supervisory Card",
  //     },
  //     {
  //       label: "Site Manager / Project Manager",
  //       testId: "managers",
  //       card: "Black Manager Card",
  //     },
  //   ],
  // },

  languagesSection: {
    heading: "Test Languages",
    body: "The Operatives Test is the only CITB test available in languages other than English. If English is not your first language, you may take the Operatives Test in your chosen language. All other tests (Specialists, Supervisors & Managers, Managers & Professionals) are available in English only.",
  },

  faq: [
    {
      q: "What happens if I take the wrong test?",
      a: "Your test result will not be accepted for the CSCS card you're applying for. You would need to rebook and retake the correct test. Always confirm which test your card requires before booking.",
    },
    {
      q: "How long is a CITB test pass valid?",
      a: "CITB test passes are valid for 2 years from the date you pass. Your CSCS card application must be submitted within that 2-year window.",
    },
    {
      q: "Can I retake the test if I fail?",
      a: "Yes — you can retake the test after a minimum waiting period. There is no limit on the number of attempts.",
    },
    {
      q: "How much does the CITB test cost?",
      a: "The test fee is £36. Our booking fee is £9. Total: £45.",
    },
  ],
};
