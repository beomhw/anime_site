import React, {useState, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {useTheme} from '../ThemeContext';
import {flexAlign} from '../css/cssModule';
import * as api from '../api';
import dogeza from '../asset/dogeza.png';
import {IMG_URL} from '../Util';
import Cast from '../components/Detail/Cast';
import Description from '../components/Detail/Description';
import Loading from '../components/Loading';

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
    background-size: cover;
    background-repeat: no-repeat;
`;

const PosterContainer = styled.div`
    padding-top: 70px;
    flex: 3;
    backdrop-filter: blur(2px);
    ${flexAlign};
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

const Detail = ({match}) => {
    const theme= useTheme();
    const {params: {id}, params: {media}} = match;
    const [anime, setAnime] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getAnimeInfo(media, id).then(res => {
            console.log(res);
            setAnime(res);
            setLoading(false);
        })
        api.getAnimeVideo(media, id).then(res => {
            console.log(res);
        })
    },[]);

    if(loading) return <Container><Loading /></Container>

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
                    ?<TextH1>{anime.name}</TextH1> 
                    :<TextH1>{anime.original_title}</TextH1>}
                    <GenreContainer>
                        {anime.genres.map((ge, i) => 
                        <GenreBox theme={theme}>{ge.name}</GenreBox>)}
                    </GenreContainer>
                </HeaderInfoContainer>
            </Header>
            <Content>
                <TextH1>개요</TextH1>
                <Description overview={anime.overview}/>
            </Content>
            <Content>
                <TextH1>출연진</TextH1>
                <Cast media={media} id={id}/>
            </Content>
        </Container>
    );
}

export default Detail;

