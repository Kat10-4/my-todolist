import type { RootState } from "../../../app/store"

export const selectTodolist = (state: RootState) => state.todolists
