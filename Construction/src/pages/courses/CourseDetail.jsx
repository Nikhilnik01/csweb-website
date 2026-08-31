// src/pages/courses/CourseDetail.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNavigationData } from "../../context/NavigationDataContext";
import SeoHead from "../../components/common/SeoHead";
import {
  mergeApiCourseWithStatic,
  extractCourseFromResponse,
} from "../../utils/coursesApi";

const Bullet = () => (
  <span className="text-gray-700 flex-shrink-0 font-bold">•</span>
);
const DotBullet = () => (
  <span className="text-gray-700 flex-shrink-0 font-bold">•</span>
);

const PhoneIcon = () => (
  <svg
    className="w-4 h-4 flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

/* ─── Small reusable layout pieces ─── */

const SectionCard = ({ children }) => <div className="">{children}</div>;

const SectionHeading = ({ children }) => (
  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
    {children}
  </h2>
);

const BookingButtons = ({ handleBookNow, label = "BOOK NOW" }) => (
  <div className="flex flex-col sm:flex-row gap-2 mt-3">
    <button
      onClick={handleBookNow}
      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
    >
      {label}
    </button>
    <a
      href="tel:03333440036"
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
    >
      <PhoneIcon />
      0333 344 0036
    </a>
  </div>
);

const CourseDetail = () => {
  const { id } = useParams();

 const COURSE_API_IDS = {
  "cscs-green-card": 1,
  sssts: 2,
  "sssts-refresher": 3,
  smsts: 4,
  "smsts-refresher": 5,
  "traffic-banksman": 6,
};

const apiId = COURSE_API_IDS[id] || id;

  const navigate = useNavigate();

  // Reuse the single GetCourses fetch already done by NavigationDataProvider
  // (Header/Footer/CoursesPage all share it) instead of firing our own
  // separate getCourseById request — that was causing GetCourses to show up
  // twice in the Network tab on this page.
  const { coursesResponse, loading: navLoading } = useNavigationData();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (navLoading) return;

    if (coursesResponse?.status === "fulfilled") {
      const apiCourse = extractCourseFromResponse(coursesResponse.value, apiId);
      setCourse(apiCourse ? mergeApiCourseWithStatic(apiCourse) : null);
    } else {
      if (coursesResponse?.status === "rejected") {
        console.error("Error loading course:", coursesResponse.reason);
      }
      setCourse(null);
    }
  }, [navLoading, coursesResponse, apiId]);

  const loading = navLoading;

  const handleBookNow = () => {
    navigate("/course-booking", { state: { selectedCourse: course } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-500 text-sm font-medium">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Course Not Found
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            The requested course could not be found.
          </p>
          <button
            onClick={() => navigate("/course-list")}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoHead
        title={`${course.title} Training Course | Construction Customer Service`}
        description={`Book your ${course.title} training. View course details, availability, duration, and prices. Online and classroom options available.`}
        keywords={`${course.title}, construction course, course booking, CITB course, SMSTS, SSSTS`}
      />
      {/* ── Header ── */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <button
            onClick={() => navigate("/course-list")}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-3 font-medium text-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Courses
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            {course.title}
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.isOnline && (
              <span className="inline-block px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Online Available
              </span>
            )}
            {course.isClassroom && (
              <span className="inline-block px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Classroom Available
              </span>
            )}
            {course.validity && (
              <span className="inline-block px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                Valid {course.validity}
              </span>
            )}
          </div>

          {/* Header CTAs */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleBookNow}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
            >
              Book Now
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <a
              href="tel:03333440036"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
            >
              <PhoneIcon />
              0333 344 0036
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Mobile-only top course image */}
        {course.image && (
          <div className="lg:hidden mb-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-auto block"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.parentElement.style.display = "none";
                }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ══ LEFT COLUMN ══ */}
          <div className="lg:col-span-2 space-y-4">
            {/* Course Overview */}
            <SectionCard>
              <p
                className="text-gray-700 leading-relaxed text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </SectionCard>

            {/* ── Why Choose Us ── */}
            {course.whyChoose?.length > 0 && (
              <SectionCard>
                <SectionHeading>
                  Why Choose Construction Customer Service?
                </SectionHeading>
                <ul className="space-y-2">
                  {course.whyChoose.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* ── How It Works ── */}
            {course.howItWorks?.length > 0 && (
              <SectionCard>
                <SectionHeading>How It Works</SectionHeading>
                <div className="space-y-3">
                  {course.howItWorks.map((step) => (
                    <div key={step.step} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base mt-1">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* ── What Is It ── */}
            {course.whatIsIt && (
              <SectionCard>
                <SectionHeading>{course.whatIsIt.heading}</SectionHeading>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {course.whatIsIt.body}
                </p>
              </SectionCard>
            )}

            {/* ── Accreditation ── */}
            {course.accreditation && (
              <SectionCard>
                <SectionHeading>{course.accreditation.heading}</SectionHeading>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {course.accreditation.body}
                </p>
              </SectionCard>
            )}

            {/* ── Live Online Training ── */}
            {course.liveOnline && (
              <SectionCard>
                <SectionHeading>{course.liveOnline.heading}</SectionHeading>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {course.liveOnline.body}
                </p>
              </SectionCard>
            )}

            {/* Delivery Options */}
            {course.whatIsIt?.deliveryOptions?.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-3">
                  Flexible Training Options
                </h3>
                <ul className="space-y-1.5">
                  {course.whatIsIt.deliveryOptions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                {course.whatIsIt?.deliveryNote && (
                  <p className="text-gray-600 text-sm mt-3 italic">
                    {course.whatIsIt.deliveryNote}
                  </p>
                )}
              </div>
            )}

            {course.whyTakeCourse1 && (
              <SectionCard>
                <SectionHeading>{course.whyTakeCourse1.heading}</SectionHeading>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 whitespace-pre-line">
                  {course.whyTakeCourse1.body}
                </p>
                {course.whyTakeCourse1.afterCompletion?.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800 text-sm sm:text-base">
                    {course.whyTakeCourse1.afterCompletion.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      ),
                    )}
                  </ul>
                )}
              </SectionCard>
            )}

            {/* ── Who Needs It ── */}
            {course.whoNeedsIt && (
              <SectionCard>
                <SectionHeading>{course.whoNeedsIt.heading}</SectionHeading>
                {course.whoNeedsIt.intro && (
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    {course.whoNeedsIt.intro}
                  </p>
                )}
                {course.whoNeedsIt.points?.length > 0 && (
                  <ul className="space-y-1.5 mb-3">
                    {course.whoNeedsIt.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <DotBullet />
                        <span className="text-gray-700 text-sm sm:text-base">
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {course.whoNeedsIt.essential?.length > 0 && (
                  <>
                    <p className="text-sm font-semibold text-gray-800 mb-1.5">
                      Essential for:
                    </p>
                    <ul className="space-y-1.5 mb-3">
                      {course.whoNeedsIt.essential.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <DotBullet />
                          <span className="text-gray-700 text-sm sm:text-base">
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {course.whoNeedsIt.valuable?.length > 0 && (
                  <>
                    <p className="text-sm font-semibold text-gray-800 mb-1.5">
                      Also valuable for:
                    </p>
                    <ul className="space-y-1.5 mb-3">
                      {course.whoNeedsIt.valuable.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <DotBullet />
                          <span className="text-gray-700 text-sm sm:text-base">
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {course.whoNeedsIt.note && (
                  <p className="text-gray-600 text-sm italic">
                    {course.whoNeedsIt.note}
                  </p>
                )}
                {course.whoNeedsIt.warning && (
                  <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 rounded p-3 text-sm text-yellow-800 font-medium">
                    {course.whoNeedsIt.warning}
                  </div>
                )}
              </SectionCard>
            )}

            {/* ── Who Should Attend ── */}
            {course.whoShouldAttend?.length > 0 && (
              <SectionCard>
                <SectionHeading>Who Should Take This Course?</SectionHeading>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  Ideal for:
                </p>
                <ul className="space-y-1.5 mb-3">
                  {course.whoShouldAttend.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <DotBullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                {course.whoNote && (
                  <p className="text-gray-600 text-sm italic">
                    {course.whoNote}
                  </p>
                )}
              </SectionCard>
            )}

            {/* ── What's Covered ── */}
            {course.whatsCovered && (
              <SectionCard>
                <SectionHeading>{course.whatsCovered.heading}</SectionHeading>
                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  {course.whatsCovered.intro}
                </p>
                <ul className="space-y-1.5 mb-3">
                  {course.whatsCovered.topics.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
                {course.whatsCovered.assessmentNote && (
                  <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
                    {course.whatsCovered.assessmentNote}
                  </div>
                )}
              </SectionCard>
            )}

            {/* ── What's Covered Sections ── */}
            {course.whatsCoveredSections?.length > 0 && (
              <SectionCard>
                <SectionHeading>What's Covered</SectionHeading>
                <div className="space-y-4">
                  {course.whatsCoveredSections.map((sec, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1.5">
                        {sec.heading}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* ── What You'll Learn Days ── */}
            {course.whatYouLearnDays?.length > 0 && (
              <SectionCard>
                <SectionHeading>What You'll Learn</SectionHeading>
                <div className="space-y-4">
                  {course.whatYouLearnDays.map((dayBlock, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                        {dayBlock.day}
                      </h3>
                      <ul className="space-y-1.5">
                        {dayBlock.topics.map((topic, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <Bullet />
                            <span className="text-gray-700 text-sm sm:text-base">
                              {topic}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {course.assessmentNote && (
                  <div className="mt-3 bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
                    {course.assessmentNote}
                  </div>
                )}
              </SectionCard>
            )}

            {/* ── Why Choose Us (3) ── */}
            {course.whyChoose3?.length > 0 && (
              <SectionCard>
                <SectionHeading>
                  Why Choose Construction Customer Service?
                </SectionHeading>
                <ul className="space-y-2">
                  {course.whyChoose3.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* ── What You'll Learn Sections ── */}
            {course.whatYouLearnSections?.length > 0 && (
              <SectionCard>
                <SectionHeading>What You'll Learn</SectionHeading>
                {course.id === "smsts" && (
                  <p className="text-gray-600 text-sm sm:text-base mb-3">
                    This comprehensive 5-day course covers everything site
                    managers need to know:
                  </p>
                )}
                <div className="space-y-4">
                  {course.whatYouLearnSections.map((sec, i) => (
                    <div key={i}>
                      {sec.heading && (
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1.5">
                          {sec.heading}
                        </h3>
                      )}
                      {sec.body ? (
                        <p className="text-gray-700 text-sm sm:text-base">
                          {sec.body}
                        </p>
                      ) : (
                        <ul className="space-y-1.5">
                          {sec.topics?.map((topic, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <Bullet />
                              <span className="text-gray-700 text-sm sm:text-base">
                                {topic}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                {course.afterCompletion?.length > 0 && (
                  <>
                    <p className="text-sm font-semibold text-gray-800 mt-4 mb-2">
                      After completion, you'll:
                    </p>
                    <ul className="space-y-1.5">
                      {course.afterCompletion.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Bullet />
                          <span className="text-gray-700 text-sm sm:text-base">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <BookingButtons
                  handleBookNow={handleBookNow}
                  label="BOOK YOUR COURSE"
                />
              </SectionCard>
            )}

            {/* ── What You'll Learn ── */}
            {course.whatYouLearn?.length > 0 &&
              !course.whatYouLearnDays &&
              !course.whatYouLearnSections && (
                <SectionCard>
                  <SectionHeading>What You'll Learn</SectionHeading>
                  <ul className="space-y-2 mb-2">
                    {course.whatYouLearn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Bullet />
                        <span className="text-gray-700 text-sm sm:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {course.qualification && (
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                      <span className="font-semibold">
                        Official qualification:
                      </span>{" "}
                      {course.qualification} — the exact certification CSCS
                      requires.
                    </div>
                  )}
                </SectionCard>
              )}

            {/* ── Perfect For ── */}
            {course.perfectFor?.length > 0 && (
              <div className="">
                {course.perfectFor.map((item, index) => (
                  <div key={index}>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 pt-2">
                      {item.category === "New Construction Workers"
                        ? "Perfect For New Construction Workers"
                        : "Ideal For Construction Companies"}
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    {item.highlights?.length > 0 && (
                      <div className="mb-3">
                        {item.category === "New Construction Workers" && (
                          <p className="text-sm font-semibold text-gray-800 mb-2">
                            No experience needed. No qualifications required.
                            Just:
                          </p>
                        )}
                        <ul className="space-y-1.5">
                          {item.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Bullet />
                              <span className="text-gray-700 text-sm sm:text-base">
                                {h}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {item.benefit && (
                      <p className="text-gray-700 text-sm sm:text-base">
                        {item.benefit}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── What's Included ── */}
            {course.whatsIncluded?.length > 0 && (
              <SectionCard>
                <SectionHeading>What's Included</SectionHeading>
                <ul className="space-y-2">
                  {course.whatsIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* ── Assessment ── */}
            {course.assessment && (
              <SectionCard>
                <SectionHeading>
                  {course.assessment.title || "Course Assessment"}
                </SectionHeading>
                {course.assessment.intro && (
                  <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed">
                    {course.assessment.intro}
                  </p>
                )}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 mb-3 shadow-sm">
                  <p className="text-blue-900 font-semibold text-sm sm:text-base mb-2">
                    First-Time Pass Rate: {course.assessment.passRate}
                  </p>
                  <ul className="space-y-1.5">
                    {course.assessment.format.map((line, i) => (
                      <li
                        key={i}
                        className="text-blue-800 text-sm sm:text-base flex items-start gap-2"
                      >
                        <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {course.assessment.mockNote && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-600 text-sm italic leading-relaxed">
                      {course.assessment.mockNote}
                    </p>
                  </div>
                )}
              </SectionCard>
            )}

            {/* ── Certificate ── */}
            {course.certificate && (
              <SectionCard>
                <SectionHeading>
                  {course.certificate.title || "Your SMSTS Certificate"}
                </SectionHeading>
                {course.certificate.intro && (
                  <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed">
                    {course.certificate.intro}
                  </p>
                )}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 shadow-sm space-y-1.5 mb-3">
                  <p className="text-sm sm:text-base text-gray-800">
                    <span className="font-semibold">Certificate validity:</span>{" "}
                    {course.certificate.validity}
                  </p>
                  <p className="text-sm sm:text-base text-gray-800">
                    <span className="font-semibold">Renewal:</span>{" "}
                    {course.certificate.renewal}
                  </p>
                </div>
                {course.certificate.note && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {course.certificate.note}
                    </p>
                  </div>
                )}
              </SectionCard>
            )}

            {/* ── Renewed Certificate ── */}
            {course.renewedCertificate && (
              <SectionCard>
                <SectionHeading>
                  {course.renewedCertificate.heading}
                </SectionHeading>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {course.renewedCertificate.body}
                </p>
              </SectionCard>
            )}

            {/* ── Why Choose Us (5) ── */}
            {course.whyChoose5?.length > 0 && (
              <SectionCard>
                <SectionHeading>
                  Why Choose Construction Customer Service?
                </SectionHeading>
                <ul className="space-y-2">
                  {course.whyChoose5.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* ── Online Benefits ── */}
            {course.onlineBenefits && (
              <SectionCard>
                <SectionHeading>{course.onlineBenefits.heading}</SectionHeading>
                <p className="text-gray-700 text-sm sm:text-base mb-2">
                  {course.onlineBenefits.intro}
                </p>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  Benefits of online learning:
                </p>
                <ul className="space-y-1.5 mb-3">
                  {course.onlineBenefits.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
                {course.onlineBenefits.requirement && (
                  <p className="text-gray-600 text-sm italic">
                    {course.onlineBenefits.requirement}
                  </p>
                )}
              </SectionCard>
            )}

            {/* ── Flexible Learning Options ── */}
            {course.flexibleLearning?.length > 0 && (
              <SectionCard>
                <SectionHeading>Flexible Learning Options</SectionHeading>
                <div className="space-y-4">
                  {course.flexibleLearning.map((opt, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1.5">
                        {opt.mode}
                      </h3>
                      {opt.desc && (
                        <p className="text-gray-600 text-sm sm:text-base mb-2">
                          {opt.desc}
                        </p>
                      )}
                      {opt.points?.length > 0 && (
                        <ul className="space-y-1.5">
                          {opt.points.map((pt, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm sm:text-base text-gray-700"
                            >
                              <Bullet />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      )}
                      {opt.note && (
                        <p className="text-gray-500 text-sm mt-1.5 italic">
                          {opt.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* ── Certification ── */}
            {course.certification && (
              <SectionCard>
                <SectionHeading>{course.certification.heading}</SectionHeading>
                <p className="text-gray-700 text-sm sm:text-base mb-2">
                  {course.certification.body}
                </p>
                {course.certification.includes && (
                  <ul className="list-disc list-inside mb-2 text-sm sm:text-base text-gray-700">
                    {course.certification.includes.map((item, idx) => (
                      <li key={idx} className="mb-1">
                        <span className="font-semibold">{item.title}</span>
                        {item.description && ` – ${item.description}`}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-sm sm:text-base text-gray-700">
                  <span className="font-semibold">Validity:</span>{" "}
                  {course.certification.validity}
                </p>
                {course.certification.note && (
                  <p className="text-gray-600 text-sm mt-2">
                    {course.certification.note}
                  </p>
                )}
              </SectionCard>
            )}

            {/* ── Delivery Modes ── */}
            {course.deliveryModes?.length > 0 && (
              <SectionCard>
                <SectionHeading>Online Or Classroom Options</SectionHeading>
                <div className="space-y-3 mb-3">
                  {course.deliveryModes.map((d, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1.5">
                        {d.mode}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {d.desc}
                      </p>
                    </div>
                  ))}
                </div>
                {course.deliveryNote && (
                  <p className="text-gray-500 text-sm italic">
                    {course.deliveryNote}
                  </p>
                )}
              </SectionCard>
            )}

            {/* ── Career Benefits ── */}
            {course.careerBenefits?.length > 0 && (
              <SectionCard>
                <SectionHeading>Benefits Of Taking SMSTS</SectionHeading>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  The SMSTS course is one of the most respected qualifications
                  in construction. Many employers require it for site management
                  roles.
                </p>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  Career benefits:
                </p>
                <ul className="space-y-1.5 mb-3">
                  {course.careerBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 text-sm sm:text-base">
                  Whether you're aiming for your first management position or
                  need to update your qualifications, this course gives you the
                  credentials and confidence to succeed.
                </p>
              </SectionCard>
            )}

            {/* ── Safety Stats ── */}
            {course.safetyStats && (
              <SectionCard>
                <SectionHeading>{course.safetyStats.heading}</SectionHeading>
                <p className="text-gray-700 text-sm sm:text-base mb-3">
                  {course.safetyStats.body}
                </p>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  Common causes:
                </p>
                <ul className="space-y-1.5 mb-3">
                  {course.safetyStats.causes.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <DotBullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 text-sm sm:text-base italic">
                  {course.safetyStats.closing}
                </p>
              </SectionCard>
            )}

            {/* ── Features ── */}
            {course.features && (
              <SectionCard>
                <SectionHeading>{course.features.heading}</SectionHeading>
                {course.features.points?.length > 0 && (
                  <ul className="space-y-1.5">
                    {course.features.points.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm sm:text-base text-gray-700"
                      >
                        <Bullet />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </SectionCard>
            )}

            {/* ── Mock Exam ── */}
            {course.mockExam && (
              <SectionCard>
                <SectionHeading>{course.mockExam.heading}</SectionHeading>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {course.mockExam.body}
                </p>
              </SectionCard>
            )}

            {/* ── Why Choose Us (4) ── */}
            {course.whyChoose4?.length > 0 && (
              <SectionCard>
                <SectionHeading>
                  Why Choose Construction Customer Service?
                </SectionHeading>
                <ul className="space-y-2">
                  {course.whyChoose4.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* ── CITB Grant ── */}
            {course.citbGrant && (
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-bold text-green-800 text-sm sm:text-base mb-1">
                  CITB Grant Eligible
                </h3>
                <p className="text-green-700 text-sm sm:text-base">
                  {course.citbGrant}
                </p>
              </div>
            )}

            {/* ── Next Steps ── */}
            {course.nextSteps?.length > 0 && (
              <SectionCard>
                <SectionHeading>Book Your Green Card Course</SectionHeading>
                <p className="text-gray-600 text-sm sm:text-base mb-3">
                  Get qualified today and start working on construction sites
                  across the UK.
                </p>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  Next steps:
                </p>
                <ol className="space-y-2 mb-4">
                  {course.nextSteps.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
                <BookingButtons handleBookNow={handleBookNow} />
                <p className="text-sm text-gray-600 font-medium mt-3">
                  Get certified today. Start working tomorrow.
                </p>
              </SectionCard>
            )}

            {/* ── Booking Info ── */}
            {course.bookingInfo && !course.nextSteps && (
              <SectionCard>
                <SectionHeading>{course.bookingInfo.heading}</SectionHeading>
                {course.bookingInfo.intro && (
                  <p className="text-gray-600 text-sm sm:text-base mb-3">
                    {course.bookingInfo.intro}
                  </p>
                )}
                <ul className="space-y-1.5 mb-3">
                  {course.bookingInfo.options.map((opt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {opt}
                      </span>
                    </li>
                  ))}
                </ul>
                {course.bookingInfo.note && (
                  <p className="text-gray-500 text-sm italic mb-3">
                    {course.bookingInfo.note}
                  </p>
                )}
                <BookingButtons handleBookNow={handleBookNow} />
              </SectionCard>
            )}

            {/* ── FAQs ── */}
            {course.faqs?.length > 0 && (
              <SectionCard>
                <SectionHeading>Frequently Asked Questions</SectionHeading>
                <div className="space-y-3">
                  {course.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                    >
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                        {faq.q}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {course.whyTakeCourse && (
              <SectionCard>
                <SectionHeading>{course.whyTakeCourse.heading}</SectionHeading>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                  {course.whyTakeCourse.body}
                </p>
                {course.whyTakeCourse.afterCompletion?.length > 0 && (
                  <p className="text-gray-800 text-sm sm:text-base">
                    {course.whyTakeCourse.afterCompletion.join(" ")}
                  </p>
                )}
              </SectionCard>
            )}

            {/* ── About Company ── */}
            {course.aboutCompany && (
              <SectionCard>
                <SectionHeading>{course.aboutCompany.heading}</SectionHeading>
                <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed">
                  {course.aboutCompany.intro}
                </p>
                <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed">
                  {course.aboutCompany.description}
                </p>
                {course.aboutCompany.highlights?.length > 0 && (
                  <ul className="space-y-1.5">
                    {course.aboutCompany.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Bullet />
                        <span className="text-gray-700 text-sm sm:text-base">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </SectionCard>
            )}

            {/* ── Our Full Course Range ── */}
            {course.ourCourses?.length > 0 && (
              <SectionCard>
                <SectionHeading>Our Full Course Range</SectionHeading>
                <ul className="space-y-1.5">
                  {course.ourCourses.map((course_item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {course_item}
                      </span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            {/* ── Final CTA ── */}
            {course.finalCTA && (
              <SectionCard>
                <SectionHeading>{course.finalCTA.heading}</SectionHeading>
                <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed">
                  {course.finalCTA.body}
                </p>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  How to get started:
                </p>
                <ul className="space-y-1.5 mb-4">
                  {course.finalCTA.options.map((opt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Bullet />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {opt}
                      </span>
                    </li>
                  ))}
                </ul>
                <BookingButtons handleBookNow={handleBookNow} />
                <p className="text-sm text-gray-600 font-medium text-center mt-3 italic">
                  {course.finalCTA.tagline}
                </p>
              </SectionCard>
            )}
          </div>

          {/* ══ SIDEBAR ══ */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-4 space-y-4">
              {/* Course Image - desktop only */}
              {course.image && (
                <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-auto block"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.parentElement.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Course Details Card */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  Course Details
                </h3>

                {course.courseDetails ? (
                  <div className="space-y-1.5 mb-3 text-sm sm:text-base">
                    {Object.entries(course.courseDetails).map(([key, val]) => (
                      <div key={key} className="flex justify-between gap-2">
                        <span className="text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}:
                        </span>
                        <span className="text-gray-800 font-medium text-right">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1.5 mb-3 text-sm sm:text-base">
                    {course.duration && (
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Duration:</span>
                        <span className="text-blue-600 font-semibold">
                          {course.duration}
                        </span>
                      </div>
                    )}
                    {course.isOnline && (
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Format:</span>
                        <span className="text-gray-800 font-medium">
                          Online / Classroom
                        </span>
                      </div>
                    )}
                    {course.validity && (
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-500">Validity:</span>
                        <span className="text-gray-800 font-medium">
                          {course.validity}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handleBookNow}
                  className="w-full bg-blue-600 text-white py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-2 text-sm"
                >
                  Book Now →
                </button>

                <a
                  href="tel:03333440036"
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-900 py-2.5 px-6 rounded-lg hover:bg-gray-200 transition-colors font-semibold mb-3 text-sm"
                >
                  <PhoneIcon />
                  0333 344 0036
                </a>

                <div className="text-center text-xs sm:text-sm text-gray-600 space-y-1.5 pt-3 border-t">
                  {[
                    "CITB Approved",
                    "Same-Day Certification",
                    "Free Resit Included",
                  ].map((label) => (
                    <p
                      key={label}
                      className="flex items-center justify-center gap-2"
                    >
                      <Bullet />
                      {label}
                    </p>
                  ))}
                </div>
              </div>

              {/* Company Training CTA */}
              <div className="bg-blue-600 rounded-lg p-4 text-white">
                <h3 className="font-bold text-base sm:text-lg mb-1.5">
                  Company Training?
                </h3>
                <p className="text-blue-100 text-sm mb-3">
                  Training multiple staff? We offer bulk booking rates and
                  dedicated sessions for your team.
                </p>
                <a
                  href="tel:03333440036"
                  className="flex items-center justify-center gap-2 w-full text-center bg-white text-blue-600 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
                >
                  <PhoneIcon />
                  Call for Group Booking
                </a>
              </div>

              {/* Klarna Image */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src="/images/Klarna.jpeg"
                  alt="Construction worker holding a CSCS card with Klarna payment option"
                  className="w-full h-auto block"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;