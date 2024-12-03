import React, {useCallback} from 'react';
import './App.css';
import {getTheme} from '../common/theme/Theme';
import {ToDoList} from '../components/ToDoList/ToDoList';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {
    Container,
    CssBaseline,
    Grid2,
    Paper,
    ThemeProvider,
} from '@mui/material';
import {Header} from '../Header';
import {
    addTodolistAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC, type FilterValuesType,
    removeToDoListAC, type ToDoListsType,
} from '../model/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, type TasksType} from '../model/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {type ThemeMode} from './app-reducer';
import {RootState} from './store';



export const App = () => {

    const toDoLists = useSelector<RootState,ToDoListsType[]>(state=>state.todolists)

    const tasksObj = useSelector<RootState,TasksType>(state=>state.tasks)

    const dispatch=useDispatch()

    const themeMode = useSelector<RootState,ThemeMode>(state=>state.app.themeMode)

    const theme = getTheme(themeMode)

//ToDoList logic

    const removeToDoList = (id: string) => {
        dispatch(removeToDoListAC(id))
    }

    const addTodolist = useCallback ((title: string) => {
        dispatch( addTodolistAC(title))
    }, [])

    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatch(changeToDoListFilterAC({filter, id}))
    }

    const updateToDoListTitle = (id: string, title: string) => {
        dispatch(changeToDoListTitleAC({id, title}))
    }


    //Task logic
    const addTask = (newTitle: string, todolistId: string) => {
        dispatch(addTaskAC({newTitle, todolistId}))
    }

    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC({id, todolistId}))
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone, todolistId}))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, newTitle}))
    }


    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
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


