import {styled} from '@mui/material/styles'
import Button from '@mui/material/Button'

type MenuButtonProps = {
    background?: string
}

export const MenuButton = styled(Button)<MenuButtonProps>(({background,theme}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: `0 0 10px -5px ${theme.palette.primary.dark}`,
    borderRadius: '0',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background || theme.palette.primary.light,
}))