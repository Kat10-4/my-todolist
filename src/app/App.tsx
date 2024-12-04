import './App.css';
import {getTheme} from '../common/theme/Theme';
import {
    CssBaseline,
    ThemeProvider,
} from '@mui/material';
import {Header} from '../Header';
import {Main} from '../Main';
import {useSelector} from 'react-redux';
import {type ThemeMode} from './app-reducer';
import {RootState} from './store';


export const App = () => {

    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)
    const theme = getTheme(themeMode)

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
        <Main/>
    </ThemeProvider>
}


