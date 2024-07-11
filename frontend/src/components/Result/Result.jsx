import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LineCharts } from './LineChats';

const Results = () => {
    const location = useLocation();
    // console.log("log",location);
    const navigate = useNavigate();
    if (location.state === null) {
        <Link to="/nonexistentpage">Go error Page</Link>
        return null;
    }
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
