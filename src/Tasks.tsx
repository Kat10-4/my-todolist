import List from '@mui/material/List';
import {useSelector} from 'react-redux';
import {RootState} from './app/store';
import type {TasksType} from './model/tasks-reducer';
import type {ToDoListsType} from './model/todolists-reducer';
import {Task} from './Task';


type Props={
    todolist: ToDoListsType
}

export const Tasks = ({todolist}: Props) => {
    const tasks  = useSelector<RootState, TasksType>(state => state.tasks)

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
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasksForTodolist.map((task) => <Task key={task.id} task={task} todolistId={todolist.id}/>)}
                    </List>
            }
        </>
    );
};