import {v1} from 'uuid';
import {ToDoListsType} from '../App';

type ActionType = {
    type: string
    payload: any
}

export const toDoListsReducer = (state: ToDoListsType[], action: ActionType) => {
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