import {v1} from 'uuid';
import {
    AddToDoListAC,
    ChangeToDoListFilterAC,
    ChangeToDoListTitleAC,
    RemoveToDoListAC,
    toDoListsReducer
} from './toDoListsReducer';
import {FilterValuesType, ToDoListsType} from '../App';


test(('correct ToDoList should be removed'), () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'what to learn', filter: 'all'},
        {id: toDoListId2, title: 'what to buy', filter: 'all'}
    ]

    const endState = toDoListsReducer(startState, RemoveToDoListAC(toDoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoListId2)
})

test('correct todolist should be added', () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'what to learn', filter: 'all'},
        {id: toDoListId2, title: 'what to buy', filter: 'all'}
    ]

    const newTitle: string = 'New Title'

    const endState = toDoListsReducer(startState, AddToDoListAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'what to learn', filter: 'all'},
        {id: toDoListId2, title: 'what to buy', filter: 'all'}
    ]

    const newTitle: string = 'New Title'

    const endState = toDoListsReducer(startState, ChangeToDoListTitleAC(toDoListId1, newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[0].id).toBe(toDoListId1)
})

test('correct todolist filter should change', () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'what to learn', filter: 'all'},
        {id: toDoListId2, title: 'what to buy', filter: 'all'}
    ]

    const filter: FilterValuesType = 'active'

    const endState = toDoListsReducer(startState, ChangeToDoListFilterAC(toDoListId1, filter))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(filter)
    expect(endState[0].id).toBe(toDoListId1)
})