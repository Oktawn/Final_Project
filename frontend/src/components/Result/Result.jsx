import { useLocation } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const { correct, incorrect, wpm, rawWpm } = location.state;

    return (
        <div>
            <h1>Результаты Теста</h1>
            <p>Правильных слов: {correct}</p>
            <p>Неправильных слов: {incorrect}</p>
            <p>WPM: {wpm}</p>
            <p>raw WPM: {rawWpm}</p>
        </div>
    );
}

export default Results;
