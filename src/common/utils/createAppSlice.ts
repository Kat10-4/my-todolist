import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

// Factory: makes a `createAppSlice` function with asyncThunk support
export const createAppSlice = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })