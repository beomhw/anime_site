import {useState, useEffect, useCallback} from 'react';
import styled,{css} from 'styled-components';
import {useTheme} from '../ThemeContext';
import {flexAlign} from '../css/cssModule';
import * as api from '../api';
import dogeza from '../asset/dogeza.png';
import {IMG_URL, IMG_ORIGINAL_URL} from '../Util';
import Loading from '../components/Loading';
import * as Comp from '../components/Detail/export';
import {useGetSize} from '../components/resize';
import {useLanguage} from '../LanguageContext';

// 스틸 컷 및 티저 영상 보여주기

const Container = styled.div`
    ${flexAlign};
    width: 100%;
    height: 100%;
    flex-direction: column;
    margin-top: 0;
`;

const Header = styled.div`
    width: 100%;
    /* min-height: 350px; */
    display: grid;  // grid 레이아웃 사용
    background-color: ${p=>p['data-thememode'].container};
    margin-bottom: 50px;
    grid-template-columns: 500px 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
    padding-right: 5px;
    @media (max-width: ${p=>p.theme.tabletM}) {
        grid-template: auto;
        grid-template-rows: minmax(auto, auto);
        grid-auto-rows: minmax(200px, auto);
        grid-template-columns: minmax(200px, auto);
        background-image: url(${p=>p.url});
        background-size: cover;
        background-position-x: center;
        ${p=>p['data-thememode'].mode === 'dark' ? 
        css`box-shadow: inset 0px 150vh 0px 0px rgba(0, 0, 0, 0.6);` : 
        css`box-shadow: inset 0px 150vh 0px 0px rgba(255, 255, 255, 0.4);`
        }
        padding-left: 10px;
        /* overflow-y:  */
        max-height: 100%;
    }
`;

const BackdropCover = styled.div`
    height: 100%;
    background-image: url(${p=>p.url});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    grid-column: 1;
    grid-row: 1 / 4;
    ${flexAlign};
    margin-bottom: 10px;
    @media (max-width: ${p=>p.theme.tabletM}) {
        background-image: none;
        background-size: cover;
        /* grid-column: 1;
        grid-row: 2 / 3; */
    }
`;

const PosterContainer = styled.div`
    width: 200px;
    height: 300px;
    background-image: url(${p=>p.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
    top: 50px;
    @media (max-width: ${p=>p.theme.tabletM}) {
        position: static;
        /* grid-column: 1 / 4;
        grid-row: 2 / 3; */
        top: 0;
        margin-right: 10px;
    }
`;

const AnimePoster = styled.div`
    width: 200px;
    height: 300px;
    background-image: url(${p=>p.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    @media (max-width: ${p=>p.theme.mobile}) {
        margin-left: 10px;
    }
`;

const HeaderInfoContainer = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    grid-column: 2 / 5;
    grid-row: 2;
    @media (max-width: ${p=>p.theme.tabletM}) {  
        align-items: flex-start;
        flex-direction: column;
        margin: 20px 0 20px 0px;
        grid-row: 2;
    }
`;

const Content = styled.div`
    ${flexAlign};
    flex-direction: column;
    margin-top: 10px;
