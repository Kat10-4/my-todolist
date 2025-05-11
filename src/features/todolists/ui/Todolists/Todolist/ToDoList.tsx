import { Container } from "@mui/material"
import React, { useCallback } from "react"
import { AddItemForm } from "../../../../../common/components"
import { useAppDispatch } from "../../../../../common/hooks"
import { addTaskAC } from "../../../model/tasks-slice"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { type TodoList } from "../../../model/todolists-slice"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type PropsType = {
  todolist: TodoList
}

export const ToDoList = React.memo(({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()

  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(todolist.id, title))
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
