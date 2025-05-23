import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksSlice,
  type TasksType,
} from "../tasks-slice"
import { createToDoListAC, removeToDoListAC } from "../todolists-slice"

let startState: TasksType = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksSlice(startState, removeTaskAC({ taskId: "2", todolistId: "todolistId2" }))

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const endState = tasksSlice(startState, addTaskAC({ newTitle: "juice", todolistId: "todolistId2" }))

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juice")
  expect(endState["todolistId2"][0].isDone).toBe(false)
})

test("status of specified task should be changed", () => {
  const endState = tasksSlice(
    startState,
    changeTaskStatusAC({
      taskId: "2",
      isDone: false,
      todolistId: "todolistId2",
    }),
  )

  expect(endState["todolistId2"][1].isDone).toBeFalsy()
  expect(endState["todolistId1"][1].isDone).toBeTruthy()
})

test("title of specified task should be changed", () => {
  const endState = tasksSlice(
    startState,
    changeTaskTitleAC({
      taskId: "2",
      newTitle: "juice",
      todolistId: "todolistId2",
    }),
  )

  expect(endState["todolistId1"][1].title).toBe("JS")
  expect(endState["todolistId2"][1].title).toBe("juice")
  expect(endState["todolistId2"]).toHaveLength(3)
})

test("new array should be added when new todolist is added", () => {
  const endState = tasksSlice(startState, createToDoListAC("new todolist"))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const action = removeToDoListAC({ id: "todolistId2" })

  const endState = tasksSlice(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})
