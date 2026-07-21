// src/pages/cscsCards/CscsCardForm.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CscsCardForm from "../../forms/cscsCardForm/CscsCardForm";
import StripeCheckout from "../../components/payment/StripeCheckout";
import { PRICING } from "../../data/pricing.data";
import { bookCard } from "../../services/api";
import { showSuccessToast, showErrorToast } from "../../services/toastService";
import { useNavigationData } from "../../context/NavigationDataContext";
import { mergeApiCardWithStatic } from "../../utils/cscsCardsApi";

const CscsCardFormPage = () => {
  const navigate = useNavigate();
  const { cardId } = useParams();

  const [selectedCard, setSelectedCard] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Reuse the single GetCSCSCards fetch already done by NavigationDataProvider
  // (Header/Footer/CscsCardsPage/CscsCardDetail all share it) instead of
  // firing our own separate getCSCSCards request here.
  const { cscsCardsResponse, loading: navLoading } = useNavigationData();

  useEffect(() => {
    if (navLoading) return;

    if (cscsCardsResponse?.status === "fulfilled") {
      const list = cscsCardsResponse.value?.res?.lists;
      const apiCard = Array.isArray(list)
        ? list.find((c) => String(c.id) === String(cardId))
        : null;

      // Purely API-driven — whatever the admin has entered for this card
      // is exactly what's used here. No static fallback data is merged in.
      setSelectedCard(apiCard ? mergeApiCardWithStatic(apiCard) : null);
    } else {
      if (cscsCardsResponse?.status === "rejected") {
        console.error(
          "Error loading selected CSCS card:",
          cscsCardsResponse.reason,
        );
      }
      setSelectedCard(null);
    }
  }, [cardId, cscsCardsResponse, navLoading]);

  const cardPricing = {
    basePrice: selectedCard?.basePrice ?? PRICING.cscsCard.basePrice,
    adminFee: selectedCard?.bookingFee ?? PRICING.cscsCard.adminFee,
    total: selectedCard?.totalPrice ?? selectedCard?.amount ?? PRICING.cscsCard.total,
    currency: selectedCard?.currency || "£",
  };

  const handleFormSubmit = async (formData) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await bookCard({
        ...formData,
        selectedCard,
        amount: cardPricing.total,
        transactionCharge: 0,
        responseUrl: "response",
      });

      if (response?.rs === 1 && response?.res) {
        const result = response.res;
        if (result.resultStatus === 1) {
          setOrderId(result.orderId);
          setOrderData(formData);
          setShowCheckout(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
          showSuccessToast(
            `Application submitted! Order ID: ${result.orderId}`,
          );
        } else {
          showErrorToast("Application failed. Please try again.");
        }
      } else {
        showErrorToast("Invalid server response. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      showErrorToast(
        error.message || "Failed to submit application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckoutSuccess = () => {
    navigate("/response", { state: { orderId, orderData }, replace: true });
  };

  const handleCheckoutBack = () => {
    setShowCheckout(false);
    setOrderId(null);
  };

  if (showCheckout && orderId) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
            <h1 className="mb-1 text-2xl font-bold text-blue-900">Payment</h1>
            <p className="mb-4 text-sm text-blue-700">
              {PRICING.cscsCard.label}: <strong>£{cardPricing.total}</strong>
            </p>
            <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm">
              <div className="mb-1 flex justify-between gap-4">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold">
                  {orderData?.title} {orderData?.firstName}{" "}
                  {orderData?.lastName}
                </span>
              </div>
              <div className="mb-1 flex justify-between gap-4">
                <span className="text-gray-600">Card type:</span>
                <span className="font-semibold capitalize">
                  {selectedCard?.title ||
                    orderData?.selectedCard?.title ||
                    "CSCS Card"}
                </span>
              </div>
              <div className="mb-3 flex justify-between gap-4">
                <span className="text-gray-600">Application:</span>
                <span className="font-semibold capitalize">
                  {orderData?.applicationType || "New"}
                </span>
              </div>
              <button
                onClick={handleCheckoutBack}
                className="text-xs text-blue-600 underline"
              >
                Go back to edit your order
              </button>
            </div>

            {/* Pricing Breakdown - Compact */}
            <div className="mb-4 rounded-xl border border-blue-200 bg-white p-3">
              <dl className="grid gap-0 text-xs sm:grid-cols-3">
                <div className="flex justify-between items-center pb-2 sm:pb-0 sm:block">
                  <dt className="font-semibold text-gray-600">CSCS Card Fee</dt>
                  <dd className="font-bold text-gray-900">
                    £{cardPricing.basePrice}
                  </dd>
                </div>

                <div className="flex justify-between items-center pb-2 sm:pb-0 sm:block">
                  <dt className="font-semibold text-gray-600">Admin Fee</dt>
                  <dd className="font-bold text-gray-900">
                    £{cardPricing.adminFee}.00
                  </dd>
                </div>

                <div className="flex justify-between items-center rounded bg-blue-50 px-2 py-1.5 sm:flex-col sm:items-end">
                  <dt className="font-bold text-blue-800">Total</dt>
                  <dd className="font-bold text-blue-900">
                    £{cardPricing.total}
                  </dd>
                </div>
              </dl>
            </div>

            <StripeCheckout
              orderId={orderId}
              responseType="card"
              onSuccess={handleCheckoutSuccess}
              onError={(msg) => showErrorToast(msg)}
              onBack={handleCheckoutBack}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 sm:py-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4">
          <h1 className="mb-1 text-3xl font-bold text-blue-900">
            Apply for your CSCS Card
          </h1>
          <p className="text-blue-700">
            Online, Safe &amp; Secure. Complete your application in minutes.
          </p>
        </div>
        {submitting && (
          <div className="mb-4 flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="h-5 w-5 flex-shrink-0 animate-spin rounded-full border-b-2 border-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Submitting your application...
            </span>
          </div>
        )}
        <CscsCardForm onSubmit={handleFormSubmit} selectedCard={selectedCard} />
      </div>
    </div>
  );
};

export default CscsCardFormPage;