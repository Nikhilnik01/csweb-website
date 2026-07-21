import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bookCpcsTestV2, fetchAddressSuggestions, retrieveAddressDetails } from "../../services/api";
import StripeCheckout from "../../components/payment/StripeCheckout";
import { showSuccessToast, showErrorToast } from "../../services/toastService";
import KlarnaBanner from "../../components/sections/KlarnaBanner";

const AddressSection = ({ formData, handleInputChange, validationErrors }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [lastId, setLastId] = useState("");

  useEffect(() => {
    if (formData.address && !query) {
      setQuery(formData.address);
    }
  }, [formData.address, query]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 3 && showSuggestions) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query, showSuggestions]);

  const fetchSuggestions = async (searchTerm) => {
    try {
      setIsSearching(true);
      const result = await fetchAddressSuggestions(searchTerm, lastId);
      setSuggestions(result);
    } catch (error) {
      console.error("Address suggestion error:", error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = async (item) => {
    setQuery(item.Text);
    setSuggestions([]);
    setShowSuggestions(false);
    try {
      const address = await retrieveAddressDetails(item.Id);
      if (address) {
        const fullAddress = [
          address.Line1,
          address.Line2,
          address.Line3,
          address.City,
          address.PostalCode,
        ]
          .filter(Boolean)
          .join(", ");
        handleInputChange({ target: { name: "address", value: fullAddress } });
        handleInputChange({
          target: { name: "city", value: address.City || "" },
        });
        handleInputChange({
          target: { name: "postcode", value: address.PostalCode || "" },
        });
        setQuery(fullAddress);
      }
    } catch (error) {
      console.error("Address retrieval failed:", error);
    }
  };

  const handleInputChange_internal = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    handleInputChange(e);
  };

  const handleInputFocus = () => setShowSuggestions(true);
  const handleInputBlur = () =>
    setTimeout(() => setShowSuggestions(false), 200);

  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address*
        </label>
        <input
          type="text"
          name="address"
          value={query}
          onChange={handleInputChange_internal}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Start typing your address..."
          className={`text-sm border rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors.address ? "border-red-400 bg-red-50" : "border-gray-300"}`}
          required
        />
        {isSearching && (
          <div className="absolute right-3 top-9 text-blue-500 text-xs">
            Searching...
          </div>
        )}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-auto text-sm">
            {suggestions.map((item) => (
              <li
                key={item.Id}
                onClick={() => handleSuggestionClick(item)}
                className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                {item.Text}
                {item.Description && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.Description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {showSuggestions &&
          query.length >= 3 &&
          suggestions.length === 0 &&
          !isSearching && (
            <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-full p-3 text-sm text-gray-500">
              No addresses found. Try a different search term.
            </div>
          )}
        {validationErrors.address && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.address}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City*
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
          className={`text-sm border rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors.city ? "border-red-400 bg-red-50" : "border-gray-300"}`}
          required
        />
        {validationErrors.city && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Postcode*
        </label>
        <input
          type="text"
          name="postcode"
          value={formData.postcode}
          onChange={handleInputChange}
          placeholder="Postcode"
          className={`text-sm border rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationErrors.postcode ? "border-red-400 bg-red-50" : "border-gray-300"}`}
          required
        />
        {validationErrors.postcode && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.postcode}
          </p>
        )}
      </div>
    </div>
  );
};

// ── Step indicator component
const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center gap-0 mb-8">
    {[
      { num: 1, label: "Your Details" },
      { num: 2, label: "Payment" },
    ].map((step, idx) => (
      <div key={step.num} className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
              ${
                currentStep === step.num
                  ? "bg-blue-600 border-blue-600 text-white shadow-md"
                  : currentStep > step.num
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-300 text-gray-400"
              }`}
          >
            {currentStep > step.num ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              step.num
            )}
          </div>
          <span
            className={`text-xs mt-1 font-medium ${
              currentStep === step.num
                ? "text-blue-600"
                : currentStep > step.num
                  ? "text-green-600"
                  : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
        </div>
        {idx < 1 && (
          <div
            className={`w-24 h-0.5 mx-2 mb-4 transition-all ${currentStep > step.num ? "bg-green-400" : "bg-gray-200"}`}
          />
        )}
      </div>
    ))}
  </div>
);

// ── Main component
const FollowInstruction = () => {
  const location = useLocation();
  const selected = location.state?.selectedModules || [];
  const calculatedPrice = location.state?.calculatedPrice || 0;
  const cpcsPriceId = location.state?.cpcsPriceId || 0;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderId, setOrderId] = useState(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    niNumber: "",
    postcode: "",
    address: "",
    city: "",
    phoneNumber: "",
    emailAddress: "",
    testPreferredDate: null,
    testDay: "",
    testMonth: "",
    testYear: "",
    testPreferredTime: "",
    agreeTerms: false,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const getGender = (title) => {                         
    if (["mr", "dr"].includes(title?.toLowerCase())) return "Male";
    if (["mrs", "miss", "ms"].includes(title?.toLowerCase())) return "Female";
    return "";
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    else if (formData.firstName.trim().length < 2)
      errors.firstName = "First name must be at least 2 characters";
    else if (!/^[a-zA-Z\s'-]+$/.test(formData.firstName.trim()))
      errors.firstName =
        "First name can only contain letters, spaces, hyphens, and apostrophes";

    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    else if (formData.lastName.trim().length < 2)
      errors.lastName = "Last name must be at least 2 characters";
    else if (!/^[a-zA-Z\s'-]+$/.test(formData.lastName.trim()))
      errors.lastName =
        "Last name can only contain letters, spaces, hyphens, and apostrophes";

    if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
      errors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(
        `${formData.dobYear}-${formData.dobMonth}-${formData.dobDay}`,
      );
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (dob > today)
        errors.dateOfBirth = "Date of birth cannot be in the future";
      else if (age < 16)
        errors.dateOfBirth = "You must be at least 16 years old";
      else if (age > 100)
        errors.dateOfBirth = "Please enter a valid date of birth";
    }

    if (!formData.postcode.trim()) errors.postcode = "Postcode is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    else if (formData.address.trim().length < 5)
      errors.address = "Address must be at least 5 characters";
    if (!formData.city.trim()) errors.city = "City is required";

    if (!formData.phoneNumber.trim())
      errors.phoneNumber = "Phone number is required";
    else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phoneNumber.trim()))
      errors.phoneNumber = "Please enter a valid phone number";
    else if (formData.phoneNumber.trim().replace(/\D/g, "").length < 10)
      errors.phoneNumber = "Phone number must be at least 10 digits";

    if (!formData.emailAddress.trim())
      errors.emailAddress = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim()))
      errors.emailAddress = "Please enter a valid email address";

    if (!formData.testDay || !formData.testMonth || !formData.testYear) {
      errors.testPreferredDate = "Test preferred date is required";
    } else {
      const testDate = `${formData.testYear}-${formData.testMonth}-${formData.testDay}`;
      if (testDate <= todayStr) {
        errors.testPreferredDate = "Test date must be a future date";
      }
    }

    if (!formData.testPreferredTime.trim())
      errors.testPreferredTime = "Test preferred time is required";
    if (!formData.agreeTerms)
      errors.agreeTerms = "You must agree to the terms and conditions";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (validationErrors[name])
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));

    let finalValue = value;
    if (name === "niNumber")
      finalValue = value.toUpperCase().replace(/\s/g, "");

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : finalValue,
    }));
  };

  const handleDatePickerChange = (date) => {
    if (validationErrors.testPreferredDate) {
      setValidationErrors((prev) => ({ ...prev, testPreferredDate: "" }));
    }
    if (date) {
      setFormData((prev) => ({
        ...prev,
        testPreferredDate: date,
        testDay: String(date.getDate()).padStart(2, "0"),
        testMonth: String(date.getMonth() + 1).padStart(2, "0"),
        testYear: String(date.getFullYear()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        testPreferredDate: null,
        testDay: "",
        testMonth: "",
        testYear: "",
      }));
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorField = document.querySelector(".border-red-400");
      if (firstErrorField)
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const testDateTime = new Date(
        `${formData.testYear}-${formData.testMonth}-${formData.testDay}T00:00:00`,
      ).toISOString();

      const apiFormData = {
        ...formData,
        gender: getGender(formData.title),
        cpcsPriceId,
        testPreferredDate: testDateTime,
      };

      const selectedModuleIds = selected.map((module) => module.id);
      const bookingResponse = await bookCpcsTestV2(
        apiFormData,
        selectedModuleIds,
        calculatedPrice,
      );

      // New response shape: { rs, rm, res: { resultStatus, orderId, sessionId }, rc: [] }
      if (bookingResponse.rs === 1 && bookingResponse.res?.resultStatus === 1) {
        showSuccessToast(
          "CPCS test booked successfully! Please complete payment.",
        );
        setOrderId(bookingResponse.res.orderId);
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error(bookingResponse.rm || "Failed to book CPCS test");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setError(error.message);
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    showSuccessToast("Payment completed successfully!");
    window.location.href = "/cpcs-payment-response";
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    showErrorToast("Payment failed. Please try again.");
  };

  const handleBack = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const timeOptions = [
    "Morning (9:00 AM - 12:00 PM)",
    "Afternoon (1:00 PM - 5:00 PM)",
    "Evening (5:00 PM - 8:00 PM)",
  ];

  // ── STEP 2: Payment Page
  if (currentStep === 2 && orderId) {
    return (
      <>
        <div
          className="relative overflow-hidden text-white"
          style={{
            backgroundImage: "url('/images/page-header-bg-shape.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
          <div className="absolute inset-0 bg-white opacity-40"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Complete Your Payment
            </h1>
            <p className="text-gray-600 mt-2 text-base">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>

        <section className="bg-gray-50 py-5 min-h-[60vh] border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <StepIndicator currentStep={2} />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
              {/* Payment card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Payment Details
                    </h2>
                    <p className="text-xs text-gray-500">
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3 bg-green-50 border-b border-green-100 flex flex-wrap gap-4 items-center text-xs text-green-700 font-medium">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    SSL Secured
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Powered by Stripe
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    All major cards accepted
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <StripeCheckout
                    orderId={orderId}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onBack={handleBack}
                    responseType="cpcs"
                  />
                </div>
              </div>

              {/* Order summary sidebar */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900">
                      Order Summary
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="space-y-2 mb-4">
                      {selected.map((module, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{module.name || module}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {selected.length} module
                          {selected.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xl font-bold text-blue-700">
                          £{calculatedPrice.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {selected.length <= 5
  ? "Standard rate (1–5 modules)"
  : "Extended rate (6–10 modules)"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900">
                      Booking Details
                    </h3>
                  </div>
                  <div className="p-5 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name</span>
                      <span className="font-medium text-gray-800">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email</span>
                      <span className="font-medium text-gray-800 truncate max-w-[140px]">
                        {formData.emailAddress}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Test Date</span>
                      <span className="font-medium text-gray-800">{`${formData.testDay}/${formData.testMonth}/${formData.testYear}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time</span>
                      <span className="font-medium text-gray-800 text-right max-w-[150px]">
                        {formData.testPreferredTime?.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBack}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Details
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── STEP 1: Booking Form
  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/page-header-bg-shape.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
        <div className="absolute inset-0 bg-white opacity-40"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Book Your CPCS Renewal
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Fill in your details below to continue
          </p>
        </div>
      </div>

      <section className="bg-gray-50 py-3 sm:py-3 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator currentStep={1} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            {/* ── Main form card ── */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  Your Details
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  All fields marked * are required
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-sm font-semibold text-blue-900 mb-3">
                    Selected Modules ({selected.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {selected.map((module, index) => (
                      <div
                        key={index}
                        className="text-xs px-3 py-2 bg-white border border-blue-200 rounded text-blue-800 font-medium"
                      >
                        {module.name || module}
                      </div>
                    ))}
                  </div>
                </div>

                <KlarnaBanner />

                <form onSubmit={handleSubmit} className="mt-8">
                  {/* ── Personal Details Section ── */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6 pb-3 border-b border-gray-100">
                      Personal Details
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title*
                      </label>
                      <select
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                      </select>
                    </div>

                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name*
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          className={`text-sm border rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${validationErrors.firstName ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                          required
                        />
                        {validationErrors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {validationErrors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          className={`text-sm border rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${validationErrors.lastName ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                          required
                        />
                        {validationErrors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {validationErrors.lastName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth*
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <select
                            name="dobDay"
                            value={formData.dobDay}
                            onChange={handleInputChange}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-2.5 w-full"
                            required
                          >
                            <option value="">Day</option>
                            {Array.from({ length: 31 }, (_, i) => (
                              <option
                                key={i + 1}
                                value={String(i + 1).padStart(2, "0")}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </option>
                            ))}
                          </select>

                          <select
                            name="dobMonth"
                            value={formData.dobMonth}
                            onChange={handleInputChange}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-2.5 w-full"
                            required
                          >
                            <option value="">Month</option>
                            {[
                              "01",
                              "02",
                              "03",
                              "04",
                              "05",
                              "06",
                              "07",
                              "08",
                              "09",
                              "10",
                              "11",
                              "12",
                            ].map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>

                          <select
                            name="dobYear"
                            value={formData.dobYear}
                            onChange={handleInputChange}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-2.5 w-full"
                            required
                          >
                            <option value="">Year</option>
                            {Array.from({ length: 100 }, (_, i) => {
                              const year = new Date().getFullYear() - 16 - i;
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {validationErrors.dateOfBirth && (
                          <p className="text-red-500 text-xs mt-1">
                            {validationErrors.dateOfBirth}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          National Insurance Number
                        </label>
                        <input
                          type="text"
                          name="niNumber"
                          value={formData.niNumber}
                          onChange={handleInputChange}
                          placeholder="e.g., AB123456C"
                          className={`text-sm border rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${validationErrors.niNumber ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                          maxLength={9}
                        />
                        <p className="text-xs text-gray-400 mt-1">Optional</p>
                      </div>

                      <AddressSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        validationErrors={validationErrors}
                      />
                    </div>
                  </div>

                  {/* ── Contact Details Section ── */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6 pb-3 border-b border-gray-100">
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                          className={`text-sm border rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${validationErrors.phoneNumber ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                          required
                        />
                        {validationErrors.phoneNumber && (
                          <p className="text-red-500 text-xs mt-1">
                            {validationErrors.phoneNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          placeholder="Email Address"
                          className={`text-sm border rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${validationErrors.emailAddress ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                          required
                        />
                        {validationErrors.emailAddress && (
                          <p className="text-red-500 text-xs mt-1">
                            {validationErrors.emailAddress}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Test Preference Section ── */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6 pb-3 border-b border-gray-100">
                      Test Preference
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Test Date*
                        </label>

                        {/* FIX: minDate is tomorrow — today is disabled in the calendar */}
                        <DatePicker
                          selected={formData.testPreferredDate}
                          onChange={handleDatePickerChange}
                          minDate={tomorrowDate}
                          filterDate={(date) => date.getDay() !== 0}
                          placeholderText="Select a date"
                          dateFormat="dd/MM/yyyy"
                          className={`text-sm border rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white ${
                            validationErrors.testPreferredDate
                              ? "border-red-400 bg-red-50"
                              : "border-gray-300"
                          }`}
                          wrapperClassName="w-full"
                          required
                        />

                        {validationErrors.testPreferredDate && (
                          <p className="text-red-500 text-xs mt-1">
                            {validationErrors.testPreferredDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time Slot*
                        </label>
                        <select
                          name="testPreferredTime"
                          value={formData.testPreferredTime}
                          onChange={handleInputChange}
                          className={`text-sm border rounded-lg px-3 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white ${
                            validationErrors.testPreferredTime
                              ? "border-red-400 bg-red-50"
                              : "border-gray-300"
                          }`}
                          required
                        >
                          <option value="">Select a time slot</option>
                          {timeOptions.map((time, index) => (
                            <option key={index} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        {validationErrors.testPreferredTime && (
                          <p className="text-red-500 text-xs mt-1">
                            {validationErrors.testPreferredTime}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Terms Section ── */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 accent-blue-600"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the{" "}
                        <a
                          href="/terms"
                          className="text-blue-600 underline hover:text-blue-700"
                        >
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="/refund-policy"
                          className="text-blue-600 underline hover:text-blue-700"
                        >
                          Refund Policy
                        </a>
                        .
                      </span>
                    </label>
                    {validationErrors.agreeTerms && (
                      <p className="text-red-500 text-xs mt-2">
                        {validationErrors.agreeTerms}
                      </p>
                    )}
                  </div>

                  {/* ── Error Message ── */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-3">
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{error}</span>
                    </div>
                  )}

                  {/* ── Action Buttons ── */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      disabled={loading}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-md"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Continue to Payment
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-4 lg:sticky lg:top-4">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-sm font-bold text-gray-900">
                    What happens next?
                  </h3>
                </div>
                <div className="p-5 space-y-3 text-xs text-gray-600">
                  {[
                    "Submit your details and proceed to secure payment.",
                    "Receive email and SMS confirmation with your test details.",
                    "Attend your test at your preferred date, time and location.",
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg border border-blue-200 p-5">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  Need help?
                </p>
                <p className="text-xs text-blue-700 mb-3">
                  Call our team for guidance on your CPCS renewal process.
                </p>
                <a
                  href="tel:03333440036"
                  className="inline-flex items-center gap-2 font-bold text-blue-700 text-sm hover:underline"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  0333 344 0036
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FollowInstruction;
