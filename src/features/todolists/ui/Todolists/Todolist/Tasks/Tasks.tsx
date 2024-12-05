import List from '@mui/material/List';
import {useAppSelector} from '../../../../../../common/hooks/useAppSelector';
import {selectTasks} from '../../../../model/tasksSelectors';
import type {ToDoListsType} from '../../../../model/todolists-reducer';
import {Task} from './Task/Task';


type Props={
    todolist: ToDoListsType
}

export const Tasks = ({todolist}: Props) => {
    const tasks  = useAppSelector(selectTasks)

    const allTodolistTasks = tasks[todolist.id]
    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {
                tasksForTodolist.length === 0
                    ? <p>No tasks</p>
                    : <List sx={{p:'4ch 0',m:'0'}}>
                        {tasksForTodolist.map((task) => <Task key={task.id} task={task} todolistId={todolist.id}/>)}
                    </List>
            }
        </>
    );
};