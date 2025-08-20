import React, { useMemo } from "react"
import List from "@mui/material/List"
import { useAppSelector } from "../../../../../../common/hooks"
import { selectTasks } from "../../../../model/tasks-slice"
import type { DomainTodolist } from "../../../../model/todolists-slice"
import { Task } from "./Task/Task"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = React.memo(({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[todolist.id]

  const filteredTasks = useMemo(() => {
    if (todolist.filter === "active") {
      return todolistTasks.filter((task) => !task.isDone)
    }

    if (todolist.filter === "completed") {
      return todolistTasks.filter((task) => task.isDone)
    }
    return todolistTasks
  }, [todolistTasks, todolist.filter])

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
