import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import AdminPageHeader from "@/components/AdminPageHeader";
import DataTable from "@/components/DataTable";
import { adminApi } from "@/lib/adminApi";
import { ApiError } from "@/lib/apiResponse";

function defaultDateRange() {
  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - 1);
  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
}

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const TYPE_ID_OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: "Course" },
  { value: 2, label: "CSCS Card" },
  { value: 3, label: "CITB Test" },
  { value: 4, label: "CPCS" },
];

interface PaginationBarProps {
  pageNumber: number;
  totalPages: number | null;
  totalRecords: number | null;
  disablePrev: boolean;
  disableNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPageSelect: (page: number) => void;
}

function PaginationBar({
  pageNumber,
  totalPages,
  totalRecords,
  disablePrev,
  disableNext,
  onPrev,
  onNext,
  onPageSelect,
}: PaginationBarProps) {
  const visiblePages = totalPages
    ? Array.from({ length: totalPages }, (_, i) => i + 1).slice(
        Math.max(0, pageNumber - 3),
        Math.min(totalPages, pageNumber + 2),
      )
    : [];

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-on-surface-variant">
        Page {pageNumber}
        {totalPages ? ` of ${totalPages}` : ""}
        {totalRecords !== null
          ? ` • ${totalRecords} total record${totalRecords === 1 ? "" : "s"}`
          : ""}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={disablePrev}
          onClick={onPrev}
          className="flex items-center gap-1 rounded-lg border border-outline-variant px-3 py-2 text-sm hover:bg-surface-container-high disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageSelect(page)}
            className={`h-10 min-w-[40px] rounded-lg border text-sm font-medium transition ${
              page === pageNumber
                ? "border-primary bg-primary text-white"
                : "border-outline-variant hover:bg-surface-container-high"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={disableNext}
          onClick={onNext}
          className="flex items-center gap-1 rounded-lg border border-outline-variant px-3 py-2 text-sm hover:bg-surface-container-high disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

interface DateRangePageProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
  fetch: (from: string, to: string) => Promise<Record<string, unknown>[]>;
}

/**
 * Generic date-range report page. The backing endpoints (e.g. /TransactionLogs)
 * return the full result set for the selected range with no server-side paging
 * support, so pagination here is done client-side over the fetched rows.
 */
function DateRangePage({
  title,
  subtitle,
  breadcrumb,
  fetch,
}: DateRangePageProps) {
  const [range, setRange] = useState(defaultDateRange);
  const [allRows, setAllRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetch(
        `${range.from}T00:00:00`,
        `${range.to}T23:59:59`,
      );
      setAllRows(data);
      setPageNumber(1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load data.");
      setAllRows([]);
    } finally {
      setLoading(false);
    }
  }, [fetch, range.from, range.to]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  // Search runs client-side over whatever the date range already returned —
  // matches any value across every column, case-insensitive.
  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allRows;
    return allRows.filter((row) =>
      Object.values(row).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          String(value).toLowerCase().includes(term),
      ),
    );
  }, [allRows, search]);

  useEffect(() => {
    setPageNumber(1);
  }, [search]);

  const totalRecords = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  // Clamp pageNumber if pageSize/search changes and pushes it out of range.
  useEffect(() => {
    setPageNumber((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const pagedRows = useMemo(() => {
    const start = (pageNumber - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, pageNumber, pageSize]);

  return (
    <div>
      <AdminPageHeader
        breadcrumb={breadcrumb}
        title={title}
        subtitle={subtitle}
        actions={
          <button
            type="button"
            onClick={() => void loadData()}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        }
      />

      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
        <div>
          <label
            htmlFor="from"
            className="mb-1 block text-xs font-semibold uppercase text-on-surface-variant"
          >
            From
          </label>
          <input
            id="from"
            type="date"
            value={range.from}
            onChange={(e) =>
              setRange((prev) => ({ ...prev, from: e.target.value }))
            }
            className="h-10 rounded-lg border border-outline-variant bg-surface-bright px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label
            htmlFor="to"
            className="mb-1 block text-xs font-semibold uppercase text-on-surface-variant"
          >
            To
          </label>
          <input
            id="to"
            type="date"
            value={range.to}
            onChange={(e) =>
              setRange((prev) => ({ ...prev, to: e.target.value }))
            }
            className="h-10 rounded-lg border border-outline-variant bg-surface-bright px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="min-w-[200px] flex-1">
          <label
            htmlFor="txn-search"
            className="mb-1 block text-xs font-semibold uppercase text-on-surface-variant"
          >
            Search
          </label>
          <input
            id="txn-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Order ID, session ID, status…"
            className="h-10 w-full rounded-lg border border-outline-variant bg-surface-bright px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label
            htmlFor="pageSize"
            className="mb-1 block text-xs font-semibold uppercase text-on-surface-variant"
          >
            Page Size
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNumber(1);
            }}
            className="h-10 rounded-lg border border-outline-variant bg-surface-bright px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => void loadData()}
          className="h-10 rounded-lg bg-primary-container px-5 text-sm font-medium text-on-primary hover:opacity-90"
        >
          Apply
        </button>
      </div>

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
        <>
          <DataTable
            rows={pagedRows}
            hiddenColumns={[
              "typeId",
              "TypeId",
              "typeID",
              "TypeID",
              "statusId",
              "StatusId",
              "statusID",
              "StatusID",
              "transactionCharge",
              "TransactionCharge",
            ]}
          />
          {totalRecords > 0 && (
            <PaginationBar
              pageNumber={pageNumber}
              totalPages={totalPages}
              totalRecords={totalRecords}
              disablePrev={pageNumber <= 1}
              disableNext={pageNumber >= totalPages}
              onPrev={() => setPageNumber((p) => Math.max(1, p - 1))}
              onNext={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
              onPageSelect={setPageNumber}
            />
          )}

          {totalRecords === 0 && allRows.length > 0 && (
            <p className="mt-6 text-center text-sm text-on-surface-variant">
              No transactions match “{search}”.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export function TransactionLogsPage() {
  return (
    <DateRangePage
      breadcrumb="Finance"
      title="Transaction Logs"
      subtitle="Payment and booking transaction history."
      fetch={adminApi.getTransactionLogs}
    />
  );
}

/**
 * Reports page — wired to GET /api/Admin/Reports, which supports pageNumber,
 * pageSize, typeId, from, to and search.
 */
// Fetches up to this many matching rows per range/search/typeId in one shot so
// the full page count is known immediately (numbered pagination shows 1,2,3…
// right away instead of growing as you page forward). Raise this if a single
// date range + search can realistically match more rows than this.
const REPORTS_FETCH_SIZE = 1000;

export function ReportsPage() {
  const [range, setRange] = useState(defaultDateRange);
  const [search, setSearch] = useState("");
  const [typeId, setTypeId] = useState<number | "">("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [allRows, setAllRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getReports({
        from: `${range.from}T00:00:00`,
        to: `${range.to}T23:59:59`,
        pageNumber: 1,
        pageSize: REPORTS_FETCH_SIZE,
        search: search.trim() || undefined,
        typeId: typeId === "" ? undefined : typeId,
      });
      setAllRows(data);
      setPageNumber(1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load data.");
      setAllRows([]);
    } finally {
      setLoading(false);
    }
  }, [range.from, range.to, search, typeId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  function applyFilters() {
    void loadData();
  }

  const totalRecords = allRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  // Clamp pageNumber if pageSize changes and pushes it out of range.
  useEffect(() => {
    setPageNumber((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const rows = useMemo(() => {
    const start = (pageNumber - 1) * pageSize;
    return allRows.slice(start, start + pageSize);
  }, [allRows, pageNumber, pageSize]);

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Analytics"
        title="Reports"
        subtitle="Revenue, bookings, and certification analytics."
        actions={
          <button
            type="button"
            onClick={() => void loadData()}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        }
      />

      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
        <div>
          <label
            htmlFor="from"
            className="mb-1 block text-xs font-semibold uppercase text-on-surface-variant"
          >
            From
          </label>
          <input
            id="from"
            type="date"
            value={range.from}
            onChange={(e) =>
              setRange((prev) => ({ ...prev, from: e.target.value }))
            }
            className="h-10 rounded-lg border border-outline-variant bg-surface-bright px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label
            htmlFor="to"
            className="mb-1 block text-xs font-semibold uppercase text-on-surface-variant"
          >
            To
          </label>
          <input
            id="to"
            type="date"
            value={range.to}
            onChange={(e) =>
              setRange((prev) => ({ ...prev, to: e.target.value }))
            }
            className="h-10 rounded-lg border border-outline-variant bg-surface-bright px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label
            htmlFor="typeId"
            className="mb-1 block text-xs font-semibold uppercase text-on-surface-variant"
          >
            Type
          </label>
          <select
            id="typeId"
            value={typeId}
            onChange={(e) => {
              const val = e.target.value;
              setTypeId(val === "" ? "" : Number(val));
              setPageNumber(1);
            }}
            className="h-10 rounded-lg border border-outline-variant bg-surface-bright px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Types</option>
            {TYPE_ID_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[200px] flex-1">
          <label
            htmlFor="search"
            className="mb-1 block text-xs font-semibold uppercase text-on-surface-variant"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, email, reference…"
            className="h-10 w-full rounded-lg border border-outline-variant bg-surface-bright px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label
            htmlFor="pageSize"
            className="mb-1 block text-xs font-semibold uppercase text-on-surface-variant"
          >
            Page Size
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNumber(1);
            }}
            className="h-10 rounded-lg border border-outline-variant bg-surface-bright px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={applyFilters}
          className="h-10 rounded-lg bg-primary-container px-5 text-sm font-medium text-on-primary hover:opacity-90"
        >
          Apply
        </button>
      </div>

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
        <>
          <DataTable
            rows={rows}
            hiddenColumns={[
              "totalRecords",
              "TotalRecords",
              "typeId",
              "TypeId",
              "typeID",
              "TypeID",
              "statusId",
              "StatusId",
              "statusID",
              "StatusID",
              "transactionCharge",
              "TransactionCharge",
            ]}
          />

          {totalRecords > 0 && (
            <PaginationBar
              pageNumber={pageNumber}
              totalPages={totalPages}
              totalRecords={totalRecords}
              disablePrev={pageNumber <= 1}
              disableNext={pageNumber >= totalPages}
              onPrev={() => setPageNumber((p) => Math.max(1, p - 1))}
              onNext={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
              onPageSelect={setPageNumber}
            />
          )}
        </>
      )}
    </div>
  );
}