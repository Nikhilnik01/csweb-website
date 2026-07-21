// src/forms/courseBookingForm/PersonalDetails.jsx

import { useState } from "react";
import { useLeadCapture } from "../../hooks/useLeadCapture";
import {
  fetchAddressSuggestions,
  retrieveAddressDetails,
} from "../../services/api";
import { showErrorToast } from "../../services/toastService";

const PersonalDetails = ({
  data = {},
  onData = () => {},
  selectedCourse = null,
}) => {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const [formData, setFormData] = useState({
    title: data.title || "",
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    dobDay: data.dobDay || "",
    dobMonth: data.dobMonth || "",
    dobYear: data.dobYear || "",
    email: data.email || "",
    phone: data.phone || "",
    address: data.address || "",
    addressLine2: data.addressLine2 || "",
    townCity: data.townCity || "",
    postalCode: data.postalCode || "",
    country: data.country || "UK",
    nationalInsuranceNo: data.nationalInsuranceNo || "",
  });

  const [errors, setErrors] = useState({});
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

  const { captureLeadOnBlur } = useLeadCapture();

  const inputClass = (field) =>
    `
      w-full
      h-[42px]
      px-3
      text-sm
      border
      rounded-lg
      bg-white
      focus:outline-none
      focus:ring-2
      focus:ring-blue-200
      focus:border-blue-600
      transition
      ${
        errors[field]
          ? "border-red-500"
          : "border-blue-200"
      }
    `;

  const handleChange = (e) => {
    const { name, value } = e.target;

    const finalValue =
      name === "postalCode"
        ? value.toUpperCase()
        : value;

    const updated = {
      ...formData,
      [name]: finalValue,
    };

    setFormData(updated);
    onData(updated);

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleEmailBlur = () => {
    if (formData.email) {
      captureLeadOnBlur(
        formData.email,
        formData.firstName,
        formData.lastName
      );
    }
  };

  // Address autocomplete
  const handleAddressInputChange = async (e) => {
    const value = e.target.value;

    const updated = {
      ...formData,
      address: value,
    };

    setFormData(updated);
    onData(updated);

    if (errors.address) {
      setErrors((prev) => ({
        ...prev,
        address: "",
      }));
    }

    if (value.length < 3) {
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
      return;
    }

    setIsLoadingAddresses(true);

    try {
      const suggestions =
        await fetchAddressSuggestions(value);

      setAddressSuggestions(suggestions);
      setShowAddressSuggestions(true);
    } catch {
      showErrorToast(
        "Failed to fetch address suggestions"
      );
      setAddressSuggestions([]);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const handleAddressSelect = async (suggestion) => {
    try {
      const details =
        await retrieveAddressDetails(suggestion.Id);

      if (details) {
        const fullAddress = [
          details.Line1,
          details.Line2,
          details.Line3,
          details.Line4,
        ]
          .filter((line) => line && line.trim())
          .join(", ");

        const updated = {
          ...formData,
          address:
            fullAddress || details.Line1 || "",
          townCity: details.City || "",
          postalCode: details.PostalCode || "",
        };

        setFormData(updated);
        onData(updated);
      }

      setShowAddressSuggestions(false);
    } catch {
      showErrorToast(
        "Failed to retrieve address details"
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* Main Form */}
      <div className="flex-1 space-y-6">

        {/* Personal Details */}
        <div>

          <h3 className="font-semibold text-blue-900 mb-4 text-lg">
            Personal Details
          </h3>

          {/* Title / First / Last */}
          <div className="grid grid-cols-1 gap-4 mb-4">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Title *
              </label>

              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`
                  w-full
                  h-[42px]
                  px-3
                  text-sm
                  border
                  rounded-lg
                  bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-200
                  focus:border-blue-600
                  transition
                  ${
                    errors.title
                      ? "border-red-500"
                      : "border-blue-200"
                  }
                `}
              >
                <option value="">Select</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
              </select>

              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                First Name *
              </label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                className={inputClass("firstName")}
              />

              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Last Name *
              </label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                className={inputClass("lastName")}
              />

              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email / Phone */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Email *
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                required
                placeholder="john@example.com"
                className={inputClass("email")}
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}

              <p className="text-xs text-gray-500 mt-1">
                We'll use this to keep you updated on your course
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Phone Number *
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+44 333 344 0036"
                className={inputClass("phone")}
              />

              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* National Insurance */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-900 mb-1">
              National Insurance Number
            </label>

            <input
              type="text"
              name="nationalInsuranceNo"
              value={formData.nationalInsuranceNo}
              onChange={handleChange}
              placeholder="e.g. AB123456C"
              maxLength={9}
              className={inputClass("nationalInsuranceNo")}
            />
          </div>

          {/* DOB */}
          <div className="mb-4">

            <label className="block text-sm font-medium text-blue-900 mb-1">
              Date of Birth
            </label>

            <div className="grid grid-cols-3 gap-4">

              {/* Day */}
              <select
                name="dobDay"
                value={formData.dobDay}
                onChange={handleChange}
                className={inputClass("dobDay")}
              >
                <option value="">Day</option>

                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {/* Month */}
              <select
                name="dobMonth"
                value={formData.dobMonth}
                onChange={handleChange}
                className={inputClass("dobMonth")}
              >
                <option value="">Month</option>

                {months.map((m) => (
                  <option
                    key={m.value}
                    value={m.value}
                  >
                    {m.label}
                  </option>
                ))}
              </select>

              {/* Year */}
              <select
                name="dobYear"
                value={formData.dobYear}
                onChange={handleChange}
                className={inputClass("dobYear")}
              >
                <option value="">Year</option>

                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div>

          <h3 className="font-semibold text-blue-900 mb-4 text-lg">
            Address Details
          </h3>

          {/* Address Line 1 */}
          <div className="mb-4 relative">

            <label className="block text-sm font-medium text-blue-900 mb-1">
              Address Line 1 *
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleAddressInputChange}
              placeholder="Start typing your address..."
              autoComplete="off"
              className={inputClass("address")}
            />

            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address}
              </p>
            )}

            {showAddressSuggestions && (
              <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-xl">

                {isLoadingAddresses ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    Loading addresses...
                  </div>
                ) : addressSuggestions.length > 0 ? (
                  addressSuggestions.map(
                    (suggestion, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleAddressSelect(
                            suggestion
                          )
                        }
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition"
                      >
                        <div className="text-sm font-medium text-gray-800">
                          {suggestion.Text}
                        </div>

                        {suggestion.Description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {
                              suggestion.Description
                            }
                          </div>
                        )}
                      </div>
                    )
                  )
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No addresses found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="mb-4">

            <label className="block text-sm font-medium text-blue-900 mb-1">
              Address Line 2 (Optional)
            </label>

            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Apartment, suite, unit, building, floor, etc."
              className={inputClass("addressLine2")}
            />
          </div>

          {/* Town / Postal / Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Town */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Town / City *
              </label>

              <input
                type="text"
                name="townCity"
                value={formData.townCity}
                onChange={handleChange}
                className={inputClass("townCity")}
              />

              {errors.townCity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.townCity}
                </p>
              )}
            </div>

            {/* Postal */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Postal Code *
              </label>

              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={inputClass("postalCode")}
              />

              {errors.postalCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.postalCode}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Country
              </label>

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={inputClass("country")}
              >
                <option value="UK">
                  United Kingdom
                </option>

                <option value="Ireland">
                  Ireland
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
