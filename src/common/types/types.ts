export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

export type FieldError = {
  error: string
  field: string
}
