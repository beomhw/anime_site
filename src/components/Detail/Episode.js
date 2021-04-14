import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {IMG_URL} from '../../Util';

const Container = styled.div`
    display: grid; // grid 디자인
    width: 60vw;
    border-radius: 10px;
    border: 1px solid #dddddd;
    margin-bottom: 15px;
    grid-template-columns: minmax(290px, auto);
    grid-gap: 5px; // 그리드 셀 사이 공간\
    @media(max-width: 1024px) {
        grid-template: auto;
        height: 400px;
        grid-template-rows: minmax(150px, auto);
    }
    @media(min-width: 1025px) {
        height: 200px;
        grid-template-rows: auto;
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
    @media(max-width: 1024px) {
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
    ${flexAlign};
    @media(max-width: 1024px) {
        grid-column: 1 / 4;
        grid-row: 5;
    }
`;

const Title = styled.p`
    font-size: 1.2em;
    margin: 0;
`;

const AirDate = styled.p`
    
`;

const OverviewContainer = styled.div`
    grid-column: 2 / 4;
    grid-row: 2 / 4;
    padding: 10px;
    font-size: 0.9em;
    @media(max-width: 1024px) {
        grid-column: 1 / 4;
        grid-row: 6 / 8;
    }
`;

const Episode = ({ep}) => {
    console.log('ep : ', ep);

    // if(ep.overview.length > 300) {
    //     ep.overview = ep.overview.slice(0, 300) + '...';
    // }

    return (
        <Container>
            <StillContainer url={`${IMG_URL}${ep.still_path}`} />
            <TitleContainer>
                <Title>{ep.name}</Title>
            </TitleContainer>
            <OverviewContainer>{ep.overview}</OverviewContainer>
        </Container>
    );
}

export default Episode;