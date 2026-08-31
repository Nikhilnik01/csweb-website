import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KlarnaBanner from "../../components/sections/KlarnaBanner";
import { getCSCSCards } from "../../services/api";
import { mergeApiCardsWithStatic } from "../../utils/cscsCardsApi";
import { useNavigationData } from "../../context/NavigationDataContext";
import SeoHead from "../../components/common/SeoHead";

// ── Card image mapping from cscsCards.data.js (slug → correct image) ─────────
// Green Card  → /images/cscs-cards/1.webp
// Blue Card   → /images/cscs-cards/2.webp  (cscsCards.data.js id:2)
// Red Cards   → various images per card
// Gold Cards  → /images/cscs-cards/10.webp (supervisor), /images/cscs-cards/3.webp (craft)
// Black Card  → /images/cscs-cards/12.webp
// White Cards → /images/cscs-cards/14.webp (academic), /images/cscs-cards/6.webp (professional)

// ── Slug helper ───────────────────────────────────────────────────────────────
const titleToSlug = (title) => {
  const t = title.toLowerCase();
  if (t.includes("green")) return "cscs-green-card";
  if (t.includes("blue")) return "blue-skilled-worker";
  if (t.includes("industry placement")) return "industry-placement";
  if (t.includes("trainee")) return "trainee";
  if (t.includes("provisional")) return "red-provisional";













  
  if (t.includes("experienced worker")) return "red-experienced-worker";
  if (t.includes("technical")) return "red-technical";
  if (t.includes("apprentice")) return "red-apprentice";
  if (t.includes("gold") && t.includes("supervisor")) return "gold-supervisor";
  if (t.includes("gold")) return "gold-skilled-worker";
  if (t.includes("black")) return "black-manager";
  if (t.includes("academically")) return "white-academically";
  if (t.includes("professionally")) return "white-professionally";
  return null;
};

// ── Card color config ─────────────────────────────────────────────────────────
const getCardColorConfig = (cardColor = "") => {
  const map = {
    green: {
      bar: "#16a34a",
      fallbackBg: "#dcfce7",
      fallbackText: "#14532d",
      labelBg: "#dcfce7",
      labelText: "#14532d",
      label: "Green Card",
    },
    red: {
      bar: "#dc2626",
      fallbackBg: "#fee2e2",
      fallbackText: "#7f1d1d",
      labelBg: "#fee2e2",
      labelText: "#7f1d1d",
      label: "Red Card",
    },
    blue: {
      bar: "#2563eb",
      fallbackBg: "#dbeafe",
      fallbackText: "#1e3a8a",
      labelBg: "#dbeafe",
      labelText: "#1e3a8a",
      label: "Blue Card",
    },
    gold: {
      bar: "#b45309",
      fallbackBg: "#fef3c7",
      fallbackText: "#78350f",
      labelBg: "#fef3c7",
      labelText: "#78350f",
      label: "Gold Card",
    },
    black: {
      bar: "#1f2937",
      fallbackBg: "#f3f4f6",
      fallbackText: "#111827",
      labelBg: "#e5e7eb",
      labelText: "#111827",
      label: "Black Card",
    },
    white: {
      bar: "#9ca3af",
      fallbackBg: "#f9fafb",
      fallbackText: "#374151",
      labelBg: "#f3f4f6",
      labelText: "#374151",
      label: "White Card",
    },
  };
  return map[cardColor] || map["blue"];
};

