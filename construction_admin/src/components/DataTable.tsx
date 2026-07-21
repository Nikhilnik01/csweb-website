import { useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

const DEFAULT_HIDDEN = new Set(["rownumber", "totalRecords"]);

function normalizeRows(
  rows: Record<string, unknown>[],
): Record<string, unknown>[] {
  return rows.map((row) => {
    const keys = Object.keys(row);
    // Detect the {metric, value} wrapper shape (case-insensitive)
    const lowerKeys = keys.map((k) => k.toLowerCase());
    const hasMetricValueShape =
      keys.length <= 3 &&
      lowerKeys.includes("value") &&
      typeof row[keys[lowerKeys.indexOf("value")]] === "string";

    if (!hasMetricValueShape) return row;

    const valueKey = keys[lowerKeys.indexOf("value")];
    const rawValue = row[valueKey] as string;

    try {
      const parsed = JSON.parse(rawValue);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      // not JSON, leave as-is
    }
    return row;
  });
}

function formatHeader(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function formatCell(value: unknown, key?: string): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  const text = String(value);

  if (key?.toLowerCase() === "sessionid" && text.length > 20) {
    return `${text.slice(0, 10)}…${text.slice(-6)}`;
  }

  if (text.length > 120) return `${text.slice(0, 120)}…`;
  return text;
}

function isActiveColumn(key: string): boolean {
  return key.toLowerCase() === "isactive" || key.toLowerCase() === "status";
}

function isSessionIdColumn(key: string): boolean {
  return key.toLowerCase() === "sessionid";
}

function isImageColumn(key: string, value: unknown): boolean {
  const lowerKey = key.toLowerCase();
  const isImageKeyName =
    lowerKey.includes("image") ||
    lowerKey.includes("photo") ||
    lowerKey.includes("logo");

  // If the key name itself signals an image column, treat it as one
  // regardless of the current value (it may be null/empty on this row).
  if (isImageKeyName) return true;

  if (typeof value !== "string") return false;
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value.toLowerCase());
}

function getRowKey(row: Record<string, unknown>, fallbackIndex: number): string {
  const keys = Object.keys(row);
  const idKey = keys.find((k) => k.toLowerCase() === "id");
  if (idKey && row[idKey] != null) return String(row[idKey]);
  return `idx:${fallbackIndex}`;
}

interface CopyableCellProps {
  value: string;
  cellKey: string;
}

function CopyableCell({ value, cellKey }: CopyableCellProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for environments without Clipboard API access
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-on-surface" title={value}>
        {formatCell(value, "sessionid")}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy Session Id"}
        aria-label="Copy Session Id"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container-high"
        key={cellKey}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-secondary" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

interface DataTableProps {
  rows: Record<string, unknown>[];
  hiddenColumns?: string[];
  actions?: (row: Record<string, unknown>) => ReactNode;
}

export default function DataTable({
  rows: rawRows,
  hiddenColumns = [],
  actions,
}: DataTableProps) {
  const rows = normalizeRows(rawRows);
  const imageCacheRef = useRef<Record<string, string>>({});

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-12 text-center">
        <p className="text-on-surface-variant">No records found.</p>
      </div>
    );
  }

  const hidden = new Set([...DEFAULT_HIDDEN, ...hiddenColumns]);
  const columns = Object.keys(rows[0]).filter((key) => !hidden.has(key));

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
                >
                  {formatHeader(col)}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-outline-variant/60 transition-colors last:border-0 hover:bg-surface-container-low/50"
              >
                {columns.map((col) => {
                  const value = row[col];

                  // Active / Status column
                  if (isActiveColumn(col) && typeof value === "boolean") {
                    return (
                      <td key={col} className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                            value
                              ? "bg-secondary-container/30 text-on-secondary-container dark:bg-secondary-fixed/20 dark:text-secondary-fixed-dim"
                              : "bg-error-container text-on-error-container dark:bg-error/20 dark:text-error"
                          }`}
                        >
                          {value ? "Active" : "Inactive"}
                        </span>
                      </td>
                    );
                  }

                  // Session Id column — truncated text + copy-to-clipboard button
                  if (
                    isSessionIdColumn(col) &&
                    value !== null &&
                    value !== undefined &&
                    typeof value !== "object"
                  ) {
                    return (
                      <td key={col} className="px-4 py-3">
                        <CopyableCell
                          value={String(value)}
                          cellKey={`${getRowKey(row, rowIndex)}::${col}`}
                        />
                      </td>
                    );
                  }

                  // Image column
                  if (isImageColumn(col, value)) {
                    const cacheKey = `${getRowKey(row, rowIndex)}::${col}`;
                    const hasValue =
                      typeof value === "string" && value.trim().length > 0;

                    if (hasValue) {
                      imageCacheRef.current[cacheKey] = value;
                    }

                    const displayValue = hasValue
                      ? value
                      : imageCacheRef.current[cacheKey];

                    return (
                      <td key={col} className="px-4 py-3">
                        <div className="flex h-8 w-12 items-center justify-center overflow-hidden rounded-md border border-outline-variant bg-surface-container-low">
                          {displayValue ? (
                            <img
                              src={displayValue.replace("http://", "https://")}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://placehold.co/80x80?text=No+Image";
                              }}
                            />
                          ) : (
                            <span className="text-[10px] text-on-surface-variant">
                              —
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  }

                  // Normal text
                  return (
                    <td
                      key={col}
                      className="max-w-xs px-4 py-3 text-on-surface"
                    >
                      {formatCell(value, col)}
                    </td>
                  );
                })}
                {actions && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-outline-variant px-4 py-3 text-xs text-on-surface-variant">
        {rows.length} record{rows.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}