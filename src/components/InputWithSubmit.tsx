import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

interface Props {
    submit: (str: string) => void;
    placeholder: string;
    disabled?: boolean;
}

const InputWithSubmit: FC<Props> = ({ submit, placeholder, disabled = false }) => {
    const [value, setValue] = useState('');

    const submitValue = () => {
        if (value.length > 0) {
            submit(value);
            setValue('');
        }
    };

    return (
        <InputContainer>
            <Input
                disabled={disabled}
                placeholder={placeholder}
                value={value}
                onChange={({ target }) => setValue(target.value)}
                onKeyDown={({ keyCode }) => keyCode === 13 && submitValue()}
            />
            <Button disabled={disabled} onClick={submitValue} />
        </InputContainer>
    );
};

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const disabled = css`
    :disabled {
        cursor: not-allowed;
    }
`;

const Input = styled.input`
    flex: 1;
    display: inline-block;
    padding: 10px 15px;
    font-size: 18px;
    border: none;
    border-radius: 5px 0 0 5px;
    background-color: ${({ theme }) => theme.colors.lightBg};
    color: ${({ theme }) => theme.colors.lightFont};
    &::placeholder {
        color: ${({ theme }) => theme.colors.darkFont};
    }
    ${disabled}
`;

const Button = styled.button`
    border: none;
    border-radius: 0 5px 5px 0;
    background-color: ${({ theme }) => theme.colors.lightBg};
    font-size: 20px;
    padding: 15px;
    color: ${({ theme }) => theme.colors.darkFont};
    cursor: pointer;
    &::after {
        content: '➔';
    }
    ${disabled}
`;

export default InputWithSubmit;
