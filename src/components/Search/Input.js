import React from 'react';
import styled from 'styled-components';
import {flexAlign} from '../../css/cssModule';
import {useTheme} from '../../ThemeContext';
import {BsSearch} from 'react-icons/bs';

const SearchContainer = styled.div`
    ${flexAlign};
    width: 100%;
    height: 100px;
`;

const SearchInput = styled.input`
    width: 80vw;
    height: 80px;
    font-size: 2.2em;
    padding: 20px;
    background-color: ${p=>p.theme.background};
    color: ${p=>p.theme.text};
    box-shadow: none;
    border: 0;
    border-bottom: 1px solid #dddddd;
    &:focus {
        outline: none;
    }
    transition-duration: 0.2s;
`;

const SearchButton = styled.div`
    width: 50px;
    height: 80px;
    border-bottom: 1px solid #dddddd;
    color: ${p=>p.theme.text};
    ${flexAlign};
    font-size: 2.2em;
    &:hover {
        color: #ac0d0d;
    }
    cursor: pointer;
`;

const Input = () => {
    const theme = useTheme();

    return (
        <SearchContainer>
            <SearchInput placeholder="Search" theme={theme} />
            <SearchButton theme={theme}><BsSearch/></SearchButton>
        </SearchContainer>
    );
}

export default Input;