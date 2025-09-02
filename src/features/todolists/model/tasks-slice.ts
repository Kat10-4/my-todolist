import { nanoid } from "@reduxjs/toolkit"
import {createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { createAppSlice } from "../../../common/utils"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => {
    return {
      addTaskAC: create.preparedReducer(
        (todolistId: string, newTitle: string) => {
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
      removeTaskAC: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
        const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          state[action.payload.todolistId].splice(index, 1)
        }
      }),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

export type TasksState = Record<string, Task[]>

export type Task = {
  id: string
  title: string
  isDone: boolean
}
