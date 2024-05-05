import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";


function App() {

    const [tasks,setTasks]=useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])

    function removeTask(id:number){
        let resultTasks=tasks.filter(el=>el.id!==id)
        setTasks(resultTasks)
    }

    return <div className="App">
        <ToDoList title={"What to learn"} task={tasks} removeTask={removeTask}/>
    </div>
}

export default App;
