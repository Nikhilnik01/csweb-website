import Button from "../ui/Button";
import { Link } from "react-router-dom";

const BookCITBTest = ({ id, data }) => {
  return (
    <section className="section-padding pb-0">
      <div className="margin-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* LEFT: Image + CTA */}
          <div className="flex flex-col h-full">
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
              <img
                src="/img/CITBTest.png"
                alt="CSCS Cards display"
                className="w-full object-cover"
              />
            </div>

            <div className="mt-7">
              <Link to="/cscs-cards">
                <Button withArrow className="w-full">
                  See All CSCS Cards
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What is the CITB HS&E Test?
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              The CITB Health, Safety & Environment Test is applicable to a very
              wide range of trades and ensures operatives have the minimum
              knowledge of health, safety, and environment awareness before
              starting work on construction sites. Follow these simple steps to
              book your CITB HS&E Test.
            </p>

            <div className="space-y-5 mb-3 lg:pb-14">
              {[
                "Fill in the booking form and choose your date and test centre from over 150 approved locations across the UK",
                {
                  text: "Complete your CITB test booking and pay online with any major debit or credit card, or contact us on ",
                  phone: "0333 344 0036",
                  isPhone: true,
                },
                "Once booked and paid, receive your test joining instructions via email with date, time, center address, and directions",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {item.isPhone ? (
                      <>
                        {item.text}
                        <a
                          href="tel:03333440036"
                          className="text-blue-600 hover:text-blue-800 font-semibold underline"
                        >
                          {item.phone}
                        </a>
                      </>
                    ) : (
                      item
                    )}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/book-citb-test">
              <Button withArrow className="w-full">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCITBTest;
