import {v1} from 'uuid';
import {
    addTodolistAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC, type FilterValuesType,
    removeToDoListAC,
    todolistsReducer, type ToDoListsType
} from '../todolists-reducer';

let toDoListId1: string
let toDoListId2: string

let startState: ToDoListsType[] = []

beforeEach(() => {
    toDoListId1 = v1()
    toDoListId2 = v1()

    startState = [
        {id: toDoListId1, title: 'what to learn', filter: 'all'},
        {id: toDoListId2, title: 'what to buy', filter: 'all'}
    ]


})

test(('correct ToDoList should be removed'), () => {
    const endState = todolistsReducer(startState, removeToDoListAC(toDoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoListId2)
})

test('correct todolist should be added', () => {
    const newTitle: string = 'New Title'

    const endState = todolistsReducer(startState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
  const newTitle: string = 'New Title'

    const endState = todolistsReducer(startState, changeToDoListTitleAC({id: toDoListId1, title: newTitle}))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[0].id).toBe(toDoListId1)
})

test('correct todolist filter should change', () => {
    const filter: FilterValuesType = 'active'

    const endState = todolistsReducer(startState, changeToDoListFilterAC({id: toDoListId1, filter}))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(filter)
    expect(endState[0].id).toBe(toDoListId1)
})