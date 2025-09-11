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
