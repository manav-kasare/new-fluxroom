import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
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

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
import auth from '@react-native-firebase/auth';
import EmailVerification from './EmailVerification';

import constants from '../../shared/constants';
import {CustomErrorToast, CustomToast} from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';
import {ActivityIndicator} from 'react-native-paper';

export default function SignUp({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const y = useValue(0);

  const opacityTransition = withTimingTransition(y, {duration: 500});
  const opacity = mix(opacityTransition, 0, 1);

  const positionY = withSpringTransition(y, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });
  const translateY = mix(positionY, constants.height, 0);
  useCode(() => cond((eq(y, 0), set(y, 1))), [y]);

  const isPasswordValid = (q) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      q,
    );
  };

  const signUp = () => {
    setIsLoading(true);
    Keyboard.dismiss();
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((_userInfo) => {
        _userInfo.user.sendEmailVerification().then(() => {
          setIsLoading(false);
          setUserInfo(_userInfo);
          ReactNativeHapticFeedback.trigger('notificationSuccess', options);
          setIsVisible(true);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        ReactNativeHapticFeedback.trigger('notificationError', options);
        if (error.code === 'auth/email-already-in-use') {
          CustomErrorToast('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          CustomErrorToast('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const toggleRevealPassword = () => {
    setRevealPassword(!revealPassword);
  };

  return (
    <KeyboardAwareScrollView
      style={{width: constants.width, height: constants.height}}
      keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            width: constants.width,
            height: constants.height,
            backgroundColor: 'white',
          }}>
          <EmailVerification
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            navigation={navigation}
            userInfo={userInfo}
            user={{email: email, password: password}}
          />
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
                source={require('../../assets/contract.webp')}
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
                  name="email"
                  size={24}
                  color="#0d0c0a"
                />
                <TextInput
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  style={globalStyles.textInput}
                  placeholder="Email Address"
                  placeholderTextColor="grey"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  clearButtonMode="while-editing"
                />
              </View>

              <View style={globalStyles.input}>
                <Entypo
                  name="key"
                  size={22}
                  color={isPasswordValid(password) ? '#0d0c0a' : 'crimson'}
                />
                <TextInput
                  autoCapitalize="none"
                  textContentType="password"
                  secureTextEntry={revealPassword ? false : true}
                  style={globalStyles.textInput}
                  placeholder="Password"
                  placeholderTextColor="grey"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  clearButtonMode="while-editing"
                />
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={toggleRevealPassword}>
                  {revealPassword ? (
                    <Entypo name="eye" size={18} color="#0d0c0a" />
                  ) : (
                    <Entypo name="eye-with-line" size={18} color="#0d0c0a" />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={globalStyles.button}
                onPress={
                  isPasswordValid(password)
                    ? signUp
                    : () => {
                        CustomToast('Password Too Weak');
                      }
                }>
                {isLoading ? (
                  <ActivityIndicator
                    color="white"
                    size="small"
                    animating={true}
                  />
                ) : (
                  <Text style={globalStyles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
