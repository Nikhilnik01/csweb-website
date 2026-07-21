// src/data/pricing.data.js

export const PRICING = {
  cscsCard: {
    basePrice: 49.99,
    adminFee: 16,
    total: 65.99,
    label: "CSCS Card Application",
    summaryLine: "£49.99 + £16 admin fee",
  },

citbTest: {
  standard: {
    basePrice: 35,
    bookingFee: 11,
    total: 46,
    label: "CITB Health, Safety & Environment Test",
    summaryLine: "£35 + £11 booking fee",
  },

  revisionMaterial: {
    basePrice: 40,
    bookingFee: 14,
    total: 54,
    label: "Test + Revision Material",
    summaryLine: "£40 + £14 booking fee",
  },

  revisionMaterialRetake: {
    basePrice: 49,
    bookingFee: 19,
    total: 68,
    label: "Test + Revision Material + Retake",
    summaryLine: "£49 + £19 booking fee",
  },
},

  courses: {
    greenCard: {
      id: "cscs-green-card",
      online: {
        basePrice: 99,
        bookingFee: 39,
        total: 138,
        displayPrice: 99,
        label: "CSCS Green Card Online Course",
        summaryLine: "£99 + £39 booking fee",
      },
      classroom: {
        basePrice: 139,
        bookingFee: 39,
        total: 178,
        displayPrice: 139,
        label: "CSCS Green Card Classroom Course",
        summaryLine: "£139 + £39 booking fee",
      },
    },
    smsts: {
      id: "smsts",
      online: {
        basePrice: 599,
        bookingFee: 49,
        total: 648,
        displayPrice: 599,
        label: "SMSTS Online Course",
        summaryLine: "£599 + £49 booking fee",
      },
      classroom: {
        basePrice: 599,
        bookingFee: 49,
        total: 648,
        displayPrice: 599,
        label: "SMSTS Classroom Course",
        summaryLine: "£599 + £49 booking fee",
      },
    },
    sssts: {
      id: "sssts",
      online: {
        basePrice: 359,
        bookingFee: 49,
        total: 408,
        displayPrice: 359,
        label: "SSSTS Online Course",
        summaryLine: "£359 + £49 booking fee",
      },
      classroom: {
        basePrice: 359,
        bookingFee: 49,
        total: 408,
        displayPrice: 359,
        label: "SSSTS Classroom Course",
        summaryLine: "£359 + £49 booking fee",
      },
    },
    smsts_refresher: {
      id: "smsts-refresher",
      online: {
        basePrice: 399,
        bookingFee: 49,
        total: 448,
        displayPrice: 399,
        label: "SMSTS Refresher Online Course",
        summaryLine: "£399 + £49 booking fee",
      },
      classroom: {
        basePrice: 399,
        bookingFee: 49,
        total: 448,
        displayPrice: 399,
        label: "SMSTS Refresher Classroom Course",
        summaryLine: "£399 + £49 booking fee",
      },
    },
    sssts_refresher: {
      id: "sssts-refresher",
      online: {
        basePrice: 249,
        bookingFee: 49,
        total: 298,
        displayPrice: 249,
        label: "SSSTS Refresher Online Course",
        summaryLine: "£249 + £49 booking fee",
      },
      classroom: {
        basePrice: 249,
        bookingFee: 49,
        total: 298,
        displayPrice: 249,
        label: "SSSTS Refresher Classroom Course",
        summaryLine: "£249 + £49 booking fee",
      },
    },
  },

  cpcsRenewal: {
    id: "cpcs-renewal",
    upto5Modules: {
      basePrice: 49,
      bookingFee: 15,
      total: 65,
      displayPrice: 49,
      label: "CPCS Renewal (Up to 5 Modules)",
      summaryLine: "£49 + £15 booking fee",
    },
    sixto10Modules: {
      basePrice: 89,
      bookingFee: 25,
      total: 115,
      displayPrice: 89,
      label: "CPCS Renewal (6 to 10 Modules)",
      summaryLine: "£89 + £25 booking fee",
    },
  },

  nvq: {
    offerPrices: {
      level2: { startingAt: 799, label: "NVQ Level 2 – Starting at £799" },
      level3_4: {
        startingAt: 999,
        label: "NVQ Level 3 & 4 – Starting at £999",
      },
      level6_plus: {
        startingAt: 1399,
        label: "NVQ Level 6+ – Starting at £1,399",
      },
    },
    actualPrices: {
      level2: { price: 999, label: "NVQ Level 2" },
      level3_4: { price: 1499, label: "NVQ Level 3 & 4" },
      level4: { price: 1499, label: "NVQ Level 4" },
      level6_plus: { price: 2399, label: "NVQ Level 6 or above" },
    },
  },
};

export const NVQ_BOOKING_OPTIONS = [
  {
    id: "level2",
    backendId: 1,
    pricingKey: "level2",
    title: "NVQ Level 2",
    startingAt: PRICING.nvq.offerPrices.level2.startingAt,
    price: PRICING.nvq.actualPrices.level2.price,
  },
  {
    id: "level3_4",
    backendId: 2,
    pricingKey: "level3_4",
    title: "NVQ Level 3 & 4",
    startingAt: PRICING.nvq.offerPrices.level3_4.startingAt,
    price: PRICING.nvq.actualPrices.level3_4.price,
  },
  {
    id: "level6_plus",
    backendId: 3,
    pricingKey: "level6_plus",
    title: "NVQ Level 6+",
    startingAt: PRICING.nvq.offerPrices.level6_plus.startingAt,
    price: PRICING.nvq.actualPrices.level6_plus.price,
  },
];

export const getNvqBookingOption = (key) =>
  NVQ_BOOKING_OPTIONS.find(
    (option) => option.id === key || option.pricingKey === key,
  ) || null;

/** Helper: get price for a course by courseId */
export const getCoursePricing = (courseId) => {
  const courses = PRICING.courses;
  return Object.values(courses).find((c) => c.id === courseId) || null;
};

/** Helper: get CPCS renewal pricing by module count */
export const getCpcsRenewalPricing = (moduleCount) => {
  if (moduleCount <= 5) {
    return PRICING.cpcsRenewal.upto5Modules;
  }
  return PRICING.cpcsRenewal.sixto10Modules;
};