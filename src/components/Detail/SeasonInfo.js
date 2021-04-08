import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import {useTheme} from '../../ThemeContext';

const Container = styled.div`
    width: 80vw;
    height: 300px;
    border-radius: 20px;
    background-color: ${p=>p.theme.container};
    margin-top: 10px;
    margin-bottom: 20px;
`;

const SeasonInfo = ({seasons}) => {
    const theme = useTheme();
    console.log(seasons);

    useEffect(() => {
        seasons.map(se => {
            console.log(se);
        })
    },[]);

    return (
        <Container theme={theme}>
        </Container>
    );
}

export default SeasonInfo;