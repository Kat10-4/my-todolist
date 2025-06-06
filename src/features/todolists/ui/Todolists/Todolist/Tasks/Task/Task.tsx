import { Box, Checkbox, IconButton, ListItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import React from "react"
import { EditableSpan } from "../../../../../../../common/components"
import { useAppDispatch } from "../../../../../../../common/hooks"
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  type Task as TaskType,
} from "../../../../../model/tasks-slice"
import { getBoxSx, getListItemSx } from "./Task.styles"

type Props = {
  task: TaskType
  todolistId: string
}

export const Task = React.memo(({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const removeTask = () => {
    dispatch(removeTaskAC({ taskId: task.id, todolistId }))
  }

  const changeTaskStatus = () => {
    dispatch(changeTaskStatusAC({ taskId: task.id, isDone: !task.isDone, todolistId }))
  }

  const updateTask = (title: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, newTitle: title, todolistId }))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <Box sx={getBoxSx()}>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} sx={{ m: "0" }} />
        <EditableSpan oldTitle={task.title} onClick={updateTask} />
      </Box>
      <IconButton onClick={removeTask} sx={{ m: "0" }}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
})
