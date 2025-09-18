import "./App.css"
import { useAppSelector } from "../common/hooks"
import { getTheme } from "../common/theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { ErrorSnackbar, Header } from "../common/components"
import { selectThemeMode } from "./app-slice"
import { Routing } from "../common/routing"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
