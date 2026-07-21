import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import AdminPageHeader from "@/components/AdminPageHeader";
import { adminApi } from "@/lib/adminApi";
import { ApiError } from "@/lib/apiResponse";

interface CscsCardForm {
  id: number | null;
  cardName: string;
  cardShortDescription: string;
  cardDescription: string;
  cardImage: string;
  cardValid: string;
  cardQualifications: string;
  basePrice: string;
  bookingFee: string;
  totalPrice: string;
  currency: string;
  isConstructionCard: boolean;
}

const EMPTY_FORM: CscsCardForm = {
  id: null,
  cardName: "",
  cardShortDescription: "",
  cardDescription: "",
  cardImage: "",
  cardValid: "",
  cardQualifications: "",
  basePrice: "",
  bookingFee: "",
  totalPrice: "",
  currency: "GBP",
  isConstructionCard: false,
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

function toFormValues(row: Record<string, unknown>): CscsCardForm {
  return {
    id: Number(row.id ?? row.Id ?? null) || null,
    cardName: String(row.cardName ?? row.CardName ?? ""),
    cardShortDescription: String(
      row.cardShortDescription ?? row.CardShortDescription ?? "",
    ),
    cardDescription: String(row.cardDescription ?? row.CardDescription ?? ""),
    cardImage: extractFileName(String(row.cardImage ?? row.CardImage ?? "")),
    cardValid: String(row.cardValid ?? row.CardValid ?? ""),
    cardQualifications: String(
      row.cardQualifications ?? row.CardQualifications ?? "",
    ),
    basePrice: String(row.basePrice ?? row.BasePrice ?? ""),
    bookingFee: String(row.bookingFee ?? row.BookingFee ?? ""),
    totalPrice: String(row.totalPrice ?? row.TotalPrice ?? ""),
    currency: String(row.currency ?? row.Currency ?? "GBP"),
    isConstructionCard: Boolean(
      row.isConstructionCard ?? row.IsConstructionCard ?? false,
    ),
  };
}

export default function CscsCardFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<CscsCardForm>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const loadCard = useCallback(async (cardId: number) => {
    setLoading(true);
    setError(null);
    try {
      const rows = await adminApi.getCscsCards({ id: cardId });
      const row = rows.find((r) => Number(r.id ?? r.Id) === cardId) ?? rows[0];
      if (row) {
        const values = toFormValues(row);
        setForm(values);
        const rawImage = String(row.cardImage ?? row.CardImage ?? "");
        setImagePreview(dedupeImageUrl(rawImage));
      } else {
        setError("CSCS card not found.");
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load card.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      void loadCard(Number(id));
    } else {
      setForm(EMPTY_FORM);
      setImageFile(null);
      setImagePreview("");
    }
  }, [id, loadCard]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await adminApi.saveCscsCard({
        id: form.id,
        cardName: form.cardName,
        cardShortDescription: form.cardShortDescription,
        cardDescription: form.cardDescription,
        cardImageFile: imageFile,
        cardImage: form.cardImage,
        cardValid: form.cardValid,
        cardQualifications: form.cardQualifications,
        basePrice: form.basePrice ? Number(form.basePrice) : 0,
        bookingFee: form.bookingFee ? Number(form.bookingFee) : 0,
        totalPrice: form.totalPrice ? Number(form.totalPrice) : 0,
        currency: form.currency,
        isConstructionCard: form.isConstructionCard,
      });
      navigate("/admin/cscs-cards");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to save the card.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Certifications / CSCS Cards"
        title={isEdit ? "Edit CSCS Card" : "Add New CSCS Card"}
        subtitle={
          isEdit
            ? "Update the card details below."
            : "Add a new CSCS card type."
        }
        actions={
          <Link
            to="/admin/cscs-cards"
            className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to CSCS Cards
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Card Name
              </label>
              <input
                type="text"
                required
                value={form.cardName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, cardName: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Card Valid
              </label>
              <input
                type="text"
                placeholder="e.g. 5 years"
                value={form.cardValid}
                onChange={(e) =>
                  setForm((f) => ({ ...f, cardValid: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">
              Short Description
            </label>
            <textarea
              rows={2}
              value={form.cardShortDescription}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  cardShortDescription: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">
              Card Description
            </label>
            {/* Self-hosted TinyMCE — assets are served from /tinymce (see scripts/copy-tinymce.js) */}
            <Editor
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              licenseKey="gpl"
              value={form.cardDescription}
              onEditorChange={(content) =>
                setForm((f) => ({ ...f, cardDescription: content }))
              }
              init={{
                height: 360,
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
              Card Qualifications
            </label>
            <textarea
              rows={3}
              value={form.cardQualifications}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  cardQualifications: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Base Price
              </label>
              <input
                type="number"
                step="0.01"
                value={form.basePrice}
                onChange={(e) =>
                  setForm((f) => ({ ...f, basePrice: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Booking Fee
              </label>
              <input
                type="number"
                step="0.01"
                value={form.bookingFee}
                onChange={(e) =>
                  setForm((f) => ({ ...f, bookingFee: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Total Price
              </label>
              <input
                type="number"
                step="0.01"
                value={form.totalPrice}
                onChange={(e) =>
                  setForm((f) => ({ ...f, totalPrice: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">
                Currency
              </label>
              <input
                type="text"
                value={form.currency}
                onChange={(e) =>
                  setForm((f) => ({ ...f, currency: e.target.value }))
                }
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">
              Card Image
            </label>

            {imagePreview && (
              <div className="mb-3 flex h-15 w-20 items-center justify-center overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
                <img
                  src={imagePreview}
                  alt="CSCS Card"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
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
                  setForm((f) => ({ ...f, cardImage: file.name }));
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
              checked={form.isConstructionCard}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  isConstructionCard: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-outline-variant"
            />
            Construction Card
          </label>

          <div className="flex justify-end gap-3 border-t border-outline-variant pt-4">
            <Link
              to="/admin/cscs-cards"
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
              {isEdit ? "Save Changes" : "Save Card"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
