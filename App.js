import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigator from './navigators/RootNavigator';
import {UserDetailsContext, ThemeProvider} from './shared/Context';

function App() {
  const [user, setUser] = React.useState(null);
  const userDetailsValue = React.useMemo(() => ({user, setUser}), [
    user,
    setUser,
  ]);

  return (
    <ThemeProvider>
      <UserDetailsContext.Provider value={userDetailsValue}>
        <PaperProvider>
          <RootNavigator />
        </PaperProvider>
      </UserDetailsContext.Provider>
    </ThemeProvider>
  );
}

export default App;
