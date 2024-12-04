import {Container} from '@mui/material';
import React, {useCallback} from 'react';
import {AddItemForm} from '../../../../../common/components/AddItemForm/AddItemForm';
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch';
import {addTaskAC} from '../../../model/tasks-reducer';
import {FilterTasksButtons} from './FilterTasksButtons/FilterTasksButtons';
import { type ToDoListsType} from '../../../model/todolists-reducer';
import {Tasks} from './Tasks/Tasks';
import {TodolistTitle} from './TodolistTitle/TodolistTitle';


type PropsType = {
    todolist: ToDoListsType
}

export function ToDoList({todolist}: PropsType) {

    const dispatch = useAppDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC({todolistId:todolist.id, newTitle:title}))
    }, [])


    return <Container>
        <TodolistTitle todolist={todolist}/>
        <AddItemForm addItem={addTask}/>
        <Tasks todolist={todolist}/>
        <FilterTasksButtons todolist={todolist}/>
    </Container>
}