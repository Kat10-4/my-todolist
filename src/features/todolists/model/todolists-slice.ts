import { createSlice, nanoid } from "@reduxjs/toolkit"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as TodoList[],
  reducers: (create) => {
    return {
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
          state.push({ ...action.payload, filter: "all" })
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
        filter: FilterValuesType
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
export const { removeToDoListAC, createToDoListAC, changeToDoListTitleAC, changeToDoListFilterAC } =
  todolistsSlice.actions

export type TodoList = {
  id: string
  title: string
  filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"
