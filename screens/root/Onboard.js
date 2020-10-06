import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import * as RNLocalize from 'react-native-localize';
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
  useSpringTransition,
  useTimingTransition,
} from 'react-native-redash';
import {ActivityIndicator} from 'react-native-paper';

import {ThemeContext} from '../../shared/Context';
import globalStyles from '../../shared/GlobalStyles';
import {CustomErrorToast} from '../../shared/CustomToast';
import il8n from '../../locales/il8n';

export default function Onboard({navigation}) {
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = React.useState(null);
  const phoneInput = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {constants} = React.useContext(ThemeContext);

  const y = useValue(0);

  const opacityTransition = useTimingTransition(y, {duration: 500});
  const opacity = mix(opacityTransition, 0, 1);

  const positionY = useSpringTransition(y, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });
  const translateY = mix(positionY, constants.height, 0);
  useCode(() => cond((eq(y, 0), set(y, 1))), [y]);

  const signIn = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    try {
      await auth()
        .signInWithPhoneNumber(formattedPhoneNumber)
        .then((confirmation) => {
          console.log('[Confirmation]', confirmation);
          navigation.navigate('OtpVerification', {
            confirmation: confirmation,
            phoneNumber: formattedPhoneNumber,
          });
        });
    } catch (err) {
      setIsLoading(false);
      console.log('[Onboard Error]', err);
      CustomErrorToast('An Error Occured !');
    }
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#03449e" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
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
                marginTop: 50,
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
              height: constants.height * 0.6,
              paddingVertical: 50,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode={
                RNLocalize.getLocales().length > 1
                  ? RNLocalize.getLocales()[1].countryCode
                  : RNLocalize.getLocales()[0].countryCode
              }
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
                padding: 0,
                backgroundColor: 'white',
              }}
              textInputStyle={{color: 'black'}}
              flagButtonStyle={{backgroundColor: 'white'}}
            />
            <TouchableOpacity style={globalStyles.button} onPress={signIn}>
              {isLoading ? (
                <ActivityIndicator
                  color="white"
                  size="small"
                  animating={true}
                />
              ) : (
                <Text style={globalStyles.buttonText}>
                  {il8n.t('buttons.getOTP')}
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
}
