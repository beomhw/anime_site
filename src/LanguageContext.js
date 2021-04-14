// 언어 설정 구현 예정 => 모든 기능 구현 후에!
// en, ko, jp 세 가지 테마
import React, {createContext, useContext, useReducer} from 'react';

// 언어 타입
const Language = {
    kr: {
        Home: {
            popular_tv: '인기 애니 TOP 20',
            popular_movie: '인기 영화 TOP 20',
            popular_drama: '드라마 TOP 20',
            popular_comedy: '코미디 TOP 20',
            popular_action: '액션 판타지 TOP 20'
        },
        Season: {

        },
        Search: {
            search_result_front: '검색 결과가 ',
            search_result_back: '개 있습니다!'
        },
        Mypage: {

        }
    },
    en: {
        Home: {
            popular_tv: 'ANIME TOP 20',
            popular_movie: 'MOVIE TOP 20',
            popular_drama: 'DRAMA TOP 20',
            popular_comedy: 'COMEDY TOP 20',
            popular_action: 'ACTION FANTASY TOP 20'
        },
        Season: {

        },
        Search: {
            search_result_front: 'There are ',
            search_result_back: 'results!'
        },
        Mypage: {
            
        }
    },
    jp: {
        Home: {
            popular_tv: 'アニメ TOP 20',
            popular_movie: '映画 TOP 20',
            popular_drama: 'ドラマ TOP 20',
            popular_comedy: 'コメディ TOP 20',
            popular_action: 'アクション・ファンタジー TOP 20'
        },
        Season: {

        },
        Search: {
            search_result_front: '検索結果が ',
            search_result_back: '件あります!'
        },
        Mypage: {
            
        }
    }
}

const initialLanguage = {    
    Home: {
        popular_tv: '인기 애니 TOP 20',
        popular_movie: '인기 영화 TOP 20',
        popular_drama: '드라마 TOP 20',
        popular_comedy: '코미디 TOP 20',
        popular_action: '액션 판타지 TOP 20'
    },
    Season: {

    },
    Search: {
        search_result_front: '검색 결과가 ',
        search_result_back: '개 있습니다!'
    },
    Mypage: {
            
    }
};

const LanguageReducer = ({state, action}) => {
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