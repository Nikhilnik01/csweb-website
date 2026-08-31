// src/pages/blogs/BlogDetail.jsx

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import SeoHead from "../../components/common/SeoHead";
import blogsData from "../../data/blogs.data";
import { fetchAllBlogs } from "../../api/blogApi";
import { getBlogHref, SEO_BLOG_SLUGS, getBlogSlug } from "../../utils/blogUrls";

/* ====================== SHARED UI ====================== */

const SectionCard = ({ title, children }) => (
  <section>
    {title && (
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
        {title}
      </h2>
    )}
    <div className="space-y-3 text-gray-700 leading-relaxed text-sm sm:text-base">
      {children}
    </div>
  </section>
);

const BulletList = ({ items }) => {
  if (!items?.length) return null;
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-gray-700 flex-shrink-0 font-bold">•</span>
          <span className="text-gray-700 text-sm sm:text-base">{item}</span>
        </li>
      ))}
    </ul>
  );
};

const CTAButtons = () => (
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
    <Link
      to="/cscs-cards"
      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white hover:bg-blue-700 text-sm"
    >
      Apply for CSCS Card
    </Link>
    <Link
      to="/book-citb-test"
      className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-blue-600 hover:bg-blue-50 text-sm"
    >
      Book CITB Test
    </Link>
    <a
      href="tel:+447856423532"
      className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white hover:bg-slate-800 text-sm"
    >
      Call +44 7856 423532
    </a>
  </div>
);

const CourseImage = ({ src, alt }) => {
  const handleError = (e) => {
    e.currentTarget.style.display = "none";
  };
  return (
    <div className="w-full overflow-hidden rounded-xl bg-gray-100">
      <img
        src={src}
        alt={alt}
        onError={handleError}
        className="w-full h-auto block object-contain"
      />
    </div>
  );
};

const SidebarCard = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm">
    <h4 className="font-bold mb-3 text-base text-gray-900">{title}</h4>
    {children}
  </div>
);

/* ====================== LOADING / EMPTY STATES ====================== */

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-6 sm:p-8">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600 text-sm sm:text-base">Loading article...</p>
    </div>
  </div>
);

const NotFoundState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-6 sm:p-8 bg-white rounded-xl shadow max-w-md mx-4">
      <h2 className="text-xl font-bold text-red-600 mb-3">Article Not Found</h2>
      <Link
        to="/blogs"
        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm inline-block"
      >
        Back to Blog
      </Link>
    </div>
  </div>
);

/* ====================== MAIN ====================== */

