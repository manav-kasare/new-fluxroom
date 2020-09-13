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
          marginTop: 30,
          color: '#4640C1',
          fontWeight: '800',
          fontSize: 30,
          letterSpacing: 2,
          fontFamily: 'Helvetica Neue',
          alignSelf: 'center',
        }}>
        FLUXROOM
      </Text>
    </SafeAreaView>
  );
}
