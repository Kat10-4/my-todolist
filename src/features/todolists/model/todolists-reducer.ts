import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

const initialState: ToDoListsType[] = []

export type ToDoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'


export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(removeToDoListAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(addToDoListAC, (state, action) => {
            state.push({...action.payload, filter: 'all'})
        })
        .addCase(changeToDoListTitleAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title=action.payload.title
            }
        })
        .addCase(changeToDoListFilterAC,(state,action)=>{
            const todolist = state.find(todolist => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter=action.payload.filter
            }
        })
})


//Actions creators
export const removeToDoListAC = createAction<{ id: string }>('todolists/removeToDoList')

export const addToDoListAC = createAction('todolists/addToDoList', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeToDoListTitleAC = createAction<{ id: string, title: string }>('todolists/changeToDoListTitle')

export const changeToDoListFilterAC = createAction<{
    id: string,
    filter: FilterValuesType
}>('todolists/changeToDoListFilter')

//Action types
export type RemoveToDoListActionType = ReturnType<typeof removeToDoListAC>

export type AddToDoListActionType = ReturnType<typeof addToDoListAC>

export type ChangeToDoListTitleActionType = ReturnType<typeof changeToDoListTitleAC>

export type ChangeToDoListFilterActionType = ReturnType<typeof changeToDoListFilterAC>

type ActionsType =
    | RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeToDoListTitleActionType
    | ChangeToDoListFilterActionType


