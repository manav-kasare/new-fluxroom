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
        backgroundColor: isDark ? 'black' : 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: isDark ? 'white' : 'black',
          fontSize: 25,
          letterSpacing: 2,
          fontWeight: '800',
        }}>
        FLUXROOM
      </Text>
    </SafeAreaView>
  );
}
