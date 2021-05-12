import {createContext, useReducer, useContext} from 'react';
const TopContext = createContext();
const TopDispatchContext = createContext();

const initialTop = {
    slideNum: 0,
    anime_id: 0,
    loading: true
};

const topReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE':
            return action.top;
        default:
            throw new Error(`action not supported : ${action.type}`);
    }
}

export function HomeProvider ({children}) {
    const [state, dispatch] = useReducer(topReducer, initialTop);

    return (
        <TopContext.Provider value={state}>
            <TopDispatchContext.Provider value={dispatch}>
                {children}
            </TopDispatchContext.Provider>
        </TopContext.Provider>
    );
}

export function useTop () {
    const context = useContext(TopContext);
    if(!context) {
        return new Error('can not find TopContext');
    }
    return context;
}

export function useTopDispatch () {
    const context = useContext(TopDispatchContext);
    if(!context) {
        return new Error('can not find TopDispatchContext');
    }
    return context;
}