import {EditableSpan} from '../EditableSpan/EditableSpan';
import React from 'react';


type ToDoListHeaderProps = {
    title:string
    updateListTitle:(updatedTitle:string)=>void
    removeToDoList:()=>void
};
export const ToDoListHeader = ({title,updateListTitle,removeToDoList}: ToDoListHeaderProps) => {
    return (
        <h3>
            <EditableSpan oldTitle={title} onClick={(updatedTitle) => updateListTitle(updatedTitle)}/>
            <button onClick={removeToDoList}>X</button>
        </h3>
    );
};