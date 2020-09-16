import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {getTheme} from '../../shared/AsyncStore';

export default function SplashScreen() {
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    getTheme().then((theme) => {
      if (theme === 'dark') {
        setIsDark(true);
      }
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#4b00d8',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>F</Text>
    </SafeAreaView>
  );
}
