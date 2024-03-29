import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-fast-toast';
import Entypo from 'react-native-vector-icons/Entypo';
import { NotifierWrapper } from 'react-native-notifier';

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
    <NotifierWrapper>
      <TokenContextProvider>
        <ThemeProvider>
          <UserDetailsContext.Provider value={userDetailsValue}>
            <PaperProvider>
              <RootNavigator />
            </PaperProvider>
          </UserDetailsContext.Provider>
        </ThemeProvider>
      </TokenContextProvider>
      <Toast
        ref={toast}
        successIcon={<Entypo name="check" color="white" size={20} />}
        dangerIcon={<Entypo name="cross" color="white" size={20} />}
      />
    </NotifierWrapper>
  );
}

export default App;
