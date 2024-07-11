import { useEffect } from "react";
import { StatsStore } from "../../State/useState";
import moment from "moment";


function ResultTests({ id }) {

    const getResult = StatsStore((state) => state.getResult);
    const results = StatsStore((state) => state.result);

    useEffect(() => {
        getResult(id);
    }, []);
    return (
        <table className="table" >
            <thead>
                <tr>
                    <th>WPM</th>
                    <th>Raw WPM</th>
                    <th>Accuracy</th>
                    <th>Mode</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                        <td>{result.wpm.toFixed(2)}</td>
                        <td>{result.raw}</td>
                        <td>{result.accuracy.toFixed(2)}</td>
                        <td>{result.mode}</td>
                        <td>{moment(result.created_at).format('DD MMM YYYY HH:mm')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export { ResultTests };