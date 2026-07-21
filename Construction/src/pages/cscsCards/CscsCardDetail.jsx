// src/pages/cscsCards/CscsCardDetail.jsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigationData } from "../../context/NavigationDataContext";
import { mergeApiCardWithStatic } from "../../utils/cscsCardsApi";

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const sanitizeCardHtml = (html = "") =>
  String(html)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\s(href|src)=["']javascript:[^"']*["']/gi, "");

const CscsCardDetail = () => {
  const { cardId } = useParams();
  const numericId = Number(cardId);

  const [card, setCard] = useState(null);

  // Reuse the single GetCSCSCards fetch already done by NavigationDataProvider
  // (Header/Footer/CscsCardsPage all share it) instead of firing our own
  // separate getCSCSCards request — that was causing GetCSCSCards to show up
  // twice in the Network tab on this page.
  const { cscsCardsResponse, loading: navLoading } = useNavigationData();

  useEffect(() => {
    if (navLoading) return;

    if (cscsCardsResponse?.status === "fulfilled") {
      const list = cscsCardsResponse.value?.res?.lists;
      const apiCard = Array.isArray(list)
        ? list.find(
            (c) =>
              String(c.id) === String(cardId) ||
              String(c.id) === String(numericId),
          )
        : null;

      // Purely API-driven — whatever the admin has entered for this card
      // is exactly what shows up here. No static fallback data is merged in.
      setCard(apiCard ? mergeApiCardWithStatic(apiCard) : null);
    } else {
      if (cscsCardsResponse?.status === "rejected") {
        console.error(
          "Error loading CSCS card detail:",
          cscsCardsResponse.reason,
        );
      }
      setCard(null);
    }
  }, [cardId, numericId, cscsCardsResponse, navLoading]);

  const loading = navLoading;

  const apiDescriptionHtml = card?.cardDescriptionHtml
    ? sanitizeCardHtml(card.cardDescriptionHtml)
    : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CSCS Card...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-3">
            Card Not Found
          </h2>
          <p className="text-gray-600 mb-5">
            The CSCS card page you're looking for doesn't exist.
          </p>
          <Link
            to="/cscs-cards"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700"
          >
            View All CSCS Cards
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-2.5 px-4">
        <div className="max-w-6xl mx-auto text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link to="/cscs-cards" className="hover:text-blue-600">
            CSCS Cards
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{card.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Card Image */}
            {card.cardImage && (
              <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 p-6 flex items-center justify-center min-h-[200px]">
                  <img
                    src={card.cardImage}
                    alt={card.title}
                    className="w-full max-w-md max-h-[320px] object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    to={`/cscs-card-form/${card.id}`}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    <span>Apply Now</span>
                  </Link>

                  <Link
                    to="/citb"
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    <span>Book CITB Test</span>
                  </Link>
                </div>
              </section>
            )}

            {apiDescriptionHtml && (
              <div
                className="space-y-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                dangerouslySetInnerHTML={{ __html: apiDescriptionHtml }}
              />
            )}

            {/* Plain-text description fallback when the admin hasn't added
                rich HTML content for this card yet */}
            {!apiDescriptionHtml && card.description && (
              <section className="bg-white border border-gray-100 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  {card.description}
                </p>
              </section>
            )}

            {/* Booking Info — generic CTA shown for every card */}
            <section className="p-2">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-blue-900">
                  Book Your Test with Construction Customer Service
                </h2>
                <p className="text-sm text-blue-700 mt-1">
                  Choose from over 150 test centres nationwide.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* BOOK NOW */}
                <a
                  href="/citb"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all active:scale-95 shadow-md"
                >
                  Click BOOK NOW
                </a>

                {/* CALL */}
                <a
                  href="tel:+443333440036"
                  className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  Call 0333 344 0036
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Apply Securely info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="font-semibold text-blue-900 text-sm">
                  Apply safely and securely
                </p>
              </div>
              <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
                <p>
                  The CSCS Card provides proof that individuals working on
                  construction sites have the appropriate training and
                  qualifications for the job they do on site.
                </p>
                <p>
                  Once your application is completed your card should arrive in
                  up to ten working days. This is an application through
                  Construction Courses; an online provider of bookings,
                  applications and training.
                </p>
                <p className="text-gray-400">
                  We are not part of or affiliated with CSCS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CscsCardDetail;