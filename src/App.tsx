import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from './ToDoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

type ToDoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    let [toDoLists, setToDoLists] = useState<Array<ToDoListsType>>([
        {id: toDoListId1, title: 'what to learn', filter: 'active'},
        {id: toDoListId2, title: 'what to buy', filter: 'completed'}
    ])

    let [tasksObj, setTasks] = useState({
        [toDoListId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [toDoListId2]: [
            {id: v1(), title: 'book', isDone: false},
            {id: v1(), title: 'milk', isDone: true}
        ]
    })

    let [filter, setFilter] = useState<FilterValuesType>('all')

    function addTask(newTaskTitle: string) {
        setTasks([{
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }, ...tasks])
    }

    function removeTask(id: string, toDolistId: string) {
        let tasks = tasksObj[toDolistId]
        let resultTasks = tasks.filter(el => el.id !== id)
        tasksObj[toDolistId]=resultTasks
        setTasks({...tasksObj})
    }

    function changeFilter(newFilter: FilterValuesType, toDolistId: string) {
        let toDoList = toDoLists.find((tl) => tl.id === toDolistId)
        if (toDoList) {
            toDoList.filter = newFilter
            setToDoLists([...toDoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])//return copy!!!
    }


    return <div className="App">
        {toDoLists.map((tl) => {

            let filteredTasks = tasks[tl.id]

            if (tl.filter === 'completed') {
                filteredTasks = filteredTasks.filter(task => task.isDone === true)
            }
            if (tl.filter === 'active') {
                filteredTasks = filteredTasks.filter(task => task.isDone === false)
            }

            return <ToDoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                task={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={tl.filter}
            />
        })}
    </div>
}

export default App;
