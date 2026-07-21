import {
  LayoutDashboard,
  Newspaper,
  GraduationCap,
  BadgeCheck,
  CreditCard,
  Truck,
  PoundSterling,
  ClipboardCheck,
  Package,
  Receipt,
  RefreshCw,
  ScrollText,
  BarChart3,
  type LucideIcon,
  HardDrive,
} from 'lucide-react'

/** Sidebar navigation item derived from OpenAPI Admin endpoints */
export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Blogs', path: '/admin/blogs', icon: Newspaper },
  { label: 'Courses', path: '/admin/courses', icon: GraduationCap },
  { label: 'CSCS Cards', path: '/admin/cscs-cards', icon: BadgeCheck },
  { label: 'CPCS Modules', path: '/admin/cpcs-modules', icon: HardDrive },
  { label: 'Booking Card Types', path: '/admin/booking-card-types', icon: CreditCard },
  { label: 'Course Delivery Types', path: '/admin/course-delivery-types', icon: Truck },
  { label: 'Course Delivery Prices', path: '/admin/course-delivery-prices', icon: PoundSterling },
  { label: 'CITB Tests', path: '/admin/citb-tests', icon: ClipboardCheck },
  { label: 'Test Packages', path: '/admin/test-packages', icon: Package },
  { label: 'CITB Test Prices', path: '/admin/citb-test-prices', icon: Receipt },
  { label: 'CPCS Renewal Prices', path: '/admin/cpcs-renewal-prices', icon: RefreshCw },
  { label: 'Transaction Logs', path: '/admin/transaction-logs', icon: ScrollText },
  { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
]
