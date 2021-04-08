import React from 'react';
import styled from 'styled-components';
import {Link, Switch, Route, useLocation} from 'react-router-dom';
import {useTheme} from './ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import * as RC from './route/export';
import logo from './asset/logo.png';
import {flexAlign} from './css/cssModule';

const Container = styled.div`
    width: 100%;
    height: 100%;
    ${flexAlign};
`;

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    ${flexAlign};
    width: 100%;
    z-index: 50;
    background-color: ${p=>p.theme.background};
`;

const BodyContainer = styled.div`
    width: 100%;
    position: relative;
    top: 50px;
`;

const LinkStyle = styled(Link)`
    font-size: 1.2em;
    margin-right: 50px;
    color: ${p=>p.theme.text};
    &:active {
        color: ${p=>p.theme.text};
    }
`;

function usePathname () {
    let location = useLocation();
    return location.pathname;
}

const Navigation = () => {
    const theme = useTheme();
    const pathname = usePathname();
    console.log(pathname);

    return (
        <Container>
            <HeaderContainer theme={theme}>
                <LinkStyle theme={theme} to='/'><img src={logo} /></LinkStyle>
                <LinkStyle theme={theme} style={pathname === '/' ? {color: '#8c0000'} : {}} to='/'>HOME</LinkStyle>
                <LinkStyle theme={theme} style={pathname === '/seasons' ? {color: '#8c0000'} : {}} to='/seasons'>SEASONS</LinkStyle>
                <LinkStyle theme={theme} style={pathname === '/search' ? {color: '#8c0000'} : {}} to='/search'>SEARCH</LinkStyle>
                <LinkStyle theme={theme} style={pathname === '/mypage' ? {color: '#8c0000'} : {}} to='/mypage'>MYPAGE</LinkStyle>
                <ThemeToggle />
            </HeaderContainer>
            <BodyContainer>
                <Switch>
                    <Route path='/' exact component={RC.Home} />
                    <Route path='/seasons' component={RC.Seasons} />
                    <Route path='/search' component={RC.Search} />
                    <Route path='/mypage' component={RC.MyPage} />
                    <Route path='/detail/:id/:media' component={RC.Detail} />
                </Switch>
            </BodyContainer>
        </Container>
    );
}

export default Navigation;