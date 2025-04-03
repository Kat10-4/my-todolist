import { instance } from "../../../common/instance"
import type { BaseResponse } from "../../../common/types"
import type { DomainTask, GetTasksResponse } from "./tasksApi.types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  // deleteTodolists(id: string) {
  //   return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  // },
  // changeTodolistsTitle(id: string, title: string) {
  //   return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  // },
}
