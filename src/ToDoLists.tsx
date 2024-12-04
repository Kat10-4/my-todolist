import {Grid2, Paper} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootState} from './app/store';
import {ToDoList} from './components/ToDoList/ToDoList';
import {type ToDoListsType} from './model/todolists-reducer';


export const ToDoLists = () => {
    const toDoLists = useSelector<RootState, ToDoListsType[]>(state => state.todolists)

    return <>
        {toDoLists.map((tl) => {
            return (
                <Grid2 key={tl.id}>
                    <Paper sx={{p: '0 20px 20px 20px'}}>
                        <ToDoList
                            key={tl.id}
                            todolist={tl}
                        />
                    </Paper>
                </Grid2>
            )
        })}
    </>
};