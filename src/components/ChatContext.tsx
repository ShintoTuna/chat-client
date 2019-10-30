import React, { createContext, useState, FC } from 'react';
import { Message } from '../types';
import { subscribeToChat, emitMessage, disconnect as disconnectFormSocket } from '../socket';

function useChatState() {
    const [messages, updateMessages] = useState<Message[]>([]);
    const [username, setUsername] = useState<string>();
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    function addMessage(message: Message) {
        updateMessages((state) => [...state, message]);
    }

    const sendMessage = (message: Message) => {
        emitMessage(message);
    };

    async function saveUsername(username: string) {
        try {
            await subscribeToChat(username, addMessage, setOnlineUsers);
            setUsername(username);

            return true;
        } catch (error) {
            return false;
        }
    }

    function disconnect() {
        setUsername('');
        updateMessages([]);
        disconnectFormSocket();
    }

    return {
        username,
        messages,
        onlineUsers,
        sendMessage,
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
