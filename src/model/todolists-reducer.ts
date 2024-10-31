import {v1} from 'uuid';
import {FilterValuesType, ToDoListsType} from '../App';

export type RemoveToDoListActionType = ReturnType<typeof removeToDoListAC>

export type AddToDoListActionType = ReturnType<typeof addToDoListAC>

export type ChangeToDoListTitleActionType = ReturnType<typeof changeToDoListTitleAC>

export type ChangeToDoListFilterActionType = ReturnType<typeof changeToDoListFilterAC>

type ActionsType =
    | RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeToDoListTitleActionType
    | ChangeToDoListFilterActionType

export const todolistsReducer = (state: ToDoListsType[], action: ActionsType): ToDoListsType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(td => td.id !== action.payload.id)
        }
        case 'ADD_TODOLIST': {
            //setTasks({...tasksObj, [id]: []})
            return [{id: v1(), title: action.payload.title, filter: 'all'}, ...state]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            throw new Error('Can\'t find this action type')
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

export const addToDoListAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title
        },
    } as const
}

export const changeToDoListTitleAC = (payload:{id: string, title: string}) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload
    } as const
}

export const changeToDoListFilterAC = (payload:{id: string, filter: FilterValuesType}) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload
    } as const
}