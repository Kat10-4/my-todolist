import "./App.css"
import { useAppSelector } from "../common/hooks"
import { getTheme } from "../common/theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Header } from "../common/components"
import { selectThemeMode } from "./appSelectors"
import { Main } from "./Main"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
