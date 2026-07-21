// src/pages/citbTest/CitbTest.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CitbTestForm from "../../forms/citbTestForm/CitbTestForm";
import TestDetails from "../../forms/citbTestForm/TestDetails";
import StripeCheckout from "../../components/payment/StripeCheckout";
import BookingSummary from "../../forms/citbTestForm/BookingSummary";
import { bookTest } from "../../services/api";
import { showSuccessToast, showErrorToast } from "../../services/toastService";
import KlarnaBanner from "../../components/sections/KlarnaBanner";

const CitbTest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalData, setPersonalData] = useState(null);
  const [testData, setTestData] = useState(null);
  const [cscsTests, setCscsTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handlePersonalDataSubmit = (data) => {
    setPersonalData(data);
    setCurrentStep(2);
    scrollToTop();
  };

  const handleTestSubmit = async (completeFormData) => {
    setLoading(true);
    try {
      const response = await bookTest(completeFormData);
      // Check both response formats - rc array OR res object
      const result = response.rc?.[0] || response.res;

      if (response.rs === 1 && result) {
        if (result.resultStatus === 1) {
          showSuccessToast(
            "Test booked successfully! Please complete payment.",
          );
          setOrderId(result.orderId);
          setCurrentStep(3);
          scrollToTop();
        } else {
          showErrorToast(result.rm || "Failed to book test. Please try again.");
        }
      } else {
        showErrorToast(response.rm || "Failed to book test.");
      }
    } catch (error) {
      showErrorToast(error.message || "Failed to book test.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    showSuccessToast("Payment completed successfully!");
    navigate("/");
  };

  const handlePaymentError = () => {
    showErrorToast("Payment failed. Please try again.");
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    scrollToTop();
  };

  return (
    <>
      {/* ── Page Header (Slim & Responsive) ── */}
      <div
        className="
    relative overflow-hidden shadow-md
    bg-[#f5f7ff]
    md:bg-[url('/images/page-header-bg-shape.png')]
    md:bg-cover md:bg-center
  "
      >
        {/* Background Overlays */}
        <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
        <div className="absolute inset-0 bg-white opacity-40"></div>

        {/* Content: CSCS Cards ki tarah same slim spacing aur typography */}
        <div className="relative z-10 margin-container py-4 lg:py-6 text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Book Test For CSCS Cards
          </h1>
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-3 text-gray-700 font-medium">Booking your test…</p>
          </div>
        </div>
      )}

      <section className="pt-3 pb-3">
        <div className="margin-container !mt-0">
          {currentStep === 1 && (
            <div className="mt-4">
              <CitbTestForm
                onNext={handlePersonalDataSubmit}
                initialData={personalData}
              />
            </div>
          )}
          {currentStep === 2 && (
            <TestDetails
              personalData={personalData}
              onSubmit={handleTestSubmit}
              onBack={handleBack}
              onDataChange={setTestData}
              onCscsTestsUpdate={setCscsTests}
              initialData={testData}
            />
          )}
          {currentStep === 3 && orderId && (
            <div className="max-w-4xl mx-auto">
              <BookingSummary
                personalData={personalData}
                testData={testData}
                cscsTests={cscsTests}
              />
              <StripeCheckout
                orderId={orderId}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onBack={handleBack}
                responseType="test"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CitbTest;
