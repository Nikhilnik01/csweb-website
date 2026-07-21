import { adminApi } from '@/lib/adminApi'

export type FieldType = 'text' | 'textarea' | 'richtext' | 'number' | 'checkbox' | 'select'

export interface FieldConfig {
  /** camelCase key used in the form row / API payload */
  key: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  /** For type: 'select' — resource key whose list supplies the options */
  optionsResource?: keyof typeof ADMIN_RESOURCES
  /** For type: 'select' — key on the option row to use as the value (default 'id') */
  optionValueKey?: string
  /** For type: 'select' — key on the option row to use as the label */
  optionLabelKey?: string
  /**
   * For type: 'select' — when the server also requires the option's display
   * name as its own string field (e.g. SaveCourseDeliveryPrice wants both
   * deliveryTypeId AND deliveryTypes), set this to that field's key. The form
   * auto-fills it from the selected option's label on every change.
   */
  deriveLabelKey?: string
  /** Layout hint — how many of the 2-column grid this field should span */
  fullWidth?: boolean
}

export interface AdminResourceConfig {
  title: string
  subtitle: string
  breadcrumb: string
  fetch: (id?: number) => Promise<Record<string, unknown>[]>
  hiddenColumns?: string[]
  /** Key on each row that uniquely identifies it (default 'id') */
  idKey?: string
  /** Key on each row used to label the delete-confirmation prompt */
  nameKey?: string
  /** Form field schema — presence of this enables the generic Add/Edit page */
  fields?: FieldConfig[]
  /** Set when a resource has a bespoke (non-generic) Add/Edit page, e.g. CSCS Cards */
  editable?: boolean
  save?: (values: Record<string, unknown>) => Promise<void>
  delete?: (id: number) => Promise<void>
}

