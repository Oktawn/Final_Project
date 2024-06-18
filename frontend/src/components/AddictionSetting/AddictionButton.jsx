import React from 'react';

function AddictionButton({ onClick, children }) {
    return (
        <button className='setting-button' onClick={onClick}>
            {children}
        </button>
    );
}

export { AddictionButton };
