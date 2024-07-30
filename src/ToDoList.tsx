import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string
    title: string,
    task: Array<TaskType>,
    removeTask: (id: string,toDolistId: string) => void,
    changeFilter: (newFilter: FilterValuesType, toDolistId: string) => void,
    addTask: (newTaskTitle: string,toDolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean,toDolistId: string) => void
    filter: FilterValuesType,
    removeToDoList:(toDoListId:string)=>void
}

export function ToDoList({id, title, task, removeTask, changeFilter, addTask, changeTaskStatus, filter,removeToDoList}: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            if (newTaskTitle.trim() !== '') {
                addTask(newTaskTitle,id);
                setNewTaskTitle('')
            } else {
                setError('Field is required')
            }
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addTask(newTaskTitle,id);
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }

    const onAllClickHandler = () => changeFilter('all', id)

    const onActiveClickHandler = () => changeFilter('active', id)

    const onCompletedClickHandler = () => changeFilter('completed', id)

    const removeToDoListHandler=()=>removeToDoList(id)

    return <div>
        <h3>{title}<button onClick={removeToDoListHandler}>X</button></h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyUpHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addTaskHandler}>+
            </button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {task.map(t => {
                    const onRemoveHandler = () => removeTask(t.id,id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(t.id, e.currentTarget.checked,id)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>)
                }
            )
            }
        </ul>
        <div>
            <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}