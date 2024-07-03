import { useState, useEffect } from "react";
import { Keyboard } from "../Keyboard/Keyboard";
import { useNavigate } from "react-router-dom";
import { testsStore } from '../../State/useState';


function Display() {
    const tests = testsStore((state) => state.getText);
    const updateTests = testsStore((state) => state.setText);
    const [words, setWords] = useState({ correct: 0, incorrect: 0 });
    const [wpm, setWpm] = useState(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();
    const [textWords, setTextWords] = useState("".split(' '));
    const wordsShow = 30;


    useEffect(() => {
        updateTests();
        setWpm(Date.now());
        console.log(tests());
        setTextWords(tests().split(' '));
    }, []);

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
                setUserInput('');
            } else {
                const endTime = Date.now();
                const timeElapsedInMinutes = (endTime - wpm) / 60000;
                const calculatedWpm = ((words.correct + 1) / timeElapsedInMinutes).toFixed(2);
                const calculatedWpmRaw = ((words.correct + words.incorrect + 1) / timeElapsedInMinutes).toFixed(2);
                navigate('/results', { state: { correct: words.correct + 1, incorrect: words.incorrect, wpm: calculatedWpm, rawWpm: calculatedWpmRaw } });
            }
        }
    };



    return (
        <div className="text-display">
            <div>
                {textWords.map((word, index) => (
                    <span key={index} className={index === currentWordIndex ? 'highlight' : ''}>
                        {word + " "}
                    </span>
                ))}
            </div>
            <Keyboard userInput={userInput} onInputChange={handleInputChange} />
            <p>
                <button onClick={() => {
                    setCurrentWordIndex(0);
                    setUserInput('');
                    setWords({ correct: 0, incorrect: 0 });
                    setWpm(0);
                    updateTests();
                    setTextWords(tests().split(' '));
                }}>
                    <i className='fa fa-refresh'></i>
                </button>
            </p>
        </div>
    );
};

export { Display };
