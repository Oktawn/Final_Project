import React, { useState, useEffect } from 'react';

const TypingGame = () => {
    const [text, setText] = useState('Пример текста для набора');
    const [userInput, setUserInput] = useState('');

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const renderText = () => {
        return text.split('').map((char, index) => {
            let className = 'pending';
            if (index < userInput.length) {
                className = char === userInput[index] ? 'correct' : 'incorrect';
            }
            return (
                <span key={index} className={className}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div className="typing-game">
            <div className="text-container">
                <div className="sample-text">{renderText()}</div>
                <div className="user-text">{userInput}</div>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    className="user-input"
                    autoFocus
                />
            </div>
        </div>
    );
};

export default TypingGame;