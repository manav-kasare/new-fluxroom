import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import MatericalIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

  const styles = {
    view: {
      width: constants.width,
      height: 60,
      paddingHorizontal: 25,
      justifyContent: 'center',
    },
    view_text: {
      color: 'white',
      marginLeft: 25,
      fontSize: 14,
      fontWeight: '500',
    },
    view_touchable: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };

  return (
    <View
      style={{
        alignItems: 'center',
        width: constants.width,
        paddingBottom: 25,
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
            fontSize: 20,
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
            fontSize: 16,
            marginRight: 40,
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
      <View style={styles.view}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.view_touchable}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 5,
            }}>
            <Ionicons name="settings-sharp" size={20} color="white" />
            <Text style={styles.view_text}>Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
