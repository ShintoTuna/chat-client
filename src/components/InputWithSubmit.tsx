import React, { FC, useState } from 'react';

interface Props {
    submit: (str: string) => void;
    placeholder: string;
}

const InputWithSubmit: FC<Props> = ({ submit, placeholder }) => {
    const [value, setValue] = useState('');

    const submitValue = () => {
        if (value.length > 0) {
            submit(value);
            setValue('');
        }
    };

    return (
        <div className="input-with-submit">
            <input
                className="input-field"
                placeholder={placeholder}
                value={value}
                onChange={({ target }) => setValue(target.value)}
                onKeyDown={({ keyCode }) => keyCode === 13 && submitValue()}
            />
            <button className="input-submit" onClick={submitValue}>
                ➔
            </button>
        </div>
    );
};

export default InputWithSubmit;
