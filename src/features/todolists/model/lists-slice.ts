import { createAppSlice, normalizeTaskStatus } from "../../../common/utils"
import { setAppErrorAC, setAppStatusAC } from "../../../app/app-slice"
import { TaskStatus } from "../../../common/enums"
import { createSelector } from "@reduxjs/toolkit"
import { listsApi } from "../api"
import type { RequestStatus } from "../../../common/types"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"

export const listsSlice = createAppSlice({
  name: "lists",
  initialState: [] as DomainList[],
  selectors: {
    selectTodolist: (state) => state.filter((list) => list.parent === 0),
    selectTasksByParent: createSelector(
      [
        (state: DomainList[]) => state, // all lists
        (_state: DomainList[], parentId: number) => parentId,
      ],
      (lists, parentId) => {
        const result: DomainList[] = []

        const collectChildren = (id: number) => {
          const children = lists.filter((item) => Number(item.parent) === id)
          children.forEach((child) => {
            result.push(child)
            collectChildren(Number(child.id))
          })
        }

        collectChildren(parentId)
        return result
      },
    ),
  },
  reducers: (create) => {
    return {
      fetchListsTC: create.asyncThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await listsApi.getLists()
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { todolists: res.data }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
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
                    entityStatus: "succeeded",
                  }) //todolist
                : state.push({
                    id: tl.id,
                    title: tl.title.rendered,
                    parent: tl.parent,
                    status: normalizeTaskStatus(tl.acf?.status),
                    entityStatus: "succeeded",
                  }) //task
            })
          },
        },
      ),

      changeListTitleTC: create.asyncThunk(
        async (payload: { id: string; title: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            await listsApi.changeListTitle(payload)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return payload
          } catch (error) {
            handleServerNetworkError(error, dispatch)
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
            const res = await listsApi.createList(payload)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { list: res.data }
          } catch (error: any) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            console.log("fulfilled block")
            action.payload?.list.parent === 0
              ? state.unshift({
                  id: action.payload?.list.id,
                  title: action.payload?.list.title.rendered,
                  parent: action.payload?.list.parent,
                  filter: "all",
                  children: [],
                  entityStatus: "succeeded",
                }) //todolist
              : state.unshift({
                  id: action.payload?.list.id,
                  title: action.payload?.list.title.rendered,
                  parent: action.payload?.list.parent,
                  status: normalizeTaskStatus(action.payload?.list.acf?.status),
                  entityStatus: "succeeded",
                }) //task
          },
        },
      ),

      deleteListTC: create.asyncThunk(
        async (id: string, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            dispatch(changeEntityStatusAC({ id, entityStatus: "loading" }))
            const res = await listsApi.deleteList(id) // backend deletes parent + children
            dispatch(setAppStatusAC({ status: "succeeded" }))
            // Use type assertion to tell TypeScript the structure
            const response = res.data as { children?: number[] }
            // Convert numeric IDs to strings safely
            const childIds = ((response.children as number[]) || []).map((childId) => childId.toString())
            return { id, children: childIds } as { id: string; children: string[] }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            // Convert all IDs to numbers for consistent comparison
            const allDeleted = [action.payload.id, ...action.payload.children].map((id) => Number(id)) // Convert strings to numbers, keep numbers as numbers
            const newState = state.filter((list) => {
              const listIdNumber = Number(list.id) // Convert list ID to number for comparison
              const shouldDelete = allDeleted.includes(listIdNumber)
              return !shouldDelete
            })
            return newState
          },
        },
      ),

      updateTaskStatusTC: create.asyncThunk(
        async (payload: { id: string; status: TaskStatus }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await listsApi.updateListStatus(payload)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return payload
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const item = state.find((el) => el.id === action.payload?.id)
            if (item) item.status = action.payload?.status
          },
        },
      ),

      updateListFilterAC: create.reducer<{
        id: string
        value: FilterValues
      }>((state, action) => {
        const item = state.find((i) => i.id === action.payload.id)
        if (!item) return
        item.filter = action.payload.value as FilterValues
      }),

      changeEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id)
        if (todolist) {
          todolist.entityStatus = action.payload.entityStatus
        }
      }),
    }
  },
})

export const listsReducer = listsSlice.reducer
export const {
  fetchListsTC,
  changeListTitleTC,
  createListTC,
  deleteListTC,
  updateTaskStatusTC,
  updateListFilterAC,
  changeEntityStatusAC,
} = listsSlice.actions
export const { selectTodolist, selectTasksByParent } = listsSlice.selectors

export type DomainList = {
  id: string
  title: string
  date?: string
  modified?: string
  parent: number | undefined
  filter?: FilterValues
  status?: TaskStatus
  children?: DomainList[]
  entityStatus: RequestStatus //when deleting entity deleteicon still active and fire dispatch
}

export type FilterValues = "all" | "active" | "completed"
