// src/forms/cscsCardForm/ApplicationType.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookingCardTypes } from "../../services/api";

const OPTIONS = [
  {
    id: 1,
    value: "new",
    label: "New CSCS Card Application",
    desc: "You have never held a CSCS card before.",
  },
  {
    id: 2,
    value: "renew",
    label: "Renew CSCS Card",
    desc: "Your existing CSCS card has expired. You must renew the same card type you held.",
  },
  {
    id: 3,
    value: "replace",
    label: "Replace CSCS Card",
    desc: "Your card has been lost, stolen or destroyed and you need a replacement.",
  },
];

const getOptionValue = (type) => {
  const normalized = type.toLowerCase();
  if (normalized.includes("renew")) return "renew";
  if (normalized.includes("replace")) return "replace";
  return "new";
};

const normalizeBookingCardTypes = (response) => {
  const list = response?.res?.lists;
  if (!Array.isArray(list) || list.length === 0) return OPTIONS;

  return list
    .filter((item) => item.isActive !== false)
    .map((item) => ({
      id: item.id,
      value: getOptionValue(item.cardType || ""),
      label: item.cardType,
      desc: item.typeDescription,
    }));
};

const ApplicationType = ({
  onNext,
  onBack,
  selectedCard,
  initialValue = "",
}) => {
  const [options, setOptions] = useState(OPTIONS);
  const [selected, setSelected] = useState(initialValue);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchOptions = async () => {
      try {
        const response = await getBookingCardTypes(null);
        if (active) setOptions(normalizeBookingCardTypes(response));
      } catch (err) {
        console.error("Error loading application types:", err);
        if (active) setOptions(OPTIONS);
      }
    };

    fetchOptions();

    return () => {
      active = false;
    };
  }, []);

  const handleNext = () => {
    if (!selected) {
      setError("Please choose an application type to continue.");
      return;
    }
    const selectedOption = options.find((opt) => opt.value === selected);
    onNext({
      applicationType: selected,
      applicationTypeId: selectedOption?.id,
      applicationTypeLabel: selectedOption?.label,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white border border-blue-200 rounded-xl shadow-sm p-4 min-[350px]:p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
            Apply for a CSCS Card
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Please follow the steps below. You must have completed a CITB
            HS&amp;E test within the last 2 years to be eligible for a new or
            renewed card.{" "}
            <Link to="/book-citb-test" className="text-blue-600 underline">
              Book your test here
            </Link>
            .
          </p>
        </div>

        {/* Selected card badge */}
        {selectedCard && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-center gap-3">
            {selectedCard.cardImage && (
              <img
                src={selectedCard.cardImage}
                alt={selectedCard.title}
                className="w-12 h-12 object-contain"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-blue-900">
                {selectedCard.title}
              </p>
              <p className="text-xs text-gray-500">
                Selected card for this application
              </p>
            </div>
          </div>
        )}

        {/* Application Type */}
        <h2 className="text-base font-semibold text-blue-900 mb-3">
          Application Type 
        </h2>
        <div className="space-y-3 mb-6">
          {options.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg border-2 transition-all ${
                selected === opt.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="applicationType"
                value={opt.value}
                checked={selected === opt.value}
                onChange={(e) => {
                  setSelected(e.target.value);
                  setError("");
                }}
                className="mt-0.5 w-4 h-4 accent-blue-600"
              />
              <div>
                <span className="block text-sm font-semibold text-blue-900">
                  {opt.label}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  {opt.desc}
                </span>
              </div>
            </label>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationType;
