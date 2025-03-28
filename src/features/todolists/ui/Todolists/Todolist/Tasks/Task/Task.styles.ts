import { SxProps } from "@mui/material"

export const getListItemSx = (isDone: boolean): SxProps => ({
  p: 0,
  justifyContent: "space-between",
  alignItems: "center",
  opacity: isDone ? 0.5 : 1,
  textDecorationLine: isDone ? "line-through" : "none",
  overflowWrap: "break-word",
  hyphens: "auto",
})

export const getBoxSx = () => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})
