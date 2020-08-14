import React from 'react';
import {light, dark} from '../shared/constants';

export const UserDetailsContext = React.createContext(null);

export const ThemeContext = React.createContext('light');

export const ThemeProvider = React.memo(({children}) => {
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [constants, setContants] = React.useState(light);

  const toggleTheme = () => {
    if (darkTheme === false) {
      setDarkTheme(true);
      setContants(dark);
    } else {
      setDarkTheme(false);
      setContants(light);
    }
  };

  return (
    <ThemeContext.Provider value={{constants, darkTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
});
