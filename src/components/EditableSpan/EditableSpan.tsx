// @flow 
import * as React from 'react';
import {ChangeEvent, useState} from 'react';

type Props = {
    oldTitle: string
    onClick:(updatedTitle:string)=>void
};
export const EditableSpan = ({oldTitle, onClick}: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [updatedTitle, setUpdatedTitle] = useState(oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        onClick(updatedTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedTitle(e.currentTarget.value)
    }

    return (
        edit ?
            <input value={updatedTitle} autoFocus onBlur={editHandler} onChange={onChangeHandler}/> :
            <span onDoubleClick={editHandler}>{oldTitle}</span>
    );
};