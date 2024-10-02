import * as React from 'react';
import {Input} from '../Input/Input';
import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

type Props = {
    addItem: (newItemTitle: string) => void
};

export const AddItemForm = ({addItem}: Props) => {
    const [newItemTitle, setNewItemTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            if (newItemTitle.trim() !== '') {
                addItem(newItemTitle);
                setNewItemTitle('')
            } else {
                setError('Field is required')
            }
        }
    }

    const addItemHandler = () => {
        if (newItemTitle.trim() !== '') {
            addItem(newItemTitle);
            setNewItemTitle('')
        } else {
            setError('Field is required')
        }
    }

    return (
        <div>
            <Input value={newItemTitle}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyUpHandler}
                   className={error ? 'error' : ''}
                   error={error}/>
            <IconButton onClick={addItemHandler}
                color={'primary'}
            ><AddBoxIcon/></IconButton>
        </div>
    );
};