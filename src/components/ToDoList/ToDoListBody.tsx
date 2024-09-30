import {AddItemForm} from '../AddItemForm/AddItemForm';
import React, {ChangeEvent} from 'react';
import {TaskType} from '../../App';
import {Button} from '../Button/Button';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {ButtonType} from './ToDoList';


type ToDoListBodyProps = {
    addTaskHandler: (newTaskTitle: string) => void
    buttonData: ButtonType[]
    filterTasks: () => TaskType[]
    removeTask: (id: string, toDolistId: string) => void,
    id: string
    changeTaskStatus:(taskId: string, isDone: boolean, toDolistId: string) => void
    updateTaskTitleHandler:(taskId: string, updatedTitle: string)=>void
};

export const ToDoListBody = ({addTaskHandler, buttonData, filterTasks, removeTask,id,changeTaskStatus,updateTaskTitleHandler}: ToDoListBodyProps) => {

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