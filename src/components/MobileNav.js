import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import {useLanguageDispatch} from '../LanguageContext';
import kr from '../asset/kr.png';
import en from '../asset/en.png';
import jp from '../asset/jp.png';

const LinkStyle = styled(Link)`
    font-size: 1.2em;
    margin-bottom: 10px;
    color: ${p=>p['data-thememode'].text};
    &:active {
        color: ${p=>p['data-thememode'].text};
    }
`;

const Nav = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #78B7D0;
    opacity: ${p=>p.on.opacity};
    visibility: ${p=>p.on.visibility};
    z-index: 100;
    transition: 0.3s;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

const Flag = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-image: url(${p=>p.url});
    background-size: cover;
    margin: 10px;
    filter: grayscale(60%);
    &:hover {
        filter: grayscale(0%);
    }
    cursor: pointer;
    @media (max-width: ${p=>p.theme.mobile}) {
        width: 60px;
        height: 60px;
        border-radius: 30px;
    }
`;

const SelectLanguage = styled.p`
    justify-content: center;
    margin: 20px 0 0 0;
`;

const MobileNav = ({on, theme, pathname, setOn}) => {
    const dispatch = useLanguageDispatch();

    const onChange = lg_type => {
        setOn({
            nav: false,
            opacity: 0,
            visibility: 'hidden'
        })
        return dispatch({type: lg_type});
    };

    return (
        <Nav on={on}>
            <LinkStyle data-thememode={theme} style={pathname === '/anime_site/' ? {color: '#8c0000'} : {}} to='/anime_site/'>HOME</LinkStyle>
            <LinkStyle data-thememode={theme} style={pathname === '/anime_site/seasons' ? {color: '#8c0000'} : {}} to='/anime_site/seasons'>SEASONS</LinkStyle>
            <LinkStyle data-thememode={theme} style={pathname === '/anime_site/search' ? {color: '#8c0000'} : {}} to='/anime_site/search'>SEARCH</LinkStyle>
            {/* <LinkStyle data-thememode={theme} style={pathname === '/anime_site/mypage' ? {color: '#8c0000'} : {}} to='/mypage'>MYPAGE</LinkStyle> */}
            <SelectLanguage>Select language!</SelectLanguage>
            <Content>
                <Flag url={kr} onClick={() => onChange('KO')}/>
                <Flag url={en} onClick={() => onChange('EN')} />
                <Flag url={jp} onClick={() => onChange('JP')} />
            </Content>
            <ThemeToggle />
        </Nav>
    );
};

export default React.memo(MobileNav);