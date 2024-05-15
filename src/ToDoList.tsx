import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    task: Array<TaskType>,
    removeTask: (id: string) => void,
    changeFilter: (newFilter: FilterValuesType) => void,
    addTask: (newTaskTitle: string) => void
}

export function ToDoList({title, task, removeTask, changeFilter, addTask}: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addTaskHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle("")
    }

    const onAllClickHandler = () => changeFilter("all")
    const onActiveClickHandler = () => changeFilter("active")
    const onCompletedClickHandler = () => changeFilter("completed")

    return <div>
        <h3>{title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyUpHandler}/>
            <button onClick={addTaskHandler}>+
            </button>
        </div>
        <ul>
            {task.map(t => {
                    const onRemoveHandler = () => removeTask(t.id)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>)
                }
            )
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}