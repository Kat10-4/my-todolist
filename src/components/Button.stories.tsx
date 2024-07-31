import type { Meta } from '@storybook/react';

import {Button} from './Button';
import React from 'react';

const meta: Meta<typeof Button> = {
    component: Button,
};

export default meta;

export const  toDoListButton=()=>{
    return <Button title="X" onClick={()=>{}}/>
}
export const  taskButton=()=>{
    return <Button title="+" onClick={()=>{}}/>
}

