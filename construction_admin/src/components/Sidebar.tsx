import { NavLink } from 'react-router-dom'
import {  X, ShieldUser } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/navigation'
import { AUTH_USER_KEY, type AuthUser } from '@/lib/axios'

interface SidebarProps {
  isOpen: boolean
  isCollapsed: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, isCollapsed, onClose }: SidebarProps) {
  const storedUser = (() => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY)
      return raw ? (JSON.parse(raw) as AuthUser) : null
    } catch {
      return null
    }
  })()

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-on-surface/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          'fixed left-0 top-0 z-50 flex h-full flex-col border-r border-outline-variant bg-surface-container-low pt-[var(--spacing-navbar-height)] transition-all duration-300 dark:border-outline dark:bg-inverse-surface',
          isCollapsed ? 'w-[72px]' : 'w-[var(--spacing-sidebar-width)]',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-4 py-3 md:hidden">
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User profile block — stitch manage_blogs reference */}
        {!isCollapsed && storedUser && (
          <div className="mb-2 flex items-center gap-3 px-6 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-container text-on-primary">
              <ShieldUser className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-primary dark:text-primary-fixed-dim">
                {storedUser.userName}
              </p>
              <p className="truncate text-xs text-on-surface-variant">Certification Manager</p>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2 md:px-4 md:py-4">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-r-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                  isActive ? 'nav-link-active' : 'nav-link',
                ].join(' ')
              }
              onClick={onClose}
              title={isCollapsed ? label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
              {!isCollapsed && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {!isCollapsed && (
          <div className="border-t border-outline-variant p-4">
            <div className="rounded-lg bg-primary-container p-4 text-on-primary">
              <p className="mb-1 text-xs font-semibold uppercase opacity-80">System Health</p>
              <div className="flex items-center justify-between">
                <span className="font-bold">Operational</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-fixed" />
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
