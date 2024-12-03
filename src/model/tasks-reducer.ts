import {v1} from 'uuid';
import {AddToDoListActionType, RemoveToDoListActionType} from './todolists-reducer';

const initialState: TasksType= {}

export type TasksType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const tasksReducer = (state: TasksType=initialState, action: ActionsType): TasksType => {
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
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        }
        case 'ADD_TODOLIST': {
            return {...state, [action.payload.id]: []}
        }
        case 'REMOVE_TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default:
           return state
    }
}

//Actions creators
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

//Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddToDoListActionType
    | RemoveToDoListActionType

