import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"
import { createToDoListAC, removeToDoListAC } from "./todolists-slice"

const initialState: TasksType = {}

export type TasksType = Record<string, Task[]>

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export const removeTaskAC = createAction<{ taskId: string; todolistId: string }>("tasks/removeTask")
export const addTaskAC = createAction<{ newTitle: string; todolistId: string }>("tasks/addTask")
export const changeTaskStatusAC = createAction<{
  taskId: string
  isDone: boolean
  todolistId: string
}>("tasks/changeTaskStatus")
export const changeTaskTitleAC = createAction<{
  todolistId: string
  taskId: string
  newTitle: string
}>("tasks/changeTaskTitle")

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createToDoListAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(removeToDoListAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase(removeTaskAC, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    })
    .addCase(addTaskAC, (state, action) => {
      const tasks = state[action.payload.todolistId]
      tasks.unshift({ id: nanoid(), title: action.payload.newTitle, isDone: false })
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const task = tasks.find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.newTitle
      }
    })
})
