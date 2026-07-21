// src/pages/whichTest/WhichTest.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { WHICH_TEST_PAGE } from "../../data/whichTest.data";

const colorMap = {
  pink: {
    bg: "bg-blue-50",
    border: "border-blue-400",
    badge: "bg-blue-600",
    text: "text-blue-700",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-400",
    badge: "bg-blue-600",
    text: "text-blue-700",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
  gold: {
    bg: "bg-blue-50",
    border: "border-blue-400",
    badge: "bg-blue-600",
    text: "text-blue-700",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
  black: {
    bg: "bg-blue-50",
    border: "border-blue-400",
    badge: "bg-blue-600",
    text: "text-blue-700",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
};

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-800 text-base pr-4">{q}</span>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 bg-white">
          <p className="text-gray-600 text-base leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
};

const WhichTest = () => {
  const { hero, overview, tests, quickFinder, languagesSection, faq } =
    WHICH_TEST_PAGE;
  const [selectedRole, setSelectedRole] = useState(null);

  const selectedResult = selectedRole
    ? quickFinder.roles.find((r) => r.label === selectedRole)
    : null;

  const selectedTestData = selectedResult
    ? tests.find((t) => t.id === selectedResult.testId)
    : null;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-2.5 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">
              Home
            </a>
            <span>»</span>
            <span className="truncate">{hero.heading}</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {hero.heading}
          </h1>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed">
            {hero.subheading}
          </p>
          <div className="mt-5">
            <Link
              to={hero.ctaHref}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded transition-colors text-base"
            >
              {hero.ctaLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-3">
        <div className="max-w-4xl mx-auto px-4">
          {/* Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {overview.heading}
            </h2>
            <div className="space-y-3">
              {overview.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-800 text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Quick Finder */}
          {/* <div className="mb-8">
            <div className="bg-white rounded border border-gray-200">
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  {quickFinder.heading}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {quickFinder.subheading}
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {quickFinder.roles.map((role) => (
                    <button
                      key={role.label}
                      onClick={() =>
                        setSelectedRole(
                          role.label === selectedRole ? null : role.label,
                        )
                      }
                      className={`text-left px-4 py-3 rounded border transition-all text-sm font-medium ${
                        selectedRole === role.label
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-blue-50 border-blue-100 text-blue-800 hover:bg-blue-100"
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>

                {selectedResult && selectedTestData && (
                  <div className="mt-6 p-5 bg-blue-50 border-l-4 border-blue-600 rounded">
                    <p className="text-sm text-gray-500 mb-2">
                      For your role:
                    </p>
                    <p className="font-bold text-lg text-blue-700 mb-2">
                      {selectedTestData.title}
                    </p>
                    <p className="text-base text-gray-700 mb-4">
                      {selectedTestData.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 text-sm mb-4">
                      <span className="text-gray-600">
                        Card:{" "}
                        <strong className="text-gray-900">
                          {selectedResult.card}
                        </strong>
                      </span>
                      <span className="text-gray-600">
                        Duration:{" "}
                        <strong className="text-gray-900">
                          {selectedTestData.duration}
                        </strong>
                      </span>
                      <span className="text-gray-600">
                        Languages:{" "}
                        <strong className="text-gray-900">
                          {selectedTestData.languages}
                        </strong>
                      </span>
                    </div>
                    <Link
                      to={selectedTestData.ctaHref}
                      className="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition-colors text-base"
                    >
                      {selectedTestData.ctaLabel}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div> */}

          {/* Test Types */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              All Four CITB Test Types
            </h2>
            <div className="space-y-6">
              {tests.map((test, index) => {
                const c = colorMap[test.color] || colorMap.blue;
                return (
                  <div key={test.id}>
                    {/* Title row */}
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${c.text}`}>
                          {index + 1}. {test.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {test.subtitle}
                        </p>
                      </div>
                      <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1.5 rounded whitespace-nowrap">
                        {test.duration}
                      </span>
                    </div>

                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                      {test.description}
                    </p>

                    {/* Who should take */}
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Who Should Take This Test
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 mb-4 text-sm text-gray-700">
                      {test.whoShouldTake.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>

                    {/* Specialist Test Types */}
                    {test.specialistTestTypes && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          {test.specialistTestInfo}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          {test.specialistTestTypes.map((type, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-blue-600 font-semibold mt-0.5 flex-shrink-0">
                                •
                              </span>
                              <span>{type}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* CSCS Cards */}
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      CSCS Cards This Unlocks
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {test.relatedCards.map((card) => (
                        <span
                          key={card}
                          className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"
                        >
                          {card}
                        </span>
                      ))}
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-col sm:flex-row gap-6 text-sm mb-4">
                      <span className="text-gray-600">
                        Questions:{" "}
                        <strong className="text-gray-900">
                          {test.questions}
                        </strong>
                      </span>
                      <span className="text-gray-600">
                        Pass Score:{" "}
                        <strong className="text-gray-900">
                          {test.passScore}
                        </strong>
                      </span>
                      <span className="text-gray-600">
                        Language:{" "}
                        <strong className="text-gray-900">
                          {test.languages === "Available in 25+ languages"
                            ? "Multi (25+ languages)"
                            : "English only"}
                        </strong>
                      </span>
                    </div>

                    <Link
                      to={test.ctaHref}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition-colors text-base"
                    >
                      {test.ctaLabel}
                    </Link>

                    <hr className="mt-5 border-gray-200" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {languagesSection.heading}
            </h2>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <p className="text-gray-800 text-base leading-relaxed">
                {languagesSection.body}
              </p>
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* FAQ */}
          <div className="">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-lg border border-blue-100 bg-white p-6 text-center">
            <h2 className="text-3xl font-bold mb-3 text-blue-900">
              Ready to Book Your Test?
            </h2>
            <p className="text-blue-700 mb-5 text-base">
              Book your CITB HS&E Test online today. Fast, secure, and available
              tomorrow.
            </p>
            <Link
              to="/citb"
              className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-base"
            >
              Book CITB Test Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhichTest;
