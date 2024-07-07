import { Link } from 'react-router-dom';
import { ButtonTheme } from "../Theme/ButtonTheme";

export default function Header() {
    return (
        <header>
            <nav>
                <button><Link to="/main" title="Start Test">Start Test</Link></button>
                <button><Link to="/about" title="About">About</Link></button>
                <button><Link to="/account" title="Account">Account</Link></button>
                <button><Link to="/login" title="Logout">Logout</Link></button>
                <ButtonTheme />
            </nav>
        </header>
    );
}