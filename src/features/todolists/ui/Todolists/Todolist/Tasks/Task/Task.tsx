import {Checkbox, IconButton, ListItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from '../../../../../../../common/components/EditableSpan/EditableSpan';
import {useAppDispatch} from '../../../../../../../common/hooks/useAppDispatch';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, type TaskType} from '../../../../../model/tasks-reducer';
import {getListItemSx} from './Task.styles';

type Props = {
    task:TaskType
    todolistId:string
};

export const Task = ({task,todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const removeTask = () => {
        dispatch(removeTaskAC({id:task.id, todolistId}))
    }

    const changeTaskStatus = () => {
        dispatch(changeTaskStatusAC({taskId:task.id, isDone: !task.isDone, todolistId}))
    }

    const updateTask = (title: string) => {
        dispatch(changeTaskTitleAC({taskId:task.id, newTitle:title, todolistId}))
    }


    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan oldTitle={task.title} onClick={updateTask}/>
            </div>
            <IconButton onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
};