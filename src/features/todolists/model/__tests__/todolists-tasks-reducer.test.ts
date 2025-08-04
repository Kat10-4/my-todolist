import { tasksReducer, type TasksState } from "../tasks-slice"
import { createToDoListAC, todolistsReducer } from "../todolists-slice"

test("ids should be equals", () => {
  const startTasksState: TasksState = {}
  const startTodolistsState: TodoList[] = []

  const action = createToDoListAC("new todolist")

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.id)
  expect(idFromTodolists).toBe(action.payload.id)
})
