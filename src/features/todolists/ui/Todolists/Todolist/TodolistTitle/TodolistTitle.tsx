import {Delete} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {useAppDispatch} from '../../../../../../common/hooks/useAppDispatch';
import s from './TodolistTitle.module.css'
import {EditableSpan} from '../../../../../../common/components/EditableSpan/EditableSpan';
import {changeToDoListTitleAC, removeToDoListAC, type ToDoListsType} from '../../../../model/todolists-reducer';

type Props = {
    todolist: ToDoListsType
};

export const TodolistTitle = ({todolist}: Props) => {

    const dispatch = useAppDispatch()

    const updateToDoListTitle = (title: string) => {
        dispatch(changeToDoListTitleAC({id: todolist.id, title}))
    }

    const removeToDoList = () => {
        dispatch(removeToDoListAC({id:todolist.id}))
    }


    return (
        <div className={s.container}>
            <h3 className={s.title}>
                <EditableSpan
                    oldTitle={todolist.title}
                    onClick={(updatedTitle) => updateToDoListTitle(updatedTitle)}/>
            </h3>
            <IconButton
                aria-label="delete"
                onClick={removeToDoList}
            sx={{m:'0'}}>
                <Delete/>
            </IconButton>
        </div>
    );
};