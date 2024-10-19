import type {Meta, StoryObj} from '@storybook/react';
import '../../App.css';
import {Button} from './Button';
import React, {useState} from 'react';
import {action} from '@storybook/addon-actions'


const meta: Meta<typeof Button> = {
    component: Button,
};

export default meta;

// type Story = StoryObj<typeof Button>;
//
// export const FirstStory: Story = {
//     args: {
//         title: 'hello'
//     }
// }

const onChangeCallBack = action('onChange')

export const toDoListButton = () => {
    return <Button title="X" onClick={() => {
        onChangeCallBack()
    }}/>
}
export const taskButton = () => {
    return <Button title="+" onClick={() => {
        onChangeCallBack()
    }}/>
}

export const filterButton = () => {
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active')
    return <Button title="All" className={filter === 'all' ? 'active-filter' : ''} onClick={() => setFilter('all')}/>
}
