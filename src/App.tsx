import React, {useState} from 'react';
import './App.css';
import {ToDoList} from './components/ToDoList/ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid2, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

type ToDoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: TaskType[]
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
        {id: toDoListId1, title: 'what to learn', filter: 'all'},
        {id: toDoListId2, title: 'what to buy', filter: 'all'}
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
        setToDoLists(toDoLists.map(el => el.id === toDoListId ? {...el, title} : el))
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
        <AppBar position="static">
            <Container sx={{maxWidth: '1140px'}} maxWidth={false}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        To Do Lists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </Container>
        </AppBar>
        <Container sx={{maxWidth: '1140px'}} maxWidth={false}>
            <Grid2 container>
                <AddItemForm addItem={addToDoList}/>
            </Grid2>
            <Grid2 container spacing={4}>
                {toDoLists.map((tl) => {
                    return <Grid2 key={tl.id}>
                        <Paper>
                            <ToDoList
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
                        </Paper>

                    </Grid2>
                })}
            </Grid2>
        </Container>
    </div>
}

export default App;
