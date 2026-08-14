import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CalendarDays,
  PoundSterling,
  BookOpen,
  ShieldCheck,
  Download,
  Plus,
  ClipboardCheck,
  Loader2,
  Activity,
  Users,
  TrendingUp,
  RefreshCw,
} from 'lucide-react'
import AdminPageHeader from '@/components/AdminPageHeader'
import DataTable from '@/components/DataTable'
import { adminApi } from '@/lib/adminApi'
import { ApiError } from '@/lib/apiResponse'

const KPI_ICONS = [CalendarDays, PoundSterling, BookOpen, ShieldCheck, ClipboardCheck, Users, TrendingUp, Activity]


// Maps a KPI card's data key to the admin route it should open.
// Keys are matched case-insensitively against the field name returned by the Dashboard API.
// Add/adjust entries here as new KPI fields or routes are introduced.
const KPI_ROUTES: Record<string, string> = {
  coursebookings: '/admin/reports',
  cscsbookings: '/admin/cscs-cards',
  cpcsbookings: '/admin/cpcs-modules',
  citbbookings: '/admin/citb-tests',
  bookingcardtypes: '/admin/booking-card-types',
}


function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

function formatValue(value: unknown): string {
  if (typeof value === 'number') {
    return value % 1 === 0 ? value.toLocaleString() : value.toFixed(2)
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return String(value ?? '—')
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [summary, setSummary] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const loadSummary = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminApi.getDashboard()
      setSummary(data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load dashboard data.')
      setSummary(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSummary()
  }, [loadSummary])

  // Auto-dismiss toast notifications
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const showToast = useCallback((message: string) => {
    setToast(message)
  }, [])

  const handleExportReport = useCallback(() => {
    if (!summary) {
      showToast('Nothing to export yet — data still loading.')
      return
    }
    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dashboard-report-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    showToast('Report exported.')
  }, [summary, showToast])

  const handleNewBooking = useCallback(() => {
    showToast('New Booking flow coming soon.')
  }, [showToast])


  const handleKpiClick = useCallback(
    (key: string, value: unknown) => {
      const route = KPI_ROUTES[key.toLowerCase()]
      if (route) {
        navigate(route)
      } else {
        showToast(`${formatLabel(key)}: ${formatValue(value)}`)
      }
    },
    [navigate, showToast],
  )

  const kpiEntries = summary
    ? Object.entries(summary).filter(
        ([, v]) => typeof v === 'number' || typeof v === 'string' || typeof v === 'boolean',
      )
    : []

  const listEntries = summary
    ? Object.entries(summary).filter(
        ([, v]) => Array.isArray(v) && v.length > 0 && typeof v[0] === 'object' && v[0] !== null,
      )
    : []

  const hasLiveData = kpiEntries.length > 0 || listEntries.length > 0

  return (
    <div className="relative">
      {toast && (
        <div className="fixed right-6 top-6 z-50 rounded-lg bg-surface-container-high px-4 py-3 text-sm font-medium text-on-surface shadow-lg">
          {toast}
        </div>
      )}

      <AdminPageHeader
        breadcrumb="Management Console"
        title="Overview Dashboard"
        actions={
          <>
            <button
              type="button"
              onClick={() => void loadSummary()}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleExportReport}
              className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
            >
              <Download className="h-4 w-4" />
              Export Report
            </button>
            <button
              type="button"
              onClick={handleNewBooking}
              className="flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2 text-sm font-medium text-on-primary shadow-sm transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              New Booking
            </button>
          </>
        }
      />

      {error && (
        <div className="mb-6 rounded-lg bg-error-container px-4 py-3 text-sm text-on-error-container">
          {error} — showing sample layout below until the API responds.
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center rounded-xl border border-outline-variant bg-surface-container-lowest py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* KPI cards — live from GET /api/Admin/Dashboard when available */}
          {hasLiveData ? (
            <div className="mb-8 grid grid-cols-1 gap-[var(--spacing-grid-gap)] sm:grid-cols-2 xl:grid-cols-4">
              {kpiEntries.map(([key, value], i) => {
                const Icon = KPI_ICONS[i % KPI_ICONS.length]
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleKpiClick(key, value)}
                    className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-6 text-left transition-shadow hover:shadow-md hover:border-primary cursor-pointer"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-lg bg-surface-container-low p-2 text-primary">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-on-surface-variant">{formatLabel(key)}</p>
                      <h3 className="text-3xl font-bold text-primary">{formatValue(value)}</h3>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="mb-8 rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-6 text-sm text-on-surface-variant">
              <span className="font-medium text-on-surface">No summary data yet.</span> The Dashboard API
              connected successfully but hasn't returned any fields to display. Sample layout shown below.
            </div>
          )}

          {/* Live data tables — one per array field returned by the API */}
          {listEntries.map(([key, rows]) => (
            <section key={key} className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-primary">{formatLabel(key)}</h3>
              <DataTable rows={rows as Record<string, unknown>[]} />
            </section>
          ))}


        </>
      )}
    </div>
  )
}