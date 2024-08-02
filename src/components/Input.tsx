import React, {ChangeEvent, KeyboardEvent} from 'react';
import '..//App.css';


type InputPropsType = {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void,
    className?: string,
    error?:string | null
}

export const Input = (props: InputPropsType) => {
    return (
        <input value={props.value}
               onChange={props.onChange}
               onKeyUp={props.onKeyUp}
               className={props.error ? 'error' : ''}/>
    )
        ;
};

