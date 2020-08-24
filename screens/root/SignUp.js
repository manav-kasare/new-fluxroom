import React, {useEffect, useState, useContext} from 'react';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PhoneInput from 'react-native-phone-input';
import {Auth} from 'aws-amplify';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import constants from '../../shared/constants';
import CustomToast from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';
import randomID from '../../backend/database/randomID';
import {
  createUser,
  checkIfEmailIsRegistered,
} from '../../backend/database/apiCalls';
import Google from './Google';
import Facebook from './Facebook';

export default function SignUp({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [onFocusPassword, setOnFocusPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [phoneLogin, setPhoneLogin] = useState(false);
  const phone = React.useRef(null);

  const signUp = async () => {
    try {
      if (phoneLogin) {
        const {user} = await Auth.signUp({
          username: phoneNumber,
          password: password,
        });
        console.log(user);
      } else {
        const {user} = await Auth.signUp({
          username: email,
          password: password,
        });
        console.log(user);
      }

      navigation.navigate('OtpVerification', {
        username: phoneLogin ? phoneNumber : email,
      });
    } catch (error) {
      console.log('error signing up:', error);
      if (error.code === 'InvalidPasswordException') {
        CustomToast('Password too weak');
      } else if (error.code === 'UsernameExistsException') {
        CustomToast(error.message);
      } else {
        CustomToast('An Error Occured');
      }
    }
  };

  const handleRegister = (email, password) => {
    setIsLoading(true);
    checkIfEmailIsRegistered(email).then((responseText) => {
      Keyboard.dismiss();
      if (responseText == 'exists') {
        setIsLoading(false);
        CustomToast('Email Already in use');
      } else {
        const id = randomID();
        createUser({
          id: id,
          email: email,
          password: password,
        }).then(({data}) => {
          console.log('DATA', data);
          setIsLoading(false);
          if (data.error) {
            CustomToast('An Error Occured');
          } else {
            navigation.navigate('EmailVerification', {
              email: email,
              id: id,
            });
          }
        });
      }
    });
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
            }}>
            <Image
              style={{
                width: constants.width,
                marginVertical: 30,
                height: constants.height * 0.2,
              }}
              resizeMode="contain"
              source={require('/Users/manav/projects/fluxroom/assets/contract.png')}
            />

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
              {phoneLogin ? (
                <View style={globalStyles.input}>
                  <PhoneInput
                    value={phoneNumber}
                    onChangePhoneNumber={(text) => setPhoneNumber(text)}
                    ref={phone}
                    flagStyle={{width: 25}}
                    onSelectCountry={(code) => console.log(code)}
                  />
                </View>
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
                  onFocus={() => setOnFocusPassword(true)}
                  onBlur={() => setOnFocusPassword(false)}
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
                <Google />
                <Facebook />
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    backgroundColor: '#4640C1',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => setPhoneLogin(!phoneLogin)}>
                  <Entypo name="phone" size={25} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
