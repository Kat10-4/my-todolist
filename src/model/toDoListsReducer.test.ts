import {v1} from 'uuid';
import {useReducer, useState} from 'react';
import {ToDoListsType} from '../App';
import {toDoListsReducer} from './toDoListsReducer';


test(('correct ToDoList should be removed'), () => {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const startState: ToDoListsType[] = [
        {id: toDoListId1, title: 'what to learn', filter: 'all'},
        {id: toDoListId2, title: 'what to buy', filter: 'all'}
    ]

    const endState = toDoListsReducer(startState, {type: 'REMOVE_TODOLIST', toDoListId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoListId2)
})