// src/pages/courses/CourseBooking.jsx
import { useLocation } from "react-router-dom";
import CourseBookingForm from "../../forms/courseBookingForm/CourseBookingForm";
import CourseInfoCard from "../../forms/courseBookingForm/CourseInfoCard";
import { COURSES } from "../../data/courses.data";

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/\u00e2\u20ac\u201c|\u2013|-/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const COURSE_API_IDS = {
  "cscs-green-card": 1,
  sssts: 2,
  "sssts-refresher": 3,
  smsts: 4,
  "smsts-refresher": 5,
  "traffic-banksman": 6,
};

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

const resolveSelectedCourse = (course) => {
  if (!course) return { ...COURSES[0], apiId: COURSE_API_IDS[COURSES[0].id] };

  const courseId = String(course.id || course.courseId || course.Id || "");
  const numericApiId = Number(course.apiId || course.Id || course.courseId);
  const pricingKey = course.pricingKey || course.pricingkey;
  const title = normalize(course.title || course.courseTitle || course.name);
  const slug = courseNameToSlug(
    course.courseName || course.title || course.courseTitle || course.name,
  );

  const matchedCourse = COURSES.find(
    (item) =>
      item.id === courseId ||
      item.id === slug ||
      item.pricingKey === pricingKey ||
      normalize(item.title) === title ||
      title.includes(normalize(item.shortTitle)) ||
      normalize(item.title).includes(title),
  );

  // Known legacy course (Green Card, SSSTS, etc.) — use the rich static
  // content (whyChoose, howItWorks, pricing key, ...) merged with any
  // fresher fields the API sent.
  if (matchedCourse) {
    return {
      ...matchedCourse,
      apiId: numericApiId || COURSE_API_IDS[matchedCourse.id] || 0,
    };
  }

  // A brand-new / admin-only course with no static counterpart.
  // IMPORTANT: don't silently swap it for COURSES[0] (Green Card) — that
  // was the bug. Show the course's own real data instead.
  return {
    ...course,
    id: courseId || slug || `course-${numericApiId || ""}`,
    title:
      course.title || course.courseTitle || course.courseName || course.name || "Course",
    isOnline: course.isOnline ?? true,
    isClassroom: course.isClassroom ?? false,
    defaultDelivery: course.defaultDelivery || "online",
    apiId: numericApiId || 0,
  };
};

const CourseBooking = () => {
  const location = useLocation();
  const hasPreselectedCourse = Boolean(location.state?.selectedCourse);
  const selectedCourse = resolveSelectedCourse(location.state?.selectedCourse);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 order-2 lg:order-1">
            <CourseBookingForm
              selectedCourse={selectedCourse}
              lockSelectedCourse={hasPreselectedCourse}
            />
          </div>

          <div className="w-full lg:w-64 xl:w-72 shrink-0 order-1 lg:order-2">
            <CourseInfoCard selectedCourse={selectedCourse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBooking;