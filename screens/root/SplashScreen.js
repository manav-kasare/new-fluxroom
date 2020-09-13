import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {ThemeContext} from '../../shared/Context';

export default function SplashScreen() {
  const {constants} = React.useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.background1,
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
