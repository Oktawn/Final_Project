import { Link } from 'react-router-dom';
import { ButtonTheme } from "../Theme/ButtonTheme";
import { SettingStore } from '../../State/useState';

export default function Header() {

    const auth = SettingStore((state) => state.isAuth);
    const changeAuth = SettingStore((state) => state.changeAuth);

    const logout = () => {
        changeAuth();
    }

    return (
        <header>
            <nav>
                <button><Link to="/main" title="Start Test">Start Test</Link></button>
                <button><Link to="/about" title="About">About</Link></button>
                {auth ? (
                    <>
                        <button><Link to="/account" title="Account">Account</Link></button>
                        <button onClick={logout}><Link to="/login" title="Logout">Logout</Link></button>
                    </>
                ) : (
                    <button><Link to="/login" title="Login">Login</Link></button>
                )}
                <ButtonTheme />
            </nav>
        </header>
    );
}