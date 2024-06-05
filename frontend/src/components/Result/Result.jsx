import React from 'react';

function Results({ speed, errors }) {
    return (
        <div className="results">
            <p>Speed: {speed} WPM</p>
            <p>Errors: {errors}</p>
        </div>
    );
};

export { Results };
