import io from 'socket.io-client';
import { WS_URL } from './constants';
import { Message } from './types';

const socket = io.connect(WS_URL);

interface RegistrationSuccessResponse {
    success: true;
    users: string[];
}

interface RegistrationFailResponse {
    success: false;
    reason: string;
}

type RegistrationResponse = RegistrationFailResponse | RegistrationSuccessResponse;

export const subscribeToMessages = (username: string, cb: (message: Message) => void) => {
    socket.emit('register', username);

    return new Promise((resolve, reject) => {
        socket.once('registration_result', (res: RegistrationResponse) => {
            if (res.success) {
                resolve();
                socket.on('new_message', cb); // TODO guard
            } else {
                reject(res.reason);
            }
        });
    });
};

export const emitMessage = (message: Message) => {
    socket.emit('new_message', message);
};
