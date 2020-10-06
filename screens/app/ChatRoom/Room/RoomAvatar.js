import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CachedImage from '../../../../shared/CachedImage';
import {ThemeContext} from '../../../../shared/Context';
import {getUserInfo} from '../../../../backend/database/apiCalls';

export default function RoomAvatar({id, size, uri, isHost, name}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [handRaised, setHandRaised] = React.useState(true);
  const [user, setUser] = React.useState({
    _id: '',
    username: '',
    profilePic: '',
  });

  React.useEffect(() => {
    getUserInfo(id).then((response) => {
      setUser({
        ...user,
        username: response.username,
        profilePic: response.profilePic,
      });
    });
  }, []);

  return (
    <View style={{marginVertical: 10}}>
      {user.profilePic === undefined || user.profilePic === null ? (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size * 0.4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: darkTheme ? '#212121' : '#868489',
            borderWidth: isHost ? 5 : 0,
            borderColor: isHost ? 'rgba(0, 255,0, 0.3)' : 'transparent',
          }}>
          <FontAwesome5 name="user-alt" color="white" size={20} />
        </View>
      ) : (
        <CachedImage
          style={{
            width: size,
            height: size,
            borderRadius: size * 0.4,
            borderWidth: isHost ? 5 : 0,
            borderColor: isHost ? 'green' : 'transparent',
          }}
          uri={user.profilePic}
        />
      )}

      {/* <View style={{flexDirection: 'row', height: 20}}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            backgroundColor: isSpeaking ? constants.primary : '#ba0000',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            bottom: 20,
          }}>
          {isSpeaking ? (
            <Ionicons size={20} color="white" name="ios-mic-outline" />
          ) : (
            <Ionicons size={20} color="white" name="ios-mic-off-outline" />
          )}
        </View>

        {handRaised ? (
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              backgroundColor: constants.primary,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              bottom: 20,
              left: 35,
            }}>
            <MaterialCommunityIcons size={20} color="white" name="hand" />
          </View>
        ) : (
          <></>
        )}
      </View> */}
      <Text
        style={{
          color: constants.text1,
          fontSize: 16,
          fontWeight: '500',
          marginTop: 10,
          fontFamily: 'Helvetica Neue',
          alignSelf: 'center',
        }}>
        {user.username}
      </Text>
    </View>
  );
}
