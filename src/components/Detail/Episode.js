import styled from 'styled-components';
import {IMG_ORIGINAL_URL} from '../../Util';
import dogeza from '../../asset/dogeza_reco.png';
import { useLanguage } from '../../LanguageContext';

const Container = styled.div`
    display: grid; // grid 디자인
    width: 70vw;
    border-radius: 10px;
    border: 1px solid #dddddd;
    margin: 0 auto;
    margin-bottom: 20px;
    grid-gap: 5px; // 그리드 셀 사이 공간\
    @media (max-width: ${p=>p.theme.tabletM}) {
        grid-template: auto;
        height: 400px;
        grid-template-rows: minmax(150px, auto);
        grid-template-columns: minmax(150px, auto);
    }
    @media (min-width: ${p=>p.theme.tabletM}) {
        height: 200px;
        grid-template-rows: auto;
        grid-template-columns: minmax(300px, 300px);
    }
`;

const StillContainer = styled.div`
    border: 1px solid #dddddd;
    grid-column: 1;
    grid-row: 1 / 4;
    background-image: url(${p=>p.url});
    background-size: cover;
    background-position: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    @media (max-width: ${p=>p.theme.tabletM}) {
        border-bottom-left-radius: 0px;
        border-top-right-radius: 10px;
        grid-column: 1 / 4;
        grid-row: 1 / 5;
    }
`;

const TitleContainer = styled.div`
    border-bottom: 1px solid #dddddd;
    grid-column: 2 / 4;
    grid-row: 1;
    display: flex;
    align-items: center;
    @media (max-width: ${p=>p.theme.tabletM}) {
        grid-column: 1 / 4;
        grid-row: 5;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const Title = styled.p`
    font-size: 1.2em;
    margin: 0;
    padding: 0 5px 0 5px;
`;

const AirDate = styled.p`
    font-size: 0.9em;
    margin: 0;
    margin-left: auto;
    margin-right: 15px;
    min-width: 85px;
    @media (max-width: ${p=>p.theme.tabletM}) {
        margin: 0 auto;
        min-width: 0;
    }
`;

const OverviewContainer = styled.div`
    grid-column: 2 / 4;
    grid-row: 2 / 4;
    padding: 10px;
    font-size: 0.9em;
    overflow-y: auto;
    @media (max-width: ${p=>p.theme.tabletM}) {
        grid-column: 1 / 4;
        grid-row: 6 / 8;
    }
`;

const Episode = ({ep}) => {
    const text = useLanguage();

    return (
        <Container>
            {ep.still_path === null ? <StillContainer url={dogeza} /> : <StillContainer url={`${IMG_ORIGINAL_URL}${ep.still_path}`} /> }
            <TitleContainer>
                <Title>{ep.name}</Title><AirDate>{ep.air_date}</AirDate>
            </TitleContainer>
            <OverviewContainer>{ep.overview === "" ? text.Detail.null_overview : ep.overview}</OverviewContainer>
        </Container>
    );
}

export default Episode;