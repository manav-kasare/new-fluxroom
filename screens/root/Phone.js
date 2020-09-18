import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import * as RNLocalize from 'react-native-localize';

import {ThemeContext} from '../../shared/Context';
import globalStyles from '../../shared/GlobalStyles';
import {CustomErrorToast} from '../../shared/CustomToast';
import OtpVerifiaction from './OtpVerification';
import {ActivityIndicator} from 'react-native-paper';

export default function Phone({navigation}) {
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = React.useState(null);
  const phoneInput = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {constants} = React.useContext(ThemeContext);
  const [isVisible, setIsVisible] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState();

  const signIn = async () => {
    setIsLoading(true);
    Keyboard.dismiss();

    try {
      await auth()
        .signInWithPhoneNumber(formattedPhoneNumber)
        .then((_confirmation) => {
          setConfirmation(_confirmation);
          setIsVisible(true);
        });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      CustomErrorToast('An Error Occured !');
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
          backgroundColor: '#6300f7',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <OtpVerifiaction
          navigation={navigation}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          phoneNumber={formattedPhoneNumber}
          confirmation={confirmation}
          setConfirmation={setConfirmation}
          setIsLoading={setIsLoading}
        />
        <View>
          <Image
            style={{
              width: constants.width,
              marginVertical: 30,
              height: constants.height * 0.2,
            }}
            resizeMode="contain"
            source={require('/Users/manav/projects/fluxroom/assets/phone.png')}
          />
        </View>
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
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode={RNLocalize.getCountry()}
            onChangeText={(text) => {
              setPhoneNumber(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedPhoneNumber(text);
            }}
            containerStyle={{
              marginVertical: 10,
              borderRadius: 8,
              borderColor: 'grey',
              borderWidth: 0.3,
              width: constants.width * 0.8,
              borderRadius: 8,
              padding: 2,
              backgroundColor: 'white',
            }}
            flagButtonStyle={{backgroundColor: 'white'}}
          />
          <TouchableOpacity style={globalStyles.button} onPress={signIn}>
            {isLoading ? (
              <ActivityIndicator color="white" size="small" animating={true} />
            ) : (
              <Text style={globalStyles.buttonText}>Get OTP</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
