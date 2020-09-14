import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import ReactNativeHaptic from 'react-native-haptic';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import globalStyles from '../../shared/GlobalStyles';
import CustomToast, {CustomErrorToast} from '../../shared/CustomToast';
import {
  ThemeContext,
  UserDetailsContext,
  TokenContext,
} from '../../shared/Context';
import {getUserByPhone, loginUser} from '../../backend/database/apiCalls';
import {storeToken} from '../../shared/KeyChain';
import {storeUserData, storeTheme} from '../../shared/AsyncStore';

export default OtpVerification = ({
  isVisible,
  confirmation,
  setIsVisible,
  setConfirmation,
  phoneNumber,
  navigation,
  setIsLoading,
}) => {
  const {setUser} = React.useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);
  const [code, setCode] = React.useState(null);
  const {setToken} = React.useContext(TokenContext);
  const [isLoadingCode, setIsLoadingCode] = React.useState(false);
  const [isLoadingResendCode, setIsLoadingResendCode] = React.useState(false);

  const confirmSignUp = async () => {
    setIsLoadingCode(true);
    try {
      await confirmation.confirm(code).then((userInfo) => {
        ReactNativeHaptic.generate('notificationSuccess');
        setIsVisible(false);
        if (userInfo.additionalUserInfo.isNewUser) {
          setIsLoadingCode(false);
          navigation.navigate('SetUpProfile', {
            phoneNumber: phoneNumber,
            phoneData: userInfo,
          });
        } else {
          const encodedPhoneNumber = phoneNumber.replace(/\+/gi, '%2B');
          getUserByPhone(encodedPhoneNumber).then((user) => {
            console.log('[Get user by phone]', user);
            loginUser({
              username: user.username,
              password: '89337133-17c9-42e3-9fef-78416a25651a',
            }).then((response) => {
              console.log('[Login user]', response);
              if (response.err) {
                setIsLoadingCode(false);
                ReactNativeHaptic.generate('notificationError');
                CustomErrorToast('An Error Occured !');
              } else {
                ReactNativeHaptic.generate('notificationSuccess');
                storeToken(response.user._id, response.token).then(() => {
                  setToken(response.token);
                  storeUserData(response.user);
                  storeTheme('light');
                  setIsLoadingCode(false);
                  setUser(response.user);
                });
              }
            });
          });
        }
      });
    } catch (error) {
      console.log(error);
      ReactNativeHaptic.generate('notificationError');
      setIsLoadingCode(false);
      CustomErrorToast('Invalid Code !');
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 25,
      }}
      animationIn="fadeIn"
      animationInTiming={500}
      animationOut="fadeOut">
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
