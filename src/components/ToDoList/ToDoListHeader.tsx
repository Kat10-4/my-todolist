import {EditableSpan} from '../EditableSpan/EditableSpan';
import React from 'react';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';



type ToDoListHeaderProps = {
    toDoListTitle: string
    updateToDoListTitle: (updatedTitle: string) => void
    removeToDoList: () => void
};
export const ToDoListHeader = ({toDoListTitle, updateToDoListTitle, removeToDoList}: ToDoListHeaderProps) => {
    return (
        <h3>
            <EditableSpan
                oldTitle={toDoListTitle}
                onClick={(updatedTitle) => updateToDoListTitle(updatedTitle)}/>
            <IconButton aria-label="delete"
                        onClick={removeToDoList}>
                <Delete/>
            </IconButton>
        </h3>
    );
};