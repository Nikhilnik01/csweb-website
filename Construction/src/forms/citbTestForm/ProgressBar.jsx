// src/forms/citbTestForm/ProgressBar.jsx

const ProgressBar = ({ step, total, labels = [] }) => {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
        <span className="font-medium text-blue-700">
          {labels[step - 1] || `Step ${step}`}
        </span>
        <span>
          {step} of {total}
        </span>
      </div>
      <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
