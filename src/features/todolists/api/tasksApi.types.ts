import type { TaskStatus } from "../../../common/enums/enums"

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  startDate: string
  deadline: string
}
