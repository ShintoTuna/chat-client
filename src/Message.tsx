import React, { FC } from 'react';
import { Message as MessageType } from './types';

interface Props {
    message: MessageType;
}

const Message: FC<Props> = ({ message: { message, username } }) => (
    <div>
        <span>{username}</span>: {message}
    </div>
);

export default Message;
