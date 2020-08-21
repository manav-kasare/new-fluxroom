import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Vibration,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {UserDetailsContext} from '../../shared/Context';
import constants from '../../shared/constants';
import CustomToast from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';
import {
  loginUserWithUsername,
  loginUserWithEmail,
} from '../../backend/database/apiCalls';

const isEmail = (val) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    val,
  );
};

export default function LogIn({navigation}) {
  const {setUser} = useContext(UserDetailsContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [onFocus, setOnFocus] = useState({
    usernameOrEmail: false,
    password: false,
  });
  const [revealPassword, setRevealPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const handleLogIn = () => {
    setIsLoading(true);

    if (isEmail(usernameOrEmail)) {
      loginUserWithEmail({
        email: usernameOrEmail,
        password: formPassword,
      }).then((data) => {
        if (data !== 'error') {
          if (Boolean(data.confirmed)) {
            storeData(data).then(() => {
              setIsLoading(false);
              setUser(data);
            });
          } else {
            setIsLoading(false);
            CustomToast('Please Verify your Email');
          }
        } else {
          setIsLoading(false);
          CustomToast('Email or Password is incorrect');
        }
      });
    } else {
      loginUserWithUsername({
        username: usernameOrEmail,
        password: formPassword,
      }).then((data) => {
        setIsLoading(false);
        if (data !== 'error') {
          if (Boolean(data.confirmed)) {
            storeData(data).then(() => {
              setIsLoading(false);
              setUser(data);
            });
          } else {
            CustomToast('Please verify your Email');
          }
        } else {
          CustomToast('Username or Password is incorrect');
        }
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback
        onPress={() => {
          setOnFocus({usernameOrEmail: false, password: false});
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
              height: constants.height * 0.2,
              marginTop: 25,
            }}
            resizeMode="contain"
            source={require('/Users/manav/projects/fluxroom/assets/receipt.png')}
          />
          <View>
            <View
              style={{
                width: constants.width * 0.9,
                backgroundColor: 'white',
                borderRadius: 10,
                alignItems: 'center',
                borderColor: 'grey',
                borderWidth: 0.3,
                paddingVertical: 25,
              }}>
              <View
                style={{
                  marginTop: 20,
                }}>
                <View>
                  <View style={globalStyles.input}>
                    <MaterialCommunityIcons
                      name="account-edit"
                      size={24}
                      color={
                        onFocus.usernameOrEmail
                          ? 'dodgerblue'
                          : constants.primary
                      }
                    />
                    <TextInput
                      autoCapitalize="none"
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      onFocus={() =>
                        setOnFocus({usernameOrEmail: true, password: false})
                      }
                      style={globalStyles.textInput}
                      placeholder="Username or Email Address"
                      onChangeText={(text) => setUsernameOrEmail(text)}
                      value={usernameOrEmail}
                      onSubmitEditing={handleLogIn}
                      clearButtonMode="while-editing"
                    />
                  </View>
                  <View style={globalStyles.input}>
                    <Entypo
                      name="key"
                      size={22}
                      color={
                        onFocus.password ? 'dodgerblue' : constants.primary
                      }
                    />
                    <TextInput
                      textContentType="password"
                      onFocus={() =>
                        setOnFocus({usernameOrEmail: false, password: true})
                      }
                      secureTextEntry={revealPassword ? false : true}
                      style={globalStyles.textInput}
                      placeholder="Password"
                      onChangeText={(text) => setFormPassword(text)}
                      value={formPassword}
                      onSubmitEditing={handleLogIn}
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
                      {onFocus.password ? (
                        revealPassword ? (
                          <Entypo name="eye" size={20} color="black" />
                        ) : (
                          <Entypo
                            name="eye-with-line"
                            size={20}
                            color="black"
                          />
                        )
                      ) : (
                        <></>
                      )}
                    </TouchableOpacity>
                  </View>
                  {isLoading ? (
                    <View style={{height: 50, marginVertical: 10}}>
                      <ActivityIndicator color="black" size="small" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={globalStyles.button}
                      onPress={handleLogIn}>
                      <Text style={globalStyles.buttonText}>
                        Log In to FluxRoom
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                width: constants.width * 0.9,
                height: 50,
                backgroundColor: '#4640C1',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginVertical: 20,
              }}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={globalStyles.buttonText}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
