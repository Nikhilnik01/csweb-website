import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getSessionStatus } from "../../services/api";
import { showSuccessToast, showErrorToast } from "../../services/toastService";

const CoursePaymentResponse = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setError("No session ID found");
      setPaymentStatus("error");
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await getSessionStatus(sessionId);

        if (response && response.rs === 1) {
          const sessionInfo = response.res;
          setSessionData(sessionInfo);

          const status = sessionInfo?.statusName?.toLowerCase();

          if (status === "complete" || status === "paid") {
            setPaymentStatus("success");
            showSuccessToast("Course payment completed successfully!");
          } else if (
            status === "incomplete" ||
            status === "unpaid" ||
            status === "cancelled"
          ) {
            setPaymentStatus("failed");
            showErrorToast("Payment was not completed. Please try again.");
          } else if (status === "pending" || status === "processing") {
            setPaymentStatus("pending");
          } else {
            setPaymentStatus("pending");
          }
        } else {
          setError("Failed to retrieve payment status");
          setPaymentStatus("error");
        }
      } catch (err) {
        console.error("Error checking payment status:", err);
        setError(
          err.message || "An error occurred while checking payment status",
        );
        setPaymentStatus("error");
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  const handleReturnHome = () => {
    navigate("/");
  };

  const handleViewCourses = () => {
    navigate("/course-list");
  };

  const handleRetryPayment = () => {
    navigate("/course-list");
  };

  if (paymentStatus === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">
            Processing Payment...
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your payment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: "url('/images/page-header-bg-shape.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
        <div className="absolute inset-0 bg-white opacity-40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Payment Status
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Success Status */}
          {paymentStatus === "success" && (
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
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
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Your course payment has been processed successfully. You will
                receive a confirmation email shortly.
              </p>

              {sessionData && (
                <div className="bg-green-50 p-4 rounded-lg mb-6 text-left">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Payment Details
                  </h3>
                  <div className="space-y-1 text-sm text-green-700">
                    {sessionData.orderId && (
                      <p>
                        <span className="font-medium">Order ID:</span>{" "}
                        {sessionData.orderId}
                      </p>
                    )}
                    {sessionData.amount && (
                      <p>
                        <span className="font-medium">Amount:</span> €
                        {sessionData.amount}
                      </p>
                    )}
                    {sessionData.currency && (
                      <p>
                        <span className="font-medium">Currency:</span>{" "}
                        {sessionData.currency.toUpperCase()}
                      </p>
                    )}
                    {sessionData.createdDate && (
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(sessionData.createdDate).toLocaleString()}
                      </p>
                    )}
                    {sessionData.statusName && (
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        {sessionData.statusName}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleReturnHome}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Return to Home
                </button>
                <button
                  onClick={handleViewCourses}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  View More Courses
                </button>
              </div>
            </div>
          )}

          {/* Failed Status */}
          {paymentStatus === "failed" && (
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                Payment Failed
              </h2>
              <p className="text-gray-600 mb-6">
                Unfortunately, your payment could not be processed. Please try
                again or contact support if the issue persists.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRetryPayment}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Try Again
                </button>
                <button
                  onClick={handleReturnHome}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}

          {/* Pending Status */}
          {paymentStatus === "pending" && (
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-yellow-600 mb-2">
                Payment Pending
              </h2>
              <p className="text-gray-600 mb-6">
                Your payment is being processed. This may take a few moments.
                Please check back later or contact support if needed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Refresh Status
                </button>
                <button
                  onClick={handleReturnHome}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}

          {/* Error Status */}
          {paymentStatus === "error" && (
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                Error Occurred
              </h2>
              <p className="text-gray-600 mb-6">
                {error ||
                  "An unexpected error occurred while processing your payment. Please try again or contact support."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRetryPayment}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Try Again
                </button>
                <button
                  onClick={handleReturnHome}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePaymentResponse;
