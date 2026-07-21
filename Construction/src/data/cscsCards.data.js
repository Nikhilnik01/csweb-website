// src/data/cscsCards.data.js

export const CSCS_CARDS = [
  {
    id: 1,
    slug: "cscs-green-card",
      title: "CSCS Green Card",
    cardType: "Green Card",
    cardColor: "green",
    subtitle: "Labourer Card",
    badge: "Most Popular",
    cardImage: "/images/cscs-cards/1.webp",
    metaTitle: "CSCS Green Card Operative – Apply Online",
    metaDescription:
      "Apply for your CSCS Green Card Operative online. Fast, secure application.",
    validity: "2 years initially, then 5 years on renewal",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "The Green CSCS Card (Green Labourer Card) is your ticket to working on construction sites across the UK. Employers recognize this card as proof you understand basic health and safety practices needed for labouring work.",
    amount: 15.0,
    renewAmount: 10.0,
    isActive: true,
    cardContent: `<section class="cscs-green-card-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">Green CSCS Card - Your Essential Guide</h2>
            <p class="mb-3">The Green CSCS Card (Green Labourer Card) is your ticket to working on construction sites across the UK. Employers recognize this card as proof you understand basic health and safety practices needed for labouring work.</p>
          </div>
        </div>
      </div>
    </section>`,
  },

  {
    id: 2,
    slug: "trainee",
    title: "CSCS Red Card Trainee",
    cardType: "Red Card",
    cardColor: "red",
    subtitle: "Trainee Card",
    badge: null,
    cardImage: "/images/cscs-cards/25.webp",
    shortDescription:
      "This card is for someone who is registered to complete a vocational, academic or professional qualification.",
    metaTitle: "Red CSCS Trainee Card – Apply Online",
    metaDescription: "Apply for your Red CSCS Trainee Card online.",
    validity: "5 years",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "This card is for someone who is registered to complete a vocational, academic or professional qualification.",
    amount: 20.0,
    renewAmount: 15.0,
    isActive: true,
    cardContent: `<section class="cscs-red-trainee-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS Red Trainee Card</h2>
            <p class="mb-3">The <strong>Red Trainee Card</strong> is for trainees registered for vocational, academic or professional qualifications.</p>
            <p class="mb-3"><strong>Valid for 5 years - Cannot be renewed</strong></p>
          </div>
        </div>
      </div>
    </section>`,
  },

  {
    id: 3,
    slug: "red-apprentice",
    title: "CSCS Red Card Apprentice",
    cardType: "Red Card",
    cardColor: "red",
    subtitle: "Apprentice Card",
    badge: null,
    cardImage: "/images/cscs-cards/13.webp",
    shortDescription:
      "You will need to complete the Operatives Test to apply for this card. This is also known as CSCS Labourer / General Operative Card.",
    metaTitle: "Red CSCS Apprentice Card – Apply Online",
    metaDescription: "Apply for your Red CSCS Apprentice Card online.",
    validity: "4 years 6 months",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "You will need to complete the Operatives Test to apply for this card.",
    amount: 20.0,
    renewAmount: 15.0,
    isActive: true,
    cardContent: `<section class="cscs-red-card-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS Red Apprentice Card</h2>
            <p class="mb-3">The <strong>Red Apprentice Card</strong> is for apprentices starting their construction career.</p>
            <p class="mb-4">You must complete the CITB HS&E Operatives Test.</p>
            <h4 class="fw-bold mt-5 mb-3">Steps to Get a Red Apprentice Card</h4>
            <ol class="list-group list-group-numbered">
              <li class="list-group-item">Pass the CITB HS&E Operatives Test.</li>
              <li class="list-group-item">Apply for your CSCS Red Apprentice Card.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>`,
  },

  {
    id: 4,
    slug: "red-experienced-worker",
    title: "CSCS Red Card Experienced Worker",
    cardType: "Red Card",
    cardColor: "red",
    subtitle: "Experienced Worker Card",
    badge: null,
    cardImage: "/images/cscs-cards/9.webp",
    shortDescription:
      "The Red Experienced Worker Card is for skilled workers with site experience who are now completing an approved NVQ or SVQ.",
    metaTitle: "Red CSCS Experienced Worker Card - Apply Online",
    metaDescription: "Apply for your Red CSCS Experienced Worker Card online.",
    validity: "1 year",
    isQualificationsNeed: true,
    qualificationName: "Approved construction-related NVQ/SVQ Level 2 or above",
    description:
      "This temporary card bridges the gap between your practical trade experience and your formal qualification.",
    amount: 20.0,
    renewAmount: 15.0,
    isActive: true,
    cardContent: `<section class="cscs-red-experienced-worker-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS Red Experienced Worker Card</h2>
            <p class="mb-3">This card is for workers with on-site experience who are now completing a formal trade qualification.</p>
            <p class="mb-3"><strong>Valid for 1 year only - Not renewable</strong></p>
          </div>
        </div>
      </div>
    </section>`,
  },

  {
    id: 5,
    slug: "red-technical",
    title: "CSCS Red Card Technical, Supervisor, Managers",
    cardType: "Red Card",
    cardColor: "red",
    subtitle: "Technical/Supervisor/Manager",
    badge: null,
    cardImage: "/images/cscs-cards/7.webp",
    shortDescription:
      "This temporary card is only available to supervisors, managers and technical workers with on the job experience.",
    metaTitle: "Red CSCS Technical/Supervisor Card – Apply Online",
    metaDescription:
      "Apply for your Red CSCS Technical/Supervisor Card online.",
    validity: "3 years",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "This temporary card is only available to supervisors, managers and technical workers with on the job experience.",
    amount: 20.0,
    renewAmount: 15.0,
    isActive: true,
    cardContent: `<section class="cscs-red-tech-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS Red Technical/Supervisor Card</h2>
            <p class="mb-3">The <strong>Red Technical/Supervisor Card</strong> is for supervisors, managers and technical workers with on-the-job experience.</p>
            <p class="mb-3">You must be registered for NVQ Level 3 or higher.</p>
          </div>
        </div>
      </div>
    </section>`,
  },

  {
    id: 6,
    slug: "blue-skilled-worker",
    title: "CSCS Blue Card Skilled Worker",
    cardType: "Blue Card",
    cardColor: "blue",
    subtitle: "Skilled Worker Card",
    badge: null,
    cardImage: "/images/cscs-cards/2.webp",
    shortDescription:
      "To get a CSCS Blue Card you must have completed and hold certification for an NVQ or equivalent. Proof of the qualification must be submitted.",
    metaTitle: "Blue CSCS Skilled Worker Card – Apply Online",
    metaDescription: "Apply for your Blue CSCS Skilled Worker Card online.",
    validity: "5 years",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "To get a CSCS Blue Card you must have completed and hold certification for an NVQ or equivalent.",
    amount: 25.0,
    renewAmount: 20.0,
    isActive: true,
    cardContent: `<section class="cscs-blue-card-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS Blue Card</h2>
            <p class="mb-3">The <strong>Blue Skilled Worker Card</strong> is for tradespeople with <strong>NVQ Level 2</strong> qualifications.</p>
            <p class="mb-4">You must have completed your NVQ/SVQ and hold valid certification.</p>
            <h4 class="fw-bold mt-5 mb-3">Steps to Get a Blue Card</h4>
            <ol class="list-group list-group-numbered">
              <li class="list-group-item">Ensure your NVQ/SVQ Level 2 is complete and valid.</li>
              <li class="list-group-item">Pass the CITB HS&E Skilled Worker Test.</li>
              <li class="list-group-item">Apply for your CSCS Blue Card.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>`,
  },

    {
    id: 7,
    slug: "gold-skilled-worker",
    title: "CSCS Gold Card Advanced Craft",
    cardType: "Gold Card",
    cardColor: "gold",
    subtitle: "Advanced Craft Card",
    badge: null,
    cardImage: "/images/cscs-cards/3.webp",
    shortDescription:
      "The CSCS Advanced Craft Gold Card is for anyone who has completed an NVQ level 3 or apprenticeship qualification.",
    metaTitle: "Gold Advanced Craft CSCS Card – Apply Online",
    metaDescription: "Apply for your Gold Advanced Craft CSCS Card online.",
    validity: "5 years",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "The CSCS Advanced Craft Gold Card is for anyone who has completed an NVQ level 3 or apprenticeship qualification.",
    amount: 10.0,
    renewAmount: 15.0,
    isActive: true,
    cardContent: `<section class="cscs-gold-craft-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS Gold Advanced Craft Card</h2>
            <p class="mb-3">The <strong>Gold Advanced Craft Card</strong> is for advanced tradespeople with <strong>NVQ Level 3</strong> qualifications.</p>
          </div>
        </div>
      </div>
    </section>`,
  },
  
 
  {
    id: 8,
    slug: "gold-supervisor",
    title: "CSCS Gold Card Supervisory",
    cardType: "Gold Card",
    cardColor: "gold",
    subtitle: "Supervisory Card",
    badge: null,
    cardImage: "/images/cscs-cards/10.webp",
    shortDescription:
      "The CSCS Gold Card is for anyone in a supervisory position who has completed an NVQ/SVQ level 3 or 4.",
    metaTitle: "Gold Supervisory CSCS Card – Apply Online",
    metaDescription: "Apply for your Gold Supervisory CSCS Card online.",
    validity: "5 years",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "The CSCS Gold Card is for anyone in a supervisory position who has completed an NVQ/SVQ level 3 or 4.",
    amount: 20.0,
    renewAmount: 10.0,
    isActive: true,
    cardContent: `<section class="cscs-gold-card-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS Gold Supervisory Card</h2>
            <p class="mb-3">The <strong>Gold Supervisory Card</strong> is for supervisors with <strong>NVQ Level 3 or 4</strong> supervisory qualifications.</p>
          </div>
        </div>
      </div>
    </section>`,
  },


  
    {
    id: 9,
    slug: "black-manager",
    title: "CSCS Black Card Manager",
    cardType: "Black Card",
    cardColor: "black",
    subtitle: "Manager Card",
    badge: null,
    cardImage: "/images/cscs-cards/12.webp",
    shortDescription:
      "To get a CSCS Black Card is for anyone who has completed a construction management NVQ level 5, 6 or 7 or equivalent qualification.",
    metaTitle: "Black CSCS Manager Card – Apply Online",
    metaDescription: "Apply for your Black CSCS Manager Card online.",
    validity: "5 years",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "To get a CSCS Black Card is for anyone who has completed a construction management NVQ level 5, 6 or 7 or equivalent qualification.",
    amount: 40.0,
    renewAmount: 30.0,
    isActive: true,
    cardContent: `<section class="cscs-black-card-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS Black Manager Card</h2>
            <p class="mb-3">The <strong>Black Manager Card</strong> is for construction managers with <strong>NVQ Level 5, 6, or 7</strong> qualifications.</p>
          </div>
        </div>
      </div>
    </section>`,
  },
  



 {
    id: 10,
    slug: "white-academically",
    title: "CSCS White Card Academically Qualified Person",
    cardType: "White Card",
    cardColor: "white",
    subtitle: "Academically Qualified",
    badge: null,
    cardImage: "/images/cscs-cards/14.webp",
    shortDescription:
      "The CSCS White Card is for people who have completed construction related degrees or qualifications such as: HNDs, HNCs, CIOB Certificates and NEBOSH diplomas.",
    metaTitle: "White CSCS Card (Academic) – Apply Online",
    metaDescription: "Apply for your White CSCS Card (Academic) online.",
    validity: "5 years",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "The CSCS White Card is for people who have completed construction related degrees or qualifications.",
    amount: 30.0,
    renewAmount: 50.0,
    isActive: true,
    cardContent: `<section class="cscs-white-card-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS White Card (Academic)</h2>
            <p class="mb-3">The <strong>White Card (Academic)</strong> is for graduates with construction-related degrees (HND, HNC, CIOB, NEBOSH).</p>
          </div>
        </div>
      </div>
    </section>`,
  },
  {
    id: 11,
    slug: "white-professionally",
    title: "CSCS White Card Professionally Qualified Person",
    cardType: "White Card",
    cardColor: "white",
    subtitle: "Professionally Qualified",
    badge: null,
    cardImage: "/images/cscs-cards/6.webp",
    shortDescription:
      "This CSCS White Card is for people who are members of CSCS assessed professional bodies.",
    metaTitle: "White CSCS Card (Professional) – Apply Online",
    metaDescription: "Apply for your White CSCS Card (Professional) online.",
    validity: "5 years",
    isQualificationsNeed: true,
    qualificationName:
      "construction related degree, HND, HNC, CIOB Certificate or NEBOSH diploma",
    description:
      "This CSCS White Card is for people who are members of CSCS assessed professional bodies.",
    amount: 20.0,
    renewAmount: 30.0,
    isActive: true,
    cardContent: `<section class="cscs-white-prof-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS White Card (Professional)</h2>
            <p class="mb-3">The <strong>White Card (Professional)</strong> is for members of CSCS assessed professional bodies.</p>
          </div>
        </div>
      </div>
    </section>`,
  },
  {
    id: 12,
    slug: "red-provisional",
    title: "CSCS Red Card Provisional",
    cardType: "Red Card",
    cardColor: "red",
    subtitle: "Provisional Card",
    badge: null,
    cardImage: "/images/cscs-cards/11.webp",
    shortDescription:
      "The CSCS Red Card is a provisional (temporary) card for people who have never held a CSCS Card. The card lasts for 6 months and is not renewable.",
    metaTitle: "Red CSCS Provisional Card – Apply Online",
    metaDescription: "Apply for your Red CSCS Provisional Card online.",
    validity: "6 months",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "The CSCS Red Card is a provisional (temporary) card for people who have never held a CSCS Card.",
    amount: 20.0,
    renewAmount: 15.0,
    isActive: true,
    cardContent: `<section class="cscs-red-prov-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS Red Provisional Card</h2>
            <p class="mb-3">The <strong>Red Provisional Card</strong> is a temporary card for first-time applicants.</p>
            <p class="mb-3"><strong>Valid for 6 months only - Not renewable</strong></p>
          </div>
        </div>
      </div>
    </section>`,
  },

{
    id: 13,
    slug: "industry-placement",
    title: "CSCS Red Card Industry Placement",
    cardType: "Red Card",
    cardColor: "red",
    subtitle: "Industry Placement",
    badge: null,
    cardImage: "/images/cscs-cards/8.webp",
    shortDescription:
      "This card is for people who hold on the job experience and are registered to complete an NVQ or SVQ Level 2 or higher.",
    metaTitle: "Red CSCS Industry Placement Card – Apply Online",
    metaDescription: "Apply for your Red CSCS Industry Placement Card online.",
    validity: "1 year",
    isQualificationsNeed: false,
    qualificationName: null,
    description:
      "This card is for people who hold on the job experience and are registered to complete an NVQ or SVQ Level 2 or higher.",
    amount: 20.0,
    renewAmount: 15.0,
    isActive: true,
    cardContent: `<section class="cscs-red-industry-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="fw-bold mb-4 text-center">How to Get Your CSCS Red Industry Placement Card</h2>
            <p class="mb-3">The <strong>Red Industry Placement Card</strong> is for workers registered for NVQ/SVQ Level 2 or higher.</p>
            <p class="mb-3"><strong>Valid for 1 year only - Not renewable</strong></p>
          </div>
        </div>
      </div>
    </section>`,
  },

];



