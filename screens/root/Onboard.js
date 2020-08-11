import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from 'react-native';

import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';

import Google from './Google';
import Facebook from './Facebook';
import Phone from './Phone';

export default function Onboard({navigation}) {
  const position = useState(new Animated.Value(constants.width))[0];

  useEffect(() => {
    Animated.spring(position, {
      bounciness: 5,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}>
      <Animated.View
        style={{
          transform: [{translateX: position}],
          marginTop: 50,
        }}>
        <View style={{flexDirection: 'column', alignSelf: 'center'}}>
          <Image
            style={{width: 200, height: 200}}
            resizeMode="cover"
            source={require('/Users/manav/projects/fluxroom/assets/logo.png')}
          />
          <Animated.Text
            style={{
              marginTop: 30,
              color: '#4640C1',
              fontWeight: '800',
              fontSize: 40,
              letterSpacing: 2,
              fontFamily: 'Helvetica Neue',
              alignSelf: 'center',
              transform: [{translateX: position}],
            }}>
            FLUXROOM
          </Animated.Text>
        </View>
      </Animated.View>
      <View style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
        <Animated.View
          style={{
            alignSelf: 'center',
            transform: [{translateX: position}],
          }}>
          <Animated.View style={{transform: [{translateX: position}]}}>
            <TouchableOpacity
              style={globalStyles.screenButton}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={globalStyles.buttonText}>Register With Email</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{transform: [{translateX: position}]}}>
            <TouchableOpacity
              style={globalStyles.screenButton}
              onPress={() => navigation.navigate('LogIn')}>
              <Text style={globalStyles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateX: position}],
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
          <Phone />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
