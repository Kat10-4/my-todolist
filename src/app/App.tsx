import './App.css';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {getTheme} from '../common/theme/Theme';
import {
    CssBaseline,
    ThemeProvider,
} from '@mui/material';
import {Header} from '../common/components/Header/Header';
import {selectThemeMode} from './appSelectors';
import {Main} from './Main';


export const App = () => {

    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header/>
        <Main/>
    </ThemeProvider>
}


