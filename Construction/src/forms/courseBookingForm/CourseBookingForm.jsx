import { useEffect, useState } from "react";
import CourseDetails from "./CourseDetails";
import PersonalDetails from "./PersonalDetails";
import BookingSummary from "./BookingSummary";
import { COURSES } from "../../data/courses.data";
import { bookCourse } from "../../services/api";
import { getCoursePricing } from "../../data/pricing.data";
import toast from "react-hot-toast";

const STEPS = ["Course Details", "Personal Details", "Summary"];

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

const CourseBookingForm = ({
  onSubmit,
  selectedCourse,
  lockSelectedCourse = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const selectedCourseId = selectedCourse?.id || "";

  const [formData, setFormData] = useState({
    courseType: "online",
    selectedCourse: selectedCourseId,
    selectedDate: "",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!selectedCourseId) return;
    setFormData((prev) => ({
      ...prev,
      selectedCourse: prev.selectedCourse || selectedCourseId,
      courseType:
        prev.courseType || selectedCourse?.defaultDelivery || "online",
    }));
  }, [selectedCourseId, selectedCourse?.defaultDelivery]);

  const handleStepData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (showPayment) {
      setShowPayment(false);
      setOrderId(null);
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
      const course = COURSES.find((c) => c.id === formData.selectedCourse);
      const courseApiId = selectedCourse?.apiId || course?.apiId || 0;
      const coursePricing = getCoursePricing(formData.selectedCourse);
      const pricing = coursePricing?.[formData.courseType || "online"];
      const total =
        pricing?.total ||
        (pricing?.basePrice || 0) + (pricing?.bookingFee || 0);

      if (!course || !pricing || total <= 0) {
        toast.error("Please select a valid course before payment.");
        setSubmitting(false);
        return;
      }

      const payload = {
        courseDeliveryTypeId: courseApiId,
        title: formData.title,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNo: formData.phone,
        amount: total,
        transactionCharge: 0,
        dobDay: 1,
        dobMonth: 1,
        dobYear: 1990,
        address: formData.address || "",
        addressLine2: formData.addressLine2 || "",
        townCity: formData.townCity || "",
        country: formData.country || "UK",
        postalCode: formData.postalCode || "",
        responseUrl: "course-payment-response",
      };

      const booking = await bookCourse(payload);

      const result =
        booking?.res || (Array.isArray(booking?.rc) ? booking.rc[0] : booking?.rc);
      const newOrderId =
        result?.orderId || booking?.orderId || booking?.res?.orderId;

      if (booking?.rs === 1 && newOrderId) {
        setOrderId(newOrderId);
        setShowPayment(true);
        setTimeout(() => {
          document
            .getElementById("course-stripe-checkout")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        toast.error(booking?.rm || "Booking failed. Please try again.");
      }

      if (onSubmit) onSubmit(formData);
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {};

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    toast.error("Payment failed. Please try again.");
  };

  const handlePaymentBack = () => {
    setShowPayment(false);
    setOrderId(null);
    setCurrentStep(2);
  };

  const components = [CourseDetails, PersonalDetails, BookingSummary];
  const StepComponent = components[currentStep];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
      {/* Progress header */}
      <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
        <span>
          Step {currentStep + 1} of {STEPS.length}:{" "}
          <strong className="text-gray-700">{STEPS[currentStep]}</strong>
        </span>
        <span>
          {currentStep + 1} of {STEPS.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1.5 w-full rounded-full bg-gray-200">
        <div
          className="h-1.5 rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step indicator */}
      <StepIndicator currentStep={currentStep} />

      {/* Form */}
      <div className="bg-white border border-gray-100 p-6 rounded-lg">
        <StepComponent
          data={formData}
          onData={handleStepData}
          onSubmit={currentStep === 2 ? handleSubmit : undefined}
          onBack={handlePrev}
          submitting={submitting}
          showPayment={showPayment}
          orderId={orderId}
          onPaymentBack={handlePaymentBack}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
          lockSelectedCourse={lockSelectedCourse}
        />
      </div>

      {/* Nav buttons */}
      {currentStep < 2 && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 border rounded disabled:opacity-40 text-sm"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseBookingForm;
