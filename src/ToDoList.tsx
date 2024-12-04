import {Delete} from '@mui/icons-material';
import {Container, Grid2, IconButton} from '@mui/material';
import React, {useCallback} from 'react';
import './app/App.css'
import {useDispatch} from 'react-redux';
import {FilterTasksButtons} from './FilterTasksButtons';
import type {ToDoListsType} from './model/todolists-reducer';
import {EditableSpan} from './EditableSpan';
import {Tasks} from './Tasks';
import {TodolistTitle} from './TodolistTitle';


type PropsType = {
    todolist: ToDoListsType
}


export function ToDoList({todolist}: PropsType) {

    const dispatch = useDispatch()

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, toDoListId)
    }, [])


    return <Container>
        <TodolistTitle todolist={todolist}/>
        <Tasks todolist={todolist}/>
        <FilterTasksButtons todolist={todolist}/>
    </Container>
}