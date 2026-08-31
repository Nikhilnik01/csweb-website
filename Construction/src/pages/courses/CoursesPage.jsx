// src/pages/courses/CoursesPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KlarnaBanner from "../../components/sections/KlarnaBanner";
import SeoHead from "../../components/common/SeoHead";
import { staticCourses } from "../../components/course-list/courseData";
import { getAllCourses } from "../../services/api";
import { useNavigationData } from "../../context/NavigationDataContext";

const courseNameToSlug = (name = "") => {
  const normalized = name.toLowerCase();
  if (normalized.includes("green")) return "cscs-green-card";
  if (normalized.includes("sssts") && normalized.includes("refresher"))
    return "sssts-refresher";
  if (normalized.includes("sssts")) return "sssts";
  if (normalized.includes("smsts") && normalized.includes("refresher"))
    return "smsts-refresher";
  if (normalized.includes("smsts")) return "smsts";
  if (normalized.includes("traffic") || normalized.includes("banksman"))
    return "traffic-banksman";
  return null;
};

const mergeApiCoursesWithStatic = (response) => {
  const apiCourses = response?.res?.courseLists;
  if (!Array.isArray(apiCourses) || apiCourses.length === 0) {
    return staticCourses;
  }

  return apiCourses.map((apiCourse) => {
    const slug = courseNameToSlug(apiCourse.courseName);
    const staticCourse =
      staticCourses.find((course) => course.id === slug) || {};

    return {
      ...staticCourse,
      id: staticCourse.id || slug || String(apiCourse.id),
      apiId: apiCourse.id,
      title: staticCourse.title || apiCourse.courseName,
      duration: apiCourse.durations || staticCourse.duration,
      image: apiCourse.courseImage || staticCourse.image,
      shortDescription:
        apiCourse.shortDescription || staticCourse.shortDescription,
      description: apiCourse.longDescription || staticCourse.description,
      isOnline:
        typeof apiCourse.isOnlineAvailable === "boolean"
          ? apiCourse.isOnlineAvailable
          : staticCourse.isOnline,
      isClassroom:
        typeof apiCourse.isClassroomAvailable === "boolean"
          ? apiCourse.isClassroomAvailable
          : staticCourse.isClassroom,
      validity: apiCourse.validity || staticCourse.validity,
      courseDetails: {
        ...(staticCourse.courseDetails || {}),
        ...(apiCourse.durations ? { duration: apiCourse.durations } : {}),
        ...(apiCourse.times ? { times: apiCourse.times } : {}),
        ...(apiCourse.delivery ? { delivery: apiCourse.delivery } : {}),
        ...(apiCourse.certificate ? { certificate: apiCourse.certificate } : {}),
        ...(apiCourse.validity ? { validity: apiCourse.validity } : {}),
      },
    };
  });
};

const OnlineBadge = () => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
    Online
  </span>
);

const ClassroomBadge = () => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
    Classroom
  </span>
);

const ArrowRight = () => (
  <svg
    className="w-4 h-4 ml-1"
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
);

const CourseCard = ({ course, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:border-blue-300 flex flex-col"
    >
      {/* Course Image */}
      <div className="w-full overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.style.display = "none";
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug">
          {course.title}
        </h3>

        {/* Duration */}
        <p className="text-sm text-gray-500 mb-3">
          <span className="font-medium text-gray-700">Duration:</span>{" "}
          <span className="text-blue-600 font-medium">{course.duration}</span>
          {(course.isOnline || course.isClassroom) && (
            <span className="text-gray-500">
              {" "}
              (
              {course.isOnline && course.isClassroom
                ? "Online or Classroom"
                : course.isOnline
                  ? "Online"
                  : "Classroom"}
              )
            </span>
          )}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.isOnline && <OnlineBadge />}
          {course.isClassroom && <ClassroomBadge />}
        </div>
        {/* Apply Now CTA */}
        <div className="mt-auto">
          <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors group">
            Apply Now
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const navigate = useNavigate();
  // Reuse the single fetch already done by NavigationDataProvider
  // (Header/Footer/this page all share the same request now — no more
  // duplicate GetCourses calls).
  const { coursesResponse, loading: navLoading } = useNavigationData();
  const [courses, setCourses] = useState(staticCourses);

  const handleCardClick = (courseId) => {
    navigate(`/course-list/${courseId}`);
  };

  useEffect(() => {
    if (navLoading) return;

    if (coursesResponse?.status === "fulfilled") {
      setCourses(mergeApiCoursesWithStatic(coursesResponse.value));
    } else {
      if (coursesResponse?.status === "rejected") {
        console.error("Error loading courses:", coursesResponse.reason);
      }
      setCourses(staticCourses);
    }
  }, [navLoading, coursesResponse]);

  const loading = navLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoHead
        title="Construction Customer Service | Courses"
        description="Construction Customer Service company provide Like- CSCS Health & Safety Environment Test, CITB Health & Safety Environment Test"
        keywords="construction courses, SSSTS, SMSTS, safety training, CSCS green card course"
      />
      {/* ── Page Header (2-Line Content) ── */}
      <div className="relative overflow-hidden shadow-md bg-[#f5f7ff] md:bg-[url('/images/page-header-bg-shape.png')] md:bg-cover md:bg-center">
        {/* Background Overlays */}
        <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
        <div className="absolute inset-0 bg-white opacity-40"></div>

        {/* Slim & Responsive Header Content */}
        <div className="relative z-10 margin-container py-2 lg:py-4 text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-1">
            Construction Training Courses – Get Qualified Online
          </h1>

          <p className="text-gray-600 max-w-5xl mx-auto text-[11px] md:text-sm leading-snug mb-3 py-2">
            Construction Customer Service offers comprehensive CITB-approved
            training courses for construction workers, supervisors, and site
            managers.
            <br className="hidden md:block" />
            Complete your qualifications online or in-person with flexible
            learning options to suit your schedule.
            <br className="hidden md:block " />
            <span className="font-bold">
              Book your construction training today and advance your career.
            </span>
          </p>

          <div className="flex justify-center">
            <a
              href="tel:03333440036"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call 0333 344 0036
            </a>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading && (
          <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
            Loading courses...
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => handleCardClick(course.id)}
            />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">
              No courses available at the moment.
            </p>
            <a
              href="tel:03333440036"
              className="mt-4 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Call 0333 344 0036
            </a>
          </div>
        )}
      </div>
      {/* Klarna Banner Image */}
      <div className="flex justify-center px-4 pb-4 sm:pb-5 lg:pb-6">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <img
            src="/images/Klarna.jpeg"
            alt="Construction worker holding a CSCS card with Klarna payment option"
            className="w-full h-auto block object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
