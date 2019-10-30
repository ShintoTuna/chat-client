import React, { useContext, FC, useRef, useEffect } from 'react';
import { ChatContext } from './ChatContext';
import Message from './Message';
import InputWithSubmit from './InputWithSubmit';
import { toHue, escapeHTMLEncode } from '../utils';

const Chat: FC = () => {
    const { messages, sendMessage, username, disconnect, onlineUsers } = useContext(ChatContext);
    const containerRef = useRef<HTMLDivElement>(null);

    const keepAtBottom = () => {
        const el = containerRef.current;

        if (el) {
            setTimeout(() => {
                el.scrollTo(0, el.scrollHeight);
            }, 0);
        }
    };

    const submit = (message: string) => {
        if (message.length > 0 && username) {
            sendMessage({ message: escapeHTMLEncode(message), username });
        }
    };

    useEffect(() => {
        keepAtBottom();
    }, [messages]);

    return (
        <div className="chat">
            <button className="close" onClick={disconnect}>
                ×
            </button>
            <div className="users">
                <h4>Online</h4>
                <ul>
                    {onlineUsers.map((user, i) => (
                        <User key={i} user={user} />
                    ))}
                </ul>
            </div>
            <div className="messages" ref={containerRef}>
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

const User: FC<{ user: string }> = ({ user }) => {
    const color = `hsl(${toHue(user)}, 50%, 80%)`;

    return <li style={{ color }}>{user}</li>;
};

export default Chat;
