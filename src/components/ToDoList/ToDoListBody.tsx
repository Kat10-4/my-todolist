import {AddItemForm} from '../AddItemForm/AddItemForm';
import React, {ChangeEvent} from 'react';
import {TaskType} from '../../App';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {ButtonType} from './ToDoList';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';


type ToDoListBodyProps = {
    toDoListId: string
    buttonData: ButtonType[]
    filterTasks: () => TaskType[]
    removeTask: (id: string, toDolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, toDolistId: string) => void
    addTaskHandler: (newTaskTitle: string) => void
    updateTaskTitleHandler: (taskId: string, updatedTitle: string) => void
};

export const ToDoListBody = ({
                                 addTaskHandler,
                                 buttonData,
                                 filterTasks,
                                 removeTask,
                                 toDoListId,
                                 changeTaskStatus,
                                 updateTaskTitleHandler
                             }: ToDoListBodyProps) => {

    const filterButtons = buttonData.map(el => {
        return <Button key={el.id}
                       variant={'contained'}
                       onClick={el.onClickHandler}
                       color={el.color}>{el.title}</Button>
    })

    const tasksList = filterTasks().map(t => {
            const onRemoveHandler = () => removeTask(t.id, toDoListId)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(t.id, e.currentTarget.checked, toDoListId)
            }
            return (
                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <Checkbox checked={t.isDone}
                              color="secondary"
                              onChange={onChangeHandler}
                              />
                    <EditableSpan oldTitle={t.title}
                                  onClick={(updatedTitle) => updateTaskTitleHandler(t.id, updatedTitle)}/>
                    <IconButton aria-label="delete"
                                onClick={onRemoveHandler}>
                        <Delete/>
                    </IconButton>
                </li>)
        }
    )


    return (
        <div>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                {filterButtons}
            </div>
        </div>
    );
};