import React, {useContext} from 'react';

import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import UserProfilePhoto from './UserProfilePhoto';
import HostedRooms from './HostedRooms';

export default function UserProfile({navigation}) {
  const {user, setUser} = useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);

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
          flexDirection: 'row',
          alignItems: 'center',
          width: constants.width,
          marginTop: 25,
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <UserPrPPofilePhoto />
          <View
            style={{
              height: 40,
              marginLeft: 20,
            }}>
            <Text
              style={{
                color: constants.text1,
                fontWeight: '400',
                fontFamily: 'Helvetica',
                fontSize: 25,
              }}>
              {user.username}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontFamily: 'Helvetica',
                fontWeight: '300',
                fontSize: 15,
              }}>
              {user.description}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 30,
            backgroundColor: constants.primary,
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate('EditProfile')}>
          <Text style={{color: 'white'}}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: constants.width,
          height: constants.height * 0.2,
          backgroundColor: constants.background1,
        }}
      />
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
