import { Link } from "react-router-dom";
import { NVQ_LEVELS } from "../../data/training.data";

const TrainingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-5 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Construction NVQ Qualifications – Get Qualified On-Site
          </h1>
          <p className="mb-3 text-gray-700 leading-relaxed">
            Complete your NVQ on-site while you work. No classroom time, no
            written exams, just evidence-based assessment that proves your
            competence.
          </p>
          {/* <p className="mb-5 text-gray-700 leading-relaxed">
            Choose the level that matches your role, then open the full detail
            page to see the complete qualification breakdown, assessment
            process, CSCS card route, and next steps.
          </p> */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/nvq-course-form"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Book Now
            </Link>
            <a
              href="tel:03333440036"
              className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
            >
              Call 0333 344 0036
            </a>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {NVQ_LEVELS.map((course) => (
            <article
              key={course.id}
              /* flex-col ensures the card container can distribute vertical space */
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="bg-gradient-to-br from-blue-50 to-white p-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-52 w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* flex-1 expands this section; flex-col allows us to use mt-auto on the button */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2">
                  {course.badge && (
                    <span className="whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {course.badge}
                    </span>
                  )}

                  {course.cscsCardAwarded && (
                    <span className="max-w-[180px] truncate rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {course.cscsCardAwarded}
                    </span>
                  )}
                </div>

                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  {course.title}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  {course.shortDescription}
                </p>

                <div className="mb-6 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between gap-4">
                    <span>Duration</span>
                    <span className="text-right font-medium text-gray-900">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Assessment</span>
                    <span className="text-right font-medium text-gray-900">
                      {course.assessment}
                    </span>
                  </div>
                </div>

                {/* mt-auto pushes the button to the bottom regardless of text length */}
                <Link
                  to={`/training/${course.id}`}
                  className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  View Full Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
