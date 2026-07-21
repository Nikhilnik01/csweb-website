import { Link } from "react-router-dom";
import Button from "../ui/Button";

const GreenCardApplication = ({ data }) => {
  return (
    <section className="section-padding bg-white">
      <div className="margin-container space-y-10 lg:space-y-12">
        {/* ================= TOP: CITB + KLARNA ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                How Many Questions to Attempt in CITB Test?
              </h2>

              <p className="text-gray-600 mb-5 leading-relaxed max-w-3xl">
                The CITB Health, Safety & Environment Test has a 45-minute
                duration with 50 multiple-choice questions across two main
                sections.
              </p>

              <div className="space-y-3">
                {[
                  {
                    number: "1",
                    title: "General Knowledge Section",
                    text: "38 marks covering Health, Safety & Environment questions on construction site awareness",
                  },
                  {
                    number: "2",
                    title: "Case Studies Section",
                    text: "12 marks describing how to behave safely on site with practical scenarios",
                  },
                  {
                    number: "3",
                    title: "Pass Score Required",
                    text: "45 marks out of 50 to successfully pass the CITB HS&E Test",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3   p-2 sm:p-2"
                  >
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-sm shrink-0">
                      {item.number}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-6">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Klarna Image */}
<div className="lg:col-span-5">
  <div className="w-full min-h-[240px] sm:min-h-[300px] lg:h-full rounded-3xl overflow-hidden  bg-white shadow-sm p-2 sm:p-3 flex items-center justify-center">
    <img
      src="/images/Klarna.jpeg"
      alt="Construction worker holding a CSCS card with Klarna payment option"
      className="w-full h-full object-contain rounded-2xl"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  </div>
</div>
        </div>

        {/* ================= BOTTOM: GREEN CARD APPLICATION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* LEFT: Image */}
          {/* KEY FIX: aspect-ratio on mobile so image has natural space, h-full on lg */}
          <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/licence.webp"
              alt="Green Card Example"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* RIGHT: Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              How to Apply for Green CSCS Card
            </h2>

            <p className="text-gray-600 mb-5 leading-relaxed">
              Follow these simple steps to obtain your Green Labourers Card,
              which is valid for 5 years and ideal for workers without NVQ/SVQ
              qualifications.
            </p>

            <div className="space-y-4 mb-5">
              {[
                "Pass the CITB Health, Safety & Environment Operatives Test to demonstrate your construction site safety knowledge",
                "Complete either a One Day Health & Safety Awareness Course or Level 1 Award Course in Health & Safety",
                "Apply for your Green Labourers Card - valid for 5 years and ideal for workers without NVQ/SVQ qualifications",
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mb-5">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Please note:</strong> The Labourer card is valid for two
                years on first application. Workers who continue in labouring
                roles can renew for five years by providing evidence they are
                employed in a labouring role.
              </p>
            </div>

            <Link to="/cscs-card-form/1" className="mt-auto">
              <Button withArrow className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenCardApplication;
