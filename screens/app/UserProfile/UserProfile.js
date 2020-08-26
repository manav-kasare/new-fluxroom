import React, {useContext} from 'react';

import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import UserProfilePhoto from './UserProfilePhoto';
import HostedRooms from './HostedRooms';

export default function UserProfile({navigation}) {
  const {user, setUser} = useContext(UserDetailsContext);
  const {constants, darkTheme} = React.useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.background1,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          alignItems: 'center',
          width: constants.width,
          paddingHorizontal: 10,
          paddingBottom: 25,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: darkTheme ? constants.background1 : '#4640C1',
        }}>
        <View
          style={{
            alignItems: 'center',
            width: constants.width,
          }}>
          <UserProfilePhoto />
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              fontFamily: 'Helvetica Neue',
              fontSize: 25,
              marginVertical: 10,
              marginTop: 20,
            }}>
            Manav Kasare
          </Text>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              backgroundColor: 'white',
              width: 50,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={{color: 'black'}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: constants.text1,
            fontWeight: '400',
            fontSize: 30,
            fontFamily: 'Helvetica',
            marginLeft: 25,
            marginBottom: 25,
          }}>
          Hosted Rooms
        </Text>
        <HostedRooms navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}
