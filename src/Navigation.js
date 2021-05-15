import {useState, useEffect} from 'react';
import styled,{css} from 'styled-components';
import {Link, Switch, Route, useLocation} from 'react-router-dom';
import {useTheme} from './ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import * as RC from './route/export';
import logo from './asset/logo.png';
import {flexAlign} from './css/cssModule';
import {AiFillGithub, AiFillFacebook, AiFillTwitterCircle} from 'react-icons/ai';
import UpToggle from './components/UpToggle';
import LanguageToggle from './components/LanguageToggle';
import LanguageModal from './components/LanguageModal';
import {useLanguage} from './LanguageContext';
import {useGetSize} from './components/resize';
import MobileNav from './components/MobileNav';
import Hamburger from './components/Hamburger';

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
    background-color: ${p=>p['data-thememode'].background};
`;

const BodyContainer = styled.div`
    width: 100%;
    ${flexAlign};
    flex-direction: column;
    ${p=>p.on.nav ? css`
        height: 0px;
        overflow: hidden;
    ` : css`
        height: 100%;
        overflow: auto;
    `}
`;

const LinkStyle = styled(Link)`
    font-size: 1.2em;
    margin-right: 50px;
    color: ${p=>p['data-thememode'].text};
    &:active {
        color: ${p=>p['data-thememode'].text};
    }
    @media(max-width: ${p=>p.theme.mobile}) {
        margin: 0;
    }
`;

const Footer = styled.div`
    width: 100%;
    height: 200px;
    margin-top: auto;
    background-color: ${p=>p['data-thememode'].container};
    padding: 30px;
    ${flexAlign};
    @media(max-width: ${p=>p.theme.mobile}) {
        flex-direction: column;
    }
`;

const FooterText = styled.div`
    flex: 6;
    font-size: 2.3em;
    ${flexAlign};
    @media(max-width: ${p=>p.theme.mobile}) {
        font-size: 1.6em;
    }
`;

const TMDB = styled.a`
    &:hover {
        color: #ac0d0d;
    }
    cursor: pointer;
    color: ${p=>p['data-thememode'].text};
`;

const FooterIcons = styled.div`
    flex: 4;
    ${flexAlign};
    @media(max-width: ${p=>p.theme.mobile}) {
        flex-wrap: wrap;
    }
`;

const IconsBox = styled.a`
    font-size: 2em;
    margin-left: 20px;
    &:hover {
        color: #ac0d0d;
    }
    cursor: pointer;
    color: ${p=>p['data-thememode'].text};
    @media(max-width: ${p=>p.theme.mobile}) {
        margin: 5px;
    }
`;

function usePathname () {
    let location = useLocation();
    return location.pathname;
}

const Navigation = () => {
    const [on, setOn] = useState({
        nav: false,
        opacity: 0,
        visibility: 'hidden'
    });
    const size = useGetSize();
    const theme = useTheme();
    const pathname = usePathname();
    const state = useLanguage();
    const [loading, setLoading] = useState(0);
    const [modal, setModal] = useState({
        opacity: 0,
        visibility: 'hidden'
    });

    useEffect(() => {
        setLoading(1);
        
        setTimeout(setLoading(0), 1500);
    },[state])

    return (
        <Container>
            {loading ? <>Now Loading..</> : <>
            {size.width > 960 ? 
            <HeaderContainer data-thememode={theme}>
                <LinkStyle data-thememode={theme} to='/anime_site/'><img src={logo} /></LinkStyle>
                <LinkStyle data-thememode={theme} style={pathname === '/anime_site/' ? {color: '#8c0000'} : {}} to='/anime_site/'>HOME</LinkStyle>
                <LinkStyle data-thememode={theme} style={pathname === '/anime_site/seasons' ? {color: '#8c0000'} : {}} to='/anime_site/seasons'>SEASONS</LinkStyle>
                <LinkStyle data-thememode={theme} style={pathname === '/anime_site/search' ? {color: '#8c0000'} : {}} to='/anime_site/search'>SEARCH</LinkStyle>
                <LanguageToggle setModal={setModal}/>
                <ThemeToggle />
            </HeaderContainer> :
            <HeaderContainer data-thememode={theme}>
                <MobileNav setOn={setOn} on={on} theme={theme} pathname={pathname} />
                <LinkStyle data-thememode={theme} to='/anime_site/'><img src={logo} /></LinkStyle>
                <Hamburger la={state} pathname={pathname} theme={theme} setOn={setOn} nav={on.nav} />
            </HeaderContainer>
            }
            <BodyContainer on={on}>
                <LanguageModal modal={modal} setModal={setModal}/>
                <Switch>
                    <Route path='/anime_site/' exact component={RC.Home} />
                    <Route path='/anime_site/seasons' component={RC.Seasons} />
                    <Route path='/anime_site/search' component={RC.Search} />
                    <Route path='/anime_site/detail/:id/:media' component={RC.Detail} />
                </Switch>
                <UpToggle/>
            </BodyContainer>
            <Footer data-thememode={theme}> 
                <FooterText>
                    THANKS FOR&nbsp;<TMDB data-thememode={theme} href="https://www.themoviedb.org/">TMDB!</TMDB>
                </FooterText>
                <FooterIcons>
                    <IconsBox data-thememode={theme} href="https://github.com/beomhw">
                        <AiFillGithub />
                    </IconsBox>
                    <IconsBox data-thememode={theme}>
                        <AiFillFacebook /> 
                    </IconsBox>
                    <IconsBox data-thememode={theme}>
                        <AiFillTwitterCircle />
                    </IconsBox>
                </FooterIcons>
            </Footer>
            </> }
        </Container>
    );
}

export default Navigation;  