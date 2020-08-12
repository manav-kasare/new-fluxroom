import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';

import RoomPhotoTile from './RoomPhotoTile';
import {getChatroomInfo} from '../../../backend/database/apiCalls';
import {ThemeContext} from '../../../shared/Context';

export default function RoomTile({id, navigation}) {
  const {constants} = React.useContext(ThemeContext);
  // const [room, setRoom] = useState({
  //   name: null,
  //   description: null,
  //   profilePhoto: '',
  //   members: [],
  //   host: null,
  // });
  const [room, setRoom] = useState({
    name: `room ${id}`,
    description: `description ${id}`,
    profilePhoto:
      'https://images.unsplash.com/photo-1597075349517-0deb1e127c37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
    members: [],
    host: null,
  });

  // useEffect(() => {
  //   getChatroomInfo(id, 'room').then((data) => {
  //     setRoom({
  //       name: data.name,
  //       description: data.description,
  //       profilePhoto: data.profile_photo,
  //       host: JSON.parse(data.members).host,
  //       members: JSON.parse(data.members).members,
  //     });
  //   });
  // }, []);

  return (
    <TouchableOpacity
      style={{
        width: constants.width,
        height: constants.height * 0.1,
        justifyContent: 'center',
        marginHorizontal: 10,
        flexDirection: 'row',
      }}
      onPress={() =>
        navigation.navigate('ChatRoomNavigator', {
          screen: 'Room',
          params: {
            room: room,
          },
        })
      }>
      <View
        style={{
          width: constants.width,
          height: constants.height * 0.1,
          marginLeft: 25,
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomColor: constants.lineColor,
          borderBottomWidth: 0.5,
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('RoomFullPhoto')}>
          <RoomPhotoTile profilePhoto={room.profilePhoto} />
        </TouchableOpacity>

        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              color: constants.text1,
              marginLeft: 10,
              fontSize: 20,
              fontWeight: '600',
            }}>
            {room.name}
          </Text>
          <Text
            style={{
              color: 'grey',
              marginLeft: 10,
              fontSize: 14,
              fontWeight: '400',
            }}>
            {room.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
