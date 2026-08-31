// src/pages/blogs/BlogsPage.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../../components/common/SeoHead";
// import PageHeader from "../../components/common/PageHeader";
import blogsData from "../../data/blogs.data";
import { fetchAllBlogs } from "../../api/blogApi";
import { getBlogHref } from "../../utils/blogUrls";

const CATEGORIES = [
  "All",
  "Certification",
  "CITB Test",
  "CSCS Cards",
  "NVQ",
  "Courses",
  "Safety",
];

const getBlogPreview = (html, wordLimit = 20) => {
  if (!html) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // First paragraph
  const firstParagraph = doc.querySelector("p");

  if (!firstParagraph) return "";

  const text = firstParagraph.textContent.trim();

  const words = text.split(/\s+/);

  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const BlogCard = ({ blog }) => {
  // Format blog image: use blogImage1 from API
  const blogImage =
    blog.blogImage1 || blog.image || "/images/page-header-bg-shape.png";

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <Link to={getBlogHref(blog)} className="block">
        <div className="relative overflow-hidden bg-[#dce8f5]">
          <img
            src={blogImage}
            alt={blog.title}
            className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "/images/page-header-bg-shape.png";
            }}
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category || "Blog"}
          </span>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <span>{blog.date || blog.blogDate || "N/A"}</span>
          <span>•</span>
          <span>{blog.readTime || "5 min read"}</span>
        </div>
        <Link to={getBlogHref(blog)}>
          <h2 className="font-bold text-gray-900 text-base leading-snug mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {blog.title}
          </h2>
        </Link>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {blog.blogContent
            ? getBlogPreview(blog.blogContent, 20)
            : "Click to read more..."}
        </p>
        <div className="pt-3 border-t border-gray-100">
          <Link
            to={getBlogHref(blog)}
            className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const apiBlogs = await fetchAllBlogs();
        setBlogs(apiBlogs.length > 0 ? apiBlogs : blogsData);
      } catch (err) {
        console.error(
          "Failed to fetch blogs from API, using fallback data:",
          err,
        );
        setBlogs(blogsData);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const filtered = blogs.filter((b) => {
    const matchCat =
      activeCategory === "All" ||
      b.category === activeCategory ||
      (b.category === undefined && activeCategory === "Blog");
    const matchSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.description &&
        b.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <>
      <SeoHead
        title="Construction Industry Blog – CSCS Cards, CITB Tests & Safety Tips"
        description="Expert articles on CSCS cards, CITB tests, NVQ qualifications, construction courses and site safety. Stay informed with the Construction Customer Service blog."
      />

      {/* ── Hero Section (Slim & Responsive) ── */}
      <div className="relative overflow-hidden shadow-md bg-[#f5f7ff] md:bg-[url('/images/page-header-bg-shape.png')] md:bg-cover md:bg-center">
        {/* Background Overlays */}
        <div className="absolute inset-0 z-0 bg-white/80 bg-gradient-to-r from-[#f1f3ff]/70 via-[#f4fef3]/70 to-[#fff3fc]/70"></div>
        <div className="absolute inset-0 bg-white opacity-40"></div>

        {/* Content: Spacing and Typography matched to CSCS Cards */}
        <div className="relative z-10 margin-container py-4 lg:py-6 text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Construction Industry Blog
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Search + Filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      activeCategory === cat
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">No articles found for your search.</p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-blue-600 hover:underline text-sm"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BlogsPage;
