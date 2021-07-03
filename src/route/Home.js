import styled from 'styled-components';
import {useLanguage} from '../LanguageContext';
import {flexAlign} from '../css/cssModule';
import {AniList} from '../components/Home/export';
import {HomeProvider} from '../HomeContext';
import { useUserContext } from '../UserContext';

const Container = styled.div`
    width: 100%;
    height: 100%;
    ${flexAlign};
    flex-direction: column;    
`;

const ContentContainer = styled.div`
    width: 100%;
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
    margin-top: 70px;
    font-size: 1.4rem;
    width: 90vw;
    @media (max-width: ${p=>p.theme.mobile}) {
        width: 100%;
    }
`;

const Home = () => {
    const text = useLanguage();
    const user = useUserContext();

    return (
        <HomeProvider>
            {user.googleID && <P>환영합니다 {user.nickname}</P>}
            <Container>
                <ContentContainer>
                    <TrendText>{text.Home.popular_tv}</TrendText>
                    <AniList media="tv" type="16" la={text.type}/>
                </ContentContainer>
                <ContentContainer>
                    <TrendText>{text.Home.popular_movie}</TrendText>
                    <AniList media="movie" type="16" la={text.type}/>
                </ContentContainer>
                <ContentContainer>
                    <TrendText>{text.Home.popular_year}</TrendText>
                    <AniList media="tv" type="16,18" la={text.type} year="2020"/>
                </ContentContainer>   
                <ContentContainer>
                    <TrendText>{text.Home.popular_drama}</TrendText>
                    <AniList media="tv" type="16,18" la={text.type}/>
                </ContentContainer>                
                <ContentContainer>
                    <TrendText>{text.Home.popular_comedy}</TrendText>
                    <AniList media="tv" type="16,35" la={text.type}/>
                </ContentContainer>
                <ContentContainer>
                    <TrendText>{text.Home.popular_action}</TrendText>
                    <AniList media="tv" type="16,10759,10765" la={text.type}/>
                </ContentContainer>
            </Container>
        </HomeProvider>
    );
};

export default Home;