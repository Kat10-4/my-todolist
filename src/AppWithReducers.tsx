import React, {useReducer, useState} from 'react';
import './App.css';
import {ToDoList} from './components/ToDoList/ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {
    AppBar,
    Container,
    createTheme, CssBaseline,
    Grid2,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from './components/Button/MenuButton';
import {orange, purple} from '@mui/material/colors';
import Switch from '@mui/material/Switch'
import {
    addTodolistAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC,
    removeToDoListAC,
    todolistsReducer
} from './model/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './model/tasks-reducer';

export type ToDoListsType = {
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

type ThemeMode = 'dark' | 'light'

export const AppWithReducers = () => {

    const [toDoLists, dispatchToTodolists] = useReducer(todolistsReducer, [])

    const [tasksObj, dispatchToTasks] = useReducer(tasksReducer, {})

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            primary: purple,
            secondary: orange,
            mode: themeMode === 'light' ? 'light' : 'dark',
        },
    })


//ToDoList logic

    const removeToDoList = (id: string) => {
        dispatchToTodolists(removeToDoListAC(id))
        dispatchToTasks(removeToDoListAC(id))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatchToTodolists(changeToDoListFilterAC({filter, id}))
    }

    const updateToDoListTitle = (id: string, title: string) => {
        dispatchToTodolists(changeToDoListTitleAC({id, title}))
    }


    //Task logic
    const addTask = (newTitle: string, todolistId: string) => {
        dispatchToTasks(addTaskAC({newTitle, todolistId}))
    }

    const removeTask = (id: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC({id, todolistId}))
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC({taskId, isDone, todolistId}))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, newTitle}))
    }


    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBar position="static">
            <Container sx={{maxWidth: '1140px'}} maxWidth={false}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
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
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </Toolbar>
            </Container>
        </AppBar>
        <Container sx={{maxWidth: '1140px'}} maxWidth={false}>
            <Grid2 container sx={{padding: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid2>
            <Grid2 container spacing={3}>
                {toDoLists.map((tl) => {
                    return <Grid2 key={tl.id}>
                        <Paper sx={{padding: '20px'}} elevation={10} square>
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
    </ThemeProvider>
}


