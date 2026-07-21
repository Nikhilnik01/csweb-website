// src/utils/coursesApi.js

// Static course "id" values (e.g. "cscs-green-card", "sssts") used to be used
// to pull in rich supplementary content (whyChoose, faqs, etc). That static
// content is no longer used anywhere — all course content now comes purely
// from the admin panel / API. This helper is kept only because it's still
// useful for building a stable, human-readable slug for a course from its
// name (e.g. for analytics or matching), but it no longer touches any static
// course data.
export const courseNameToSlug = (name = "") => {
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

// Maps a raw API course object to the shape CourseDetail / course-list
// components expect. Purely API-driven — no static fallback data is merged
// in anymore. Any field the API doesn't provide will simply be absent, and
// the UI already renders each section conditionally.
export const mergeApiCourseWithStatic = (apiCourse) => {
  const slug = courseNameToSlug(apiCourse.courseName);

  return {
    id: String(apiCourse.id), // canonical routing id — always the API id
    apiId: apiCourse.id,
    slug,
    title: apiCourse.courseName,
    duration: apiCourse.durations,
    image: apiCourse.courseImage,
    shortDescription: apiCourse.shortDescription,
    description: apiCourse.longDescription,
    isOnline:
      typeof apiCourse.isOnlineAvailable === "boolean"
        ? apiCourse.isOnlineAvailable
        : undefined,
    isClassroom:
      typeof apiCourse.isClassroomAvailable === "boolean"
        ? apiCourse.isClassroomAvailable
        : undefined,
    validity: apiCourse.validity,
    courseDetails: {
      ...(apiCourse.durations ? { duration: apiCourse.durations } : {}),
      ...(apiCourse.times ? { times: apiCourse.times } : {}),
      ...(apiCourse.delivery ? { delivery: apiCourse.delivery } : {}),
      ...(apiCourse.certificate
        ? { certificate: apiCourse.certificate }
        : {}),
      ...(apiCourse.validity ? { validity: apiCourse.validity } : {}),
    },
  };
};

// Handles the "list all courses" response shape: { res: { courseLists: [...] } }
export const mergeApiCoursesWithStatic = (response) => {
  const apiCourses = response?.res?.courseLists;
  if (!Array.isArray(apiCourses) || apiCourses.length === 0) {
    return [];
  }
  return apiCourses.map(mergeApiCourseWithStatic);
};

// Pulls a single course object out of a getCourseById(id) response.
// The backend uses the same endpoint/shape as "get all", just filtered —
// so this defensively handles both an array result and a bare object.
export const extractCourseFromResponse = (response, id) => {
  const list = response?.res?.courseLists;
  if (Array.isArray(list) && list.length > 0) {
    if (list.length === 1) return list[0];
    // If the API ever ignores the id filter and returns everything,
    // find the matching one ourselves.
    return list.find((c) => String(c.id) === String(id)) || list[0];
  }
  if (response?.res && typeof response.res === "object" && response.res.id) {
    return response.res;
  }
  return null;
};