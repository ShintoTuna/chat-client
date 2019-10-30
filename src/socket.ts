import io from 'socket.io-client';
import { WS_URL } from './constants';
import { Message } from './types';

const socket = io.connect(WS_URL);

interface RegistrationResponse {
    success: boolean;
}

const unsubscribe = () => {
    socket.off('new_message');
    socket.off('online_users_update');
};

export const subscribeToChat = (
    username: string,
    addMessage: (message: Message) => void,
    updateUsers: (users: string[]) => void,
) => {
    if (!socket.connected) {
        socket.connect();
    }

    socket.emit('register', username);

    return new Promise<string[]>((resolve, reject) => {
        socket.once('registration_result', (res: RegistrationResponse) => {
            if (res.success) {
                socket.on('new_message', addMessage); // TODO: guard
                socket.on('online_users_update', updateUsers); // TODO: guard
                resolve();
            } else {
                socket.disconnect();
                reject('username_taken');
            }
        });
    });
};

export const sendMessage = (message: Message) => {
    socket.emit('new_message', message);
};

export const disconnect = () => {
    unsubscribe();
    socket.disconnect();
};

export const subscribeToDisconnect = (cb: () => void) => {
    socket.on('disconnect', () => {
        unsubscribe();
        cb();
    });
};

export const subscribeToConnectionErrors = (cb: () => void) => {
    socket.on('connect_error', cb);
};

export const subscribeToConnectionSuccess = (cb: () => void) => {
    socket.on('connect', cb);
};
