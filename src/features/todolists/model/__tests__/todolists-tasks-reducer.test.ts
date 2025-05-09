import { tasksSlice, type TasksType } from "../tasks-slice"
import { createToDoListAC, type TodoList, todolistsReducer } from "../todolists-slice"

test("ids should be equals", () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: TodoList[] = []

  const action = createToDoListAC("new todolist")

  const endTasksState = tasksSlice(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.id)
  expect(idFromTodolists).toBe(action.payload.id)
})
