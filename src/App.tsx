import React, {useState} from 'react';
import './App.css';
import { ToDoList} from './components/ToDoList/ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';

type ToDoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksType={
    [key:string]:TaskType[]
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    const toDoListId1 = v1()
    const toDoListId2 = v1()

    const [toDoLists, setToDoLists] = useState<ToDoListsType[]>([
        {id: toDoListId1, title: 'what to learn', filter: 'active'},
        {id: toDoListId2, title: 'what to buy', filter: 'completed'}
    ])

    const [tasksObj, setTasks] = useState<TasksType>({
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

//ToDoList logic
    const changeFilter = (newFilter: FilterValuesType, toDolistId: string) => {
        let toDoList = toDoLists.find((tl) => tl.id === toDolistId)
        if (toDoList) {
            toDoList.filter = newFilter
            setToDoLists([...toDoLists])
        }
    }

    const updateToDoListTitle = (toDoListId: string, title: string) => {
        setToDoLists(toDoLists.map(el=>el.id===toDoListId?{...el,title}:el))
    }

    const removeToDoList = (toDoListId: string) => {
        setToDoLists(toDoLists.filter(td => td.id !== toDoListId))
        delete tasksObj[toDoListId]
        setTasks({...tasksObj})
    }

    const addToDoList = (title: string) => {
        const id = v1()
        setToDoLists([...toDoLists, {id, title, filter: 'all'}])
        setTasks({...tasksObj, [id]: []})
    }

    //Task logic
    const addTask = (newTaskTitle: string, toDolistId: string) => {
        let newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks({
            ...tasksObj, [toDolistId]: [...tasksObj[toDolistId], newTask]
        })
    }

    const removeTask = (id: string, toDolistId: string) => {
        setTasks({...tasksObj, [toDolistId]: tasksObj[toDolistId].filter(el => el.id !== id)})
        delete tasksObj[toDolistId]
    }

    const changeStatus = (taskId: string, isDone: boolean, toDolistId: string) => {
        setTasks({
            ...tasksObj,
            [toDolistId]: [...tasksObj[toDolistId].map(task => task.id === taskId ? {...task, isDone} : task)]
        })
    }

    const updateTaskTitle = (toDoListId: string, taskId: string, title: string) => {
        setTasks({...tasksObj, [toDoListId]: tasksObj[toDoListId].map(el => el.id === taskId ? {...el, title} : el)})
    }


    return <div className="App">
        <AddItemForm addItem={addToDoList}/>
        {toDoLists.map((tl) => {
            return <ToDoList
                key={tl.id}
                toDoListId={tl.id}
                toDoListTitle={tl.title}
                tasks={tasksObj[tl.id]}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={tl.filter}
                removeToDoList={removeToDoList}
                updateTaskTitle={updateTaskTitle}
                updateToDoListTitle={updateToDoListTitle}
            />
        })}
    </div>
}

export default App;
