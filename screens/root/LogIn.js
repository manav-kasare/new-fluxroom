import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {ActivityIndicator} from 'react-native-paper';
import Animated, {
  useCode,
  set,
  eq,
  SpringUtils,
  cond,
} from 'react-native-reanimated';
import {
  useValue,
  mix,
  withSpringTransition,
  withTimingTransition,
} from 'react-native-redash';
import il8n from '../../locales/il8n';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

import {UserDetailsContext, TokenContext} from '../../shared/Context';
import constants from '../../shared/constants';
import {CustomErrorToast} from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';
import {loginUser, getUserByEmail} from '../../backend/database/apiCalls';
import {storeToken} from '../../shared/KeyChain';
import {storeUserData, storeTheme} from '../../shared/AsyncStore';

export default function LogIn({navigation}) {
  const {setUser} = useContext(UserDetailsContext);
  const {setToken} = useContext(TokenContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [revealPassword, setRevealPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onFocusPassword, setOnFocusPassword] = useState(false);

  const y = useValue(0);

  const opacityTransition = withTimingTransition(y, {duration: 500});
  const opacity = mix(opacityTransition, 0, 1);

  const positionY = withSpringTransition(y, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });
  const translateY = mix(positionY, constants.height, 0);
  useCode(() => cond((eq(y, 0), set(y, 1))), [y]);

  const signIn = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then((userInfo) => {
          if (userInfo.user.emailVerified) {
            getUserByEmail(email).then((user) => {
              loginUser({
                username: user.username,
                password: '89337133-17c9-42e3-9fef-78416a25651a',
              }).then((response) => {
                if (response.err) {
                  setIsLoading(false);
                  ReactNativeHapticFeedback.trigger(
                    'notificationError',
                    options,
                  );
                  CustomErrorToast('An Error Occured !');
                } else {
                  storeToken(response.user._id, response.token).then(() => {
                    setToken(response.token);
                    storeUserData(response.user).then(() => {
                      storeTheme('light');
                      setIsLoading(false);
                      setUser(response.user);
                      ReactNativeHapticFeedback.trigger(
                        'notificationSuccess',
                        options,
                      );
                    });
                  });
                }
              });
            });
          } else {
            CustomErrorToast('Email not Verified !');
          }
        });
    } catch (err) {
      setIsLoading(false);
      ReactNativeHapticFeedback.trigger('notificationError', options);
      CustomErrorToast('An Error Occured !');
    }
  };

  const toggleRevealPassword = () => {
    setRevealPassword(!revealPassword);
  };

  const navigateForgotPassword = () => {
    navigation.navigate('ForgotPassword');
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
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: '#03449e',
              alignItems: 'center',
              marginBottom: 50,
            }}>
            <Animated.View style={{opacity}}>
              <Image
                style={{
                  width: constants.width,
                  height: constants.height * 0.2,
                  marginVertical: 30,
                }}
                resizeMode="contain"
                source={require('../../assets/receipt.webp')}
              />
            </Animated.View>
            <Animated.View
              style={{
                backgroundColor: '#03449e',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                alignItems: 'center',
                transform: [{translateY}],
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
                    name="email"
                    size={24}
                    color="#0d0c0a"
                  />
                  <TextInput
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    style={globalStyles.textInput}
                    placeholder={il8n.t('placeholders.email')}
                    onChangeText={(text) => setemail(text)}
                    value={email}
                    placeholderTextColor="grey"
                    clearButtonMode="while-editing"
                  />
                </View>
                <View style={globalStyles.input}>
                  <Entypo name="key" size={22} color={constants.primary} />
                  <TextInput
                    secureTextEntry={revealPassword ? false : true}
                    style={globalStyles.textInput}
                    placeholder={il8n.t('placeholders.password')}
                    onFocus={() => setOnFocusPassword(true)}
                    onChangeText={(text) => setpassword(text)}
                    value={password}
                    placeholderTextColor="grey"
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
                <TouchableOpacity style={globalStyles.button} onPress={signIn}>
                  {isLoading ? (
                    <ActivityIndicator
                      color="white"
                      size="small"
                      animating={true}
                    />
                  ) : (
                    <Text style={globalStyles.buttonText}>
                      {il8n.t('buttons.logIn')}
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={globalStyles.button}
                  onPress={navigateForgotPassword}>
                  <Text style={globalStyles.buttonText}>
                    {il8n.t('buttons.forgotPassword')}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
