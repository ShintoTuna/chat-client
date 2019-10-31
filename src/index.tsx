import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ChatContextProvider } from './components/ChatContext';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <ChatContextProvider>
            <App />
        </ChatContextProvider>
    </ThemeProvider>,
    document.getElementById('root'),
);
