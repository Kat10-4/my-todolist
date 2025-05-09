import { createSlice, nanoid } from "@reduxjs/toolkit"
import { createToDoListAC, removeToDoListAC } from "./todolists-slice"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => {
    return {
      removeTaskAC: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
        const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          state[action.payload.todolistId].splice(index, 1)
        }
      }),
      addTaskAC: create.preparedReducer(
        (newTitle: string, todolistId: string) => {
          const id = nanoid()
          return { payload: { id, newTitle, todolistId } }
        },
        (state, action) => {
          state[action.payload.todolistId].push({
            id: action.payload.id,
            title: action.payload.newTitle,
            isDone: false,
          })
        },
      ),
      changeTaskStatusAC: create.reducer<{
        taskId: string
        isDone: boolean
        todolistId: string
      }>((state, action) => {
        const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
        if (task) {
          task.isDone = action.payload.isDone
        }
      }),
      changeTaskTitleAC: create.reducer<{
        todolistId: string
        taskId: string
        newTitle: string
      }>((state, action) => {
        const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
        if (task) {
          task.title = action.payload.newTitle
        }
      }),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createToDoListAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(removeToDoListAC, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const {} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksState = Record<string, Task[]>

export type Task = {
  id: string
  title: string
  isDone: boolean
}
