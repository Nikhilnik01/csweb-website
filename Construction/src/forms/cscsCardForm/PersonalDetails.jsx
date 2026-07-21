// src/forms/cscsCardForm/PersonalDetails.jsx

import { useState, useRef } from "react";
import AddressSection from "./AddressSection";
import { useLeadCapture } from "../../hooks/useLeadCapture";
import { fetchAddressSuggestions } from "../../services/api";

const TITLES = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const PersonalDetails = ({ onNext, onBack, applicationType, selectedCard, initialFormData = {} }) => {
  const { captureLeadOnBlur } = useLeadCapture();
  const debounceRef = useRef(null);

  const [form, setForm] = useState({
    title: initialFormData.title || "",
    firstName: initialFormData.firstName || "",
    lastName: initialFormData.lastName || "",
    email: initialFormData.email || "",
    confirmEmail: initialFormData.confirmEmail || "",
    phone: initialFormData.phone || "",
    dobDay: initialFormData.dobDay || "",
    dobMonth: initialFormData.dobMonth || "",
    dobYear: initialFormData.dobYear || "",
    addressLine1: initialFormData.addressLine1 || "",
    addressLine2: initialFormData.addressLine2 || "",
    city: initialFormData.city || "",
    postcode: initialFormData.postcode || "",
  });
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEmailBlur = () => {
    if (form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      captureLeadOnBlur(form.email, form.firstName, form.lastName, "cscs-card");
    }
  };

  const handleLine1Change = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, addressLine1: value }));
    if (errors.addressLine1) setErrors((prev) => ({ ...prev, addressLine1: "" }));

    clearTimeout(debounceRef.current);
    if (value.length >= 3) {
      setLoadingAddress(true);
      debounceRef.current = setTimeout(async () => {
        try {
          const results = await fetchAddressSuggestions(value);
          setSuggestions(results || []);
          setShowSuggestions(true);
        } catch (_) {
          setSuggestions([]);
        } finally {
          setLoadingAddress(false);
        }
      }, 350);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setLoadingAddress(false);
    }
  };

  const handleAddressUpdate = (addressData) => {
    setForm((prev) => ({ ...prev, ...addressData }));
  };

  const validate = () => {
    const e = {};
    if (!form.title) e.title = "Title is required";
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.confirmEmail.trim()) e.confirmEmail = "Confirm email is required";
    else if (form.email !== form.confirmEmail) e.confirmEmail = "Emails do not match";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.dobDay || !form.dobMonth || !form.dobYear) e.dob = "Date of birth is required";
    if (!form.addressLine1 || !form.addressLine1.trim()) e.addressLine1 = "Address Line 1 is required";
    if (!form.postcode || !form.postcode.trim()) e.postcode = "Postcode is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      document.querySelector("[data-err]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    onNext({ ...form });
  };

  const inputCls = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? "border-red-500" : "border-blue-200"
    }`;

  const Err = ({ field }) =>
    errors[field] ? <p className="text-red-500 text-xs mt-1" data-err>{errors[field]}</p> : null;

  const years = Array.from({ length: 90 }, (_, i) => new Date().getFullYear() - 16 - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white border border-blue-200 rounded-xl shadow-sm p-4 min-[350px]:p-6 md:p-8">
        <h2 className="text-xl font-bold text-blue-900 mb-6">Personal Details</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Title + Name */}
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Title <span className="text-red-500">*</span></label>
              <select name="title" value={form.title} onChange={handleChange} className={inputCls("title")}>
                <option value="">Select</option>
                {TITLES.map((t) => <option key={t} value={t.toLowerCase()}>{t}</option>)}
              </select>
              <Err field="title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">First Name <span className="text-red-500">*</span></label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" className={inputCls("firstName")} />
              <Err field="firstName" />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" className={inputCls("lastName")} />
              <Err field="lastName" />
            </div>
          </div>

          {/* Email */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Email Address <span className="text-red-500">*</span></label>
              <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleEmailBlur} placeholder="your@email.com" className={inputCls("email")} />
              <Err field="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Confirm Email <span className="text-red-500">*</span></label>
              <input type="email" name="confirmEmail" value={form.confirmEmail} onChange={handleChange} placeholder="Confirm email" className={inputCls("confirmEmail")} />
              <Err field="confirmEmail" />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-900 mb-1">Phone Number <span className="text-red-500">*</span></label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+44 7700 000000" className={`${inputCls("phone")} md:w-1/2`} />
            <Err field="phone" />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-900 mb-1">Date of Birth <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-3 gap-2 md:w-2/3">
              <select name="dobDay" value={form.dobDay} onChange={handleChange} className={inputCls("dob")}>
                <option value="">Day</option>
                {days.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select name="dobMonth" value={form.dobMonth} onChange={handleChange} className={inputCls("dob")}>
                <option value="">Month</option>
                {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
              <select name="dobYear" value={form.dobYear} onChange={handleChange} className={inputCls("dob")}>
                <option value="">Year</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            {errors.dob && <p className="text-red-500 text-xs mt-1" data-err>{errors.dob}</p>}
          </div>

          {/* Address with autocomplete */}
          <AddressSection
            addressLine1={form.addressLine1}
            addressLine2={form.addressLine2}
            city={form.city}
            postcode={form.postcode}
            onChange={handleAddressUpdate}
            errors={errors}
            loading={loadingAddress}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            suggestions={suggestions}
            handleLine1Change={handleLine1Change}
          />

          <div className="flex justify-between gap-3 pt-6">
            <button type="button" onClick={onBack} className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              Back
            </button>
            <button type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
