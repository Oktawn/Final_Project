import React, { useState } from 'react';
import { AddictionButton } from "../AddictionSetting/AddictionButton";
import { testsStore } from '../../State/useState';

function SettingTest() {

    const [selectedField, setSelectedField] = useState("quote");
    const { setMode } = testsStore((state) => ({ setMode: state.setMode }));
    const updateTests = testsStore((state) => state.setText);


    const handleButtonMode = (field) => {
        setSelectedField(field);
        updateTests();
    };

    const handleButtonOption = (option) => {
        setMode({ mode: selectedField, size: option });
        updateTests();
    };

    return (
        <div className="setting">
            <div style={{ display: "flex" }}>
                <div><AddictionButton onClick={() => handleButtonMode('time')}><i className="fas fa-fw fa-clock"></i> time</AddictionButton></div>
                <div><AddictionButton onClick={() => handleButtonMode('quote')}><i className="fas fa-fw fa-quote-left"></i> quote</AddictionButton></div>
            </div>
            <div style={{ display: "flex", wordSpacing: "10px" }}>
                {selectedField === 'time' && (
                    <div>
                        <AddictionButton onClick={() => handleButtonOption(30)}>30 sec</AddictionButton>
                        <AddictionButton onClick={() => handleButtonOption(60)}>60 sec</AddictionButton>
                        <AddictionButton onClick={() => handleButtonOption(120)}>120 sec</AddictionButton>
                        <AddictionButton onClick={() => handleButtonOption(180)}>180 sec</AddictionButton>
                    </div>
                )}
                {selectedField === 'quote' && (
                    <div>
                        <AddictionButton onClick={() => handleButtonOption('short')}>short</AddictionButton>
                        <AddictionButton onClick={() => handleButtonOption('medium')}>medium</AddictionButton>
                        <AddictionButton onClick={() => handleButtonOption('long')}>long</AddictionButton>
                        <AddictionButton onClick={() => handleButtonOption('epic')}>epic</AddictionButton>
                    </div>
                )}
            </div>
        </div>
    )
}

export { SettingTest };
