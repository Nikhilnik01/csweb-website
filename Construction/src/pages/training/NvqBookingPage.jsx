import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StripeCheckout from "../../components/payment/StripeCheckout";
import NvqForm from "../../forms/nvqForm/NvqForm";

const NvqBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleFormSubmit = (formData) => {
    setOrderData(formData);
    setShowCheckout(Boolean(formData?.orderId));
  };

  const handlePaymentSuccess = () => {
    // Stripe embedded checkout handles redirect automatically via responseurl
    // This callback is for errors/cleanup only
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
  };

  const handleCheckoutBack = () => {
    setShowCheckout(false);
  };

  if (showCheckout && orderData?.orderId) {
    return (
      <div>
        {/* ── Page Header (Contact Style) ── */}
        <div className="relative overflow-hidden shadow-md bg-[#f5f7ff] md:bg-[url('/images/page-header-bg-shape.png')] md:bg-cover md:bg-center">
          {/* Background Overlays */}
          <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
          <div className="absolute inset-0 bg-white opacity-40"></div>

          {/* Header Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Complete Your NVQ Booking
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Review your details and finish payment securely.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Secure Payment
            </h2>

            <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="font-semibold text-blue-900">
                NVQ Course: {orderData.selectedLevelLabel}
              </p>
              <p className="mt-2 text-sm text-blue-700">
                Name: {orderData.firstName} {orderData.lastName}
              </p>
              <p className="text-sm text-blue-700">
                Booking total: GBP {orderData.price}
              </p>
            </div>

            <StripeCheckout
              orderId={orderData.orderId}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              onBack={handleCheckoutBack}
              responseType="training"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Page Header (Contact Style) ── */}
      <div className="relative overflow-hidden shadow-md bg-[#f5f7ff] md:bg-[url('/images/page-header-bg-shape.png')] md:bg-cover md:bg-center">
        {/* Background Overlays */}
        <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
        <div className="absolute inset-0 bg-white opacity-40"></div>

        {/* Header Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Book Your NVQ
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            {location.state?.sourceTitle
              ? `Complete your booking for ${location.state.sourceTitle} in 3 quick steps.`
              : "Complete your NVQ booking in 3 quick steps."}
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-4 sm:p-6">
          <NvqForm onSubmit={handleFormSubmit} />
        </div>
      </section>
    </div>
  );
};

export default NvqBookingPage;