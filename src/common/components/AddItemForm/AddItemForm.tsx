import * as React from "react"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Grid2, IconButton, TextField } from "@mui/material"
import AddBoxIcon from "@mui/icons-material/AddBox"

type Props = {
  addItem: (newItemTitle: string) => void
  disabled?:boolean
}

export const AddItemForm = React.memo(({ addItem,disabled }: Props) => {
  const [newItemTitle, setNewItemTitle] = useState<string>("")
  const [error, setError] = useState<string | null>("")

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(e.currentTarget.value)
  }

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === "Enter") {
      if (newItemTitle.trim() !== "") {
        addItem(newItemTitle)
        setNewItemTitle("")
      } else {
        setError("Field is required")
      }
    }
  }

  const addItemHandler = () => {
    if (newItemTitle.trim() !== "") {
      addItem(newItemTitle)
      setNewItemTitle("")
    } else {
      setError("Field is required")
    }
  }

  return (
    <Grid2 container sx={{ alignItems: "flex-end", justifyContent: "center" }}>
      <Grid2>
        <TextField
          variant="standard"
          color={"primary"}
          size="small"
          className={error ? "error" : ""}
          value={newItemTitle}
          onChange={onChangeHandler}
          onKeyUp={onKeyUpHandler}
          error={!!error}
          helperText={error}
          label="Enter a title"
          sx={{ width: "20ch" }}
          disabled={disabled}
        />
      </Grid2>
      <Grid2>
        <IconButton onClick={addItemHandler} color={"primary"} disabled={disabled}>
          <AddBoxIcon />
        </IconButton>
      </Grid2>
    </Grid2>
  )
})