const CARD_DETAIL_CONTENT = {
  // start Green CSCS Card - Your Essential Guide

  "cscs-green-card": {
    whatIsIt: {
      heading: "Green CSCS Card - Your Essential Guide",
      paragraphs: [
        "The Green CSCS Card (Green Labourer Card) is your ticket to working on construction sites across the UK. Employers recognize this card as proof you understand basic health and safety practices needed for labouring work.",
      ],
    },
    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your first Green Card lasts 2 years. After that, you can renew it for 5 years if you show you're still working as a labourer. Good news - your CITB test is now valid for 3 years instead of 2, making renewal easier. Anyone who had a card before February 2025 can get another 5-year card with the same proof of employment.",
      ],
    },
    whatYouNeed: {
      heading: "What You Need",
      intro:
        "Getting your Green CSCS Card isn't complicated. You need two things:",
      items: [
        {
          title: "Pass the CITB Health, Safety and Environment Test",
          desc: "This is the standard construction safety test taken at approved centres nationwide. It's 50 questions, takes 45 minutes, and you need 45 marks to pass.",
        },
        {
          title: "Complete a Health & Safety Course",
          desc: "Most people do the Level 1 Award in Health and Safety (one-day course). Alternatives include the Scottish REHIS certificate or NOCN Construction Health and Safety unit.",
        },
      ],
    },
    howToApply: {
      heading: "Getting Your Card",
      intro:
        "First, book your CITB test at one of 150+ centres across the UK. Once you've passed, complete your one-day health and safety course. Haven't done the course yet? No problem - apply for a Red Provisional Card while you arrange your training.",
    },
    renewingYourCard: {
      heading: "Renewing Your Card",
      paragraphs: [
        "Expired card? Renew online through CSCS. For the 5-year renewal, just provide recent payslips or an employer letter confirming you're working in a labouring role.",
      ],
    },
    testInfo: {
      testType: "Operatives HS&E Test",
      duration: "45 minutes",
      questions: "50 questions",
      passScore: "45/50",
    },
    bookingInfo: {
      heading: "Book Your Test with Construction Customer Service",
      description:
        "Choose from over 150 test centres nationwide. for assistance.",
    },
  },

  // end Green CSCS Card - Your Essential Guide

  // start Blue CSCS Card - Skilled Worker Guide

  "blue-skilled-worker": {
    whatIsIt: {
      heading: "Blue CSCS Card - Skilled Worker Guide",
      paragraphs: [
        "The Blue CSCS Card is for skilled construction workers who've completed their trade qualifications. This card proves you're a qualified tradesperson with the health and safety knowledge required to work on construction sites across the UK.",
      ],
    },

    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your Blue Skilled Worker Card is valid for 5 years and can be renewed when it expires. As long as you maintain your qualifications and pass the required test, you can continue renewing your card. ",
      ],
    },

    whatYouNeed: {
      heading: "Who Qualifies?",
      intro:
        "The Blue CSCS Card is designed for workers who have proven their skills through formal qualifications.",

      items: [
        {
          title: "Construction Qualifications",
          desc: "You need an NVQ/SVQ Level 2 (or SCQF Level 5 in Scotland), a City & Guilds Craft Certificate, or a completed apprenticeship. This includes employer-sponsored apprenticeships and CSCS-recognised apprenticeship programmes.",
        },
        {
          title: "CITB Test Requirement",
          desc: "You must pass the CITB Health, Safety and Environment Test at the level relevant to your occupation. The test must have been taken within the last 2 years before applying. Not sure which test level you need? Call 0333 344 0036 for guidance.",
        },
        {
          title: "Don't Have Full Qualifications Yet?",
          desc: "If you're experienced but haven't completed your NVQ, you may qualify for an Experienced Worker Card while finishing your qualification.",
        },
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Start by booking your CITB Health, Safety and Environment Test for your specific trade. Once you've passed, gather your qualification certificates - your NVQ Level 2 certificate or equivalent qualification proof. ",
    },

    needs: {
      heading: "What You'll Need ",
      description: [
        "Have your documents ready: your NVQ/SVQ Level 2 certificate (or City and Guilds Craft Certificate), and your CITB test pass confirmation showing you passed within the last 2 years. Make sure your qualification matches your occupation and trade. ",
      ],
    },

    bookingInfo: {
      heading: "Book Your Test with Construction Customer Service",
      description:
        "Choose your test centre from over 150 locations nationwide. for help selecting the right test level for your trade.",
    },
  },

  // end Blue CSCS Card - Skilled Worker Guide

  // start Gold CSCS Card - Advanced Craft Guide

  "gold-skilled-worker": {
    whatIsIt: {
      heading: "Gold CSCS Card - Advanced Craft Guide",
      paragraphs: [
        "The Gold CSCS Card is for advanced craft workers who've reached the highest level of trade qualifications. This card demonstrates you're a highly skilled tradesperson with advanced technical ability and comprehensive health and safety knowledge for construction sites. ",
      ],
    },

    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your Gold Advanced Craft Card remains valid for 5 years from the issue date. You can renew it when it expires, provided you maintain your Level 3 qualifications and pass the required health and safety test.",
      ],
    },

    whatYouNeed: {
      heading: "Who Qualifies?",
      intro:
        "The Gold CSCS Card recognizes workers who've achieved advanced-level trade qualifications: ",

      items: [
        {
          title: "Advanced Qualifications",
          desc: "You must hold an NVQ/SVQ Level 3 (or SCQF Level 6 in Scotland) in a construction-related trade, or a City and Guilds Advanced Craft Certificate. Approved apprenticeships through NJCBI, BATJIC, or the Institute of Apprenticeships also qualify, as do employer-sponsored apprenticeships that included the Advanced Craft Certificate.",
        },
        {
          title: "Test Requirements",
          desc: "Pass the CITB Health, Safety and Environment Test at the appropriate level for your occupation within the last 2 years. Different trades require  different test levels, so check the Card Finder tool if you're unsure which test applies to  your role. ",
        },
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Book and pass your CITB Health, Safety and Environment Test at the correct level for your trade. Collect your qualification documents - your NVQ Level 3 certificate, Advanced Craft Certificate, or apprenticeship completion proof.",
    },

    needs: {
      heading: "What You'll Need ",
      description: [
        "Prepare your documentation: your NVQ/SVQ Level 3 certificate or City and Guilds Advanced Craft Certificate, plus your CITB test confirmation dated within the past 2 years. Your qualification must be construction-related and match the occupation you're applying for. ",
      ],
    },

    bookingInfo: {
      heading: "Book Your Test with Construction Customer Service",
      description:
        "Select from over 150 approved test centres throughout the UK. for guidance on which test level suits your trade.",
    },
  },

  //  end Gold CSCS Card - Advanced Craft Guide

  //  start Gold Supervisor CSCS Card - Supervisory Role Guide

  "gold-supervisor": {
    whatIsIt: {
      heading: "Gold Supervisor CSCS Card - Supervisory Role Guide",
      paragraphs: [
        "The Gold Supervisor CSCS Card is for construction professionals working in supervisory and technical positions. This card confirms you hold the necessary qualifications and specialist health and safety knowledge required to oversee construction work and manage site operations safely. ",
      ],
    },

    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your Gold Supervisor Card is valid for 5 years and can be renewed upon expiry. Maintaining your supervisory qualifications and passing the specialist test ensures continuous renewal eligibility. ",
      ],
    },

    whatYouNeed: {
      heading: "Who Qualifies?",
      intro:
        "The Gold Supervisor Card is specifically for those in supervisory or technical construction roles: ",

      items: [
        {
          title: "Supervisory Qualifications",
          desc: "You need a construction-related supervisory or technical NVQ/SVQ Level 3 or Level 4. These qualifications demonstrate you have the skills and knowledge to supervise site operations, manage teams, and oversee construction activities safely.",
        },
        {
          title: "Specialist Test Requirement",
          desc: " Pass the CITB Specialist Supervisory Health, Safety and Environment Test. This is different from the standard operative test - it covers supervisory responsibilities, site management, and higher-level safety knowledge relevant to those overseeing construction work.",
        },
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Book and pass the CITB Specialist Supervisory Health, Safety and Environment Test at an approved centre. Gather your supervisory qualification certificate - your NVQ/SVQ Level 3 or 4 in a supervisory or technical role.",
    },

    needs: {
      heading: "What You'll Need ",
      description: [
        "Have your documents prepared: your construction-related supervisory/technical NVQ/SVQ Level 3 or 4 certificate, and your CITB Specialist Supervisory test pass confirmation. Ensure your qualification clearly shows it's for a supervisory or technical construction role.",
      ],
    },

    bookingInfo: {
      heading: "Book Your Supervisors Test with Construction Customer Service",
      description:
        "Choose from over 150 test centres across the UK for your specialist supervisory exam. for assistance with your supervisory test booking. ",
    },
  },
  //  end Gold Supervisor CSCS Card - Supervisory Role Guide

  // start Black Manager CSCS Card - Management Role Guide

  "black-manager": {
    whatIsIt: {
      heading: "Black Manager CSCS Card - Management Role Guide",
      paragraphs: [
        "The Black Manager CSCS Card is for construction professionals working in management and senior technical positions on site. This card proves you possess advanced management qualifications and the specialist health and safety knowledge needed to manage construction projects and operations. ",
      ],
    },

    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your Black Manager Card is valid for 5 years and is renewable. Keeping your management qualifications current and passing the managers' test ensures you can continue renewing your card.",
      ],
    },

    whatYouNeed: {
      heading: "Who Qualifies?",
      intro:
        "The Black Manager Card is for those in construction management and senior technical roles: ",

      items: [
        {
          title: "Management Qualifications",
          desc: " You must hold a construction management or technical NVQ/SVQ Level 4, 5, 6, or 7, or an SVQ at SCQF Level 10 or 11 in Scotland. These qualifications demonstrate your capability to manage construction sites, projects, and strategic operations. For Level 5, 6, or 7 applications, you should have previously held a Level 4 qualification.",
        },
        {
          title: "Managers' Test Requirement",
          desc: " Pass the CITB Managers and Professionals Health, Safety and Environment Test. This specialist exam covers management-level responsibilities, risk assessment, legal duties, and the higher-level safety knowledge expected of construction managers and professionals.",
        },
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Book and pass the CITB Managers and Professionals Health, Safety and Environment Test at your nearest centre. Prepare your management qualification certificate - your NVQ/SVQ Level 4, 5, 6, or 7 in construction management or technical discipline.",
    },

    needs: {
      heading: "What You'll Need ",
      description: [
        "Ensure you have your documents ready: your construction management or technical NVQ/SVQ certificate at the appropriate level (4-7), and your CITB Managers and Professionals test pass confirmation. If applying with Level 5+ qualifications, proof of your previous Level 4 qualification may be required.",
      ],
    },

    bookingInfo: {
      heading: "Book Your Managers Test with Construction Customer Service",
      description:
        "Select from over 150 approved test centres nationwide for your managers' and professionals' exam. for help with your management test booking. ",
    },
  },

  // end Black Manager CSCS Card - Management Role Guide

  // start White Academically Qualified Person (AQP) CSCS Card Guide

  "white-academically": {
    whatIsIt: {
      heading: "White Academically Qualified Person (AQP) CSCS Card Guide",
      paragraphs: [
        "The White Academically Qualified Person CSCS Card is for construction professionals who've achieved academic qualifications rather than vocational ones. This card recognizes degree-level education and professional certifications relevant to the construction industry.",
      ],
    },

    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your White AQP Card is valid for 5 years from the date of issue and can be renewed as long as you maintain your academic credentials and pass the required health and safety test. ",
      ],
    },

    whatYouNeed: {
      heading: "Who Qualifies?",
      intro:
        "The AQP Card is available for those with specific construction-related academic achievements:",

      items: [
        {
          title: "Academic Qualifications",
          desc: "  You need certain construction-related degrees, HNDs (Higher National Diplomas), HNCs (Higher National Certificates), CIOB (Chartered Institute of Building) Certificates, or specific NEBOSH diplomas and certificates. Not all academic qualifications automatically qualify, Call us on 0333 344 0036 and we’ll be happy to help. ",
        },
        {
          title: "Test Requirements",
          desc: " Pass either the CITB Managers and Professionals Health, Safety and Environment Test or the CIC Health and Safety Test. Both tests cover the professional-level safety knowledge expected of academically qualified construction professionals. ",
        },
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Check whether your qualification is eligible by calling us to verify if it is accepted on 0333 344 0036 — simply speak to our team and we’ll guide you through the process. Book and pass either the CITB Managers and Professionals test or CIC test. Gather your academic qualification certificate plus evidence of the units or modules you completed within that qualification where possible.",
    },

    needs: {
      heading: "What You'll Need ",
      description: [
        "Prepare your academic documents: your degree certificate, HND/HNC, CIOB Certificate, or NEBOSH qualification, along with your academic transcript or unit breakdown if available. You'll also need your CITB Managers and Professionals test pass or CIC test pass confirmation. ",
      ],
    },

    bookingInfo: {
      heading: "Book Your Test with Construction Customer Service",
      description:
        "Choose from over 150 test centres throughout the UK for your managers and professionals exam. for guidance on which test suits your qualification level.",
    },
  },

  // end White Academically Qualified Person (AQP) CSCS Card Guide

  // start White Professionally Qualified Person (PQP) CSCS Card Guide
  "white-professionally": {
    whatIsIt: {
      heading: "White Professionally Qualified Person (PQP) CSCS Card Guide",
      paragraphs: [
        "The White Professionally Qualified Person CSCS Card is for members of CSCS-approved professional bodies working in the construction industry. This card recognizes your professional membership and chartered status with recognized construction institutions.",
      ],
    },

    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your White PQP Card is valid for 5 years. Unlike other CSCS cards, this card cannot be renewed - when it expires, you must apply for a new Professionally Qualified Person card rather than renewing your existing one.",
      ],
    },

    whatYouNeed: {
      heading: "Who Qualifies?",
      intro:
        "The PQP Card is exclusively for current members of CSCS-approved professional bodies:",

      items: [
        {
          title: "Professional Membership",
          desc: "   You must hold current, active membership with a CSCS-approved professional body at a level that CSCS accepts. Your membership must be for the current calendar year and renewed annually. If your professional membership lapses or is revoked, your CSCS card may be cancelled without notice. ",
        },
        {
          title: "Test Requirements",
          desc: "  Pass either the CITB Managers and Professionals Health, Safety and Environment Test or the CIC Health and Safety Test. Both exams assess the professional-level safety knowledge expected of chartered and professionally qualified construction practitioners. ",
        },
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Book and pass either the CITB Managers and Professionals test or CIC test at an approved centre. Prepare proof of your current professional body membership - this must clearly show membership for the current calendar year. ",
    },

    // What You'll Need Section Data
    WhatYoullNeed: {
      heading: "What You'll Need",
      paragraphs: [
        "You must provide one of the following as proof of current professional membership:",
      ],
      list: [
        "Membership certificate showing current calendar year membership",
        "Membership card (both sides) confirming current year validity",
        "Recent letter or email from your professional body confirming active membership",
        "Payment receipt for current year membership fees",
        "Dated screenshot from your professional body's website showing active membership status",
      ],
      note: "Your evidence must clearly show your membership level and confirm it's valid for the current calendar year.",
    },

    bookingInfo: {
      heading: "Book Your Test with Construction Customer Service",
      description:
        "Select from over 150 test centres across the UK for your managers and professionals examination. for assistance with your professional-level test booking.",
    },
  },

  // end White Professionally Qualified Person (PQP) CSCS Card Guide

  // start Red Provisional CSCS Card - Temporary Entry Guide

  "red-provisional": {
    whatIsIt: {
      heading: "Red Provisional CSCS Card - Temporary Entry Guide",
      paragraphs: [
        "The Red Provisional CSCS Card is a temporary card for individuals new to the construction industry who haven't held a CSCS card before. This short-term card allows you to work on site while you complete the necessary qualifications for a full CSCS card.",
      ],
    },

    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your Red Provisional Card is valid for 6 months only and cannot be renewed. This card can only be issued once in your lifetime - you cannot apply for another provisional card after it expires. Before expiry, you should register for or complete a recognized construction qualification and apply for the appropriate full CSCS card for your occupation. ",
      ],
    },

    whatYouNeed: {
      heading: "Who Qualifies?",
      intro:
        "The Red Provisional Card is strictly for newcomers to the construction industry: ",

      items: [
        {
          title: "First-Time Applicants Only",
          desc: "You can only apply if you've never held any CSCS card before. This card is designed for workers during probationary periods while employers assess their suitability for construction work. It gives you 6 months to prove yourself and arrange proper training. ",
        },
        {
          title: "Test Requirements",
          desc: " Pass the CITB Health, Safety and Environment Test for operatives within the past 2 years. No construction qualifications are needed at this stage - the provisional card allows you to work while you register for and complete your NVQ, SVQ, or other recognized qualification.",
        },
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Book and pass the CITB Health, Safety and Environment Test at any approved centre nationwide. Once you've passed, no qualification certificates are needed for the provisional card application.",
    },

    needs: {
      heading: "What Happens After 6 Months?",
      description: [
        "Use your provisional period wisely. Register for a construction-related qualification that matches your trade or role, such as an NVQ Level 2 for skilled work or the Level 1 Health and Safety course for labouring. Before your 6 months expire, apply for the appropriate full CSCS card - Green for labourers, Blue for skilled workers, or whichever card suits your completed qualifications and job role. ",
      ],
    },

    bookingInfo: {
      heading: "Book Your Test with Construction Customer Service",
      description:
        "Choose from over 150 test centres across the UK to take your operative test. for assistance.",
    },
  },

  // end Red Provisional CSCS Card - Temporary Entry Guide

  //start Red Apprentice CSCS Card - Apprenticeship Guide

  "red-apprentice": {
    whatIsIt: {
      heading: "Red Apprentice CSCS Card - Apprenticeship Guide",
      paragraphs: [
        "The Red Apprentice CSCS Card is for individuals who've started a recognized construction apprenticeship. This card supports you throughout your apprenticeship journey, giving you site access while you complete your training and work towards a full skilled worker card.",
      ],
    },

    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your Red Apprentice Card is valid for 4 years and 6 months and cannot be renewed. This timeframe allows you to complete your apprenticeship programme. By the time your card expires, you're expected to have finished your apprenticeship and be ready to apply for a skilled CSCS card - typically a Blue Skilled Worker Card or Gold Advanced Craft Card depending on your qualification level.",
      ],
    },

    whatYouNeed: {
      heading: "Who Qualifies?",
      intro:
        "The Red Apprentice Card is exclusively for registered apprentices: ",

      items: [
        {
          title: "Apprenticeship Registration",
          desc: " You must be enrolled on a recognized construction apprenticeship programme. Proof of your apprenticeship registration is required from your employer, training provider, or managing agency. This card is only available to active apprentices working towards their trade qualifications. ",
        },
        {
          title: "Test Requirements",
          desc: "  Pass the CITB Health, Safety and Environment Test or an approved alternative. Your test pass must be current and valid when you apply. The test ensures you have basic safety knowledge before starting work on construction sites as an apprentice. ",
        },
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Book and pass your CITB Health, Safety and Environment Test at an approved centre. Ask your employer, training provider, or managing agency to complete the Enrolment Evidence Form - this document contains all the necessary evidence for your application and helps avoid delays.",
    },

    needs: {
      heading: "Important Information",
      description: [
        "The Enrolment Evidence Form can be completed before your apprenticeship start date, but if your apprenticeship doesn't commence for any reason, you must notify CSCS immediately. CSCS may contact the person named on your form or the form completer for verification as part of routine auditing, so ensure all details are accurate. ",
      ],
    },

    bookingInfo: {
      heading: "Book Your Test with Construction Customer Service",
      description:
        "Select from over 150 test centres throughout the UK for your operative test. for help with your apprentice test booking.",
    },
  },

  //end Red Apprentice CSCS Card - Apprenticeship Guide

  //start Red Experienced Worker CSCS Card - Transitional Guide

  "red-experienced-worker": {
    whatIsIt: {
      heading: "Red Experienced Worker CSCS Card - Transitional Guide",
      paragraphs: [
        "The Red Experienced Worker CSCS Card is for skilled construction workers with on-the-job experience who are now working towards formal qualifications. This card bridges the gap between your proven experience and achieving your NVQ or SVQ certification. ",
      ],
    },

    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your Red Experienced Worker Card is valid for 1 year only and cannot be renewed. This gives you 12 months to complete your registered qualification. By the time your card expires, you should have finished your NVQ/SVQ and be ready to apply for a full skilled CSCS card - either Blue or Gold depending on your qualification level.",
      ],
    },

    whatYouNeed: {
      heading: "Who Qualifies?",
      intro:
        "The Experienced Worker Card is for those with practical experience now formalizing their skills: ",

      items: [
        {
          title: "Experience Requirements",
          desc: "  You must have significant on-the-job construction experience (typically at least one year within the last three years) in your trade. This card recognizes your existing skills while you work towards official recognition through qualifications.",
        },
        {
          title: "Qualification Registration",
          desc: "  You must be registered to complete an approved construction-related NVQ/SVQ Level 2, SVQ at SCQF Level 5, or higher. Proof of registration from your training provider or assessment centre is required - simply having experience isn't enough; you must be actively working towards your qualification.",
        },
        {
          title: "Test Requirements",
          desc: " Pass the CITB Health, Safety and Environment Test at the appropriate level for your occupation within the last 2 years. Different trades require different test levels, so use the CSCS Card Finder tool to check which test level matches your occupation and qualification.",
        },
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Book and pass your CITB Health, Safety and Environment Test at an approved centre. Ask your employer, training provider, or managing agency to complete the Enrolment Evidence Form - this document contains all the necessary evidence for your application and helps avoid delays.",
    },

    needs: {
      heading: "What You'll Need ",
      description: [
        "Prepare your documents: registration confirmation from your training provider showing you're enrolled on an approved NVQ/SVQ Level 2 or higher, and your CITB test pass dated within the past 2 years at the relevant level for your occupation. Your qualification must be construction-related and match your work role.",
      ],
    },

    bookingInfo: {
      heading: "Book Your Test with Construction Customer Service",
      description:
        "Choose from over 150 approved test centres nationwide for your operative or specialist test. for guidance on selecting the right test level.",
    },
  },
  //end Red Experienced Worker CSCS Card - Transitional Guide

  //start Red Experienced Technical, Supervisor, Manager CSCS Card Guide

  "red-technical": {
    whatIsIt: {
      heading: "Red Experienced Technical, Supervisor, Manager CSCS Card Guide",
      paragraphs: [
        "The Red Experienced Technical, Supervisor, Manager CSCS Card is for construction professionals in supervisory, management, or technical roles who have practical experience and are now working towards formal qualifications. This temporary card allows experienced leaders to continue working on site while completing their NVQ or SVQ.",
      ],
    },

    cardValidity: {
      heading: "Card Validity",
      paragraphs: [
        "Your Red Experienced TSM Card is valid for 3 years and cannot be renewed. This extended period gives you time to complete your Level 3 or higher qualification in a supervisory, management, or technical discipline. By expiry, you should have finished your NVQ/SVQ and be ready to apply for the appropriate skilled CSCS card - Gold Supervisor, Black Manager, or White card depending on your qualification. ",
      ],
    },

    whatYouNeed: {
      heading: "Who Qualifies?",
      intro:
        "The Experienced TSM Card is specifically for those in leadership or technical positions:",

      items: [
        {
          title: "Experience Requirements",
          desc: " You must have substantial on-the-job experience in a supervisory, management, or technical construction role (normally at least one year within the last three years). This card acknowledges your existing capability while you formalize your skills through recognized qualifications.",
        },
        {
          title: "Qualification Registration",
          desc: "You must be registered to complete an approved construction-related Technical, Supervisory or Management (TSM) NVQ/SVQ Level 3, SVQ at SCQF Level 6, or higher. Proof of registration from your training provider or assessment centre is mandatory - you must be actively pursuing your qualification, not just planning to start.",
        },
        {
          title: "Test Requirements",
          desc: "  Pass the appropriate level CITB Health, Safety and Environment Test within the last 2 years. For supervisory and management roles, this typically means the Specialist Supervisory test or Managers and Professionals test. Call us on 0333 344 0036 to confirm which test level matches your occupation and qualification pathway.",
        },
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Book and pass the correct CITB Health, Safety and Environment Test for your role - Call us 0on 0333 344 0036 to confirm if unsure which level applies. Obtain registration confirmation from your training provider showing you're enrolled on an approved TSM NVQ/SVQ Level 3 or higher.",
    },

    needs: {
      heading: "What You'll Need ",
      description: [
        "Have your documentation ready: registration proof from your training provider confirming enrolment on an approved Technical, Supervisory or Management NVQ/SVQ Level 3 or above, and your CITB test pass dated within the past 2 years at the appropriate level for your occupation. Your qualification must be construction-related and match your supervisory, management, or technical role.",
      ],
    },

    bookingInfo: {
      heading: "Book Your Test with Construction Customer Service ",
      description:
        "Select from over 150 test centres across the UK for your specialist test. for guidance on which test level suits your position. ",
    },
  },
  //end Red Experienced Technical, Supervisor, Manager CSCS Card Guide

  
  //start Red Trainee CSCS Card - Student & Learner Guide

  trainee: {
    whatIsIt: {
      heading: "Red Trainee CSCS Card - Student & Learner Guide",
      paragraphs: [
        "The Red Trainee CSCS Card is for individuals registered on vocational, academic, or professional construction qualifications. This card supports students and learners while they study and work towards achieving the qualifications needed for a full skilled CSCS card.",
      ],
    },

    whatYouNeed: {
      heading: "Card Validity",
      intro:
        "The Trainee Card comes in two types depending on your qualification route:",

      items: [
        {
          title: "Five-Year Trainee Card (Non-Renewable)",
          desc: " For those registered on and working towards competence-assessed qualifications like NVQ/SVQ, or academic qualifications such as HNC, HND, or construction-related degrees. You're expected to complete your qualification before the card expires. This card cannot be renewed. ",
        },
        {
          title: "Two-Year Trainee Card (Renewable)",
          desc: " For individuals who've completed an approved Level 2 (or above) occupation-related non-competence qualification within the last 5 years. After expiry, you can obtain a new three-year Trainee card by providing evidence you've registered onto an NVQ/SVQ or agreed alternative competence qualification.",
        },
      ],
    },

    validity: {
      heading: "Who Qualifies? ",
      intro: "The Red Trainee Card supports various learning pathways: ",

      items: [
        {
          title: "Vocational Route",
          desc: " You must be registered on a competence-assessed qualification such as an NVQ or SVQ that's acceptable for a skilled CSCS card. Your qualification must relate directly to your construction occupation and lead to full certification. ",
        },
        {
          title: "Academic Route",
          desc: "You can be registered on academic qualifications including HNC, HND, or construction-related degrees. These qualifications must be acceptable for skilled CSCS cards and recognized by CSCS as appropriate for the construction industry. ",
        },
        {
          title: "Professional Route",
          desc: "Registration through a professional body is also accepted, provided the qualification meets CSCS standards and leads to an appropriate skilled card upon completion.",
        },
      ],
    },

    card: {
      heading: "Test Requirements",
      paragraphs: [
        "Pass either the Operative level CITB Health, Safety and Environment Test (accepted for all Trainee card applications) or the CIC Health and Safety Test (only acceptable for those registered on academic qualifications such as HNC, HND, or degrees) within the last 2 years before applying. ",
      ],
    },

    howToApply: {
      heading: "Getting Your Card",
      intro:
        "Book and pass the appropriate CITB Health, Safety and Environment Test or CIC test at an approved centre. Obtain registration proof from your training provider, university, or professional body confirming you're enrolled on an approved qualification.",
    },

    // What You'll Need Section Data

    whatYouWillNeed: {
      heading: "What You'll Need",
      paragraphs: ["Prepare your documents based on your card type:"],
      list: [
        "For Five-Year Card: Registration confirmation showing you're enrolled on a competence-assessed NVQ/SVQ or academic qualification (HNC/HND/Degree), plus your test pass from the last 2 years.",
        "For Two-Year Card: Certificate showing you completed an approved Level 2+ non-competence qualification within the last 5 years, plus your test pass from the last 2 years.",
      ],
      note: "Your qualification must be construction-related and acceptable for a skilled CSCS card upon completion.",
    },

    bookingInfo: {
      heading: "Book Your Test with Construction Customer Service ",
      description:
        "Choose from over 150 test centres nationwide for your operative test or CIC test. for assistance with your trainee test booking.",
    },
  },

  //end Red Trainee CSCS Card - Student & Learner Guide

  "industry-placement": {
    whatIsIt: {
      heading: "CSCS Red Card Industry Placement",
      paragraphs: [
        "This card is for people who hold on the job experience and are registered to complete an NVQ or SVQ Level 2 or higher.",
      ],
    },
  },
};

const enrichCard = (card) => ({
  ...card,
  ...(CARD_DETAIL_CONTENT[card.slug] || {}),
});

// Helper functions
export const getCardBySlug = (slug) => {
  const card = CSCS_CARDS.find((item) => item.slug === slug);
  return card ? enrichCard(card) : null;
};

export const getCardById = (id) => {
  const card = CSCS_CARDS.find((item) => item.id === id);
  return card ? enrichCard(card) : null;
};

export const getCardsByColor = (color) => {
  return CSCS_CARDS.filter((card) => card.cardColor === color).map(enrichCard);
};

export const getAllCardSlugs = () => {
  return CSCS_CARDS.map((card) => card.slug);
};
