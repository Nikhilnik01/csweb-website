import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import AdminPageHeader from "@/components/AdminPageHeader";
import { adminApi } from "@/lib/adminApi";
import { ApiError } from "@/lib/apiResponse";

interface BlogForm {
  id: number | null;
  title: string;
  blogDate: string;
  blogBy: string;
  blogContent: string;
  isActive: boolean;
  blogImage1: string;
}

const EMPTY_FORM: BlogForm = {
  id: null,
  title: "",
  blogDate: new Date().toISOString().slice(0, 10),
  blogBy: "",
  blogContent: "",
  isActive: true,
  blogImage1: "",
};

/** Normalize any incoming date value (ISO datetime, etc.) to yyyy-MM-dd for <input type="date"> */
function toDateInputValue(value: unknown): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(String(value));
  if (Number.isNaN(parsed.getTime()))
    return new Date().toISOString().slice(0, 10);
  return parsed.toISOString().slice(0, 10);
}

// Backend returns full URLs (or, on bad data, doubled URLs). We only ever
// want to store/send the bare filename — the backend re-builds the full
// URL from the filename on read, so re-sending a full URL causes it to
// prepend the domain again next time (producing a doubled URL).
function extractFileName(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const lastSlash = trimmed.lastIndexOf("/");
  return lastSlash === -1 ? trimmed : trimmed.slice(lastSlash + 1);
}

// Defensive cleanup for image URLs already corrupted in the database
// (e.g. "http://domain/http://domain/file.jpg"). Keeps only the URL
// starting from the LAST http(s):// occurrence.
function dedupeImageUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const lastHttp = trimmed.lastIndexOf("http://");
  const lastHttps = trimmed.lastIndexOf("https://");
  const lastProtocolIndex = Math.max(lastHttp, lastHttps);
  return lastProtocolIndex > 0 ? trimmed.slice(lastProtocolIndex) : trimmed;
}

function toFormValues(row: Record<string, unknown>): BlogForm {
  return {
    id: Number(row.id ?? row.Id ?? null) || null,
    title: String(row.title ?? row.Title ?? ""),
    blogDate: toDateInputValue(row.blogDate ?? row.BlogDate),
    blogBy: String(row.blogBy ?? row.BlogBy ?? ""),
    blogContent: String(row.blogContent ?? row.BlogContent ?? ""),
    isActive: Boolean(row.isActive ?? row.IsActive ?? true),
    blogImage1: extractFileName(
      String(row.blogImage1 ?? row.BlogImage1 ?? ""),
    ),
  };
}

export default function BlogFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<BlogForm>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const loadBlog = useCallback(async (blogId: number) => {
    setLoading(true);
    setError(null);
    try {
      const rows = await adminApi.getBlogs({ id: blogId });
      const row = rows.find((r) => Number(r.id ?? r.Id) === blogId) ?? rows[0];
      if (row) {
        const data = toFormValues(row);
        setForm(data);
        const rawImage = String(row.blogImage1 ?? row.BlogImage1 ?? "");
        setImagePreview(dedupeImageUrl(rawImage));
      } else {
        setError("Blog not found.");
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load blog.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      void loadBlog(Number(id));
    } else {
      setForm(EMPTY_FORM);
      setImagePreview("");
    }
  }, [id, loadBlog]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await adminApi.saveBlog({
        id: form.id,
        title: form.title,
        blogDate: form.blogDate,
        blogBy: form.blogBy,
        blogContent: form.blogContent,
        isActive: form.isActive,
        blogImageFile: imageFile,
        blogImage1: form.blogImage1,
      });
      navigate("/admin/blogs");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to save the blog.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Content Management / Blogs"
        title={isEdit ? "Edit Blog" : "Add New Blog"}
        subtitle={
          isEdit
            ? "Update the article details below."
            : "Write and publish a new article."
        }
        actions={
          <Link
            to="/admin/blogs"
            className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
        }
      />

      {error && (
        <div className="mb-6 rounded-lg bg-error-container px-4 py-3 text-sm text-on-error-container">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center rounded-xl border border-outline-variant bg-surface-container-lowest py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-outline-variant bg-surface-container-lowest p-6"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">
              Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Blog Date
              </label>
              <input
                type="date"
                required
                value={form.blogDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, blogDate: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Blog By
              </label>
              <input
                type="text"
                required
                value={form.blogBy}
                onChange={(e) =>
                  setForm((f) => ({ ...f, blogBy: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">
              Blog Content
            </label>
            {/* Self-hosted TinyMCE — assets are served from /tinymce (see scripts/copy-tinymce.js) */}
            <Editor
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              licenseKey="gpl"
              value={form.blogContent}
              onEditorChange={(content) =>
                setForm((f) => ({ ...f, blogContent: content }))
              }
              init={{
                height: 420,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "media",
                  "table",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline forecolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | link image media table | code fullscreen | removeformat",
                content_style:
                  "body { font-family: Inter, system-ui, sans-serif; font-size: 14px }",
              }}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">
              Blog Image
            </label>

            {imagePreview && (
              <div className="mb-3 flex h-15 w-20 items-center justify-center overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
                <img
                  src={imagePreview}
                  alt="Blog"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;

                setImageFile(file);

                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full text-sm text-on-surface file:mr-3 file:rounded-lg file:border-0 file:bg-primary-container file:px-3 file:py-2 file:text-sm file:font-medium file:text-on-primary"
            />

            {isEdit && (
              <p className="mt-2 text-xs text-on-surface-variant">
                Leave empty to keep the existing image.
              </p>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-on-surface">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((f) => ({ ...f, isActive: e.target.checked }))
              }
              className="h-4 w-4 rounded border-outline-variant"
            />
            Active
          </label>

          <div className="flex justify-end gap-3 border-t border-outline-variant pt-4">
            <Link
              to="/admin/blogs"
              className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2 text-sm font-medium text-on-primary shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Save Blog"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
