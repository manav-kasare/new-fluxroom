import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import MatericalIcons from 'react-native-vector-icons/MaterialIcons';

import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import UserProfilePhoto from './UserProfilePhoto';

export default function UserProfile({navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.background1,
        alignItems: 'center',
      }}>
      <ProfileComponent navigation={navigation} />
    </SafeAreaView>
  );
}

const ProfileComponent = ({navigation}) => {
  const {user} = React.useContext(UserDetailsContext);
  const {constants, darkTheme} = React.useContext(ThemeContext);

  return (
    <View
      style={{
        alignItems: 'center',
        width: constants.width,
        height: constants.height * 0.4,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: darkTheme ? constants.background3 : constants.primary,
      }}>
      <UserProfilePhoto />
      <View
        style={{
          width: constants.width,
          height: 75,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 25,
          marginTop: 10,
        }}>
        <Text
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontWeight: '400',
            fontFamily: 'Helvetica Neue',
            fontSize: 14,
            marginRight: 50,
          }}>
          Username
        </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontFamily: 'Helvetica Neue',
            fontSize: 16,
          }}>
          {user.username}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: constants.width,
          height: 75,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 25,
        }}>
        <Text
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontWeight: '400',
            fontFamily: 'Helvetica Neue',
            fontSize: 14,
            marginRight: 50,
          }}>
          Description
        </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontFamily: 'Helvetica Neue',
            fontSize: 16,
          }}>
          {user.description}
        </Text>
        <MatericalIcons
          name="edit"
          color="white"
          size={20}
          style={{position: 'absolute', right: 25}}
        />
      </TouchableOpacity>
    </View>
  );
};
