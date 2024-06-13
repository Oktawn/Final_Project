import { ButtonTheme } from "../Theme/ButtonTheme";

export function Header() {
    return (
        <header>
            <nav>
                <button title="Start Test"><a href="/main" > Start Test</a></button>
                <button title="About"> <a href="/about" > About</a></button>
                <button title="Account"> <a href="/account"  > Account</a></button>
                <button title="Logout"> <a href="/login" > Logout</a></button>
                <ButtonTheme />
            </nav>
        </header>
    )
}

