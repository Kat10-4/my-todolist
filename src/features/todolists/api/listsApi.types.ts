import type { TaskStatus } from "../../../common/enums"

export type WPList = {
  id: string
  title: {
    rendered: string
  }
  date?: string
  modified?: string
  order?: number
  slug?:string
  parent?: number
  children:[]
  status?:string
  acf?: {
    status: TaskStatus
  }
}

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
