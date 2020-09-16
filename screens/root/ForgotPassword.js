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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';
// import {
//   checkIfEmailIsRegistered,
//   forgotPassword,
// } from '../../backend/database/apiCalls';

export default function ForgotPassword({navigation}) {
  const [username, setUsername] = useState(null);

  const forgotPassword = () => {
    navigation.navigate('ForgotPasswordConfirmation', {username: username});
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
            backgroundColor: '#4b00d8',
            alignItems: 'center',
          }}>
          <View>
            <Image
              style={{
                width: constants.width,
                height: constants.height * 0.2,
                marginVertical: 50,
              }}
              resizeMode="contain"
              source={require('/Users/manav/projects/fluxroom/assets/forgot_password.png')}
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
            <View>
              <View style={globalStyles.input}>
                <MaterialCommunityIcons
                  name="email"
                  size={20}
                  color={constants.primary}
                />
                <TextInput
                  style={globalStyles.textInput}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  placeholder="Registered Email Address or Phone Number"
                  placeholderTextColor="grey"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
              <TouchableOpacity
                onPress={forgotPassword}
                style={globalStyles.button}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
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
