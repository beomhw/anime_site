import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../css/cssModule';

const Container = styled.div`
    ${flexAlign};
    flex-direction: column;
`;

const WeekBox = styled.div`
    width: 100%;
    height: 100px;
    ${flexAlign};
`;

const Week = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: 2px solid gray;
    ${flexAlign};
`;



const Seasons = () => {
    return (
        <Container>
            <WeekBox>
                <Week>일</Week>
                <Week>월</Week>
                <Week>화</Week>
                <Week>수</Week>
                <Week>목</Week>
                <Week>금</Week>
                <Week>토</Week>
            </WeekBox>
        </Container>
    );
};

export default Seasons;