import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChatContextProvider } from './ChatContext';

ReactDOM.render(
    <ChatContextProvider>
        <App />
    </ChatContextProvider>,
    document.getElementById('root'),
);
