import {v1} from 'uuid';
import {FilterValuesType, TasksType, TaskType, ToDoListsType} from '../App';


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType

export const taskReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        }
        case 'ADD_TASK': {
            let newTask: TaskType = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {
                ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        default:
            throw new Error('Can\'t find this action type')
    }
}

export const removeTaskAC = (payload: { id: string, todolistId: string }) => {
    return {
        type: 'REMOVE_TASK',
        payload
    } as const
}


export const addTaskAC = (payload: { newTitle: string, todolistId: string }) => {
    return {
        type: 'ADD_TASK',
        payload
    } as const
}
