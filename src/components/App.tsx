import React, { FC, useContext } from 'react';
import { ChatContext } from './ChatContext';
import Chat from './Chat';
import Landing from './Landing';

const App: FC = () => {
    const { username } = useContext(ChatContext);

    return username ? <Chat /> : <Landing />;
};

export default App;
