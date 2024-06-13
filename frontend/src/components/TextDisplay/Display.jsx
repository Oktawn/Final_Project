import { useState, useEffect } from "react";
import { Keyboard } from "../Keyboard/Keyboard";
import { SettingTest } from "../SettingTest/SettingTest";
import './Display.css';
// import { Text } from "../Text/Text";

const textList = [
    "Я часто думаю о том, что хотел бы жить у моря. Никогда ранее бы и не подумал, что это место может быть таким привлекательным. Причем не только из-за бурления волн, которые иногда словно ураган разбиваются раскатом об аккуратно выложенный природой берег, но и из-за исключительно красивого заката. Такой восхитительный закат, кажется, так давно не приветствовал меня в городе.",
    "Каждое утро я встаю с первыми лучами солнца, чтобы насладиться тишиной и спокойствием. Пение птиц и легкий ветерок создают особую атмосферу, которую сложно описать словами.",
    "С приходом осени природа начинает играть новыми красками. Листья на деревьях меняют цвет и падают на землю, образуя мягкий ковер. Это время года всегда навевает на меня легкую грусть и ностальгию."
];

function getRandomText(texts) {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

function Display() {
    const [words, setWords] = useState({ correct: 0, incorrect: 0 });
    const [wpm, setWpm] = useState(0);
    const [randomText, setRandomText] = useState('');
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        setRandomText(getRandomText(textList));
    }, []);

    const handleInputChange = (value) => {
        setUserInput(value);

        const textWords = randomText.split(' ');
        const inputWords = value.trim().split(' ');

        let correct = 0;
        let incorrect = 0;

        inputWords.forEach((word, index) => {
            if (word === textWords[index]) {
                correct += 1;
            } else {
                incorrect += 1;
            }
        });

        setWords({ correct, incorrect });
    };

    const handleResults = (calculatedWpm) => {
        setWpm(calculatedWpm);
    };

    return (
        <div className="text-display">
            <SettingTest />
            <div>{randomText}</div>
            <Keyboard userInput={userInput} onInputChange={handleInputChange} />
            <p>
                <button onClick={() => setRandomText(getRandomText(textList))}>
                    <i className='fa fa-refresh'></i>
                </button>
            </p>
            <div>
                <p>Correct words: {words.correct}</p>
                <p>Incorrect words: {words.incorrect}</p>
                <p>WPM: {wpm}</p>
            </div>
        </div>
    );
};

export { Display };
