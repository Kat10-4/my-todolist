import { Box, Checkbox, IconButton, ListItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import React from "react"
import { EditableSpan } from "../../../../../../../common/components"
import { useAppDispatch } from "../../../../../../../common/hooks"
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../../../../../model/tasks-slice"
import { getBoxSx, getListItemSx } from "./Task.styles"
import type { DomainTask } from "../../../../../api"
import { TaskStatus } from "../../../../../../../common/enums"

type Props = {
  task: DomainTask
  todolistId: string
}

export const Task = React.memo(({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const isTaskCompleted = task.status === TaskStatus.Completed


  const removeTask = () => {
    dispatch(removeTaskAC({ taskId: task.id, todolistId }))
  }

  const changeTaskStatus = () => {
    dispatch(changeTaskStatusAC({ taskId: task.id, isDone: !isTaskCompleted, todolistId }))
  }

  const updateTask = (title: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, newTitle: title, todolistId }))
  }


  return (
    <ListItem key={task.id} sx={getListItemSx(isTaskCompleted)}>
      <Box sx={getBoxSx()}>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} sx={{ m: "0" }} />
        <EditableSpan oldTitle={task.title} onClick={updateTask} />
      </Box>
      <IconButton onClick={removeTask} sx={{ m: "0" }}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
})
