import React, { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { ChatContext } from './ChatContext';
import InputWithSubmit from './InputWithSubmit';

const Landing: FC = () => {
    const [error, setError] = useState('');
    const { register, connected } = useContext(ChatContext);

    const submit = async (username: string) => {
        if (username.length > 0) {
            const { success } = await register(username);

            if (!success) {
                setError(`Username ${username} already in use`);
            }
        }
    };

    return (
        <Container>
            {!connected && <NoConnection>No connection</NoConnection>}
            <InputWithSubmit disabled={!connected} submit={submit} placeholder="Whats your name?" />
            {error.length > 0 && <Error>{error}</Error>}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 100vh;
`;

const Error = styled.span`
    display: block;
    margin-top: 10px;
    font-style: italic;
    font-size: 14;
    color: palevioletred;
`;

const NoConnection = styled.h4`
    color: ${({ theme }) => theme.colors.darkFont};
`;

export default Landing;
