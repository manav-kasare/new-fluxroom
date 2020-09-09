import React, {useEffect} from 'react';

import {light, dark} from '../shared/constants';
import {storeTheme} from './AsyncStore';

export const UserDetailsContext = React.createContext(null);

export const TokenContext = React.createContext(null);

export const TokenContextProvider = React.memo(({children}) => {
  const [token, setToken] = React.useState(null);

  return (
    <TokenContext.Provider value={{token, setToken}}>
      {children}
    </TokenContext.Provider>
  );
});

export const ThemeContext = React.createContext('light');

export const ThemeProvider = React.memo(({children}) => {
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [constants, setContants] = React.useState(darkTheme ? dark : light);

  const setData = (value) => {
    if (value === 'dark') {
      setDarkTheme(true);
      setContants(dark);
    } else if (value === 'light') {
      setDarkTheme(false);
      setContants(light);
    }
  };

  const toggleTheme = () => {
    if (darkTheme === false) {
      storeTheme('dark').then(() => {
        setData('dark');
      });
    } else {
      storeTheme('light').then(() => {
        setData('light');
      });
    }
  };

  return (
    <ThemeContext.Provider value={{constants, darkTheme, toggleTheme, setData}}>
      {children}
    </ThemeContext.Provider>
  );
});
