import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigator from './navigators/RootNavigator';
import {IsSignedInContext, ThemeProvider} from './shared/Context';

function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const isSignedInValue = React.useMemo(() => ({isSignedIn, setIsSignedIn}), [
    isSignedIn,
    setIsSignedIn,
  ]);

  return (
    <ThemeProvider>
      <IsSignedInContext.Provider value={isSignedInValue}>
        <PaperProvider>
          <RootNavigator />
        </PaperProvider>
      </IsSignedInContext.Provider>
    </ThemeProvider>
  );
}

export default App;
