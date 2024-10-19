import type {Meta, StoryObj} from '@storybook/react';
import '../../App.css';
import React, {useState} from 'react';
import {action} from '@storybook/addon-actions'
import {Input} from './Input';


const meta: Meta<typeof Input> = {
    component: Input,
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
const onKeyUpCallBack = action('onChange')

export const EmptyInput = () => {
    return <Input value={''} onChange={onChangeCallBack} onKeyUp={onKeyUpCallBack}/>
}
export const FilledInput = () => {
    return <Input value={'Hello'} onChange={onChangeCallBack} onKeyUp={onKeyUpCallBack}/>
}

export const ErrorInput = () => {
    const [error, setError] = useState('error')
    return <Input value={''} onChange={onChangeCallBack} onKeyUp={onKeyUpCallBack}
                  className={error ? 'active-filter' : ''}/>
}

export const ChangeInput = () => {
    return <input defaultValue={'hello'}/>//can change in stories
}