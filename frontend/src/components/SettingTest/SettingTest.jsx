import { AddictionButton } from "../AddictionSetting/AddictionButton";
import { AddictionSetting } from "../AddictionSetting/AddictionFields";
import "./Setting.css";

function SettingTest() {
    return (
        <div className="setting">
            <div style={{ display: "flex" }}>
                <div ><AddictionButton ><i className="fas fa-fw fa-clock"></i> time</AddictionButton></div>
                <div ><AddictionButton ><i className="fas fa-fw fa-quote-left"></i>quote</AddictionButton></div>
                <div ><AddictionButton ><i className="fas fa-fw fa-wrench"></i>custom</AddictionButton></div  >
            </div>
            <div style={{ display: "flex", wordSpacing: "10px" }}>
                <div><AddictionSetting>sdfasdfa</AddictionSetting></div>
                <div><AddictionSetting>sdfasdfa</AddictionSetting></div>
                <div><AddictionSetting>sdfasdfa</AddictionSetting></div>
                <div><AddictionSetting>sdfasdfa</AddictionSetting></div>
            </div>
        </div>
    )
}

export { SettingTest };