import api from '@/lib/axios'
import {
  assertApiSuccess,
  extractList,
  extractReportRows,
  type ApiEnvelope,
} from '@/lib/apiResponse'

type IdPayload = { id?: number | null }

/** Payload for POST /api/Admin/SaveBlog (multipart/form-data) */
export interface SaveBlogPayload {
  id?: number | null
  title: string
  blogDate: string
  blogBy: string
  blogContent: string
  isActive: boolean
  blogImageFile?: File | null
  blogImage1?: string | null
}

/** Payload for POST /api/Admin/SaveCourse (multipart/form-data) */
export interface SaveCoursePayload {
  id?: number | null
  courseName: string
  shortDescription: string
  longDescription: string
  courseImageFile?: File | null
  courseImage?: string | null
  isOnlineAvailable: boolean
  isClassroomAvailable: boolean
  validity: string
  durations: string
  times: string
  delivery: string
  certificate: string
}

/** Payload for POST /api/Admin/SaveCSCSCard (multipart/form-data) */
export interface SaveCscsCardPayload {
  id?: number | null
  cardName: string
  cardShortDescription: string
  cardDescription: string
  cardImageFile?: File | null
  cardImage?: string | null
  cardValid: string
  cardQualifications: string
  basePrice: number | null
  bookingFee: number | null
  totalPrice: number | null
  currency: string
  isConstructionCard: boolean
}

/** Payload for POST /api/Account/ChangePassword */
export interface ChangePasswordPayload {
  userName: string
  oldPassword: string
  newPassword: string
}

/** Query params for GET /api/Admin/Reports */
export interface ReportsQuery {
  from: string
  to: string
  pageNumber?: number
  pageSize?: number
  typeId?: number
  search?: string
}

async function postList(endpoint: string, body: Record<string, unknown> = {}): Promise<Record<string, unknown>[]> {
  const { data } = await api.post<ApiEnvelope>(endpoint, body)
  assertApiSuccess(data)
  return extractList(data.res)
}

async function getReport(endpoint: string, from: string, to: string): Promise<Record<string, unknown>[]> {
  const { data } = await api.get<ApiEnvelope>(endpoint, { params: { from, to } })
  assertApiSuccess(data)
  return extractReportRows(data.res)
}

async function getReportsPaged(query: ReportsQuery): Promise<Record<string, unknown>[]> {
  const { data } = await api.get<ApiEnvelope>('/api/Admin/Reports', {
    params: {
      pageNumber: query.pageNumber ?? 1,
      pageSize: query.pageSize ?? 10,
      typeId: query.typeId,
      from: query.from,
      to: query.to,
      search: query.search,
    },
  })
  assertApiSuccess(data)
  return extractReportRows(data.res)
}

async function changePassword(payload: ChangePasswordPayload): Promise<void> {
  const { data } = await api.post<ApiEnvelope>('/api/Account/ChangePassword', payload)
  assertApiSuccess(data)
}

async function saveBlog(payload: SaveBlogPayload): Promise<void> {
  const formData = new FormData()
  if (payload.id !== undefined && payload.id !== null) {
    formData.append('Id', String(payload.id))
  }
  formData.append('Title', payload.title)
  formData.append('BlogDate', payload.blogDate)
  formData.append('BlogBy', payload.blogBy)
  formData.append('BlogContent', payload.blogContent)
  formData.append('IsActive', String(payload.isActive))
   if (payload.blogImageFile) {
    formData.append('BlogImageFile', payload.blogImageFile)
  }
  if (payload.blogImage1) {
    formData.append('BlogImage1', payload.blogImage1)
  }

  const blogImage1 = payload.blogImage1 || payload.blogImageFile?.name || ''
  formData.append('BlogImage1', blogImage1)
  
  // Let the browser set the multipart boundary — do not force Content-Type here.
  const { data } = await api.post<ApiEnvelope>('/api/Admin/SaveBlog', formData)
  assertApiSuccess(data)
}

