import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import {Appbar} from 'react-native-paper';

import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';
import CustomToast from '../../shared/CustomToast';
import {getUserInfo, emailConfirmation} from '../../backend/database/apiCalls';

export default function EmailVerification({route, navigation}) {
  const {email, id} = route.params;
  const [isVerified, setIsVerified] = useState(false);
  const position = useState(new Animated.Value(constants.width))[0];

  useEffect(() => {
    Animated.spring(position, {
      bounciness: 5,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCheck = () => {
    getUserInfo(id).then((data) => {
      if (Boolean(data.confirmed)) {
        navigation.push('SetUpProfile', {id: id});
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    });
  };

  // Resending Email for Confirmation
  const handleEmailConfirmation = () => {
    emailConfirmation(id, email).then((responseText) => {
      if (responseText !== 'success') {
        CustomToast('An Error Occured');
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
      <Animated.View
        style={{
          transform: [{translateX: position}],
        }}>
        <Appbar.Header style={globalStyles.rootAppbarHeader}>
          <Appbar.Content
            title="Verify your Email"
            titleStyle={globalStyles.rootAppbarTitle}
          />
        </Appbar.Header>
      </Animated.View>
      <Animated.View
        style={{
          width: constants.width * 0.9,
          backgroundColor: constants.background2,
          borderRadius: 10,
          paddingVertical: 50,
          transform: [{translateX: position}],
          alignSelf: 'center',
          marginTop: 100,
          paddingHorizontal: 10,
        }}>
        <View>
          <Text
            style={{
              color: constants.text2,
              fontSize: 17,
              letterSpacing: 0,
              fontFamily: 'Helvetica Neue',
              fontWeight: '500',
            }}>
            We have sent you an email at {email}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: 'grey',
              fontSize: 15,
              letterSpacing: 0,
              fontFamily: 'Helvetica Neue',
              fontWeight: '300',
            }}>
            The link expires in 24 hours
          </Text>
          {isVerified ? (
            <Text
              style={{
                marginTop: 25,
                color: 'dodgerblue',
                fontSize: 20,
                fontFamily: 'Helvetica',
                fontWeight: '500',
              }}>
              Verified
            </Text>
          ) : (
            <Text
              style={{
                marginTop: 25,
                color: 'crimson',
                fontSize: 20,
                fontFamily: 'Helvetica',
                fontWeight: '300',
              }}>
              Not Verified
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={handleCheck}
          style={{
            width: 75,
            marginVertical: 10,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: constants.primary,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Check</Text>
        </TouchableOpacity>
        <View style={{marginTop: 25}}>
          <Text
            style={{
              color: constants.text2,
              fontSize: 17,
              letterSpacing: 0,
              fontFamily: 'Helvetica Neue',
              fontWeight: '500',
            }}>
            Didn't receive an email ?
          </Text>
          <TouchableOpacity onPress={handleEmailConfirmation}>
            <Text
              style={{
                color: 'dodgerblue',
                fontSize: 16,
                fontWeight: '500',
                marginTop: 10,
              }}>
              Resend Email
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