// ── Card Tile ─────────────────────────────────────────────────────────────────
const CscsCardTile = ({ card }) => {
  const navigate = useNavigate();
  const colorConfig = getCardColorConfig(card.cardColor);

  const handleApplyNow = (e) => {
    e.preventDefault();
    navigate(`/cscs-card-form/${card.id}`);
  };

  const handleLearnMore = (e) => {
    e.preventDefault();
    const slug = card.slug || titleToSlug(card.title) || card.id;
    navigate(`/cscs-cards/${slug}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col overflow-hidden border border-gray-100 h-full">
      {/* ── COLOR BAR — card ke actual color ki thin strip ── */}

      {/* IMAGE CONTAINER */}
      <div className="w-full px-6 pt-4 flex flex-col items-center justify-center overflow-hidden bg-gray-50/50">
        {/* Card image */}
        <div className="w-full h-44 flex items-center justify-center">
          {card.cardImage ? (
            <img
              src={card.cardImage}
              alt={card.title}
              className="w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handleLearnMore}
              onError={(e) => {
                e.target.style.display = "none";
                const fallback =
                  e.target.parentElement.querySelector(".fallback-bg");
                if (fallback) fallback.style.display = "flex";
              }}
            />
          ) : null}

          {/* Fallback — same card color ka background */}
          <div
            className={`fallback-bg w-full h-full rounded-lg items-center justify-center ${card.cardImage ? "hidden" : "flex"}`}
            style={{
              background: colorConfig.fallbackBg,
              color: colorConfig.fallbackText,
            }}
          >
            <span className="text-2xl font-bold">CSCS</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 pb-5 pt-4 flex flex-col flex-grow">
        <h3
          className="font-bold text-gray-800 text-base mb-2 leading-tight cursor-pointer"
          onClick={handleLearnMore}
        >
          {card.title}
        </h3>

        <p className="text-gray-500 text-xs leading-relaxed mb-4">
          {card.description}
        </p>

        {card.extra && (
          <p className="text-[11px] text-gray-500 mb-3 font-medium">
            {card.extra}
          </p>
        )}

        {card.isQualificationsNeed && card.qualificationName && (
          <p className="text-xs text-blue-600 font-semibold mb-4 bg-blue-50 p-2 rounded">
            Qualifications:{" "}
            <span className="text-gray-800 font-normal">
              {card.qualificationName}
            </span>
          </p>
        )}

        <div className="flex flex-col gap-2.5 mt-auto">
          <button
            onClick={handleApplyNow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-lg transition-all active:scale-95 shadow-sm"
          >
            Apply Now
          </button>
          <button
            onClick={handleLearnMore}
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs py-2.5 rounded-lg transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const CSCSCardsPage = () => {
  // Reuse the single fetch already done by NavigationDataProvider
  // (Header/Footer/this page all share the same request now — no more
  // duplicate GetCSCSCards calls).
  const { cscsCardsResponse, loading: navLoading } = useNavigationData();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navLoading) return;

    if (cscsCardsResponse?.status === "fulfilled") {
      setCards(mergeApiCardsWithStatic(cscsCardsResponse.value));
      setError(null);
    } else {
      setError(cscsCardsResponse?.reason?.message || "Error loading cards");
    }
  }, [navLoading, cscsCardsResponse]);

  const fetchCards = async () => {
    // Manual retry fallback (only hit when the shared context fetch failed)
    try {
      setError(null);
      const response = await getCSCSCards(null);
      setCards(mergeApiCardsWithStatic(response));
    } catch (err) {
      setError(err.message || "Error loading cards");
    }
  };

  const loading = navLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CSCS Cards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={fetchCards}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const firstChunk = cards.slice(0, 4);
  const secondChunk = cards.slice(4);

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoHead
        title="Choose Your CSCS Card Test as per your required field | Construction Customer Service"
        description="We arrange cscs cards and citb test for your required field across UK. If you have requirement any cscs cards just call us: 0203 930 9758"
        keywords="CSCS cards, apply CSCS card, green card, blue card, gold card, black card, construction card"
      />
      {/* ── Header */}
      <div className="relative overflow-hidden shadow-md bg-[#f5f7ff] md:bg-[url('/images/page-header-bg-shape.png')] md:bg-cover md:bg-center">
        <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
        <div className="absolute inset-0 bg-white opacity-40"></div>
        <div className="relative z-10 margin-container py-4 lg:py-6 text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            CSCS Cards
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Info */}
        <div className="mb-4 bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
          <p className="text-gray-700 mb-3">
            Below are the CSCS Cards you can apply for when passing a CITB
            Health, Safety & Environment Test (commonly referred to as the Touch
            Screen Test).
          </p>
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No cards available</p>
          </div>
        ) : (
          <>
            {firstChunk.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                {firstChunk.map((card) => (
                  <CscsCardTile key={card.id} card={card} />
                ))}
              </div>
            )}

            {secondChunk.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {secondChunk.map((card) => (
                  <CscsCardTile key={card.id} card={card} />
                ))}

                {/* Klarna Banner Card */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 w-full">
                  <div className="w-full flex justify-center sm:justify-start">
                    <img
                      src="/images/Klarna.jpeg"
                      alt="Construction worker holding a CSCS card with Klarna payment option"
                      className="
        block
        w-full
        h-auto
        rounded-xl
        object-contain
        object-center sm:object-left
        max-w-[320px]
        sm:max-w-[340px]
        md:max-w-[380px]
        lg:max-w-[420px]
        xl:max-w-[460px]
      "
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.parentElement?.parentElement) {
                          e.currentTarget.parentElement.parentElement.style.display =
                            "none";
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CSCSCardsPage;
