import React, { useState, useEffect } from 'react';
import { Input } from '../components/Input/Input';
import { Display } from '../components/TextDisplay/Display';
import { Results } from '../components/Result/Result';

function Main() {
    const [text, setText] = useState('Type this text to test your typing speed.');
    const [input, setInput] = useState('');
    const [speed, setSpeed] = useState(0);
    const [errors, setErrors] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isTestActive, setIsTestActive] = useState(false);

    const handleTextChange = (inputText) => {
        setInput(inputText);
        if (inputText === text) {
            const endTime = new Date();
            const timeTaken = (endTime - startTime) / 1000 / 60; // Время в минутах
            const wordsTyped = text.split(' ').length;
            setSpeed((wordsTyped / timeTaken).toFixed(2)); // Скорость в словах в минуту (WPM)

            const errorCount = text.split('').reduce((count, char, idx) => {
                return count + (char !== input[idx] ? 1 : 0);
            }, 0);
            setErrors(errorCount);

            setIsTestActive(false);
        }
    };

    const handleStartTyping = () => {
        if (!isTestActive) {
            setStartTime(new Date());
            setIsTestActive(true);
        }
    };


    return (
        <div className="App">
            {isTestActive && <Display text={text} input={input} />}
            <Input onTextChange={handleTextChange} onStartTyping={handleStartTyping} />
            {!isTestActive && speed > 0 && <Results speed={speed} errors={errors} />}
        </div>
    );
}

export default Main;