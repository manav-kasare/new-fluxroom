import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

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
  const [revealPassword, setRevealPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onFocusPassword, setOnFocusPassword] = useState(false);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log('VALUE', jsonValue);
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
              height: constants.height * 0.2,
              marginVertical: 30,
            }}
            resizeMode="contain"
            source={require('/Users/manav/projects/fluxroom/assets/receipt.png')}
          />
          <View
            style={{
              backgroundColor: '#4640C1',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              alignItems: 'center',
            }}>
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
                <MaterialCommunityIcons
                  name="account-edit"
                  size={24}
                  color={constants.primary}
                />
                <TextInput
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  style={globalStyles.textInput}
                  placeholder="Username or Email Address"
                  onChangeText={(text) => setUsernameOrEmail(text)}
                  value={usernameOrEmail}
                  onSubmitEditing={handleLogIn}
                  clearButtonMode="while-editing"
                />
              </View>
              <View style={globalStyles.input}>
                <Entypo name="key" size={22} color={constants.primary} />
                <TextInput
                  secureTextEntry={revealPassword ? false : true}
                  style={globalStyles.textInput}
                  placeholder="Password"
                  onFocus={() => setOnFocusPassword(true)}
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
                  {onFocusPassword ? (
                    revealPassword ? (
                      <Entypo name="eye" size={20} color="black" />
                    ) : (
                      <Entypo name="eye-with-line" size={20} color="black" />
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
              <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={globalStyles.buttonText}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}
