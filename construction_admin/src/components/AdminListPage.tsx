import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react'
import AdminPageHeader from '@/components/AdminPageHeader'
import DataTable from '@/components/DataTable'
import type { ADMIN_RESOURCES, AdminResourceConfig } from '@/lib/adminResources'
import { ApiError } from '@/lib/apiResponse'

interface AdminListPageProps {
  resourceKey: keyof typeof ADMIN_RESOURCES
  config: AdminResourceConfig
}

export default function AdminListPage({ resourceKey, config }: AdminListPageProps) {
  const navigate = useNavigate()
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await config.fetch()
      setRows(data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load data.')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [config])

  useEffect(() => {
    void loadData()
  }, [loadData])

  const idKey = config.idKey ?? 'id'
  const nameKey = config.nameKey

  async function handleDelete(row: Record<string, unknown>) {
    if (!config.delete) return
    const id = Number(row[idKey] ?? row.id ?? row.Id ?? NaN)
    if (Number.isNaN(id)) return
    const label = nameKey ? String(row[nameKey] ?? 'this record') : 'this record'
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return
    setDeletingId(id)
    setError(null)
    try {
      await config.delete(id)
      void loadData()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to delete record.')
    } finally {
      setDeletingId(null)
    }
  }

  const canManage = Boolean(config.save || config.editable || config.delete)
  const canAddEdit = Boolean(config.save || config.editable)

  return (
    <div>
      <AdminPageHeader
        breadcrumb={config.breadcrumb}
        title={config.title}
        subtitle={config.subtitle}
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
            {canAddEdit && (
              <button
                type="button"
                onClick={() => navigate(`/admin/${String(resourceKey)}/new`)}
                className="flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2 text-sm font-medium text-on-primary shadow-sm transition-opacity hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                Add New
              </button>
            )}
          </>
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
        <DataTable
          rows={rows}
          hiddenColumns={config.hiddenColumns}
          actions={
            canManage
              ? (row) => {
                  const id = Number(row[idKey] ?? row.id ?? row.Id ?? NaN)
                  const isDeleting = deletingId === id
                  return (
                    <>
                      {(config.save || config.editable) && (
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/${String(resourceKey)}/${id}/edit`)}
                          className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      {config.delete && (
                        <button
                          type="button"
                          onClick={() => void handleDelete(row)}
                          disabled={isDeleting}
                          className="rounded-lg p-2 text-error transition-colors hover:bg-error-container disabled:opacity-50"
                          title="Delete"
                        >
                          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </button>
                      )}
                    </>
                  )
                }
              : undefined
          }
        />
      )}
    </div>
  )
}
