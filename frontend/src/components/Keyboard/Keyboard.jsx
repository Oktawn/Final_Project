import React, { useRef, useEffect, useState } from 'react';

function Keyboard({ userInput, onInputChange }) {
    const inputRef = useRef(null);
    const [inputText, setInputText] = useState(userInput);

    useEffect(() => {
        const handleClick = () => {
            inputRef.current.focus();
        };
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [inputRef]);

    const handleInput = (e) => {
        const newValue = e.target.value;
        setInputText(newValue);
        onInputChange(newValue);
    };

    useEffect(() => {
        setInputText(userInput);
    }, [userInput]);

    return (
        <div>
            <input id='keyboard'
                ref={inputRef}
                className='typing-input'
                autoComplete='off'
                value={inputText}
                onInput={handleInput}
                placeholder='Type here...'>
            </input>
        </div>
    );
}

export { Keyboard };
