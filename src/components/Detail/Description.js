import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';

const DescriptionContainer = styled.div`
    width: 80vw;
    height: 100%;
    display: flex;
    ${flexAlign};
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: ${p=>p.theme.container};
    padding: 20px;
`;

const Description = ({overview}) => {
    const theme = useTheme();

    return (
        <DescriptionContainer theme={theme}>
            {overview}
        </DescriptionContainer>
    );
}

export default Description;