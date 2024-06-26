import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
    addTask: (newTaskTitle: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function ToDoList({title, task, removeTask, changeFilter, addTask, changeTaskStatus, filter}: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (e.key === "Enter") {
            if (newTaskTitle.trim() !== "") {
                addTask(newTaskTitle);
                setNewTaskTitle("")
            } else {
                setError("Field is required")
            }
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            addTask(newTaskTitle);
            setNewTaskTitle("")
        } else {
            setError("Field is required")
        }
    }

    const onAllClickHandler = () => changeFilter("all")

    const onActiveClickHandler = () => changeFilter("active")

    const onCompletedClickHandler = () => changeFilter("completed")

    return <div>
        <h3>{title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyUpHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTaskHandler}>+
            </button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {task.map(t => {
                    const onRemoveHandler = () => removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
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
            <button className={filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}