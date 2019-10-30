import React, { createContext, useState, FC } from 'react';
import { Message } from '../types';
import { subscribeToMessages, emitMessage } from '../socket';

function useChatState() {
    const [messages, updateMessages] = useState<Message[]>([]);
    const [username, setUsername] = useState<string>();

    function addMessage(message: Message) {
        updateMessages((state) => [...state, message]);
    }

    const sendMessage = (message: Message) => {
        emitMessage(message);
    };

    async function saveUsername(username: string) {
        try {
            await subscribeToMessages(username, addMessage);
            setUsername(username);

            return true;
        } catch (error) {
            return false;
        }
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
