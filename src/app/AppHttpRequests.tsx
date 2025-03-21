import axios from 'axios';
import {type ChangeEvent, type CSSProperties, useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import {CreateItemForm,EditableSpan} from '../common/components';
import type {BaseResponse} from '../common/types';



const token = '714ecac0-93f5-4e06-92d8-4a78b2b2eb89'
const apiKey = '5a84ec24-5118-4689-a393-1705bd1d41e8'

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<TodoList[]>([])
    const [tasks, setTasks] = useState<any>({})

    useEffect(() => {
        axios.get<TodoList[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setTodolists(res.data)
            })
    }, [])

    const createTodolist = (title: string) => {
        axios.post<BaseResponse<{ item: TodoList }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'API-KEY': apiKey
            }
        })
            .then(res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            })
    }

    const deleteTodolist = (id: string) => {
        axios.delete<BaseResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'API-KEY': apiKey
            }
        })
            .then(() => {
                setTodolists(todolists.filter(td => td.id !== id))
            })
    }

    const changeTodolistTitle = (id: string, title: string) => {
        axios.put<BaseResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'API-KEY': apiKey
            }
        })
            .then(() => {
                setTodolists(todolists.map(td => td.id === id ? {...td, title} : td))
            })
    }

    const createTask = (todolistId: string, title: string) => {
    }

    const deleteTask = (todolistId: string, taskId: string) => {
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {
    }

    const changeTaskTitle = (task: any, title: string) => {
    }

    return (
        <div style={{margin: '20px'}}>
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolists.map(todolist => (
                <div key={todolist.id} style={container}>
                    <div>
                        <EditableSpan oldTitle={todolist.title}
                                      onClick={title => changeTodolistTitle(todolist.id, title)}/>
                        <button onClick={() => deleteTodolist(todolist.id)}>x</button>
                    </div>
                    <CreateItemForm onCreateItem={title => createTask(todolist.id, title)}/>
                    {tasks[todolist.id]?.map((task: any) => (
                        <div key={task.id}>
                            <Checkbox checked={task.isDone}
                                      onChange={e => changeTaskStatus(e, task)}/>
                            <EditableSpan oldTitle={task.title}
                                          onClick={title => changeTaskTitle(task, title)}/>
                            <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const container: CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}

export type TodoList = {
    id: string
    addedDate: string
    order: number
    title: string
}

