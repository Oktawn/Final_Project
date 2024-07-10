import React from 'react';
import { useLocation } from 'react-router-dom';
import { LineCharts } from './LineChats';

const Results = () => {
    const location = useLocation();
    const { wpmData, totalWpm, totalRawWpm } = location.state;

    return (
        <div>
            <h2>Results</h2>
            <div>
                <p>WPM: {totalWpm}</p>
                <p> Raw WPM: {totalRawWpm}</p>
            </div>
            <LineCharts wpmData={wpmData} />
        </div>
    );
};

export default Results;
