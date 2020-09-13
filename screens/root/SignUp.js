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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ReactNativeHaptic from 'react-native-haptic';
import auth from '@react-native-firebase/auth';
import EmailVerification from './EmailVerification';

import constants from '../../shared/constants';
import CustomToast, {CustomErrorToast} from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';

export default function SignUp({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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
          ReactNativeHaptic.generate('notificationSuccess');
          setIsVisible(true);
          // navigation.navigate('SetUpProfile', {email: email});
        });
      })
      .catch((error) => {
        setIsLoading(false);
        ReactNativeHaptic.generate('notificationError');
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
              backgroundColor: '#4640C1',
              alignItems: 'center',
              marginBottom: 50,
            }}>
            <View>
              <Image
                style={{
                  width: constants.width,
                  marginVertical: 30,
                  height: constants.height * 0.2,
                }}
                resizeMode="contain"
                source={require('/Users/manav/projects/fluxroom/assets/contract.png')}
              />
            </View>
            <View
              style={{
                flex: 1,
                width: constants.width,
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 50,
                backgroundColor: 'white',
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
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
                <TouchableOpacity
                  style={globalStyles.button}
                  onPress={
                    isPasswordValid(password)
                      ? signUp
                      : () => {
                          CustomToast('Password Too Weak');
                        }
                  }>
                  <Text style={globalStyles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
