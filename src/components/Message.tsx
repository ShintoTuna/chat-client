import React, { FC } from 'react';
import { Message as MessageType } from '../types';
import { toHue } from '../utils';

interface Props {
    message: MessageType;
}

const Message: FC<Props> = ({ message: { message, username } }) => {
    const backgroundColor = `hsl(${toHue(username)}, 30%, 80%)`;

    return (
        <div className="message-container">
            <div className="avatar" style={{ backgroundColor }}>
                {username.slice(0, 2).toUpperCase()}
            </div>
            <div className="body">
                <div className="name">{username}</div>
                <div className="message">{message}</div>
            </div>
        </div>
    );
};

export default Message;
