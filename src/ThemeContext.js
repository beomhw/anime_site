import {useEffect, createContext, useReducer, useContext} from 'react';
import * as THEME from './Util';

const Theme = {
    dark: {
        mode: 'dark',
        text: THEME.TEXT_DA,
        container: THEME.CONTAINER_DA,
        background: THEME.BACKGROUND_DA,
        input: THEME.INPUT_DA
    },
    light: {
        mode: 'light',
        text: THEME.TEXT_LI,
        container: THEME.CONTAINER_LI,
        background: THEME.BACKGROUND_LI,
        input: THEME.INPUT_LI
    }
}

const initialTheme = {};
const ThemeContext = createContext();
const ThemeDispatchContext = createContext();

const ThemeReducer = (state, action) => {
    switch(action.type) {
        case 'LIGHT':
            return Theme.light;
        case 'DARK':
            return Theme.dark;
        default:
            throw new Error(`Unknown action type : ${action.type}`);
    }
};

export const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(ThemeReducer, initialTheme);

    useEffect(() => {
        dispatch({type: 'DARK'});
    },[])

    return (
        <ThemeContext.Provider value={state}>
            <ThemeDispatchContext.Provider value={dispatch}>
                {children}
            </ThemeDispatchContext.Provider>
        </ThemeContext.Provider>
    );
}

export function useTheme () {
    const context = useContext(ThemeContext);
    if(!context) {
        return new Error('can not found ThemeContext');
    }
    return context;
}

export function useThemeDispatch () {
    const context = useContext(ThemeDispatchContext);
    if(!context) {
        return new Error('can not found ThemeDispatchContext');
    }
    return context;
}