import React from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Auth} from 'aws-amplify';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';
import CustomToast from '../../shared/CustomToast';

export default function OtpVerification({route, navigation}) {
  const {username} = route.params;
  const [code, setCode] = React.useState(null);

  const confirmSignUp = async () => {
    console.log(username);
    try {
      await Auth.confirmSignUp(username, code).then((response) => {
        if (response === 'SUCCESS') {
          navigation.navigate('SetupProfile');
        }
      });
    } catch (error) {
      CustomToast('Invalid code');
    }
  };

  const resendConfirmationCode = async () => {
    try {
      await Auth.resendSignUp(username);
      CustomToast('Code resent');
    } catch (err) {
      CustomToast('Error resending code');
    }
  };

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
          <TouchableOpacity style={globalStyles.button} onPress={confirmSignUp}>
            <Text style={globalStyles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.button}
            onPress={resendConfirmationCode}>
            <Text style={globalStyles.buttonText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
