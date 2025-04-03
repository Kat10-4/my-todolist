import { instance } from "../../../common/instance"
import type { BaseResponse } from "../../../common/types"
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"

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
  changeTaskStatus(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
