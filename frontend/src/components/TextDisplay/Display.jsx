import { useState, useEffect } from "react";
import { Keyboard } from "../Keyboard/Keyboard";
import { useNavigate } from "react-router-dom";
import { testsStore } from '../../State/useState';

function Display() {
    const updateTests = testsStore((state) => state.setText);
    const textTest = testsStore((state) => state.text);
    const [words, setWords] = useState({ correct: 0, incorrect: 0 });
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();
    const [textWords, setTextWords] = useState(textTest.split(' '));
    const [startTime, setStartTime] = useState(0);
    const [wpmData, setWpmData] = useState([{ time: 0, wpm: "0", rawWpm: "0" }]);
    const [isTestStarted, setIsTestStarted] = useState(false);


    useEffect(() => {
        if (textTest.length === 0) {
            updateTests();
        } else {
            setTextWords(textTest.split(' '));
        }
    }, [textTest]);


    useEffect(() => {
        if (isTestStarted) {
            const timer = setInterval(() => {
                const endTime = Date.now();
                const timeElapsedInMinutes = (endTime - startTime) / 60000;
                const calculatedWpm = ((words.correct + 1) / timeElapsedInMinutes).toFixed(2);
                const calculatedWpmRaw = ((words.correct + words.incorrect + 1) / timeElapsedInMinutes).toFixed(2);
                setWpmData((prevWpmData) => [...prevWpmData, { time: timeElapsedInMinutes, wpm: calculatedWpm, rawWpm: calculatedWpmRaw }]);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isTestStarted, words, startTime]);

    const handleInputChange = (value) => {
        setUserInput(value);

        if (!isTestStarted) {
            setIsTestStarted(true);
            setStartTime(Date.now());
        }

        if (value.endsWith(' ') || (currentWordIndex === textWords.length - 1 && value.trim() === textWords[currentWordIndex])) {
            const cleanedValue = value.trim();

            if (cleanedValue === textWords[currentWordIndex]) {
                setWords((prevWords) => ({ correct: prevWords.correct + 1, incorrect: prevWords.incorrect }));
            } else {
                setWords((prevWords) => ({ correct: prevWords.correct, incorrect: prevWords.incorrect + 1 }));
            }

            const nextIndex = currentWordIndex + 1;
            if (nextIndex < textWords.length) {
                setCurrentWordIndex(nextIndex);
                setCurrentCharIndex(0);
                setUserInput('');
            } else {
                const endTime = Date.now();
                const timeElapsedInMinutes = (endTime - startTime) / 60000;
                const calculatedWpm = ((words.correct + 1) / timeElapsedInMinutes).toFixed(2);
                const calculatedWpmRaw = ((words.correct + words.incorrect + 1) / timeElapsedInMinutes).toFixed(2);
                navigate('/results', { state: { wpmData: wpmData, totalWpm: calculatedWpm, totalRawWpm: calculatedWpmRaw } });
            }
        } else {
            setCurrentCharIndex(value.length);
        }
    };

    const resetTest = () => {
        setIsTestStarted(false);
        updateTests();
        setCurrentWordIndex(0);
        setCurrentCharIndex(0);
        setUserInput('');
        setWords({ correct: 0, incorrect: 0 });
        setWpmData([]);
        setTextWords(textTest.split(' '));
    };

    return (
        <div className="text-display">
            <div>
                {textWords.map((word, wordIndex) => (
                    <span key={wordIndex}>
                        {word.split('').map((char, charIndex) => (
                            <span key={charIndex}>
                                {wordIndex === currentWordIndex && charIndex === currentCharIndex && <span className="cursor">|</span>}
                                <span className={wordIndex === currentWordIndex && charIndex === currentCharIndex ? 'current-char' : wordIndex <= currentWordIndex && (charIndex < currentCharIndex) ? "after-char" : ''}>
                                    {char}
                                </span>
                            </span>
                        ))}
                        {wordIndex === currentWordIndex && currentCharIndex === word.length && <span className="cursor">|</span>}
                        {wordIndex < textWords.length - 1 && ' '}
                    </span>
                ))}
            </div>
            <Keyboard userInput={userInput} onInputChange={handleInputChange} />
            <p>
                <button onClick={resetTest}>
                    <i className='fa fa-refresh'></i>
                </button>
            </p>
        </div>
    );
};

export { Display };
