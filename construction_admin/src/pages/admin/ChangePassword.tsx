import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import AdminPageHeader from '@/components/AdminPageHeader'
import { adminApi } from '@/lib/adminApi'
import { ApiError } from '@/lib/apiResponse'
import { AUTH_USER_KEY, type AuthUser } from '@/lib/axios'

function currentUserName(): string {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY)
    const user = raw ? (JSON.parse(raw) as AuthUser) : null
    return user?.userName ?? ''
  } catch {
    return ''
  }
}

export default function ChangePassword() {
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.')
      return
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.')
      return
    }

    setSaving(true)
    try {
      await adminApi.changePassword({
        userName: currentUserName(),
        oldPassword,
        newPassword,
      })
      setSuccess(true)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to change password.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Account"
        title="Change Password"
        subtitle="Update the password used to sign in to the admin panel."
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-md space-y-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-6"
      >
        {error && (
          <div className="rounded-lg bg-error-container px-4 py-3 text-sm text-on-error-container">{error}</div>
        )}
        {success && (
          <div className="rounded-lg bg-primary-container px-4 py-3 text-sm text-on-primary">
            Password changed successfully.
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-on-surface">Current Password</label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-on-surface">New Password</label>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-on-surface">Confirm New Password</label>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-outline-variant pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2 text-sm font-medium text-on-primary shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Update Password
          </button>
        </div>
      </form>
    </div>
  )
}
