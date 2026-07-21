import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getCPCSModules, getCPCSRenewalPrices } from "../../services/api";

const CpcsCard = () => {
  const [selected, setSelected] = useState([]);
  const [modules, setModules] = useState([]);
  const [prices, setPrices] = useState(null);
  const [modulesLoading, setModulesLoading] = useState(true);
  const [modulesError, setModulesError] = useState(null);
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState(0);

  const MAX_MODULES = 10;

  useEffect(() => {
    fetchCpcsData();
  }, []);

  useEffect(() => {
    if (selected.length === 0) {
      setSelectedPrice(0);
    } else if (prices) {
      if (selected.length <= 5) {
        setSelectedPrice(prices.totalPrice5Module || 65);
      } else {
        setSelectedPrice(prices.totalPrice10Module || 115);
      }
    } else {
      // Fallback pricing if API doesn't return prices
      if (selected.length <= 5) {
        setSelectedPrice(65);
      } else {
        setSelectedPrice(115);
      }
    }
  }, [selected, prices]);

  const fetchCpcsData = async () => {
    try {
      setModulesLoading(true);
      setModulesError(null);

      // Fetch modules
      const modulesResponse = await getCPCSModules();
      if (modulesResponse.rs === 1 && modulesResponse.res?.lists) {
        setModules(modulesResponse.res.lists);
      } else {
        throw new Error("Failed to load CPCS modules");
      }

      // Fetch pricing
      const pricesResponse = await getCPCSRenewalPrices();
      if (pricesResponse.rs === 1 && pricesResponse.res?.lists?.[0]) {
        setPrices(pricesResponse.res.lists[0]);
      } else {
        throw new Error("Failed to load CPCS pricing");
      }
    } catch (error) {
      console.error("Error fetching CPCS data:", error);
      setModulesError("Failed to load CPCS details. Please try again.");
    } finally {
      setModulesLoading(false);
    }
  };

  const handleToggle = (moduleId, moduleName) => {
    setSelected((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === moduleId);
      if (existingIndex !== -1) {
        return prev.filter((item) => item.id !== moduleId);
      } else {
        if (prev.length >= MAX_MODULES) return prev;
        return [...prev, { id: moduleId, name: moduleName }];
      }
    });
  };

