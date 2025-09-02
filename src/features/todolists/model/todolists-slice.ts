import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { todolistsApi, type Todolist } from "../api"
import { useState } from "react"
import { convertLength } from "@mui/material/styles/cssUtils"
import { log } from "console"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolist: (state) => state,
  },
  reducers: (create) => {
    return {
      // setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      //   //1st opt
      //   // return action.payload.todolists.map((tl) => {
      //   //   return { ...tl, filter: "all", entityStatus: "idle" }
      //   // }) //not recommended bu rtk as the state is return immutable
      //   //2 opt
      //   action.payload.todolists.forEach((tl) => {
      //     state.push({ ...tl, filter: "all" })
      //   })
      // }),
      // removeToDoListAC: create.reducer<{ id: string }>((state, action) => {
      //   const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      //   if (index !== -1) {
      //     state.splice(index, 1)
      //   }
      // }),
      // createToDoListAC: create.preparedReducer(
      //   (title: string) => {
      //     const id = nanoid()
      //     return { payload: { id, title } }
      //   },
      //   (state, action) => {
      //     state.push({ ...action.payload, filter: "all", addedDate: "", order: 0 })
      //   },
      // ),
      // changeToDoListTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      //   const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      //   if (index !== -1) {
      //     state[index].title = action.payload.title
      //   }
      // }),
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload?.todolists.forEach((tl) => {
          state.push({ ...tl, filter: "all" })
        })
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all" })
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(fetchTodolistsTC.rejected, (state, action) => {
        console.log(state)
      })
      .addCase(changeTodolistTitleTC.rejected, (state, action) => {
        console.log(state)
      })
      .addCase(createTodolistTC.rejected, (state, action) => {
        console.log(state)
      })
  },
})

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists()
    return { todolists: res.data }
  } catch (error) {
    return thunkAPI.rejectWithValue(null)
  }
})

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistsTitle(payload)
      return payload
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (title: string, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(title)
      return { todolist: res.data.data.item }
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (id: string, thunkAPI) => {
    try {
      const res = await todolistsApi.deleteTodolists(id)
      return {id}
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const todolistsReducer = todolistsSlice.reducer
export const { changeToDoListFilterAC } = todolistsSlice.actions
export const { selectTodolist } = todolistsSlice.selectors

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
