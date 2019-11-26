import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { ChatContext } from './ChatContext';
import InputWithSubmit from './InputWithSubmit';

const Landing: FC = () => {
    const { register, connected, error, setError } = useContext(ChatContext);

    const handleChange = () => setError(null);

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
            <InputWithSubmit
                onChange={handleChange}
                disabled={!connected}
                submit={submit}
                placeholder="Whats your name?"
            />
            {!!error && <Error>{error}</Error>}
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

export default Landing;
