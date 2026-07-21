// src/components/common/PageHeader.jsx

const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = null,
}) => {
  return (
    <div className="relative overflow-hidden text-white">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/page-header-bg-shape.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-blue-700/90" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center min-h-[160px]">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

    </div>
  );
};

export default PageHeader;