import type { ReactNode } from 'react'

interface AdminPageHeaderProps {
  breadcrumb: string
  title: string
  subtitle?: string
  actions?: ReactNode
}

export default function AdminPageHeader({
  breadcrumb,
  title,
  subtitle,
  actions,
}: AdminPageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-1 text-sm font-medium text-on-surface-variant">{breadcrumb}</p>
        <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-on-surface-variant">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </header>
  )
}
