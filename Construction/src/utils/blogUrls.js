// src/utils/blogUrls.js

export const SEO_BLOG_SLUGS = [
  "citb-test-online-for-cscs-card",
  "citb-test-booking-guide",
  "citb-test-requirements",
  "citb-test-for-cscs-card",
  "cscs-card-application-guide",
  "citb-health-safety-environment-test",
  "how-to-pass-citb-test",
  "citb-test-faqs"
];

/**
 * Extracts slug from the blog object or generates it from title.
 */
export const getBlogSlug = (blog) => {
  if (!blog) return "";
  if (blog.slug) return blog.slug;
  
  // Generate slug dynamically from the title
  return String(blog.title || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-")         // Replace spaces with hyphens
    .replace(/-+/g, "-");         // Remove duplicate hyphens
};

/**
 * Returns the SEO-friendly URL for a blog post.
 * Checks if the slug is a root-level SEO route, falls back to `/blog/:slugOrId`.
 */
export const getBlogHref = (blog) => {
  if (!blog) return "/blogs";
  const slug = getBlogSlug(blog);
  if (SEO_BLOG_SLUGS.includes(slug)) {
    return `/${slug}`;
  }
  return `/blog/${slug || blog.id}`;
};
