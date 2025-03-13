import styled from 'styled-components';
import {useLanguage} from '../LanguageContext';
import {flexAlign} from '../css/cssModule';
import {AniList} from '../components/Home/export';
import {HomeProvider} from '../HomeContext';
// import { useUserContext } from '../UserContext';
import {useState, useEffect} from 'react';
import { NOW_DATE } from '../Util';

const Container = styled.div`
    width: 100%;
    height: 100%;
    ${flexAlign};
    flex-direction: column;
`;

const ContentContainer = styled.div`
    width: 90%;
    height: 540px;
    margin-bottom: 30px;
    ${flexAlign};
    flex-direction: column;
    @media (max-width: ${p=>p.theme.mobile}) {
        height: 300px;
    }
`;

const TrendText = styled.p`
    width: 90vw;
    font-size: 1.6em;
    margin: 0;
    @media (max-width: ${p=>p.theme.mobile}) {
        width: 100%;
    }
`;

const P = styled.p`
    font-size: 1.4rem;
    width: 90vw;
    @media (max-width: ${p=>p.theme.mobile}) {
        width: 100%;
    }
`;

const getRandomYear = () => {
    const min = 2000;
    const max = NOW_DATE().getFullYear() - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Home = () => {
    const text = useLanguage();
    const [year] = useState(getRandomYear());
    const nowYear = NOW_DATE().getFullYear();

    return (
        <HomeProvider>
            <Container>
                <ContentContainer>
                    <TrendText>{text.Home.popular_tv}</TrendText>
                    <AniList media="tv" type="16" la={text.type} year={nowYear} sort="popularity.desc"/>
                </ContentContainer>
                <ContentContainer>
                    <TrendText>{text.Home.popular_movie}</TrendText>
                    <AniList media="movie" type="16" la={text.type} year={nowYear} sort="vote_count.desc"/>
                </ContentContainer>
                <ContentContainer>
                    <TrendText>{year}{text.Home.popular_year}</TrendText>
                    <AniList media="tv" type="16" la={text.type} year={year}/>
                </ContentContainer>   
                <ContentContainer>
                    <TrendText>{text.Home.popular_drama}</TrendText>
                    <AniList media="tv" type="16,18" la={text.type} year={nowYear} sort="vote_count.desc"/>
                </ContentContainer>                
                <ContentContainer>
                    <TrendText>{text.Home.popular_comedy}</TrendText>
                    <AniList media="tv" type="16,35" la={text.type} year={nowYear} sort="vote_count.desc"/>
                </ContentContainer>
                <ContentContainer>
                    <TrendText>{text.Home.popular_action}</TrendText>
                    <AniList media="tv" type="16,10759,10765" la={text.type} year={nowYear} sort="vote_count.desc"/>
                </ContentContainer>
            </Container>
        </HomeProvider>
    );
};

export default Home;