async function deleteBlog(id: number): Promise<void> {
  const { data } = await api.post<ApiEnvelope>(`/api/Admin/DeleteBlog/${id}`)
  assertApiSuccess(data)
}

async function saveCourse(payload: SaveCoursePayload): Promise<void> {
  const formData = new FormData()
  if (payload.id !== undefined && payload.id !== null) {
    formData.append('Id', String(payload.id))
  }
  formData.append('CourseName', payload.courseName)
  formData.append('ShortDescription', payload.shortDescription)
  formData.append('LongDescription', payload.longDescription)
  if (payload.courseImageFile) {
    formData.append('CourseImageFile', payload.courseImageFile)
  }

  const courseImage = payload.courseImage || payload.courseImageFile?.name || ''
  formData.append('CourseImage', courseImage)
  formData.append('IsOnlineAvailable', String(payload.isOnlineAvailable))
  formData.append('IsClassroomAvailable', String(payload.isClassroomAvailable))
  formData.append('Validity', payload.validity)
  formData.append('Durations', payload.durations)
  formData.append('Times', payload.times)
  formData.append('Delivery', payload.delivery)
  formData.append('Certificate', payload.certificate)

  // Let the browser set the multipart boundary — do not force Content-Type here.
  const { data } = await api.post<ApiEnvelope>('/api/Admin/SaveCourse', formData)
  assertApiSuccess(data)
}

async function deleteCourse(id: number): Promise<void> {
  const { data } = await api.post<ApiEnvelope>(`/api/Admin/DeleteCourse/${id}`)
  assertApiSuccess(data)
}

async function saveCscsCard(payload: SaveCscsCardPayload): Promise<void> {
  const formData = new FormData()
  if (payload.id !== undefined && payload.id !== null) {
    formData.append('Id', String(payload.id))
  }
  formData.append('CardName', payload.cardName)
  formData.append('CardShortDescription', payload.cardShortDescription)
  formData.append('CardDescription', payload.cardDescription)
  if (payload.cardImageFile) {
    formData.append('CardImageFile', payload.cardImageFile)
  }
  const cardImage = payload.cardImage || payload.cardImageFile?.name || ''
  formData.append('CardImage', cardImage)
  formData.append('CardValid', payload.cardValid)
  formData.append('CardQualifications', payload.cardQualifications)
  formData.append('BasePrice', String(payload.basePrice ?? 0))
  formData.append('BookingFee', String(payload.bookingFee ?? 0))
  formData.append('TotalPrice', String(payload.totalPrice ?? 0))
  formData.append('Currency', payload.currency)
  formData.append('IsConstructionCard', String(payload.isConstructionCard))

  // Let the browser set the multipart boundary — do not force Content-Type here.
  const { data } = await api.post<ApiEnvelope>('/api/Admin/SaveCSCSCard', formData)
  assertApiSuccess(data)
}

async function deleteCscsCard(id: number): Promise<void> {
  const { data } = await api.post<ApiEnvelope>(`/api/Admin/DeleteCSCSCard/${id}`)
  assertApiSuccess(data)
}

/** Generic helper for the plain-JSON Save/Delete pairs (CPCSModule, CourseDeliveryType, etc.) */
async function saveJson(endpoint: string, payload: Record<string, unknown>): Promise<void> {
  const { data } = await api.post<ApiEnvelope>(endpoint, payload)
  assertApiSuccess(data)
}

async function deleteById(endpoint: string, id: number): Promise<void> {
  const { data } = await api.post<ApiEnvelope>(`${endpoint}/${id}`)
  assertApiSuccess(data)
}

async function getDashboardSummary(): Promise<Record<string, unknown>> {
  const { data } = await api.get<ApiEnvelope>('/api/Admin/Dashboard')
  assertApiSuccess(data)
  return data.res ?? {}
}

