import React, { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import styled, { css } from 'styled-components';

interface Props {
    submit: (str: string) => void;
    placeholder: string;
    disabled?: boolean;
    onChange?: (val?: string) => void;
}

const InputWithSubmit: FC<Props> = ({ submit, placeholder, disabled = false, onChange }) => {
    const [value, setValue] = useState('');

    const submitValue = () => {
        if (value.length > 0) {
            submit(value);
            setValue('');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);

        if (onChange) {
            onChange(event.target.value);
        }
    };

    const handleKeyDown = ({ keyCode }: KeyboardEvent<HTMLInputElement>) => keyCode === 13 && submitValue();

    return (
        <InputContainer>
            <Input
                disabled={disabled}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <Button disabled={disabled} onClick={submitValue} />
        </InputContainer>
    );
};

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const common = css`
    background-color: ${({ theme }) => theme.colors.lightBg};
    border: none;
    :disabled {
        cursor: not-allowed;
    }
`;

const Input = styled.input`
    flex: 1;
    display: inline-block;
    padding: 10px 15px;
    font-size: 18px;
    border-radius: 5px 0 0 5px;
    color: ${({ theme }) => theme.colors.lightFont};
    &::placeholder {
        color: ${({ theme }) => theme.colors.darkFont};
    }
    ${common}
`;

const Button = styled.button`
    border-radius: 0 5px 5px 0;
    font-size: 20px;
    padding: 15px;
    color: ${({ theme }) => theme.colors.darkFont};
    cursor: pointer;
    &::after {
        content: '➔';
    }
    ${common}
`;

export default InputWithSubmit;
