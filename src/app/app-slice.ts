import { createSlice } from "@reduxjs/toolkit"
import type { RequestStatus } from "../common/types"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    entityStatus: "idle" as RequestStatus,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectEntityStatus: (state) => state.entityStatus,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setEntityStatusAC: create.reducer<{ entityStatus: RequestStatus }>((state, action) => {
      state.entityStatus = action.payload.entityStatus
    }),
  }),
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, setAppStatusAC,setEntityStatusAC } = appSlice.actions
export const { selectThemeMode, selectAppStatus, selectEntityStatus } = appSlice.selectors

export type ThemeMode = "dark" | "light"
