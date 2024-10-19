import React, {ChangeEvent, KeyboardEvent} from 'react';
import '../../App.css';
import {TextField} from '@mui/material';


type InputPropsType = {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void,
    className?: string,
    error?: string | null
}

export const Input = (props: InputPropsType) => {
    return (
        <TextField
            variant={'outlined'}
            title={'Type value'}
            label={'Your value'}
            value={props.value}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            error={!!props.error}
            helperText={props.error}/>
    )
};

