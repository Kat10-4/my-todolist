import {v1} from 'uuid';
import {FilterValuesType, TasksType, ToDoListsType} from '../App';


export type ChangeToDoListFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =

export const taskReducer = (state: TasksType[], action: ActionsType): TasksType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(td => td.id !== action.payload.id)
        }

        default:
            throw new Error('Can\'t find this action type')
    }
}

export const removeTaskAC = (id: string): RemoveToDoListActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id
        },
    } as const
}

