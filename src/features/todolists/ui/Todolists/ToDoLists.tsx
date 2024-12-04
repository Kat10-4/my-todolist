import {Grid2, Paper} from '@mui/material';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {selectTodolist} from '../../model/todlistSelectors';
import {ToDoList} from './Todolist/ToDoList';


export const ToDoLists = () => {
    const toDoLists = useAppSelector(selectTodolist)

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