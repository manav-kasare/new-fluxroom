import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';
import {CustomToast} from '../../shared/CustomToast';
import {ActivityIndicator} from 'react-native-paper';

export default function ForgotPassword() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const forgotPassword = () => {
    setLoading(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false);
        CustomToast('Email Sent !');
      });
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
            backgroundColor: '#03449e',
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
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <TouchableOpacity
                onPress={forgotPassword}
                style={globalStyles.button}>
                {loading ? (
                  <ActivityIndicator
                    color="white"
                    size="small"
                    animating={true}
                  />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      letterSpacing: 1,
                    }}>
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
}
