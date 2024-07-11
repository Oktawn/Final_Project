import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
function LineCharts({ wpmData }) {
    const getCSSVariable = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    const wpmColor = getCSSVariable('--main-color');
    const rawWpmColor = getCSSVariable('--caret-color');

    const data = {
        labels: wpmData.map(dataPoint => dataPoint.time.toFixed(2)),
        datasets: [
            {
                label: 'WPM',
                data: wpmData.map(dataPoint => dataPoint.wpm),
                borderColor: wpmColor,
                fill: true,
                tension: 0.4

            },
            {
                label: 'Raw WPM',
                data: wpmData.map(dataPoint => dataPoint.rawWpm),
                borderColor: rawWpmColor,
                fill: true,
                tension: 0.4
            }
        ]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (minutes)'
                }
            },
            y: {
                beginZero: true,
                title: {
                    display: true,
                    text: 'Words per Minute'
                }
            }
        }
    };

    return (
        <div className='chart-container'>
            <Line data={data} options={options} />
        </div>
    )

}

export { LineCharts };