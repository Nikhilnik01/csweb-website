import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Editor } from '@tinymce/tinymce-react'
import AdminPageHeader from '@/components/AdminPageHeader'
import { ADMIN_RESOURCES, type FieldConfig } from '@/lib/adminResources'
import { ApiError } from '@/lib/apiResponse'

interface Props {
  resourceKey: keyof typeof ADMIN_RESOURCES
}

type FormValues = Record<string, unknown>

function emptyValues(fields: FieldConfig[]): FormValues {
  const values: FormValues = {}
  for (const field of fields) {
    if (field.type === 'checkbox') values[field.key] = false
    else if (field.type === 'number') values[field.key] = ''
    else values[field.key] = ''
    if (field.deriveLabelKey) values[field.deriveLabelKey] = ''
  }
  return values
}

function toFormValues(row: Record<string, unknown>, fields: FieldConfig[]): FormValues {
  const values: FormValues = {}
  for (const field of fields) {
    const raw = row[field.key] ?? row[field.key.charAt(0).toUpperCase() + field.key.slice(1)]
    if (field.type === 'checkbox') {
      values[field.key] = Boolean(raw ?? false)
    } else if (field.type === 'number' || field.type === 'select') {
      values[field.key] = raw === null || raw === undefined ? '' : String(raw)
    } else {
      values[field.key] = raw === null || raw === undefined ? '' : String(raw)
    }
    if (field.deriveLabelKey) {
      const rawLabel =
        row[field.deriveLabelKey] ??
        row[field.deriveLabelKey.charAt(0).toUpperCase() + field.deriveLabelKey.slice(1)]
      values[field.deriveLabelKey] = rawLabel === null || rawLabel === undefined ? '' : String(rawLabel)
    }
  }
  return values
}

