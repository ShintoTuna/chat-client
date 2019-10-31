import React, { useContext, FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChatContext } from './ChatContext';
import Message from './Message';
import InputWithSubmit from './InputWithSubmit';
import { escapeHTMLEncode } from '../utils';
import Users from './Users';

const Chat: FC = () => {
    const { messages, sendMessage, username, disconnect, onlineUsers } = useContext(ChatContext);
    const containerRef = useRef<HTMLDivElement>(null);

    const keepAtBottom = () => {
        const el = containerRef.current;

        if (el) {
            // Push event to the end of the que so it will trigger after rerender
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
        <ChatContainer>
            <CloseButton onClick={disconnect} />
            <Users users={onlineUsers} />
            <Messages ref={containerRef}>
                {messages.map((m, i) => (
                    <Message message={m} key={i} />
                ))}
            </Messages>
            <Controls>
                <InputWithSubmit submit={submit} placeholder="Type to chat" />
            </Controls>
        </ChatContainer>
    );
};

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    min-height: 100vh;
    padding: 10px;
`;

const CloseButton = styled.button`
    position: absolute;
    z-index: 10;
    top: 10px;
    right: 10px;
    border: none;
    background-color: Transparent;
    color: ${({ theme }) => theme.colors.darkFont};
    font-size: 30px;
    line-height: 45px;
    text-align: center;
    padding: 0;
    margin: 0;
    width: 45px;
    height: 45px;
    cursor: pointer;
    border-radius: 5px;
    ::after {
        content: '×';
    }
    &:hover {
        background-color: ${({ theme }) => theme.colors.lightBg};
    }
`;

const Messages = styled.div`
    position: absolute;
    top: 82px;
    bottom: 72px;
    left: 0;
    right: 0;
    overflow: auto;
`;

const Controls = styled.div`
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;

export default Chat;
