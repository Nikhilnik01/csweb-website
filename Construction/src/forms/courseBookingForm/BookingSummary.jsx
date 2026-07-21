// src/forms/courseBookingForm/BookingSummary.jsx
import { COURSES } from "../../data/courses.data";
import { getCoursePricing } from "../../data/pricing.data";
import StripeCheckout from "../../components/payment/StripeCheckout";

const formatGBP = (value) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(Number(value || 0));

const BookingSummary = ({
  data = {},
  onSubmit = () => {},
  onBack,
  submitting = false,
  showPayment = false,
  orderId = null,
  onPaymentBack,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const courseData = COURSES.find((c) => c.id === data.selectedCourse);
  const coursePricing = data.selectedCourse
    ? getCoursePricing(data.selectedCourse)
    : null;

  // Get the correct pricing based on course type (online/classroom)
  const pricing = coursePricing ? coursePricing[data.courseType || "online"] : null;

  const basePrice = pricing?.basePrice || 0;
  const bookingFee = pricing?.bookingFee || 0;
  const total = pricing?.total || basePrice + bookingFee;

  const fullName = [data.title, data.firstName, data.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-blue-900 border-b border-blue-100 pb-2">
        Order Summary
      </h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Course:</span>
          <span className="font-semibold text-gray-900">
            {courseData?.shortTitle || courseData?.title || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="font-semibold capitalize">
            {data.courseType === "online" ? "Online" : "Classroom"}
          </span>
        </div>
        {data.selectedDate && (
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-semibold">
              {new Date(data.selectedDate).toLocaleDateString("en-GB")}
            </span>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Name:</span>
          <span className="font-semibold">{fullName || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Email:</span>
          <span className="font-semibold break-all text-right max-w-[60%]">
            {data.email || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phone:</span>
          <span className="font-semibold">{data.phone || "-"}</span>
        </div>
      </div>

      <div className="border border-blue-200 rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-3 font-bold text-sm">
          Payment
        </div>
        <div className="p-4 space-y-2 text-sm bg-white">
          <div className="flex justify-between">
            <span className="text-gray-600">Course Price:</span>
            <span className="font-medium">{formatGBP(basePrice)}</span>
          </div>
          {bookingFee > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Booking{" "}
                {pricing?.bookingAndAssessmentFee ? "& Assessment " : ""}
                Fee:
              </span>
              <span className="font-medium">{formatGBP(bookingFee)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-blue-100 pt-2 mt-1">
            <span className="font-bold text-blue-900">Total</span>
            <span className="font-bold text-blue-900 text-base">
              {formatGBP(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <svg
          className="w-4 h-4 text-blue-700 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Guaranteed safe &amp; secure checkout powered by Stripe
      </div>

      <div className="flex gap-3">
        {onBack && !showPayment && (
          <button
            onClick={onBack}
            disabled={submitting}
            className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-50 font-medium"
          >
            Back to edit
          </button>
        )}
        {!showPayment && (
          <button
            onClick={onSubmit}
            disabled={submitting || !pricing}
            className="flex-1 bg-blue-700 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-xs disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating checkout..." : "Proceed to Payment"}
          </button>
        )}
      </div>

      {showPayment && orderId && (
        <div id="course-stripe-checkout" className="pt-2">
          <StripeCheckout
            orderId={orderId}
            onSuccess={onPaymentSuccess}
            onError={onPaymentError}
            onBack={onPaymentBack}
            responseType="course"
          />
        </div>
      )}
    </div>
  );
};

export default BookingSummary;