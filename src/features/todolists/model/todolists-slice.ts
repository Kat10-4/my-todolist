import { createAsyncThunk } from "@reduxjs/toolkit"
import { todolistsApi, type Todolist } from "../api"
import { createAppSlice } from "../../../common/utils"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolist: (state) => state,
  },
  reducers: (create) => {
    return {
      fetchTodolistsTC: create.asyncThunk(
        async (_, thunkAPI) => {
          try {
            const res = await todolistsApi.getTodolists()
            return { todolists: res.data }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload?.todolists.forEach((tl) => {
              state.push({ ...tl, filter: "all" })
            })
          },
        },
      ),

      changeTodolistTitleTC: create.asyncThunk(
        async (payload: { id: string; title: string }, thunkAPI) => {
          try {
            await todolistsApi.changeTodolistsTitle(payload)
            return payload
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
              state[index].title = action.payload.title
            }
          },
        },
      ),

      createTodolistTC: create.asyncThunk(
        async (title: string, thunkAPI) => {
          try {
            const res = await todolistsApi.createTodolist(title)
            return { todolist: res.data.data.item }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "all" })
          },
        },
      ),

      deleteTodolistTC: create.asyncThunk(
        async (id: string, thunkAPI) => {
          try {
            const res = await todolistsApi.deleteTodolists(id)
            return { id }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
              state.splice(index, 1)
            }
          },
        },
      ),

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
export const { changeToDoListFilterAC, fetchTodolistsTC, changeTodolistTitleTC, createTodolistTC, deleteTodolistTC } = todolistsSlice.actions
export const { selectTodolist } = todolistsSlice.selectors

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
