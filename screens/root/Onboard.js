import React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';

import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';

import Google from './Google';
import Facebook from './Facebook';
import Phone from './Phone';

export default function Onboard({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4640C1',
      }}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <View
        style={{
          marginTop: 50,
        }}>
        <Text
          style={{
            marginTop: 30,
            color: 'white',
            fontWeight: '800',
            fontSize: 30,
            letterSpacing: 2,
            fontFamily: 'Helvetica Neue',
            alignSelf: 'center',
          }}>
          FLUXROOM
        </Text>
      </View>
      <View
        style={{
          paddingVertical: 30,
          position: 'absolute',
          bottom: 0,
          width: constants.width,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 50,
          backgroundColor: 'white',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          borderWidth: 1,
        }}>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <View>
            <TouchableOpacity
              style={globalStyles.screenButton}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={globalStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={globalStyles.screenButton}
              onPress={() => navigation.navigate('LogIn')}>
              <Text style={globalStyles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
