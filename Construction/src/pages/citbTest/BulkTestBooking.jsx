// src/pages/citbTest/BulkTestBooking.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SeoHead from "../../components/common/SeoHead";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { PRICING } from "../../data/pricing.data";
import { bookTestBulk } from "../../services/api";

const TITLES = ["Mr", "Mrs", "Miss", "Ms", "Dr"];

const MONTHS = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const emptyEntry = () => ({
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dobDay: "",
  dobMonth: "",
  dobYear: "",
  testCenter: "",
  testType: "",
});

const EntryForm = ({ index, data, onChange, errors }) => {
  const field = (name, value) => onChange(index, name, value);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 16 - i);
  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-blue-900">Candidate {index + 1}</h3>
        <span className="text-xs text-gray-400">All fields required</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <select
            value={data.title}
            onChange={(e) => field("title", e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors?.title ? "border-red-400" : "border-gray-300"}`}
          >
            <option value="">Select</option>
            {TITLES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {errors?.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            value={data.firstName}
            onChange={(e) => field("firstName", e.target.value)}
            placeholder="First Name"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors?.firstName ? "border-red-400" : "border-gray-300"}`}
          />
          {errors?.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            value={data.lastName}
            onChange={(e) => field("lastName", e.target.value)}
            placeholder="Last Name"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors?.lastName ? "border-red-400" : "border-gray-300"}`}
          />
          {errors?.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => field("email", e.target.value)}
            placeholder="email@example.com"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors?.email ? "border-red-400" : "border-gray-300"}`}
          />
          {errors?.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            value={data.phone}
            onChange={(e) => field("phone", e.target.value)}
            placeholder="07700 000000"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors?.phone ? "border-red-400" : "border-gray-300"}`}
          />
          {errors?.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Date of Birth — 3 dropdowns */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* Day */}
            <select
              value={data.dobDay}
              onChange={(e) => field("dobDay", e.target.value)}
              className={`w-full border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors?.dobDay ? "border-red-400" : "border-gray-300"}`}
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
              value={data.dobMonth}
              onChange={(e) => field("dobMonth", e.target.value)}
              className={`w-full border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors?.dobMonth ? "border-red-400" : "border-gray-300"}`}
            >
              <option value="">Month</option>
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label.slice(0, 3)}
                </option>
              ))}
            </select>

            {/* Year */}
            <select
              value={data.dobYear}
              onChange={(e) => field("dobYear", e.target.value)}
              className={`w-full border rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors?.dobYear ? "border-red-400" : "border-gray-300"}`}
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          {(errors?.dobDay || errors?.dobMonth || errors?.dobYear) && (
            <p className="text-red-500 text-xs mt-1">
              Date of birth is required
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const BulkTestBooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [count, setCount] = useState("");
  const [entries, setEntries] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [countError, setCountError] = useState("");

  const p = PRICING.citbTest;
  const total = entries.length * p.total;

  const handleCountSubmit = () => {
    const n = parseInt(count);
    if (!n || n < 1 || n > 50) {
      setCountError("Please enter a number between 1 and 50.");
      return;
    }
    setEntries(Array.from({ length: n }, emptyEntry));
    setErrors(Array.from({ length: n }, () => ({})));
    setStep(1);
    window.scrollTo({ top: 0 });
  };

  const handleChange = (index, name, value) => {
    setEntries((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: "" };
      return copy;
    });
  };

  const validateEntries = () => {
    let valid = true;
    const newErrors = entries.map((e) => {
      const err = {};
      if (!e.title) err.title = "Required";
      if (!e.firstName) err.firstName = "Required";
      if (!e.lastName) err.lastName = "Required";
      if (!e.email || !/\S+@\S+\.\S+/.test(e.email))
        err.email = "Valid email required";
      if (!e.phone) err.phone = "Required";
      if (!e.dobDay) err.dobDay = "Required";
      if (!e.dobMonth) err.dobMonth = "Required";
      if (!e.dobYear) err.dobYear = "Required";
      if (Object.keys(err).length) valid = false;
      return err;
    });
    setErrors(newErrors);
    return valid;
  };

  const handleReview = () => {
    if (!validateEntries()) {
      window.scrollTo({ top: 0 });
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0 });
  };

  const handleConfirmAndPay = async () => {
    setLoading(true);
    try {
      const payload = {
        bulkTestList: entries.map((e) => ({
          title: e.title,
          firstName: e.firstName,
          lastName: e.lastName,
          email: e.email,
          phoneNo: e.phone,
          dobDay: parseInt(e.dobDay) || 1,
          dobMonth: parseInt(e.dobMonth) || 1,
          dobYear: parseInt(e.dobYear) || 1990,
          testType: "Operatives",
          testTypeId: 2,
          testLanguage: "English",
          isASAP: true,
        })),
      };
      const res = await bookTestBulk(payload.bulkTestList);
      if (res?.rs === 1 || res?.orderId) {
        setOrderId(res.orderId || res.rc?.orderId || "BULK-" + Date.now());
        setStep(3);
        window.scrollTo({ top: 0 });
      } else {
        alert(res?.rm || "Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Booking failed. Please try again or call +44 7856 423532.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SeoHead
        title="CITB Bulk & Group Test Booking | Construction Customer Service"
        description="Book multiple CITB Health, Safety & Environment Tests for your workers. Group booking and corporate packages across the UK."
        keywords="bulk CITB test, group booking, corporate CITB tests, construction group tests, CSCS cards"
      />
      {/* Page Header */}
      <div className="relative overflow-hidden shadow-md bg-[#f5f7ff] md:bg-[url('/images/page-header-bg-shape.png')] md:bg-cover md:bg-center">
        <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
        <div className="absolute inset-0 bg-white opacity-40"></div>
        <div className="relative z-10 margin-container py-4 lg:py-6 text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Bulk Book Tests For CSCS Cards
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Step 0: Choose count */}
        {step === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              How many tests do you want to book?
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Enter the number of candidates (1–50). You'll fill in their
              details on the next screen.
            </p>
            <div className="flex gap-4 items-start">
              <div>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => {
                    setCount(e.target.value);
                    setCountError("");
                  }}
                  placeholder="e.g. 5"
                  min="1"
                  max="50"
                  className={`w-32 border rounded-lg px-4 py-2.5 text-lg text-center focus:ring-2 focus:ring-blue-500 focus:outline-none ${countError ? "border-red-400" : "border-gray-300"}`}
                />
                {countError && (
                  <p className="text-red-500 text-xs mt-1">{countError}</p>
                )}
              </div>
              <button
                onClick={handleCountSubmit}
                className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Candidate details */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Enter Candidate Details
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Fill in the personal details for each of the {entries.length}{" "}
              candidates.
            </p>
            {entries.map((entry, i) => (
              <EntryForm
                key={i}
                index={i}
                data={entry}
                onChange={handleChange}
                errors={errors[i]}
              />
            ))}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(0)}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={handleReview}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700"
              >
                Review Booking →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Review Your Booking
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {e.title} {e.firstName} {e.lastName}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{e.email}</td>
                      <td className="px-4 py-3 text-gray-600">{e.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
{/* 
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-900">
                  {entries.length} × CITB Test = £{total}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {p.summaryLine} per candidate
                </p>
              </div>
              <span className="text-2xl font-bold text-blue-700">£{total}</span>
            </div> */}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50"
              >
                ← Edit Details
              </button>
              <button
                onClick={handleConfirmAndPay}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>{/* <LoadingSpinner size="sm" /> Processing… */}</>
                ) : (
                  `Confirm`
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="bg-white border border-green-200 rounded-xl p-8 shadow-sm">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Thank you for your group test booking enquiry.
              </h2>
            </div>

            <div className="space-y-4 text-gray-600 text-sm leading-relaxed mb-8">
              <p>
                We have successfully received your details. One of our team
                members will contact you shortly to confirm the number of
                candidates, preferred test location, and available test dates.
              </p>
              <p>
                You will also receive a confirmation email with further
                information regarding the booking process and any requirements
                for your group.
              </p>
              <p>
                If you have any questions in the meantime, please do not
                hesitate to contact us. We look forward to assisting your group
                with their test bookings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+447856423532"
                className="inline-flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-blue-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-green-100 transition-colors text-sm"
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
                +44 7856 423532
              </a>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BulkTestBooking;
