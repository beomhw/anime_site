import React, {useState, useEffect} from 'react';
import styled,{css} from 'styled-components';
import {useTheme} from '../ThemeContext';
import {flexAlign} from '../css/cssModule';
import * as api from '../api';
import dogeza from '../asset/dogeza.png';
import {IMG_URL} from '../Util';
import Loading from '../components/Loading';
import * as Comp from '../components/Detail/export';
import {useLanguage} from '../LanguageContext';

// 스틸 컷 및 티저 영상 보여주기

const Container = styled.div`
    ${flexAlign};
    width: 100%;
    height: 100%;
    flex-direction: column;
    margin-top: 50px;
`;

const Header = styled.div`
    width: 100%;
    min-height: 300px;
    background-color: ${p=>p.theme.container};
    ${flexAlign};
    margin-bottom: 50px;
    @media(max-width: 500px) {
        padding-top: 100px;
        background-image: url(${p=>p.url});
        background-size: cover;
        max-height: 400px;
        background-position-x: -100px;
        ${p=>p.theme.mode === 'dark' ? 
        css`box-shadow: inset 0px 100px 10px 0px rgba(0, 0, 0, 0.7);` : 
        css`box-shadow: inset 0px 100px 10px 0px rgba(255, 255, 255, 0.7);`
        }
    }
`;

const BackdropCover = styled.div`
    flex: 3;
    height: 100%;
    background-image: url(${p=>p.url});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    @media(max-width: 500px) {
        background-image: none;
        background-size: cover;
    }
`;

const PosterContainer = styled.div`
    flex: 3;
    position: relative;
    top: 50px;
    ${flexAlign};
    @media(max-width: 500px) {
        top: 0;
    }
`;

const HeaderInfoContainer = styled.div`
    flex: 7;
    margin: 20px;
`;

const Content = styled.div`
    ${flexAlign};
    flex-direction: column;
`;

const AnimePoster = styled.div`
    width: 200px;
    height: 300px;
    background-image: url(${p=>p.url});
    background-size: contain;
    background-repeat: no-repeat;
    @media(max-width: 500px) {
        margin-left: 10px;
    }
`;

const TitleText = styled.div`
    font-size: 2em;
    font-weight: bold;
    @media(max-width: 500px) {
        position: absolute;
        top: 60px;
        left: 0px;
    }
`;

const TextH1 = styled.div`
    font-size: 2em;
    font-weight: bold;
`;

const TextH2 = styled(TextH1)`
    font-size: 1.7em;
    width: 100%;
`;

const GenreContainer = styled.div`
    display: flex;
    flex-direction: flex-start;
    margin-top: 10px;
    flex-wrap: wrap;
`;

const GenreBox = styled.div`
    padding: 10px;
    border-radius: 5px;
    background-color: ${p=>p.theme.background};
    margin: 5px;
    border: 1px solid #dddddd;
    ${flexAlign};

`;

const LoadingBox = styled.div`
    ${flexAlign};
    height: 90vh;
`;

const SeasonContainer = styled.div`
    width: 80vw;
    height: 200px;
    border-radius: 20px;
    background-color: ${p=>p.theme.container};
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: flex-start;
    @media(max-width: 500px) {
        flex-wrap: wrap;
        height: auto;
    }
`;

const SeasonPoster = styled(AnimePoster)`
    height: 100%;
    border-radius: 20px 0 0 20px;
`;

const SeasonPosterMobile = styled.div`
    width: 100%;
    min-height: 200px;
    background-image: url(${p=>p.url});
    background-size: cover;
    border-radius: 20px 20px 0 0;
    background-position-x: center;
`;

