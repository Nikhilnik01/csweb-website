import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CscsBottomBanner = () => {
  return (
    <section className="py-3">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-[#EFF6FF] rounded-2xl border border-slate-100 shadow-sm">
          <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-3 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 sm:gap-6 lg:gap-12 items-center">
              {/* LEFT IMAGE */}
              <div className="flex justify-center">
                <img
                  src="/images/banner.webp"
                  alt="Green CSCS Card"
                  className="w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[480px] h-auto object-contain"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="max-w-2xl text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold leading-tight text-slate-900">
                  Get Your Green CSCS Card Today
                </h2>

                <p className="mt-2 text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Complete your application online and receive expert support
                  throughout the process. Fast, simple and trusted by thousands
                  of workers across the UK.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mt-4">
                  <Link
                    to="/cscs-card-form/1"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base lg:text-lx px-5 py-2 sm:py-3 lg:py-3 rounded-xl transition-colors duration-300"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CscsBottomBanner;
