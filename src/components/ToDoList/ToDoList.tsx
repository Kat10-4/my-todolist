import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from '../../App';
import '../../App.css'
import {v1} from 'uuid';
import {ToDoListHeader} from './ToDoListHeader';
import {ToDoListBody} from './ToDoListBody';

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, toDolistId: string) => void,
    changeFilter: (newFilter: FilterValuesType, toDolistId: string) => void,
    addTask: (newTaskTitle: string, toDolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, toDolistId: string) => void
    filter: FilterValuesType,
    removeToDoList: (toDoListId: string) => void
    updateTaskTitle: (toDoListId: string, taskId: string, title: string) => void
    updateListTitle: (toDoListId: string, title: string) => void
}

export type ButtonType = {
    id: string
    title: string
    onClickHandler: () => void
    className: string
}

export function ToDoList({
                             id,
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeToDoList,
                             updateTaskTitle,
                             updateListTitle
                         }: PropsType) {

    const buttonData: ButtonType[] = [
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
        let filteredTasks = tasks

        if (filter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.isDone)
        }
        if (filter === 'active') {
            filteredTasks = filteredTasks.filter(task => !task.isDone)
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


    return <div>
        <ToDoListHeader
            title={title}
            removeToDoList={removeToDoListHandler}
            updateListTitle={updateListTitleHandler}/>
        <ToDoListBody
            id={id}
            addTaskHandler={addTaskHandler}
            buttonData={buttonData}
            filterTasks={filterTasks}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            updateTaskTitleHandler={updateTaskTitleHandler}/>
    </div>
}