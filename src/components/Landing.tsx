import React, { FC, useContext } from 'react';
import { ChatContext } from './ChatContext';
import InputWithSubmit from './InputWithSubmit';

const Landing: FC = () => {
    const { saveUsername } = useContext(ChatContext);

    const submit = (username: string) => {
        if (username.length > 0) {
            saveUsername(username);
        }
    };

    return (
        <div className="landing">
            <InputWithSubmit submit={submit} placeholder="Whats your name?" />
        </div>
    );
};

export default Landing;
