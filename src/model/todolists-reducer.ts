import {v1} from 'uuid';
import {FilterValuesType, ToDoListsType} from '../app/App';

export type RemoveToDoListActionType = ReturnType<typeof removeToDoListAC>

export type AddToDoListActionType = ReturnType<typeof addTodolistAC>

export type ChangeToDoListTitleActionType = ReturnType<typeof changeToDoListTitleAC>

export type ChangeToDoListFilterActionType = ReturnType<typeof changeToDoListFilterAC>

type ActionsType =
    | RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeToDoListTitleActionType
    | ChangeToDoListFilterActionType

const initialState: ToDoListsType[] = []

export const todolistsReducer = (state: ToDoListsType[]=initialState, action: ActionsType): ToDoListsType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(td => td.id !== action.payload.id)
        }
        case 'ADD_TODOLIST': {
            return [{id: action.payload.id, title: action.payload.title, filter: 'all'}, ...state]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}

export const removeToDoListAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id
        },
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            id: v1()
        },
    } as const
}

export const changeToDoListTitleAC = (payload: { id: string, title: string }) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload
    } as const
}

export const changeToDoListFilterAC = (payload: { id: string, filter: FilterValuesType }) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload
    } as const
}