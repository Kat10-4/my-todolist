import {v1} from 'uuid';
import {FilterValuesType, ToDoListsType} from '../App';

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const toDoListsReducer = (state: ToDoListsType[], action: ActionsType) => {
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