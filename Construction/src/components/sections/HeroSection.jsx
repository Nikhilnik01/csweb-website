import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { Info } from "lucide-react";

const HeroSection = ({ data, id }) => {
  return (
    <section
      id={id}
      className="relative bg-cover bg-top bg-no-repeat text-white bg-[url('/img/hero-bg.png')]"
    >
      <div className="w-full mx-auto">
        <div className="pt-5 px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-[#17374f] font-bold sm:hidden">
            CSCS Card Application: Book Your CITB HS&E Test Appointment Online
          </h1>
          {/* Mobile pe h2 bhi yahan show hoga, desktop pe neeche */}
          <h2 className="text-sm text-[#29618b] font-bold mt-2 sm:hidden">
            Get CSCS Card in 5 Days CITB HS&E Test in 24 Hours Book Your Green
            CARD Course Same Day
          </h2>
        </div>

        <div className="flex items-end w-full min-h-[20px] md:grid md:grid-cols-[60%_1fr] md:min-h-[400px] md:items-stretch">
          {/* LEFT */}
          <div className="w-[58%] flex-shrink-0 pt-5 pb-5 px-4 md:w-auto md:py-10 md:margin-container">
            <h1 className="text-3xl leading-tight text-[#17374f] md:text-4xl lg:text-5xl font-bold mb-2 md:mb-6 hidden sm:block">
              CSCS Card Application: Book Your CITB HS&E Test Appointment Online
            </h1>

            {/* Desktop pe h2 yahan show hoga */}
            <h2 className="text-sm text-[#29618b] font-bold mb-2 md:text-xl md:mb-6 hidden sm:block">
              Get CSCS Card in 5 Days CITB HS&E Test in 24 Hours Book Your Green
              CARD Course Same Day
            </h2>

            <div className="flex flex-col gap-2 mb-2 w-full md:flex-row md:gap-4 md:mb-6">
              <Link to="/citb" className="w-full md:w-auto">
                <Button
                  className="
        bg-blue-600
        text-[13px]
        min-[350px]:text-[14px]
        md:text-base
        px-2.5
        min-[350px]:px-3.5
        md:px-5
        py-2.5
        md:py-3
        w-full
        flex
        items-center
        justify-center
        gap-2
        whitespace-nowrap
        hover:bg-primary
        hover:text-white
        md:w-auto
      "
                  withArrow
                >
                  Book CITB Test
                </Button>
              </Link>

              <Link to="/cscs-cards" className="w-full md:w-auto">
                <Button
                  className="
        bg-blue-600
        text-[13px]
        min-[350px]:text-[14px]
        md:text-base
        px-2.5
        min-[350px]:px-3.5
        md:px-5
        py-2.5
        md:py-3
        w-full
        flex
        items-center
        justify-center
        gap-2
        whitespace-nowrap
        hover:bg-primary
        hover:text-white
        md:w-auto
      "
                  withArrow
                >
                  Apply CSCS Card
                </Button>
              </Link>
            </div>

            <Link
              to="/which-test"
              className="flex items-center gap-1 text-[10px] mb-2 hover:underline text-[#17374f] md:text-sm md:gap-2 md:mb-4"
            >
              <Info size={10} className="md:w-4 md:h-4" />
              <span className="uppercase font-semibold">
                Which test do I need?
              </span>
            </Link>

            <div className="flex items-center gap-2 text-[#17374f] md:gap-4">
              <span className="text-[10px] md:text-sm">Secure Payment</span>
              <img
                src="/images/cards.png"
                alt="Payment methods"
                className="h-3 md:h-5 object-contain"
              />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="
            w-[42%] flex-shrink-0 self-end flex items-end justify-center
            md:w-auto md:justify-center md:items-center md:h-full
            pointer-events-none
          "
          >
            <img
              src="/img/person.png"
              alt="Construction Worker"
              className="
                w-full h-auto object-contain object-bottom
                md:w-[350px] lg:w-[420px]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
