require('dotenv').config();

// api 관련
export const API_KEY = process.env.REACT_APP_API_KEY;
export const KEYWORD = process.env.REACT_APP_KEYWORD;
export const URL = 'https://api.themoviedb.org/3/';
export const IMG_URL = 'http://image.tmdb.org/t/p/w500';
export const IMG_ORIGINAL_URL = 'http://image.tmdb.org/t/p/original';

// 테마 관련
export const BACKGROUND_LI = '#e9ecef';
export const BACKGROUND_DA = '#1b2021';
export const TEXT_LI = '#343131';
export const TEXT_DA = '#E9EFEC';
export const CONTAINER_LI ='#ffffff';
export const CONTAINER_DA = '#312c51';
export const INPUT_LI = '#e9ecef';
export const INPUT_DA = '#3c415c';

// DATE
export const NOW_DATE = () => new Date();

// 언어 관련
export const Language = {
    kr: {
        type: 'ko',
        Home: {
            popular_tv: '인기 애니 TOP 20',
            popular_movie: '인기 영화 TOP 20',
            popular_drama: '드라마 TOP 20',
            popular_comedy: '코미디 TOP 20',
            popular_action: '액션 판타지 TOP 20',
            popular_year: '년 애니메이션!'
        },
        Season: {
            quarter_1: '1분기',
            quarter_2: '2분기',
            quarter_3: '3분기',
            quarter_4: '4분기',
            select: '조회'
        },
        Search: {
            search_result_front: '검색 결과가 ',
            search_result_back: '개 있습니다!'
        },
        Detail: {
            intro: '개요',
            season: '시즌',
            casts: '출연진',
            recommend: '추천',
            null_intro: '이런! 이 작품은 아직 한국어 번역이 없네요..',
            null_recommend: '이 작품에 대한 추천 알고리즘을 점검 중인 거 같아요...',
            null_overview: "해당 에피소드에 대한 개요는 준비 중입니다..",
            more: '상세..',
            no_casts: '출연진 정보가 없어요..',
            still: '미디어',
            last_season_first: "의 ",
            last_season_second: " 번째 시즌이 ",
            last_season_month: "월 ",
            last_season_day: "일 ",
            last_season_final: "년에 방영되었습니다.",
            will_air: '방영 예정입니다.',
            ep_count: '화',
            next_season: '번째 시즌이 방영 예정입니다.',
            none_img: '이미지가 없어요!',
            movie_air_date: '개봉'
        }
    },
    en: {
        type: 'en',
        Home: {
            popular_tv: 'ANIME TOP 20',
            popular_movie: 'MOVIE TOP 20',
            popular_drama: 'DRAMA TOP 20',
            popular_comedy: 'COMEDY TOP 20',
            popular_action: 'ACTION FANTASY TOP 20',
            popular_year: "'s ANIME"
        },
        Season: {
            quarter_1: 'Q1',
            quarter_2: 'Q2',
            quarter_3: 'Q3',
            quarter_4: 'Q4',
            select: 'view'
        },
        Search: {
            search_result_front: 'There are ',
            search_result_back: 'results!'
        },
        Detail: {
            intro: 'Intro',
            season: 'Season',
            casts: 'Casts',
            recommend: 'Recommend',
            null_intro: "OOPS! There's no intro! :( ",
            null_recommend: "Checking the recommended algorithms for this piece.",
            null_overview: "There is no outline of the episode.",
            more: 'more..',
            no_casts: "Couldn't find any information about the voice actors...",
            still: 'media',
            last_season_first: "'s ",
            last_season_second: " season aired on ",
            last_season_month: " ",
            last_season_day: ", ",
            last_season_final: ".",
            will_air: "It's going to air.",
            ep_count: ' episodes',
            next_season: ' season is scheduled to air.',
            none_img: "There's no image!",
            movie_air_date: 'Released on '
        }
    },
    jp: {
        type: 'ja',
        Home: {
            popular_tv: 'アニメ TOP 20',
            popular_movie: '映画 TOP 20',
            popular_drama: 'ドラマ TOP 20',
            popular_comedy: 'コメディ TOP 20',
            popular_action: 'アクション・ファンタジー TOP 20',
            popular_year: '年 アニメ!'
        },
        Season: {
            quarter_1: '第1四半期',
            quarter_2: '第2四半期',
            quarter_3: '第3四半期',
            quarter_4: '第4四半期',
            select: '見る'
        },
        Search: {
            search_result_front: '検索結果が ',
            search_result_back: '件あります!'
        },
        Detail: {
            intro: 'がいよう',
            season: 'シリーズ',
            casts: 'せいゆう',
            recommend: 'おすすめ',
            null_intro: '日本語バージョンのがいようがありません',
            popular_action: 'あらあら、日本語バージョンがありません。',
            null_recommend: 'この作品に対するおすすめアルゴリズムを 点検中のようです。',
            null_overview: "このエピソードの概要は準備中です..",
            more: '詳しく',
            no_casts: '声優さんたちの情報を見つけませんでした..',
            still: 'メディア',
            last_season_first: "の",
            last_season_second: "回目のシーズンが",
            last_season_month: "月",
            last_season_day: "日",
            last_season_final: "年に放映されました。",
            will_air: '放映予定です。',
            ep_count: '話',
            next_season: 'シーズンが放映予定です。',
            none_img: 'イメージがありません!',
            movie_air_date: '公開'
        }
    }
}