const BlogDetail = ({ id: propId }) => {
  const { id: paramId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Extract pathSlug (remove leading slash)
  const pathSlug = pathname.substring(1);
  const isSeoPath = SEO_BLOG_SLUGS.includes(pathSlug);

  const id = propId || (isSeoPath ? pathSlug : paramId);

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auto redirect /blog/:id to SEO-friendly path if the loaded blog's slug matches mapped slugs
  useEffect(() => {
    if (blog && paramId) {
      const slug = getBlogSlug(blog);
      if (SEO_BLOG_SLUGS.includes(slug)) {
        navigate(`/${slug}`, { replace: true });
      }
    }
  }, [blog, paramId, navigate]);





useEffect(() => {
    let isMounted = true;

    const loadBlog = async () => {
      setLoading(true);
      setBlog(null);

      try {
        // Single call — fetch the full list once, derive everything from it
        const allBlogs = await fetchAllBlogs();

        if (!isMounted) return;

        const apiBlog = allBlogs.find(
          (b) =>
            String(b.id) === String(id) ||
            b.slug === id ||
            getBlogSlug(b) === id,
        );

        if (apiBlog) {
          const transformedBlog = {
            id: apiBlog.id,
            title: apiBlog.title,
            description: apiBlog.title,
            author: apiBlog.blogBy || "Expert",
            date: apiBlog.blogDate
              ? new Date(apiBlog.blogDate).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A",
            readTime: "5 min read",
            image: apiBlog.blogImage1,
            slug: apiBlog.slug || apiBlog.id,
            blogContent: apiBlog.blogContent,
            isApiContent: true,
          };

          setBlog(transformedBlog);

          const transformedRelated = allBlogs
            .filter((b) => b.id !== transformedBlog.id)
            .slice(0, 3)
            .map((b) => ({
              id: b.id,
              title: b.title,
              slug: b.slug || b.id,
              image: b.blogImage1 || b.image,
              readTime: "5 min read",
            }));

          setRelated(transformedRelated);
        } else {
          // Fallback to static data
          const found =
            blogsData.find((b) => b.slug === id) ||
            blogsData.find((b) => String(b.id) === String(id));

          if (found) {
            setBlog(found);
            setRelated(blogsData.filter((b) => b.id !== found.id).slice(0, 3));
          }
        }
      } catch (error) {
        console.error("Error loading blog:", error);
        if (!isMounted) return;

        const found =
          blogsData.find((b) => b.slug === id) ||
          blogsData.find((b) => String(b.id) === String(id));

        if (found) {
          setBlog(found);
          setRelated(blogsData.filter((b) => b.id !== found.id).slice(0, 3));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBlog();
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      isMounted = false;
    };
  }, [id]);



  // Still fetching — show a loading state, NOT "Article Not Found"
  if (loading) {
    return <LoadingState />;
  }

  // Fetch finished and nothing was found
  if (!blog) {
    return <NotFoundState />;
  }

  const quickLinks = [
    { label: "Apply for CSCS Card", href: "/cscs-cards" },
    { label: "Book CITB Test", href: "/book-citb-test" },
    { label: "NVQ Training", href: "/training" },
    { label: "Construction Courses", href: "/courses" },
    { label: "Which Test Do I Need?", href: "/which-test" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      <SeoHead title={blog.title} description={blog.description} />

      {/* HEADER */}
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-5">
          <Link to="/blogs" className="text-blue-600 text-xs sm:text-sm">
            ← Back to Blogs
          </Link>

          <div className="text-center max-w-3xl mx-auto mt-4 sm:mt-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FaUser /> {blog.author || "Expert"}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt /> {blog.date}
              </span>
              <span className="flex items-center gap-1">
                <FaClock /> {blog.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT WITH SIDEBAR */}
      <div className="max-w-6xl mx-auto px-4 py-5 sm:py-6 pb-3 sm:pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-5 lg:gap-6">
          {/* MOBILE ONLY IMAGE */}
          {blog.image && (
            <div className="block lg:hidden order-1">
              <CourseImage src={blog.image} alt={blog.title} />
            </div>
          )}

          {/* MAIN CONTENT */}

          <div className="lg:col-span-2 space-y-5 sm:space-y-6 order-2 lg:order-1">
            {blog.isApiContent ? (
              <div
                className="prose prose-sm sm:prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.blogContent }}
              />
            ) : (
              // Render traditional structured content
              <>
                {blog.sections?.map((section, i) => (
                  <SectionCard key={i} title={section.heading}>
                    {section.paragraphs?.map((p, j) => (
                      <p
                        key={j}
                        className="text-gray-700 text-sm sm:text-base leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}

                    <BulletList items={section.bullets} />

                    {section.subSections?.map((sub, k) => (
                      <div key={k} className="mt-2">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                          {sub.title}
                        </h3>
                        {sub.description && (
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            {sub.description}
                          </p>
                        )}
                        <BulletList items={sub.bullets || sub.points} />
                      </div>
                    ))}
                  </SectionCard>
                ))}
              </>
            )}

            {/* CTA */}
            <SectionCard title="Need Help Securing Your NVQ or CSCS Card?">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                We organize on-site trade assessments across Levels 2-7, getting
                you certified in 6-8 weeks with zero classroom time.
              </p>
              <CTAButtons />
            </SectionCard>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4 sm:space-y-5 order-3 lg:order-2">
            {/* DESKTOP ONLY IMAGE */}
            {blog.image && (
              <div className="hidden lg:block">
                <CourseImage src={blog.image} alt={blog.title} />
              </div>
            )}

            <SidebarCard title="Quick Links">
              <ul className="space-y-1.5 text-xs sm:text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      › {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarCard>

            {related.length > 0 && (
              <SidebarCard title="Related Articles">
                <ul className="space-y-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        to={getBlogHref(r)}
                        className="flex gap-2 hover:opacity-80 transition"
                      >
                        <div className="w-12 h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={r.image}
                            alt={r.title}
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-blog.jpg";
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold line-clamp-2 text-gray-900">
                            {r.title}
                          </p>
                          <span className="text-xs text-gray-500">
                            {r.readTime}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            )}
          </aside>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
