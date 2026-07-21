import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../../services/api";
import { showErrorToast } from "../../services/toastService";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_PAYMENT;

const StripeCheckout = ({
  orderId,
  onError,
  onBack,
  responseType = "card",
}) => {
  const checkoutRef = useRef(null);
  const initTokenRef = useRef(0);
  const activeEmbeddedCheckoutRef = useRef(null); // ✅ FIXED: Moved to component level (was global)
  const [stripe, setStripe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const cleanupCheckout = () => {
    if (activeEmbeddedCheckoutRef.current) {
      // ✅ FIXED: Use .current instead of direct variable
      try {
        activeEmbeddedCheckoutRef.current.destroy();
        console.log("Checkout destroyed successfully");
      } catch (err) {
        console.warn("Checkout already destroyed or error:", err);
      }
      activeEmbeddedCheckoutRef.current = null;
    }

    if (checkoutRef.current) {
      checkoutRef.current.innerHTML = "";
    }
  };

  const initializeCheckout = async () => {
    if (isInitializing) return;

    try {
      const initToken = ++initTokenRef.current;
      setIsInitializing(true);
      setLoading(true);
      setError(null);

      cleanupCheckout();
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (!checkoutRef.current) throw new Error("Checkout container not found");

      const response = await createCheckoutSession(orderId, responseType);

      if (!response || response.rs !== 1 || !response.res) {
        throw new Error(response?.rm || "Failed to create checkout session");
      }

      const clientSecret =
        response.res.clientSecret || response.res.client_secret;

      if (!clientSecret) {
        console.error("Available response keys:", Object.keys(response.res));
        throw new Error("Missing client secret from API response");
      }

      const checkout = await stripe.initEmbeddedCheckout({ clientSecret });

      if (initToken !== initTokenRef.current) {
        checkout.destroy();
        return;
      }

      cleanupCheckout(); // Ensure previous checkout is destroyed
      activeEmbeddedCheckoutRef.current = checkout; // ✅ FIXED: Use ref instead of global
      checkout.mount(checkoutRef.current);
    } catch (err) {
      console.error("Checkout initialization error:", err);
      const msg = err.message || "Failed to initialize checkout";
      setError(msg);
      showErrorToast(msg);
      onError?.(err);
    } finally {
      setLoading(false);
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    if (!stripe) {
      loadStripe(STRIPE_PUBLISHABLE_KEY)
        .then(setStripe)
        .catch((err) => {
          console.error("Failed to load Stripe:", err);
          setError("Failed to load payment system");
          setLoading(false);
        });
    }
  }, [stripe]);

  useEffect(() => {
    if (stripe && orderId && !isInitializing) {
      initializeCheckout();
    }
  }, [stripe, orderId]);

  // ✅ FIXED: Proper cleanup function that runs on unmount
  useEffect(() => {
    return () => {
      cleanupCheckout();
    };
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    cleanupCheckout();
    initTokenRef.current += 1;
    setTimeout(() => initializeCheckout(), 200);
  };

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
        <div className="text-center">
          <div className="mb-4 text-xl font-bold text-red-600">
            Payment Error
          </div>
          <p className="mb-6 text-gray-600">{error}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRetry}
              disabled={isInitializing}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {isInitializing ? "Retrying..." : "Try Again"}
            </button>
            <button
              onClick={onBack}
              className="rounded-lg bg-gray-200 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-200/60"
      id="payment-details"
    >
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Payment details</h2>
            <p className="mt-1 text-xs text-gray-500">Order ID: {orderId}</p>
          </div>
          <div className="hidden items-center gap-1 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Secure checkout
          </div>
        </div>
      </div>

      {loading && (
        <div className="mx-4 mt-4 flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800 sm:mx-6">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
          Loading secure payment form...
        </div>
      )}

      <div
        ref={checkoutRef}
        className="stripe-checkout-container min-h-[430px] px-3 py-4 sm:px-6"
        style={{ minHeight: "430px" }}
      />

      <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
        <button
          onClick={onBack}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-100"
        >
          Back to application
        </button>
      </div>
    </div>
  );
};

export default StripeCheckout;
