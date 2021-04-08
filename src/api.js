import axios from 'axios';
import * as API from './Util';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

// 애니 리스트 top get
export async function getAnime (media, type) {
    let res = await api.get(`discover/${media}?api_key=${API.API_KEY}&with_genres=${type}&with_keywords=${API.KEYWORD}&page=1&language=ko`)
        .then(res => {
        console.log('request animeList : ',res);
        return res.data;
    })

    return res;
}

// 특정 애니 디테일 정보 get
export async function getAnimeInfo (media, anime_id) {
    let res = await api.get(`${media}/${anime_id}?api_key=${API.API_KEY}&language=ko`)
        .then(res => {
            console.log('request getAnimeInfo : ', res);
            return res.data;
        })
    return res;
}

// 특정 애니 img들 get
export async function getAnimeImg (media, anime_id) {
    let res = await api.get(`${media}/${anime_id}/images?api_key=${API.API_KEY}`)
        .then(res => {
            console.log('request animeImg : ', res);
            return res;
        })
    return res;
}

// 특정 애니 캐스팅 get
export async function getAnimeCast (media, anime_id) {
    let res = await api.get(`${media}/${anime_id}/credits?api_key=${API.API_KEY}`)
        .then(res => {
            console.log('request animeCasts : ', res);
            return res;
        })
    return res;
}

// 특정 애니 PV get
export async function getAnimeVideo (media, anime_id) {
    let res = await api.get(`${media}/${anime_id}/videos?api_key=${API.API_KEY}`)
        .then(res => {
            console.log('request animeVedio : ', res);
            return res;
        })
    return res;
}

// 특정 애니 관련 목록 get
export async function getAnimeRecommendation (media, anime_id) {
    let res = await api.get(`${media}/${anime_id}/recommendations?api_key=${API.API_KEY}&language=ko`)
        .then(res => {
            console.log('request recommendation : ', res);
            return res;
        })
    return res;
}