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
import {Auth} from 'aws-amplify';

import constants from '../../shared/constants';
import CustomToast from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';
import randomID from '../../backend/database/randomID';
import {
  createUser,
  checkIfEmailIsRegistered,
} from '../../backend/database/apiCalls';

export default function SignUp({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [onFocusPassword, setOnFocusPassword] = useState(false);
  const [username, setUsername] = useState(null);

  const signUp = async () => {
    try {
      const {user} = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          // other custom attributes
        },
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

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
              borderWidth: 1,
            }}>
            <View style={globalStyles.input}>
              <FontAwesome5
                name="user-alt"
                size={18}
                color={constants.primary}
              />
              <TextInput
                autoFocus={true}
                style={globalStyles.textInput}
                placeholder="Username"
                placeholderTextColor="grey"
                value={username}
                onChangeText={(text) => setUsername(text)}
                autoCapitalize="none"
              />
            </View>
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
                    <Entypo name="eye-with-line" size={18} color="#0d0c0a" />
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
                // onPress={areCredentialsValid ? handleRegister : () => {}}
                onPress={() => navigation.navigate('OtpVerification')}>
                <Text style={globalStyles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}
