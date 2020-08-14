import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {light, dark} from '../shared/constants';

export const UserDetailsContext = React.createContext(null);

export const ThemeContext = React.createContext('light');

export const ThemeProvider = React.memo(({children}) => {
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [constants, setContants] = React.useState(darkTheme ? dark : light);

  const getData = (value) => {
    if (value === 'dark') {
      setDarkTheme(true);
      setContants(dark);
    } else if (value === 'light') {
      setDarkTheme(false);
      setContants(light);
    }
  };

  const setData = async (value) => {
    try {
      await AsyncStorage.setItem('theme', value);
    } catch (err) {}
  };

  const toggleTheme = () => {
    if (darkTheme === false) {
      setData('dark').then(() => {
        getData('dark');
      });
    } else {
      setData('light').then(() => {
        getData('light');
      });
    }
  };

  return (
    <ThemeContext.Provider value={{constants, darkTheme, toggleTheme, getData}}>
      {children}
    </ThemeContext.Provider>
  );
});
