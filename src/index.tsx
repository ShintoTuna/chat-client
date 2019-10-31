import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './components/App';
import { ChatContextProvider } from './components/ChatContext';
import theme from './theme';
import GlobalStyles from './theme/GlobalStyles';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <ChatContextProvider>
            <GlobalStyles />
            <App />
        </ChatContextProvider>
    </ThemeProvider>,
    document.getElementById('root'),
);
