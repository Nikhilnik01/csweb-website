// src/pages/testCenter/TestCenter.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { getActiveTestCenters } from "../../data/testCenters.data";
import SeoHead from "../../components/common/SeoHead";

const TestCenter = () => {
  const [search, setSearch] = useState("");
  const centers = getActiveTestCenters();

  const filtered = centers.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoHead
        title="CITB Test Centres | Find Nearest CSCS Test Center UK"
        description="Search and find your nearest CITB test centre in the UK. We have over 150 approved centres for Health, Safety & Environment tests."
        keywords="CITB test center, find CSCS test location, UK CITB test centres"
      />
      <section className="bg-gradient-to-br from-[#1a3a4a] to-[#2d5f7c] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Find Your Nearest CITB Test Centre
          </h1>
          <p className="text-blue-200 text-lg mb-8">
            Over 80 test centres across the UK — find one near you.
          </p>
          <div className="max-w-xl mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Search by city or town..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm">
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-gray-500 text-sm mb-6">
          Showing {filtered.length} test centre{filtered.length !== 1 ? "s" : ""}
          {search ? ` for "${search}"` : ""}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((center) => (
            <div
              key={center.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{center.title}</h3>
                  {center.description && (
                    <p className="text-gray-500 text-xs leading-relaxed whitespace-pre-line">
                      {center.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No test centres found for "{search}"</p>
            <button
              onClick={() => setSearch("")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to Book Your CITB Test?</h2>
          <p className="text-blue-200 mb-6">
            Fast, secure booking online. Available at test centres across the UK.
          </p>
          <Link
            to="/book-citb-test"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Book CITB Test Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestCenter;
