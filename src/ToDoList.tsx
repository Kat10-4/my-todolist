import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    task: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (newFilter: FilterValuesType) => void
}

export function ToDoList({title, task, removeTask, changeFilter}: PropsType) {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {task.map(t =>
                <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => removeTask(t.id)}>x</button>
                </li>
            )}
        </ul>
        <div>
            <button onClick={()=>changeFilter("all")}>All</button>
            <button onClick={()=>changeFilter("active")}>Active</button>
            <button onClick={()=>changeFilter("completed")}>Completed</button>
        </div>
    </div>
}