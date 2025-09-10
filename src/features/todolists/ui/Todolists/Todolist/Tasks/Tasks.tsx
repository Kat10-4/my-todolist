import React, { useMemo } from "react"
import List from "@mui/material/List"
import { useAppDispatch, useAppSelector } from "../../../../../../common/hooks"
import { selectTasksByParent, type DomainList } from "../../../../model/lists-slice"
import { Task } from "./Task/Task"
import { TaskStatus } from "../../../../../../common/enums"

type Props = {
  todolist: DomainList
}

export const Tasks = React.memo(({ todolist }: Props) => {
  const { id, filter } = todolist

  const todolistTasks = useAppSelector((state) => selectTasksByParent(state)(Number(id)))

  const filteredTasks = useMemo(() => {
    if (!todolistTasks) return []

    if (filter === "active") return todolistTasks.filter((task) => task.status === TaskStatus.Active)
    if (filter === "completed") return todolistTasks.filter((task) => task.status === TaskStatus.Done)

    return todolistTasks
  }, [todolistTasks, filter])

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
