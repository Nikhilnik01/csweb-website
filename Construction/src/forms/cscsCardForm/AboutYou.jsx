import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const TRADES = [
  "Bricklayer",
  "Carpenter",
  "Ceiling Fixer",
  "Civil Engineering Operative",
  "Concrete Finisher",
  "Demolition Operative",
  "Electrician",
  "Floorlayer",
  "General Builder",
  "Ground Worker",
  "Highway Maintenance",
  "Insulation Operative",
  "Joiner",
  "Labourer",
  "Painter & Decorator",
  "Plant Operative",
  "Plasterer",
  "Plumber",
  "Roofer",
  "Scaffolder",
  "Steel Erector",
  "Stonemason",
  "Tiler",
  "Tunnelling Operative",
  "Waterproofing Operative",
  "Other",
];

// Some cards have `title`, others only have `cardType` + `subtitle`
const resolveCardTitle = (card) => {
  if (!card) return "";
  if (card.title) return card.title;
  if (card.cardType && card.subtitle)
    return `${card.cardType} – ${card.subtitle}`;
  return card.cardType || card.subtitle || "";
};

const AboutYou = ({
  applicationType,
  applicationTypeId,
  onBack,
  onNext,
  selectedCard,
  personalDetails,
  addressDetails,
}) => {
  const [form, setForm] = useState({
    nationalInsuranceNumber: "",
    tickBoxNI: false,
    trade: "",
    cscsCardOptions: resolveCardTitle(selectedCard),
    cscsCardExistingNumber: "",
    citbTestId: "",
    acceptTerms: false,
    marketingOptOut: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const userEditedCardOptions = useRef(false);

  useEffect(() => {
    if (userEditedCardOptions.current) return;
    const incomingTitle = resolveCardTitle(selectedCard);
    setForm((prev) =>
      prev.cscsCardOptions === incomingTitle
        ? prev
        : { ...prev, cscsCardOptions: incomingTitle },
    );
  }, [selectedCard]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "cscsCardOptions") userEditedCardOptions.current = true;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.acceptTerms)
      e.acceptTerms = "You must accept the Terms and Conditions.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await onNext({
        ...personalDetails,
        ...addressDetails,
        ...form,
        cardTypeId: selectedCard?.id,
        applicationType,
        applicationTypeId,
        amount: 49,
        adminFee: 16,
        totalAmount: 65,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  const displayedCardType = userEditedCardOptions.current
    ? form.cscsCardOptions
    : resolveCardTitle(selectedCard) || form.cscsCardOptions || "";

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 min-[350px]:p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">About You</h2>

        {/* NI Number */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            National Insurance Number
          </label>
          <input
            type="text"
            name="nationalInsuranceNumber"
            value={form.nationalInsuranceNumber}
            onChange={handleChange}
            disabled={form.tickBoxNI}
            placeholder="e.g. QQ123456C"
            className={`${inputCls("nationalInsuranceNumber")} ${form.tickBoxNI ? "bg-gray-50 cursor-not-allowed" : ""}`}
          />
          <label className="flex items-center gap-2 mt-2 text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              name="tickBoxNI"
              checked={form.tickBoxNI}
              onChange={handleChange}
              className="accent-blue-600"
            />
            I do not have a National Insurance Number
          </label>
        </div>

        {/* Trade */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Trade / Occupation
          </label>
          <select
            name="trade"
            value={form.trade}
            onChange={handleChange}
            className={inputCls("trade")}
          >
            <option value="">Please Select</option>
            {TRADES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* CSCS Card Type */}
        {applicationType !== "replace" && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              CSCS Card Type
            </label>
            <input
              type="text"
              value={displayedCardType}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700"
            />
            {!displayedCardType && (
              <p className="text-gray-500 text-xs mt-1">
                Card type will be populated from selection
              </p>
            )}
          </div>
        )}

        {/* Existing Card Number */}
        {(applicationType === "renew" || applicationType === "replace") && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Existing CSCS Card Number
            </label>
            <input
              type="text"
              name="cscsCardExistingNumber"
              value={form.cscsCardExistingNumber}
              onChange={handleChange}
              className={inputCls("cscsCardExistingNumber")}
            />
          </div>
        )}

        {/* Terms */}
        <div className="mb-5">
          <label className="flex items-start gap-2 text-sm text-gray-800 cursor-pointer">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={form.acceptTerms}
              onChange={handleChange}
              className="mt-0.5 accent-blue-600"
            />
            <span>
              I accept the{" "}
              <Link to="/terms" className="text-blue-600 underline">
                Terms and Conditions
              </Link>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>
          )}
        </div>

        {/* Buttons */}
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
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutYou;
