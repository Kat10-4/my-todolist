import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { createAppSlice } from "../../../common/utils"
import { tasksApi, type DomainTask, type UpdateTaskModel } from "../api"
import { TaskPriority } from "../../../common/enums"
import type { RootState } from "../../../app/store"
import { setAppStatusAC } from "../../../app/app-slice"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => {
    return {
      fetchTasksTC: create.asyncThunk(
        async (todolistId: string, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await tasksApi.getTasks(todolistId)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { todolistId, tasks: res.data.items }
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),

      createTaskTC: create.asyncThunk(
        async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await tasksApi.createTask(payload)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { task: res.data.data.item }
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
          },
        },
      ),

      deleteTaskTC: create.asyncThunk(
        async (payload: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await tasksApi.deleteTask(payload)
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return payload
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
              state[action.payload.todolistId].splice(index, 1)
            }
          },
        },
      ),

      updateTaskTC: create.asyncThunk(
        async (
          payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
          { dispatch, rejectWithValue, getState },
        ) => {
          const { todolistId, taskId, domainModel } = payload

          const allTodolistTasks = (getState() as RootState).tasks[todolistId]
          const task = allTodolistTasks.find((task) => task.id === taskId)

          if (!task) {
            return rejectWithValue(null)
          }
          const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
            ...domainModel,
          }
          try {
            dispatch(setAppStatusAC({ status: "loading" }))
            const res = await tasksApi.updateTask({ todolistId, taskId, model })
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { task: (res.data.data as { item: DomainTask }).item } //typization for item property
          } catch (error) {
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
            if (task) {
              task.status = action.payload.task.status
            }
          },
        },
      ),
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

export const { fetchTasksTC, deleteTaskTC, createTaskTC, updateTaskTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
