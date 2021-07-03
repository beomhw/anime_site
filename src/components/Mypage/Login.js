import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {reset} from 'styled-reset';
import { flexAlign } from '../../css/cssModule';
import { useTheme } from '../../ThemeContext';
import { useUserDispatch } from '../../UserContext';
import GoogleLogin from 'react-google-login';

const SocialLoginButton = styled(GoogleLogin)`
    ${reset};
    background-color: ${p => p.theme.Background};
`;

const Login = () => {
    const theme = useTheme();
    const dispatch = useUserDispatch();

    const onLoginGoogle = (res) => {
        console.log(res);
        window.sessionStorage.setItem('googleID', res.googleId);
        window.sessionStorage.setItem('nickname', res.dt.Ue);
        dispatch({
            type: 'SIGN IN',
            data: {
                id: res.googleId,
                nickname: res.dt.Ue
            }
        })
    }

    return (
        <SocialLoginButton
            theme={theme}
            clientId="923114380823-04evekf6fh39nb7v8qi8p3jl8ud7lr25.apps.googleusercontent.com"
            renderl={(props) => (<div onClick={props.onClick} />)}
            onSuccess={res => {
                onLoginGoogle(res);
            }}
            onFailure={res => console.log(res)}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default Login;