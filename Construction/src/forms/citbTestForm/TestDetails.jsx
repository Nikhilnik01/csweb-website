// src/forms/citbTestForm/TestDetails.jsx

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "./ProgressBar";
import { getActiveTestCenters } from "../../data/testCenters.data";
import {
  getCITBTestPrices,
  getTestPackages,
  getCITBTests,
} from "../../services/api";

const OPERATIVES_TEST_KEYWORDS = ["operative", "operatives"];

const DEFAULT_TEST_PACKAGES = [
  {
    id: 1,
    value: "test-only",
    packageName: "Test Only",
    shortDescription: "Book your CITB HS&E test",
  },
  {
    id: 2,
    value: "test-revision",
    packageName: "Test + Revision Material",
    shortDescription: "Includes revision guide to help you prepare",
  },
  {
    id: 3,
    value: "test-retake-revision",
    packageName: "Test + Free Retake + Revision",
    shortDescription: "Best value - retake included if you don't pass first time",
  },
];

const DEFAULT_TEST_PRICES = [
  { testPackageId: 1, basePrice: 35, bookingFee: 11, totalPrice: 46, currency: "£" },
  { testPackageId: 2, basePrice: 40, bookingFee: 14, totalPrice: 54, currency: "£" },
  { testPackageId: 3, basePrice: 49, bookingFee: 19, totalPrice: 68, currency: "£" },
];

const packageNameToValue = (name = "") => {
  const normalized = name.toLowerCase();
  if (normalized.includes("retake")) return "test-retake-revision";
  if (normalized.includes("revision")) return "test-revision";
  return "test-only";
};

const UK_TEST_CENTERS = [
  "Aberdeen",
  "Aberystwyth",
  "Aldershot",
  "Andover",
  "Armagh",
  "Aylesbury",
  "Ayr",
  "Ballymena",
  "Bangor",
  "Barnstaple",
  "Barrow-in-Furness",
  "Basildon",
  "Belfast",
  "Berwick",
  "Birmingham",
  "Blackpool",
  "Bolton",
  "Boston",
  "Bournemouth",
  "Bradford",
  "Bridgend",
  "Brighton",
  "Bristol",
  "Builth Wells",
  "Bury St Edmunds",
  "Cambridge",
  "Canterbury",
  "Cardiff",
  "Carlisle",
  "Chatham",
  "Chelmsford",
  "Cheltenham",
  "Chester",
  "Chesterfield",
  "Chichester",
  "Clydebank",
  "Colchester",
  "Corby",
  "Coventry",
  "Crawley",
  "Cromer",
  "Derby",
  "Doncaster",
  "Dudley",
  "Dumfries",
  "Dundee",
  "Eastbourne",
  "Edinburgh",
  "Elgin",
  "Exeter",
  "Fareham",
  "Fort William",
  "Frome",
  "Glasgow",
  "Gloucester",
  "Grantham",
  "Great Yarmouth",
  "Greenock",
  "Grimsby",
  "Guildford",
  "Halifax",
  "Harrogate",
  "Hastings",
  "Haverfordwest",
  "Helmsdale",
  "Hereford",
  "Horley",
  "Huddersfield",
  "Hull",
  "Huntly",
  "Inverness",
  "Ipswich",
  "Isle of Arran",
  "Isle of Benbecula",
  "Isle of Islay",
  "Isle of Mull",
  "Isles of Scilly",
  "Isle of Wight",
  "Kendal",
  "King's Lynn",
  "Kirkwall",
  "Kyle of Lochalsh",
  "Launceston",
  "Leeds",
  "Leicester",
  "Lerwick",
  "Lincoln",
  "Liverpool",
  "London – Croydon",
  "London – Ilford",
  "London – Kingston",
  "London – Mile End",
  "London – Sidcup",
  "Luton",
  "Manchester",
  "Mansfield",
  "Merthyr Tydfil",
  "Middlesbrough",
  "Middleton-in-Teesdale",
  "Milton Keynes",
  "Morpeth",
  "New Romney",
  "Newcastle upon Tyne",
  "Newport (Gwent)",
  "Newport (Isle of Wight)",
  "Newry",
  "Northallerton",
  "Northampton",
  "Norwich",
  "Nottingham",
  "Oban",
  "Oldham",
  "Omagh",
  "Oxford",
  "Penzance",
  "Peterborough",
  "Pitlochry",
  "Plymouth",
  "Poole",
  "Portsmouth",
  "Preston",
  "Reading",
  "Redditch",
  "Rhyl",
  "Rochdale",
  "Romford",
  "Rotherham",
  "Salisbury",
  "Scarborough",
  "Scunthorpe",
  "Sheffield",
  "Shrewsbury",
  "Slough",
  "Southampton",
  "Southend-on-Sea",
  "Southport",
  "St Helens",
  "Stevenage",
  "Stirling",
  "Stockport",
  "Stoke-on-Trent",
  "Stornoway",
  "Stranraer",
  "Stratford-upon-Avon",
  "Sunderland",
  "Sutton Coldfield",
  "Swansea",
  "Swindon",
  "Tarbert",
  "Taunton",
  "Tongue",
  "Torquay",
  "Truro",
  "Tunbridge Wells",
  "Ullapool",
  "Weymouth",
  "Wick",
  "Wigan",
  "Wolverhampton",
  "Worcester",
  "Worthing",
  "Wrexham",
  "Yeovil",
  "York",
];

