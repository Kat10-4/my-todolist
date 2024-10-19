import {v1} from 'uuid';

import {toDoListsReducer} from './toDoListsReducer';
import {ToDoListsType} from '../App';


test(('correct ToDoList should be removed'), () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'what to learn', filter: 'all'},
        {id: toDoListId2, title: 'what to buy', filter: 'all'}
    ]

    const action = {
        type: 'REMOVE_TODOLIST',
        payload: {
            id: toDoListId1,
        },
    } as const

    const endState = toDoListsReducer(startState, action)

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

    const action = {
        type: 'ADD_TODOLIST',
        payload: {
            title: 'New Todolist',
        },
    } as const

    const endState = toDoListsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(action.payload.title)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'what to learn', filter: 'all'},
        {id: toDoListId2, title: 'what to buy', filter: 'all'}
    ]

    const action = {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            id:toDoListId1,
            title: 'New Todolist',
        },
    } as const

    const endState = toDoListsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(action.payload.title)
    expect(endState[0].id).toBe(toDoListId1)
})

test('correct todolist filter should change', () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'what to learn', filter: 'all'},
        {id: toDoListId2, title: 'what to buy', filter: 'all'}
    ]

    const action = {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            id:toDoListId1,
            filter: 'active',
        },
    } as const

    const endState = toDoListsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(action.payload.filter)
    expect(endState[0].id).toBe(toDoListId1)
})