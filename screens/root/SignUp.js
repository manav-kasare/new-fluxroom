import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  Animated,
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
import {Appbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {Formik} from 'formik';
import * as yup from 'yup';

import constants from '../../shared/constants';
import CustomToast from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';
import randomID from '../../backend/database/randomID';
import {
  registerUser,
  checkIfEmailIsRegistered,
} from '../../backend/database/apiCalls';

const validationSchema = yup.object({
  email: yup
    .string()
    .required()
    .test(
      'not valid ',
      'Please enter a valid email address.',
      // Instagram validation schema using RegEx
      (val) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          val,
        ),
    ),
  password: yup.string().min(6).required(),
});

export default function SignUp({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [onFocus, setOnFocus] = useState({email: false, password: false});
  const [revealPassword, setRevealPassword] = useState(false);
  const position = useState(new Animated.Value(constants.width))[0];

  useEffect(() => {
    Animated.spring(position, {
      bounciness: 5,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegister = (formEmail, formPassword) => {
    setIsLoading(true);
    checkIfEmailIsRegistered(formEmail).then((responseText) => {
      if (responseText == 'exists') {
        setIsLoading(false);
        CustomToast('Email Already in use');
      } else {
        const id = randomID();
        registerUser({
          id: id,
          email: formEmail,
          password: formPassword,
        }).then((responseText) => {
          setIsLoading(false);
          if (responseText === 'success') {
            navigation.navigate('EmailVerification', {
              email: formEmail,
              id: id,
            });
            CustomToast('Registered Successfully !');
          } else {
            CustomToast('An Error Occured');
          }
        });
      }
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setOnFocus({email: false, password: false});
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'transparent'}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'transparent',
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
                title="Register"
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
            source={require('/Users/manav/projects/fluxroom/assets/contract.png')}>
            <></>
          </ImageBackground>
          <Animated.View
            style={{
              alignItems: 'center',
              transform: [{translateX: position}],
            }}>
            <Animated.View
              style={{
                width: constants.width * 0.9,
                backgroundColor: 'white',
                borderRadius: 10,
                paddingVertical: 25,
                marginBottom: 50,
                transform: [{translateX: position}],
              }}>
              <Animated.View
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
                  transform: [{translateX: position}],
                }}>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  onSubmit={(values, actions) => {
                    actions.resetForm();
                    handleRegister(values.email, values.password);
                  }}
                  validationSchema={validationSchema}>
                  {(formikProps) => (
                    <Animated.View>
                      <Animated.View style={globalStyles.input}>
                        <MaterialCommunityIcons
                          name="email"
                          size={24}
                          color={
                            onFocus.email
                              ? formikProps.errors.email === undefined
                                ? 'dodgerblue'
                                : 'crimson'
                              : constants.primary
                          }
                        />
                        <TextInput
                          keyboardType="email-address"
                          textContentType="emailAddress"
                          onFocus={() =>
                            setOnFocus({email: true, password: false})
                          }
                          style={globalStyles.textInput}
                          placeholder="Email Address"
                          onChangeText={formikProps.handleChange('email')}
                          value={formikProps.values.email}
                        />
                      </Animated.View>
                      <Animated.View style={globalStyles.input}>
                        <Entypo
                          name="key"
                          size={22}
                          color={
                            onFocus.password
                              ? formikProps.errors.password === undefined
                                ? 'dodgerblue'
                                : 'crimson'
                              : constants.primary
                          }
                        />
                        <TextInput
                          textContentType="password"
                          onFocus={() =>
                            setOnFocus({email: false, password: true})
                          }
                          secureTextEntry={revealPassword ? false : true}
                          style={globalStyles.textInput}
                          keyboardType={
                            Platform.OS === 'ios'
                              ? 'ascii-capable'
                              : 'visible-password'
                          }
                          placeholder="Password"
                          onChangeText={formikProps.handleChange('password')}
                          onBlur={formikProps.handleBlur('password')}
                          value={formikProps.values.password}
                        />
                        <Animated.View
                          style={{
                            marginRight: 10,
                            transform: [{translateX: position}],
                          }}>
                          {onFocus.password ? (
                            revealPassword ? (
                              <TouchableOpacity
                                onPress={() =>
                                  setRevealPassword(!revealPassword)
                                }>
                                <Entypo
                                  name="eye"
                                  size={18}
                                  color={constants.primary}
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() =>
                                  setRevealPassword(!revealPassword)
                                }>
                                <Entypo
                                  name="eye-with-line"
                                  size={18}
                                  color={constants.primary}
                                />
                              </TouchableOpacity>
                            )
                          ) : (
                            <></>
                          )}
                        </Animated.View>
                      </Animated.View>
                      <Text style={globalStyles.error}>
                        {formikProps.errors.password}
                      </Text>

                      {isLoading ? (
                        <View
                          style={{
                            height: 50,
                            width: constants.width * 0.8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 25,
                          }}>
                          <ActivityIndicator
                            color={constants.primary}
                            size="small"
                          />
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={globalStyles.button}
                          onPress={formikProps.handleSubmit}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 16,
                              letterSpacing: 1,
                            }}>
                            Register to FluxRoom
                          </Text>
                        </TouchableOpacity>
                      )}
                    </Animated.View>
                  )}
                </Formik>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
