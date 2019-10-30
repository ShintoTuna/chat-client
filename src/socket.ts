import io from 'socket.io-client';
import { WS_URL } from './constants';
import { Message } from './types';

const connect = () => io.connect(WS_URL, { reconnection: false });

let socket = connect();

interface RegistrationResponse {
    success: boolean;
}

export const subscribeToChat = (
    username: string,
    addMessage: (message: Message) => void,
    updateUsers: (users: string[]) => void,
) => {
    if (!socket.connected) {
        socket = connect();
    }

    socket.emit('register', username);

    return new Promise<string[]>((resolve, reject) => {
        socket.once('registration_result', (res: RegistrationResponse) => {
            if (res.success) {
                socket.on('new_message', addMessage); // TODO: guard
                socket.on('online_users_update', updateUsers); // TODO: guard
                resolve();
            } else {
                reject();
            }
        });
    });
};

export const disconnect = () => {
    socket.disconnect();
};

export const emitMessage = (message: Message) => {
    socket.emit('new_message', message);
};
