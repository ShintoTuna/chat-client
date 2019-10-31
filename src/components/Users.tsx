import React, { FC } from 'react';
import styled from 'styled-components';
import { toHue } from '../utils';

interface Props {
    users: string[];
}

const Users: FC<Props> = ({ users }) => (
    <UsersContainer>
        <Title>Online</Title>
        <UsersBlock>
            {users.map((user, i) => (
                <User key={i} name={user}>
                    {user}
                </User>
            ))}
        </UsersBlock>
    </UsersContainer>
);

const UsersContainer = styled.div`
    position: absolute;
    padding: 15px 20px;
    top: 0;
    right: 0;
    left: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightBg};
    box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h4`
    color: ${({ theme }) => theme.colors.darkFont};
    margin: 0;
    padding-bottom: 8px;
`;

const UsersBlock = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const User = styled.li<{ name: string }>`
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.darkest};
    padding: 4px 8px;
    margin-right: 4px;
    border-radius: 3px;
    color: hsl(${({ name }) => toHue(name)}, 50%, 80%);
`;

export default Users;
