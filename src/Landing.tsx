import React, { FC, useContext, useState } from 'react';
import { ChatContext } from './ChatContext';

const Landing: FC = () => {
    const [username, setUsername] = useState('');
    const { saveUsername } = useContext(ChatContext);
    const submit = () => {
        if (username.length > 0) {
            saveUsername(username);
        }
    };

    return (
        <div>
            <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                onKeyDown={({ keyCode }) => keyCode === 13 && submit()}
            />
            <button onClick={submit}>Enter</button>
        </div>
    );
};

export default Landing;
