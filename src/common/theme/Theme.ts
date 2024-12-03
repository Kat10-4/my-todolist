import {createTheme} from '@mui/material';
import {orange, purple} from '@mui/material/colors';

export const getTheme = (themeMode: string) => {
    return createTheme({
        palette: {
            primary: purple,
            secondary: orange,
            mode: themeMode === 'light' ? 'light' : 'dark',
        },
    })
}