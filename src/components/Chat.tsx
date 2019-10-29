import React, { useContext } from 'react';
import { ChatContext } from './ChatContext';
import Message from './Message';
import InputWithSubmit from './InputWithSubmit';

const Chat: React.FC = () => {
    const { messages, sendMessage, username, disconnect } = useContext(ChatContext);

    const submit = (message: string) => {
        if (message.length > 0 && username) {
            sendMessage({ message, username });
        }
    };

    return (
        <div className="chat">
            <button className="close" onClick={disconnect}>
                ×
            </button>
            <div className="messages">
                {messages.map((m, i) => (
                    <Message message={m} key={i} />
                ))}
            </div>
            <div className="controls">
                <InputWithSubmit submit={submit} placeholder="Type to chat" />
            </div>
        </div>
    );
};

export default Chat;
