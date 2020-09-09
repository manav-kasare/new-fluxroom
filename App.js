import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-fast-toast';

import RootNavigator from './navigators/RootNavigator';
import {
  UserDetailsContext,
  ThemeProvider,
  TokenContextProvider,
} from './shared/Context';

function App() {
  const [user, setUser] = React.useState(null);
  const userDetailsValue = React.useMemo(() => ({user, setUser}), [
    user,
    setUser,
  ]);

  const toast = React.useRef(null);

  React.useEffect(() => {
    // Here
    global['toast'] = toast.current;
  }, []);

  return (
    <>
      <TokenContextProvider>
        <ThemeProvider>
          <UserDetailsContext.Provider value={userDetailsValue}>
            <PaperProvider>
              <RootNavigator />
            </PaperProvider>
          </UserDetailsContext.Provider>
        </ThemeProvider>
      </TokenContextProvider>
      <Toast ref={toast} />
    </>
  );
}

export default App;
