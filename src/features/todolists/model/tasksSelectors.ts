import type { RootState } from "../../../app/store"

//TODO: memoization of selector func for tasks with RTK
// export const selectTodolistTasks = (todolistId: string) =>
//   createSelector([selectTasks], (tasks) => tasks[todolistId] || []);

export const selectTasks = (state: RootState) => state.tasks
