import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import Animated, {
  useCode,
  cond,
  set,
  eq,
  SpringUtils,
} from 'react-native-reanimated';
import {useValue, withSpringTransition} from 'react-native-redash';

import {ThemeContext} from '../../shared/Context';
import globalStyles from '../../shared/GlobalStyles';
import CustomToast from '../../shared/CustomToast';
import OtpVerifiaction from './OtpVerification';

export default function Phone({navigation}) {
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = React.useState(null);
  const phoneInput = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {constants} = React.useContext(ThemeContext);
  const [isVisible, setIsVisible] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState();

  const positionX = useValue(constants.width);
  useCode(() => cond(eq(positionX, constants.width), set(positionX, 0)));
  const slideAnimationX = withSpringTransition(positionX, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });

  const positionY = useValue(constants.height);
  useCode(() => cond(eq(positionY, constants.height), set(positionY, 0)));
  const slideAnimationY = withSpringTransition(positionY, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });

  const signIn = async () => {
    setIsLoading(true);
    try {
      await auth()
        .signInWithPhoneNumber(formattedPhoneNumber)
        .then((_confirmation) => {
          setConfirmation(_confirmation);
          setIsLoading(false);
          setIsVisible(true);
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      CustomToast('Invalid Phone number');
    }
  };

  return (
    <View
      style={{
        width: constants.width,
        height: constants.height,
        backgroundColor: 'white',
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#4640C1',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <OtpVerifiaction
          navigation={navigation}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          phoneNumber={formattedPhoneNumber}
          confirmation={confirmation}
          setConfirmation={setConfirmation}
        />
        <Animated.View style={{transform: [{translateX: slideAnimationX}]}}>
          <Image
            style={{
              width: constants.width,
              marginVertical: 30,
              height: constants.height * 0.2,
            }}
            resizeMode="contain"
            source={require('/Users/manav/projects/fluxroom/assets/phone.png')}
          />
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            width: constants.width,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 50,
            backgroundColor: 'white',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            transform: [{translateY: slideAnimationY}],
          }}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="US"
            onChangeText={(text) => {
              setPhoneNumber(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedPhoneNumber(text);
            }}
            containerStyle={{
              marginVertical: 10,
              borderRadius: 8,
              borderColor: 'grey',
              borderWidth: 0.3,
              width: constants.width * 0.8,
              borderRadius: 8,
              padding: 2,
              backgroundColor: 'white',
            }}
            flagButtonStyle={{backgroundColor: 'white'}}
          />
          {isLoading ? (
            <View
              style={{
                height: 50,
                width: constants.width * 0.8,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 25,
              }}>
              <ActivityIndicator color="#0d0c0a" size="small" />
            </View>
          ) : (
            <TouchableOpacity style={globalStyles.button} onPress={signIn}>
              <Text style={globalStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}
