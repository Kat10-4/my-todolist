import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import {Button} from '../Button/Button';
import '../../App.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {v1} from 'uuid';
import {filterButton} from '../Button/Button.stories';

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
    updateTaskTitle: (toDoListId: string, taskId: string, title: string) => void
    updateListTitle: (toDoListId: string, title: string) => void
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
                             removeToDoList,
                             updateTaskTitle,
                             updateListTitle
                         }: PropsType) {

    const buttonData = [
        {
            id: v1(),
            title: 'All',
            onClickHandler: () => changeFilter('all', id),
            className: filter === 'all' ? 'active-filter' : ''
        }, {
            id: v1(),
            title: 'Active',
            onClickHandler: () => changeFilter('active', id),
            className: filter === 'active' ? 'active-filter' : ''
        }, {
            id: v1(),
            title: 'Completed',
            onClickHandler: () => changeFilter('completed', id),
            className: filter === 'completed' ? 'active-filter' : ''
        }
    ]

    const filterTasks = () => {
        let filteredTasks = task

        if (filter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.isDone === true)
        }
        if (filter === 'active') {
            filteredTasks = filteredTasks.filter(task => task.isDone === false)
        }
        return filteredTasks
    }

    const removeToDoListHandler = () => removeToDoList(id)

    const addTaskHandler = (title: string) => {
        addTask(title, id)
    }

    const updateTaskTitleHandler = (taskId: string, updatedTitle: string) => {
        updateTaskTitle(id, taskId, updatedTitle)
    }

    const updateListTitleHandler = (updatedTitle: string) => {
        updateListTitle(id, updatedTitle)
    }

    const filterButtons = buttonData.map(el => {
        return <Button key={el.id} title={el.title} onClick={el.onClickHandler} className={el.className}/>
    })

    const tasksList = filterTasks().map(t => {
            const onRemoveHandler = () => removeTask(t.id, id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(t.id, e.currentTarget.checked, id)
            }
            return (
                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChangeHandler}/>
                    <EditableSpan oldTitle={t.title}
                                  onClick={(updatedTitle) => updateTaskTitleHandler(t.id, updatedTitle)}/>
                    <Button title="X" onClick={onRemoveHandler}/>
                </li>)
        }
    )


    return <div>
        <h3>
            <EditableSpan oldTitle={title} onClick={(updatedTitle) => updateListTitleHandler(updatedTitle)}/>
            <button onClick={removeToDoListHandler}>X</button>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul>
            {tasksList}
        </ul>
        <div>
            {filterButtons}
        </div>
    </div>
}