import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "../common/components"
import { TaskStatus } from "../common/enums"
import { instance } from "../common/instance"
import { tasksApi, type DomainTask, todolistsApi, type TodoList, type UpdateTaskModel } from "../features/todolists/api"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<TodoList[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => setTasks((prev) => ({ ...prev, [todolist.id]: res.data.items })))
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolists(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
      setTasks({ ...tasks, [newTodolist.id]: [] })
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolists(id).then(() => {
      setTodolists(todolists.filter((todolist) => todolist.id !== id))
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistsTitle(id, title).then(() => {
      setTodolists(todolists.map((todolist) => (todolist.id === id ? { ...todolist, title } : todolist)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi
      .createTask(todolistId, title)
      .then((res) => setTasks({ ...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]] }))
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then(() =>
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
      }),
    )
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const todolistId = task.todoListId

    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: e.target.checked ? TaskStatus.Completed : TaskStatus.New,
    }

    tasksApi.changeTaskStatus(todolistId, task.id, model).then(() => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? { ...t, ...model } : t)) })
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const todolistId = task.todoListId

    const model: UpdateTaskModel = {
      description: task.description,
      title: title.trim(),
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
    }

    tasksApi.changeTaskTitle(todolistId, task.id, model).then((res) => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? { ...t, ...model } : t)) })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan oldTitle={todolist.title} onClick={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan oldTitle={task.title} onClick={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}

const obj = {
  d: "dcs",
}
