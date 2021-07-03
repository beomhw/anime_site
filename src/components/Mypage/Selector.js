import React from 'react';
import styled from 'styled-components';
import {useTheme} from '../../ThemeContext';
import {flexAlign} from '../../css/cssModule';


const Container = styled.div`
    width: 300px;
    height: 60px;
    ${flexAlign};
`;

const Select = styled.div`
    font-size: 1.3rem;
    text-align: center;
    color: ${p => p.theme.text};
    cursor: pointer;
    margin: 10px;
`;

const Selector = ({changeForm}) => {
    const theme = useTheme();

    return (
        <Container>
            <Select onClick={() => changeForm('sign in')} theme={theme}>sign in</Select>
            <Select onClick={() => changeForm('sign up')} theme={theme}>sign up</Select>
        </Container>
    );
}

export default Selector;
