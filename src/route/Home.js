import React from 'react';
import styled from 'styled-components';
import {useTheme} from '../ThemeContext';
import {flexAlign} from '../css/cssModule';
import {AniList} from '../components/Home/export';
import {HomeProvider} from '../HomeContext';

const Container = styled.div`
    width: 100%;
    height: 100%;
    ${flexAlign};
    flex-direction: column;
    margin-top: 20px;
`;

const ContentContainer = styled.div`
    width: 100%;
    height: 540px;
`;

const TrendText = styled.p`
    font-size: 1.6em;
    margin: 0;
    margin-left: 20px;
`;

const Home = () => {
    const theme = useTheme();

    return (
        <HomeProvider>
            <Container>
                <ContentContainer>
                    <TrendText>アニメ TOP 20</TrendText>
                    <AniList media="tv" type="16"/>
                </ContentContainer>
                <ContentContainer>
                    <TrendText>MOVIE TOP 20</TrendText>
                    <AniList media="movie" type="16"/>
                </ContentContainer>
                <ContentContainer>
                    <TrendText>ドラマTOP 20</TrendText>
                    <AniList media="tv" type="16,18"/>
                </ContentContainer>                <ContentContainer>
                    <TrendText>コメディTOP 20</TrendText>
                    <AniList media="tv" type="16,35"/>
                </ContentContainer>
            </Container>
        </HomeProvider>
    );
};

export default Home;