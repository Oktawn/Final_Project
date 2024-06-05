import React, { useState, useEffect } from 'react';

export function Input({ onTextChange, onStartTyping }) {
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (inputText.length === 0) {
                onStartTyping();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputText, onStartTyping]);

    const handleChange = (e) => {
        setInputText(e.target.value);
        onTextChange(e.target.value);
    };

    return (
        <input
            type="text"
            value={inputText}
            onChange={handleChange}
            className="typing-input"
            autoFocus
        />
    );
};

