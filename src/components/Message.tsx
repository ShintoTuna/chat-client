import React, { FC } from 'react';
import styled from 'styled-components';
import { Message as MessageType } from '../types';
import { toHue } from '../utils';

interface Props {
    message: MessageType;
}

const Message: FC<Props> = ({ message: { message, username } }) => (
    <Container>
        <Avatar name={username}>{username.slice(0, 2).toUpperCase()}</Avatar>
        <Body>
            <Name>{username}</Name>
            <MessageText dangerouslySetInnerHTML={{ __html: message }} />
        </Body>
    </Container>
);

const Container = styled.div`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkFont};
    padding: 20px;
`;

const Avatar = styled.div<{ name: string }>`
    background-color: hsl(${({ name }) => toHue(name)}, 30%, 80%);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.lightFont};
    margin-right: 20px;
    text-shadow: 2px 2px ${({ theme }) => theme.colors.darkFont};
`;

const Body = styled.div`
    flex: 1;
`;

const Name = styled.div`
    padding: 4px 0;
    color: ${({ theme }) => theme.colors.darkFont};
`;

const MessageText = styled.div`
    color: ${({ theme }) => theme.colors.lightFont};
`;

export default Message;
