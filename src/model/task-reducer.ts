import {v1} from 'uuid';
import {FilterValuesType, TasksType, ToDoListsType} from '../App';


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type ActionsType = RemoveTaskActionType

export const taskReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)}
        }

        default:
            throw new Error('Can\'t find this action type')
    }
}

export const removeTaskAC = (payload:{id: string,todolistId: string}) => {
    return {
        type: 'REMOVE_TASK',
        payload
    } as const
}

