import React from 'react';

function AddictionButton({ onClick, children }) {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    );
}

export { AddictionButton };
