import React, { useEffect, useMemo } from "react"
import List from "@mui/material/List"
import { useAppDispatch, useAppSelector } from "../../../../../../common/hooks"
import { fetchTasksTC, selectTasks } from "../../../../model/tasks-slice"
import type { DomainTodolist } from "../../../../model/todolists-slice"
import { Task } from "./Task/Task"
import { TaskStatus } from "../../../../../../common/enums"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = React.memo(({ todolist }: Props) => {
const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }
  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p style={{ margin: "30px 0" }}>No tasks</p>
      ) : (
        <List sx={{ m: "30px 0", p: "0" }}>
          {filteredTasks?.map((task) => <Task key={task.id} task={task} todolistId={todolist.id} />)}
        </List>
      )}
    </>
  )
})
