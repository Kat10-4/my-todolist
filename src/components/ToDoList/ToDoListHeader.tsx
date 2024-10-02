import {EditableSpan} from '../EditableSpan/EditableSpan';
import React from 'react';
import {Grid2, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';


type ToDoListHeaderProps = {
    toDoListTitle: string
    updateToDoListTitle: (updatedTitle: string) => void
    removeToDoList: () => void
};
export const ToDoListHeader = ({toDoListTitle, updateToDoListTitle, removeToDoList}: ToDoListHeaderProps) => {
    return (
        <Grid2 container sx={{justifyContent: 'space-between',alignItems:'center'}}>
            <Grid2>
                <h3 style={{textTransform: 'uppercase'}}>
                    <EditableSpan
                        oldTitle={toDoListTitle}
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