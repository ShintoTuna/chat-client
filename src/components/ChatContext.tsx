import React, { createContext, useState, FC } from 'react';
import { Message } from '../types';

function useChatState() {
    const [messages, updateMessages] = useState<Message[]>([]);
    const [username, setUsername] = useState<string>();

    function sendMessage(message: Message) {
        updateMessages([...messages, message]);
    }

    function saveUsername(username: string) {
        const newMessage = {
            message: `Hi ${username}, welcome to the chat!`,
            username: 'System',
        };

        setUsername(username);
        updateMessages([...messages, newMessage]);
    }

    function disconnect() {
        setUsername('');
        updateMessages([]);
    }

    return {
        messages,
        sendMessage,
        username,
        saveUsername,
        disconnect,
    };
}

const ChatContext = createContext({} as ReturnType<typeof useChatState>);

const ChatContextProvider: FC = ({ children }) => {
    const state = useChatState();

    return <ChatContext.Provider value={state}>{children}</ChatContext.Provider>;
};

export { ChatContextProvider, ChatContext };
