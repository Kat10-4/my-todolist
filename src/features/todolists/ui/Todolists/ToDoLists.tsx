import { Grid2, Paper } from "@mui/material"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../common/hooks"
import { fetchListsTC, selectTodolist } from "../../model/lists-slice"
import { ToDoList } from "./Todolist/ToDoList"
import { selectAppStatus } from "../../../../app/app-slice"

export const ToDoLists = React.memo(() => {
  const todolists = useAppSelector(selectTodolist)
  const status = useAppSelector(selectAppStatus)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status !== "loading") {
      dispatch(fetchListsTC())
    }
  }, [dispatch])

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid2 key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px", width: "375px" }} elevation={3} square>
              <ToDoList todolist={tl} />
            </Paper>
          </Grid2>
        )
      })}
    </>
  )
})
