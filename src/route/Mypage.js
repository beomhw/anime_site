import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useTheme} from '../ThemeContext';
import {Selector, Login} from '../components/Mypage/export';
import { flexAlign } from '../css/cssModule';
import { useUserContext } from '../UserContext';

const Container = styled.div`
    width: 80vw;
    height: 500px;
    ${flexAlign};
    flex-direction: column;
`;

const Mypage = () => {
    const theme = useTheme();
    const userState = useUserContext();

    return (
        <Container>
            {!userState.googleID ? <Login /> : 
                <>
                    환영합니당 {userState.nickname}
                </>
            }
        </Container>
    );
}

export default Mypage;