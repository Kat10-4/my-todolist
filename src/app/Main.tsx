import { Container, Grid2 } from "@mui/material"
import { useDispatch } from "react-redux"
import { AddItemForm } from "../common/components"
import { ToDoLists } from "../features/todolists/ui/Todolists/ToDoLists"
import { createTodolistTC } from "../features/todolists/model/todolists-slice"

export const Main = () => {
  const dispatch = useDispatch()

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title))
  }

  return (
    <Container sx={{ maxWidth: "1140px" }} maxWidth={false}>
      <Grid2 container sx={{ padding: "30px" }}>
        <AddItemForm addItem={createTodolist} />
      </Grid2>
      <Grid2 container spacing={4}>
        <ToDoLists />
      </Grid2>
    </Container>
  )
}
