import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ReactNativeHaptic from 'react-native-haptic';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../../shared/GlobalStyles';
import CustomToast from '../../shared/CustomToast';
import {ThemeContext, UserDetailsContext} from '../../shared/Context';
import {getUserByPhone, loginUser} from '../../backend/database/apiCalls';
import {storeToken} from '../../shared/KeyChain';

export default OtpVerification = ({
  isVisible,
  confirmation,
  setIsVisible,
  setConfirmation,
  phoneNumber,
  navigation,
}) => {
  const {setUser} = React.useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);
  const [code, setCode] = React.useState(null);
  const [isLoadingCode, setIsLoadingCode] = React.useState(false);
  const [isLoadingResendCode, setIsLoadingResendCode] = React.useState(false);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      AsyncStorage.setItem('user', jsonValue).then(() => {
        setUser(value);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const confirmSignUp = async () => {
    setIsLoadingCode(true);
    try {
      await confirmation.confirm(code).then((userInfo) => {
        setIsLoadingCode(false);
        ReactNativeHaptic.generate('notificationSuccess');
        setIsVisible(false);
        if (userInfo.additionalUserInfo.isNewUser) {
          navigation.navigate('SetUpProfile', {
            phoneNumber: phoneNumber,
            phoneData: userInfo,
          });
        } else {
          getUserByPhone(phoneNumber).then((response) => {
            loginUser({
              username: response.username,
              password: '89337133-17c9-42e3-9fef-78416a25651a',
            }).then((_response) => {
              if (_response.err) {
                setLoading(false);
                ReactNativeHaptic.generate('notificationError');
                CustomToast('An Error Occured');
              } else {
                ReactNativeHaptic.generate('notificationSuccess');
                setLoading(false);
                storeToken(_response.user._id, _response.token);
                storeData(_response.user);
                setUser(_response.user);
              }
            });
          });
        }
      });
    } catch (error) {
      ReactNativeHaptic.generate('notificationError');
      setIsLoadingCode(false);
      CustomToast('Invalid code.');
    }
  };

  const resendConfirmationCode = async () => {
    setIsLoadingResendCode(true);
    await auth()
      .signInWithPhoneNumber(phoneNumber)
      .then((_confirmation) => {
        setConfirmation(_confirmation);
        setIsLoadingResendCode(false);
      });
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
        bottom: constants.height / 3,
        backgroundColor: constants.background1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 25,
      }}
      animationIn="fadeIn"
      animationInTiming={500}
      animationOut="fadeOut">
      <Text
        style={{
          color: 'black',
          fontFamily: 'Helvetica Neue',
          fontWeight: '400',
        }}>
        We have sent your code at {phoneNumber}
      </Text>
      <View style={globalStyles.input}>
        <MaterialCommunityIcons
          name="barcode"
          size={18}
          color={constants.primary}
        />
        <TextInput
          keyboardType="number-pad"
          style={globalStyles.textInput}
          placeholder="Verification Code"
          placeholderTextColor="grey"
          value={code}
          onChangeText={(text) => setCode(text)}
          autoCapitalize="none"
        />
      </View>
      {isLoadingCode ? (
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
        <TouchableOpacity style={globalStyles.button} onPress={confirmSignUp}>
          <Text style={globalStyles.buttonText}>Verify Code</Text>
        </TouchableOpacity>
      )}
      {isLoadingResendCode ? (
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
          style={globalStyles.button}
          onPress={resendConfirmationCode}>
          <Text style={globalStyles.buttonText}>Resend Code</Text>
        </TouchableOpacity>
      )}
    </Modal>
  );
};
