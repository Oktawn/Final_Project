import { createContext } from 'react';
import useLocalStorage from 'use-local-storage';

const ThemeContext = createContext(false);

function ThemeProvider({ children }) {

    const [theme, setTheme] = useLocalStorage(false);
    document.querySelector(':root').setAttribute('data-theme', theme ? 'darkTheme' : 'lightTheme');

    const toggleTheme = () => {
        setTheme(prevTheme => !prevTheme);
        document.querySelector(':root').setAttribute('data-theme', theme ? 'darkTheme' : 'lightTheme');

    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );

}

export { ThemeContext, ThemeProvider };