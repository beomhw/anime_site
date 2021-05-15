// 언어 설정 구현 예정 => 모든 기능 구현 후에! => 나중에 천천히 하기로 하고...
// en, ko, jp 세 가지 테마
import {createContext, useContext, useReducer} from 'react';
import {Language} from './Util';

const initialLanguage = Language.kr;

const LanguageReducer = (state, action) => {
    //console.log(action);
    switch(action.type) {
        case 'KO':
            return Language.kr;
        case 'EN':
            return Language.en;
        case 'JP':
            return Language.jp;
        default:
            throw new Error(`Unknown action : ${action.type}`);
    }
}

const LanguageContext = createContext();
const LanguageReducerContext = createContext();

export const LanguageProvider = ({children}) => {
    const [state, dispatch] = useReducer(LanguageReducer, initialLanguage);

    return (
        <LanguageContext.Provider value={state}>
            <LanguageReducerContext.Provider value={dispatch}>
                {children}
            </LanguageReducerContext.Provider>
        </LanguageContext.Provider>
    );
};

export function useLanguage () {
    const context = useContext(LanguageContext);
    if(!context) {
        throw new Error('can not find language context');
    }
    return context;
}

export function useLanguageDispatch () {
    const context = useContext(LanguageReducerContext);
    if(!context) {
        throw new Error('can not find language reducer context');
    }
    return context;
}