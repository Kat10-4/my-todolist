export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  children:[]
}

export type FieldError = {
  error: string
  field: string
}
