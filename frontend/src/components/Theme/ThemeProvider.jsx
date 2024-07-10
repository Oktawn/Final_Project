import { createContext } from 'react';
import { SettingStore } from '../../State/useState';

const ThemeContext = createContext(false);

function ThemeProvider({ children }) {

    const theme = SettingStore((state) => state.getTheme());
    const changeTheme = SettingStore((state) => state.changeTheme);

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