import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Container, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material"
import Switch from "@mui/material/Switch"
import { changeThemeModeAC, selectAppStatus, selectThemeMode } from "../../../app/app-slice"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { getTheme } from "../../theme"
import { MenuButton } from "../"
import { Link, useNavigate } from "react-router"
import { Path } from "../../routing"
import { logout } from "../../../features/auth/model/auth-slice"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const status = useAppSelector(selectAppStatus)
  const navigate = useNavigate() // Get navigate function

  const dispatch = useAppDispatch()

  const changeModeHandler = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const handleLoginClick = () => {
    navigate(Path.Login) // Navigate programmatically
  }

  const handleLogoutClick = () => {
    dispatch(logout())
    navigate(Path.Main)
  }

  return (
    <AppBar position="static">
      <Container sx={{ maxWidth: "1140px" }} maxWidth={false}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textDecoration:'none' }} color='secondary' component={Link} to={Path.Main}>
            To Do Lists
          </Typography>
          <MenuButton onClick={handleLoginClick}>Login</MenuButton>
          <MenuButton onClick={handleLogoutClick}>Logout</MenuButton>
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </Toolbar>
      </Container>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
