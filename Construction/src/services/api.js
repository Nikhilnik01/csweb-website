import axios from "axios";
import { apiClient } from "../api/apiClient";
import { API_ENDPOINTS, ADDRESSNOW_API_KEY } from "../api/constants";

export const GetHomeDataContent = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.Home);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch cards",
    );
  }
};

export const getAllCards = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_ALL_CARDS);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch cards",
    );
  }
};

export const getCSCSCards = async (id = null) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GET_CSCS_CARDS, { id });
    return response.data;
  } catch (error) {
    console.error("Error fetching CSCS cards:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch CSCS cards",
    );
  }
};

export const getBookingCardTypes = async (id = null) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.GET_BOOKING_CARD_TYPES,
      {
        id,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching booking card types:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch booking card types",
    );
  }
};

export const getAllCourses = async (id = null) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GET_COURSES, { id });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch courses",
    );
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GET_COURSES, { id });
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch course",
    );
  }
};


export const bookCard = async (formData) => {
  try {
    const selectedCard = formData.selectedCard;
    const resolvedBookingCardTypeId =
      formData.bookingCardTypeId || formData.applicationTypeId || 0;
    const resolvedCardTypeId =
      formData.csCsCardTypeId ||
      formData.cscsCardId ||
      selectedCard?.id ||
      formData.cardTypeId ||
      2;
    const resolvedAmount = formData.amount ?? selectedCard?.amount ?? null;

    const payload = {
      flag: "insert",
      bookingCardTypeId: Number(resolvedBookingCardTypeId) || 0,
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNo: formData.phoneNo || formData.phone || "",
      dobDay: parseInt(formData.dobDay, 10) || 0,
      dobMonth: parseInt(formData.dobMonth, 10) || 0,
      dobYear: parseInt(formData.dobYear, 10) || 0,
      addressLine1: formData.addressLine1 || formData.address || "",
      addressLine2: formData.addressLine2 || "",
      townCity: formData.townCity || formData.city || "",
      postCode:
        formData.postCode || formData.postcode || formData.postalCode || "",
      nationalInsuranceNo:
        formData.nationalInsuranceNo || formData.nationalInsuranceNumber || "",
      tradeOccupation:
        formData.tradeOccupation || formData.trade || formData.occupation || "",
      csCsCardTypeId: Number(resolvedCardTypeId) || 2,
      amount: resolvedAmount == null ? null : parseFloat(resolvedAmount),
      transactionCharge: parseFloat(formData.transactionCharge || 0),
      responseUrl: formData.responseUrl || "response",
    };

    const response = await apiClient.post(API_ENDPOINTS.BOOK_CARDS, payload);
    return response.data;
  } catch (error) {
    console.error("Error booking card:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to book card",
    );
  }
};

export const bookTest = async (formData) => {
  try {
    const toApiDate = (value) => {
      if (!value) return null;
      if (String(value).includes("T")) return value;
      return `${value}T00:00:00.000Z`;
    };

    const payload = {
      flag: "insert",
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNo: formData.phoneNo,
      dobDay: parseInt(formData.dobDay, 10) || 0,
      dobMonth: parseInt(formData.dobMonth, 10) || 0,
      dobYear: parseInt(formData.dobYear, 10) || 0,
      addressLine1: formData.addressLine1 || formData.address || "",
      addressLine2: formData.addressLine2 || "",
      townCity: formData.townCity || "",
      postCode: formData.postCode || formData.postalCode || "",
      nationalInsuranceNo: formData.nationalInsuranceNo || "",
      gender: formData.gender || "",
      preferedTestCenter:
        formData.preferedTestCenter || formData.testCenter || "",
      secondPreferedTestCenter:
        formData.secondPreferedTestCenter || formData.secondTestCenter || "",
      citbTestId:
        parseInt(formData.citbTestId || formData.testTypeId || 0, 10) || 0,
      testLanguage: formData.testLanguage || "English",
      preferedTestDate: toApiDate(
        formData.preferedTestDate || formData.testDate,
      ),
      alternativeTestDate: toApiDate(
        formData.alternativeTestDate || formData.otherTestDate,
      ),
      preferedTestTime: formData.preferedTestTime || formData.testTime || "",
      testPackageId:
        parseInt(formData.testPackageId || formData.packageId || 0, 10) || 0,
      amount: parseFloat(formData.amount || 0),
      transactionCharge: parseFloat(formData.transactionCharge || 0),
      responseUrl: formData.responseUrl || "test-payment-response",
    };

    const response = await apiClient.post(API_ENDPOINTS.BOOK_TEST, payload);
    return response.data;
  } catch (error) {
    console.error("Error booking test:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to book test",
    );
  }
};

