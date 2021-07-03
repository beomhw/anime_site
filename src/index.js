import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {ThemeModeProvider} from './ThemeContext';
import {ThemeProvider} from 'styled-components';
import {UserProvider} from './UserContext';
import theme from './css/MediaProvider';
import GlobalStyle from './css/GlobalStyle';

ReactDOM.render(
  <BrowserRouter>
    <ThemeModeProvider>
        <ThemeProvider theme={theme}>
            <UserProvider>
                <GlobalStyle />
                <App />
            </UserProvider>
        </ThemeProvider>
    </ThemeModeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
