import {instance} from '../../../common/instance/instance';
import type {BaseResponse} from '../../../common/types';
import type {TodoList} from './todolistApi.types';

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodoList[]>('/todo-lists')
    },
    createTodolists(title: string) {
        return instance.post<BaseResponse<{ item: TodoList }>>('/todo-lists', {title})
    },
    deleteTodolists(id: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${id}`)
    },
    changeTodolistsTitle(id: string, title: string) {
        return instance.put<BaseResponse>(`/todo-lists/${id}`, {title})
    }
}