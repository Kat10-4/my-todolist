import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])


    function addTask(newTaskTitle: string) {
        setTasks([{
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }, ...tasks])
    }


    function removeTask(id: string) {
        let resultTasks = tasks.filter(el => el.id !== id)
        setTasks(resultTasks)
    }


    let [filter, setFilter] = useState<FilterValuesType>("all")

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
        <ToDoList title={"What to learn"} task={filteredTasks} removeTask={removeTask} changeFilter={changeFilter}
                  addTask={addTask}/>
    </div>
}

export default App;
