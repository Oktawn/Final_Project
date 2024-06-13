import { useContext } from "react"
import { ThemeContext } from "./ThemeProvider"

export function ButtonTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <button onClick={toggleTheme}>
            <i className='fa fa-adjust'></i> {theme ? 'Light Theme' : 'Dark Theme'}
        </button>

    )
}