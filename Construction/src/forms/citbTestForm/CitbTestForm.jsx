// src/forms/citbTestForm/CitbTestForm.jsx

import { useState, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import {
  fetchAddressSuggestions,
  retrieveAddressDetails,
} from "../../services/api";
import { useLeadCapture } from "../../hooks/useLeadCapture";

const TITLES = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CitbTestForm = ({ onNext, initialData }) => {
  const { captureLeadOnBlur } = useLeadCapture();
  const debounceRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    gender: "",
    phoneNo: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    address: "",
    addressLine2: "",
    townCity: "",
    postalCode: "",
    nationalInsuranceNo: "",
    ...initialData,
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) setFormData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEmailBlur = async () => {
    if (formData.email) {
      captureLeadOnBlur(
        formData.email,
        formData.firstName,
        formData.lastName,
        "citb-test",
      );
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, address: value }));
    if (errors.address) setErrors((prev) => ({ ...prev, address: "" }));
    clearTimeout(debounceRef.current);
    if (value.length >= 3) {
      setLoadingAddresses(true);
      debounceRef.current = setTimeout(async () => {
        try {
          const results = await fetchAddressSuggestions(value);
          setAddressSuggestions(results || []);
          setShowSuggestions(true);
        } catch (_) {
          setAddressSuggestions([]);
        } finally {
          setLoadingAddresses(false);
        }
      }, 350);
    } else {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      setLoadingAddresses(false);
    }
  };

  const handleAddressSelect = async (suggestion) => {
    try {
      const details = await retrieveAddressDetails(suggestion.Id);
      if (details) {
        const line = [details.Line1, details.Line2, details.Line3]
          .filter(Boolean)
          .join(", ");
        setFormData((prev) => ({
          ...prev,
          address: line || details.Line1 || "",
          townCity: details.City || "",
          postalCode: details.PostalCode || "",
        }));
      }
    } catch (_) {}
    setShowSuggestions(false);
  };

  const validate = () => {
    const e = {};
    if (!formData.title) e.title = "Title is required";
    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!formData.lastName.trim()) e.lastName = "Last name is required";
    if (!formData.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Enter a valid email address";
    }
    if (formData.email !== formData.confirmEmail)
      e.confirmEmail = "Emails do not match";
    if (!formData.phoneNo.trim()) e.phoneNo = "Phone number is required";
    if (!formData.dobDay || !formData.dobMonth || !formData.dobYear)
      e.dob = "Date of birth is required";
    if (!formData.address.trim()) e.address = "Address is required";
    if (!formData.postalCode.trim()) e.postalCode = "Postcode is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      document
        .querySelector("[data-error]")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    onNext(formData);
  };

  const inputCls = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? "border-red-500" : "border-blue-200"
    }`;

  const ErrorMsg = ({ field }) =>
    errors[field] ? (
      <p className="text-red-500 text-xs mt-1" data-error>
        {errors[field]}
      </p>
    ) : null;

  const years = Array.from(
    { length: 90 },
    (_, i) => new Date().getFullYear() - 16 - i,
  );
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <section className="">
      <div className="px-3 min-[350px]:px-0 md:margin-container">
        <ProgressBar step={1} total={3} />

        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 items-start">
          {/* RIGHT COLUMN WRAPPER — desktop only */}
          <div className="order-1 lg:order-2 contents lg:flex lg:flex-col lg:gap-3">
            {/* INFO BOX */}
            <div className="bg-blue-50 rounded-lg text-sm  border border-blue-200 shadow-lg p-4 min-[350px]:p-3 md:p-3">
              <h4 className="font-semibold text-blue-700 mb-1 text-base">
                Book your CITB Test online safely and securely.
              </h4>
              <p className="mb-1 text-xs min-[350px]:text-sm leading-relaxed">
                The CITB Test is also known as the touch screen test. You must
                complete a CITB HSE test to apply for a new CSCS Card or to
                renew a CSCS Card.
              </p>
            </div>

            <div className="hidden lg:block bg-white rounded-lg border border-blue-200 shadow-lg overflow-hidden">
              <img
                src="/images/Klarna.jpeg"
                alt="CITB Test Information"
                className="w-full object-contain"
              />
            </div>
          </div>

          <div className="order-2 lg:order-1 bg-white border border-blue-200 rounded-xl shadow-sm p-4 min-[350px]:p-5 md:p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-6">
              Personal Details
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              {/* Title + Name */}
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputCls("title")}
                  >
                    <option value="">Select</option>
                    {TITLES.map((t) => (
                      <option key={t} value={t.toLowerCase()}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ErrorMsg field="title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className={inputCls("firstName")}
                  />
                  <ErrorMsg field="firstName" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className={inputCls("lastName")}
                  />
                  <ErrorMsg field="lastName" />
                </div>
              </div>

              {/* Email + Confirm Email + National Insurance No. */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    placeholder="your@email.com"
                    className={inputCls("email")}
                  />
                  <ErrorMsg field="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Confirm Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    placeholder="Confirm email"
                    className={inputCls("confirmEmail")}
                  />
                  <ErrorMsg field="confirmEmail" />
                </div>
              </div>

              {/* National Insurance No. — moved here, right after Confirm Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  National Insurance No.{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  name="nationalInsuranceNo"
                  value={formData.nationalInsuranceNo}
                  onChange={handleChange}
                  placeholder="e.g. QQ123456C"
                  className={inputCls("nationalInsuranceNo")}
                />
              </div>

              {/* Phone + Gender */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder="+44 7700 000000"
                    className={inputCls("phoneNo")}
                  />
                  <ErrorMsg field="phoneNo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={inputCls("gender")}
                  >
                    <option value="">Please Choose</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    name="dobDay"
                    value={formData.dobDay}
                    onChange={handleChange}
                    className={inputCls("dob")}
                  >
                    <option value="">Day</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    name="dobMonth"
                    value={formData.dobMonth}
                    onChange={handleChange}
                    className={inputCls("dob")}
                  >
                    <option value="">Month</option>
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    name="dobYear"
                    value={formData.dobYear}
                    onChange={handleChange}
                    className={inputCls("dob")}
                  >
                    <option value="">Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.dob && (
                  <p className="text-red-500 text-xs mt-1" data-error>
                    {errors.dob}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleAddressChange}
                    placeholder="Start typing your address or postcode…"
                    className={inputCls("address")}
                    autoComplete="off"
                  />
                  {loadingAddresses && (
                    <div className="absolute right-3 top-2.5">
                      <div className="animate-spin h-4 w-4 border-b-2 border-blue-600 rounded-full"></div>
                    </div>
                  )}
                  {showSuggestions && addressSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-blue-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {addressSuggestions.map((s, i) => (
                        <li
                          key={i}
                          onClick={() => handleAddressSelect(s)}
                          className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
                        >
                          {s.Text}, {s.Description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <ErrorMsg field="address" />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Flat, suite, unit…"
                    className={inputCls("addressLine2")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Town / City
                  </label>
                  <input
                    type="text"
                    name="townCity"
                    value={formData.townCity}
                    onChange={handleChange}
                    placeholder="Town or city"
                    className={inputCls("townCity")}
                  />
                </div>
              </div>

              {/* Postcode only — NI No. removed from here */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Postcode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="e.g. SW1A 1AA"
                  className={inputCls("postalCode")}
                />
                <ErrorMsg field="postalCode" />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Next
                </button>
              </div>
            </form>
          </div>

          {/* IMAGE — mobile only */}
          <div className="order-3 lg:hidden bg-white rounded-lg border border-blue-200 shadow-lg overflow-hidden">
            <img
              src="/images/Klarna.jpeg"
              alt="CITB Test Information"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitbTestForm;
