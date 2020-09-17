import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
  StyleSheet,
} from 'react-native';
import Animated, {
  useCode,
  cond,
  set,
  eq,
  SpringUtils,
  interpolate,
} from 'react-native-reanimated';
import {
  useValue,
  withTimingTransition,
  withSpringTransition,
} from 'react-native-redash';
import Entypo from 'react-native-vector-icons/Entypo';

import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';

import Google from './Google';
import Apple from './Apple';

export default function Onboard({navigation}) {
  const time = useValue(0);
  const scale = withTimingTransition(time);
  useCode(() => cond(eq(time, 0), set(time, 1)), []);

  const translateY = withSpringTransition(time, {
    damping: 500,
    mass: 5,
    overshootClamping: false,
  });

  const navigatePhone = () => {
    navigation.navigate('Phone');
  };
  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };
  const navigateLogin = () => {
    navigation.navigate('LogIn');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="'#3f00a6'" />
      <View
        style={{
          flex: 1,
          backgroundColor: '#3f00a6',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 50,
        }}>
        <Animated.View style={{transform: [{scale}]}}>
          <Text
            style={{
              marginTop: 30,
              color: 'white',
              fontWeight: '800',
              fontSize: 30,
              letterSpacing: 2,
              fontFamily: 'Helvetica Neue',
              alignSelf: 'center',
            }}>
            FLUXROOM
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: 'white',
            width: constants.width,
            alignItems: 'center',
            paddingTop: 50,
            paddingBottom: 50,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          <TouchableOpacity
            style={globalStyles.screenButton}
            onPress={navigateSignUp}>
            <Text style={globalStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.screenButton}
            onPress={navigateLogin}>
            <Text style={globalStyles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <View
            style={{
              width: constants.width * 0.9,
              justifyContent: 'space-evenly',
              shadowColor: 'grey',
              shadowOpacity: 0.2,
              elevation: 1,
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 20,
              alignSelf: 'center',
            }}>
            {Platform.OS === 'ios' ? <Apple navigation={navigation} /> : <></>}
            <Google navigation={navigation} />

            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                backgroundColor: '#3f00a6',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={navigatePhone}>
              <Entypo size={25} name="phone" color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </>
  );
}