export const adminApi = {
  getDashboard: () => getDashboardSummary(),
  getBlogs: (payload: IdPayload = {}) => postList('/api/Admin/GetBlogs', payload),
  saveBlog: (payload: SaveBlogPayload) => saveBlog(payload),
  deleteBlog: (id: number) => deleteBlog(id),

  getCourses: (payload: IdPayload = {}) => postList('/api/Admin/GetCourses', payload),
  saveCourse: (payload: SaveCoursePayload) => saveCourse(payload),
  deleteCourse: (id: number) => deleteCourse(id),

  getCscsCards: (payload: IdPayload = {}) => postList('/api/Admin/GetCSCSCards', payload),
  saveCscsCard: (payload: SaveCscsCardPayload) => saveCscsCard(payload),
  deleteCscsCard: (id: number) => deleteCscsCard(id),

  getCpcsModules: (payload: IdPayload = {}) => postList('/api/Admin/GetCPCSModules', payload),
  saveCpcsModule: (payload: Record<string, unknown>) => saveJson('/api/Admin/SaveCPCSModule', payload),
  deleteCpcsModule: (id: number) => deleteById('/api/Admin/DeleteCPCSModule', id),

  getBookingCardTypes: (payload: IdPayload = {}) => postList('/api/Admin/GetBookingCardTypes', payload),
  saveBookingCardType: (payload: Record<string, unknown>) =>
    saveJson('/api/Admin/SaveBookingCardType', payload),
  deleteBookingCardType: (id: number) => deleteById('/api/Admin/DeleteBookingCardType', id),

  getCourseDeliveryTypes: (payload: IdPayload = {}) => postList('/api/Admin/GetCourseDeliveryTypes', payload),
  saveCourseDeliveryType: (payload: Record<string, unknown>) =>
    saveJson('/api/Admin/SaveCourseDeliveryType', payload),
  deleteCourseDeliveryType: (id: number) => deleteById('/api/Admin/DeleteCourseDeliveryType', id),

  getCourseDeliveryPrices: (payload: Record<string, unknown> = {}) =>
    postList('/api/Admin/GetCourseDeliveryPrices', payload),
  saveCourseDeliveryPrice: (payload: Record<string, unknown>) =>
    saveJson('/api/Admin/SaveCourseDeliveryPrice', payload),
  deleteCourseDeliveryPrice: (id: number) => deleteById('/api/Admin/DeleteCourseDeliveryPrice', id),

  getCitbTests: (payload: IdPayload = {}) => postList('/api/Admin/GetCITBTests', payload),
  saveCitbTest: (payload: Record<string, unknown>) => saveJson('/api/Admin/SaveCITBTest', payload),
  deleteCitbTest: (id: number) => deleteById('/api/Admin/DeleteCITBTest', id),

  getTestPackages: (payload: IdPayload = {}) => postList('/api/Admin/GetTestPackages', payload),
  saveTestPackage: (payload: Record<string, unknown>) => saveJson('/api/Admin/SaveTestPackage', payload),
  deleteTestPackage: (id: number) => deleteById('/api/Admin/DeleteTestPackage', id),

  getCitbTestPrices: (payload: Record<string, unknown> = {}) =>
    postList('/api/Admin/GetCITBTestPrices', payload),
  saveCitbTestPrice: (payload: Record<string, unknown>) =>
    saveJson('/api/Admin/SaveCITBTestPrice', payload),
  deleteCitbTestPrice: (id: number) => deleteById('/api/Admin/DeleteCITBTestPrice', id),

  getCpcsRenewalPrices: (payload: IdPayload = {}) => postList('/api/Admin/GetCPCSRenewalPrices', payload),
  saveCpcsRenewalPrice: (payload: Record<string, unknown>) =>
    saveJson('/api/Admin/SaveCPCSRenewalPrice', payload),
  deleteCpcsRenewalPrice: (id: number) => deleteById('/api/Admin/DeleteCPCSRenewalPrice', id),

 getTransactionLogs: (from: string, to: string) =>
    getReport('/api/Admin/TransactionLogs', from, to),
  getReports: (query: ReportsQuery) => getReportsPaged(query),

  changePassword: (payload: ChangePasswordPayload) => changePassword(payload),
}