import { Box, Checkbox, IconButton, ListItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import React, { type ChangeEvent } from "react"
import { EditableSpan } from "../../../../../../../common/components"
import { useAppDispatch } from "../../../../../../../common/hooks"
import { deleteTaskTC, updateTaskTC } from "../../../../../model/tasks-slice"
import { getBoxSx, getListItemSx } from "./Task.styles"
import { TaskStatus } from "../../../../../../../common/enums"
import type { DomainList } from "../../../../../model/lists-slice"

type Props = {
  task: DomainList
  todolistId: string
}

export const Task = React.memo(({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const isTaskCompleted = task.status === TaskStatus.Done

  const removeTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(
      updateTaskTC({
        todolistId,
        taskId: task.id,
        domainModel: { status: newStatusValue ? TaskStatus.Done : TaskStatus.Active },
      }),
    )
  }

  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC({ todolistId, taskId: task.id, domainModel: { title } }))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(isTaskCompleted)}>
      <Box sx={getBoxSx()}>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} sx={{ m: "0" }} />
        <EditableSpan oldTitle={task.title} onClick={changeTaskTitle} />
      </Box>
      <IconButton onClick={removeTask} sx={{ m: "0" }}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
})
