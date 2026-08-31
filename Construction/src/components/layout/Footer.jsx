// src/components/layout/Footer.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mergeApiCardsWithStatic } from "../../utils/cscsCardsApi";
import { useNavigationData } from "../../context/NavigationDataContext";

const CscsBottomBanner = () => {
  return (
    <div className="w-full overflow-hidden">
      <img
        src="/img/Green CSCS Card Online.jpeg"
        alt="Green CSCS Card"
        className="w-full h-auto block"
      />
    </div>
  );
};

const SocialIcon = ({ icon }) => {
  const paths = {
    facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    instagram:
      "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 20.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
    youtube:
      "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
    x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  };
  return (
    <svg
      className="w-4 h-4"
      fill={["x", "facebook"].includes(icon) ? "currentColor" : "none"}
      stroke={!["x", "facebook"].includes(icon) ? "currentColor" : "none"}
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={paths[icon] || ""}
      />
    </svg>
  );
};

const FooterCol = ({ heading, links }) => (
  <div>
    <h4 className="text-white font-bold text-sm mb-3 pb-2 border-b border-white/20 uppercase tracking-wide">
      {heading}
    </h4>
    <ul className="space-y-1.5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.href}
            className="text-xs text-gray-200 hover:text-blue-300 transition-colors leading-relaxed block"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ---------------------------------------------------------------------------
// Static fallbacks — used until (or unless) the API calls below succeed.
// Same data that used to be hard-coded in this file.
// ---------------------------------------------------------------------------

const DEFAULT_COURSE_LINKS = [
  { label: "CSCS Green Card", href: "/courses/cscs-green-card" },
  { label: "SSSTS Course", href: "/courses/sssts" },
  { label: "SSSTS Refresher Course", href: "/courses/sssts-refresher" },
  { label: "SMSTS Course", href: "/courses/smsts" },
  { label: "SMSTS Refresher Course", href: "/courses/smsts-refresher" },
  { label: "Traffic Banksman", href: "/courses/traffic-banksman" },
];

const DEFAULT_CITB_LINKS = [
  { label: "CITB HS&E Test for Operatives", href: "/book-citb-test" },
  { label: "CITB HS&E Test for Specialists", href: "/book-citb-test" },
  { label: "Managers & Professionals Test", href: "/book-citb-test" },
  { label: "CITB HS&E Test Centre", href: "/test-center" },
  { label: "Why CITB HS&E Test?", href: "/which-test" },
];

const DEFAULT_CSCS_CARD_LINKS = [
  { label: "CSCS Green Card", href: "/cscs-cards/1" },
  { label: "Red CSCS Apprentice Card", href: "/cscs-cards/2" },
  { label: "Blue Skilled Worker Card", href: "/cscs-cards/7" },
  { label: "Gold Skilled Worker Card", href: "/cscs-cards/8" },
  { label: "Gold Supervisory Card", href: "/cscs-cards/9" },
  { label: "Black Manager Card", href: "/cscs-cards/10" },
];

const DEFAULT_MORE_CARD_LINKS = [
  { label: "AQP CSCS Card", href: "/cscs-cards/11" },
  { label: "PQP CSCS Card", href: "/cscs-cards/12" },
  { label: "Provisional Card", href: "/cscs-cards/13" },
  { label: "Trainee CSCS Card", href: "/cscs-cards/5" },
  { label: "Industry Placement Card", href: "/cscs-cards/6" },
  { label: "Red Experienced Technical CSCS Card", href: "/cscs-cards/3" },
];

// ---------------------------------------------------------------------------
// Helpers — mirror the logic used in Header.jsx so the footer and header
// stay in sync with the same API data.
// ---------------------------------------------------------------------------

const isConstructionCardLink = (card) => {
  const title = card.title?.toLowerCase() || "";
  return (
    card.cardColor === "green" ||
    card.cardColor === "red" ||
    title.includes("labourer") ||
    title.includes("apprentice") ||
    title.includes("experienced") ||
    title.includes("trainee") ||
    title.includes("industry placement") ||
    title.includes("provisional")
  );
};

const getCardLinkLabel = (card) => {
  const title = card.title || "CSCS Card";
  if (title.includes("CSCS") || title.includes("Card")) return title;
  return `${title} CSCS Card`;
};

// ✅ FIXED: Use API ID directly instead of slug fallback
const buildCscsFooterLinks = (cards) => {
  const links = cards.map((card) => ({
    label: getCardLinkLabel(card),
    href: `/cscs-cards/${card.id}`, // ✅ Use numeric ID from API
    isConstruction: isConstructionCardLink(card),
  }));

  const constructionLinks = links
    .filter((link) => link.isConstruction)
    .map(({ isConstruction, ...link }) => link);
  const skilledLinks = links
    .filter((link) => !link.isConstruction)
    .map(({ isConstruction, ...link }) => link);

  return { constructionLinks, skilledLinks };
};

const getCourseLinkLabel = (course) =>
  course.shortTitle ||
  course.title ||
  course.courseName ||
  course.courseTitle ||
  course.name ||
  "Course";

const getCourseLinkHref = (course) => {
  const identifier =
    course.slug || course.id || course.courseDeliveryTypeId || course.courseId;
  return `/courses/${identifier}`;
};

const buildCourseFooterLinks = (courses) =>
  courses
    .filter((c) => c.isActive !== false)
    .map((course) => ({
      label: getCourseLinkLabel(course),
      href: getCourseLinkHref(course),
    }));

const buildCitbFooterLinks = (tests) =>
  tests
    .filter((t) => t.isActive)
    .map((t) => ({
      label: t.testName,
      href: `/book-citb-test?testId=${t.id}`,
    }));

const extractListFromResponse = (response) => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.res?.lists)) return response.res.lists;
  if (Array.isArray(response.res?.courseLists)) return response.res.courseLists;
  if (Array.isArray(response.res?.data)) return response.res.data;
  if (Array.isArray(response.data?.lists)) return response.data.lists;
  if (Array.isArray(response.data?.courseLists))
    return response.data.courseLists;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.lists)) return response.lists;
  if (Array.isArray(response.courseLists)) return response.courseLists;

  const container = response.res || response.data || response;
  if (container && typeof container === "object") {
    const firstArrayKey = Object.keys(container).find((key) =>
      Array.isArray(container[key]),
    );
    if (firstArrayKey) return container[firstArrayKey];
  }

  return [];
};

