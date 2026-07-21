// src/forms/nvqForm/NvqForm.jsx

import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import NvqSummary from "./NvqSummary";
import {
  getNvqBookingOption,
  NVQ_BOOKING_OPTIONS,
} from "../../data/pricing.data";
import useLeadCapture from "../../hooks/useLeadCapture";
import { bookNVQCourse } from "../../services/api";
import { showSuccessToast, showErrorToast } from "../../services/toastService";

const NvqForm = ({ onSubmit }) => {
  const location = useLocation();
  const selectedFromPage = useMemo(
    () => getNvqBookingOption(location.state?.pricingKey),
    [location.state],
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    level: selectedFromPage?.id || "",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentType: "full",
  });

  const { captureLeadOnBlur } = useLeadCapture();

  useEffect(() => {
    if (!selectedFromPage?.id) return;
    setFormData((prev) =>
      prev.level === selectedFromPage.id
        ? prev
        : { ...prev, level: selectedFromPage.id },
    );
  }, [selectedFromPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailBlur = () => {
    if (formData.email) {
      captureLeadOnBlur(
        formData.email,
        formData.firstName,
        formData.lastName,
        "nvq",
      );
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const selectedLevel = getNvqBookingOption(formData.level);
      if (!selectedLevel) return;

      const payload = {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        nvqDetailId: location.state?.nvqDetailId || selectedLevel.backendId,
        message: "",
        amount: selectedLevel.price,
        transactionCharge: 0,
        isEmi: formData.paymentType === "emi",
      };

      const response = await bookNVQCourse(payload);

      if (
        response?.rs === 1 &&
        response?.rc?.[0]?.resultStatus === 1 &&
        response?.rc?.[0]?.orderId
      ) {
        showSuccessToast("Booking submitted! Proceed with payment.");
        if (onSubmit) {
          onSubmit({
            ...formData,
            orderId: response.rc[0].orderId,
            level: selectedLevel.id,
            nvqDetailId: payload.nvqDetailId,
            selectedLevelLabel: selectedLevel.title,
            startingAt: selectedLevel.startingAt,
            price: selectedLevel.price,
          });
        }
      } else if (response?.rs === 1) {
        showSuccessToast(
          "NVQ enquiry submitted! Our team will contact you shortly.",
        );
        if (onSubmit) {
          onSubmit({
            ...formData,
            level: selectedLevel.id,
            nvqDetailId: payload.nvqDetailId,
            selectedLevelLabel: selectedLevel.title,
            startingAt: selectedLevel.startingAt,
            price: selectedLevel.price,
          });
        }
      } else {
        showErrorToast(response?.rm || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("NVQ booking failed:", error);
      showErrorToast(error.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedLevel = getNvqBookingOption(formData.level);

  const STEPS = ["Select Level", "Your Details", "Order Summary"];

  return (
    <div className="space-y-6">
      {location.state?.sourceTitle && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          Booking for{" "}
          <span className="font-semibold">{location.state.sourceTitle}</span>
        </div>
      )}

{/* Step indicator */}
<div className="mb-6 flex justify-center">
  <div className="flex items-center">
    {STEPS.map((label, i) => (
      <div key={i} className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm ${
              currentStep === i
                ? "bg-blue-600 text-white"
                : i < currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {i < currentStep ? "✓" : i + 1}
          </div>

          <span
            className={`mt-2 text-xs hidden sm:block ${
              currentStep === i
                ? "text-blue-700 font-semibold"
                : "text-gray-400"
            }`}
          >
            {label}
          </span>
        </div>

        {i < STEPS.length - 1 && (
          <div
            className={`w-16 sm:w-20 h-0.5 mx-3 ${
              i < currentStep ? "bg-blue-600" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
</div>

      {/* Step 0: Select Level */}
      {currentStep === 0 && (
        <div className="rounded-lg border border-blue-100 bg-white p-6 sm:p-8">
          <h2 className="mb-6 text-xl md:text-2xl font-bold text-blue-900">
            Select NVQ Level
          </h2>
          <div className="space-y-4">
            {NVQ_BOOKING_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center rounded-lg border-2 p-2 transition-colors ${
                  formData.level === option.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                <input
                  type="radio"
                  name="level"
                  value={option.id}
                  checked={formData.level === option.id}
                  onChange={handleChange}
                  className="h-4 w-4 accent-blue-600"
                />
                <div className="ml-4 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-gray-900">{option.title}</p>
                    {selectedFromPage?.id === option.id && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                        Selected
                      </span>
                    )}
                  </div>
                  {/* <p className="font-semibold text-blue-600">Starting at £{option.startingAt}</p> */}
                  {/* <p className="text-sm text-gray-500">Booking total: £{option.price}</p> */}
                </div>
              </label>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!formData.level}
              className="rounded-lg bg-blue-600 px-8 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Personal Details */}
      {currentStep === 1 && (
        <div className="rounded-lg border border-blue-100 bg-white p-6 sm:p-8">
          <h2 className="mb-2 text-2xl font-bold text-blue-900">
            Your Details
          </h2>
          {selectedLevel && (
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              <span className="font-semibold">{selectedLevel.title}</span>
              {/* <span className="ml-2 text-blue-700">
                From £{selectedLevel.startingAt} | Booking total £{selectedLevel.price}
              </span> */}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block font-bold text-blue-900 text-sm">
                Title *
              </label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-blue-200 bg-white px-4 py-2.5 focus:border-blue-600 focus:outline-none text-sm"
              >
                <option value="">Select</option>
                {["Mr", "Mrs", "Ms", "Miss", "Dr"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-bold text-blue-900 text-sm">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full rounded-lg border-2 border-blue-200 px-4 py-2.5 focus:border-blue-600 focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-bold text-blue-900 text-sm">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full rounded-lg border-2 border-blue-200 px-4 py-2.5 focus:border-blue-600 focus:outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block font-bold text-blue-900 text-sm">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                placeholder="your@email.com"
                className="w-full rounded-lg border-2 border-blue-200 px-4 py-2.5 focus:border-blue-600 focus:outline-none text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Our team will use this to contact you about your NVQ.
              </p>
            </div>
            <div>
              <label className="mb-1.5 block font-bold text-blue-900 text-sm">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 7700 000000"
                className="w-full rounded-lg border-2 border-blue-200 px-4 py-2.5 focus:border-blue-600 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-2">
            <button
              onClick={handlePrev}
              className="rounded-lg border-2 border-blue-600 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={
                !formData.title ||
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.phone
              }
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Order Summary */}
      {currentStep === 2 && (
        <div className="rounded-lg border border-blue-100 bg-white p-6 sm:p-8">
          {/* <h2 className="mb-6 text-2xl font-bold text-blue-900">
            Order Summary
          </h2> */}
          <NvqSummary
            data={formData}
            price={selectedLevel?.price || 0}
            onPaymentTypeChange={(type) =>
              setFormData((prev) => ({ ...prev, paymentType: type }))
            }
          />
          <div className="mt-6 flex items-center justify-between gap-2">
            <button
              onClick={handlePrev}
              className="shrink-0 rounded-lg border-2 border-blue-600 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
            >
              Back
            </button>

            {/* <button
              onClick={handleSubmit}
              disabled={submitting}
              className="shrink-0 flex items-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {submitting ? "Submitting…" : "Pay Now"}
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default NvqForm;
