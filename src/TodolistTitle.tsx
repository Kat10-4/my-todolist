import {Delete} from '@mui/icons-material';
import {Grid2, IconButton} from '@mui/material';
import React from 'react';
import {useDispatch} from 'react-redux';
import {EditableSpan} from './EditableSpan';
import {changeToDoListTitleAC, removeToDoListAC, type ToDoListsType} from './model/todolists-reducer';

type Props = {
    todolist:ToDoListsType
};

export const TodolistTitle = ({todolist}: Props) => {

    const dispatch = useDispatch()

    const updateToDoListTitle = (title: string) => {
        dispatch(changeToDoListTitleAC({id:todolist.id, title}))
    }

    const removeToDoList = () => {
        dispatch(removeToDoListAC(todolist.id))
    }


    return (
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
    );
};