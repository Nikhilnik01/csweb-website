import AdminListPage from '@/components/AdminListPage'
import { ADMIN_RESOURCES } from '@/lib/adminResources'

interface Props {
  resourceKey: keyof typeof ADMIN_RESOURCES
}

export default function AdminResourcePage({ resourceKey }: Props) {
  return <AdminListPage resourceKey={resourceKey} config={ADMIN_RESOURCES[resourceKey]} />
}
