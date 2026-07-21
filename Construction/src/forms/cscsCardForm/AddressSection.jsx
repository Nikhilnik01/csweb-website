// src/forms/cscsCardForm/AddressSection.jsx

import { useState } from "react";
import {
  fetchAddressSuggestions,
  retrieveAddressDetails,
} from "../../services/api";

const AddressSection = ({
  addressLine1,
  addressLine2,
  city,
  postcode,
  onChange,
  errors,
  loading,
  showSuggestions,
  setShowSuggestions,
  suggestions,
  handleLine1Change,
}) => {
  const handleSelect = async (suggestion) => {
    try {
      const details = await retrieveAddressDetails(suggestion.Id);
      if (details) {
        const line1 = [details.Line1, details.Line2].filter(Boolean).join(", ");
        const line2 = [details.Line3, details.Line4].filter(Boolean).join(", ");
        onChange({
          addressLine1: line1 || details.Line1 || "",
          addressLine2: line2,
          city: details.City || "",
          postcode: details.PostalCode || "",
        });
      }
    } catch (_) {}
    setShowSuggestions(false);
  };

  const inputCls = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? "border-red-500" : "border-blue-200"
    }`;

  return (
    <div className="space-y-4 mb-4">
      <div className="relative">
        <label className="block text-sm font-medium text-blue-900 mb-1">
          Address Line 1 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={addressLine1}
            onChange={handleLine1Change}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Start typing your address or postcode…"
            className={inputCls("addressLine1")}
            autoComplete="off"
          />
          {loading && (
            <div className="absolute right-3 top-2.5">
              <div className="animate-spin h-4 w-4 border-b-2 border-blue-600 rounded-full" />
            </div>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 w-full bg-white border border-blue-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onMouseDown={() => handleSelect(s)}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
                >
                  {s.Text}, {s.Description}
                </li>
              ))}
            </ul>
          )}
        </div>
        {errors.addressLine1 && (
          <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-900 mb-1">
          Address Line 2 <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          value={addressLine2}
          onChange={(e) =>
            onChange({
              addressLine1,
              addressLine2: e.target.value,
              city,
              postcode,
            })
          }
          placeholder="Flat, floor, unit…"
          className={inputCls("addressLine2")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1">
            Town / City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) =>
              onChange({
                addressLine1,
                addressLine2,
                city: e.target.value,
                postcode,
              })
            }
            placeholder="Town or city"
            className={inputCls("city")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-900 mb-1">
            Postcode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={postcode}
            onChange={(e) =>
              onChange({
                addressLine1,
                addressLine2,
                city,
                postcode: e.target.value,
              })
            }
            placeholder="e.g. SW1A 1AA"
            className={inputCls("postcode")}
          />
          {errors.postcode && (
            <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
