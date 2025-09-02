import { Grid2, Paper } from "@mui/material"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../common/hooks"
import { fetchTodolistsTC, selectTodolist } from "../../model/todolists-slice"
import { ToDoList } from "./Todolist/ToDoList"

export const ToDoLists = () => {
  const todolists = useAppSelector(selectTodolist)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((tl) => {
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
