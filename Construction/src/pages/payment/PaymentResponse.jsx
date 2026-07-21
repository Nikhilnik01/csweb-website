// src/pages/payment/PaymentResponse.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSessionStatus } from '../../services/api';
import { showSuccessToast, showErrorToast } from '../../services/toastService';

const PaymentResponse = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [sessionData, setSessionData] = useState(null);
    const [error, setError] = useState(null);

    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            fetchSessionStatus();
        } else {
            setError('No session ID provided');
            setLoading(false);
        }
    }, [sessionId]);

    const fetchSessionStatus = async () => {
        try {
            setLoading(true);
            const response = await getSessionStatus(sessionId);

            if (response.rs === 1 && response.res) {
                setSessionData(response.res);

                if (response.res.statusName === 'complete') {
                    showSuccessToast('Payment completed successfully!');
                } else {
                    showErrorToast('Payment was not completed successfully');
                }
            } else {
                setError(response.rm || 'Failed to fetch session status');
            }
        } catch (err) {
            console.error('Error fetching session status:', err);
            setError(err.message || 'Failed to fetch payment status');
            showErrorToast('Failed to fetch payment status');
        } finally {
            setLoading(false);
        }
    };

    const handleReturnHome = () => {
        navigate('/');
    };

    const handleViewCards = () => {
        navigate('/cscs-cards');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Processing payment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Error</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={handleReturnHome}
                                className="w-full sm:w-[140px] bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm text-center"
                            >
                                Return Home
                            </button>
                            <button
                                onClick={handleViewCards}
                                className="w-full sm:w-[140px] bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium text-sm text-center"
                            >
                                View Cards
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isSuccess = sessionData?.statusName === 'complete';
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/3 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
                    <div className="text-center">
                        {/* Success/Failure Icon */}
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isSuccess ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                            {isSuccess ? (
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            ) : (
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className={`text-3xl font-bold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-gray-600 mb-8">
                            {isSuccess
                                ? 'Your CSCS card application payment has been processed successfully.'
                                : 'There was an issue processing your payment. Please try again.'
                            }
                        </p>

                        {/* Payment Details */}
                        {sessionData && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order ID:</span>
                                        <span className="font-medium text-gray-800">{sessionData.orderId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Session ID:</span>
                                        <span className="font-medium text-gray-800 text-xs break-all">{sessionData.sessionId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Amount:</span>
                                        <span className="font-medium text-gray-800">
                                            {sessionData.currency?.toUpperCase()} {sessionData.amount}
                                        </span>
                                    </div>
                                    {sessionData.transactionCharge && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Transaction Charge:</span>
                                            <span className="font-medium text-gray-800">
                                                {sessionData.currency?.toUpperCase()} {sessionData.transactionCharge}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`font-medium capitalize px-2 py-1 rounded text-xs ${isSuccess
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {sessionData.statusName}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Date:</span>
                                        <span className="font-medium text-gray-800">
                                            {formatDate(sessionData.createdDate)}
                                        </span>
                                    </div>
                                    {sessionData.customerEmail && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Email:</span>
                                            <span className="font-medium text-gray-800">{sessionData.customerEmail}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Next Steps */}
                        {isSuccess && (
                            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">What's Next?</h3>
                                <ul className="text-blue-700 space-y-2 text-sm">
                                    <li>• You will receive a confirmation email shortly</li>
                                    <li>• Your CSCS card application will be processed within 5-10 business days</li>
                                    <li>• You can check your application status using your Order ID</li>
                                    <li>• Your card will be dispatched once approved</li>
                                </ul>
                            </div>
                        )}

                        {/* Action Buttons */}
                     <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
  <button
    onClick={handleReturnHome}
    className="w-full sm:w-auto min-w-[140px] bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base text-center"
  >
    Return Home
  </button>

  <button
    onClick={handleViewCards}
    className="w-full sm:w-auto min-w-[140px] bg-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium text-sm sm:text-base text-center"
  >
    View More Cards
  </button>
</div>

                        {/* Support */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Need help? Contact our support team or save your Order ID: <span className="font-medium">{sessionData?.orderId}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default PaymentResponse;
