import React, { useRef, useEffect, useState } from 'react';


function Keyboard({ userInput, onInputChange }) {
    const inputRef = useRef(null);
    const [inputText, setInputText] = useState(userInput);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

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
                value={inputText}
                onInput={handleInput}
                placeholder='Type here...'>
            </input>
        </div>
    );
}

export { Keyboard };
