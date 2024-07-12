import { useState, useEffect } from "react";
import { Keyboard } from "../Keyboard/Keyboard";
import { useNavigate } from "react-router-dom";
import { testsStore } from '../../State/useState';
import { useCookies } from "react-cookie";

function Display() {
    const updateTests = testsStore((state) => state.setText);
    const textTest = testsStore((state) => state.text);
    const fetchTest = testsStore((state) => state.fetchTest);
    const mode = testsStore((state) => state.mode);
    const [words, setWords] = useState({ correct: 0, incorrect: 0 });
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();
    const [textWords, setTextWords] = useState(textTest.split(' '));
    const [startTime, setStartTime] = useState(0);
    const [wpmData, setWpmData] = useState([{ time: 0, wpm: "0", rawWpm: "0" }]);
    const [isTestStarted, setIsTestStarted] = useState(false);
    const [cookies] = useCookies(["user"]);
    const user = cookies.user;
    const [timeLeft, setTimeLeft] = useState(null);



    useEffect(() => {
        if (textTest.length === 0) {
            updateTests();
        } else {
            setTextWords(textTest.split(' '));
            if (mode.mode === "time")
                setTimeLeft(parseInt(mode.size));
            else
                setTimeLeft(null);
        }
    }, [textTest]);


    useEffect(() => {
        let timer;
        if (isTestStarted) {
            timer = setInterval(() => {
                if (timeLeft) setTimeLeft((prevTime) => prevTime - 1);
                const endTime = Date.now();
                const timeElapsedInMinutes = (endTime - startTime) / 60000;
                const calculatedWpm = ((words.correct + 1) / timeElapsedInMinutes).toFixed(2);
                const calculatedWpmRaw = ((words.correct + words.incorrect + 1) / timeElapsedInMinutes).toFixed(2);
                setWpmData((prevWpmData) => [...prevWpmData, { time: timeElapsedInMinutes, wpm: calculatedWpm, rawWpm: calculatedWpmRaw }]);
            }, 1000);
        }

        if (timeLeft === 0) {
            clearInterval(timer);
            const endTime = Date.now();
            const timeElapsedInMinutes = (endTime - startTime) / 60000;
            const calculatedWpm = ((words.correct + 1) / timeElapsedInMinutes).toFixed(2);
            const calculatedWpmRaw = ((words.correct + words.incorrect + 1) / timeElapsedInMinutes).toFixed(2);
            const acc = calculatedWpm / calculatedWpmRaw * 100;
            const data = { wpm: calculatedWpm, raw: calculatedWpmRaw, acc: acc };
            fetchTest(user, data, true);
            navigate('/results', { state: { wpmData: wpmData, totalWpm: calculatedWpm, totalRawWpm: calculatedWpmRaw } });
        }

        return () => clearInterval(timer);
    }, [isTestStarted, words, startTime, timeLeft]);

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
                const acc = calculatedWpm / calculatedWpmRaw * 100;
                const data = { wpm: calculatedWpm, raw: calculatedWpmRaw, acc: acc };
                fetchTest(user, data, true);
                navigate('/results', { state: { wpmData: wpmData, totalWpm: calculatedWpm, totalRawWpm: calculatedWpmRaw, acc: acc } });
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
        setWpmData([{ time: 0, wpm: "0", rawWpm: "0" }]);
        setTextWords(textTest.split(' '));
        if (isTestStarted)
            fetchTest(user, 0, false);
    };

    return (
        <div>
            <div className="text-display">
                <div>{timeLeft} </div>
                <div>
                    {textWords.map((word, wordIndex) => (
                        <span key={wordIndex}
                            className={wordIndex < currentWordIndex && word !== textWords[wordIndex] ? "incorrect-word" : ""}>
                            {word.split('').map((char, charIndex) => (
                                <span key={charIndex}>
                                    {wordIndex === currentWordIndex && charIndex === currentCharIndex && (
                                        <span className="cursor"></span>
                                    )}
                                    <span className={
                                        wordIndex < currentWordIndex ?
                                            (word[charIndex] !== textWords[wordIndex][charIndex] ? "incorrect-char" : "correct-char") :
                                            wordIndex === currentWordIndex ?
                                                (charIndex < userInput.length ?
                                                    (char !== userInput[charIndex] ? "incorrect-char" : "correct-char") :
                                                    ""
                                                ) :
                                                ""
                                    }>
                                        {char}
                                    </span>
                                </span>
                            ))}
                            {wordIndex === currentWordIndex && currentCharIndex === word.length && <span className="cursor"></span>}
                            {wordIndex < textWords.length - 1 && ' '}
                        </span>
                    ))}
                </div>
                <Keyboard userInput={userInput} onInputChange={handleInputChange} />
                <p style={{ textAlign: "center" }}>
                    <button onClick={resetTest}>
                        <i className='fa fa-refresh'></i>
                    </button>
                </p>
                {isTestStarted === false && <p style={{ textAlign: "center", fontSize: "20px" }}>
                    Tap on the display and start typing the word to run the test
                </p>}
            </div>
        </div>
    );
};

export { Display };
