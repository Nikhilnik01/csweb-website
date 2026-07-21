// src/forms/nvqForm/NvqSummary.jsx

import { useState } from "react";
import { getNvqBookingOption } from "../../data/pricing.data";

const NvqSummary = ({
  data = {},
  price = 0,
  onPaymentTypeChange = () => {},
}) => {
  const [paymentType, setPaymentType] = useState(data.paymentType || "full");
  const selectedOption = getNvqBookingOption(data.level);

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    onPaymentTypeChange(type);
  };

  const monthlyPayment = Math.ceil(price / 12);

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      {/* <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h3 className="mb-4 font-bold text-blue-900">Your Order</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <span>Level:</span>
            <span className="text-right font-semibold">
              {selectedOption?.title || "NVQ Course"}
            </span>
          </div>

          {selectedOption && (
            <div className="flex justify-between gap-4">
              <span>From:</span>
              <span className="text-right font-semibold">
                GBP {selectedOption.startingAt}
              </span>
            </div>
          )}

          <div className="flex justify-between gap-4">
            <span>Name:</span>
            <span className="text-right font-semibold">
              {data.title} {data.firstName} {data.lastName}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span>Email:</span>
            <span className="text-right font-semibold break-all">
              {data.email}
            </span>
          </div>

          <div className="mt-2 flex justify-between border-t border-blue-200 pt-2 font-bold text-blue-900">
            <span>Booking Total:</span>
            <span>GBP {price}</span>
          </div>
        </div>
      </div> */}

      {/* NVQ Thank You Content */}
      <div className="">
        <h3 className="mb-4 text-xl font-bold text-blue-900">
          Thank You for Your Enquiry
        </h3>

        <div className="space-y-4 text-sm leading-6 text-gray-700">
          <p>
            Thank you for your enquiry and interest in enrolling for an NVQ
            qualification.
          </p>

          <p>
            We have successfully received your details. One of our qualified
            assessors will contact you shortly to discuss your experience,
            eligibility, and the most suitable NVQ pathway for you.
          </p>

          <p>
            You will also receive a confirmation email with further information
            about the qualification and the enrolment process.
          </p>

          <p>
            If you have any questions in the meantime, please feel free to
            contact us. We look forward to helping you achieve your
            qualification.
          </p>
        </div>
      </div>

      {/* <div>
        <h3 className="mb-4 font-bold text-blue-900">Payment Options</h3>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-start rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-blue-600">
            <input
              type="radio"
              name="paymentType"
              value="full"
              checked={paymentType === "full"}
              onChange={() => handlePaymentTypeChange("full")}
              className="mt-1 h-4 w-4"
            />
            <div className="ml-4 flex-1">
              <p className="font-bold text-gray-900">Pay in Full</p>
              <p className="font-semibold text-blue-600">GBP {price}</p>
              <p className="mt-1 text-xs text-gray-600">
                Pay the full amount now
              </p>
            </div>
          </label>

          <label className="flex cursor-pointer items-start rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-blue-600">
            <input
              type="radio"
              name="paymentType"
              value="emi"
              checked={paymentType === "emi"}
              onChange={() => handlePaymentTypeChange("emi")}
              className="mt-1 h-4 w-4"
            />
            <div className="ml-4 flex-1">
              <p className="font-bold text-gray-900">EMI - Installment Plan</p>
              <p className="font-semibold text-blue-600">
                12 months x GBP {monthlyPayment}
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Spread payment over 12 months
              </p>
            </div>
          </label>
        </div>
      </div> */}

      {/* <div className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
        <h3 className="mb-4 font-bold">Payment Summary</h3>
        <div className="space-y-2 text-sm">
          {paymentType === "full" ? (
            <>
              <div className="flex justify-between">
                <span>Course Price:</span>
                <span>GBP {price}</span>
              </div>
              <div className="flex justify-between border-t border-blue-400 pt-2 text-lg font-bold">
                <span>Total:</span>
                <span>GBP {price}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span>Monthly Payment:</span>
                <span>GBP {monthlyPayment}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>12 months</span>
              </div>
              <div className="flex justify-between border-t border-blue-400 pt-2 text-lg font-bold">
                <span>Total (12 x GBP {monthlyPayment}):</span>
                <span>GBP {monthlyPayment * 12}</span>
              </div>
            </>
          )}
        </div>
      </div> */}

      {/* <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-sm text-yellow-900">
          <span className="font-bold">Terms:</span> By proceeding, you agree to
          our Terms & Conditions and privacy policy.
          {paymentType === "emi" && " EMI is subject to credit approval."}
        </p>
      </div> */}
    </div>
  );
};

export default NvqSummary;