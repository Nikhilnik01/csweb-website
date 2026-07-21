// src/forms/courseBookingForm/CourseInfoCard.jsx

const CourseInfoCard = ({ selectedCourse = null }) => {
  return (
    <div
      className="
        order-1 lg:order-2
        bg-blue-50
        rounded-lg
        text-sm
        text-blue-900
        border
        shadow-lg
        border-blue-200
        p-6
        flex
        flex-col
        justify-between
      "
    >
      {/* Course title + availability badges */}
      {selectedCourse && (
        <div className="">
          <h4 className="font-semibold text-blue-700 mb-2">
            {selectedCourse.title}
          </h4>

          {/* <div className="flex gap-2 flex-wrap"> */}
          {/* {selectedCourse.isOnline && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Online Available
              </span>
            )} */}

          {selectedCourse.isClassroom && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Classroom Available
            </span>
          )}
          {/* </div> */}
        </div>
      )}

      {/* Static info */}
      <div>
        <h4 className="font-semibold text-blue-700 mb-2">
          Course Booking Information
        </h4>

        <p className="text-gray-700 text-sm leading-relaxed">
          Complete your course booking safely and securely online. All personal
          information is protected and encrypted.
        </p>
      </div>
    </div>
  );
};

export default CourseInfoCard;
