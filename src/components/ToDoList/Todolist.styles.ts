import {SxProps} from '@mui/material'

export const filterButtonsContainerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '5px'
}

export const listItemsSx = (isDone: boolean): SxProps => ({
    padding: '0',
    opacity: isDone ? 0.5 : 1,
    textDecorationLine:isDone ?'line-through': 'none'
})

