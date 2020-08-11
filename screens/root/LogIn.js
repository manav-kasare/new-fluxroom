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
import {Appbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

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

  const handleLogIn = () => {
    setIsLoading(true);

    if (isEmail(usernameOrEmail)) {
      loginUserWithEmail({
        email: usernameOrEmail,
        password: formPassword,
      }).then((data) => {
        setIsLoading(false);
        if (data !== 'error') {
          if (Boolean(data.confirmed)) {
            setUser(data);
            setIsSignedIn(true);
          } else {
            CustomToast('Please Verify your Email');
          }
        } else {
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
            setUser(data);
            setIsSignedIn(true);
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
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Animated.View
            style={{
              transform: [{translateX: position}],
            }}>
            <Appbar.Header style={globalStyles.rootAppbarHeader}>
              <Appbar.BackAction
                onPress={() => navigation.goBack()}
                color="white"
              />
              <Appbar.Content
                title="Log In"
                titleStyle={globalStyles.rootAppbarTitle}
              />
            </Appbar.Header>
          </Animated.View>
          <ImageBackground
            style={{
              width: constants.width,
              height: constants.height * 0.2,
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
                paddingVertical: 25,
                transform: [{translateX: position}],
                alignItems: 'center',
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
                    <View style={{height: 45, marginBottom: 25}}>
                      <ActivityIndicator color="black" size="small" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={globalStyles.button}
                      onPress={handleLogIn}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 18,
                          letterSpacing: 1,
                          fontFamily: 'Helvetica',
                        }}>
                        Log In to FluxRoom
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Animated.View>
            </Animated.View>
            <Animated.View style={{marginVertical: 20, alignSelf: 'center'}}>
              <TouchableOpacity
                style={globalStyles.lowOpacityTouchableButton}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Helvetica',
                    fontSize: 18,
                    letterSpacing: 1,
                  }}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
