import { createSlice, nanoid } from "@reduxjs/toolkit"
import type { Todolist } from "../api"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolist: (state) => state,
  },
  reducers: (create) => {
    return {
      setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((state, action) => {
        //1st opt
        return action.payload.todolists.map((tl) => {
          return { ...tl, filter: "all", entityStatus: "idle" }
        })
        //2 opt
        //action.payload.todolists.forEach((tl) => {
        //state.push({...tl, filter:'all'})}
      }),
      removeToDoListAC: create.reducer<{ id: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      }),
      createToDoListAC: create.preparedReducer(
        (title: string) => {
          const id = nanoid()
          return { payload: { id, title } }
        },
        (state, action) => {
          state.push({ ...action.payload, filter: "all", addedDate: "", order: 0 })
        },
      ),
      changeToDoListTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      }),
      changeToDoListFilterAC: create.reducer<{
        id: string
        filter: FilterValues
      }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      }),
    }
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { setTodolistsAC, removeToDoListAC, createToDoListAC, changeToDoListTitleAC, changeToDoListFilterAC } =
  todolistsSlice.actions
export const { selectTodolist } = todolistsSlice.selectors

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
