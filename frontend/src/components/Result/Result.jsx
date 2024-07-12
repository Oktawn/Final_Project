import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LineCharts } from './LineChats';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    if (location.state === null) {
        navigate('/');
        return null;
    }
    const { wpmData, totalWpm, totalRawWpm, acc } = location.state;


    return (
        <div className="App">
            <h2>Results</h2>
            <div>
                <p className="about-p" style={{ textAlign: 'center' }}>WPM: {totalWpm}</p>
                <p className="about-p" style={{ textAlign: 'center' }}> Raw WPM: {totalRawWpm}</p>
                <p className="about-p" style={{ textAlign: 'center' }}>Accuracy: {acc.toFixed(2)}%</p>
            </div>
            <LineCharts wpmData={wpmData} />
        </div>
    );
};

export { Results };
