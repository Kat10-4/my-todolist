import React from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";


function App() {

    let task1:Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    let task2:Array<TaskType> = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 2, title: "XXX", isDone: false},
        {id: 3, title: "Jentlemen of Fortune", isDone: true},
    ]

    return <div className="App">
        <ToDoList title={"What to learn"} task={task1}/>
        <ToDoList title={"Movies"} task={task2}/>
        <ToDoList title={"Songs"} task={task1}/>
    </div>
}

export default App;
