// src/forms/citbTestForm/BookingSummary.jsx

import { PRICING } from "../../data/pricing.data";

const BookingSummary = ({ personalData, testData, cscsTests }) => {
  const selectedTest = cscsTests?.find(
    (t) =>
      t.testName === testData?.testType || t.testtotake === testData?.testType,
  );

  const fullName = [
    personalData?.title,
    personalData?.firstName,
    personalData?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  // Get pricing from PRICING data
  // Get selected package pricing
  const pricing =
    testData?.addRevision === "test-revision"
      ? PRICING.citbTest.revisionMaterial
      : testData?.addRevision === "test-retake-revision"
        ? PRICING.citbTest.revisionMaterialRetake
        : PRICING.citbTest.standard;

  const testFee = pricing.basePrice;
  const adminFee = pricing.bookingFee;
  const total = pricing.total;

  const testName =
    selectedTest?.testtotake || testData?.testType || "CITB Test";

  return (
    <div className="mb-4 rounded-xl border border-blue-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-4 border-b border-blue-100 pb-3">
        <div>
          <h3 className="text-lg font-bold text-blue-900">Order Summary</h3>
          <p className="text-xs text-gray-500">
            Review your booking before payment.
          </p>
        </div>
        <button
          type="button"
          id="pay-now-btn"
          onClick={() => {
            const el = document.getElementById("payment-details");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Pay Now
        </button>
      </div>

      <div className="grid gap-4 text-sm md:grid-cols-2">
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-800">
            Personal Details
          </h4>
          <dl className="space-y-1.5">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Name</dt>
              <dd className="font-medium text-gray-900">{fullName || "-"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Email</dt>
              <dd className="max-w-[62%] break-all text-right font-medium text-gray-900">
                {personalData?.email || "-"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Phone</dt>
              <dd className="font-medium text-gray-900">
                {personalData?.phoneNo || "-"}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-800">
            Test Details
          </h4>
          <dl className="space-y-1.5">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Test</dt>
              <dd className="max-w-[62%] text-right font-medium text-gray-900">
                {testName}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Centre</dt>
              <dd className="max-w-[62%] text-right font-medium text-gray-900">
                {testData?.testCenter || "-"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Date / Time</dt>
              <dd className="font-medium text-gray-900">
                {[testData?.testDate, testData?.testTime]
                  .filter(Boolean)
                  .join(" ") || "-"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Pricing Breakdown - Compact */}
      <div className="mt-3 border-t border-blue-100 pt-3">
        <dl className="grid gap-0 text-xs sm:grid-cols-3">
          <div className="flex justify-between items-center pb-2 sm:pb-0 sm:block">
            <dt className="font-semibold text-gray-600">CITB Test Fee</dt>
            <dd className="font-bold text-gray-900">£{testFee}.00</dd>
          </div>

          <div className="flex justify-between items-center pb-2 sm:pb-0 sm:block">
            <dt className="font-semibold text-gray-600">Admin Fee</dt>
            <dd className="font-bold text-gray-900">£{adminFee}.00</dd>
          </div>

          <div className="flex justify-between items-center rounded bg-blue-50 px-2 py-1.5 sm:flex-col sm:items-end">
            <dt className="font-bold text-blue-800">Total</dt>
            <dd className="font-bold text-blue-900">£{total}.00</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default BookingSummary;
