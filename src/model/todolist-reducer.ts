import {v1} from 'uuid';
import {FilterValuesType, ToDoListsType} from '../App';

export type RemoveToDoListActionType = {
    type: 'REMOVE_TODOLIST'
    payload: {
        id: string
    }
}

export type AddToDoListActionType = {
    type: 'ADD_TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeToDoListTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeToDoListFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeToDoListTitleActionType
    | ChangeToDoListFilterActionType

export const todolistReducer = (state: ToDoListsType[], action: ActionsType): ToDoListsType[] => {
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

export const removeToDoListAC = (id: string): RemoveToDoListActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id
        },
    } as const
}

export const addToDoListAC = (title: string): AddToDoListActionType => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title
        },
    } as const
}

export const changeToDoListTitleAC = (id: string, title: string): ChangeToDoListTitleActionType => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            id,
            title,
        },
    } as const
}

export const changeToDoListFilterAC = (id: string, filter: FilterValuesType): ChangeToDoListFilterActionType => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            id,
            filter
        },
    } as const
}