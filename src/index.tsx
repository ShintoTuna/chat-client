import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { ChatContextProvider } from './components/ChatContext';

ReactDOM.render(
    <ChatContextProvider>
        <App />
    </ChatContextProvider>,
    document.getElementById('root'),
);
