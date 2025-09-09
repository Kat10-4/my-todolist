import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasks-slice"
import { todolistsReducer, listsSlice } from "../features/todolists/model/lists-slice"
import { appReducer, appSlice } from "./app-slice"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [listsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
