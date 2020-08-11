import React from 'react';
import {light, dark} from '../shared/constants';
import {constant} from 'lodash';

export const IsSignedInContext = React.createContext(false);

export const UserDetailsContext = React.createContext({
  id: null,
  username: null,
  description: null,
  profile_photo: null,
  email: null,
  friends: null,
  requests: null,
});

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
