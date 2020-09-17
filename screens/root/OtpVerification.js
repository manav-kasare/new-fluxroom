import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import ReactNativeHaptic from 'react-native-haptic';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {CustomErrorToast} from '../../shared/CustomToast';
import {UserDetailsContext, TokenContext} from '../../shared/Context';
import {getUserByPhone, loginUser} from '../../backend/database/apiCalls';
import {storeToken} from '../../shared/KeyChain';
import {storeUserData, storeTheme} from '../../shared/AsyncStore';
import globalStyles from '../../shared/GlobalStyles';
import constants from '../../shared/constants';

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
            loginUser({
              username: user.username,
              password: '89337133-17c9-42e3-9fef-78416a25651a',
            }).then((response) => {
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

  const styles = StyleSheet.create({
    input: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 50,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      marginTop: 15,
      marginHorizontal: 5,
      borderRadius: 8,
      borderColor: 'grey',
      borderWidth: 0.3,
    },
  });

  return (
    <Portal>
      <Dialog visible={isVisible} dismissable={false}>
        <Dialog.Content>
          <Paragraph style={{color: 'grey'}}>
            We have sent you an email at phoneNumber
          </Paragraph>
          <View style={styles.input}>
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
        </Dialog.Content>
        <Dialog.Actions>
          {isLoadingResendCode ? (
            <ActivityIndicator color="#3f00a6" size="small" />
          ) : (
            <Button color="#3f00a6" onPress={resendConfirmationCode}>
              Resend Code
            </Button>
          )}
          {isLoadingCode ? (
            <ActivityIndicator color="#3f00a6" size="small" />
          ) : (
            <Button color="#3f00a6" onPress={confirmSignUp}>
              Verify
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  // return (
  //   <Modal
  //     isVisible={isVisible}
  //     useNativeDriver={true}
  //     hideModalContentWhileAnimating={true}
  //     deviceWidth={constants.width}
  //     deviceHeight={constants.height}
  //     style={{
  //       width: constants.width * 0.9,
  //       borderRadius: 10,
  //       position: 'absolute',
  //       bottom: constants.height / 3,
  //       backgroundColor: 'white',
  //       alignItems: 'center',
  //       justifyContent: 'space-around',
  //       paddingVertical: 25,
  //     }}
  //     animationIn="fadeIn"
  //     animationInTiming={500}
  //     animationOut="fadeOut">
  //     <View
  //       style={{
  //         backgroundColor: 'grey',
  //         height: 5,
  //         width: 50,
  //         alignSelf: 'center',
  //         borderRadius: 10,
  //         position: 'absolute',
  //         top: 10,
  //       }}
  //     />
  //     <Text
  //       style={{
  //         color: 'black',
  //         fontFamily: 'Helvetica Neue',
  //         fontWeight: '400',
  //       }}>
  //       We have sent your code at {phoneNumber}
  //     </Text>
  //     <View style={globalStyles.input}>
  //       <MaterialCommunityIcons
  //         name="barcode"
  //         size={18}
  //         color={constants.primary}
  //       />
  //       <TextInput
  //         keyboardType="number-pad"
  //         style={globalStyles.textInput}
  //         placeholder="Verification Code"
  //         placeholderTextColor="grey"
  //         value={code}
  //         onChangeText={(text) => setCode(text)}
  //         autoCapitalize="none"
  //       />
  //     </View>
  //     {isLoadingCode ? (
  //       <View
  //         style={{
  //           height: 50,
  //           width: constants.width * 0.8,
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           marginBottom: 25,
  //         }}>
  //         <ActivityIndicator color="#0d0c0a" size="small" />
  //       </View>
  //     ) : (
  //       <TouchableOpacity style={globalStyles.button} onPress={confirmSignUp}>
  //         <Text style={globalStyles.buttonText}>Verify Code</Text>
  //       </TouchableOpacity>
  //     )}
  //     {isLoadingResendCode ? (
  //       <View
  //         style={{
  //           height: 50,
  //           width: constants.width * 0.8,
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           marginBottom: 25,
  //         }}>
  //         <ActivityIndicator color="#0d0c0a" size="small" />
  //       </View>
  //     ) : (
  //       <TouchableOpacity
  //         style={globalStyles.button}
  //         onPress={resendConfirmationCode}>
  //         <Text style={globalStyles.buttonText}>Resend Code</Text>
  //       </TouchableOpacity>
  //     )}
  //   </Modal>
  // );
};
