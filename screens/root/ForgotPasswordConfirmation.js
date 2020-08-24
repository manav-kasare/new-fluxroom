import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';

export default function ForgotPasswordConfirmation({route}) {
  const {username} = route.params;
  const [code, setCode] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [revealPassword, setRevealPassword] = useState(false);

  const forgotPasswordConfirmation = () => {
    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <KeyboardAwareScrollView
      style={{width: constants.width, height: constants.height}}
      keyboardShouldPersistTaps="handled">
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
              height: constants.height * 0.2,
              marginVertical: 50,
            }}
            resizeMode="contain"
            source={require('/Users/manav/projects/fluxroom/assets/change_password.png')}
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
              paddingHorizontal: 50,
            }}>
            <View>
              <Text style={{fontFamily: 'Helvetica', marginBottom: 10}}>
                We have sent you a confirmation code at your registered Email
                Address or Phone number
              </Text>
              <View style={globalStyles.input}>
                <MaterialCommunityIcons
                  name="barcode"
                  size={18}
                  color={constants.primary}
                />
                <TextInput
                  autoFocus={true}
                  style={globalStyles.textInput}
                  keyboardType="number-pad"
                  placeholder="Confirmation Code"
                  placeholderTextColor="grey"
                  value={code}
                  onChangeText={(text) => setCode(text)}
                />
              </View>
              <View style={globalStyles.input}>
                <Entypo name="key" size={22} color="#0d0c0a" />
                <TextInput
                  autoFocus={true}
                  style={globalStyles.textInput}
                  secureTextEntry={revealPassword ? false : true}
                  placeholder="New Password"
                  placeholderTextColor="grey"
                  value={newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                />
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'red',
                  }}
                  onPress={() => setRevealPassword(!revealPassword)}>
                  {revealPassword ? (
                    <Entypo name="eye" size={18} color="#0d0c0a" />
                  ) : (
                    <Entypo name="eye-with-line" size={18} color="#0d0c0a" />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={forgotPasswordConfirmation}
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
      </View>
    </KeyboardAwareScrollView>
  );
}
