import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { tasksSlice } from "../features/todolists/model/tasks-slice"
import { todolistsReducer } from "../features/todolists/model/todolists-slice"
import { appReducer } from "./app-slice"

const rootReducer = combineReducers({
  tasks: tasksSlice,
  todolists: todolistsReducer,
  app: appReducer,
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
