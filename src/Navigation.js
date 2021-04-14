import React from 'react';
import styled from 'styled-components';
import {Link, Switch, Route, useLocation} from 'react-router-dom';
import {useTheme} from './ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import * as RC from './route/export';
import logo from './asset/logo.png';
import {flexAlign} from './css/cssModule';
import {AiFillGithub, AiFillFacebook, AiFillTwitterCircle} from 'react-icons/ai';
import UpToggle from './components/UpToggle';
import LanguageToggle from './components/LanguageToggle';

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    ${flexAlign};
    flex-direction: column;
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
    height: 100%;
    ${flexAlign};
    flex-direction: column;
`;

const LinkStyle = styled(Link)`
    font-size: 1.2em;
    margin-right: 50px;
    color: ${p=>p.theme.text};
    &:active {
        color: ${p=>p.theme.text};
    }
`;

const Footer = styled.div`
    width: 100%;
    height: 200px;
    margin-top: auto;
    background-color: ${p=>p.theme.container};
    padding: 50px;
    ${flexAlign};
`;

const FooterText = styled.div`
    flex: 6;
    font-size: 2em;
    ${flexAlign};
`;

const TMDB = styled.a`
    &:hover {
        color: #ac0d0d;
    }
    cursor: pointer;
    color: ${p=>p.theme.text};
`;

const FooterIcons = styled.div`
    flex: 4;
    ${flexAlign};
`;

const IconsBox = styled.a`
    font-size: 2em;
    margin-left: 20px;
    &:hover {
        color: #ac0d0d;
    }
    cursor: pointer;
    color: ${p=>p.theme.text};
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
                <LanguageToggle/>
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
                <UpToggle/>
            </BodyContainer>
            <Footer theme={theme}> 
                <FooterText>
                    THANKS FOR&nbsp;<TMDB theme={theme} href="https://www.themoviedb.org/">TMDB!</TMDB>
                </FooterText>
                <FooterIcons>
                    <IconsBox theme={theme} href="https://github.com/beomhw">
                        <AiFillGithub />
                    </IconsBox>
                    <IconsBox theme={theme}>
                        <AiFillFacebook /> 
                    </IconsBox>
                    <IconsBox theme={theme}>
                        <AiFillTwitterCircle />
                    </IconsBox>
                </FooterIcons>
            </Footer>
        </Container>
    );
}

export default Navigation;  