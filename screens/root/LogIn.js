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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import ReactNativeHaptic from 'react-native-haptic';
import Animated, {
  useCode,
  cond,
  set,
  eq,
  SpringUtils,
} from 'react-native-reanimated';
import {useValue, withSpringTransition} from 'react-native-redash';

import {UserDetailsContext} from '../../shared/Context';
import constants from '../../shared/constants';
import CustomToast from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';
import {
  loginUserWithUsername,
  loginUserWithEmail,
} from '../../backend/database/apiCalls';

export default function LogIn({navigation}) {
  const {setUser} = useContext(UserDetailsContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [revealPassword, setRevealPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onFocusPassword, setOnFocusPassword] = useState(false);

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

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const signIn = async () => {
    setIsLoading(true);
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then((userInfo) => {
          setIsLoading(false);
          storeData(userInfo);
          setUser(userInfo);
        });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
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
                  height: constants.height * 0.2,
                  marginVertical: 30,
                }}
                resizeMode="contain"
                source={require('/Users/manav/projects/fluxroom/assets/receipt.png')}
              />
            </Animated.View>
            <Animated.View
              style={{
                backgroundColor: '#4640C1',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                alignItems: 'center',
                transform: [{translateY: slideAnimationY}],
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
                    onChangeText={(text) => setemail(text)}
                    value={email}
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
                    onChangeText={(text) => setpassword(text)}
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
                    onPress={signIn}>
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
            </Animated.View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
