import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import PhoneInput from 'react-native-phone-number-input';
import {Auth} from 'aws-amplify';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ReactNativeHaptic from 'react-native-haptic';

import constants from '../../shared/constants';
import CustomToast from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';
import randomID from '../../backend/database/randomID';
import {
  createUser,
  checkIfEmailIsRegistered,
} from '../../backend/database/apiCalls';
import Animated, {
  interpolate,
  useCode,
  cond,
  set,
  eq,
  Easing,
  SpringUtils,
} from 'react-native-reanimated';
import {
  useValue,
  withTimingTransition,
  withSpringTransition,
} from 'react-native-redash';

export default function SignUp({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [phoneLogin, setPhoneLogin] = useState(false);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(null);
  const phoneInput = React.useRef(null);

  const positionX = useValue(constants.width * 2);
  useCode(() => cond(eq(positionX, constants.width * 2), set(positionX, 0)));
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

  const signUp = async () => {
    setIsLoading(true);
    try {
      if (phoneLogin) {
        const {user} = await Auth.signUp({
          username: formattedPhoneNumber,
          password: password,
        });
        setIsLoading(false);
        ReactNativeHaptic.generate('notificationSuccess');
        navigation.navigate('OtpVerification', {
          username: formattedPhoneNumber,
          type: 'phoneNumber',
        });
      } else {
        const {user} = await Auth.signUp({
          username: email,
          password: password,
        });
        setIsLoading(false);
        ReactNativeHaptic.generate('notificationSuccess');
        navigation.navigate('OtpVerification', {
          username: email,
          type: 'email',
        });
      }
    } catch (error) {
      console.log('error signing up:', error);
      setIsLoading(false);
      ReactNativeHaptic.generate('notificationError');
      if (error.code === 'InvalidPasswordException') {
        CustomToast('Password too weak');
      } else if (error.code === 'UsernameExistsException') {
        CustomToast(error.message);
      } else if (error.code === 'InvalidParameterException') {
        CustomToast('Invalid Credentials');
      } else {
        CustomToast('An Error Occured');
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{width: constants.width, height: constants.height}}
      keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
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
            <Animated.View style={{transform: [{translateX: slideAnimationX}]}}>
              <Image
                style={{
                  width: constants.width,
                  marginVertical: 30,
                  height: constants.height * 0.2,
                }}
                resizeMode="contain"
                source={require('/Users/manav/projects/fluxroom/assets/contract.png')}
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
              {phoneLogin ? (
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
                    paddingRight: 5,
                    borderRadius: 8,
                    padding: 2,
                    backgroundColor: '#F6F8FA',
                  }}
                  flagButtonStyle={{backgroundColor: 'white'}}
                />
              ) : (
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
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    clearButtonMode="while-editing"
                  />
                </View>
              )}

              <View style={globalStyles.input}>
                <Entypo name="key" size={22} color="#0d0c0a" />
                <TextInput
                  autoCapitalize="none"
                  textContentType="password"
                  secureTextEntry={revealPassword ? false : true}
                  style={globalStyles.textInput}
                  placeholder="Password"
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
                    // backgroundColor: 'red',
                  }}
                  onPress={() => setRevealPassword(!revealPassword)}>
                  {revealPassword ? (
                    <Entypo name="eye" size={18} color="#0d0c0a" />
                  ) : (
                    <Entypo name="eye-with-line" size={18} color="#0d0c0a" />
                  )}
                </TouchableOpacity>
              </View>

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
                <TouchableOpacity style={globalStyles.button} onPress={signUp}>
                  <Text style={globalStyles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={globalStyles.button}
                onPress={() => setPhoneLogin(!phoneLogin)}>
                {phoneLogin ? (
                  <Text style={globalStyles.buttonText}>Use Email</Text>
                ) : (
                  <Text style={globalStyles.buttonText}>
                    Use Phone Number Instead
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
