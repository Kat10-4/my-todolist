import {Grid2, Paper} from '@mui/material';
import {useAppSelector} from '../../../../common/hooks';
import {selectTodolist} from '../../model/todolistSelectors';
import {ToDoList} from './Todolist/ToDoList';


export const ToDoLists = () => {
    const toDoLists = useAppSelector(selectTodolist)

    return <>
        {toDoLists.map((tl) => {
            return (
                <Grid2 key={tl.id}>
                    <Paper sx={{p: '0 20px 20px 20px', width:'375px'}} elevation={3} square>
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