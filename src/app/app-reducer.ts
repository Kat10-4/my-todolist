export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {...state, themeMode: action.payload.mode}
        default:
            return state
    }
}

//Action creators
export const changeThemeAC = (mode: ThemeMode) => {
    return {
        type: 'CHANGE_THEME',
        payload: {
            mode
        }
    } as const
}

// Action types
type ActionsType = ReturnType<typeof changeThemeAC>