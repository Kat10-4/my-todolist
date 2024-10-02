import {AddItemForm} from '../AddItemForm/AddItemForm';
import React, {ChangeEvent} from 'react';
import {TaskType} from '../../App';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {ButtonType} from './ToDoList';
import {Box, Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {filterButtonsContainerSx, listItemsSx} from './Todolist.styles';


type ToDoListBodyProps = {
    toDoListId: string
    buttonData: ButtonType[]
    filterTasks: () => TaskType[]
    removeTask: (id: string, toDolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, toDolistId: string) => void
    addTaskHandler: (newTaskTitle: string) => void
    updateTaskTitleHandler: (taskId: string, updatedTitle: string) => void
};

export const ToDoListBody = ({
                                 addTaskHandler,
                                 buttonData,
                                 filterTasks,
                                 removeTask,
                                 toDoListId,
                                 changeTaskStatus,
                                 updateTaskTitleHandler
                             }: ToDoListBodyProps) => {

    const filterButtons = buttonData.map(el => {
        return <Button key={el.id}
                       variant={'contained'}
                       onClick={el.onClickHandler}
                       color={el.color}
                       sx={{borderRadius: '0'}}
        >{el.title}
        </Button>
    })

    const tasksList = filterTasks().map(t => {
            const onRemoveHandler = () => removeTask(t.id, toDoListId)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(t.id, e.currentTarget.checked, toDoListId)
            }
            return (
                <ListItem
                    key={t.id}
                    disableGutters
                    disablePadding
                    sx={listItemsSx(t.isDone)}
                    divider={true}
                    secondaryAction={<IconButton
                        aria-label="delete"
                        onClick={onRemoveHandler}>
                        <Delete/>
                    </IconButton>}>
                    <Checkbox
                        checked={t.isDone}
                        color="secondary"
                        onChange={onChangeHandler}
                    />
                    <EditableSpan
                        oldTitle={t.title}
                        onClick={(updatedTitle) => updateTaskTitleHandler(t.id, updatedTitle)}/>
                </ListItem>)
        }
    )


    return (
        <div>
            <AddItemForm addItem={addTaskHandler}/>
            <List>
                {tasksList}
            </List>
            <Box sx={filterButtonsContainerSx}>
                {filterButtons}
            </Box>
        </div>
    );
};