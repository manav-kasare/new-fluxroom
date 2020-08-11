import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import RoomPhotoTile from '../ChatRoom/RoomPhotoTile';
import {ThemeContext} from '../../../shared/Context';

const UserTile = React.memo(
  ({username, description, profilePhoto, navigation}) => {
    const {constants} = React.useContext(ThemeContext);
    return (
      <View
        style={{
          width: constants.width,
          height: constants.height * 0.09,
          backgroundColor: constants.background1,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: constants.width,
            height: constants.height * 0.09,
            marginLeft: 25,
            backgroundColor: constants.background1,
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomColor: constants.lineColor,
            borderBottomWidth: 0.2,
          }}>
          <RoomPhotoTile profilePhoto={profilePhoto} navigation={navigation} />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: constants.text1,
                marginLeft: 10,
                fontSize: 20,
                fontWeight: '600',
              }}>
              {username}
            </Text>
            <Text
              style={{
                color: 'grey',
                marginLeft: 10,
                fontSize: 14,
                fontWeight: '400',
              }}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    );
  },
);

export default UserTile;
