import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import blogsData from "../../data/blogs.data";
import { fetchAllBlogs } from "../../api/blogApi";
import { getBlogHref } from "../../utils/blogUrls";

// Same 20-word first-paragraph preview logic used on the full Blogs page,
// so the homepage cards read consistently with /blogs.
const getBlogPreview = (html, wordLimit = 20) => {
  if (!html) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const firstParagraph = doc.querySelector("p");
  if (!firstParagraph) return "";
  const text = firstParagraph.textContent.trim();
  const words = text.split(/\s+/);
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

// Normalizes either an API blog row or a static blogsData entry into the
// shape this component renders — so admin-added blogs show up here exactly
// like they do on /blogs, instead of the old hardcoded 6 posts.
const toDisplayPost = (blog) => ({
  id: blog.id,
  slug: blog.slug || blog.id,
  image: blog.blogImage1 || blog.image || "/images/page-header-bg-shape.png",
  category: blog.category || "Blog",
  date: blog.date || blog.blogDate || "",
  readTime: blog.readTime || "5 min read",
  title: blog.title,
  description:
    blog.description ||
    (blog.blogContent
      ? getBlogPreview(blog.blogContent, 20)
      : "Click to read more..."),
});

const Blog = () => {
  const [posts, setPosts] = useState(() => blogsData.slice(0, 6).map(toDisplayPost));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadBlogs = async () => {
      try {
        const apiBlogs = await fetchAllBlogs();
        if (cancelled) return;
        const source = apiBlogs.length > 0 ? apiBlogs : blogsData;
        setPosts(source.slice(0, 6).map(toDisplayPost));
      } catch (err) {
        console.error(
          "Failed to fetch blogs from API, using fallback data:",
          err,
        );
        if (!cancelled) setPosts(blogsData.slice(0, 6).map(toDisplayPost));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadBlogs();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* ── HEADER SECTION ───────────────────────────── */}
      <section className="pt-10 pb-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Latest Construction Industry Insights & Blogs
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Stay updated with the latest news, guides, and expert advice for
            construction professionals
          </p>
        </div>
      </section>

      {/* ── BLOG GRID ────────────────────────────────── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={getBlogHref(post)}
                  className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full"
                >
                  {/* Image Container - Height adjusted to give image text breathing room */}
                  <div className="relative h-72 bg-[#eef4ff] flex items-center justify-center p-4 overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/images/page-header-bg-shape.png";
                      }}
                    />
                    {/* Category Label - Fixed position so it doesn't block image content */}
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg shadow-lg z-20">
                      {post.category}
                    </span>
                  </div>

                  {/* Content Container - Increased padding for better UX */}
                  <div className="p-2 flex flex-col flex-grow">
                    {/* Meta Row */}
                    <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold mb-4">
                      <span className="uppercase">{post.date}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>

                    {/* Title - Increased spacing and line-height */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Description - Added margin-bottom to push button down */}
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
                      {post.description}
                    </p>

                    {/* Read More - Clean bottom alignment */}
                    <div className="mt-auto pt-1 border-t border-slate-50">
                      <span className="text-blue-600 font-bold text-sm inline-flex items-center gap-2 group-hover:underline">
                        Read More
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;