import { configureStore } from "@reduxjs/toolkit"
import { listsReducer, listsSlice } from "../features/todolists/model/lists-slice"
import { appReducer, appSlice } from "./app-slice"
import { injectStore } from "../common/instance/instance"
import { authReducer, authSlice } from "../features/auth/model/auth-slice"

export const store = configureStore({
  reducer: {
    [listsSlice.name]: listsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})

injectStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
