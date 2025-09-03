import { createTheme } from "@mui/material"
import { common } from "@mui/material/colors"

export const getTheme = (themeMode: string) => {
  return createTheme({
    palette: {
      primary: {
        main: common.black,
        light: "#333333",
        dark: "#000000",
        contrastText: common.white,
      },
      secondary: {
        main: common.white,
        light: "#ffffff",
        dark: "#cccccc",
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
