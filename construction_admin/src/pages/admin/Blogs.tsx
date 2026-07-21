import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react'
import AdminPageHeader from '@/components/AdminPageHeader'
import DataTable from '@/components/DataTable'
import { adminApi } from '@/lib/adminApi'
import { ApiError } from '@/lib/apiResponse'

export default function Blogs() {
  const navigate = useNavigate()
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminApi.getBlogs()
      setRows(data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load data.')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadData()
  }, [loadData])

  async function handleDelete(row: Record<string, unknown>) {
    const id = Number(row.id ?? row.Id ?? NaN)
    if (Number.isNaN(id)) return
    if (!window.confirm(`Delete "${String(row.title ?? row.Title ?? 'this blog')}"? This cannot be undone.`)) {
      return
    }
    setDeletingId(id)
    setError(null)
    try {
      await adminApi.deleteBlog(id)
      void loadData()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to delete blog.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Content Management"
        title="Blogs"
        subtitle="Manage, edit, and publish articles for the certification portal."
        actions={
          <>
            <button
              type="button"
              onClick={() => void loadData()}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/blogs/new')}
              className="flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2 text-sm font-medium text-on-primary shadow-sm transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add New
            </button>
          </>
        }
      />

      {error && (
        <div className="mb-6 rounded-lg bg-error-container px-4 py-3 text-sm text-on-error-container">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center rounded-xl border border-outline-variant bg-surface-container-lowest py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DataTable
          rows={rows}
          hiddenColumns={['blogContent', 'blogImage2', 'rownumber', 'totalRecords']}
          actions={(row) => {
            const id = Number(row.id ?? row.Id ?? NaN)
            const isDeleting = deletingId === id
            return (
              <>
                <button
                  type="button"
                  onClick={() => navigate(`/admin/blogs/${id}/edit`)}
                  className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(row)}
                  disabled={isDeleting}
                  className="rounded-lg p-2 text-error transition-colors hover:bg-error-container disabled:opacity-50"
                  title="Delete"
                >
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </button>
              </>
            )
          }}
        />
      )}
    </div>
  )
}
