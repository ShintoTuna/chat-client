import React, { FC, useContext, useState } from 'react';
import { ChatContext } from './ChatContext';
import InputWithSubmit from './InputWithSubmit';

const Landing: FC = () => {
    const [error, setError] = useState('');
    const { register, connected } = useContext(ChatContext);

    const submit = async (username: string) => {
        if (username.length > 0) {
            const { success } = await register(username);

            if (!success) {
                setError(`Username ${username} already in use`);
            }
        }
    };

    return (
        <div className="landing">
            {!connected && <h4>No connection</h4>}
            <InputWithSubmit disabled={!connected} submit={submit} placeholder="Whats your name?" />
            {error.length > 0 && <span className="error">{error}</span>}
        </div>
    );
};

export default Landing;
