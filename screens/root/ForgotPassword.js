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
import Animated, {
  useCode,
  set,
  eq,
  SpringUtils,
  cond,
} from 'react-native-reanimated';
import {
  useValue,
  mix,
  withSpringTransition,
  withTimingTransition,
} from 'react-native-redash';
import il8n from '../../locales/il8n';

export default function ForgotPassword() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const y = useValue(0);

  const opacityTransition = withTimingTransition(y, {duration: 500});
  const opacity = mix(opacityTransition, 0, 1);

  const positionY = withSpringTransition(y, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });
  const translateY = mix(positionY, constants.height, 0);
  useCode(() => cond((eq(y, 0), set(y, 1))), [y]);

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
          <Animated.View style={{opacity}}>
            <Image
              style={{
                width: constants.width,
                height: constants.height * 0.2,
                marginVertical: 50,
              }}
              resizeMode="contain"
              source={require('../../assets/forgot_password.webp')}
            />
          </Animated.View>
          <Animated.View
            style={{
              flex: 1,
              width: constants.width,
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: 50,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              transform: [{translateY}],
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
                  placeholder={il8n.t('placeholders.forgotPassword')}
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
                    {il8n.t('buttons.submit')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
}