export default function AdminFormPage({ resourceKey }: Props) {
  const config = ADMIN_RESOURCES[resourceKey]
  const fields = config.fields ?? []
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const listPath = `/admin/${String(resourceKey)}`

  const [values, setValues] = useState<FormValues>(() => emptyValues(fields))
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [optionLists, setOptionLists] = useState<Record<string, Record<string, unknown>[]>>({})

  // Load dropdown option lists for any 'select' fields
  useEffect(() => {
    const selectFields = fields.filter((f) => f.type === 'select' && f.optionsResource)
    if (selectFields.length === 0) return
    let cancelled = false
    ;(async () => {
      const entries = await Promise.all(
        selectFields.map(async (f) => {
          const resource = ADMIN_RESOURCES[f.optionsResource as keyof typeof ADMIN_RESOURCES]
          try {
            const rows = await resource.fetch()
            return [f.key, rows] as const
          } catch {
            return [f.key, []] as const
          }
        }),
      )
      if (!cancelled) {
        setOptionLists(Object.fromEntries(entries))
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceKey])

  const loadRow = useCallback(
    async (rowId: number) => {
      setLoading(true)
      setError(null)
      try {
        const rows = await config.fetch(rowId)
        const row = rows.find((r) => Number(r.id ?? r.Id) === rowId) ?? rows[0]
        if (row) {
          setValues(toFormValues(row, fields))
        } else {
          setError('Record not found.')
        }
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Failed to load record.')
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resourceKey],
  )

  useEffect(() => {
    if (id) {
      void loadRow(Number(id))
    } else {
      setValues(emptyValues(fields))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, resourceKey])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!config.save) return
    setSaving(true)
    setError(null)
    try {
      const payload: FormValues = { ...values }
      if (isEdit && id) payload.id = Number(id)
      for (const field of fields) {
        if (field.type === 'number' || field.type === 'select') {
          payload[field.key] = payload[field.key] === '' ? null : Number(payload[field.key])
        }
      }
      await config.save(payload)
      navigate(listPath)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save the record.')
    } finally {
      setSaving(false)
    }
  }

  function renderField(field: FieldConfig) {
    const commonClass =
      'w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary'

    if (field.type === 'checkbox') {
      return (
        <label key={field.key} className="flex items-center gap-2 text-sm font-medium text-on-surface">
          <input
            type="checkbox"
            checked={Boolean(values[field.key])}
            onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.checked }))}
            className="h-4 w-4 rounded border-outline-variant"
          />
          {field.label}
        </label>
      )
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.key} className={field.fullWidth ? 'sm:col-span-2' : undefined}>
          <label className="mb-1 block text-sm font-medium text-on-surface">{field.label}</label>
          <textarea
            rows={3}
            required={field.required}
            placeholder={field.placeholder}
            value={String(values[field.key] ?? '')}
            onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
            className={commonClass}
          />
        </div>
      )
    }

    if (field.type === 'richtext') {
      return (
        <div key={field.key} className={field.fullWidth ? 'sm:col-span-2' : undefined}>
          <label className="mb-1 block text-sm font-medium text-on-surface">{field.label}</label>
          {/* Self-hosted TinyMCE — assets are served from /tinymce (see scripts/copy-tinymce.js) */}
          <Editor
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            licenseKey="gpl"
            value={String(values[field.key] ?? '')}
            onEditorChange={(content) => setValues((v) => ({ ...v, [field.key]: content }))}
            init={{
              height: 360,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'media',
                'table',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | bold italic underline forecolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | link image media table | code fullscreen | removeformat',
              content_style: 'body { font-family: Inter, system-ui, sans-serif; font-size: 14px }',
            }}
          />
        </div>
      )
    }

    if (field.type === 'select') {
      const options = optionLists[field.key] ?? []
      const valueKey = field.optionValueKey ?? 'id'
      const labelKey = field.optionLabelKey ?? 'id'
      return (
        <div key={field.key} className={field.fullWidth ? 'sm:col-span-2' : undefined}>
          <label className="mb-1 block text-sm font-medium text-on-surface">{field.label}</label>
          <select
            required={field.required}
            value={String(values[field.key] ?? '')}
            onChange={(e) => {
              const nextValue = e.target.value
              setValues((v) => {
                const next = { ...v, [field.key]: nextValue }
                if (field.deriveLabelKey) {
                  const selected = options.find((opt) => {
                    const optValue = String(
                      opt[valueKey] ?? opt[valueKey.charAt(0).toUpperCase() + valueKey.slice(1)] ?? '',
                    )
                    return optValue === nextValue
                  })
                  const optLabel = selected
                    ? String(
                        selected[labelKey] ??
                          selected[labelKey.charAt(0).toUpperCase() + labelKey.slice(1)] ??
                          '',
                      )
                    : ''
                  next[field.deriveLabelKey] = optLabel
                }
                return next
              })
            }}
            className={commonClass}
          >
            <option value="">Select {field.label}</option>
            {options.map((opt, idx) => {
              const optValue = String(opt[valueKey] ?? opt[valueKey.charAt(0).toUpperCase() + valueKey.slice(1)] ?? '')
              const optLabel = String(opt[labelKey] ?? opt[labelKey.charAt(0).toUpperCase() + labelKey.slice(1)] ?? optValue)
              return (
                <option key={idx} value={optValue}>
                  {optLabel}
                </option>
              )
            })}
          </select>
        </div>
      )
    }

    // text | number
    return (
      <div key={field.key} className={field.fullWidth ? 'sm:col-span-2' : undefined}>
        <label className="mb-1 block text-sm font-medium text-on-surface">{field.label}</label>
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          step={field.type === 'number' ? '0.01' : undefined}
          required={field.required}
          placeholder={field.placeholder}
          value={String(values[field.key] ?? '')}
          onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
          className={commonClass}
        />
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader
        breadcrumb={`${config.breadcrumb} / ${config.title}`}
        title={isEdit ? `Edit ${config.title.replace(/s$/, '')}` : `Add New ${config.title.replace(/s$/, '')}`}
        subtitle={isEdit ? 'Update the details below.' : `Add a new record to ${config.title}.`}
        actions={
          <Link
            to={listPath}
            className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {config.title}
          </Link>
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
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-outline-variant bg-surface-container-lowest p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.filter((f) => f.type !== 'checkbox').map(renderField)}
          </div>

          {fields.filter((f) => f.type === 'checkbox').map(renderField)}

          <div className="flex justify-end gap-3 border-t border-outline-variant pt-4">
            <Link
              to={listPath}
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
              {isEdit ? 'Save Changes' : 'Save & Add'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}