export const getCITBTests = async (id = null) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GET_CITB_TESTS, { id });
    return response.data;
  } catch (error) {
    console.error("Error fetching CITB tests:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch CITB tests",
    );
  }
};

export const getTestPackages = async (id = null) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GET_TEST_PACKAGES, {
      id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching test packages:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch test packages",
    );
  }
};

export const getCITBTestPrices = async (testPackageId = null) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GET_CITB_TEST_PRICES, {
      testPackageId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching CITB test prices:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch CITB test prices",
    );
  }
};

export const bookTestBulk = async (testList) => {
  try {
    const getGenderId = (title) => {
      const maleTitles = ["mr", "dr"];
      const femaleTitles = ["mrs", "miss", "ms"];

      if (maleTitles.includes(title?.toLowerCase())) return 1;
      if (femaleTitles.includes(title?.toLowerCase())) return 2;
      return 1;
    };

    const processedList = testList.map((formData) => ({
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dobDay: parseInt(formData.dobDay),
      dobMonth: parseInt(formData.dobMonth),
      dobYear: parseInt(formData.dobYear),
      phoneNo: formData.phoneNo,
      email: formData.email,
      genderId: getGenderId(formData.title),
      address: formData.address,
      townCity: formData.townCity,
      country: formData.country || "UK",
      postalCode: formData.postalCode,
      testLanguage: formData.testLanguage || "English",
      testCenter: formData.testCenter,
      secondTestCenter: formData.secondTestCenter,
      testTypeId: formData.testTypeId || 2,
      testType: formData.testType || "CITB",
      packageId: formData.packageId || 1,
      amount: parseFloat(formData.amount),
      transactionCharge: 0,
    }));

    const response = await apiClient.post(API_ENDPOINTS.BOOK_TEST_BULK, {
      list: processedList,
    });
    return response.data;
  } catch (error) {
    console.error("Error booking bulk tests:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to book bulk tests",
    );
  }
};

