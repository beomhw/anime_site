import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useTheme} from '../ThemeContext';
import {Selector, Login} from '../components/Mypage/export';
import { flexAlign } from '../css/cssModule';
import { useUserContext } from '../UserContext';

const LoginContainer = styled.div`
    width: 80vw;
    height: 500px;
    ${flexAlign};
    flex-direction: column;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Mypage = () => {
    const theme = useTheme();
    const userState = useUserContext();

    return (
        <Container>
            {!userState.googleID ? <LoginContainer><Login /></LoginContainer> : 
                <Container>
                    환영합니당 {userState.nickname}
                </Container>
            }
        </Container>
    );
}

export default Mypage;