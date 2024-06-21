import { useState, useEffect } from "react";
import { Keyboard } from "../Keyboard/Keyboard";
import { useNavigate } from "react-router-dom";

const textList = [
    "Я часто думаю о том, что хотел бы жить у моря. Никогда ранее бы и не подумал, что это место может быть таким привлекательным. Причем не только из-за бурления волн, которые иногда словно ураган разбиваются раскатом об аккуратно выложенный природой берег, но и из-за исключительно красивого заката. Такой восхитительный закат, кажется, так давно не приветствовал меня в городе.",
    "Каждое утро я встаю с первыми лучами солнца, чтобы насладиться тишиной и спокойствием. Пение птиц и легкий ветерок создают особую атмосферу, которую сложно описать словами.",
    "С приходом осени природа начинает играть новыми красками. Листья на деревьях меняют цвет и падают на землю, образуя мягкий ковер. Это время года всегда навевает на меня легкую грусть и ностальгию.",
    "Быстрый набор."
];

function getRandomText(texts) {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

function Display() {
    const [words, setWords] = useState({ correct: 0, incorrect: 0 });
    const [wpm, setWpm] = useState(null);
    const [randomText, setRandomText] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();
    const textWords = randomText.split(' ');
    const wordsShow = 30;


    useEffect(() => {
        setRandomText(getRandomText(textList));
        setWpm(Date.now())
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
                    setRandomText(getRandomText(textList));
                    setCurrentWordIndex(0);
                    setUserInput('');
                    setWords({ correct: 0, incorrect: 0 });
                }}>
                    <i className='fa fa-refresh'></i>
                </button>
            </p>
        </div>
    );
};

export { Display };
