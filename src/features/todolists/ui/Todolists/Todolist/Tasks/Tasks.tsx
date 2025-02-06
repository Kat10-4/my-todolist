import React, {useMemo} from 'react';
import List from '@mui/material/List';
import {useAppSelector} from '../../../../../../common/hooks/useAppSelector';
import {selectTasks} from '../../../../model/tasksSelectors';
import type {ToDoListsType} from '../../../../model/todolists-reducer';
import {Task} from './Task/Task';


type Props = {
    todolist: ToDoListsType
}

export const Tasks = React.memo(({todolist}: Props) => {

    const tasks = useAppSelector(selectTasks)

    const allTodolistTasks = tasks[todolist.id]

    const tasksForTodolist = useMemo(() => {
        if (todolist.filter === 'active') {
            return allTodolistTasks.filter(task => !task.isDone)
        }

        if (todolist.filter === 'completed') {
            return allTodolistTasks.filter(task => task.isDone)
        }
        return allTodolistTasks
    }, [allTodolistTasks, todolist.filter])


    return (
        <>
            {
                tasksForTodolist.length === 0
                    ? <p style={{margin: '30px 0'}}>No tasks</p>
                    : <List sx={{m: '30px 0', p: '0'}}>
                        {tasksForTodolist.map((task) => <Task key={task.id} task={task} todolistId={todolist.id}/>)}
                    </List>
            }
        </>
    );
})