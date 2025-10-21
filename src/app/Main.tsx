import { Box, Container, Grid2, Typography } from "@mui/material"
import { useCallback } from "react"
import { AddItemForm } from "../common/components"
import { ToDoLists } from "../features/todolists/ui/Todolists/ToDoLists"
import { useAppDispatch, useAppSelector } from "../common/hooks"
import { createListTC } from "../features/todolists/model/lists-slice"

export const Main = () => {
  const dispatch = useAppDispatch()

  // Use the correct selectors from your auth slice
  const token = useAppSelector((state) => state.auth.token)

  // User is authenticated if token exists
  const isAuthenticated = !!token

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createListTC({ title, parent: 0 }))
    },
    [dispatch],
  )

  return isAuthenticated ? (
    <Container sx={{ maxWidth: "1140px" }} maxWidth={false}>
      <Grid2 container sx={{ padding: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid2>
      <Grid2 container spacing={4}>
        <ToDoLists />
      </Grid2>
    </Container>
  ) : (
    <Container sx={{ maxWidth: "1140px" }} maxWidth={false}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
        sx={{ p: 3 }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="primary.main">
          Todo List Manager
        </Typography>
        <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 2 }}>
          Organize your tasks efficiently
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Please log in to access your personal todo lists and start organizing your tasks.
        </Typography>
      </Box>
    </Container>
  )
}
