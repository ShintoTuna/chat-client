import io from 'socket.io-client';
import { WS_URL } from './constants';
import { Message } from './types';

const socket = io.connect(WS_URL);

interface RegistrationResponse {
    success: boolean;
}

enum Event {
    newMessage = 'new_message',
    onlineUsersUpdate = 'online_users_update',
    registrationResult = 'registration_result',
    register = 'register',
    disconnect = 'disconnect',
    disconnectIdle = 'disconnect_idle',
    connectionError = 'connect_error',
    connect = 'connect',
}

const unsubscribe = () => {
    socket.off(Event.newMessage);
    socket.off(Event.onlineUsersUpdate);
};

export const subscribeToChat = (
    username: string,
    addMessage: (message: Message) => void,
    updateUsers: (users: string[]) => void,
    handleIdleDisconnect: () => void,
) => {
    if (!socket.connected) {
        socket.connect();
    }

    socket.emit(Event.register, username);

    return new Promise<string[]>((resolve, reject) => {
        socket.once(Event.registrationResult, (res: RegistrationResponse) => {
            if (res.success) {
                socket.on(Event.newMessage, addMessage);
                socket.on(Event.onlineUsersUpdate, updateUsers);
                socket.on(Event.disconnectIdle, handleIdleDisconnect);
                resolve();
            } else {
                socket.disconnect();
                reject();
            }
        });
    });
};

export const sendMessage = (message: Message) => {
    socket.emit(Event.newMessage, message);
};

export const disconnect = () => {
    unsubscribe();
    socket.disconnect();
};

export const subscribeToDisconnect = (cb: () => void) => {
    socket.on(Event.disconnect, () => {
        unsubscribe();
        cb();
    });
};

export const subscribeToConnectionErrors = (cb: () => void) => {
    socket.on(Event.connectionError, cb);
};

export const subscribeToConnectionSuccess = (cb: () => void) => {
    socket.on(Event.connect, cb);
};
