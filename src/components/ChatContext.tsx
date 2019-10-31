import React, { createContext, useState, FC, useEffect } from 'react';
import { Message } from '../types';
import * as socket from '../socket';
import { getError } from '../error';

function useChatState() {
    const [messages, updateMessages] = useState<Message[]>([]);
    const [username, setUsername] = useState<string>();
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [connected, setConnected] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        socket.subscribeToDisconnect(() => clearChat());
        socket.subscribeToConnectionSuccess(() => {
            setConnected(true);
            setError(null);
        });
        socket.subscribeToConnectionErrors(() => {
            setConnected(false);
            setError('Connection lost');
        });
    }, []);

    function addMessage(message: Message) {
        const parsed = message.error ? { ...message, message: getError(message.message) } : message;

        updateMessages((state) => [...state, parsed]);
    }

    function sendMessage(message: Message) {
        socket.sendMessage(message);
    }

    function handleIdleDisconnect() {
        setError('Disconnected due to inactivity');
    }

    async function register(username: string) {
        try {
            await socket.subscribeToChat(username, addMessage, setOnlineUsers, handleIdleDisconnect);

            setUsername(username);
            setConnected(true);
            setError(null);

            return { success: true };
        } catch (e) {
            return { success: false };
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
        error,
        setError,
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
