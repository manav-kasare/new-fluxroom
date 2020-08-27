import React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import Animated, {
  interpolate,
  useCode,
  cond,
  set,
  eq,
  SpringUtils,
} from 'react-native-reanimated';
import {
  useValue,
  withTimingTransition,
  withSpringTransition,
} from 'react-native-redash';

import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';

import Google from './Google';
import Facebook from './Facebook';

export default function Onboard({navigation}) {
  const time = useValue(0);
  const timeAnimation = withTimingTransition(time, {duration: 500});
  useCode(() => cond(eq(time, 0), set(time, 1)), []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#4640C1',
        justifyContent: 'space-between',
        paddingTop: 100,
      }}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <Animated.View
        style={{
          marginTop: 50,
          opacity: timeAnimation,
        }}>
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
          height: constants.height * 0.3,
          paddingTop: 25,
          width: constants.width,
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: 'white',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          borderWidth: 1,
          opacity: timeAnimation,
        }}>
        <View>
          <TouchableOpacity
            style={globalStyles.screenButton}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={globalStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={globalStyles.screenButton}
            onPress={() => navigation.navigate('LogIn')}>
            <Text style={globalStyles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
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
          <Google />
          <Facebook />
        </View>
      </Animated.View>
    </View>
  );
}
