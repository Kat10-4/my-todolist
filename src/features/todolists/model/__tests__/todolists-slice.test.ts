import { nanoid } from "@reduxjs/toolkit"
import {
  changeToDoListFilterAC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  todolistsReducer,
  type DomainTodolist,
  type FilterValues,
} from "../todolists-slice"

let todolistId1: string
let todolistId2: string

let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

   startState = [
  { id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all' },
  { id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all' },
]
})

test("correct ToDoList should be removed", () => {
  const endState = todolistsReducer(startState, deleteTodolistTC.fulfilled({id:todolistId1},'requestId', todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const newTitle: string = "New Title"

  const endState = todolistsReducer(startState, createTodolistTC.fulfilled({todolist:{title:newTitle, id:"2"}},'createTodolist',newTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[0].filter).toBe("all")
})

test("correct todolist should change its name", () => {
  const newTitle: string = "New Title"

  const endState = todolistsReducer(startState, changeTodolistTitleTC.fulfilled({ id: todolistId1, title: newTitle },'changeTodolistTitle', { id: todolistId1, title: newTitle }))

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[0].id).toBe(todolistId1)
})

test("correct todolist filter should change", () => {
  const filter: FilterValues = "active"

  const endState = todolistsReducer(startState, changeToDoListFilterAC({ id: todolistId1, filter }))

  expect(endState.length).toBe(2)
  expect(endState[0].filter).toBe(filter)
  expect(endState[0].id).toBe(todolistId1)
})
