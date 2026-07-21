// src/forms/courseBookingForm/CourseDetails.jsx

import { useState } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { COURSES } from "../../data/courses.data";
import { getCoursePricing } from "../../data/pricing.data";

const CourseDetails = ({
  data = {},
  onData = () => {},
  lockSelectedCourse = false,
}) => {
  const [courseType, setCourseType] = useState(data.courseType || "online");
  const [selectedCourse, setSelectedCourse] = useState(
    data.selectedCourse || "",
  );
  const [selectedDateObj, setSelectedDateObj] = useState(
    data.selectedDate ? new Date(data.selectedDate + "T00:00:00") : null,
  );
  const [selectedDate, setSelectedDate] = useState(data.selectedDate || "");
  const [cardType, setCardType] = useState(data.cardType || "");

  // Earliest allowed date = tomorrow (skip Sunday)
  const tomorrowDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return d;
  })();

  const maxDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d;
  })();

  const CARD_TYPE_LOCATIONS = [
    "Chelmsford",
    "Peterborough",
    "Stratford",
    "Sheffield",
    "Waltham Abbey",
    "London – Canary Wharf",
    "London – Lewisham",
    "East London",
    "Liverpool",
    "Manchester",
    "Glasgow",
    "Edinburgh",
    "Birmingham",
    "Cardiff",
    "Leeds",
    "Doncaster",
    "Sheffield",
    "Southampton",
    "Bournemouth",
    "Brighton",
    "Plymouth",
    "Swindon",
    "Exeter",
    "Gloucester",
    "Bristol",
    "Bridgwater",
    "Oxford",
    "Milton Keynes",
    "Reading",
    "Ashford",
    "Peterborough",
    "Ipswich",
    "Norwich",
    "Middlesbrough",
    "Stoke-on-Trent",
    "Northampton",
    "Derby",
  ];

  const handleCardTypeChange = (e) => {
    setCardType(e.target.value);
    onData({ cardType: e.target.value, selectedCourse, courseType, selectedDate });
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    onData({ selectedCourse: e.target.value, courseType });
  };

  const handleTypeChange = (type) => {
    setCourseType(type);
    onData({ courseType: type, selectedCourse });
  };

  const handleDateChange = (date) => {
    setSelectedDateObj(date);
    if (date) {
      const iso = date.toISOString().split("T")[0];
      setSelectedDate(iso);
      onData({ selectedDate: iso });
    } else {
      setSelectedDate("");
      onData({ selectedDate: "" });
    }
  };

  const courseOptions = COURSES || [];
  const selectedCourseData = courseOptions.find((c) => c.id === selectedCourse);
  const pricing = selectedCourse ? getCoursePricing(selectedCourse) : null;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-5 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-4">Course Delivery Type</h3>
        <div className="flex gap-6 flex-wrap">
          {[
            {
              value: "online",
              label: "Online",
              desc: "Complete at your own pace",
            },
            {
              value: "classroom",
              label: "Classroom",
              desc: "In-person training",
            },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg border-2 flex-1 min-w-[140px] transition-all ${
                courseType === opt.value
                  ? "border-blue-600 bg-blue-100"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <input
                type="radio"
                name="courseType"
                value={opt.value}
                checked={courseType === opt.value}
                onChange={() => handleTypeChange(opt.value)}
                className="mt-0.5 w-4 h-4 accent-blue-600"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {opt.label}{" "}
                  {opt.value === "online" && (
                    <span className="text-xs text-blue-600 font-normal">
                      (Default)
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500">{opt.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {courseType === "classroom" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm">
              <Calendar size={18} />
              Select Preferred Date <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={selectedDateObj}
              onChange={handleDateChange}
              minDate={tomorrowDate}
              maxDate={maxDate}
              filterDate={(date) => date.getDay() !== 0}
              placeholderText="Select a date"
              dateFormat="dd/MM/yyyy"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
              wrapperClassName="w-full"
              required={courseType === "classroom"}
            />
            <p className="text-xs text-gray-500 mt-1">
              Our team will confirm availability and contact you.
            </p>
          </div>
          <div>
            <label className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm">
              Select Your Course Center <span className="text-red-500">*</span>
            </label>
            <select
              value={cardType}
              onChange={handleCardTypeChange}
              required={courseType === "classroom"}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 text-sm bg-white"
            >
              <option value="">Select Location</option>
              {CARD_TYPE_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* {pricing && selectedCourse && !lockSelectedCourse && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-green-800">
            {selectedCourseData?.shortTitle ||
              selectedCourseData?.title ||
              "Course"}
            :{" "}
            <span className="text-lg">
              GBP {pricing.displayPrice || pricing.basePrice}
            </span>
          </p>
          <p className="text-xs text-green-600 mt-1">
            Additional fees shown at checkout summary.
          </p>
        </div>
      )} */}
    </div>
  );
};

export default CourseDetails;