// Keep each footer column to a sane length so the layout doesn't blow out.
const capLinks = (links, max) => links.slice(0, max);

const Footer = () => {
  const [courseLinks, setCourseLinks] = useState(DEFAULT_COURSE_LINKS);
  const [citbLinks, setCitbLinks] = useState(DEFAULT_CITB_LINKS);
  const [cscsCardLinks, setCscsCardLinks] = useState(DEFAULT_CSCS_CARD_LINKS);
  const [moreCardLinks, setMoreCardLinks] = useState(DEFAULT_MORE_CARD_LINKS);
  const { cscsCardsResponse, citbTestsResponse, coursesResponse, loading } =
    useNavigationData();

  useEffect(() => {
    if (loading) return;

    if (cscsCardsResponse?.status === "fulfilled") {
      const cards = mergeApiCardsWithStatic(cscsCardsResponse.value);
      if (cards.length > 0) {
        const { constructionLinks, skilledLinks } =
          buildCscsFooterLinks(cards);
        if (constructionLinks.length > 0)
          setCscsCardLinks(capLinks(constructionLinks, 6));
        if (skilledLinks.length > 0)
          setMoreCardLinks(capLinks(skilledLinks, 6));
      }
    } else if (cscsCardsResponse?.status === "rejected") {
      console.error("Error loading CSCS cards footer:", cscsCardsResponse.reason);
    }

    if (citbTestsResponse?.status === "fulfilled") {
      const tests = extractListFromResponse(citbTestsResponse.value);
      const links = buildCitbFooterLinks(tests);
      if (links.length > 0) setCitbLinks(capLinks(links, 6));
    } else if (citbTestsResponse?.status === "rejected") {
      console.error("Error loading CITB tests footer:", citbTestsResponse.reason);
    }

    if (coursesResponse?.status === "fulfilled") {
      const courses = extractListFromResponse(coursesResponse.value);
      const links = buildCourseFooterLinks(courses);
      if (links.length > 0) setCourseLinks(capLinks(links, 6));
    } else if (coursesResponse?.status === "rejected") {
      console.error("Error loading courses footer:", coursesResponse.reason);
    }
  }, [loading, cscsCardsResponse, citbTestsResponse, coursesResponse]);

  const col1 = {
    heading: "Construction Courses",
    links: courseLinks,
  };

  const col2 = {
    heading: "CITB HS&E Test",
    links: citbLinks,
  };

  const col3 = {
    heading: "Services",
    links: [
      { label: "CSCS Construction Courses", href: "/cscs-cards" },
      { label: "CITB HS&E Test", href: "/book-citb-test" },
      { label: "CSCS Card", href: "/cscs-cards" },
      { label: "CPCS Training", href: "/cpcs" },
      { label: "NVQ Courses", href: "/training" },
      { label: "Construction NVQ Training", href: "/training" },
    ],
  };

  const col4 = {
    heading: "About Company",
    links: [
      { label: "Refund Policy", href: "/terms" },
      { label: "Privacy Policy", href: "/terms" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Book Now", href: "/book-citb-test" },
      { label: "Contact", href: "/contact-us" },
      { label: "Find & Book CSCS Card Online", href: "/cscs-cards" },
    ],
  };

  const nvqCol = {
    heading: "NVQ Course",
    links: [
      { label: "All Trades", href: "/training" },
      {
        label: "Construction NVQ Qualifications",
        href: "/training/nvq-overview",
      },
      { label: "NVQ Level 2 Qualifications", href: "/training/nvq-level-2" },
      {
        label: "NVQ Level 3 Occupational Work Supervision",
        href: "/training/nvq-level-3",
      },
      { label: "NVQ Level 4 Site Supervision", href: "/training/nvq-level-4" },
      {
        label: "NVQ Level 7 Construction Senior Management",
        href: "/training/nvq-level-6-plus",
      },
    ],
  };

  const cscsCards = {
    heading: "CSCS Cards",
    links: cscsCardLinks,
  };

  const resources = {
    heading: "Resources",
    links: [
      { label: "CITB HS&E Test Practice", href: "/blogs" },
      { label: "CITB HS&E Test Centres", href: "/test-center" },
      { label: "Blog - Knowledge Centre", href: "/blogs" },
      { label: "The Ultimate Guide To CSCS Card", href: "/blogs" },
      { label: "CITB Health & Safety – Step-by-Step Guide", href: "/blogs" },
      { label: "Which Test Do I Need?", href: "/which-test" },
    ],
  };

  const moreCards = {
    heading: "More Cards",
    links: moreCardLinks,
  };

  const socials = [
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "YouTube", href: "#", icon: "youtube" },
    { label: "X", href: "#", icon: "x" },
  ];

  return (
    <>
      <footer className="relative text-white overflow-hidden">
        {/* Blue accent line at top */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 relative z-10" />

        {/* ── BACKGROUND LAYER ── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment:
              "scroll" /* iOS-safe: never use "fixed" on mobile */,
            minHeight: "100%",
          }}
        />

        {/* ── OVERLAY LAYER (mobile-aware) ── */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `
              radial-gradient(ellipse 120% 40% at 50% 0%, rgba(5,18,45,0.55) 0%, transparent 70%),
              linear-gradient(
                to bottom,
                rgba(5, 12, 25, 0.70) 0%,
                rgba(5, 12, 25, 0.76) 40%,
                rgba(5, 12, 25, 0.88) 75%,
                rgba(3,  8, 18, 0.97) 100%
              )
            `,
          }}
        />

        {/* All footer content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-6">
          {/* Row 1: Company info + 4 cols */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 pb-8 border-b border-white/10">
            {/* Brand column */}
            <div>
              <Link to="/">
                <img
                  src="/images/logowhite.png"
                  alt="Construction Customer Service"
                  className="h-12 object-contain mb-4"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </Link>
              <p className="text-sm text-gray-200 leading-relaxed mb-4">
                Construction Customer Service is one of the leading companies in
                construction training and certification across the UK. Our
                mission is to become a trustworthy partner providing hassle-free
                booking and management of your CSCS Cards, CITB Tests, NVQ
                Training and Courses.
              </p>
              <div className="space-y-2 text-sm mb-5">
                <a
                  href="mailto:admin@constructioncustomerservice.co.uk"
                  className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  admin@constructioncustomerservice.co.uk
                </a>
                <a
                  href="tel:+447856423532"
                  className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0 text-blue-400"
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
                  +44 7856 423532 (Main)
                </a>
              </div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center text-gray-300 hover:text-white transition-all"
                  >
                    <SocialIcon icon={s.icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* 4 link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <FooterCol {...col1} />
              <FooterCol {...col2} />
              <FooterCol {...col3} />
              <FooterCol {...col4} />
            </div>
          </div>

          {/* Row 2: NVQ + CSCS cards + resources + more cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 pb-6 border-b border-white/10">
            <FooterCol {...nvqCol} />
            <FooterCol {...cscsCards} />
            <FooterCol {...resources} />
            <FooterCol {...moreCards} />
          </div>

          {/* Bottom bar */}
          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300">
            <div className="text-center sm:text-left">
              <p>
                Construction Customer Service Ltd | Registered in England &amp;
                Wales
              </p>
              <p className="mt-0.5 text-gray-300">VAT Registered</p>
            </div>
            <p className="text-center">
              © {new Date().getFullYear()} Construction Customer Service. All
              rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                to="/terms"
                className="hover:text-gray-300 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/terms"
                className="hover:text-gray-300 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="hover:text-gray-300 transition-colors"
              >
                Refunds
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;