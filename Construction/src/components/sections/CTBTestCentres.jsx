import { Link } from "react-router-dom";
import Button from "../ui/Button";

const CTBTestCentres = () => {
  return (
    <section className="">
      <div className="margin-container">
        <div className="grid md:grid-cols-[3fr_7fr] gap-4 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="relative animate-bounceCustom">
              <img
                src="/images/150.svg"
                alt="150+ Test Centres"
                className="w-[20vh] md:w-[25vh] lg:w-[40vh]"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              CITB Test Centre Locations Across the UK
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              CITB test centres are strategically located throughout the United
              Kingdom, making it easy to book your CITB Health, Safety &
              Environment Test near you. Our nationwide network of over 150
              approved CITB test centres ensures convenient access for all
              construction workers needing to obtain or renew their CSCS cards.
              Book your CITB test securely at any authorized centre across
              England, Scotland, Wales, and Northern Ireland.
            </p>
            <Link to="/test-center">
              <Button withArrow>Test Centre Locations</Button>
            </Link>
          </div>
        </div>
        {/* Additional Content */}
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Major CITB Test Centres in the UK
            </h3>

            <p className="text-gray-600 leading-8">
              Find CITB test centre locations in all major cities including:
              <strong> London CITB test centre</strong>,
              <strong> Birmingham CITB test centre</strong>,
              <strong> Manchester CITB test centre</strong>,
              <strong> Glasgow CITB test centre</strong>,
              <strong> Edinburgh CITB test centre</strong>,
              <strong> Leeds CITB test centre</strong>,
              <strong> Liverpool CITB test centre</strong>,
              <strong> Bristol CITB test centre</strong>,
              <strong> Cardiff CITB test centre</strong>,
              <strong> Belfast CITB test centre</strong>, Newcastle upon Tyne,
              Sheffield, Nottingham, Leicester, Aberdeen and Southampton.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Regional CITB Test Centre Coverage
            </h3>

            <p className="text-gray-600 leading-8">
              Our extensive network includes CITB test booking locations in
              Hull, Coventry, Sunderland, Reading, Preston, Newport, Swansea,
              Bradford, Southend-on-Sea, Derby, Plymouth, Luton, Wolverhampton,
              Blackpool, Milton Keynes, Northampton, Norwich, Dudley,
              Portsmouth, Swindon, Crawley, Ipswich, Wigan, Croydon, Walsall,
              Mansfield, Bournemouth, Peterborough, Cambridge, York, Exeter,
              Gloucester, Worcester, Basildon, Slough, Chelmsford, Colchester,
              Middlesbrough, Bolton, Stockport, Brighton, Dundee, Inverness,
              Wrexham, Telford, Blackburn, Oldham, Maidstone, Huddersfield,
              Doncaster, Wakefield, Oxford, Warrington and numerous other towns
              and cities.
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 border border-blue-100 p-6">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
              Book Your Nearest CITB Test Centre
            </h3>

            <p className="text-gray-600 leading-6">
              With over{" "}
              <strong>
                150 CITB Health, Safety &amp; Environment test centres
              </strong>
              nationwide, you can easily find a convenient location for your
              CITB operative test. All test centres are CITB-approved and
              equipped to deliver the official Touch Screen Test required for
              your CSCS card application or renewal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTBTestCentres;
