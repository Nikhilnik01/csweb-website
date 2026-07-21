// src/forms/cscsCardForm/CscsCardForm.jsx

import { useState } from "react";
import ApplicationType from "./ApplicationType";
import PersonalDetails from "./PersonalDetails";
import AboutYou from "./AboutYou";

const STEPS = ["Application Type", "Personal Details", "About You"];

const StepIndicator = ({ currentStep }) => (
  <div className="mb-8 flex items-center justify-between">
    {STEPS.map((label, i) => {
      const done = i < currentStep;
      const active = i === currentStep;
      return (
        <div key={label} className="relative flex flex-1 flex-col items-center">
          {i < STEPS.length - 1 && (
            <div
              className={`absolute left-1/2 top-4 z-0 h-0.5 w-full ${
                done ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
          <div
            className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold ${
              done
                ? "border-blue-600 bg-blue-600 text-white"
                : active
                  ? "border-blue-600 bg-white text-blue-600"
                  : "border-gray-300 bg-white text-gray-400"
            }`}
          >
            {done ? "✓" : i + 1}
          </div>
          <span
            className={`mt-1 hidden text-xs sm:block ${
              active ? "font-semibold text-blue-700" : "text-gray-500"
            }`}
          >
            {label}
          </span>
        </div>
      );
    })}
  </div>
);

const CscsCardForm = ({ onSubmit, selectedCard }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    applicationType: "",
    applicationTypeId: null,
    applicationTypeLabel: "",
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
    addressLine1: "",
    addressLine2: "",
    townCity: "",
    city: "",
    postalCode: "",
    postcode: "",
    nationalInsuranceNo: "",
    occupation: "",
    trade: "",
    employer: "",
    cscsTestRef: "",
    qualificationRef: "",
    cardColour: "",
  });

  const next = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (finalData) => {
    const merged = { ...formData, ...finalData };
    setFormData(merged);
    onSubmit?.(merged);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
      <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
        <span>
          Step {step + 1} of {STEPS.length}:{" "}
          <strong className="text-gray-700">{STEPS[step]}</strong>
        </span>
        <span>{step + 1} of {STEPS.length}</span>
      </div>
      <div className="mb-6 h-1.5 w-full rounded-full bg-gray-200">
        <div
          className="h-1.5 rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <StepIndicator currentStep={step} />

      {step === 0 && (
        <ApplicationType
          onNext={next}
          selectedCard={selectedCard}
          initialValue={formData.applicationType}
        />
      )}
      {step === 1 && (
        <PersonalDetails
          onNext={next}
          onBack={back}
          applicationType={formData.applicationType}
          selectedCard={selectedCard}
          initialFormData={formData}
        />
      )}
      {step === 2 && (
        <AboutYou
          onNext={handleSubmit}
          onBack={back}
          applicationType={formData.applicationType}
          applicationTypeId={formData.applicationTypeId}
          initialFormData={formData}
          selectedCard={selectedCard}
        />
      )}
    </div>
  );
};

export default CscsCardForm;
