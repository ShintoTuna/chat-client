import React, { createContext, useState, FC, useEffect } from 'react';
import { Message } from '../types';
import * as socket from '../socket';

function useChatState() {
    const [messages, updateMessages] = useState<Message[]>([]);
    const [username, setUsername] = useState<string>();
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [connected, setConnected] = useState(true);

    useEffect(() => {
        socket.subscribeToConnectionSuccess(() => setConnected(true));
        socket.subscribeToConnectionErrors(() => setConnected(false));
        socket.subscribeToDisconnect(() => clearChat());
    }, []);

    function addMessage(message: Message) {
        updateMessages((state) => [...state, message]);
    }

    const sendMessage = (message: Message) => {
        socket.sendMessage(message);
    };

    async function register(username: string) {
        try {
            await socket.subscribeToChat(username, addMessage, setOnlineUsers);

            setUsername(username);
            setConnected(true);

            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }

    function disconnect() {
        clearChat();
        socket.disconnect();
    }

    function clearChat() {
        setUsername('');
        updateMessages([]);
    }

    return {
        connected,
        username,
        messages,
        onlineUsers,
        sendMessage,
        register,
        disconnect,
    };
}

const ChatContext = createContext({} as ReturnType<typeof useChatState>);

const ChatContextProvider: FC = ({ children }) => {
    const state = useChatState();

    return <ChatContext.Provider value={state}>{children}</ChatContext.Provider>;
};

export { ChatContextProvider, ChatContext };
