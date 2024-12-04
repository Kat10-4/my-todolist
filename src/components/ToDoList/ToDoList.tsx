import {Delete} from '@mui/icons-material';
import {Container, Grid2, IconButton} from '@mui/material';
import React, {useCallback} from 'react';
import '../../app/App.css'
import {v1} from 'uuid';
import {FilterTasksButtons} from '../../FilterTasksButtons';
import type {ToDoListsType} from '../../model/todolists-reducer';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {ToDoListHeader} from './ToDoListHeader';
import {ToDoListBody} from './ToDoListBody';

type PropsType = {
    todolist: ToDoListsType
}



export function ToDoList({todolist}: PropsType) {



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
    }, [])

    const updateTaskTitleHandler = (taskId: string, updatedTitle: string) => {
        updateTaskTitle(toDoListId, taskId, updatedTitle)
    }

    const updateToDoListTitleHandler = (updatedTitle: string) => {
        updateToDoListTitle(toDoListId, updatedTitle)
    }


    return <Container>
        <Grid2 container sx={{justifyContent: 'space-between',alignItems:'center'}}>
            <Grid2>
                <h3 style={{textTransform: 'uppercase'}}>
                    <EditableSpan
                        oldTitle={todolist.title}
                        onClick={(updatedTitle) => updateToDoListTitle(updatedTitle)}/>
                </h3>
            </Grid2>
            <Grid2>
                <IconButton
                    aria-label="delete"
                    onClick={removeToDoList}>
                    <Delete/>
                </IconButton>
            </Grid2>
        </Grid2>

        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <List>
                {tasks.map(task => {
                    const removeTaskHandler = () => {
                        removeTask(task.id, todolist.id)
                    }

                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newStatusValue, todolist.id)
                    }

                    const changeTaskTitleHandler = (title: string) => {
                        updateTask(todolist.id, task.id, title)
                    }
                    return (
                        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                            <div>
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                            </div>
                            <IconButton onClick={removeTaskHandler}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItem>
                    )
                })}
            </List>
        )}

        <FilterTasksButtons todolist={todolist}/>
    </Container>
}