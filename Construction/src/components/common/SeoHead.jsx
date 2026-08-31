// src/components/common/SeoHead.jsx

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SeoHead = ({
  title = "Construction Customer Service – CSCS Cards, CITB Tests & Training",
  description = "Book your CSCS card, CITB HS&E test, NVQ training and construction courses online. Fast, secure and trusted by thousands of UK construction workers.",
  keywords = "CSCS cards, CITB tests, construction training, NVQ, CSCS test booking",
  canonical = "",
  ogImage = "/images/logo.png",
}) => {
  const location = useLocation();
  const siteUrl = "https://www.constructioncustomerservice.co.uk";
  
  // Automatically build production canonical link if none is provided
  const canonicalUrl = canonical || `${siteUrl}${location.pathname === "/" ? "" : location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SeoHead;
