import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 25,
          marginTop: 50,
          borderColor: 'grey',
          borderWidth: 0.3,
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
                color: 'white',
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
