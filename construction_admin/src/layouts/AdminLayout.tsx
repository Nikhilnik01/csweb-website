import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onMenuClick={() => setMobileOpen(true)}
        isSidebarCollapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />

      <Sidebar
        isOpen={mobileOpen}
        isCollapsed={collapsed}
        onClose={() => setMobileOpen(false)}
      />

      <main
        className={[
          'min-h-screen bg-background pt-[var(--spacing-navbar-height)] transition-[margin-left] duration-300',
          collapsed ? 'md:ml-[72px]' : 'md:ml-[var(--spacing-sidebar-width)]',
        ].join(' ')}
      >
        <div className="px-4 py-[var(--spacing-gutter)] md:px-[var(--spacing-container-padding)]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
