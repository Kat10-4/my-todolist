import { Container } from "@mui/material"
import React, { useCallback } from "react"
import { AddItemForm } from "../../../../../common/components"
import { useAppDispatch } from "../../../../../common/hooks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { type DomainTodolist } from "../../../model/todolists-slice"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { createTaskTC } from "../../../model/tasks-slice"

type PropsType = {
  todolist: DomainTodolist
}

export const ToDoList = React.memo(({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()

  const addTask = useCallback((title: string) => {
    dispatch(createTaskTC({todolistId: todolist.id, title}))
  }, [])

  return (
    <Container>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </Container>
  )
})