const CSCS_LANGUAGES = [
  "English",
  "Welsh",
  "Bengali",
  "Bulgarian",
  "Chinese (Simplified)",
  "Czech",
  "French",
  "German",
  "Gujarati",
  "Hindi",
  "Hungarian",
  "Italian",
  "Lithuanian",
  "Pashto",
  "Polish",
  "Portuguese",
  "Punjabi",
  "Romanian",
  "Russian",
  "Somali",
  "Spanish",
  "Tamil",
  "Turkish",
  "Urdu",
  "Vietnamese",
];

const DEFAULT_CITB_TESTS = [
  {
    id: 1,
    testName: "CITB Health, Safety & Environment Test for Operatives",
    testtotake: "CITB Health, Safety & Environment Test for Operatives",
    cscsCardType: "Green Card",
    amount: 36,
  },
  {
    id: 2,
    testName:
      "CITB Health, Safety & Environment Test for Managers and Professionals (MAP)",
    testtotake:
      "CITB Health, Safety & Environment Test for Managers and Professionals (MAP)",
    cscsCardType: "Black Card",
    amount: 36,
  },
  {
    id: 3,
    testName: "CITB Health, Safety & Environment Specialist Supervisory Test",
    testtotake: "CITB Health, Safety & Environment Specialist Supervisory Test",
    cscsCardType: "Gold Supervisor Card",
    amount: 36,
  },
  {
    id: 4,
    testName: "CITB Health, Safety & Environment Specialist Demolition Test",
    testtotake: "CITB Health, Safety & Environment Specialist Demolition Test",
    cscsCardType: "Specialist Demolition",
    amount: 36,
  },
  {
    id: 5,
    testName: "CITB Health, Safety & Environment Specialist Plumbing Test",
    testtotake: "CITB Health, Safety & Environment Specialist Plumbing Test",
    cscsCardType: "Specialist Plumbing",
    amount: 36,
  },
  {
    id: 6,
    testName: "CITB Health, Safety & Environment Specialist Highway Works Test",
    testtotake:
      "CITB Health, Safety & Environment Specialist Highway Works Test",
    cscsCardType: "Specialist Highway Works",
    amount: 36,
  },
  {
    id: 7,
    testName:
      "CITB Health, Safety & Environment Specialist Working at Height Test",
    testtotake:
      "CITB Health, Safety & Environment Specialist Working at Height Test",
    cscsCardType: "Specialist Working at Height",
    amount: 36,
  },
  {
    id: 8,
    testName:
      "CITB Health, Safety & Environment Specialist Lifts and Escalators Test",
    testtotake:
      "CITB Health, Safety & Environment Specialist Lifts and Escalators Test",
    cscsCardType: "Specialist Lifts and Escalators",
    amount: 36,
  },
  {
    id: 9,
    testName: "CITB Health, Safety & Environment Specialist Tunnelling Test",
    testtotake: "CITB Health, Safety & Environment Specialist Tunnelling Test",
    cscsCardType: "Specialist Tunnelling",
    amount: 36,
  },
  {
    id: 10,
    testName:
      "CITB Health, Safety & Environment Specialist HVACR Heating and Plumbing Services Test",
    testtotake:
      "CITB Health, Safety & Environment Specialist HVACR Heating and Plumbing Services Test",
    cscsCardType: "Specialist HVACR",
    amount: 36,
  },
  {
    id: 11,
    testName:
      "CITB Health, Safety & Environment Specialist HVACR Pipefitting and Welding Test",
    testtotake:
      "CITB Health, Safety & Environment Specialist HVACR Pipefitting and Welding Test",
    cscsCardType: "Specialist HVACR",
    amount: 36,
  },
  {
    id: 12,
    testName:
      "CITB Health, Safety & Environment Specialist HVACR Ductwork Test",
    testtotake:
      "CITB Health, Safety & Environment Specialist HVACR Ductwork Test",
    cscsCardType: "Specialist HVACR",
    amount: 36,
  },
  {
    id: 13,
    testName:
      "CITB Health, Safety & Environment Specialist HVACR Refrigeration and Air Conditioning Test",
    testtotake:
      "CITB Health, Safety & Environment Specialist HVACR Refrigeration and Air Conditioning Test",
    cscsCardType: "Specialist HVACR",
    amount: 36,
  },
  {
    id: 14,
    testName:
      "CITB Health, Safety & Environment Specialist HVACR Service and Facilities Maintenance Test",
    testtotake:
      "CITB Health, Safety & Environment Specialist HVACR Service and Facilities Maintenance Test",
    cscsCardType: "Specialist HVACR",
    amount: 36,
  },
];

