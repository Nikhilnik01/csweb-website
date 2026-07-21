import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSessionStatus } from '../../services/api';
import { showSuccessToast, showErrorToast } from '../../services/toastService';

const TrainingPaymentResponse = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [sessionData, setSessionData] = useState(null);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const sessionId = searchParams.get('session_id');
    const MAX_RETRIES = 3;

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
                } else if (response.res.statusName === 'processing' && retryCount < MAX_RETRIES) {
                    // If payment is still processing, retry after a delay
                    setTimeout(() => {
                        setRetryCount(prev => prev + 1);
                        fetchSessionStatus();
                    }, 3000);
                    return;
                } else {
                    showErrorToast('Payment was not completed successfully');
                }
            } else {
                setError(response.rm || 'Failed to fetch session status');
            }
        } catch (err) {
            console.error('Error fetching session status:', err);

            // Retry logic for network errors
            if (retryCount < MAX_RETRIES) {
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                    fetchSessionStatus();
                }, 2000);
                return;
            }

            setError(err.message || 'Failed to fetch payment status');
            showErrorToast('Failed to fetch payment status');
        } finally {
            setLoading(false);
        }
    };

    const handleReturnHome = () => {
        navigate('/');
    };

    const handleViewTraining = () => {
        navigate('/training');
    };

    const handleRetry = () => {
        setError(null);
        setRetryCount(0);
        fetchSessionStatus();
    };

    const handleDownloadReceipt = () => {
        if (!sessionData) return;

        // Create a simple text receipt
        const receiptText = `
NVQ Training Course Payment Receipt
===================================

Order ID: ${sessionData.orderId}
Session ID: ${sessionData.sessionId}
Amount: ${sessionData.currency?.toUpperCase()} ${sessionData.amount}
${sessionData.transactionCharge ? `Transaction Charge: ${sessionData.currency?.toUpperCase()} ${sessionData.transactionCharge}` : ''}
Status: ${sessionData.statusName}
Date: ${formatDate(sessionData.createdDate)}
${sessionData.customerEmail ? `Email: ${sessionData.customerEmail}` : ''}

Thank you for your NVQ course enrollment!
        `.trim();

        const blob = new Blob([receiptText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NVQ_Training_Receipt_${sessionData.orderId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const copyOrderId = () => {
        if (sessionData?.orderId) {
            navigator.clipboard.writeText(sessionData.orderId);
            showSuccessToast('Order ID copied to clipboard!');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'complete':
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'processing':
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                        Processing NVQ course payment...
                        {retryCount > 0 && ` (Attempt ${retryCount + 1}/${MAX_RETRIES + 1})`}
                    </p>
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
                        <div className="flex gap-4 justify-center flex-wrap">
                            <button
                                onClick={handleRetry}
                                className="w-full sm:w-[140px] text-white bg-gray-300 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm text-center"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={handleReturnHome}
                                className="w-full sm:w-[140px] bg-blue-600 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium text-sm text-center"
                            >
                                Return Home
                            </button>
                            <button
                                onClick={handleViewTraining}
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Browse Training Courses
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isSuccess = sessionData?.statusName === 'complete';
    const isProcessing = sessionData?.statusName === 'processing';

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
                        {/* Success/Failure/Processing Icon */}
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isSuccess
                            ? 'bg-green-100'
                            : isProcessing
                                ? 'bg-yellow-100'
                                : 'bg-red-100'
                            }`}>
                            {isSuccess ? (
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            ) : isProcessing ? (
                                <svg className="w-10 h-10 text-yellow-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            ) : (
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className={`text-3xl font-bold mb-4 ${isSuccess
                            ? 'text-green-600'
                            : isProcessing
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}>
                            {isSuccess
                                ? 'Enrollment Successful!'
                                : isProcessing
                                    ? 'Payment Processing'
                                    : 'Payment Failed'
                            }
                        </h1>

                        {/* Subtitle */}
                        <p className="text-gray-600 mb-8">
                            {isSuccess
                                ? 'Your NVQ training course enrollment payment has been processed successfully.'
                                : isProcessing
                                    ? 'Your payment is being processed. This may take a few moments.'
                                    : 'There was an issue processing your NVQ course payment. Please try again.'
                            }
                        </p>

                        {/* Payment Details */}
                        {sessionData && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Order ID:</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-800">{sessionData.orderId}</span>
                                            <button
                                                onClick={copyOrderId}
                                                className="p-1 hover:bg-gray-200 rounded"
                                                title="Copy Order ID"
                                            >
                                                <svg
                                                    className="w-4 h-4 text-gray-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Session ID:</span>
                                        <span className="font-medium text-gray-800 text-xs break-all">
                                            {sessionData.sessionId}
                                        </span>
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
                                        <span
                                            className={`font-medium capitalize px-2 py-1 rounded text-xs ${getStatusColor(
                                                sessionData.statusName
                                            )}`}
                                        >
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
            </div>
        </div>
    );
};

export default TrainingPaymentResponse;
