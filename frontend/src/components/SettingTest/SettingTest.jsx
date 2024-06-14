import React, { useState } from 'react';
import { AddictionButton } from "../AddictionSetting/AddictionButton";
import { AddictionSetting } from "../AddictionSetting/AddictionFields";
import "./Setting.css";

function SettingTest() {
    const [selectedField, setSelectedField] = useState(null);

    const handleButtonClick = (field) => {
        setSelectedField(field);
    };

    return (
        <div className="setting">
            <div style={{ display: "flex" }}>
                <div><AddictionButton onClick={() => handleButtonClick('time')}><i className="fas fa-fw fa-clock"></i> time</AddictionButton></div>
                <div><AddictionButton onClick={() => handleButtonClick('quote')}><i className="fas fa-fw fa-quote-left"></i> quote</AddictionButton></div>
                <div><AddictionButton onClick={() => handleButtonClick('custom')}><i className="fas fa-fw fa-wrench"></i> custom</AddictionButton></div>
            </div>
            <div style={{ display: "flex", wordSpacing: "10px" }}>
                {selectedField === 'time' && <div><AddictionSetting>sss</AddictionSetting></div>}
                {selectedField === 'quote' && <div><AddictionSetting>eee</AddictionSetting></div>}
                {selectedField === 'custom' && <div><AddictionSetting>fff</AddictionSetting></div>}
            </div>
        </div>
    )
}

export { SettingTest };
