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
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import constants from '../../shared/constants';
import CustomToast from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';
import randomID from '../../backend/database/randomID';
import {
  registerUser,
  checkIfEmailIsRegistered,
} from '../../backend/database/apiCalls';

export default function SignUp({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [onFocusPassword, setOnFocusPassword] = useState(false);

  const isEmailValid = (q) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      q,
    );
  };

  const isPasswordValid = (q) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&'])[^ ]{8,}$/.test(q);
  };

  const areCredentialsValid = () => {
    return isEmailValid(email) && isPasswordValid(password);
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
        registerUser({
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
            CustomToast('Registered Successfully !');
          }
        });
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <ImageBackground
            style={{
              width: constants.width,
              marginTop: 25,
              height: constants.height * 0.2,
            }}
            resizeMode="contain"
            source={require('/Users/manav/projects/fluxroom/assets/contract.png')}>
            <></>
          </ImageBackground>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={{
                width: constants.width * 0.9,
                backgroundColor: 'white',
                borderRadius: 10,
                paddingVertical: 25,
                marginBottom: 50,
                borderColor: '#777777',
                borderWidth: 0.3,
              }}>
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
                }}>
                <View>
                  <View style={globalStyles.input}>
                    <MaterialCommunityIcons
                      name="email"
                      size={24}
                      color={isEmailValid(email) ? '#0d0c0a' : 'crimson'}
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
                      }}
                      onPress={() => setRevealPassword(!revealPassword)}>
                      {onFocusPassword ? (
                        revealPassword ? (
                          <Entypo name="eye" size={18} color="#0d0c0a" />
                        ) : (
                          <Entypo
                            name="eye-with-line"
                            size={18}
                            color="#0d0c0a"
                          />
                        )
                      ) : (
                        <></>
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
                      onPress={areCredentialsValid ? handleRegister : () => {}}>
                      <Text style={globalStyles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
