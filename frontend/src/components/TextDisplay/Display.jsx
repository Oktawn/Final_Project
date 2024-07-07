import { useState, useEffect } from "react";
import { Keyboard } from "../Keyboard/Keyboard";
import { useNavigate } from "react-router-dom";
import { testsStore } from '../../State/useState';


function Display() {
    const updateTests = testsStore((state) => state.setText);
    const textTest = testsStore((state) => state.text);
    const [words, setWords] = useState({ correct: 0, incorrect: 0 });
    const [wpm, setWpm] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();
    const [textWords, setTextWords] = useState(textTest.split(' '));

    useEffect(() => {
        if (textTest.length === 0) {
            updateTests();
        } else {
            setWpm(Date.now());
            setTextWords(textTest.split(' '));
        }
    }, [textTest]);

    const handleInputChange = (value) => {
        setUserInput(value);

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
                const timeElapsedInMinutes = (endTime - wpm) / 60000;
                const calculatedWpm = ((words.correct + 1) / timeElapsedInMinutes).toFixed(2);
                const calculatedWpmRaw = ((words.correct + words.incorrect + 1) / timeElapsedInMinutes).toFixed(2);
                navigate('/results', { state: { wpm: calculatedWpm, rawWpm: calculatedWpmRaw } });
            }
        } else {
            setCurrentCharIndex(value.length);
        }
    };


    return (
        <div className="text-display">
            <div>
                {textWords.map((word, wordIndex) => (
                    <span key={wordIndex}>
                        {word.split('').map((char, charIndex) => (
                            <span key={charIndex}>
                                {wordIndex === currentWordIndex && charIndex === currentCharIndex && <span className="cursor">|</span>}
                                <span className={wordIndex === currentWordIndex && charIndex === currentCharIndex ? 'current-char' : wordIndex <= currentWordIndex && charIndex < currentCharIndex ? "after-char" : ''}>
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
                <button onClick={() => {
                    updateTests();
                    setCurrentWordIndex(0);
                    setUserInput('');
                    setWords({ correct: 0, incorrect: 0 });
                    setWpm(0);
                    setTextWords(textTest.split(' '));
                }}>
                    <i className='fa fa-refresh'></i>
                </button>
            </p>
        </div>
    );
};

export { Display };
