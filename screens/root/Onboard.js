import React from 'react';
import {Text, TouchableOpacity, View, StatusBar, Platform} from 'react-native';
import Animated, {useCode, cond, set, eq} from 'react-native-reanimated';
import {useValue, withTimingTransition} from 'react-native-redash';
import Entypo from 'react-native-vector-icons/Entypo';

import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';

import Google from './Google';
import Apple from './Apple';

export default function Onboard({navigation}) {
  const time = useValue(0);
  const timeAnimation = withTimingTransition(time, {duration: 1000});
  useCode(() => cond(eq(time, 0), set(time, 1)), []);

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
            onPress={navigateSignUp}>
            <Text style={globalStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={globalStyles.screenButton}
            onPress={navigateLogin}>
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
          <Google navigation={navigation} />
          {Platform.OS === 'ios' ? <Apple navigation={navigation} /> : <></>}

          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              backgroundColor: '#4640C1',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={navigatePhone}>
            <Entypo size={25} name="phone" color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
