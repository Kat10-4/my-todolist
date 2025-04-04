import { Delete } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { EditableSpan } from "../../../../../../common/components"
import { useAppDispatch } from "../../../../../../common/hooks"
import s from "./TodolistTitle.module.css"
import { changeToDoListTitleAC, removeToDoListAC, type TodoList } from "../../../../model/todolists-slice"

type Props = {
  todolist: TodoList
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const updateToDoListTitle = (title: string) => {
    dispatch(changeToDoListTitleAC({ id: todolist.id, title }))
  }

  const removeToDoList = () => {
    dispatch(removeToDoListAC({ id: todolist.id }))
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}>
        <EditableSpan oldTitle={todolist.title} onClick={(updatedTitle) => updateToDoListTitle(updatedTitle)} />
      </h3>
      <IconButton aria-label="delete" onClick={removeToDoList} sx={{ m: "0" }}>
        <Delete />
      </IconButton>
    </div>
  )
}
