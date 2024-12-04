import {Container, Grid2} from '@mui/material';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm';
import {addTodolistAC} from '../features/todolists/model/todolists-reducer';
import {ToDoLists} from '../features/todolists/ui/Todolists/ToDoLists';


export const Main = () => {

    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])


    return (
        <Container sx={{maxWidth: '1140px'}} maxWidth={false}>
            <Grid2 container sx={{padding: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid2>
            <Grid2 container spacing={4}>
                <ToDoLists/>
            </Grid2>
        </Container>
    );
};