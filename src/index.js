import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from './ThemeContext';
import GlobalStyle from './css/GlobalStyle';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider>
        <GlobalStyle />
        <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
