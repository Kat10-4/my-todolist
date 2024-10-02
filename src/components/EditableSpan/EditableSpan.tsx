// @flow 
import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type Props = {
    oldTitle: string
    onClick: (updatedTitle: string) => void
};
export const EditableSpan = ({oldTitle, onClick}: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [updatedTitle, setUpdatedTitle] = useState(oldTitle)
    const [error, setError] = useState<boolean>(false)

    const editHandler = () => {
        setEdit(!edit)
        error ? onClick(oldTitle) : onClick(updatedTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedTitle(e.currentTarget.value.trim())
        setError(!e.currentTarget.value.trim())
    }

    return (edit ?
            <TextField
                variant="standard"
                value={updatedTitle}
                autoFocus
                onBlur={editHandler}
                onChange={onChangeHandler}
                error={!!error}
                helperText={'Type new value'}/> :
            <span onDoubleClick={editHandler}>{oldTitle}</span>
    );
};