const SeasonDescription = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    padding: 40px 20px 20px 20px;
`;

function useGetSize () {
    const [size, setSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        function handleResize() {
            setSize({
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            })
        }
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    },[]);

    return size;
}

const Detail = ({match, history}) => {
    const size = useGetSize();
    console.log(size);
    const la = useLanguage(); // 언어
    const theme= useTheme(); // 테마
    const {params: {id}, params: {media}} = match;
    const [anime, setAnime] = useState({}); // 애니 정보
    const [loading, setLoading] = useState(true); // 로딩
    const [lastSeason, setLastSeason] = useState(); // 마지막 시즌 => tv 전용
    const [recommendations, setRecommendations] = useState(); // 추천
    const [still, setStill] = useState(); // 애니, 영화 스틸 컷
    const [teaser, setTeaser] = useState(); // 영화 티저 => movie 전용

    const [modal, setModal] = useState({
        opacity: 0,
        visibility: 'hidden'
    });
    const onOpen = () => setModal({
        opacity: 1,
        visibility: 'visible'
        
    })

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0,0);
        api.getAnimeInfo(media, id, la.type).then(res => {
            console.log(res);
            setAnime(res);
            if(media === 'tv')
                setLastSeason(res.seasons[res.seasons.length-1]);
        }).then(() => {
            api.getAnimeImg(media, id).then(res => {
                console.log(res);
                setStill(res.data.backdrops);
            }).then(() => {
                api.getAnimeRecommendation(media, id, la.type).then(res => {
                    console.log(res.data.results);
                    setRecommendations(res.data.results);
                })
                .then(() => {
                    if(media === 'movie') {
                        api.getAnimeVideo(media, id, la.type).then(res => {
                            console.log(res.data);
                            setTeaser(res.data.results);
                            console.log(anime);
                            setLoading(false);
                        })
                    } else setLoading(false);
                })
            })
        })
    },[id, la.type]);

    if(loading) return <Container><LoadingBox><Loading /></LoadingBox></Container>

    return (
        <Container url={`${IMG_URL}${anime.backdrop_path}`}>
            {media === 'tv' && <Comp.EpisodeList id={anime.id} seasons={anime.seasons} modal={modal} setModal={setModal} /> }
            <Header theme={theme} url={`${IMG_URL}${anime.backdrop_path}`}>
                <BackdropCover 
                    url={anime.backdrop_path ? 
                    `${IMG_URL}${anime.backdrop_path}` : 
                    `${dogeza}`}>
                    <PosterContainer>
                        <AnimePoster url={anime.poster_path ? 
                        `${IMG_URL}${anime.poster_path}` : 
                        `${dogeza}`}/>
                    </PosterContainer>
                </BackdropCover>
                <HeaderInfoContainer>
                    {media === 'tv' 
                    ?<TitleText>{anime.name} ({new Date(anime.first_air_date).getFullYear()})</TitleText> 
                    :<><TitleText>{anime.title}</TitleText><p>{anime.release_date} 개봉</p></>}
                    <GenreContainer>
                        {anime.genres.map((ge, i) => 
                        <GenreBox key={i} theme={theme}>{ge.name}</GenreBox>)}
                    </GenreContainer>
                </HeaderInfoContainer>
            </Header>
            <Content>
                <TextH1>{la.Detail.intro}</TextH1>
                <Comp.Description la={la} overview={anime.overview}/>
            </Content>
            {media === 'tv' && 
            <Content>
                <TextH1>{la.Detail.season}</TextH1>
                <SeasonContainer theme={theme}>
                    {size.width < 500 ? 
                    <SeasonPosterMobile url={lastSeason.backdrop_path ? 
                        `${IMG_URL}${lastSeason.poster_path}` :
                        `${IMG_URL}${anime.backdrop_path}`
                    } />
                    : 
                        <SeasonPoster url={lastSeason.poster_path ? 
                            `${IMG_URL}${lastSeason.poster_path}` :
                            `${IMG_URL}${anime.poster_path}`
                        } />
                    }
                    <SeasonDescription>
                        <TextH2>{lastSeason.name}</TextH2>
                        {lastSeason.air_date === null ?
                            <p className="overview">{anime.name}의 {lastSeason.season_number}번째 시즌이 방영 예정입니다.</p> :
                            <>
                            <p className="air_date">{new Date(lastSeason.air_date).getFullYear()} | {lastSeason.episode_count}화</p>
                            <p className="overview">
                                {anime.name}의 {lastSeason.season_number}번째 
                                시즌이 {new Date(lastSeason.air_date).getMonth()+1}월 {new Date(lastSeason.air_date).getDay()+1}일, {new Date(lastSeason.air_date).getFullYear()}년에 방영되었습니다.
                            </p>
                            </>
                        }
                    </SeasonDescription>
                    <p style={{width: '60px', marginRight: '10px', cursor: 'pointer', userSelect: 'none'}} onClick={onOpen}>{la.Detail.more}</p>
                </SeasonContainer>
            </Content> }
            <Content>
                <TextH1>{la.Detail.casts}</TextH1>
                <Comp.StillCut still={still} />
            </Content>
            <Content>
                <TextH1>{la.Detail.casts}</TextH1>
                <Comp.Cast media={media} id={id} la={la}/>
            </Content>
            <Content>
                <TextH1>{la.Detail.recommend}</TextH1>
                <Comp.Recommend la={la} media={media} history={history} recommendations={recommendations} />
            </Content>
        </Container>
    );
}

export default Detail;

