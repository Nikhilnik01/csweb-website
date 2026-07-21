import { Link, useNavigate, useParams } from "react-router-dom";
import { getNvqById } from "../../data/training.data";
import {
  nvqOverview,
  nvqLevel2,
  nvqLevel3,
  nvqLevel4,
  nvqLevel7,
} from "../../data/nvqPageContent";
import { useRef, useState } from "react";

const SectionCard = ({ title, children, accent = false, sectionId }) => (
  <section id={sectionId}>
    {title && (
      <h2
        className={`text-lg sm:text-xl font-bold mb-3 ${
          accent ? "text-black" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
    )}
    <div
      className={`space-y-3 leading-relaxed text-sm sm:text-base ${
        accent ? "text-gray-700" : "text-gray-700"
      }`}
    >
      {children}
    </div>
  </section>
);

const TableOfContents = ({ sections, activeSection }) => {
  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

return (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 sticky top-2 shadow-sm">
    <h3 className="text-[20px] font-bold text-[#0B1F44] mb-5 leading-none">
      Quick Links
    </h3>

    <nav className="space-y-3">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleScroll(section.id)}
          className="group flex items-center gap-2 text-left text-[15px] text-[#1E40FF] hover:text-[#1533cc] transition-colors"
        >
          <span className="text-[#1E40FF] text-base leading-none transition-transform group-hover:translate-x-0.5">
            ›
          </span>
          <span className="underline underline-offset-2">
            {section.title}
          </span>
        </button>
      ))}
    </nav>
  </div>
);
};

const BulletList = ({ items }) => {
  if (!items || !Array.isArray(items) || items.length === 0) return null;
  return (
    <ul className="space-y-1.5 mt-2">
      {items.map((item, index) => {
        const numberMatch =
          typeof item === "string" && item.match(/^(\d+)\.\s*(.*)$/s);
        if (numberMatch) {
          const [, number, rest] = numberMatch;
          return (
            <li key={index} className="flex items-start gap-2">
              <span className="text-gray-700 flex-shrink-0 font-bold">
                {number}.
              </span>
              <span className="text-gray-700 text-sm sm:text-base">{rest}</span>
            </li>
          );
        }
        return (
          <li key={index} className="flex items-start gap-2">
            <span className="text-gray-700 flex-shrink-0 font-bold">•</span>
            <span className="text-gray-700 text-sm sm:text-base">{item}</span>
          </li>
        );
      })}
    </ul>
  );
};

const FAQList = ({ items }) => {
  if (!items || !Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border-l-4 border-blue-600 pl-3 pb-3 border-b border-b-gray-100 last:border-b-0 last:pb-0"
        >
          <h3 className="mb-1 font-semibold text-gray-900">{item.q}</h3>
          <p className="text-gray-600 text-sm">{item.a}</p>
        </div>
      ))}
    </div>
  );
};

const CTAButtons = ({
  primary = "Book Now",
  secondary = "Call 0333 344 0036",
  bookingState,
}) => (
  <div className="flex flex-col gap-2 sm:flex-row">
    <Link
      to="/nvq-course-form"
      state={bookingState}
      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 text-sm sm:text-base"
    >
      {primary}
    </Link>
    <a
      href="tel:03333440036"
      className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-6 py-2.5 font-semibold text-blue-600 transition-colors hover:bg-blue-50 text-sm sm:text-base"
    >
      {secondary}
    </a>
  </div>
);

const StepCard = ({ step, title, text }) => (
  <div className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 hover:border-blue-400 transition-colors">
    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
      {step}
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-gray-600 text-sm">{text}</p>
    </div>
  </div>
);

const CompetencyCard = ({ title, bullets }) => (
  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
    <h3 className="font-bold text-blue-900 mb-1.5 flex items-center gap-2">
      <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
      {title}
    </h3>
    <BulletList items={bullets} />
  </div>
);

const BadgeStrip = ({ text }) => (
  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold px-4 py-1.5 rounded-full text-sm mb-3 border border-blue-100">
    {text}
  </div>
);

const CourseImage = ({ src, alt }) => {
  const handleError = (e) => {
    e.currentTarget.style.display = "none";
    const fallback = e.currentTarget.nextElementSibling;
    if (fallback) fallback.style.display = "flex";
  };
  return (
    <div className="w-full rounded-lg overflow-hidden bg-blue-50 relative flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        onError={handleError}
        className="w-full h-auto object-contain"
      />
      <div
        className="hidden absolute inset-0 items-center justify-center bg-blue-50 text-blue-300"
        style={{ display: "none" }}
      >
        <p className="text-sm font-medium text-blue-400">Image not available</p>
      </div>
    </div>
  );
};

const TaglineCard = ({ tagline, footer }) => (
  <div className="text-center ">
    <p className="text-lg sm:text-xl font-semibold text-blue-700">{tagline}</p>
    {footer && <p className="mt-2 text-sm text-gray-600">{footer}</p>}
  </div>
);

const InfoBox = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-100 p-3 text-center">
    <span className="text-2xl font-bold text-blue-900">{value}</span>
    <span className="text-xs text-gray-500 mt-1">{label}</span>
  </div>
);

/* ================= OVERVIEW PAGE ================= */

const renderOverviewContent = (bookingState) => [
  {
    id: "overview-intro",
    title: nvqOverview.title,
    content: (
      <SectionCard title={nvqOverview.title} sectionId="overview-intro">
        {nvqOverview.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <CTAButtons
          primary="BOOK NOW"
          secondary="Call 0333 344 0036"
          bookingState={bookingState}
        />
      </SectionCard>
    ),
  },
  {
    id: "what-is-nvq",
    title: "What Is A Construction NVQ?",
    content: (
      <SectionCard title="What Is A Construction NVQ?" sectionId="what-is-nvq">
        {nvqOverview.whatIsIt.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </SectionCard>
    ),
  },
  {
    id: "why-choose",
    title: "Why Choose Construction Customer Service For Your NVQ?",
    content: (
      <SectionCard
        title="Why Choose Construction Customer Service For Your NVQ?"
        sectionId="why-choose"
      >
        <div className="space-y-4">
          {nvqOverview.whyChoose.map((section, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-100 bg-gray-50 p-2"
            >
              <h3 className="mb-1.5 font-bold text-blue-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                {section.title}
              </h3>
              <p className="mb-2 text-gray-700 text-sm">{section.intro}</p>
              {section.subheading && (
                <p className="font-semibold text-gray-800 text-sm">
                  {section.subheading}
                </p>
              )}
              {section.para2 && (
                <p className="mb-2 text-gray-700 text-sm">{section.para2}</p>
              )}
              {section.bullets?.length > 0 && (
                <BulletList items={section.bullets} />
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    ),
  },
  {
    id: "assessment-modes",
    title: "On-Site vs Remote Assessment",
    content: (
      <SectionCard
        title="On-Site vs Remote Assessment"
        sectionId="assessment-modes"
      >
        <div className="grid sm:grid-cols-2 gap-3">
          {nvqOverview.assessmentModes.map((mode) => (
            <div
              key={mode.title}
              className="rounded-xl border border-gray-100 bg-gray-50 p-2"
            >
              <h3 className="mb-1.5 font-bold text-blue-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                {mode.title}
              </h3>
              {mode.intro && (
                <p className="mb-2 text-sm text-gray-700">{mode.intro}</p>
              )}
              {mode.subheading && (
                <p className="font-semibold text-gray-800 text-sm">
                  {mode.subheading}
                </p>
              )}
              {mode.bullets?.length > 0 && (
                <BulletList items={mode.bullets} />
              )}
              {mode.note && (
                <p className="mt-2 italic text-gray-500 text-xs">{mode.note}</p>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    ),
  },
  {
    id: "nvq-levels",
    title: "NVQ Levels Explained",
    content: (
      <SectionCard title="NVQ Levels Explained" sectionId="nvq-levels">
        <p className="mb-2">
          NVQs are available in a range of levels from level 1 (basic) to level 7
          (senior management):
        </p>
        <BulletList items={nvqOverview.levels} />
      </SectionCard>
    ),
  },
  {
    id: "how-process-works",
    title: "How The NVQ Process Works",
    content: (
      <SectionCard title="How The NVQ Process Works" sectionId="how-process-works">
        <div className="space-y-2">
          {nvqOverview.process.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>
        <p className="mt-3 font-semibold text-gray-700">
          {nvqOverview.processTimeframe}
        </p>
        <CTAButtons
          primary={nvqOverview.cta2?.split(" or ")[0] || "BOOK NOW"}
          secondary="Call 0333 344 0036"
          bookingState={bookingState}
        />
      </SectionCard>
    ),
  },
];

/* ================= LEVEL 2 PAGE ================= */

const renderLevel2Content = (bookingState) => {
  const sections = [];

  sections.push({
    id: "level2-intro",
    title: nvqLevel2.title,
    content: (
      <SectionCard title={nvqLevel2.title} sectionId="level2-intro">
        <p className="font-semibold text-gray-600">{nvqLevel2.intro}</p>
        <p className="text-gray-600">{nvqLevel2.subtitle}</p>
      </SectionCard>
    ),
  });

  nvqLevel2.courses.forEach((course, idx) => {
    sections.push({
      id: `level2-course-${idx}`,
      title: course.title,
      content: (
        <SectionCard
          key={course.title}
          title={course.title}
          sectionId={`level2-course-${idx}`}
        >
          <p>{course.description}</p>

          <div className="mt-4 space-y-4">
            {/* Who */}
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
              <h3 className="font-bold text-blue-900 mb-1.5 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full" />
                Who It's For
              </h3>
              <p className="text-sm text-gray-700 mb-1.5">
                {course.whoSection.intro}
              </p>
              {course.whoSection.heading && (
                <p className="font-semibold text-gray-800 text-sm">
                  {course.whoSection.heading}
                </p>
              )}
              <BulletList items={course.whoSection.bullets} />
            </div>

            {/* Prove */}
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
              <h3 className="font-bold text-blue-900 mb-1.5 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full" />
                {course.prove.heading}
              </h3>
              <p className="text-sm text-gray-700 mb-1.5">{course.prove.text}</p>
              {course.prove.subheading && (
                <p className="font-semibold text-gray-800 text-sm">
                  {course.prove.subheading}
                </p>
              )}
              <BulletList items={course.prove.bullets} />
            </div>

            {/* Assessment */}
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
              <h3 className="font-bold text-blue-900 mb-1.5 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full" />
                {course.assessment.heading}
              </h3>
              <p className="text-sm text-gray-700 mb-1.5">
                {course.assessment.intro}
              </p>
              {course.assessment.subheading && (
                <p className="font-semibold text-gray-800 text-sm">
                  {course.assessment.subheading}
                </p>
              )}
              <BulletList items={course.assessment.bullets} />
            </div>
          </div>

          <p className="mt-3 font-medium text-blue-900 text-sm bg-green-50 border border-green-100 rounded-lg px-4 py-3">
            {course.card}
          </p>
          <CTAButtons
            primary={course.cta?.split(" or ")[0] || "BOOK COURSE"}
            secondary="Call 0333 344 0036"
            bookingState={bookingState}
          />
        </SectionCard>
      ),
    });
  });

  sections.push({
    id: "level2-ready",
    title: nvqLevel2.ready,
    content: (
      <SectionCard title={nvqLevel2.ready} sectionId="level2-ready">
        <p>{nvqLevel2.readyIntro}</p>
        <h3 className="mt-3 font-bold text-gray-900">What happens next:</h3>
        <BulletList items={nvqLevel2.nextSteps} />
        <CTAButtons
          primary={nvqLevel2.cta?.split(" or ")[0] || "START YOUR NVQ"}
          secondary="Call 0333 344 0036"
          bookingState={bookingState}
        />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level2-tagline",
    title: "Ready to Begin?",
    content: <TaglineCard tagline={nvqLevel2.tagline} />,
  });

  sections.push({
    id: "level2-career",
    title: nvqLevel2.careerSection,
    content: (
      <SectionCard title={nvqLevel2.careerSection} sectionId="level2-career">
        <p>{nvqLevel2.careerIntro}</p>
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          {nvqLevel2.careerBenefits.map((item, i) => (
            <div
              key={i}
              className="rounded-xl bg-gray-50 border border-gray-100 p-3"
            >
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
                <span className="w-1 h-5 bg-blue-600 rounded-full" />
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{item.text}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level2-faq",
    title: "Frequently Asked Questions",
    content: (
      <SectionCard title="Frequently Asked Questions" sectionId="level2-faq">
        <FAQList items={nvqLevel2.faq} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level2-booking",
    title: nvqLevel2.bookingSection,
    content: (
      <SectionCard
        title={nvqLevel2.bookingSection}
        sectionId="level2-booking"
        accent
      >
        <p>{nvqLevel2.bookingIntro}</p>
        <p className="mt-2 font-semibold text-black">{nvqLevel2.bookingText}</p>
        <CTAButtons
          primary={nvqLevel2.bookingCta?.split(" or ")[0] || "BOOK YOUR NVQ"}
          secondary="Call 0333 344 0036"
          bookingState={bookingState}
        />
        <p className="mt-5 text-xs text-blue-200">{nvqLevel2.bookingFooter}</p>
      </SectionCard>
    ),
  });

  return sections;
};

/* ================= LEVEL 3 PAGE ================= */

const renderLevel3Content = (bookingState) => {
  const sections = [];

  sections.push({
    id: "level3-intro",
    title: nvqLevel3.title,
    content: (
      <SectionCard title={nvqLevel3.title} sectionId="level3-intro">
        {/* <BadgeStrip text={nvqLevel3.strap} /> */}
        {nvqLevel3.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <CTAButtons
          primary="BOOK NOW"
          secondary="Call 0333 344 0036"
          bookingState={bookingState}
        />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level3-who",
    title: nvqLevel3.whoSection,
    content: (
      <SectionCard title={nvqLevel3.whoSection} sectionId="level3-who">
        <p>{nvqLevel3.whoIntro}</p>
        <h3 className="mt-3 font-bold text-gray-900">Perfect for:</h3>
        <BulletList items={nvqLevel3.perfectFor} />
        <h3 className="mt-4 font-bold text-gray-900">{nvqLevel3.youNeed}</h3>
        <BulletList items={nvqLevel3.needs} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level3-demonstrate",
    title: nvqLevel3.demonstrate,
    content: (
      <SectionCard
        title={nvqLevel3.demonstrate}
        sectionId="level3-demonstrate"
      >
        <p>{nvqLevel3.demonstrateText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel3.competencyLabel}
        </h3>
        <div className="mt-3 grid gap-3">
          {nvqLevel3.competencies.map((comp, i) => (
            <CompetencyCard key={i} title={comp.title} bullets={comp.bullets} />
          ))}
        </div>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level3-assessment",
    title: nvqLevel3.assessmentSection,
    content: (
      <SectionCard
        title={nvqLevel3.assessmentSection}
        sectionId="level3-assessment"
      >
        <p>{nvqLevel3.assessmentIntro}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel3.assessmentLabel}
        </h3>
        <div className="mt-3 space-y-3">
          {nvqLevel3.assessmentMethods.map((method, i) => (
            <div key={i} className="rounded-xl bg-gray-50 border border-gray-100 p-3">
              <h4 className="font-semibold text-gray-900 mb-1">
                {method.title}
              </h4>
              <p className="text-sm text-gray-700">{method.text}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel3.workplaceEvidenceLabel}
        </h3>
        <BulletList items={nvqLevel3.workplaceEvidence} />

        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel3.witnessLabel}
        </h3>
        <p className="text-sm text-gray-700">{nvqLevel3.witnessText}</p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level3-compare",
    title: nvqLevel3.compareSection,
    content: (
      <SectionCard
        title={nvqLevel3.compareSection}
        sectionId="level3-compare"
      >
        {nvqLevel3.compareText.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </SectionCard>
    ),
  });

  sections.push({
    id: "level3-card",
    title: nvqLevel3.cardSection,
    content: (
      <SectionCard title={nvqLevel3.cardSection} sectionId="level3-card">
        <p>{nvqLevel3.cardText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel3.cardLabel}
        </h3>
        <BulletList items={nvqLevel3.cardMatters} />
        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel3.cardReqLabel}
        </h3>
        <BulletList items={nvqLevel3.cardRequirements} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level3-completion",
    title: nvqLevel3.completionSection,
    content: (
      <SectionCard
        title={nvqLevel3.completionSection}
        sectionId="level3-completion"
      >
        <p>{nvqLevel3.completionText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel3.factorsLabel}
        </h3>
        <BulletList items={nvqLevel3.factors} />
        <p className="mt-3 italic text-gray-600 text-sm">{nvqLevel3.factorNote}</p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level3-progression",
    title: nvqLevel3.progressionSection,
    content: (
      <SectionCard
        title={nvqLevel3.progressionSection}
        sectionId="level3-progression"
      >
        <p>{nvqLevel3.progressionText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel3.immediateLabel}
        </h3>
        <BulletList items={nvqLevel3.immediate} />
        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel3.futureLabel}
        </h3>
        <BulletList items={nvqLevel3.future} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level3-tagline",
    title: "Ready to Lead?",
    content: <TaglineCard tagline={nvqLevel3.tagline} />,
  });

  sections.push({
    id: "level3-faq",
    title: "Frequently Asked Questions",
    content: (
      <SectionCard title="Frequently Asked Questions" sectionId="level3-faq">
        <FAQList items={nvqLevel3.faq || []} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level3-booking",
    title: "Ready to Progress?",
    content: (
      <SectionCard
        title="Ready to Progress?"
        sectionId="level3-booking"
        accent
      >
        <p>Start your Level 3 Occupational Work Supervision NVQ today.</p>
        <p className="mt-2 font-semibold text-black">
          Get qualified. Get your Gold Card. Progress your career.
        </p>
        <CTAButtons
          primary={nvqLevel3.cta2?.split(" or ")[0] || "BOOK LEVEL 3 NVQ"}
          secondary="Call 0333 344 0036"
          bookingState={bookingState}
        />
      </SectionCard>
    ),
  });

  return sections;
};

/* ================= LEVEL 4 PAGE ================= */

const renderLevel4Content = (bookingState) => {
  const sections = [];

  sections.push({
    id: "level4-intro",
    title: nvqLevel4.title,
    content: (
      <SectionCard title={nvqLevel4.title} sectionId="level4-intro">
        {/* <BadgeStrip text={nvqLevel4.strap} /> */}
        {nvqLevel4.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <CTAButtons
          primary="BOOK NOW"
          secondary="Call 0333 344 0036"
          bookingState={bookingState}
        />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level4-who",
    title: nvqLevel4.whoSection,
    content: (
      <SectionCard title={nvqLevel4.whoSection} sectionId="level4-who">
        <p>{nvqLevel4.whoIntro}</p>
        <h3 className="mt-3 font-bold text-gray-900">Ideal for:</h3>
        <BulletList items={nvqLevel4.idealFor} />
        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel4.requirementsLabel}
        </h3>
        <BulletList items={nvqLevel4.requirements} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level4-prove",
    title: nvqLevel4.proveSection,
    content: (
      <SectionCard title={nvqLevel4.proveSection} sectionId="level4-prove">
        <p>{nvqLevel4.proveText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel4.competenciesLabel}
        </h3>
        <div className="mt-3 grid gap-3">
          {nvqLevel4.competencies.map((comp, i) => (
            <CompetencyCard key={i} title={comp.title} bullets={comp.bullets} />
          ))}
        </div>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level4-pathways",
    title: nvqLevel4.pathwaysSection,
    content: (
      <SectionCard title={nvqLevel4.pathwaysSection} sectionId="level4-pathways">
        <p>{nvqLevel4.pathwaysText}</p>
        <div className="mt-3 space-y-3">
          {nvqLevel4.pathways.map((pathway, i) => (
            <div key={i} className="rounded-xl bg-gray-50 border border-gray-100 p-3">
              <h4 className="font-semibold text-gray-900 mb-1">
                {pathway.title}
              </h4>
              <p className="text-sm text-gray-700">{pathway.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 italic text-gray-600 text-sm">
          {nvqLevel4.pathwaysNote}
        </p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level4-assessment",
    title: nvqLevel4.assessmentSection,
    content: (
      <SectionCard
        title={nvqLevel4.assessmentSection}
        sectionId="level4-assessment"
      >
        <p>{nvqLevel4.assessmentIntro}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel4.assessorLabel}
        </h3>

        <h4 className="mt-3 font-semibold text-gray-900">
          {nvqLevel4.docEvidenceLabel}
        </h4>
        <BulletList items={nvqLevel4.docEvidence} />

        <h4 className="mt-3 font-semibold text-gray-900">
          {nvqLevel4.observedLabel}
        </h4>
        <BulletList items={nvqLevel4.observed} />

        <h4 className="mt-3 font-semibold text-gray-900">
          {nvqLevel4.professionalLabel}
        </h4>
        <BulletList items={nvqLevel4.professional} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level4-time",
    title: nvqLevel4.timeSection,
    content: (
      <SectionCard title={nvqLevel4.timeSection} sectionId="level4-time">
        <p>{nvqLevel4.timeIntro}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel4.timeDepends}
        </h3>
        <BulletList items={nvqLevel4.timeFactors} />
        <p className="mt-3 italic text-gray-600 text-sm">
          {nvqLevel4.timeNote}
        </p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level4-equivalent",
    title: nvqLevel4.equivalentSection,
    content: (
      <SectionCard
        title={nvqLevel4.equivalentSection}
        sectionId="level4-equivalent"
      >
        <p>{nvqLevel4.equivalentText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel4.equivalentLabel}
        </h3>
        <BulletList items={nvqLevel4.equivalent} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level4-card",
    title: nvqLevel4.cardSection,
    content: (
      <SectionCard title={nvqLevel4.cardSection} sectionId="level4-card">
        <p>{nvqLevel4.cardText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel4.cardLabel}
        </h3>
        <BulletList items={nvqLevel4.cardWhy} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level4-impact",
    title: nvqLevel4.impactSection,
    content: (
      <SectionCard title={nvqLevel4.impactSection} sectionId="level4-impact">
        <p>{nvqLevel4.impactText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel4.benefitsLabel}
        </h3>
        <BulletList items={nvqLevel4.benefits} />
        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel4.routesLabel}
        </h3>
        <BulletList items={nvqLevel4.routes} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level4-compare",
    title: nvqLevel4.compareSection,
    content: (
      <SectionCard title={nvqLevel4.compareSection} sectionId="level4-compare">
        {nvqLevel4.compareText.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel4.testLabel}
        </h3>
        <BulletList items={nvqLevel4.test} />
        <p className="mt-3 italic text-gray-600 text-sm">
          {nvqLevel4.testNote}
        </p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level4-tagline",
    title: "Ready to Advance?",
    content: <TaglineCard tagline={nvqLevel4.tagline} />,
  });

  sections.push({
    id: "level4-booking",
    title: "Book Your Level 4 NVQ",
    content: (
      <SectionCard title="Book Your Level 4 NVQ" sectionId="level4-booking" accent>
        <p>
          Bridge the gap between hands-on supervision and full site management.
        </p>
        <p className="mt-2 font-semibold text-black">
          Prove your capability. Progress your career.
        </p>
        <CTAButtons
          primary={nvqLevel4.cta2?.split(" or ")[0] || "BOOK LEVEL 4 NVQ"}
          secondary="Call 0333 344 0036"
          bookingState={bookingState}
        />
      </SectionCard>
    ),
  });

  return sections;
};

/* ================= LEVEL 7 PAGE ================= */

const renderLevel7Content = (bookingState) => {
  const sections = [];

  sections.push({
    id: "level7-intro",
    title: nvqLevel7.title,
    content: (
      <SectionCard title={nvqLevel7.title} sectionId="level7-intro">
        {/* <BadgeStrip text={nvqLevel7.strap} /> */}
        {nvqLevel7.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <CTAButtons
          primary="BOOK NOW"
          secondary="Call 0333 344 0036"
          bookingState={bookingState}
        />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-who",
    title: nvqLevel7.whoSection,
    content: (
      <SectionCard title={nvqLevel7.whoSection} sectionId="level7-who">
        <p>{nvqLevel7.whoIntro}</p>
        <h3 className="mt-3 font-bold text-gray-900">Designed for:</h3>
        <BulletList items={nvqLevel7.suits} />
        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel7.shouldHave}
        </h3>
        <BulletList items={nvqLevel7.shouldHaveList} />
        <h3 className="mt-4 font-bold text-gray-900">Not suitable for:</h3>
        <BulletList items={nvqLevel7.notSuitableList} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-different",
    title: nvqLevel7.differentSection,
    content: (
      <SectionCard
        title={nvqLevel7.differentSection}
        sectionId="level7-different"
      >
        <p>{nvqLevel7.differentIntro}</p>
        <BulletList items={nvqLevel7.different} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-demonstrate",
    title: nvqLevel7.demonstrateSection,
    content: (
      <SectionCard
        title={nvqLevel7.demonstrateSection}
        sectionId="level7-demonstrate"
      >
        <p>{nvqLevel7.demonstrateText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel7.mandatoryLabel}
        </h3>
        <BulletList items={nvqLevel7.mandatory} />

        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel7.optionalSection}
        </h3>
        <p className="text-sm text-gray-700 mb-3">
          {nvqLevel7.optionalText}
        </p>
        <div className="space-y-3">
          {nvqLevel7.optionalGroups.map((group, i) => (
            <div key={i} className="rounded-xl bg-gray-50 border border-gray-100 p-3">
              <h4 className="font-semibold text-gray-900 mb-1">
                {group.title}
              </h4>
              <BulletList items={group.bullets} />
            </div>
          ))}
        </div>
        <p className="mt-3 italic text-gray-600 text-sm">
          {nvqLevel7.optionalNote}
        </p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-assessment",
    title: nvqLevel7.assessmentSection,
    content: (
      <SectionCard
        title={nvqLevel7.assessmentSection}
        sectionId="level7-assessment"
      >
        <p>{nvqLevel7.assessmentText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel7.assessmentIntro}
        </h3>

        <h4 className="mt-3 font-semibold text-gray-900">
          {nvqLevel7.strategicLabel}
        </h4>
        <BulletList items={nvqLevel7.strategic} />

        <h4 className="mt-3 font-semibold text-gray-900">
          {nvqLevel7.managementLabel}
        </h4>
        <BulletList items={nvqLevel7.management} />

        <h4 className="mt-3 font-semibold text-gray-900">
          {nvqLevel7.commercialLabel}
        </h4>
        <BulletList items={nvqLevel7.commercial} />

        <h4 className="mt-3 font-semibold text-gray-900">
          {nvqLevel7.professionalLabel}
        </h4>
        <BulletList items={nvqLevel7.professional} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-completion",
    title: nvqLevel7.completionSection,
    content: (
      <SectionCard
        title={nvqLevel7.completionSection}
        sectionId="level7-completion"
      >
        <p>{nvqLevel7.completionText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel7.whyLongerLabel}
        </h3>
        <BulletList items={nvqLevel7.whyLonger} />
        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel7.factorsLabel}
        </h3>
        <BulletList items={nvqLevel7.factors} />
        <p className="mt-3 italic text-gray-600 text-sm">
          {nvqLevel7.accelerateNote}
        </p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-equivalent",
    title: nvqLevel7.equivalentSection,
    content: (
      <SectionCard
        title={nvqLevel7.equivalentSection}
        sectionId="level7-equivalent"
      >
        <p>{nvqLevel7.equivalentText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel7.equivalentLabel}
        </h3>
        <BulletList items={nvqLevel7.equivalent} />
        <p className="mt-3 italic text-gray-600 text-sm">
          {nvqLevel7.equivalentNote}
        </p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-card",
    title: nvqLevel7.cardSection,
    content: (
      <SectionCard title={nvqLevel7.cardSection} sectionId="level7-card">
        <p>{nvqLevel7.cardText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel7.cardIdentifies}
        </h3>
        <BulletList items={nvqLevel7.identifies} />
        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel7.cardLabel}
        </h3>
        <BulletList items={nvqLevel7.cardWhy} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-mciob",
    title: nvqLevel7.mciobSection,
    content: (
      <SectionCard title={nvqLevel7.mciobSection} sectionId="level7-mciob">
        <p>{nvqLevel7.mciobText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel7.pathwayLabel}
        </h3>
        <BulletList items={nvqLevel7.pathway} />
        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel7.benefitsLabel}
        </h3>
        <BulletList items={nvqLevel7.benefits} />
        <p className="mt-3 italic text-gray-600 text-sm">
          {nvqLevel7.mciobNote}
        </p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-impact",
    title: nvqLevel7.impactSection,
    content: (
      <SectionCard title={nvqLevel7.impactSection} sectionId="level7-impact">
        <p>{nvqLevel7.impactText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel7.immediateLabel}
        </h3>
        <BulletList items={nvqLevel7.immediate} />
        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel7.longTermLabel}
        </h3>
        <BulletList items={nvqLevel7.longTerm} />
        <h3 className="mt-4 font-bold text-gray-900">
          {nvqLevel7.standingLabel}
        </h3>
        <BulletList items={nvqLevel7.standing} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-remote",
    title: nvqLevel7.remoteSection,
    content: (
      <SectionCard title={nvqLevel7.remoteSection} sectionId="level7-remote">
        <p>{nvqLevel7.remoteText}</p>
        <BulletList items={nvqLevel7.remote} />
        <p className="mt-3 italic text-gray-600 text-sm">
          {nvqLevel7.remoteNote}
        </p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-compare",
    title: nvqLevel7.compareSection,
    content: (
      <SectionCard title={nvqLevel7.compareSection} sectionId="level7-compare">
        {nvqLevel7.compareText.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel7.testLabel}
        </h3>
        <BulletList items={nvqLevel7.test} />
        <p className="mt-3 italic text-gray-600 text-sm">
          {nvqLevel7.testNote}
        </p>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-whychoose",
    title: nvqLevel7.whyChooseSection,
    content: (
      <SectionCard
        title={nvqLevel7.whyChooseSection}
        sectionId="level7-whychoose"
      >
        <div className="space-y-3">
          {nvqLevel7.whyChoose.map((item, i) => (
            <div key={i} className="rounded-xl bg-gray-50 border border-gray-100 p-3">
              <h4 className="font-semibold text-gray-900 mb-1">
                {item.split(" ")[0]}
              </h4>
              <p className="text-sm text-gray-700">
                {item.substring(item.indexOf(" ") + 1)}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-faq",
    title: nvqLevel7.faqLabel,
    content: (
      <SectionCard title={nvqLevel7.faqLabel} sectionId="level7-faq">
        <FAQList items={nvqLevel7.faq} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-tagline",
    title: "Ready to Lead at Senior Level?",
    content: <TaglineCard tagline={nvqLevel7.tagline} />,
  });

  sections.push({
    id: "level7-start",
    title: nvqLevel7.startSection,
    content: (
      <SectionCard title={nvqLevel7.startSection} sectionId="level7-start">
        <p>{nvqLevel7.startText}</p>
        <h3 className="mt-3 font-bold text-gray-900">
          {nvqLevel7.nextStepsLabel}
        </h3>
        <BulletList items={nvqLevel7.nextSteps} />
      </SectionCard>
    ),
  });

  sections.push({
    id: "level7-booking",
    title: "Start Your Senior Management NVQ",
    content: (
      <SectionCard
        title="Start Your Senior Management NVQ"
        sectionId="level7-booking"
        accent
      >
        <p>Get recognized for your senior management capabilities.</p>
        <p className="mt-2 font-semibold text-black">
          Level 7 NVQ. Black CSCS Card. Chartered Pathway.
        </p>
        <CTAButtons
          primary={nvqLevel7.cta2?.split(" or ")[0] || "CONTACT US NOW"}
          secondary="Call 0333 344 0036"
          bookingState={bookingState}
        />
        <p className="mt-5 text-xs text-blue-200">{nvqLevel7.footer}</p>
      </SectionCard>
    ),
  });

  return sections;
};

/* ================= MAIN COMPONENT ================= */

const TrainingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const training = getNvqById(id);
  const [activeSection, setActiveSection] = useState("");

  const bookingState = training
    ? {
        pricingKey: training.pricingKey,
        sourceId: training.id,
        sourceTitle: training.shortTitle || training.title,
      }
    : undefined;

  let sections = [];

  if (id === "nvq-overview") {
    sections = renderOverviewContent(bookingState);
  } else if (id === "nvq-level-2") {
    sections = renderLevel2Content(bookingState);
  } else if (id === "nvq-level-3") {
    sections = renderLevel3Content(bookingState);
  } else if (id === "nvq-level-4") {
    sections = renderLevel4Content(bookingState);
  } else if (id === "nvq-level-7") {
    sections = renderLevel7Content(bookingState);
  }

  if (!training && id !== "nvq-overview") {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-2xl font-bold text-red-600">
            Training Course Not Found
          </h1>
          <Link
            to="/training"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Back to NVQ Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 sm:px-6">
          <button
            onClick={() => navigate("/training")}
            className="hover:text-blue-600"
          >
            NVQ Courses
          </button>{" "}
          /{" "}
          <span className="font-medium text-gray-800">
            {training?.title || "NVQ Overview"}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* LEFT CONTENT */}
          <div className="md:col-span-8 space-y-4 order-2 md:order-1">
            {sections.map((section) => (
              <div key={section.id}>{section.content}</div>
            ))}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="md:col-span-4 order-1 md:order-2 flex flex-col gap-4">
            {/* IMAGE */}
            {id !== "nvq-overview" && training && (
              <CourseImage src={training.image} alt={training.title} />
            )}
            {id === "nvq-overview" && (
              <CourseImage src="/images/training1.jpg" alt="NVQ Qualifications" />
            )}

            {/* TABLE OF CONTENTS */}
            <TableOfContents sections={sections} activeSection={activeSection} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetail;