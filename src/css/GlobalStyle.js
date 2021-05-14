import {createGlobalStyle} from 'styled-components';
import {useTheme} from '../ThemeContext';

const GlobalStyleCreate = createGlobalStyle`
    @font-face {
        font-family: 'S-CoreDream-4Regular';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    * {
        box-sizing: border-box;
        font-family: 'S-CoreDream-4Regular';
    }
    a {
        text-decoration: none;
        &:active {
            color: black;
        }
        user-select: none;
        transition-duration: 0.2s;
    }
    body {
        margin: 0;
        width: calc(100vw - 10px);
        min-height: 100vh;
        background-color: ${p=>p.themeMode.background};
        transition-duration: 0.2s;
    }
    div {
        color: ${p=>p.themeMode.text};
        transition-duration: 0.2s;
    }
    ::-webkit-scrollbar {
        width: 10px;
    } 
    ::-webkit-scrollbar-thumb {
        background-color: ${p=>p.themeMode.text};
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    } 
    ::-webkit-scrollbar-track {
        border-radius: 3px;
    }
    .noTransition {
        -moz-transition: none;
        -webkit-transition: none;
        -o-transition: none;
        transition: none;
    }
    .air_date {
        width: 100%;
        padding-top: 5px;
        margin: 0;
        font-weight: bold;
    }

    .overview {
        width: 100%;
        padding-top: 15px;
        margin: 0;
    }
`;

const GlobalStyle = () => {
    const theme = useTheme();

    return (
        <GlobalStyleCreate themeMode={theme}/>
    );
}

export default GlobalStyle;