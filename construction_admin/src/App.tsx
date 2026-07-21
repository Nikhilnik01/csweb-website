import { Navigate, Route, Routes } from 'react-router-dom'
import { AUTH_TOKEN_KEY } from '@/lib/axios'
import AdminLayout from '@/layouts/AdminLayout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/admin/Dashboard'
import Blogs from '@/pages/admin/Blogs'
import BlogFormPage from '@/pages/admin/BlogFormPage'
import Courses from '@/pages/admin/Courses'
import CourseFormPage from '@/pages/admin/CourseFormPage'
import AdminResourcePage from '@/pages/admin/AdminResourcePage'
import AdminFormPage from '@/pages/admin/AdminFormPage'
import CscsCardFormPage from '@/pages/admin/CscsCardFormPage'
import ChangePassword from '@/pages/admin/ChangePassword'
import { ReportsPage, TransactionLogsPage } from '@/pages/admin/ReportsPages'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/new" element={<BlogFormPage />} />
        <Route path="blogs/:id/edit" element={<BlogFormPage />} />

        <Route path="courses" element={<Courses />} />
        <Route path="courses/new" element={<CourseFormPage />} />
        <Route path="courses/:id/edit" element={<CourseFormPage />} />

        <Route path="cscs-cards" element={<AdminResourcePage resourceKey="cscs-cards" />} />
        <Route path="cscs-cards/new" element={<CscsCardFormPage />} />
        <Route path="cscs-cards/:id/edit" element={<CscsCardFormPage />} />

        <Route path="cpcs-modules" element={<AdminResourcePage resourceKey="cpcs-modules" />} />
        <Route path="cpcs-modules/new" element={<AdminFormPage resourceKey="cpcs-modules" />} />
        <Route path="cpcs-modules/:id/edit" element={<AdminFormPage resourceKey="cpcs-modules" />} />

        <Route
          path="booking-card-types"
          element={<AdminResourcePage resourceKey="booking-card-types" />}
        />
        <Route path="booking-card-types/new" element={<AdminFormPage resourceKey="booking-card-types" />} />
        <Route
          path="booking-card-types/:id/edit"
          element={<AdminFormPage resourceKey="booking-card-types" />}
        />

        <Route
          path="course-delivery-types"
          element={<AdminResourcePage resourceKey="course-delivery-types" />}
        />
        <Route
          path="course-delivery-types/new"
          element={<AdminFormPage resourceKey="course-delivery-types" />}
        />
        <Route
          path="course-delivery-types/:id/edit"
          element={<AdminFormPage resourceKey="course-delivery-types" />}
        />

        <Route
          path="course-delivery-prices"
          element={<AdminResourcePage resourceKey="course-delivery-prices" />}
        />
        <Route
          path="course-delivery-prices/new"
          element={<AdminFormPage resourceKey="course-delivery-prices" />}
        />
        <Route
          path="course-delivery-prices/:id/edit"
          element={<AdminFormPage resourceKey="course-delivery-prices" />}
        />

        <Route path="citb-tests" element={<AdminResourcePage resourceKey="citb-tests" />} />
        <Route path="citb-tests/new" element={<AdminFormPage resourceKey="citb-tests" />} />
        <Route path="citb-tests/:id/edit" element={<AdminFormPage resourceKey="citb-tests" />} />

        <Route path="test-packages" element={<AdminResourcePage resourceKey="test-packages" />} />
        <Route path="test-packages/new" element={<AdminFormPage resourceKey="test-packages" />} />
        <Route path="test-packages/:id/edit" element={<AdminFormPage resourceKey="test-packages" />} />

        <Route path="citb-test-prices" element={<AdminResourcePage resourceKey="citb-test-prices" />} />
        <Route path="citb-test-prices/new" element={<AdminFormPage resourceKey="citb-test-prices" />} />
        <Route
          path="citb-test-prices/:id/edit"
          element={<AdminFormPage resourceKey="citb-test-prices" />}
        />

        <Route
          path="cpcs-renewal-prices"
          element={<AdminResourcePage resourceKey="cpcs-renewal-prices" />}
        />
        <Route
          path="cpcs-renewal-prices/new"
          element={<AdminFormPage resourceKey="cpcs-renewal-prices" />}
        />
        <Route
          path="cpcs-renewal-prices/:id/edit"
          element={<AdminFormPage resourceKey="cpcs-renewal-prices" />}
        />

        <Route path="transaction-logs" element={<TransactionLogsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>

      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  )
}
