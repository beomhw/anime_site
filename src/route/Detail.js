import React, {useState, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {useTheme} from '../ThemeContext';
import {flexAlign} from '../css/cssModule';
import * as api from '../api';
import dogeza from '../asset/dogeza.png';
import {IMG_URL} from '../Util';
import Loading from '../components/Loading';
import * as Comp from '../components/Detail/export';

const Container = styled.div`
    ${flexAlign};
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const Header = styled.div`
    width: 100%;
    height: 300px;
    background-color: ${p=>p.theme.container};
    ${flexAlign};
    margin-bottom: 50px;
`;

const BackdropCover = styled.div`
    flex: 3;
    height: 100%;
    background-image: url(${p=>p.url});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`;

const PosterContainer = styled.div`
    padding-top: 70px;
    flex: 3;
    backdrop-filter: blur(2px);
    ${flexAlign};
    &:hover {
        backdrop-filter: blur(0);
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
`;

const GenreBox = styled.div`
    padding: 10px;
    height: 30px;
    border-radius: 5px;
    background-color: ${p=>p.theme.background};
    margin-right: 10px;
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
`;

const SeasonPoster = styled(AnimePoster)`
    height: 200px;
    border-radius: 20px;
`;

const SeasonDescription = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    padding: 40px 20px 20px 20px;
`;

const Detail = ({match}) => {
    const theme= useTheme();
    const {params: {id}, params: {media}} = match;
    const [anime, setAnime] = useState({});
    const [loading, setLoading] = useState(true);
    const [lastSeason, setLastSeason] = useState();
    const [recommendations, setRecommendations] = useState();

    useEffect(() => {
        api.getAnimeInfo(media, id).then(res => {
            console.log(res);
            setAnime(res);
            if(media === 'tv')
                setLastSeason(res.seasons[res.seasons.length-1]);
        }).then(() => {
            api.getAnimeVideo(media, id).then(res => {
                console.log(res);
            }).then(() => {
                api.getAnimeRecommendation(media, id).then(res => {
                    console.log(res.data.results);
                    setRecommendations(res.data.results);
                    setLoading(false);
                })
            })
        })
    },[]);

    if(loading) return <Container><LoadingBox><Loading /></LoadingBox></Container>

    return (
        <Container url={`${IMG_URL}${anime.backdrop_path}`}>
            <Header theme={theme}>
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
                    ?<TextH1>{anime.name} ({new Date(anime.first_air_date).getFullYear()})</TextH1> 
                    :<TextH1>{anime.original_title}</TextH1>}
                    <GenreContainer>
                        {anime.genres.map((ge, i) => 
                        <GenreBox theme={theme}>{ge.name}</GenreBox>)}
                    </GenreContainer>
                </HeaderInfoContainer>
            </Header>
            <Content>
                <TextH1>개요</TextH1>
                <Comp.Description overview={anime.overview}/>
            </Content>
            {media === 'tv' && 
            <Content>
                <TextH1>최근 시즌</TextH1>
                <SeasonContainer theme={theme}>
                    <SeasonPoster url={`${IMG_URL}${lastSeason.poster_path}`} />
                    <SeasonDescription>
                        <TextH2>{lastSeason.name}</TextH2>
                        <p className="air_date">{new Date(lastSeason.air_date).getFullYear()} | {lastSeason.episode_count}화</p>
                        <p className="overview">
                            {anime.name}의 {lastSeason.season_number}번째 
                            시즌이 {new Date(lastSeason.air_date).getMonth()+1}월 {new Date(lastSeason.air_date).getDay()+1}일, {new Date(lastSeason.air_date).getFullYear()}년에 방영되었습니다.
                        </p>
                    </SeasonDescription>
                </SeasonContainer>
            </Content> }
            <Content>
                <TextH1>출연진</TextH1>
                <Comp.Cast media={media} id={id}/>
            </Content>
            <Content>
                <TextH1>추천</TextH1>
                <Comp.Recommend media={media} recommendations={recommendations} />
            </Content>
        </Container>
    );
}

export default Detail;