export const createCheckoutSession = async (orderId, responseType = null) => {
  try {
    const responseUrlMap = {
      card: "response",
      test: "test-payment-response",
      course: "course-payment-response",
      training: "training-payment-response",
      cpcs: "cpcs-payment-response",
      renewal: "renewal-payment-response",
      default: "response",
    };

    const responseUrl =
      responseUrlMap[responseType] || responseUrlMap["default"];

    const response = await apiClient.post("/Home/CheckOutSessions", {
      orderId,
      responseurl: responseUrl,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to create checkout session",
    );
  }
};

export const bookCourse = async (formData) => {
  try {
    const payload = {
      flag: "insert",
      courseDeliveryTypeId:
        parseInt(
          formData.courseDeliveryTypeId ||
            formData.courseId ||
            formData.apiId ||
            0,
          10,
        ) || 0,
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNo: formData.phoneNo,
      dobDay: parseInt(formData.dobDay, 10) || 0,
      dobMonth: parseInt(formData.dobMonth, 10) || 0,
      dobYear: parseInt(formData.dobYear, 10) || 0,
      addressLine1: formData.addressLine1 || formData.address || "",
      addressLine2: formData.addressLine2 || "",
      townCity: formData.townCity || "",
      postCode: formData.postCode || formData.postalCode || "",
      country: formData.country || "UK",
      amount: parseFloat(formData.amount),
      transactionCharge: parseFloat(formData.transactionCharge || 0),
      responseUrl: formData.responseUrl || "course-payment-response",
    };

    const response = await apiClient.post(API_ENDPOINTS.BOOK_COURSE, payload);
    return response.data;
  } catch (error) {
    console.error("Error booking course:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to book course",
    );
  }
};

export const getSessionStatus = async (sessionId) => {
  try {
    const response = await apiClient.get(
      `/Home/SessionStatus?session_id=${sessionId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching session status:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch session status",
    );
  }
};

export const fetchAddressSuggestions = async (searchTerm, lastId = "") => {
  try {
    const response = await axios.get(API_ENDPOINTS.ADDRESS_FIND, {
      params: {
        Key: ADDRESSNOW_API_KEY,
        Country: "GBR",
        SearchTerm: searchTerm,
        LanguagePreference: "en",
        LastId: lastId,
        SearchFor: "Everything",
        OrderBy: "",
        $block: true,
        $cache: true,
      },
    });

    return response.data?.Items || [];
  } catch (error) {
    console.error("Error fetching address suggestions:", error);
    throw new Error("Failed to fetch address suggestions");
  }
};

export const retrieveAddressDetails = async (id) => {
  try {
    const response = await axios.get(API_ENDPOINTS.ADDRESS_RETRIEVE, {
      params: {
        Key: ADDRESSNOW_API_KEY,
        Id: id,
      },
    });

    return response.data?.Items?.[0] || null;
  } catch (error) {
    console.error("Error retrieving address:", error);
    throw new Error("Failed to retrieve address details");
  }
};

export const getAllPasscodeLocations = async () => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.GET_ALL_PASSCODE_LOCATIONS,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching passcode locations:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch passcode locations",
    );
  }
};

export const getAllCscsTests = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_ALL_CSCS_TESTS);
    return response.data;
  } catch (error) {
    console.error("Error fetching CSCS tests:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch CSCS tests",
    );
  }
};

export const getNVQMasterDetails = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_NVQ_MASTER_DETAILS);
    return response.data;
  } catch (error) {
    console.error("Error fetching NVQ master details:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch NVQ master details",
    );
  }
};

export const getCpcsDetails = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_CPCS_DETAILS);
    return response.data;
  } catch (error) {
    console.error("Error fetching CPCS details:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch CPCS details",
    );
  }
};

// New CPCS API functions
export const getCPCSModules = async (id = null) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.GET_CPCS_MODULES, {
      id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching CPCS modules:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch CPCS modules",
    );
  }
};

export const getCPCSRenewalPrices = async (id = null) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.GET_CPCS_RENEWAL_PRICES,
      { id },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching CPCS renewal prices:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch CPCS renewal prices",
    );
  }
};

export const bookCpcsTestV2 = async (formData, selectedModuleIds, calculatedPrice = 100) => {
  try {
    const payload = {
      flag: "insert",
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.emailAddress,
      phoneNo: formData.phoneNumber,
      dobDay: parseInt(formData.dobDay, 10) || 0,
      dobMonth: parseInt(formData.dobMonth, 10) || 0,
      dobYear: parseInt(formData.dobYear, 10) || 0,
      addressLine1: formData.address || "",
      addressLine2: formData.addressLine2 || "",
      townCity: formData.city || "",
      postCode: formData.postcode || "",
      nationalInsuranceNo: formData.niNumber || "",
      gender: formData.gender || "",
      cpcsPriceId: parseInt(formData.cpcsPriceId, 10) || 0,
      preferedTestDate: formData.testPreferredDate, 
      preferedTimeSlot: formData.testPreferredTime,
      selectedModuleIds,
      amount: calculatedPrice,
      transactionCharge: 0,
      responseUrl: formData.responseUrl || "cpcs-payment-response",
    };

    const response = await apiClient.post(API_ENDPOINTS.BOOK_CPCS, payload);
    return response.data;
  } catch (error) {
    console.error("Error booking CPCS test:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to book CPCS test",
    );
  }
};

export const bookNVQCourse = async (formData) => {
  try {
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      nvqDetailId:
        formData.nvqDetailId == null
          ? null
          : parseInt(formData.nvqDetailId, 10),
      message: formData.message || "",
      amount: formData.amount,
      transactionCharge: 0,
      isEmi: formData.isEmi,
    };

    const response = await apiClient.post("/Home/NVQSubmission", {
      ...payload,
      req: payload,
    });
    return response.data;
  } catch (error) {
    console.error("Error booking NVQ course:", error);
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.title ||
        error.message ||
        "Failed to book NVQ course",
    );
  }
};

export const saveContactUs = async (formData) => {
  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      phoneNo: formData.phone,
      subject: formData.subject,
      messages: formData.message,
    };

    const response = await apiClient.post(API_ENDPOINTS.SAVE_CONTACT_US, payload);
    return response.data;
  } catch (error) {
    console.error("Error saving contact form:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to send message",
    );
  }
};
