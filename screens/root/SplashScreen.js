import React from 'react';
import {SafeAreaView, Image, ActivityIndicator} from 'react-native';

export default function SplashScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{width: 200, height: 200}}
        resizeMode="cover"
        source={require('/Users/manav/projects/fluxroom/assets/logo.png')}
      />
    </SafeAreaView>
  );
}
