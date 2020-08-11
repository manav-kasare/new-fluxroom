import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigator from './navigators/RootNavigator';
import {IsSignedInContext} from './shared/Context';

function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const isSignedInValue = React.useMemo(() => ({isSignedIn, setIsSignedIn}), [
    isSignedIn,
    setIsSignedIn,
  ]);

  return (
    <IsSignedInContext.Provider value={isSignedInValue}>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </IsSignedInContext.Provider>
  );
}

export default App;
