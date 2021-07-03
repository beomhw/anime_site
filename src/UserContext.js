import {createContext, useReducer, useContext, useEffect} from 'react';

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

const initialState = {
    googleID: null,
    nickname: null
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'SIGN IN':
            return {
                googleID: action.data.id,
                nickname: action.data.nickname
            };
        default:
            return state;
    }
}

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(window.sessionStorage.getItem('googleID')) {
            dispatch({
                type: 'SIGN IN',
                data: {
                    id: window.sessionStorage.getItem('googleID'),
                    nickname: window.sessionStorage.getItem('nickname')
                }
            })
        }
    }, [])

    return (
        <UserContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export function useUserContext () {
    let context = useContext(UserContext);
    if(!context)
        return new Error('error');
    return context;
}

export function useUserDispatch () {
    let dispatch = useContext(UserDispatchContext);
    if(!dispatch)
        return new Error('error');
    return dispatch;
}