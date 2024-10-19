import {ToDoListsType} from '../App';

type ActionType={
    type:string
    [key:string]:any
}

export const toDoListsReducer =(state:ToDoListsType[],action:ActionType)=>{
    switch (action.type){
        case 'REMOVE_TODOLIST':{
            return state.filter(td => td.id !== id)
        }
        default:
            throw new Error('Can\'t find this action type')
    }
}