import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';

import CustomToast from '../../shared/CustomToast';
import {getUserInfo, emailConfirmation} from '../../backend/database/apiCalls';
import {ThemeContext} from '../../shared/Context';

export default function EmailVerification({route, navigation}) {
  const {email, id} = route.params;
  const {constants} = React.useContext(ThemeContext);
  const [isVerified, setIsVerified] = useState(false);

  const handleCheck = () => {
    getUserInfo(id).then((data) => {
      if (Boolean(data.confirmed)) {
        navigation.push('SetUpProfile', {id: id});
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    });
  };

  // Resending Email for Confirmation
  const handleEmailConfirmation = () => {
    emailConfirmation(id, email).then((responseText) => {
      if (responseText !== 'success') {
        CustomToast('An Error Occured');
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: constants.width * 0.9,
          backgroundColor: 'white',
          borderRadius: 10,
          paddingVertical: 50,
          alignSelf: 'center',
          marginTop: 100,
          paddingHorizontal: 20,
          borderColor: 'grey',
          borderWidth: 0.3,
        }}>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              letterSpacing: 0,
              fontFamily: 'Helvetica Neue',
              fontWeight: '400',
            }}>
            We have sent you an email at {email}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: 'grey',
              fontSize: 15,
              letterSpacing: 0,
              fontFamily: 'Helvetica Neue',
              fontWeight: '300',
            }}>
            The link expires in 24 hours
          </Text>
          {isVerified ? (
            <Text
              style={{
                marginTop: 25,
                color: 'dodgerblue',
                fontSize: 20,
                fontFamily: 'Helvetica',
                fontWeight: '500',
              }}>
              Verified
            </Text>
          ) : (
            <Text
              style={{
                marginTop: 25,
                color: 'crimson',
                fontSize: 20,
                fontFamily: 'Helvetica',
                fontWeight: '300',
              }}>
              Not Verified
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={handleCheck}
          style={{
            width: 75,
            marginVertical: 10,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#4640C1',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Check</Text>
        </TouchableOpacity>
        <View style={{marginTop: 25}}>
          <Text
            style={{
              color: constants.text2,
              fontSize: 17,
              letterSpacing: 0,
              fontFamily: 'Helvetica Neue',
              fontWeight: '500',
            }}>
            Didn't receive an email ?
          </Text>
          <TouchableOpacity onPress={handleEmailConfirmation}>
            <Text
              style={{
                color: 'dodgerblue',
                fontSize: 16,
                fontWeight: '500',
                marginTop: 10,
              }}>
              Resend Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
