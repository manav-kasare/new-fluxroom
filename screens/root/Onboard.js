import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import Animated, {
  useCode,
  set,
  eq,
  SpringUtils,
  cond,
} from 'react-native-reanimated';
import {
  useValue,
  mix,
  withSpringTransition,
  withTimingTransition,
} from 'react-native-redash';
import Entypo from 'react-native-vector-icons/Entypo';
import il8n from '../../locales/il8n';

import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';

import Google from './Google';
import Apple from './Apple';

export default function Onboard({navigation}) {
  const time = useValue(0);
  const opacityTransition = withTimingTransition(time, {duration: 1000});
  const opacity = mix(opacityTransition, 0, 1);
  useCode(() => cond(eq(time, 0), set(time, 1)), [time]);

  const positionY = withSpringTransition(time, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });
  const translateY = mix(positionY, constants.height, 0);

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
      <StatusBar barStyle="light-content" backgroundColor="#03449e" />
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: '#03449e',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 50,
        }}>
        <Animated.View style={{opacity}}>
          <Image
            style={{
              width: constants.width * 0.8,
              height: 50,
              marginTop: 100,
              alignSelf: 'center',
            }}
            resizeMode="cover"
            source={require('../../assets/logoOnboard.webp')}
          />
          <Text
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontWeight: '300',
              fontSize: 15,
              alignSelf: 'center',
              marginTop: 10,
              letterSpacing: 1,
            }}>
            {il8n.t('onboard.subHeading')}
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateY}],
            backgroundColor: 'white',
            width: constants.width,
            alignItems: 'center',
            paddingVertical: 50,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          <TouchableOpacity
            style={globalStyles.screenButton}
            onPress={navigateSignUp}>
            <Text style={globalStyles.buttonText}>
              {il8n.t('buttons.signUpOnboard')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.screenButton}
            onPress={navigateLogin}>
            <Text style={globalStyles.buttonText}>
              {il8n.t('buttons.logInOnboard')}
            </Text>
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
                backgroundColor: '#03449e',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={navigatePhone}>
              <Entypo size={25} name="phone" color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </>
  );
}
