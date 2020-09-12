import React from 'react';
import {View, Platform, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import CircleAvatar from '../../../../shared/CircleAvatar';
import {ThemeContext} from '../../../../shared/Context';

export default function RoomHeader({navigation, room}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        width: constants.width,
        height: constants.height * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        backgroundColor: darkTheme ? constants.background1 : constants.primary,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={goBack}>
          {Platform.OS === 'ios' ? (
            <Ionicons name="chevron-back" size={25} color="white" />
          ) : (
            <Ionicons name="arrow-back" size={25} color="white" />
          )}
        </TouchableOpacity>
        <View style={{marginHorizontal: 20}}>
          <CircleAvatar uri={room.profilePic} size={50} />
        </View>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600',
              fontFamily: 'Helvetica',
            }}>
            {room.name}
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 14,
              fontWeight: '400',
              fontFamily: 'Helvetica',
            }}>
            {room.description}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RoomSettings', {
            room: room,
          })
        }>
        <Feather name="menu" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
}
