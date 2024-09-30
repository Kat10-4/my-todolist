import {EditableSpan} from '../EditableSpan/EditableSpan';
import React from 'react';


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
            <button onClick={removeToDoList}>X</button>
        </h3>
    );
};