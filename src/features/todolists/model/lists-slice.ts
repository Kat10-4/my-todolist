import { todolistsApi, type DomainTask } from "../api"
import { createAppSlice } from "../../../common/utils"
import { setAppStatusAC } from "../../../app/app-slice"
import type { TaskStatus } from "../../../common/enums"

export const listsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainList[],
  selectors: {
    selectTodolist: (state) => state.filter((list) => list.parent === 0),
    selectTasks: (state) => state.filter((list) => list.parent !== 0),
  },
  reducers: (create) => {
    return {
      fetchListsTC: create.asyncThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.getLists()
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { todolists: res.data }
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload?.todolists.forEach((tl) => {
              tl.parent == 0
                ? state.push({
                    id: tl.id,
                    title: tl.title.rendered,
                    parent: tl.parent,
                    filter: "all",
                  }) //todolist
                : state.push({
                    id: tl.id,
                    title: tl.title.rendered,
                    parent: tl.parent,
                    status: tl.acf?.status,
                  }) //task
            })
          },
        },
      ),

      changeTodolistTitleTC: create.asyncThunk(
        async (payload: { id: string; title: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            await todolistsApi.changeListTitle(payload)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return payload
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
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

      createListTC: create.asyncThunk(
        async (payload: { parent: number; title: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.createList(payload)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { list: res.data.data.item }
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload?.list.parent == 0
              ? state.unshift({
                  id: action.payload?.list.id,
                  title: action.payload?.list.title.rendered,
                  parent: action.payload?.list.parent,
                  filter: "all",
                }) //todolist
              : state.unshift({
                  id: action.payload?.list.id,
                  title: action.payload?.list.title.rendered,
                  parent: action.payload?.list.parent,
                  status: action.payload?.list.acf?.status,
                }) //task
          },
        },
      ),

      deleteListTC: create.asyncThunk(
        async (id: string, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.deleteList(id)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { id }
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
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

export const todolistsReducer = listsSlice.reducer
export const { changeToDoListFilterAC, fetchListsTC, changeTodolistTitleTC, createListTC, deleteListTC } =
  listsSlice.actions
export const { selectTodolist, selectTasks } = listsSlice.selectors

export type DomainList = {
  id: string
  title: string
  date?: string
  modified?: string
  parent: number | undefined
  filter?: FilterValues
  status?: TaskStatus
}

export type FilterValues = "all" | "active" | "completed"

export type TasksState = Record<string, DomainTask[]>
