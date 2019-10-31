enum Errors {
    messageMissing = 'message_missing',
    messageNotString = 'message_not_string',
    messageTooLong = 'message_too_long',
    usernameMissing = 'username_missing',
    userNotRegistered = 'user_not_registered',
}

export function getError(error: string) {
    switch (error) {
        case Errors.messageMissing:
            return 'Missing message';
        case Errors.messageNotString:
            return 'Message is not a string';
        case Errors.messageTooLong:
            return 'Message is too long';
        case Errors.usernameMissing:
            return 'Missing username';
        case Errors.userNotRegistered:
            return 'User not online';
        default:
            return error;
    }
}
