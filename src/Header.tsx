import MenuIcon from '@mui/icons-material/Menu';
import {AppBar, Container, IconButton, Toolbar, Typography} from '@mui/material';
import Switch from '@mui/material/Switch';
import {useDispatch, useSelector} from 'react-redux';
import {changeThemeAC, type ThemeMode} from './app/app-reducer';
import type {RootState} from './app/store';
import {getTheme} from './common/theme/Theme';
import {MenuButton} from './components/Button/MenuButton';


export const Header = () => {
    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)
    const theme = getTheme(themeMode)

    const dispatch = useDispatch()

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <AppBar position="static">
            <Container sx={{maxWidth: '1140px'}} maxWidth={false}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        To Do Lists
                    </Typography>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};