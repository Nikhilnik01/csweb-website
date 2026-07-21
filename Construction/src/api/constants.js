export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const ADDRESSNOW_API_BASE = import.meta.env.VITE_ADDRESSNOW_BASE;
export const ADDRESSNOW_API_KEY = import.meta.env.VITE_ADDRESSNOW_KEY;

export const API_ENDPOINTS = {
  Home: "Home/GetHomeDataContent",

  GET_ALL_CARDS: "/Home/GetAllCards",
  GET_CSCS_CARDS: "/Home/GetCSCSCards",
  GET_BOOKING_CARD_TYPES: "/Home/GetBookingCardTypes",
  BOOK_CARDS: "/Home/BookCard",
  BOOK_TEST: "/Home/BookCITBTest",
  GET_TEST_PACKAGES: "/Home/GetTestPackages",
  GET_CITB_TEST_PRICES: "/Home/GetCITBTestPrices",
  GET_ALL_CSCS_TESTS: "/Home/GetAllCscsTest",
  GET_CITB_TESTS: "/Home/GetCITBTests",
  BOOK_TEST_BULK: "/Home/BookTestBulk",

  GET_NVQ_MASTER_DETAILS: "/Home/GetNVQMasterDetails",

  GET_BLOGS: "/Home/GetBlogs",

  GET_COURSES: "/Home/GetCourses",
  BOOK_COURSE: "/Home/BookCourse",

  GET_CPCS_DETAILS: "/Home/GetCpCsDetails",
  GET_CPCS_MODULES: "/Home/GetCPCSModules",
  GET_CPCS_RENEWAL_PRICES: "/Home/GetCPCSRenewalPrices",
  BOOK_CPCS_TEST: "/Home/TestBookingCpcs",
  BOOK_CPCS: "/Home/BookCPCS",
  SAVE_CONTACT_US: "/Home/SaveContactUs",

  CHECKOUT_SESSIONS: "/Home/CheckOutSessions",
  SESSION_STATUS: "/Home/SessionStatus",

  GET_ALL_PASSCODE_LOCATIONS: "/Home/GetAllPasscodeLocation",

  ADDRESS_FIND: `${ADDRESSNOW_API_BASE}/Interactive/Find/v2.00/json3ex.ws`,
  ADDRESS_RETRIEVE: `${ADDRESSNOW_API_BASE}/Interactive/Retrieve/v2.00/json3ex.ws`,
};