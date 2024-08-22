import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from './components/ToDoList/ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed'

type ToDoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App(){
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

    const addTask = (newTaskTitle: string, toDolistId: string) => {
        let newTask:TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks({
            ...tasksObj, [toDolistId]: [...tasksObj[toDolistId], newTask]
        })
    }

    const removeTask = (id: string, toDolistId: string) => {
        setTasks({...tasksObj, [toDolistId]: tasksObj[toDolistId].filter(el => el.id !== id)})
        delete tasksObj[toDolistId]
    }

    const changeFilter = (newFilter: FilterValuesType, toDolistId: string) => {
        let toDoList = toDoLists.find((tl) => tl.id === toDolistId)
        if (toDoList) {
            toDoList.filter = newFilter
            setToDoLists([...toDoLists])
        }
    }

    const changeStatus = (taskId: string, isDone: boolean, toDolistId: string) => {
        setTasks({
            ...tasksObj,
            [toDolistId]: [...tasksObj[toDolistId].map(task => task.id === taskId ? {...task, isDone} : task)]
        })
    }

    const removeToDoList = (toDoListId: string) => {
        setToDoLists(toDoLists.filter(td => td.id !== toDoListId))
        delete tasksObj[toDoListId]
        setTasks({...tasksObj})
    }

    const addListHandler=(title:string)=>{
        const id = v1()
        setToDoLists([...toDoLists,{id, title, filter: 'all'}])
        setTasks({...tasksObj,[id]:[]})
    }

    return <div className="App">
        <AddItemForm addItem={addListHandler}/>
        {toDoLists.map((tl) => {

            let filteredTasks = tasksObj[tl.id]

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
                removeToDoList={removeToDoList}
            />
        })}
    </div>
}

export default App;
