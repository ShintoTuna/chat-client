import React, { FC, useContext, useState } from 'react';
import { ChatContext } from './ChatContext';
import InputWithSubmit from './InputWithSubmit';

const Landing: FC = () => {
    const [error, setError] = useState('');
    const { saveUsername } = useContext(ChatContext);

    const submit = async (username: string) => {
        if (username.length > 0) {
            const success = await saveUsername(username);

            if (!success) {
                setError(`Username ${username} already in use`);
            }
        }
    };

    return (
        <div className="landing">
            <InputWithSubmit submit={submit} placeholder="Whats your name?" />
            {error.length > 0 && <span className="error">{error}</span>}
        </div>
    );
};

export default Landing;
