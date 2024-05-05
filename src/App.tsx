import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: number) {
        let resultTasks = tasks.filter(el => el.id !== id)
        setTasks(resultTasks)
    }

    function changeFilter(newFilter: FilterValuesType) {
        setFilter(newFilter)
    }

    let filteredTasks = tasks
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.isDone === true)
    }
    if (filter === "active") {
        filteredTasks = tasks.filter(task => task.isDone === false)
    }

    return <div className="App">
        <ToDoList title={"What to learn"} task={filteredTasks} removeTask={removeTask} changeFilter={changeFilter}/>
    </div>
}

export default App;
