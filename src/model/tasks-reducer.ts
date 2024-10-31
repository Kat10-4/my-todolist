import {v1} from 'uuid';
import {FilterValuesType, TasksType, TaskType, ToDoListsType} from '../App';
import {AddToDoListActionType} from './todolists-reducer';


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddToDoListActionType

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
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
        case 'CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)]
            }
        }
        case 'CHANGE_TASK_TITLE': {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        }
        case 'ADD_TODOLIST':{
            return {...state,[action.payload.id]:[]}
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

export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string }) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload
    } as const
}

export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, newTitle: string }) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload
    } as const
}