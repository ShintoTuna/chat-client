import React, { FC, useContext, Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ChatContext } from './ChatContext';
import Chat from './Chat';
import Landing from './Landing';

const App: FC = () => {
    const { username } = useContext(ChatContext);

    return (
        <Fragment>
            {username ? <Chat /> : <Landing />}
            <GlobalStyles />
        </Fragment>
    );
};

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${({ theme }) => theme.colors.darkBg};
        position: relative;
    }

    *,
    html {
        box-sizing: border-box;
    }

    *:focus {
        outline: none;
    }
`;

export default App;
