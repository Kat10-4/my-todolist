import MenuIcon from '@mui/icons-material/Menu';
import {AppBar, Container, IconButton, Toolbar, Typography} from '@mui/material';
import Switch from '@mui/material/Switch';
import {changeThemeAC} from '../../../app/app-reducer';
import {selectThemeMode} from '../../../app/appSelectors';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getTheme} from '../../theme/Theme';
import {MenuButton} from '../MenuButton/MenuButton';


export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()

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

