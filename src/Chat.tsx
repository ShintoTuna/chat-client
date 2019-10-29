import React, { useState, useContext } from 'react';
import { ChatContext } from './ChatContext';
import Message from './Message';

const Chat: React.FC = () => {
    const [message, setMessage] = useState('');
    const { messages, sendMessage, username } = useContext(ChatContext);

    const submit = () => {
        if (message.length > 0 && username) {
            sendMessage({ message, username });
            setMessage('');
        }
    };

    return (
        <div className="chat">
            <div className="messages">
                {messages.map((m, i) => (
                    <Message message={m} key={i} />
                ))}
            </div>
            <div className="controls">
                <input
                    type="text"
                    value={message}
                    onChange={({ target }) => setMessage(target.value)}
                    onKeyDown={({ keyCode }) => keyCode === 13 && submit()}
                />
                <button onClick={submit}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
