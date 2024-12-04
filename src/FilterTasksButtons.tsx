import {Box, Button} from '@mui/material';
import React from 'react';
import {useDispatch} from 'react-redux';
import {v1} from 'uuid';
import {filterButtonsContainerSx} from './components/ToDoList/Todolist.styles';
import {changeToDoListFilterAC, type FilterValuesType, type ToDoListsType} from './model/todolists-reducer';

export type FilterButtons = {
    id: string
    title: string
    onClickHandler: () => void
    color: 'secondary' | 'primary' | 'inherit' | 'success' | 'error' | 'info' | 'warning'
}

type Props = {
    todolist: ToDoListsType
};

export const FilterTasksButtons = ({todolist}: Props) => {

    const {filter, id} = todolist

    const dispatch = useDispatch()

    const changeFilter = (filter: FilterValuesType) => {
        dispatch(changeToDoListFilterAC({id, filter}))
    }

    const filterButtonsData: FilterButtons[] = [
        {
            id: v1(),
            title: 'All',
            onClickHandler: () => changeFilter('all'),
            color: filter === 'all' ? 'secondary' : 'primary'
        }, {
            id: v1(),
            title: 'Active',
            onClickHandler: () => changeFilter('active'),
            color: filter === 'active' ? 'secondary' : 'primary'
        }, {
            id: v1(),
            title: 'Completed',
            onClickHandler: () => changeFilter('completed'),
            color: filter === 'completed' ? 'secondary' : 'primary'
        }
    ]

    const FilterButtons = filterButtonsData.map(el => {
        return <Button key={el.id}
                       variant={'contained'}
                       onClick={el.onClickHandler}
                       color={el.color}
                       sx={{borderRadius: '0'}}
        >{el.title}
        </Button>
    })

    return (
        <Box sx={filterButtonsContainerSx}>
            {FilterButtons}
        </Box>
    );
};