const handleNext = () => {
  if (selected.length === 0) return;
  navigate("/renewcpcs", {
    state: {
      selectedModules: selected,
      calculatedPrice: selectedPrice,
      cpcsPriceId: prices?.id || 0, 
    },
  });
};

  return (
    <>
      <Helmet>
        <title>
          CPCS Card Renewal & Extension Guide | Construction Customer Service
        </title>
        <meta
          name="description"
          content="Need to renew your CPCS Blue Competent Operator Card or extend your Red Trained Operator Card? Construction Customer Service provides expert guidance across the UK. Call 0333 344 0036 today."
        />
        <meta
          name="keywords"
          content="CPCS, card renewal, extension, operator, blue card, red card, construction"
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">
              Home
            </a>
            <span>»</span>
            <span>CPCS Card Renewal & Extension Guide</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            CPCS Card Renewal & Extension Guide
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
            Need to renew your CPCS Blue Competent Operator Card or extend your
            Red Trained Operator Card? Construction Customer Service provides
            expert guidance across the UK. Call{" "}
            <a href="tel:03333440036" className="text-blue-600 hover:underline">
              0333 344 0036
            </a>{" "}
            today.
          </p>

          {/* Scroll to Module Selection CTA */}
          <button
            onClick={() =>
              document
                .getElementById("module-selection")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Renew Your CPCS Card Now
          </button>
        </div>
      </div>

      {/* Main Content — fully static, no API */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
              Renewing Your CPCS Blue Competent Operator Card
            </h2>

            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                Understanding the Process Before You Start
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                The Blue Competent Operator Card is valid for five years from
                the date it was issued. As it approaches expiry, you need to
                complete the renewal process to keep your certification active
                and your right to work on site intact.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                CPCS renewals are administered through NOCN Job Cards via the
                NOCN Hub at nocnjobcards.org. The scheme has recently been
                updated — most importantly, from 22 August 2024, the old
                category-specific CPCS Renewal Tests were replaced by a new
                online CPD course. If you last renewed your card before this
                date, the process will look different this time around.
              </p>
            </div>

            {/* Route 1 */}
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                Route 1 — Your Blue Card Is In Date or Expired Within the Last 5
                Years
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                This is the standard route for the majority of Blue Card
                holders. Follow these four steps in order:
              </p>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title:
                      "Step 1 — Pass the Health, Safety and Environment Test",
                    body: "Before anything else, you must hold a valid CITB Health, Safety and Environment (HS&E) Operative Test that was passed within the last two years. This test is available at Pearson VUE test centres throughout the UK. There are different versions depending on your role — make sure you book the correct one for plant operators. If your HS&E test has already expired, book this first. Nothing else can move forward without it.",
                  },
                  {
                    step: "2",
                    title: "Step 2 — Complete the NOCN CPCS Renewal CPD",
                    body: "This is the knowledge renewal requirement that replaced the old Renewal Test in August 2024. The NOCN CPCS Renewal CPD is a five-module online eLearning course available through the NOCN Hub. It covers health and safety updates, environmental responsibilities, site operations, and industry best practice relevant to all CPCS plant categories. There is no pass or fail — you simply work through the five modules and completion is automatically recorded on your NOCN account. The course can be completed on any device, at any time, and at your own pace. It costs £28 when purchased directly through NOCN.",
                  },
                  {
                    step: "3",
                    title:
                      "Step 3 — Prove Ongoing Practical Operating Experience",
                    body: null,
                    bullets: [
                      {
                        label: "CPCS Logbook",
                        desc: "a minimum of 300 logged operating hours per category, signed off by a supervisor or employer.",
                      },
                      {
                        label: "On-Site Assessment",
                        desc: "a formal assessment carried out by an accredited CPCS assessor at your workplace.",
                      },
                      {
                        label: "CPCS Practical Test",
                        desc: "completed at an accredited CPCS test centre.",
                      },
                      {
                        label: "NVQ or VQ Qualification",
                        desc: "holding or achieving the relevant NVQ/VQ for your category counts as evidence.",
                      },
                    ],
                    note: "If you hold multiple categories on your Blue Card, you must provide evidence of practical experience for each one you wish to renew.",
                  },
                  {
                    step: "4",
                    title: "Step 4 — Submit Your Renewal Application",
                    body: "With your valid HS&E test certificate, your completed NOCN CPD, and your practical experience evidence in hand, you complete and submit Form F1/3 — Application to Renew CPCS Competent Operator Card. This can be submitted online through the NOCN Hub or by post. There is no additional processing fee — the application cost is included within the CPD course fee.",
                    note2:
                      "Your renewed Blue Competent Operator Card will be issued for a further five years.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                        {item.title}
                      </h4>
                      {item.body && (
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {item.body}
                        </p>
                      )}
                      {item.bullets && (
                        <>
                          <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
                            You must demonstrate that you have continued to
                            actively operate plant machinery in your category
                            since your last card was issued. CPCS accepts
                            evidence through one of the following four routes:
                          </p>
                          <ul className="space-y-2">
                            {item.bullets.map((b) => (
                              <li
                                key={b.label}
                                className="flex items-start gap-3"
                              >
                                <span className="text-gray-700 flex-shrink-0 font-bold">
                                  •
                                </span>
                                <span className="text-sm sm:text-base text-gray-700">
                                  <strong>{b.label}</strong> — {b.desc}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {item.note && (
                        <p className="text-sm sm:text-base text-gray-700 mt-3 leading-relaxed">
                          {item.note}
                        </p>
                      )}
                      {item.note2 && (
                        <p className="text-sm sm:text-base text-gray-700 mt-3 font-semibold">
                          {item.note2}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 bg-amber-50 border-l-4 border-amber-600 rounded">
                <p className="text-sm sm:text-base text-gray-700">
                  <strong>Important:</strong> Do not leave this until your card
                  has already expired. We recommend starting the process at
                  least six months before your expiry date. If you are unsure
                  where you stand or what to book first, call Construction
                  Customer Service on{" "}
                  <a
                    href="tel:03333440036"
                    className="text-blue-600 hover:underline"
                  >
                    0333 344 0036
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Route 2 */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                Route 2 — Your Blue Card Expired More Than 5 Years Ago
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                If your Blue Competent Operator Card has been expired for more
                than five years, the standard renewal route is no longer
                available. The CPCS Management Committee has set out specific
                criteria for operators in this position, which require a more
                thorough re-assessment before a card can be reissued.
              </p>
              <div className="p-4 border border-gray-200 rounded-lg mb-4">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                  To renew a card expired by more than five years, you must
                  complete all of the following:
                </h4>
                <ul className="space-y-2">
                  {[
                    "Pass the CITB Health, Safety and Environment Test",
                    "Pass the CPCS Theory Test for each category you wish to reinstate",
                    "Pass the CPCS Practical Test for each category you wish to reinstate",
                    "Hold the relevant NVQ or VQ qualification for each category",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-gray-700 flex-shrink-0 font-bold">
                        •
                      </span>
                      <span className="text-sm sm:text-base text-gray-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded mb-4">
                <p className="text-sm sm:text-base text-gray-700">
                  If you do not yet hold the NVQ or VQ for a category, a Red
                  Trained Operator Card will be issued for that category rather
                  than the Blue. You can then work towards your NVQ and upgrade
                  to Blue once it is achieved.
                </p>
              </div>
              <div className="p-4 bg-amber-50 border-l-4 border-amber-600 rounded">
                <p className="text-sm sm:text-base text-gray-700">
                  <strong>Note:</strong> Both the Theory and Practical Tests
                  must be taken at an accredited CPCS test centre. This route
                  requires careful planning. Call us on{" "}
                  <a
                    href="tel:03333440036"
                    className="text-blue-600 hover:underline"
                  >
                    0333 344 0036
                  </a>{" "}
                  before you book anything.
                </p>
              </div>
            </div>
          </div>

          {/* Red Card Extension */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
              Extending Your CPCS Red Trained Operator Card
            </h2>
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                The Red Trained Operator Card is the starting point for most
                plant operators — it is issued after your initial CPCS training
                and testing and is valid for two years. During this time, you
                are expected to complete your NVQ or VQ and progress to a Blue
                Card.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                Route 1 — 12-Month NVQ Extension
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 font-semibold">
                Your Red Card must be in date or expired within the last 12
                months
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                This is the simplest extension route. If your card is still
                active or expired within the last year and you are already
                registered for your NVQ or VQ, you can apply for a 12-month
                extension.
              </p>
              <div className="p-4 border border-gray-200 rounded-lg mb-4">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                  To apply, you must:
                </h4>
                <ul className="space-y-2">
                  {[
                    "Hold a CPCS Red Trained Operator Card that is currently in date or expired within the last 12 months",
                    "Be actively registered for an NVQ or VQ that is relevant to your CPCS plant category",
                    "Call the CPCS Helpline on 0300 999 1177, confirm your personal details, and pay the non-refundable £28 processing fee",
                    "Submit proof of your NVQ or VQ registration by email or post to NOCN Job Cards",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-gray-700 flex-shrink-0 font-bold">
                        •
                      </span>
                      <span className="text-sm sm:text-base text-gray-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-sm sm:text-base text-gray-700">
                  If you need help getting registered for your NVQ, call
                  Construction Customer Service on{" "}
                  <a
                    href="tel:03333440036"
                    className="text-blue-600 hover:underline"
                  >
                    0333 344 0036
                  </a>{" "}
                  and we will advise you.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                Route 2 — Additional 2-Year Red Card
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 font-semibold">
                Your Red Card expired more than 12 months ago
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                If your Red Trained Operator Card expired over a year ago, the
                simple 12-month extension is no longer available. You must pass
                a series of formal tests before a new card can be requested.
              </p>
              <div className="p-4 border border-gray-200 rounded-lg mb-4">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                  To qualify, you must complete all of the following in the
                  correct sequence:
                </h4>
                <ul className="space-y-2">
                  {[
                    {
                      bold: "Pass the CITB Health, Safety and Environment Test",
                      rest: "— this must remain valid throughout the entire process",
                    },
                    {
                      bold: "Pass the CPCS Theory Test for your category",
                      rest: "— this must be achieved within two years of your HS&E test",
                    },
                    {
                      bold: "Pass the CPCS Practical Test for your category",
                      rest: "— this must be completed within six months of your Theory Test, and within two years of your HS&E test",
                    },
                    {
                      bold: "Be actively registered for the relevant NVQ or VQ for your category",
                      rest: "",
                    },
                  ].map((item) => (
                    <li key={item.bold} className="flex items-start gap-3">
                      <span className="text-gray-700 flex-shrink-0 font-bold">
                        •
                      </span>
                      <span className="text-sm sm:text-base text-gray-700">
                        <strong>{item.bold}</strong>
                        {item.rest ? ` ${item.rest}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-amber-50 border-l-4 border-amber-600 rounded">
                <p className="text-sm sm:text-base text-gray-700">
                  <strong>Important:</strong> The timing between each test is
                  critical on this route. Before you book anything, speak to our
                  team on{" "}
                  <a
                    href="tel:03333440036"
                    className="text-blue-600 hover:underline"
                  >
                    0333 344 0036
                  </a>{" "}
                  so we can walk you through the correct sequence.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* CPCS Categories */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Which CPCS Categories Does This Cover?
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
              The renewal and extension processes above apply across every CPCS
              plant category. Construction Customer Service provides guidance
              and support for all of the following:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Earth Moving Categories",
                  items: [
                    "Forward Tipping Dumper",
                    "Excavator 180° Below 5 Tonnes",
                    "Excavator 180° Above 5 Tonnes",
                    "Excavator 360° Below 10 Tonnes",
                    "Excavator 360° Above 10 Tonnes",
                    "Excavator 360° Lifting Operations",
                    "Wheeled Loading Shovel",
                    "Tracked Loading Shovel",
                    "Skid Steer Loader",
                    "Crawler Tractor/Dozer",
                    "Dump Truck Articulated Chassis",
                    "Dump Truck Rigid Chassis",
                  ],
                },
                {
                  title: "Crane and Lifting Categories",
                  items: [
                    "Crawler Crane",
                    "Tower Crane",
                    "Mobile Crane",
                    "Compact Crane",
                    "Overhead Travelling Crane",
                    "Lorry Loader",
                    "Slinger/Signaller",
                    "Slinger/Signaller Upgrade",
                    "Loader/Securer Non-STGO",
                    "Loader/Securer STGO",
                    "Appointed Person – Lifting Operations",
                    "Crane/Lifting Operations Supervisor",
                  ],
                },
                {
                  title: "Additional Plant Categories",
                  items: [
                    "Rough Terrain Forklift/Masted Truck",
                    "Forklift Side Loader",
                    "Industrial Forklift Truck",
                    "Telescopic Handler",
                    "Telescopic Handler Suspended Load",
                    "Telescopic Handler 360 Slew",
                    "Mobile Elevating Work Platform Scissor",
                    "Mobile Elevating Work Platform Boom",
                    "Hoist",
                    "Ride-On Roller",
                    "Agricultural Tractor",
                    "Loader/Compressor",
                  ],
                },
              ].map((col) => (
                <div
                  key={col.title}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                    {col.title}
                  </h4>
                  <ul className="space-y-1">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-gray-700 flex-shrink-0 font-bold text-xs mt-0.5">
                          •
                        </span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <p className="text-sm sm:text-base text-gray-700">
                If you hold more than one category, all can be renewed at the
                same time. You will need practical experience evidence for each
                individual category, but the NOCN CPCS Renewal CPD only needs to
                be completed once.
              </p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Why Contact */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Why Contact Construction Customer Service?
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-5 leading-relaxed">
              We exist to take the stress and confusion out of the CPCS card
              process. The scheme has changed significantly in recent years —
              particularly with the introduction of the new NOCN online CPD in
              August 2024 — and many operators and employers are unsure what the
              current requirements actually are.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Straight answers, no jargon",
                  body: "We tell you exactly which route applies to you, which tests you need, what order to do them in, and what it will cost. No vague answers, no being passed around.",
                },
                {
                  title: "Guidance for all CPCS categories",
                  body: "Whether you operate an excavator, a tower crane, a telescopic handler, or any other plant category, we know the renewal requirements inside out.",
                },
                {
                  title: "Support for multiple categories",
                  body: "If your card covers several plant types, we will help you plan a renewal process that covers every category efficiently without unnecessary duplication.",
                },
                {
                  title: "Advice on NVQ registration",
                  body: "If you need to register for an NVQ or VQ to support a Red Card extension or Blue Card renewal, we can advise on the right qualification and the right awarding body for your situation.",
                },
                {
                  title: "Help for employers",
                  body: "If you manage a team of plant operators and need multiple cards renewed at the same time, we can help you coordinate the process, reduce downtime, and keep your workforce compliant.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 bg-green-50 border-l-4 border-green-600 rounded">
              <p className="text-sm sm:text-base text-gray-700">
                We handle enquiries from plant operators and construction
                businesses across the whole of the UK. Whether your card expired
                last week or five years ago, call us first — we will tell you
                honestly what your options are.
              </p>
            </div>
          </div>

          {/* Module Selection Section - API scoped only here */}
          <div id="module-selection" className="mt-12 scroll-mt-20">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Select Your Modules
                </h3>
                <p className="text-sm text-blue-100 mt-1">
                  Choose up to 10 modules for your CPCS renewal
                </p>
              </div>

              <div className="p-6 sm:p-8">
                {modulesLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="text-sm text-gray-600">
                      Loading modules...
                    </p>
                  </div>
                ) : modulesError ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-7 h-7 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <p className="text-red-600 text-sm sm:text-base font-semibold mb-4">
                      {modulesError}
                    </p>
                    <button
                      onClick={fetchCpcsData}
                      className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium text-sm"
                    >
                      Try Again
                    </button>
                  </div>
                ) : modules && modules.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {modules.map((module) => (
                        <label
                          key={module.id}
                          className="flex items-center p-4 border border-gray-200 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selected.some(
                              (item) => item.id === module.id,
                            )}
                            onChange={() =>
                              handleToggle(module.id, module.moduleName)
                            }
                            disabled={
                              selected.length >= MAX_MODULES &&
                              !selected.some((item) => item.id === module.id)
                            }
                            className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                          />
                          <span className="ml-3 text-sm sm:text-base text-gray-900 font-medium">
                            {module.moduleName}
                          </span>
                        </label>
                      ))}
                    </div>

                    {selected.length > 0 && (
                      <div className="border border-gray-200 rounded p-5 mb-5">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                          Selected Modules ({selected.length}):
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selected.map((item) => (
                            <span
                              key={item.id}
                              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {item.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pricing Info */}
                    {/* {selected.length > 0 && prices && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                          Pricing
                        </h4>
                        <div className="space-y-2 text-sm sm:text-base">
                          {selected.length <= 5 ? (
                            <>
                              <p className="text-gray-700">
                                <span className="font-semibold">Package:</span>{" "}
                                5 or fewer modules
                              </p>
                              <p className="text-gray-700">
                                <span className="font-semibold">
                                  Base Price:
                                </span>{" "}
                                £{prices.basePrice5Module}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-semibold">
                                  Booking Fee:
                                </span>{" "}
                                £{prices.bookingFee5Module}
                              </p>
                              <p className="text-blue-700 font-bold text-lg">
                                Total: £{prices.totalPrice5Module}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="text-gray-700">
                                <span className="font-semibold">Package:</span>{" "}
                                6-10 modules
                              </p>
                              <p className="text-gray-700">
                                <span className="font-semibold">
                                  Base Price:
                                </span>{" "}
                                £{prices.basePrice10Module}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-semibold">
                                  Booking Fee:
                                </span>{" "}
                                £{prices.bookingFee10Module}
                              </p>
                              <p className="text-blue-700 font-bold text-lg">
                                Total: £{prices.totalPrice10Module}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    )} */}

                    <div className="flex gap-4 pt-5 border-t border-gray-200">
                      <button
                        onClick={handleNext}
                        disabled={selected.length === 0}
                        className={`flex-1 py-3 px-6 rounded font-semibold transition-colors text-sm sm:text-base ${
                          selected.length === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        Continue to Renewal Form
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-600 text-center py-8">
                    No modules available. Please try again.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "How early should I start my CPCS Blue Card renewal?",
                a: "Start at least six months before your expiry date. This gives you enough time to book your HS&E test, complete the NOCN CPD, gather logbook evidence, and submit the application — without any risk of a gap in your certification.",
              },
              {
                q: "What is the NOCN CPCS Renewal CPD and how long does it take?",
                a: "It is a five-module online eLearning course that replaced the old CPCS Renewal Test from August 2024. It covers health and safety, environmental awareness, and best practice across all plant categories. There is no pass or fail — you simply complete the modules. Most operators complete it in a few hours. It costs £28 through NOCN and can be done on any device.",
              },
              {
                q: "Do I need to do the CPD for every category I hold?",
                a: "No. The NOCN CPCS Renewal CPD is completed once regardless of how many categories you hold. However, you will still need to evidence practical experience separately for each category.",
              },
              {
                q: "My Blue Card expired two years ago. Is it too late to renew?",
                a: "No. Cards expired within five years can still be renewed through the standard route. Act now though — do not leave it any longer. Call 0333 344 0036 and we will walk you through what you need.",
              },
              {
                q: "My Red Card expired 18 months ago. What are my options?",
                a: "Because it expired more than 12 months ago, you will need to follow the additional 2-year card route, which involves the HS&E test, CPCS Theory Test, CPCS Practical Test, and NVQ registration. Call us and we will explain the exact sequence for your category.",
              },
              {
                q: "Can I renew my card if I have not been operating recently?",
                a: "You need to demonstrate at least 300 hours of logged operating experience per category through your CPCS logbook, or provide evidence via an on-site assessment or practical test. If you have had a gap in operating, speak to us and we will advise on the most practical route.",
              },
              {
                q: "How long does the whole renewal process take?",
                a: "It varies depending on how quickly you can book your HS&E test and arrange your practical evidence. With everything prepared, the process can be completed in a matter of weeks. Start early.",
              },
              {
                q: "What happens if I operate on site with an expired CPCS card?",
                a: "You risk being turned away from site, failing a compliance audit, and putting your employer in a difficult legal position. In the event of an incident, an expired card could have serious consequences for both you and your employer. Keep it current.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                  {faq.q}
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gray-50 py-5 sm:py-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left - Contact Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-5">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Contact Construction Customer Service
                </h2>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed text-center">
                  Whether your card is in date, about to expire, or already
                  lapsed — call us today and get clear, accurate advice with no
                  fuss.
                </p>

                <div className="bg-blue-50 rounded-xl px-5 py-6 border border-blue-100 text-center shadow-sm">
                  <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Construction Customer Service
                  </p>

                  <a
                    href="tel:03333440036"
                    className="block text-2xl sm:text-3xl font-bold text-blue-600 hover:text-blue-700 transition mb-3"
                  >
                    0333 344 0036
                  </a>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
                    Our team is ready to take your call and give you a straight
                    answer about exactly what you need to do to keep your CPCS
                    card active and your career on track.
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Klarna Image */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[220px] sm:h-[260px] lg:h-full">
              <img
                src="/images/Klarna.jpeg"
                alt="Construction worker holding a CSCS card with Klarna payment option"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CpcsCard;