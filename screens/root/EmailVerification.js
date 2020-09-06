import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';

import {ThemeContext} from '../../shared/Context';
import CustomToast from '../../shared/CustomToast';

export default function EmailVerification({
  isVisible,
  setIsVisible,
  navigation,
  userInfo,
  email,
}) {
  const {constants} = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);

  const checkVerification = async () => {
    setLoading(true);
    const emailVerified = await auth().currentUser.emailVerified;
    // if (emailVerified) {
    //   setLoading(false);
    setLoading(false);
    navigation.navigate('SetUpProfile', {email: email});
    setIsVisible(false);
    // } else {
    //   setLoading(false);
    //   CustomToast('Email not verified');
    // }
  };

  const resendEmail = async () => {
    setResendLoading(true);
    try {
      await userInfo.user.sendEmailVerification.then(() => {
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      deviceWidth={constants.width}
      deviceHeight={constants.height}
      style={{
        width: constants.width * 0.9,
        borderRadius: 10,
        position: 'absolute',
        bottom: 0,
        height: constants.height * 0.25,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 25,
      }}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOut="slideOutDown">
      <View
        style={{
          backgroundColor: 'grey',
          height: 5,
          width: 50,
          alignSelf: 'center',
          borderRadius: 10,
          position: 'absolute',
          top: 10,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          fontWeight: '400',
          fontFamily: 'Helvetica Neue',
          marginBottom: 15,
        }}>
        Please verify your email address
      </Text>
      {loading ? (
        <View
          style={{
            height: 50,
            width: constants.width * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
          }}>
          <ActivityIndicator color="#0d0c0a" size="small" />
        </View>
      ) : (
        <TouchableOpacity
          style={{
            width: constants.width * 0.7,
            height: 50,
            backgroundColor: '#4640C1',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginVertical: 10,
          }}
          onPress={checkVerification}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              letterSpacing: 1,
              fontFamily: 'Helvetica',
            }}>
            Check
          </Text>
        </TouchableOpacity>
      )}
      {resendLoading ? (
        <View
          style={{
            height: 50,
            width: constants.width * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
          }}>
          <ActivityIndicator color="#0d0c0a" size="small" />
        </View>
      ) : (
        <TouchableOpacity
          style={{
            width: constants.width * 0.7,
            height: 50,
            backgroundColor: '#4640C1',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginVertical: 10,
          }}
          onPress={resendEmail}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              letterSpacing: 1,
              fontFamily: 'Helvetica',
            }}>
            Resend Email
          </Text>
        </TouchableOpacity>
      )}
    </Modal>
  );
}
