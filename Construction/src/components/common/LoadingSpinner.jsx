// src/components/common/LoadingSpinner.jsx

import { Loader } from "lucide-react";

const LoadingSpinner = ({ message = "Loading...", fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <Loader className="animate-spin text-blue-600" size={48} />
      </div>
      <p className="text-gray-600 text-lg font-semibold">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 shadow-2xl">{content}</div>
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
