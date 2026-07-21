import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApplicationType from "./ApplicationType";
import { STATIC_CARDS } from "../../forms/cscsCardForm/cscsCards";

// Import STATIC_CARDS from CSCSCardsPage


const CSCSCardFormPage = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("applicationType");

  // Find the card from STATIC_CARDS
  const selectedCard = STATIC_CARDS.find(
    (card) => card.id === parseInt(cardId)
  );

  if (!selectedCard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <p className="text-red-500 text-lg mb-4">Card not found</p>
          <button
            onClick={() => navigate("/cscs-cards")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Cards
          </button>
        </div>
      </div>
    );
  }

  const handleNext = (applicationType) => {
    console.log("Selected application type:", applicationType);
    // Move to next step (e.g., payment, confirmation, etc.)
    setCurrentStep("payment");
  };

  const handleBack = () => {
    if (currentStep === "applicationType") {
      navigate("/cscs-cards");
    } else {
      setCurrentStep("applicationType");
    }
  };

  return (
    <ApplicationType
      selectedCard={selectedCard}
      onNext={handleNext}
      onBack={handleBack}
      initialValue=""
    />
  );
};

export default CSCSCardFormPage;