import React from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import ReactNativeHaptic from 'react-native-haptic';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';
import CustomToast from '../../shared/CustomToast';

export default function OtpVerification({route, navigation}) {
  const {username, type} = route.params;
  const [code, setCode] = React.useState(null);
  const [isLoadingCode, setIsLoadingCode] = React.useState(false);
  const [isLoadingResendCode, setIsLoadingResendCode] = React.useState(false);

  const confirmSignUp = async () => {};

  const resendConfirmationCode = async () => {};

  return (
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
        }}>
        <Image
          style={{
            width: constants.width,
            marginVertical: 30,
            height: constants.height * 0.2,
          }}
          resizeMode="contain"
          source={require('/Users/manav/projects/fluxroom/assets/otp.png')}
        />
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
          <Text
            style={{
              color: 'black',
              fontFamily: 'Helvetica',
              fontWeight: '500',
            }}>
            We have sent your code at {username}
          </Text>
          <View style={globalStyles.input}>
            <MaterialCommunityIcons
              name="barcode"
              size={18}
              color={constants.primary}
            />
            <TextInput
              autoFocus={true}
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
            <TouchableOpacity
              style={globalStyles.button}
              onPress={confirmSignUp}>
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
        </View>
      </SafeAreaView>
    </View>
  );
}
