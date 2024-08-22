import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../../App';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
import '../../App.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string
    title: string,
    task: Array<TaskType>,
    removeTask: (id: string, toDolistId: string) => void,
    changeFilter: (newFilter: FilterValuesType, toDolistId: string) => void,
    addTask: (newTaskTitle: string, toDolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, toDolistId: string) => void
    filter: FilterValuesType,
    removeToDoList: (toDoListId: string) => void
}

export function ToDoList({
                             id,
                             title,
                             task,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeToDoList
                         }: PropsType) {


    const onAllClickHandler = () => changeFilter('all', id)

    const onActiveClickHandler = () => changeFilter('active', id)

    const onCompletedClickHandler = () => changeFilter('completed', id)

    const removeToDoListHandler = () => removeToDoList(id)

    const tasksList = task.map(t => {
            const onRemoveHandler = () => removeTask(t.id, id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(t.id, e.currentTarget.checked, id)
            }
            return (
                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChangeHandler}/>
                    <span>{t.title}</span>
                    <Button title="X" onClick={onRemoveHandler}/>
                </li>)
        }
    )

    const addTaskHandler = (title: string) => {
        addTask(title, id)
    }

    return <div>
        <h3>{title}
            <button onClick={removeToDoListHandler}>X</button>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul>
            {tasksList}
        </ul>
        <div>
            <Button title="All" className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}/>
            <Button title="Active" className={filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}/>
            <Button title="Completed" className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}/>
        </div>
    </div>
}