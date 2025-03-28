import { createAction, createReducer } from "@reduxjs/toolkit"

export type ThemeMode = "dark" | "light"

const initialState = {
  themeMode: "light" as ThemeMode,
}

export const changeThemeAC = createAction<{ mode: ThemeMode }>("theme/changeTheme")

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeThemeAC, (state, action) => {
    state.themeMode = action.payload.mode
  })
})
