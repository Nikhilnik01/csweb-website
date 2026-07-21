import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import AdminPageHeader from "@/components/AdminPageHeader";
import { adminApi } from "@/lib/adminApi";
import { ApiError } from "@/lib/apiResponse";

interface CourseForm {
  id: number | null;
  courseName: string;
  shortDescription: string;
  longDescription: string;
  courseImage: string;
  isOnlineAvailable: boolean;
  isClassroomAvailable: boolean;
  validity: string;
  durations: string;
  times: string;
  delivery: string;
  certificate: string;
}

const EMPTY_FORM: CourseForm = {
  id: null,
  courseName: "",
  shortDescription: "",
  longDescription: "",
  courseImage: "",
  isOnlineAvailable: false,
  isClassroomAvailable: false,
  validity: "",
  durations: "",
  times: "",
  delivery: "",
  certificate: "",
};

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

function toFormValues(row: Record<string, unknown>): CourseForm {
  return {
    id: Number(row.id ?? row.Id ?? null) || null,
    courseName: String(row.courseName ?? row.CourseName ?? ""),
    shortDescription: String(
      row.shortDescription ?? row.ShortDescription ?? "",
    ),
    longDescription: String(row.longDescription ?? row.LongDescription ?? ""),
    courseImage: extractFileName(
      String(row.courseImage ?? row.CourseImage ?? ""),
    ),
    isOnlineAvailable: Boolean(
      row.isOnlineAvailable ?? row.IsOnlineAvailable ?? false,
    ),
    isClassroomAvailable: Boolean(
      row.isClassroomAvailable ?? row.IsClassroomAvailable ?? false,
    ),
    validity: String(row.validity ?? row.Validity ?? ""),
    durations: String(row.durations ?? row.Durations ?? ""),
    times: String(row.times ?? row.Times ?? ""),
    delivery: String(row.delivery ?? row.Delivery ?? ""),
    certificate: String(row.certificate ?? row.Certificate ?? ""),
  };
}

export default function CourseFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<CourseForm>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const loadCourse = useCallback(async (courseId: number) => {
    setLoading(true);
    setError(null);
    try {
      const rows = await adminApi.getCourses({ id: courseId });
      const row =
        rows.find((r) => Number(r.id ?? r.Id) === courseId) ?? rows[0];
      if (row) {
        const values = toFormValues(row);
        setForm(values);

        const rawImage = String(row.courseImage ?? row.CourseImage ?? "");
        if (rawImage) {
          setImagePreview(dedupeImageUrl(rawImage));
        }
      } else {
        setError("Course not found.");
      }
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to load course.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      void loadCourse(Number(id));
    } else {
      setForm(EMPTY_FORM);
      setImageFile(null);
      setImagePreview("");
    }
  }, [id, loadCourse]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await adminApi.saveCourse({
        id: form.id,
        courseName: form.courseName,
        shortDescription: form.shortDescription,
        longDescription: form.longDescription,
        courseImageFile: imageFile,
        courseImage: form.courseImage,
        isOnlineAvailable: form.isOnlineAvailable,
        isClassroomAvailable: form.isClassroomAvailable,
        validity: form.validity,
        durations: form.durations,
        times: form.times,
        delivery: form.delivery,
        certificate: form.certificate,
      });
      navigate("/admin/courses");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to save the course.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Training Catalogue / Courses"
        title={isEdit ? "Edit Course" : "Add New Course"}
        subtitle={
          isEdit
            ? "Update the course details below."
            : "Add a new course to the catalogue."
        }
        actions={
          <Link
            to="/admin/courses"
            className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
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
              Course Name
            </label>
            <input
              type="text"
              required
              value={form.courseName}
              onChange={(e) =>
                setForm((f) => ({ ...f, courseName: e.target.value }))
              }
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">
              Short Description
            </label>
            <textarea
              required
              rows={3}
              value={form.shortDescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, shortDescription: e.target.value }))
              }
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">
              Long Description
            </label>
            {/* Self-hosted TinyMCE — assets are served from /tinymce (see scripts/copy-tinymce.js) */}
            <Editor
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              licenseKey="gpl"
              value={form.longDescription}
              onEditorChange={(content) =>
                setForm((f) => ({ ...f, longDescription: content }))
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Validity
              </label>
              <input
                type="text"
                placeholder="e.g. 5 years"
                value={form.validity}
                onChange={(e) =>
                  setForm((f) => ({ ...f, validity: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Duration
              </label>
              <input
                type="text"
                placeholder="e.g. 1 day"
                value={form.durations}
                onChange={(e) =>
                  setForm((f) => ({ ...f, durations: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Times
              </label>
              <input
                type="text"
                placeholder="e.g. 9am - 5pm"
                value={form.times}
                onChange={(e) =>
                  setForm((f) => ({ ...f, times: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Delivery
              </label>
              <input
                type="text"
                placeholder="e.g. Online / Classroom"
                value={form.delivery}
                onChange={(e) =>
                  setForm((f) => ({ ...f, delivery: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Certificate
              </label>
              <input
                type="text"
                placeholder="e.g. CITB Certificate of Achievement"
                value={form.certificate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, certificate: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-on-surface">
              <input
                type="checkbox"
                checked={form.isOnlineAvailable}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    isOnlineAvailable: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-outline-variant"
              />
              Online Available
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-on-surface">
              <input
                type="checkbox"
                checked={form.isClassroomAvailable}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    isClassroomAvailable: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-outline-variant"
              />
              Classroom Available
            </label>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">
              Course Image
            </label>
            {imagePreview && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-on-surface">
                  Image Preview
                </p>

                <div className="mb-3 flex h-15 w-20 items-center justify-center overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
                  <img
                    src={imagePreview}
                    alt="Course Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              required={!isEdit}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);

                if (file) {
                  setForm((f) => ({
                    ...f,
                    courseImage: file.name,
                  }));

                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full text-sm text-on-surface file:mr-3 file:rounded-lg file:border-0 file:bg-primary-container file:px-3 file:py-2 file:text-sm file:font-medium file:text-on-primary"
            />
            {isEdit && (
              <p className="mt-1 text-xs text-on-surface-variant">
                {form.courseImage
                  ? `Current image: ${form.courseImage}. Select a new file to replace it, or leave blank to keep it.`
                  : "No image set yet — select one to upload."}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-outline-variant pt-4">
            <Link
              to="/admin/courses"
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
              {isEdit ? "Save Changes" : "Save Course"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}