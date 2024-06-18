import { createContext } from 'react';
import { ThemeStore } from '../../State/useState';

const ThemeContext = createContext(false);

function ThemeProvider({ children }) {

    const theme = ThemeStore((state) => state.getTheme());
    const changeTheme = ThemeStore((state) => state.changeTheme);

    document.querySelector(':root').setAttribute('data-theme', theme ? 'darkTheme' : 'lightTheme');

    const toggleTheme = () => {
        changeTheme();
        document.querySelector(':root').setAttribute('data-theme', theme ? 'darkTheme' : 'lightTheme');

    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );

}

export { ThemeContext, ThemeProvider };