import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {MaterialCommunityIcons} from 'react-native-vector-icons';

import constants from '../../shared/constants';
import CustomToast from '../../shared/CustomToast';
import globalStyles from '../../shared/GlobalStyles';
import {
  checkIfEmailIsRegistered,
  forgotPassword,
} from '../../backend/database/apiCalls';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocuesd] = useState(false);

  // Email Validity
  const isEmailValid = (q) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      q,
    );
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    checkIfEmailIsRegistered(email).then((responseText) => {
      if (responseText === 'exists') {
        handleSendEmail();
      } else {
        CustomToast('Email not registered !');
      }
    });
  };

  const handleSendEmail = () => {
    forgotPassword(email).then((responseText) => {
      if (responseText !== 'success') {
        CustomToast('An Error Occured');
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
      }}>
      <Appbar.Header style={globalStyles.rootAppbarHeader}>
        <Appbar.BackAction
          onPress={() => navigation.goBack('LogIn')}
          color="white"
        />
        <Appbar.Content
          title="Forgot Password"
          titleStyle={globalStyles.rootAppbarTitle}
        />
      </Appbar.Header>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 25,
          marginTop: 50,
        }}>
        <View
          style={{
            width: constants.width * 0.75,
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: constants.text2,
              fontSize: 18,
              fontFamily: 'Helvetica',
              fontWeight: '200',
            }}>
            Enter your registered Email Address
          </Text>
        </View>
        <View>
          <View style={globalStyles.input}>
            <MaterialCommunityIcons
              name="email"
              size={20}
              color={constants.primary}
            />
            <TextInput
              onFocus={() => setIsFocuesd(true)}
              autoFocus={true}
              style={globalStyles.textInput}
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholder="Email Address"
              placeholderTextColor="grey"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <TouchableOpacity
            onPress={isEmailValid(email) ? handleSubmit : () => {}}
            style={globalStyles.button}>
            <Text
              style={{
                color: constants.text1,
                fontSize: 16,
                letterSpacing: 1,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
