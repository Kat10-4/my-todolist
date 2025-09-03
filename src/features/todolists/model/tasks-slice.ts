import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"
import { createAppSlice } from "../../../common/utils"
import { tasksApi, type DomainTask, type UpdateTaskModel } from "../api"
import { TaskPriority, TaskStatus } from "../../../common/enums"
import type { RootState } from "../../../app/store"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => {
    return {
      fetchTasksTC: create.asyncThunk(
        async (todolistId: string, thunkAPI) => {
          try {
            const res = await tasksApi.getTasks(todolistId)
            return { todolistId, tasks: res.data.items }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),

      createTaskTC: create.asyncThunk(
        async (payload: { todolistId: string; title: string }, thunkAPI) => {
          try {
            const res = await tasksApi.createTask(payload)
            return { task: res.data.data.item }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
          },
        },
      ),

      deleteTaskTC: create.asyncThunk(
        async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
          try {
            const res = await tasksApi.deleteTask(payload)
            return payload
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
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
        async (payload: { todolistId: string; taskId: string; status: TaskStatus }, thunkAPI) => {
          const { todolistId, taskId, status } = payload

          const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId]
          const task = allTodolistTasks.find((task) => task.id === taskId)

          if (!task) {
            return thunkAPI.rejectWithValue(null)
          }
          const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status,
          }
          try {
            const res = await tasksApi.changeTask({ todolistId, taskId, model })
            return {task: (res.data.data as { item: DomainTask }).item }//typization for item property
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
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
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { fetchTasksTC, deleteTaskTC, createTaskTC, updateTaskTC, changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
