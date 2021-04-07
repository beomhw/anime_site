import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useTheme} from '../ThemeContext';
import {flexAlign} from '../css/cssModule';
import * as api from '../api';
import dogeza from '../asset/dogeza.png';
import {IMG_URL} from '../Util';
import Cast from '../components/Detail/Cast';

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
    padding-top: 100px;
    flex: 3;
    backdrop-filter: blur(2px);
    ${flexAlign};
`;

const HeaderInfoContainer = styled.div`
    flex: 7;
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



const Detail = ({match}) => {
    const theme= useTheme();
    const {params: {id}} = match;
    const [anime, setAnime] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getAnimeInfo(id).then(res => {
            console.log(res);
            setAnime(res);
            setLoading(false);
        })
        api.getAnimeVideo(id).then(res => {
            console.log(res);
        })
    },[]);

    if(loading) return <Container>Now Loading...</Container>

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
                    <TextH1>{anime.name}</TextH1>
                </HeaderInfoContainer>
            </Header>
            <Content>
                
            </Content>
            <Content>
                <TextH1>출연진</TextH1>
                <Cast id={id}/>
            </Content>
        </Container>
    );
}

export default Detail;

