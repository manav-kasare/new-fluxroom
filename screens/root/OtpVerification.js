import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  SafeAreaView,
  Keyboard,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
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

import {
  ThemeContext,
  UserDetailsContext,
  TokenContext,
} from '../../shared/Context';
import globalStyles from '../../shared/GlobalStyles';
import {CustomErrorToast} from '../../shared/CustomToast';
import il8n from '../../locales/il8n';

export default function OtpVerification({route, navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {confirmation, phoneNumber} = route.params;
  const [_confirmation, setConfirmation] = React.useState(confirmation);
  const {setUser} = React.useContext(UserDetailsContext);
  const [code, setCode] = React.useState(null);
  const {setToken} = React.useContext(TokenContext);
  const [isLoadingCode, setIsLoadingCode] = React.useState(false);
  const [isLoadingResendCode, setIsLoadingResendCode] = React.useState(false);

  const confirmSignUp = async () => {
    Keyboard.dismiss();
    setIsLoadingCode(true);
    try {
      await _confirmation.confirm(code).then((userInfo) => {
        ReactNativeHapticFeedback.trigger('notificationSuccess', options);
        setIsVisible(false);
        if (userInfo.additionalUserInfo.isNewUser) {
          setIsLoadingCode(false);
          navigation.navigate('SetUpProfile', {
            phoneNumber: phoneNumber,
            phoneData: userInfo,
          });
        } else {
          const encodedPhoneNumber = phoneNumber.replace(/\+/gi, '%2B');
          getUserByPhone(encodedPhoneNumber).then((user) => {
            loginUser({
              username: user.username,
              password: '89337133-17c9-42e3-9fef-78416a25651a',
            }).then((response) => {
              if (response.err) {
                setIsLoadingCode(false);
                ReactNativeHapticFeedback.trigger('notificationError', options);
                CustomErrorToast('An Error Occured !');
              } else {
                ReactNativeHapticFeedback.trigger(
                  'notificationSuccess',
                  options,
                );
                storeToken(response.user._id, response.token).then(() => {
                  setToken(response.token);
                  storeUserData(response.user);
                  storeTheme('light');
                  setIsLoadingCode(false);
                  setUser(response.user);
                });
              }
            });
          });
        }
      });
    } catch (error) {
      console.log('[Error]', error);
      ReactNativeHapticFeedback.trigger('notificationError', options);
      setIsLoadingCode(false);
      CustomErrorToast('Invalid Code !');
    }
  };

  const resendConfirmationCode = async () => {
    setIsLoadingResendCode(true);
    await auth()
      .signInWithPhoneNumber(phoneNumber)
      .then((response) => {
        setConfirmation(response);
        setIsLoadingResendCode(false);
      });
  };

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

  return (
    <KeyboardAwareScrollView
      style={{width: constants.width, height: constants.height}}
      keyboardShouldPersistTaps="handled">
      <View
        style={{
          width: constants.width,
          height: constants.height,
          backgroundColor: 'white',
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#03449e',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <Animated.View style={{opacity}}>
            <Image
              style={{
                width: constants.width,
                marginVertical: 30,
                height: constants.height * 0.2,
              }}
              resizeMode="contain"
              source={require('../../assets/phone.webp')}
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
              transform: [{translateY}],
            }}>
            <View style={globalStyles.input}>
              <MaterialCommunityIcons
                name="barcode"
                size={18}
                color={constants.primary}
              />
              <TextInput
                keyboardType="number-pad"
                style={globalStyles.textInput}
                placeholder={il8n.t('placeholders.code')}
                placeholderTextColor="grey"
                value={code}
                onChangeText={(text) => setCode(text)}
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={confirmSignUp}>
              {isLoadingCode ? (
                <ActivityIndicator
                  color="white"
                  size="small"
                  animating={true}
                />
              ) : (
                <Text style={globalStyles.buttonText}>
                  {il8n.t('buttons.verify')}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.button}
              onPress={resendConfirmationCode}>
              {isLoadingResendCode ? (
                <ActivityIndicator
                  color="white"
                  size="small"
                  animating={true}
                />
              ) : (
                <Text style={globalStyles.buttonText}>
                  {il8n.t('buttons.resend')}
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
}
