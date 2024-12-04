import {Delete} from '@mui/icons-material';
import {Container, Grid2, IconButton} from '@mui/material';
import React, {useCallback} from 'react';
import './app/App.css'
import {FilterTasksButtons} from './FilterTasksButtons';
import type {ToDoListsType} from './model/todolists-reducer';
import {EditableSpan} from './EditableSpan';
import {Tasks} from './Tasks';


type PropsType = {
    todolist: ToDoListsType
}


export function ToDoList({todolist}: PropsType) {


    const removeToDoListHandler = () => removeToDoList(toDoListId)


    const addTaskHandler = useCallback((title: string) => {
        addTask(title, toDoListId)
    }, [])



    const updateToDoListTitleHandler = (updatedTitle: string) => {
        updateToDoListTitle(toDoListId, updatedTitle)
    }


    return <Container>
        <Grid2 container sx={{justifyContent: 'space-between',alignItems:'center'}}>
            <Grid2>
                <h3 style={{textTransform: 'uppercase'}}>
                    <EditableSpan
                        oldTitle={todolist.title}
                        onClick={(updatedTitle) => updateToDoListTitle(updatedTitle)}/>
                </h3>
            </Grid2>
            <Grid2>
                <IconButton
                    aria-label="delete"
                    onClick={removeToDoList}>
                    <Delete/>
                </IconButton>
            </Grid2>
        </Grid2>

        <Tasks todolist={todolist}/>
        <FilterTasksButtons todolist={todolist}/>
    </Container>
}