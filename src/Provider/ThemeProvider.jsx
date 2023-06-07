import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
};

return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
);
};

export { ThemeContext, ThemeProvider };