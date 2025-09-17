import { createTheme } from "@mui/material"
import { common } from "@mui/material/colors"

export const getTheme = (themeMode: string) => {
  return createTheme({
    palette: {
      primary: {
        main: common.black,
        light: "#10479aff",
        dark: "#10479aff",
        contrastText: common.white,
      },
      secondary: {
        main: common.white,
        light: "#f5feffff",
        dark: "#3583f9ff",
        contrastText: common.black,
      },
      mode: themeMode === "light" ? "light" : "dark",
    },
    typography: {
      fontFamily: `"Source Sans 3", "Arial", sans-serif`,
      h1: { fontFamily: `"Playfair Display SC", serif` },
      h2: { fontFamily: `"Playfair Display SC", serif` },
    },
  })
}
