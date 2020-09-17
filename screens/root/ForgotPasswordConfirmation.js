import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useCode,
  cond,
  set,
  eq,
  SpringUtils,
} from 'react-native-reanimated';
import {useValue, withSpringTransition} from 'react-native-redash';

import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';
import CachedImage from '../../shared/CachedImage';

export default function ForgotPasswordConfirmation({route}) {
  const {username} = route.params;
  const [code, setCode] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [revealPassword, setRevealPassword] = useState(false);

  const positionX = useValue(constants.width * 2);
  useCode(() => cond(eq(positionX, constants.width * 2), set(positionX, 0)));
  const slideAnimationX = withSpringTransition(positionX, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });

  const positionY = useValue(constants.height);
  useCode(() => cond(eq(positionY, constants.height), set(positionY, 0)));
  const slideAnimationY = withSpringTransition(positionY, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });

  const toggleRevealPassword = () => {
    setRevealPassword(!revealPassword);
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
            backgroundColor: '#3f00a6',
            alignItems: 'center',
          }}>
          <Animated.View style={{transform: [{translateX: slideAnimationX}]}}>
            <CachedImage
              style={{
                width: constants.width,
                height: constants.height * 0.2,
                marginVertical: 50,
              }}
              resizeMode="contain"
              uri="/Users/manav/projects/fluxroom/assets/change_password.png"
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
              paddingHorizontal: 50,
              transform: [{translateY: slideAnimationY}],
            }}>
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
                onPress={toggleRevealPassword}>
                {revealPassword ? (
                  <Entypo name="eye" size={18} color="#0d0c0a" />
                ) : (
                  <Entypo name="eye-with-line" size={18} color="#0d0c0a" />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={globalStyles.button}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  letterSpacing: 1,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
}
