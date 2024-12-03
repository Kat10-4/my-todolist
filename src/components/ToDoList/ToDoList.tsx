import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from '../../app/App';
import '../../app/App.css'
import {v1} from 'uuid';
import {ToDoListHeader} from './ToDoListHeader';
import {ToDoListBody} from './ToDoListBody';

type PropsType = {
    toDoListId: string
    toDoListTitle: string,
    removeToDoList: (toDoListId: string) => void
    filter: FilterValuesType,
    changeFilter: (newFilter: FilterValuesType, toDolistId: string) => void,
    updateToDoListTitle: (toDoListId: string, title: string) => void
    tasks: TaskType[],
    removeTask: (id: string, toDolistId: string) => void,
    addTask: (newTaskTitle: string, toDolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, toDolistId: string) => void
    updateTaskTitle: (toDoListId: string, taskId: string, title: string) => void
}

export type ButtonType = {
    id: string
    title: string
    onClickHandler: () => void
    color: 'secondary' | 'primary' | 'inherit' | 'success' | 'error' | 'info' | 'warning'
}

export function ToDoList({
                             toDoListId,
                             toDoListTitle,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeToDoList,
                             updateTaskTitle,
                             updateToDoListTitle
                         }: PropsType) {

    const buttonData: ButtonType[] = [
        {
            id: v1(),
            title: 'All',
            onClickHandler: () => changeFilter('all', toDoListId),
            color: filter === 'all' ? 'secondary' : 'primary'
        }, {
            id: v1(),
            title: 'Active',
            onClickHandler: () => changeFilter('active', toDoListId),
            color: filter === 'active' ? 'secondary' : 'primary'
        }, {
            id: v1(),
            title: 'Completed',
            onClickHandler: () => changeFilter('completed', toDoListId),
            color: filter === 'completed' ? 'secondary' : 'primary'
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

    const removeToDoListHandler = () => removeToDoList(toDoListId)

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, toDoListId)
    },[])

    const updateTaskTitleHandler = (taskId: string, updatedTitle: string) => {
        updateTaskTitle(toDoListId, taskId, updatedTitle)
    }

    const updateToDoListTitleHandler = (updatedTitle: string) => {
        updateToDoListTitle(toDoListId, updatedTitle)
    }


    return <div>
        <ToDoListHeader
            toDoListTitle={toDoListTitle}
            removeToDoList={removeToDoListHandler}
            updateToDoListTitle={updateToDoListTitleHandler}/>
        <ToDoListBody
            toDoListId={toDoListId}
            addTaskHandler={addTaskHandler}
            buttonData={buttonData}
            filterTasks={filterTasks}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            updateTaskTitleHandler={updateTaskTitleHandler}/>
    </div>
}