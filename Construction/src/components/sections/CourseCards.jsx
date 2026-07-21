import React from "react";
import { useNavigate } from "react-router-dom";


const CourseCard = ({
  title = "Course Title",
  duration = "N/A",
  image = "/images/default.jpg",
  tags = [],
  link = "#",
}) => {
  const navigate = useNavigate();

  const getBadgeColor = (tag) => {
    if (tag === "Online") return "bg-blue-600 text-white";
    if (tag === "Classroom") return "bg-green-600 text-white";
    return "bg-purple-600 text-white";
  };

  return (
    <article
      onClick={() => navigate(link)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#dce8f5]">
        <img
          src={image}
          alt={title}
          className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />

        {/* Badges top-left */}
        {tags.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs font-semibold px-3 py-1 rounded-full ${getBadgeColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Duration */}
        <div className="flex items-center text-xs text-gray-400 mb-2">
          <span>Duration:</span>
          <span className="ml-1 text-blue-600 font-medium">{duration}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Apply Now */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center transition-all">
            Apply Now
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;