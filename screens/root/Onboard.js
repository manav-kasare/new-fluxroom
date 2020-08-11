import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
        backgroundColor: 'black',
        justifyContent: 'space-between',
      }}>
      <Animated.View
        style={{
          transform: [{translateX: position}],
          marginTop: 50,
        }}>
        <View style={{marginLeft: 25}}>
          <Animated.Text
            style={{
              marginTop: 30,
              color: 'white',
              fontWeight: '100',
              fontSize: 50,
              letterSpacing: 5,
              fontFamily: 'Helvetica Neue',
              alignSelf: 'center',
              transform: [{translateX: position}],
            }}>
            FLUXROOM
          </Animated.Text>
        </View>
        <Image
          style={{
            width: constants.width,
            height: constants.height * 0.3,
            marginTop: 25,
            alignSelf: 'center',
          }}
          resizeMode="cover"
          source={require('/Users/manav/projects/fluxroom/assets/real_time_collab.png')}
        />
      </Animated.View>
      <View>
        <Animated.View
          style={{
            alignSelf: 'center',
            transform: [{translateX: position}],
          }}>
          <Animated.View style={{transform: [{translateX: position}]}}>
            <TouchableOpacity
              style={globalStyles.lowOpacityTouchableButton}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={globalStyles.buttonText}>Register With Email</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{transform: [{translateX: position}]}}>
            <TouchableOpacity
              style={globalStyles.lowOpacityTouchableButton}
              onPress={() => navigation.navigate('LogIn')}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  letterSpacing: 1,
                  fontFamily: 'Helvetica',
                }}>
                Log In
              </Text>
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
