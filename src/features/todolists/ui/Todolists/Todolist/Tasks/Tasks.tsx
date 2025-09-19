import React, { useMemo } from "react"
import List from "@mui/material/List"
import { useAppSelector } from "../../../../../../common/hooks"
import { type DomainList } from "../../../../model/lists-slice"
import { Task } from "./Task/Task"
import { TaskStatus } from "../../../../../../common/enums"

type Props = {
  todolist: DomainList
}

export const Tasks = React.memo(({ todolist }: Props) => {
  const { id, filter } = todolist

  const todolists: DomainList[] = useAppSelector((state) => state.lists)

  const todolistTasks = useMemo(() => {
    return todolists.filter(item => 
      item.parent !== null && Number(item.parent) === Number(id)
    )
  }, [todolists, id])


  const filteredTasks = useMemo(() => {
    if (!todolistTasks) return []

    return todolistTasks.filter((task) => {
      if (filter === "active") return task.status === TaskStatus.Active
      if (filter === "completed") return task.status === TaskStatus.Done
      return true
    })
  }, [todolistTasks, filter])

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p style={{ margin: "30px 0" }}>No tasks</p>
      ) : (
        <List sx={{ m: "30px 0", p: "0" }}>
          {filteredTasks?.map((task) => <Task key={`task-${task.id}-${todolist.id}`} task={task} />)}
        </List>
      )}
    </>
  )
})
