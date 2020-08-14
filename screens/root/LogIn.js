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
  Animated,
  Platform,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

import {IsSignedInContext, UserDetailsContext} from '../../shared/Context';
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
  const {setIsSignedIn} = useContext(IsSignedInContext);
  const {setUser} = useContext(UserDetailsContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [onFocus, setOnFocus] = useState({
    usernameOrEmail: false,
    password: false,
  });
  const [revealPassword, setRevealPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const position = useState(new Animated.Value(constants.width))[0];

  useEffect(() => {
    Animated.spring(position, {
      bounciness: 5,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
      console.log('JSON value', jsonValue);
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
              setIsSignedIn(true);
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
              setIsSignedIn(true);
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
    <TouchableWithoutFeedback
      onPress={() => {
        setOnFocus({usernameOrEmail: false, password: false});
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'transparent'}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
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
              marginTop: 50,
            }}
            resizeMode="contain"
            source={require('/Users/manav/projects/fluxroom/assets/receipt.png')}>
            <></>
          </ImageBackground>
          <Animated.View>
            <Animated.View
              style={{
                width: constants.width * 0.9,
                backgroundColor: 'white',
                borderRadius: 10,
                transform: [{translateX: position}],
                alignItems: 'center',
                borderColor: 'grey',
                borderWidth: 0.3,
                paddingVertical: 25,
              }}>
              <Animated.View
                style={{
                  marginTop: 20,
                  transform: [{translateX: position}],
                }}>
                <View>
                  <Animated.View style={globalStyles.input}>
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
                    />
                  </Animated.View>
                  <Animated.View style={globalStyles.input}>
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
                      keyboardType={
                        Platform.OS === 'ios'
                          ? 'ascii-capable'
                          : 'visible-password'
                      }
                      placeholder="Password"
                      onChangeText={(text) => setFormPassword(text)}
                      value={formPassword}
                      onSubmitEditing={handleLogIn}
                    />
                    <View style={{marginRight: 10}}>
                      {onFocus.password ? (
                        revealPassword ? (
                          <TouchableOpacity
                            onPress={() => setRevealPassword(!revealPassword)}>
                            <Entypo name="eye" size={20} color="black" />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => setRevealPassword(!revealPassword)}>
                            <Entypo
                              name="eye-with-line"
                              size={20}
                              color="black"
                            />
                          </TouchableOpacity>
                        )
                      ) : (
                        <></>
                      )}
                    </View>
                  </Animated.View>
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
              </Animated.View>
            </Animated.View>
            <TouchableOpacity
              style={{
                width: constants.width * 0.9,
                height: 50,
                backgroundColor: '#4640C1',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginBottom: 25,
                marginVertical: 20,
              }}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={globalStyles.buttonText}>Forgot Password ?</Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
