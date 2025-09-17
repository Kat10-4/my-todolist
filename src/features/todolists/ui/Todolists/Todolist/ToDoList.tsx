import { Container } from "@mui/material"
import React, { useCallback } from "react"
import { AddItemForm } from "../../../../../common/components"
import { useAppDispatch } from "../../../../../common/hooks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { createListTC, type DomainList } from "../../../model/lists-slice"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type PropsType = {
  todolist: DomainList
}

export const ToDoList = React.memo(({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()

  const addTask = useCallback((title: string) => {
    dispatch(createListTC({parent: Number(todolist.id), title}))
  }, [])

  return (
    <Container>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'}/>
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </Container>
  )
})
