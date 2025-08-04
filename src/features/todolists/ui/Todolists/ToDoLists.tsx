import { Grid2, Paper } from "@mui/material"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../common/hooks"
import { todolistsApi } from "../../api"
import { selectTodolist, setTodolistsAC } from "../../model/todolists-slice"
import { ToDoList } from "./Todolist/ToDoList"

export const ToDoLists = () => {
  const toDoLists = useAppSelector(selectTodolist)

  const dispatch = useAppDispatch()

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      dispatch(setTodolistsAC({ todolists: res.data }))
    })
  }, [])

  return (
    <>
      {toDoLists.map((tl) => {
        return (
          <Grid2 key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px", width: "375px" }} elevation={3} square>
              <ToDoList key={tl.id} todolist={tl} />
            </Paper>
          </Grid2>
        )
      })}
    </>
  )
}
