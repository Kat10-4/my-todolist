import { nanoid } from "@reduxjs/toolkit"
import {
  listsReducer,
  type DomainList,
  type FilterValues,
  updateListAC,
  createListTC,
  deleteListTC,
  changeListTitleTC,
  selectTasksByParent,
} from "../lists-slice"
import { TaskStatus } from "../../../../common/enums"
import type { WPList } from "../../api"

let listId1: string
let listId2: string
let listId3: string

let startState: DomainList[] = []

beforeEach(() => {
  listId1 = nanoid()
  listId2 = nanoid()
  listId3 = nanoid()

  startState = [
    { 
      id: listId1, 
      title: 'What to learn', 
      parent: 0, 
      filter: 'all' as FilterValues,
      status: TaskStatus.Active // Added status for consistency
    },
    { 
      id: listId2, 
      title: 'What to buy', 
      parent: 0, 
      filter: 'all' as FilterValues,
      status: TaskStatus.Active
    },
    { 
      id: listId3, 
      title: 'Task 1', 
      parent: Number(listId1), 
      status: TaskStatus.Active,
      filter: 'all' as FilterValues // Added filter for consistency
    },
  ]
})

test("correct list should be removed", () => {
  // Get all children of listId1 (should include listId3)
  const childLists = selectTasksByParent({lists:startState}, Number(listId1))
  const childIds:string[] = childLists.map(child => child.id)

  const endState = listsReducer(
    startState, 
    deleteListTC.fulfilled(
      { id: listId1, children: childIds }, // Pass array of child IDs
      'requestId', 
      listId1
    )
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(listId2)
  expect(endState.find(item => item.id === listId3)).toBeUndefined() // Child should be removed
})

test("correct todolist should be added", () => {
  const newTitle: string = "New TodoList"
  
  // Mock the API response (WPList format)
  const apiResponse: WPList = { 
    id: "new-id", 
    title: {
      rendered: newTitle
    },
    parent: 0,
    acf: {
      status: TaskStatus.Active
    },
    children: []
  }

  const endState = listsReducer(
    startState, 
    createListTC.fulfilled(
      { list: apiResponse }, // Pass WPList format (what API returns)
      'requestId', 
      { parent: 0, title: newTitle } // Original payload
    )
  )

  expect(endState.length).toBe(4)
  expect(endState[0].title).toBe(newTitle) // DomainList has string title
  expect(endState[0].filter).toBe("all")
  expect(endState[0].parent).toBe(0)

})

test("correct task should be added", () => {
  const newTitle: string = "New Task"
  
  // Mock the API response (WPList format) - what the API actually returns
  const apiResponse: WPList = { 
    id: "new-task-id", 
    title: {
      rendered: newTitle
    },
    parent: Number(listId1),
    acf: {
      status: TaskStatus.Active
    },
    children: []
  }

  const endState = listsReducer(
    startState, 
    createListTC.fulfilled(
      { list: apiResponse }, // Pass WPList format (API response)
      'requestId', 
      { parent: Number(listId1), title: newTitle } // Original payload
    )
  )

  expect(endState.length).toBe(4)
  const addedTask = endState.find(item => item.id === "new-task-id")
  expect(addedTask?.title).toBe(newTitle) // DomainList has string title after conversion
  expect(addedTask?.status).toBe("active")
  expect(addedTask?.parent).toBe(Number(listId1))
})

test("correct list title should be changed", () => {
  const newTitle: string = "New Title"

  const endState = listsReducer(
    startState, 
    changeListTitleTC.fulfilled(
      { id: listId1, title: newTitle }, 
      'requestId', 
      { id: listId1, title: newTitle }
    )
  )

  expect(endState.length).toBe(3)
  expect(endState.find(item => item.id === listId1)?.title).toBe(newTitle)
  expect(endState.find(item => item.id === listId2)?.title).toBe("What to buy")
})

test("correct todolist filter should be changed", () => {
  const filter: FilterValues = "completed"

  const endState = listsReducer(
    startState, 
    updateListAC({ id: listId1, value: filter })
  )

  expect(endState.length).toBe(3)
  expect(endState.find(item => item.id === listId1)?.filter).toBe(filter)
  expect(endState.find(item => item.id === listId2)?.filter).toBe("all")
})

test("correct task status should be changed", () => {
  const endState = listsReducer(
    startState, 
    updateListAC({ id: listId3, value: TaskStatus.Done })
  )

  expect(endState.length).toBe(3)
  expect(endState.find(item => item.id === listId3)?.status).toBe("done")
  expect(endState.find(item => item.id === listId1)?.filter).toBe("all")
})

test("should handle deletion of list with children", () => {
  const endState = listsReducer(
    startState, 
    deleteListTC.fulfilled(
      { id: listId1, children: [listId3] }, 
      'requestId', 
      listId1
    )
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(listId2)
  expect(endState.find(item => item.id === listId3)).toBeUndefined()
})

test("should handle deletion of list without children", () => {
  const endState = listsReducer(
    startState, 
    deleteListTC.fulfilled(
      { id: listId2, children: [] }, 
      'requestId', 
      listId2
    )
  )

  expect(endState.length).toBe(2)
  expect(endState.find(item => item.id === listId2)).toBeUndefined()
  expect(endState.find(item => item.id === listId1)).toBeDefined()
  expect(endState.find(item => item.id === listId3)).toBeDefined()
})

test("should not change state for non-existent id in updateListAC", () => {
  const nonExistentId = nanoid()
  
  const endState = listsReducer(
    startState, 
    updateListAC({ id: nonExistentId, value: "completed" as FilterValues })
  )

  expect(endState).toEqual(startState)
})

test("should not change state for non-existent id in changeListTitleTC", () => {
  const nonExistentId = nanoid()
  const newTitle = "New Title"
  
  const endState = listsReducer(
    startState, 
    changeListTitleTC.fulfilled(
      { id: nonExistentId, title: newTitle }, 
      'requestId', 
      { id: nonExistentId, title: newTitle }
    )
  )

  expect(endState).toEqual(startState)
})