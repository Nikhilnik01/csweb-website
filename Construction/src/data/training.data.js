// src/data/training.data.js

export const NVQ_LEVELS = [
  {
    id: "nvq-overview",
    title: "Construction NVQ Qualifications",
    shortDescription:
      "Comprehensive overview of construction NVQ qualifications from Level 2 to Level 7. Learn about assessment methods, CSCS cards, and the pathways available.",
    badge: "All Levels",
    cscsCardAwarded: "Blue, Gold, or Black Card",
    duration: "6-8 weeks average",
    assessment: "On-site & evidence-based",
    image: "/images/training1.jpg",
  },
  {
    id: "nvq-level-2",
    title: "NVQ Level 2 Qualifications",
    shortDescription:
      "Skilled trades qualifications including Painting & Decorating, Site Carpentry, Groundworking, Steelfixing, Passive Fire Protection, Dry Lining, and Formwork.",
    badge: "Level 2",
    cscsCardAwarded: "Blue CSCS Card",
    duration: "6-12 weeks",
    assessment: "On-site observation",
    image: "/images/training1.jpg",
  },
  {
    id: "nvq-level-3",
    title: "NVQ Level 3 Occupational Work Supervision",
    shortDescription:
      "For experienced tradespeople stepping up to supervise teams. Prove your ability to manage people, coordinate work, and run site operations.",
    badge: "Level 3",
    cscsCardAwarded: "Gold CSCS Card",
    duration: "8-14 weeks",
    assessment: "On-site supervision",
    image: "/images/training1.jpg",
  },
  {
    id: "nvq-level-4",
    title: "NVQ Level 4 Site Supervision",
    shortDescription:
      "For assistant site managers coordinating multiple activities. Bridge between hands-on supervision and full site management responsibilities.",
    badge: "Level 4",
    cscsCardAwarded: "Gold CSCS Card",
    duration: "8-12 weeks",
    assessment: "On-site & documentation",
    image: "/images/training1.jpg",
  },
  {
    id: "nvq-level-7",
    title: "NVQ Level 7 Construction Senior Management",
    shortDescription:
      "Master's degree equivalent for senior managers directing operations, managing budgets, and setting organizational strategy. Pathway to MCIOB.",
    badge: "Level 7",
    cscsCardAwarded: "Black CSCS Manager Card",
    duration: "12-16 weeks",
    assessment: "Strategic & commercial evidence",
    image: "/images/training1.jpg",
  },
];

// Individual NVQ course data for specific trades (Level 2)
export const NVQ_LEVEL2_TRADES = [
  {
    id: "nvq-level-2-painting",
    title: "NVQ Level 2 Painting & Decorating",
    shortDescription:
      "For painters and decorators working on internal and external surfaces of homes, commercial buildings, and construction sites.",
    badge: "Level 2 Trade",
    cscsCardAwarded: "Blue CSCS Card",
    duration: "6-12 weeks",
    assessment: "On-site observation",
    image: "/images/training1.jpg",
  },
  {
    id: "nvq-level-2-carpentry",
    title: "NVQ Level 2 Site Carpentry",
    shortDescription:
      "For carpenters working on construction sites, installing structural and finishing carpentry including first and second fix items.",
    badge: "Level 2 Trade",
    cscsCardAwarded: "Blue CSCS Card",
    duration: "6-12 weeks",
    assessment: "On-site observation",
    image: "/images/training1.jpg",
  },
  {
    id: "nvq-level-2-groundworking",
    title: "NVQ Level 2 Groundworking",
    shortDescription:
      "For groundworkers carrying out foundation, drainage, and external works on construction projects.",
    badge: "Level 2 Trade",
    cscsCardAwarded: "Blue CSCS Card",
    duration: "6-12 weeks",
    assessment: "On-site observation",
    image: "/images/training8.jpg",
  },
  {
    id: "nvq-level-2-steelfixing",
    title: "NVQ Level 2 Steelfixing",
    shortDescription:
      "For steelfixers who prepare and install reinforcement in concrete structures to drawings and specifications.",
    badge: "Level 2 Trade",
    cscsCardAwarded: "Blue CSCS Card",
    duration: "6-12 weeks",
    assessment: "On-site observation",
    image: "/images/training1.jpg",
  },
  {
    id: "nvq-level-2-fire-protection",
    title: "NVQ Level 2 Passive Fire Protection",
    shortDescription:
      "For operatives installing fire-stopping and fire-resistant systems that prevent fire and smoke spread in buildings.",
    badge: "Level 2 Trade",
    cscsCardAwarded: "Blue CSCS Card",
    duration: "6-12 weeks",
    assessment: "On-site observation",
    image: "/images/training10.jpg",
  },
  {
    id: "nvq-level-2-dry-lining-fixing",
    title: "NVQ Level 2 Dry Lining Fixing",
    shortDescription:
      "For dry liners who install plasterboard and metal framing systems on walls and ceilings.",
    badge: "Level 2 Trade",
    cscsCardAwarded: "Blue CSCS Card",
    duration: "6-12 weeks",
    assessment: "On-site observation",
    image: "/images/training11.jpg",
  },
  {
    id: "nvq-level-2-dry-lining-finishing",
    title: "NVQ Level 2 Dry Lining Finishing",
    shortDescription:
      "For operatives who finish and tape plasterboard joints, creating smooth surfaces ready for decoration.",
    badge: "Level 2 Trade",
    cscsCardAwarded: "Blue CSCS Card",
    duration: "6-12 weeks",
    assessment: "On-site observation",
    image: "/images/training12.jpg",
  },
  {
    id: "nvq-level-2-formwork",
    title: "NVQ Level 2 Formwork",
    shortDescription:
      "For formwork carpenters who construct temporary molds for concrete structures including foundations, walls, and columns.",
    badge: "Level 2 Trade",
    cscsCardAwarded: "Blue CSCS Card",
    duration: "6-12 weeks",
    assessment: "On-site observation",
    image: "/images/training13.jpg",
  },
];

/** Helper */
export const getNvqById = (id) => NVQ_LEVELS.find((n) => n.id === id) || null;
