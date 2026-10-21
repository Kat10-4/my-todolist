import { createTheme } from "@mui/material"
import { common } from "@mui/material/colors"

export const getTheme = (themeMode: string) => {
  const isLight = themeMode === "light"

  return createTheme({
    palette: {
      mode: isLight ? "light" : "dark",
      primary: {
        main: isLight ? common.black : common.white,
        light: "#10479aff",
        dark: "#10479aff",
        contrastText: isLight ? common.white : common.black,
      },
      secondary: {
        main: common.white,
        light: "#f5feffff",
        dark: "#3583f9ff",
        contrastText: common.black,
      },
    },
    typography: {
      fontFamily: `"Source Sans 3", "Arial", sans-serif`,
      h1: { fontFamily: `"Playfair Display SC", serif` },
      h2: { fontFamily: `"Playfair Display SC", serif` },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: common.black,
            color: common.white,
          },
        },
      },
    },
  })
}
