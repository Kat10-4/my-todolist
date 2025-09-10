import { configureStore } from "@reduxjs/toolkit"
import { listsReducer, listsSlice } from "../features/todolists/model/lists-slice"
import { appReducer, appSlice } from "./app-slice"

export const store = configureStore({
  reducer: {
    [listsSlice.name]: listsReducer,
    [appSlice.name]: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
