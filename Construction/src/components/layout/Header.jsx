// src/components/layout/Header.jsx

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { NAV_ITEMS, TOP_BAR } from "../../data/navigation.data";
import { mergeApiCardsWithStatic } from "../../utils/cscsCardsApi";
import { useNavigationData } from "../../context/NavigationDataContext";
// FcPhone ki jagah HiPhone use kiya hai taaki color change ho sake
import { HiPhone } from "react-icons/hi";

const HamburgerIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg
    className={`w-4 h-4 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const SocialIcon = ({ icon }) => {
  const icons = {
    facebook: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    x: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    youtube: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  };
  return icons[icon] || null;
};

const MegaMenu = ({ sections, alignRight }) => (
  <div
    className={`absolute top-full z-50 bg-white shadow-2xl border-t-2 border-blue-600 rounded-b-lg w-max min-w-[200px] max-w-[700px] ${alignRight ? "right-0" : "left-0"}`}
  >
    <div
      className={`grid gap-0 p-4 ${sections.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
    >
      {sections.map((section, i) => (
        <div key={i} className="p-3">
          <p
            className={`font-semibold text-sm mb-2 ${section.color || "text-gray-800"}`}
          >
            {section.heading}
          </p>
          <ul className="space-y-1">
            {section.links.map((link, j) => (
              <li key={j}>
                <Link
                  to={link.href}
                  className="text-sm text-gray-600 hover:text-blue-600 hover:underline block py-0.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const MobileMenu = ({ items, onClose }) => {
  const [openItems, setOpenItems] = useState({});
  const toggle = (label) =>
    setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto">
      {/* Top Info Bar */}
      <div className="bg-[#1565a7] text-white px-4 py-2 flex items-center justify-between">
        <a
          href={`tel:${TOP_BAR.phone}`}
          className="flex items-center gap-1 font-medium"
        >
          <HiPhone className="w-3.5 h-3.5" />
          {TOP_BAR.phone}
        </a>
        <div className="flex items-center gap-2.5">
          {TOP_BAR.socials.map((s) => (
            <a
              key={s.icon}
              href={s.href}
              aria-label={s.label}
              className="text-white/80 hover:text-white"
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
      </div>

      {/* Logo + Close */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white">
        <Link to="/" onClick={onClose}>
          <img
            src="/images/logo.png"
            alt="Construction Customer Service"
            className="h-18 object-contain"
          />
        </Link>
        <button
          onClick={onClose}
          className="text-gray-700 p-2"
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Booking Banner */}
      <div className="bg-[#1976d2] text-white px-4 py-1.5 flex items-center justify-between text-xs">
        <span>{TOP_BAR.bookingBanner.text}</span>
        <Link
          to={TOP_BAR.bookingBanner.ctaHref}
          onClick={onClose}
          className="bg-white text-blue-700 font-bold px-3 py-0.5 rounded text-xs"
        >
          {TOP_BAR.bookingBanner.ctaLabel}
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-0 py-2 overflow-y-auto">
        {items.map((item) => {
          const sections = item.mobileSections || item.megaSections;
          const isOpen = !!openItems[item.label];

          if (item.hasMega && sections) {
            return (
              <div key={item.label} className="border-b border-gray-100">
                <button
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left text-gray-800 font-semibold text-[15px] hover:bg-gray-50"
                  onClick={() => toggle(item.label)}
                >
                  <span>{item.label}</span>
                  <ChevronDown open={isOpen} />
                </button>

                {isOpen && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    {sections.map((section, si) => (
                      <div key={si}>
                        {sections.length > 1 && (
                          <p
                            className={`text-xs font-bold uppercase tracking-wider px-5 pt-3 pb-1 ${section.color || "text-gray-500"}`}
                          >
                            {section.heading}
                          </p>
                        )}
                        <ul>
                          {section.links.map((link, li) => (
                            <li key={li}>
                              <Link
                                to={link.href}
                                onClick={onClose}
                                className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-b border-gray-100 last:border-0"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3 flex-shrink-0"></span>
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={item.label} className="border-b border-gray-100">
              <Link
                to={item.href}
                onClick={onClose}
                className="block px-4 py-3.5 text-gray-800 font-semibold text-[15px] hover:bg-gray-50 hover:text-blue-600"
              >
                {item.label}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
        <Link
          to="/citb"
          onClick={onClose}
          className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Book Now
        </Link>
        <a
          href={`tel:${TOP_BAR.phone}`}
          className="flex items-center justify-center gap-1.5 text-gray-600 text-sm mt-3"
        >
          <HiPhone className="w-4 h-4 text-blue-600" /> {TOP_BAR.phone}
        </a>
      </div>
    </div>
  );
};

const DesktopNavItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setAlignRight(rect.left > window.innerWidth / 2);
    }
    setOpen(true);
  };

  if (!item.hasMega) {
    return (
      <Link
        to={item.href}
        className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2 whitespace-nowrap"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2">
        {item.label}
        <ChevronDown open={open} />
      </button>
      {open && (
        <MegaMenu sections={item.megaSections} alignRight={alignRight} />
      )}
    </div>
  );
};

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
const buildCscsMenuSections = (cards) => {
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

  return [
    {
      heading: "Construction Card",
      color: "text-blue-700",
      links: [
        { label: "All CSCS Cards", href: "/cscs-cards" },
        ...constructionLinks,
      ],
    },
    {
      heading: "Skilled Worker",
      color: "text-blue-700",
      links: skilledLinks,
    },
  ].filter((section) => section.links.length > 0);
};

const updateCscsNavigation = (items, cards) =>
  items.map((item) => {
    if (item.label !== "CSCS Card") return item;

    const sections = buildCscsMenuSections(cards);
    return {
      ...item,
      megaSections: sections,
      mobileSections: sections,
    };
  });

// ---- CITB Test dropdown helpers ----

const buildCitbTestMenuSections = (tests) => {
  const links = tests
    .filter((t) => t.isActive)
    .map((t) => ({
      label: t.testName,
      href: `/citb?testId=${t.id}`,
    }));

  return [
    {
      heading: "CITB Tests",
      color: "text-blue-700",
      links: [{ label: "Book a CITB Test", href: "/citb" }, ...links],
    },
  ];
};

const updateCitbTestNavigation = (items, tests) =>
  items.map((item) => {
    if (item.label !== "CITB HS&E Test") return item;

    const sections = buildCitbTestMenuSections(tests);
    return {
      ...item,
      hasMega: true,
      megaSections: sections,
      mobileSections: sections,
    };
  });

// ---- Courses dropdown helpers (NEW) ----

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
  return `/course-list/${identifier}`;
};

const buildCourseMenuSections = (courses) => {
  const activeCourses = courses.filter((c) => c.isActive !== false);

  const links = activeCourses.map((course) => ({
    label: getCourseLinkLabel(course),
    href: getCourseLinkHref(course),
  }));

  return [
    {
      heading: "Courses",
      color: "text-blue-700",
      links: [{ label: "All Courses", href: "/course-list" }, ...links],
    },
  ];
};

const updateCourseNavigation = (items, courses) =>
  items.map((item) => {
    if (item.label !== "Courses") return item;

    const sections = buildCourseMenuSections(courses);
    return {
      ...item,
      hasMega: true,
      megaSections: sections,
      mobileSections: sections,
    };
  });

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

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navItems, setNavItems] = useState(NAV_ITEMS);
  const { cscsCardsResponse, citbTestsResponse, coursesResponse, loading } =
    useNavigationData();

  useEffect(() => {
    if (loading) return;

    let updated = NAV_ITEMS;

    if (cscsCardsResponse?.status === "fulfilled") {
      const cards = mergeApiCardsWithStatic(cscsCardsResponse.value);
      if (cards.length > 0) updated = updateCscsNavigation(updated, cards);
    } else if (cscsCardsResponse?.status === "rejected") {
      console.error("Error loading CSCS cards menu:", cscsCardsResponse.reason);
    }

    if (citbTestsResponse?.status === "fulfilled") {
      const tests = extractListFromResponse(citbTestsResponse.value);
      if (tests.length > 0)
        updated = updateCitbTestNavigation(updated, tests);
    } else if (citbTestsResponse?.status === "rejected") {
      console.error("Error loading CITB tests menu:", citbTestsResponse.reason);
    }

    if (coursesResponse?.status === "fulfilled") {
      const courses = extractListFromResponse(coursesResponse.value);
      if (courses.length > 0)
        updated = updateCourseNavigation(updated, courses);
    } else if (coursesResponse?.status === "rejected") {
      console.error("Error loading courses menu:", coursesResponse.reason);
    }

    setNavItems(updated);
  }, [loading, cscsCardsResponse, citbTestsResponse, coursesResponse]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1565a7] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          <a
            href={`tel:${TOP_BAR.phone}`}
            className="flex items-center gap-1.5 hover:text-blue-300"
          >
            <HiPhone className="w-3.5 h-3.5 text-white" />
            <span className="font-bold">{TOP_BAR.phone}</span>
          </a>
          <a
            href={`mailto:${TOP_BAR.email}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-blue-300"
          >
            <svg
              className="w-3.5 h-3.5"
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
            {TOP_BAR.email}
          </a>
          <div className="flex items-center gap-3">
            {TOP_BAR.socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                aria-label={s.label}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex-shrink-0">
              <img
                src="/images/logo.jpeg"
                alt="Construction Customer Service"
                className="h-14 w-auto object-contain px-3"
              />
            </Link>

            <nav className="hidden lg:flex items-center">
              {navItems.map((item) => (
                <DesktopNavItem key={item.label} item={item} />
              ))}
            </nav>

            <Link
              to="/citb-bulk-test"
              className="hidden lg:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              Group Booking <span aria-hidden>→</span>
            </Link>

            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Booking Banner */}
      <div className="bg-gradient-to-r from-[#4da6ff] via-[#3d96ff] to-[#4da6ff] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <span className="text-xs">{TOP_BAR.bookingBanner.text}</span>
          <Link
            to={TOP_BAR.bookingBanner.ctaHref}
            className="text-xs bg-white text-blue-400 px-3 py-1 rounded font-semibold transition-colors"
          >
            {TOP_BAR.bookingBanner.ctaLabel}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <MobileMenu items={navItems} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
};

export default Header;