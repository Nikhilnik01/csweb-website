/** Standard ConstructionApi envelope */
export interface ApiEnvelope<TRes = Record<string, unknown>> {
  rs?: number
  rm?: string
  res?: TRes
  rc?: unknown[]
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

/** Throw when rs !== 1 or rc[] has entries */
export function assertApiSuccess(data: ApiEnvelope): void {
  if (data.rc && data.rc.length > 0) {
    throw new ApiError('The server returned an error for this request.')
  }
  if (data.rs !== undefined && data.rs !== 1) {
    throw new ApiError(data.rm ?? 'Request failed.')
  }
}

/** Pull the first list array from res (lists, courseLists, etc.) */
export function extractList(res: Record<string, unknown> | undefined): Record<string, unknown>[] {
  if (!res) return []

  if (Array.isArray(res.lists)) {
    return res.lists as Record<string, unknown>[]
  }

  for (const [key, value] of Object.entries(res)) {
    if (Array.isArray(value) && key.toLowerCase().includes('list')) {
      return value as Record<string, unknown>[]
    }
  }

  for (const value of Object.values(res)) {
    if (Array.isArray(value)) {
      return value as Record<string, unknown>[]
    }
  }

  return []
}

/** Flatten res object into table rows when response is key-value report data */
export function extractReportRows(res: Record<string, unknown> | undefined): Record<string, unknown>[] {
  if (!res) return []

  const list = extractList(res)
  if (list.length > 0) return list

  return Object.entries(res).map(([key, value]) => ({
    metric: key,
    value: typeof value === 'object' ? JSON.stringify(value) : value,
  }))
}