// Returns tomorrow's date, skipping Sunday (moves to Monday if tomorrow is Sunday)
const getMinDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (tomorrow.getDay() === 0) {
    tomorrow.setDate(tomorrow.getDate() + 1); // Skip Sunday → Monday
  }
  return tomorrow.toISOString().split("T")[0];
};

const getMaxDate = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split("T")[0];
};

const isSunday = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr + "T00:00:00");
  return d.getDay() === 0;
};

const TestDetails = ({
  personalData,
  onSubmit,
  onBack,
  onDataChange,
  onCscsTestsUpdate,
  initialData,
}) => {
  const [testData, setTestData] = useState({
    testCenter: "",
    secondTestCenter: "",
    testType: "",
    cscsCardType: "",
    testDate: "",
    testTime: "",
    otherTestDate: "",
    addRevision: "",
    acceptTerms: false,
    optOutMarketing: false,
    selectedTestId: "",
    selectedTestName: "",
    testLanguage: "English",
  });

  const [testDateObj, setTestDateObj] = useState(null);
  const [otherTestDateObj, setOtherTestDateObj] = useState(null);

  const [cscsTests, setCscsTests] = useState([]);
  const [testPackages, setTestPackages] = useState(DEFAULT_TEST_PACKAGES);
  const [testPrices, setTestPrices] = useState(DEFAULT_TEST_PRICES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const isOperativesTest = useCallback(() => {
    return OPERATIVES_TEST_KEYWORDS.some((kw) =>
      testData.testType.toLowerCase().includes(kw),
    );
  }, [testData.testType]);

  useEffect(() => {
    if (onDataChange) onDataChange(testData);
  }, [testData, onDataChange]);

  useEffect(() => {
    let active = true;

    const loadTestDetails = async () => {
      try {
        setLoading(true);
        const [packagesResponse, pricesResponse, testsResponse] =
          await Promise.all([
            getTestPackages(null),
            getCITBTestPrices(null),
            getCITBTests(),
          ]);

        const apiPackages = packagesResponse?.res?.lists;
        const normalizedPackages = Array.isArray(apiPackages)
          ? apiPackages
              .filter((pkg) => pkg.isActive !== false)
              .map((pkg) => ({
                ...pkg,
                value: packageNameToValue(pkg.packageName),
              }))
          : DEFAULT_TEST_PACKAGES;

        const apiPrices = pricesResponse?.res?.lists;

        const apiTests = testsResponse?.res?.lists;
        const normalizedTests =
          Array.isArray(apiTests) && apiTests.length
            ? apiTests
                .filter((t) => t.isActive)
                .map((t) => {
                  // keep cscsCardType/amount from static defaults when available (matched by id)
                  const fallback = DEFAULT_CITB_TESTS.find(
                    (d) => d.id === t.id,
                  );
                  return {
                    id: t.id,
                    testName: t.testName,
                    testtotake: t.testName,
                    cscsCardType: fallback?.cscsCardType || "",
                    amount: fallback?.amount || 36,
                  };
                })
            : DEFAULT_CITB_TESTS;

        if (active) {
          setCscsTests(normalizedTests);
          onCscsTestsUpdate?.(normalizedTests);
          setTestPackages(normalizedPackages);
          setTestPrices(
            Array.isArray(apiPrices) && apiPrices.length
              ? apiPrices
              : DEFAULT_TEST_PRICES,
          );
        }
      } catch (err) {
        console.error("Error loading CITB test details:", err);
        if (active) {
          setCscsTests(DEFAULT_CITB_TESTS);
          onCscsTestsUpdate?.(DEFAULT_CITB_TESTS);
          setTestPackages(DEFAULT_TEST_PACKAGES);
          setTestPrices(DEFAULT_TEST_PRICES);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadTestDetails();

    return () => {
      active = false;
    };
  }, [onCscsTestsUpdate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedCenter = urlParams.get("testCenter");
    if (preSelectedCenter && UK_TEST_CENTERS.length > 0) {
      const match = UK_TEST_CENTERS.find((c) => c === preSelectedCenter);
      if (match) setTestData((prev) => ({ ...prev, testCenter: match }));
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cardType = urlParams.get("cscsCardType");
    if (cardType) {
      setTestData((prev) => ({ ...prev, cscsCardType: cardType }));
    }
  }, []);

  // Auto-select the test chosen from the Header dropdown (?testId=...)
  useEffect(() => {
    if (!cscsTests.length) return;
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get("testId");
    if (!testId) return;

    const selected = cscsTests.find((t) => String(t.id) === String(testId));
    if (selected) {
      setTestData((prev) => ({
        ...prev,
        testType: selected.testName,
        cscsCardType:
          selected.cscsCardType ||
          selected.testtotake ||
          selected.testName ||
          "",
        testLanguage: "English",
        selectedTestId: selected.id,
        selectedTestName: selected.testName,
      }));
    }
  }, [cscsTests]);

  const validateForm = useCallback(() => {
    const errors = {};
    const minDate = getMinDate();

    if (!testData.testCenter.trim())
      errors.testCenter = "Test centre is required";
    if (!testData.testType.trim()) errors.testType = "Test type is required";
    if (isOperativesTest() && !testData.testLanguage.trim())
      errors.testLanguage = "Test language is required";

    if (!testData.testDate.trim()) {
      errors.testDate = "Test date is required";
    } else {
      const sel = new Date(testData.testDate + "T00:00:00");
      const min = new Date(minDate + "T00:00:00");
      const max = new Date(getMaxDate() + "T00:00:00");

      if (sel < min) {
        errors.testDate = "Test date must be from tomorrow onwards";
      } else if (sel > max) {
        errors.testDate = "Test date cannot be more than 1 year ahead";
      } else if (isSunday(testData.testDate)) {
        errors.testDate =
          "Sundays are not available. Please select another date.";
      }
    }

    if (!testData.testTime.trim()) errors.testTime = "Test time is required";
    if (!testData.addRevision.trim())
      errors.addRevision = "Please choose a package";
    if (!testData.acceptTerms)
      errors.acceptTerms = "You must accept the terms and conditions";

    if (testData.otherTestDate.trim()) {
      const alt = new Date(testData.otherTestDate + "T00:00:00");
      const min = new Date(minDate + "T00:00:00");

      if (alt < min) {
        errors.otherTestDate = "Alternative date must be from tomorrow onwards";
      } else if (isSunday(testData.otherTestDate)) {
        errors.otherTestDate =
          "Sundays are not available. Please select another date.";
      } else if (
        testData.testDate &&
        alt.getTime() === new Date(testData.testDate + "T00:00:00").getTime()
      ) {
        errors.otherTestDate = "Alternative date must differ from primary date";
      }
    }

    if (
      testData.secondTestCenter &&
      testData.secondTestCenter === testData.testCenter
    )
      errors.secondTestCenter = "Second centre must differ from the first";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [testData, isOperativesTest]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;

      if (validationErrors[name])
        setValidationErrors((prev) => ({ ...prev, [name]: "" }));

      // Sunday check for date fields — show error immediately on selection
      if (name === "testDate" || name === "otherTestDate") {
        if (isSunday(value)) {
          setValidationErrors((prev) => ({
            ...prev,
            [name]: "Sundays are not available. Please select another date.",
          }));
          setTestData((prev) => ({ ...prev, [name]: value }));
          return;
        }
      }

      if (name === "testType") {
        const selected = cscsTests.find((t) => t.testName === value);
        const cardType = selected
          ? selected.cscsCardType ||
            selected.cardType ||
            selected.testtotake ||
            selected.testName ||
            ""
          : "";
        setTestData((prev) => ({
          ...prev,
          testType: value,
          cscsCardType: cardType,
          testLanguage: "English",
          selectedTestId: selected ? selected.id : "",
          selectedTestName: selected ? selected.testName : "",
        }));
      } else if (name === "addRevision") {
        const selectedPackage = testPackages.find((pkg) => pkg.value === value);
        setTestData((prev) => ({
          ...prev,
          addRevision: value,
          testPackageId: selectedPackage?.id || "",
        }));
      } else {
        setTestData((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      }
    },
    [validationErrors, cscsTests, testPackages],
  );

  const tomorrowDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return d;
  })();

  const handleTestDateChange = (date) => {
    if (validationErrors.testDate)
      setValidationErrors((prev) => ({ ...prev, testDate: "" }));
    setTestDateObj(date);
    if (date) {
      const iso = date.toISOString().split("T")[0];
      setTestData((prev) => ({ ...prev, testDate: iso }));
    } else {
      setTestData((prev) => ({ ...prev, testDate: "" }));
    }
  };

  const handleOtherTestDateChange = (date) => {
    if (validationErrors.otherTestDate)
      setValidationErrors((prev) => ({ ...prev, otherTestDate: "" }));
    setOtherTestDateObj(date);
    if (date) {
      const iso = date.toISOString().split("T")[0];
      setTestData((prev) => ({ ...prev, otherTestDate: iso }));
    } else {
      setTestData((prev) => ({ ...prev, otherTestDate: "" }));
    }
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateForm()) {
        document
          .querySelector(".border-red-500")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      const selected = cscsTests.find((t) => t.testName === testData.testType);

      const packagePrices = {
        "test-only": { base: 35, fee: 11, total: 46 },
        "test-revision": { base: 40, fee: 14, total: 54 },
        "test-retake-revision": { base: 49, fee: 19, total: 68 },
      };

      const pricing =
        packagePrices[testData.addRevision] || packagePrices["test-only"];

      onSubmit({
        ...personalData,
        ...testData,
        testTypeId: selected ? selected.id : 2,
        testType: selected ? selected.testtotake : "CITB",
        testLanguage: isOperativesTest() ? testData.testLanguage : "English",
        country: "UK",
        amount: pricing.total, // ✓ Should be there
        adminFee: pricing.fee, // ✓ Check if this is there
        totalAmount: pricing.total, // ✓ Check if this is there
        transactionCharge: null,
      });
    },
    [
      validateForm,
      cscsTests,
      testData,
      personalData,
      onSubmit,
      isOperativesTest,
    ],
  );

  const testCenters = UK_TEST_CENTERS;
  const testTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const inputClass = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      validationErrors[field] ? "border-red-500" : "border-blue-200"
    }`;

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-2 text-gray-600">Loading test types…</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-red-600 text-center">
          <p className="mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Honeycomb pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-8l20-11.5V24.5L28 13 8 24.5v22L28 58z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 100px",
        }}
      />
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 px-3 min-[350px]:px-0 md:margin-container py-8 min-h-[160px]">
        <ProgressBar step={2} total={3} />

        <div className="bg-white border border-blue-200 rounded-xl shadow-sm p-4 min-[350px]:p-5 md:p-8 md:max-w-4xl md:mx-auto">
          <h3 className="text-xl font-bold text-blue-900 mb-6">Test Details</h3>

          <form onSubmit={handleSubmit} noValidate>
            {/* Test Centres */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Preferred Test Centre <span className="text-red-500">*</span>
                </label>
                <select
                  name="testCenter"
                  value={testData.testCenter}
                  onChange={handleInputChange}
                  className={inputClass("testCenter")}
                  required
                >
                  <option value="">Select Location</option>
                  {testCenters.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {validationErrors.testCenter && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.testCenter}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  2nd Preferred Test Centre{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <select
                  name="secondTestCenter"
                  value={testData.secondTestCenter}
                  onChange={handleInputChange}
                  className={inputClass("secondTestCenter")}
                >
                  <option value="">Select Location</option>
                  {testCenters
                    .filter((c) => c !== testData.testCenter)
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
                {validationErrors.secondTestCenter && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.secondTestCenter}
                  </p>
                )}
              </div>
            </div>

            {/* Select Your Test & Test Language */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Select Your Test <span className="text-red-500">*</span>
                </label>
                <select
                  name="testType"
                  value={testData.testType}
                  onChange={handleInputChange}
                  className={inputClass("testType")}
                  required
                >
                  <option value="">Please Select</option>
                  {cscsTests.map((t) => (
                    <option key={t.id} value={t.testName}>
                      {t.testtotake || t.testName}
                    </option>
                  ))}
                </select>
                {validationErrors.testType && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.testType}
                  </p>
                )}
              </div>

              {isOperativesTest() ? (
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Test Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="testLanguage"
                    value={testData.testLanguage}
                    onChange={handleInputChange}
                    className={inputClass("testLanguage")}
                    required
                  >
                    {CSCS_LANGUAGES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  {validationErrors.testLanguage && (
                    <p className="text-red-500 text-xs mt-1">
                      {validationErrors.testLanguage}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Test Language
                  </label>
                  <input
                    type="text"
                    value="English"
                    readOnly
                    className="w-full border border-blue-100 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    This test is available in English only.
                  </p>
                </div>
              )}
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Preferred Test Date <span className="text-red-500">*</span>
                </label>
                <DatePicker
                  selected={testDateObj}
                  onChange={handleTestDateChange}
                  minDate={tomorrowDate}
                  maxDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1),
                    )
                  }
                  filterDate={(date) => date.getDay() !== 0}
                  placeholderText="Select a date"
                  dateFormat="dd/MM/yyyy"
                  className={inputClass("testDate")}
                  wrapperClassName="w-full"
                  required
                />
                {validationErrors.testDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.testDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Alternative Test Date{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <DatePicker
                  selected={otherTestDateObj}
                  onChange={handleOtherTestDateChange}
                  minDate={tomorrowDate}
                  maxDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1),
                    )
                  }
                  filterDate={(date) => date.getDay() !== 0}
                  placeholderText="Select a date (optional)"
                  dateFormat="dd/MM/yyyy"
                  className={inputClass("otherTestDate")}
                  wrapperClassName="w-full"
                />
                {validationErrors.otherTestDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.otherTestDate}
                  </p>
                )}
              </div>
            </div>

            {/* Time */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Preferred Test Time <span className="text-red-500">*</span>
              </label>
              <select
                name="testTime"
                value={testData.testTime}
                onChange={handleInputChange}
                className={inputClass("testTime")}
                required
              >
                <option value="">Please Choose</option>
                {testTimes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {validationErrors.testTime && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.testTime}
                </p>
              )}
            </div>

            {/* Package */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="4" y="5" width="16" height="11" rx="2" />
                  <path d="M9 16l-2 3v-3" />
                  <line x1="8" y1="9" x2="16" y2="9" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <label className="text-sm font-medium text-blue-900">
                  Choose Package <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="space-y-2">
                {[
                  {
                    value: "test-only",
                    label: "Test Only",
                    desc: "Book your CITB HS&E test",
                    basePrice: "£35.00",
                    fee: "£11.00",
                    total: "£46.00",
                  },
                  {
                    value: "test-revision",
                    label: "Test + Revision Material",
                    desc: "Includes revision guide to help you prepare",
                    basePrice: "£40.00",
                    fee: "£14.00",
                    total: "£54.00",
                  },
                  {
                    value: "test-retake-revision",
                    label: "Test + Free Retake + Revision",
                    desc: "Best value — retake included if you don't pass first time",
                    basePrice: "£49.00",
                    fee: "£19.00",
                    total: "£68.00",
                  },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`block border-2 rounded-lg px-4 py-3 cursor-pointer transition-all ${
                      testData.addRevision === opt.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-400"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <input
                          type="radio"
                          name="addRevision"
                          value={opt.value}
                          checked={testData.addRevision === opt.value}
                          onChange={handleInputChange}
                          className="mt-0.5 w-4 h-4 accent-blue-600"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-blue-900 block">
                            {opt.label}
                          </span>
                          <span className="text-xs text-gray-500">
                            {opt.desc}
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {validationErrors.addRevision && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.addRevision}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="mb-6">
              <label className="flex items-start gap-2 text-sm text-blue-900">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={testData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-0.5 accent-blue-600"
                  required
                />
                <span>
                  I accept the&nbsp;
                  <Link to="/terms" className="text-blue-600 underline">
                    Terms and Conditions
                  </Link>
                  .&nbsp; I understand I must bring valid photo ID on the day of
                  the test.
                  <span className="text-red-600"> *</span>
                </span>
              </label>
              {validationErrors.acceptTerms && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.acceptTerms}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-3 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TestDetails;