export const ADMIN_RESOURCES: Record<string, AdminResourceConfig> = {
  blogs: {
    title: 'Blogs',
    subtitle: 'Manage, edit, and publish articles for the certification portal.',
    breadcrumb: 'Content Management',
    fetch: (id) => adminApi.getBlogs(id ? { id } : {}),
    hiddenColumns: ['blogContent', 'blogImage2', 'rownumber', 'totalRecords'],
  },
  courses: {
    title: 'Courses',
    subtitle: 'Training catalogue — online and classroom certification courses.',
    breadcrumb: 'Training Catalogue',
    fetch: (id) => adminApi.getCourses(id ? { id } : {}),
    hiddenColumns: ['shortDescription', 'longDescription', 'rownumber', 'totalRecords'],
  },
  'cscs-cards': {
    title: 'CSCS Cards',
    subtitle: 'Manage CSCS card types and certification options.',
    breadcrumb: 'Certifications',
    fetch: (id) => adminApi.getCscsCards(id ? { id } : {}),
    hiddenColumns: ['cardDescription', 'cardShortDescription', 'cardQualifications', 'rownumber', 'totalRecords'],
    idKey: 'id',
    nameKey: 'cardName',
    editable: true,
    delete: (id) => adminApi.deleteCscsCard(id),
    // CSCS Cards keep their own dedicated form page (image upload + rich text), see CscsCardFormPage.tsx
  },
  'cpcs-modules': {
    title: 'CPCS Modules',
    subtitle: 'CPCS module catalogue and renewal modules.',
    breadcrumb: 'Certifications',
    fetch: (id) => adminApi.getCpcsModules(id ? { id } : {}),
    hiddenColumns: ['rownumber', 'totalRecords'],
    idKey: 'id',
    nameKey: 'moduleName',
    save: (values) => adminApi.saveCpcsModule(values),
    delete: (id) => adminApi.deleteCpcsModule(id),
    fields: [
      { key: 'moduleName', label: 'Module Name', type: 'text', required: true, fullWidth: true },
      { key: 'isActive', label: 'Active', type: 'checkbox' },
    ],
  },
  'booking-card-types': {
    title: 'Booking Card Types',
    subtitle: 'Configure card types available during booking.',
    breadcrumb: 'Bookings',
    fetch: (id) => adminApi.getBookingCardTypes(id ? { id } : {}),
    hiddenColumns: ['rownumber', 'totalRecords'],
    idKey: 'id',
    nameKey: 'cardType',
    save: (values) => adminApi.saveBookingCardType(values),
    delete: (id) => adminApi.deleteBookingCardType(id),
    fields: [
      { key: 'cardType', label: 'Card Type', type: 'text', required: true },
      { key: 'typeDescription', label: 'Description', type: 'textarea' },
      { key: 'isActive', label: 'Active', type: 'checkbox' },
    ],
  },
  'course-delivery-types': {
    title: 'Course Delivery Types',
    subtitle: 'Online, classroom, and blended delivery modes.',
    breadcrumb: 'Courses',
    fetch: (id) => adminApi.getCourseDeliveryTypes(id ? { id } : {}),
    hiddenColumns: ['rownumber', 'totalRecords'],
    idKey: 'id',
    nameKey: 'deliveryTypes',
    save: (values) => adminApi.saveCourseDeliveryType(values),
    delete: (id) => adminApi.deleteCourseDeliveryType(id),
    fields: [
      { key: 'deliveryTypes', label: 'Delivery Type', type: 'text', required: true, fullWidth: true },
      { key: 'isActive', label: 'Active', type: 'checkbox' },
    ],
  },
  'course-delivery-prices': {
    title: 'Course Delivery Prices',
    subtitle: 'Pricing matrix for course delivery options.',
    breadcrumb: 'Pricing',
    fetch: () => adminApi.getCourseDeliveryPrices(),
    hiddenColumns: ['rownumber', 'totalRecords'],
    idKey: 'id',
    save: (values) => adminApi.saveCourseDeliveryPrice(values),
    delete: (id) => adminApi.deleteCourseDeliveryPrice(id),
    fields: [
      {
        key: 'courseId',
        label: 'Course',
        type: 'select',
        required: true,
        optionsResource: 'courses',
        optionValueKey: 'id',
        optionLabelKey: 'courseName',
        deriveLabelKey: 'courseName',
      },
      {
        key: 'deliveryTypeId',
        label: 'Delivery Type',
        type: 'select',
        required: true,
        optionsResource: 'course-delivery-types',
        optionValueKey: 'id',
        optionLabelKey: 'deliveryTypes',
        deriveLabelKey: 'deliveryTypes',
      },
      { key: 'basePrice', label: 'Base Price', type: 'number' },
      { key: 'bookingFee', label: 'Booking Fee', type: 'number' },
      { key: 'totalPrice', label: 'Total Price', type: 'number' },
      { key: 'currency', label: 'Currency', type: 'text', placeholder: 'GBP' },
    ],
  },
  'citb-tests': {
    title: 'CITB Tests',
    subtitle: 'CITB health, safety and environment tests.',
    breadcrumb: 'Testing',
    fetch: (id) => adminApi.getCitbTests(id ? { id } : {}),
    hiddenColumns: ['rownumber', 'totalRecords'],
    idKey: 'id',
    nameKey: 'testName',
    save: (values) => adminApi.saveCitbTest(values),
    delete: (id) => adminApi.deleteCitbTest(id),
    fields: [
      { key: 'testName', label: 'Test Name', type: 'text', required: true, fullWidth: true },
      { key: 'isActive', label: 'Active', type: 'checkbox' },
    ],
  },
  'test-packages': {
    title: 'Test Packages',
    subtitle: 'Bundled test packages and combinations.',
    breadcrumb: 'Testing',
    fetch: (id) => adminApi.getTestPackages(id ? { id } : {}),
    hiddenColumns: ['rownumber', 'totalRecords'],
    idKey: 'id',
    nameKey: 'packageName',
    save: (values) => adminApi.saveTestPackage(values),
    delete: (id) => adminApi.deleteTestPackage(id),
    fields: [
      { key: 'packageName', label: 'Package Name', type: 'text', required: true },
      { key: 'shortDescription', label: 'Short Description', type: 'textarea' },
      { key: 'isActive', label: 'Active', type: 'checkbox' },
    ],
  },
  'citb-test-prices': {
    title: 'CITB Test Prices',
    subtitle: 'Pricing for CITB test packages.',
    breadcrumb: 'Pricing',
    fetch: () => adminApi.getCitbTestPrices(),
    hiddenColumns: ['rownumber', 'totalRecords'],
    idKey: 'id',
    save: (values) => adminApi.saveCitbTestPrice(values),
    delete: (id) => adminApi.deleteCitbTestPrice(id),
    fields: [
      {
        key: 'testPackageId',
        label: 'Test Package',
        type: 'select',
        required: true,
        optionsResource: 'test-packages',
        optionValueKey: 'id',
        optionLabelKey: 'packageName',
        deriveLabelKey: 'packageName',
      },
      { key: 'basePrice', label: 'Base Price', type: 'number' },
      { key: 'bookingFee', label: 'Booking Fee', type: 'number' },
      { key: 'totalPrice', label: 'Total Price', type: 'number' },
      { key: 'currency', label: 'Currency', type: 'text', placeholder: 'GBP' },
    ],
  },
  'cpcs-renewal-prices': {
    title: 'CPCS Renewal Prices',
    subtitle: 'Renewal pricing for CPCS certifications.',
    breadcrumb: 'Pricing',
    fetch: (id) => adminApi.getCpcsRenewalPrices(id ? { id } : {}),
    hiddenColumns: ['longDescription', 'rownumber', 'totalRecords'],
    idKey: 'id',
    nameKey: 'title',
    save: (values) => adminApi.saveCpcsRenewalPrice(values),
    delete: (id) => adminApi.deleteCpcsRenewalPrice(id),
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, fullWidth: true },
      { key: 'shortDescription', label: 'Short Description', type: 'textarea', fullWidth: true },
      { key: 'longDescription', label: 'Long Description', type: 'richtext', fullWidth: true },
      { key: 'basePrice5Module', label: 'Base Price (5 Module)', type: 'number' },
      { key: 'bookingFee5Module', label: 'Booking Fee (5 Module)', type: 'number' },
      { key: 'totalPrice5Module', label: 'Total Price (5 Module)', type: 'number' },
      { key: 'basePrice10Module', label: 'Base Price (10 Module)', type: 'number' },
      { key: 'bookingFee10Module', label: 'Booking Fee (10 Module)', type: 'number' },
      { key: 'totalPrice10Module', label: 'Total Price (10 Module)', type: 'number' },
    ],
  },
}