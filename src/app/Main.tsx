import { Container, Grid2 } from "@mui/material"
import { useCallback } from "react"
import { AddItemForm } from "../common/components"
import { ToDoLists } from "../features/todolists/ui/Todolists/ToDoLists"
import { createTodolistTC } from "../features/todolists/model/lists-slice"
import { useAppDispatch } from "../common/hooks"

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodolist = useCallback((title: string) => {
    dispatch(createTodolistTC(title))
  }, [dispatch])

  return (
    <Container sx={{ maxWidth: "1140px" }} maxWidth={false}>
      <Grid2 container sx={{ padding: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid2>
      <Grid2 container spacing={4}>
        <ToDoLists />
      </Grid2>
    </Container>
  )
}
