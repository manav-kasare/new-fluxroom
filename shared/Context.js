import React from "react";

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

export const ThemeContext = React.createContext("light");

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
