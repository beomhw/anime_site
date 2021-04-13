import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {IMG_URL} from '../../Util';

const Container = styled.div`
    display: grid; // grid 디자인
    width: 60vw;
    height: 200px;
    border-radius: 10px;
    border: 1px solid #dddddd;
    margin-bottom: 15px;
`;

const StillContainer = styled.div`

`;

const TitleContainer = styled.div`

`;

const OverviewContainer = styled.div`

`;

const Episode = ({ep}) => {

    return (
        <Container>
            {ep.episode_number}
        </Container>
    );
}

export default Episode;