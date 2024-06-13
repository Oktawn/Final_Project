import { useEffect, useState } from "react";


export function useTypingLogic() {
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [words, setWords] = useState([]);
    const [inputWords, setInputWords] = useState([]);
    const [incorrectIndices, setIncorrectIndices] = useState([]);

    const handleChange = (e) => {
        if (!startTime) {
            setStartTime(new Date());
        }
        const currentInput = e.target.value;
        setInput(currentInput);

        const currentInputWords = currentInput.trim().split(' ');
        setInputWords(currentInputWords);

        const incorrect = [];
        for (let i = 0; i < currentInputWords.length; i++) {
            if (currentInputWords[i] !== words[i]) {
                incorrect.push(i);
            }
        }
        setIncorrectIndices(incorrect);

        if (currentInput === words.join(' ')) {
            setEndTime(new Date());
        }
    };

    const calculateWPM = () => {
        const timeDiff = (endTime - startTime) / 1000 / 60; // в минутах
        const wordsTyped = words.length;
        return Math.round(wordsTyped / timeDiff);
    };

    return {
        input,
        handleChange,
        endTime,
        calculateWPM,
        incorrectIndices,
        words,
        setWords,
        inputWords,
    };
};