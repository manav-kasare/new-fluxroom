import React from 'react';
import {SafeAreaView, Image} from 'react-native';
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
      {isDark ? (
        <Image source={require('../../assets/whiteOnBlack.webp')} />
      ) : (
        <Image source={require('../../assets/blueOnWhite.webp')} />
      )}
    </SafeAreaView>
  );
}