`;

const TitleText = styled.div`
    font-size: 2em;
    font-weight: bold;
    grid-column: 2 / span 3;
    grid-row: 1 / 2;
    margin: 30px auto auto auto;
    @media (max-width: ${p=>p.theme.tabletM}) {
        grid-column: 1 / span 4;
        grid-row: 1;
        margin: 20px auto 10px auto;
    }
    @media (max-width: ${p=>p.theme.mobile}) {
        text-align: center;
        grid-row: 1;
        grid-column: 1 / span 4;
        margin: 20px 0 30px 0;
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
    background-color: ${p=>p['data-thememode'].background};
    margin: 5px;
    border: 1px solid #dddddd;
    ${flexAlign};
    flex-wrap: wrap;
`;

const LoadingBox = styled.div`
    ${flexAlign};
    height: 90vh;
`;

const SeasonContainer = styled.div`
    width: 80vw;
    height: 200px;
    border-radius: 20px;
    background-color: ${p=>p['data-thememode'].container};
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: flex-start;
    @media (max-width: ${p=>p.theme.tabletM}) {
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
    background-position: center center;
`;

const SeasonDescription = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    padding: 20px;
`;

const CompanyContainer = styled.div`
    ${flexAlign};
    flex-wrap: wrap;
`;

const CompanyImgBox = styled.div`
    ${flexAlign};
    @media (max-width: ${p=>p.theme.tabletM}) {
        margin: 5px;
        border-radius: 5px;
        ${p=>p['data-thememode'].mode === 'dark' ? 
        css`box-shadow: inset 0px 100vh 10px 0px rgba(255, 255, 255, 0.2);` : 
        css`box-shadow: inset 0px 100vh 10px 0px rgba(0, 0, 0, 0.2);`
        }
    }
`;

const CompanyImg = styled.div`
    width: 100px;
    height: 50px;
    background-image: url(${p=>p.url});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin: 15px;
    @media (max-width: ${p=>p.theme.mobile}) {
        width: 50px;
        height: 40px;
        margin: 5px;
    }
`;

const MoreInfo = styled.div`
    width: 100px;
    height: 35px;
    font-size: 1.1em;
    border: 1px solid #dddddd;
    background-color: #8c0000;
    user-select: none;
    cursor: pointer;
    color: white;
    z-index: 10;
    border-radius: 8px;
    ${flexAlign};
    @media (max-width: ${p=>p.theme.mobile}) {
        position: relative;
        top: 10px;
    }
`;

const MovieAirContainer = styled.p`
    /* grid-row: 2;
    grid-column: 2 / span 3; */
    text-align: center;
    font-size: 0.5em;
    font-weight: normal;
`;

const Detail = ({match, history}) => {
    const size = useGetSize();
    const la = useLanguage(); // 언어
    const theme= useTheme(); // 테마
    const {params: {id}, params: {media}} = match;
    const [anime, setAnime] = useState(); // 애니 정보

    const [loading, setLoading] = useState({ // 로딩
        still: true,
        recommendations: true,
        info: true,
        teaser: true
    }); 

    const [lastSeason, setLastSeason] = useState(); // 마지막 시즌 => tv 전용
    const [recommendations, setRecommendations] = useState(); // 추천
    const [still, setStill] = useState(); // 애니, 영화 스틸 컷
    const [teaser, setTeaser] = useState(); // 영화 티저 => movie 전용

    const [modal, setModal] = useState({
        opacity: 0,
        visibility: 'hidden'
    });

    const onOpen = useCallback(() => setModal({
        opacity: 1,
        visibility: 'visible'
    }), [modal]);

    useEffect(() => {
        setLoading({ // 로딩
            still: true,
            recommendations: true,
            info: true,
            teaser: true
        });
        window.scrollTo(0,0);

        api.getAnimeInfo(media, id, la.type).then(res => {
            //console.log(res);
            setAnime(res);
            if(media === 'tv')
                setLastSeason(res.seasons[res.seasons.length-1]);
            
            setLoading(loading => ({...loading, info: false}))
        })

        api.getAnimeImg(media, id).then(res => {
            //console.log(res);
            setStill(res.data.backdrops);
            setLoading(loading => ({...loading, still: false}))
        })

        api.getAnimeRecommendation(media, id, la.type).then(res => {
            //console.log(res.data.results);
            setRecommendations(res.data.results);
            setLoading(loading => ({...loading, recommendations: false}));
        })

        api.getAnimeVideo(media, id, la.type).then(res => {
            // console.log(res.data.results);
            setTeaser(res.data.results);
            //console.log(anime);
            setLoading(loading => ({...loading, teaser: false}));
        })

    },[id, la.type]);

    // loading render
    if(loading.teaser || loading.info || loading.still || loading.recommendations) 
        return <Container><LoadingBox><Loading /></LoadingBox></Container>

    // render detail
    return (
        <Container url={`${IMG_URL}${anime.backdrop_path}`}>
            {media === 'tv' && <Comp.EpisodeList id={anime.id} seasons={anime.seasons} modal={modal} setModal={setModal} /> }
            <Header data-thememode={theme} url={`${IMG_ORIGINAL_URL}${anime.backdrop_path}`}>
                {media === 'tv' 
                    ?<TitleText>{anime.name} ({new Date(anime.first_air_date).getFullYear()})</TitleText> 
                    :<TitleText>{anime.title}
                    {media === 'movie' ? <MovieAirContainer>{la.Detail.movie_air_date} : {anime.release_date}</MovieAirContainer> : null}
                    </TitleText>}
                <BackdropCover 
                    url={anime.backdrop_path ? 
                    `${IMG_ORIGINAL_URL}${anime.backdrop_path}` : 
                    `${dogeza}`}>
                    <PosterContainer url={anime.poster_path ? 
                        `${IMG_URL}${anime.poster_path}` : 
                        `${dogeza}`}/>
                </BackdropCover>
                <HeaderInfoContainer>
                    {/* <TitleGenreContainer> */}
                    <GenreContainer>
                        {anime.genres.map((ge, i) => 
                        <GenreBox key={i} data-thememode={theme}>{ge.name}</GenreBox>)}
                    </GenreContainer>
                    <CompanyContainer data-thememode={theme}>
                        {anime.production_companies.map((company, i) => {
                            if(i > 2) return <div key={i}></div>
                            if(company.logo_path) return (
                                <CompanyImgBox data-thememode={theme}>
                                    <CompanyImg key={i} url={IMG_URL + company.logo_path} />
                                </CompanyImgBox>
                            )
                        })}
                    </CompanyContainer>
                    {/* </TitleGenreContainer> */}
                </HeaderInfoContainer>
            </Header>
            <Content>
                <TextH1>{la.Detail.intro}</TextH1>
                <Comp.Description la={la} overview={anime.overview}/>
            </Content>
            {media === 'tv' && 
            <Content>
                <TextH1>{la.Detail.season}</TextH1>
                <SeasonContainer data-thememode={theme}>
                    {size.width <= 1220 ? 
                        <SeasonPosterMobile url={lastSeason.backdrop_path ? 
                            `${IMG_ORIGINAL_URL}${lastSeason.poster_path}` :
                            `${IMG_ORIGINAL_URL}${anime.backdrop_path}`} 
                        />
                    : 
                        <SeasonPoster url={lastSeason.poster_path ? 
                            `${IMG_URL}${lastSeason.poster_path}` :
                            `${IMG_URL}${anime.poster_path}`} 
                        />
                    }
                    <SeasonDescription>
                        <TextH2>{lastSeason.name}</TextH2>
                        {(lastSeason.air_date === null || new Date(lastSeason.air_date) > new Date()) ?
                            <p className="overview">{anime.name}{la.Detail.last_season_first} {lastSeason.season_number}{la.Detail.next_season}</p> :
                            <>
                            <p className="air_date">{new Date(lastSeason.air_date).getFullYear()} | {lastSeason.episode_count}{la.Detail.ep_count}</p>
                            <p className="overview">
                                {anime.name}{la.Detail.last_season_first}{lastSeason.season_number}{la.Detail.last_season_second} 
                                {la.type === 'en' ? lastSeason.air_date : new Date(lastSeason.air_date).getMonth()+1 + la.Detail.last_season_month + new Date(lastSeason.air_date).getDate() + la.Detail.last_season_day + new Date(lastSeason.air_date).getFullYear() + la.Detail.last_season_final}
                            </p>
                            </>
                        }
                    </SeasonDescription>
                    <MoreInfo onClick={onOpen}>{la.Detail.more}</MoreInfo>
                </SeasonContainer>
            </Content> }
            <Content>
                <TextH1>{la.Detail.still}</TextH1>
                <Comp.StillCut still={still} teaser={teaser} />
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