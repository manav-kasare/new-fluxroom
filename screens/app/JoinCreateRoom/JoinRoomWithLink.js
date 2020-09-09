import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import {getChatroomInfo} from '../../../backend/database/apiCalls';
import {ThemeContext} from '../../../shared/Context';
import {joinRoom} from '../../../backend/database/apiCalls';

export default function JoinRoomWithLink({route, navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {token} = React.useContext(TokenContext);
  // const {id} = route.params;
  const [room, setRoom] = React.useState(null);

  const getRoomInfo = () => {
    getChatroomInfo(id).then((response) => {
      setRoom(response);
    });
  };

  React.useEffect(() => {
    getRoomInfo();
  }, []);

  const handleJoinRoom = () => {
    joinRoom(id, token).then((response) => {
      // navigation.replace('ChatRoomNavigator', {
      //   screen: 'Room',
      //   params: {roomID: room._id},
      // });
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <View
        style={{
          flex: 1,
          paddingVertical: 25,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            color: constants.text1,
            fontWeight: '700',
            marginBottom: 10,
          }}>
          {room.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: constants.text1,
            fontWeight: '300',
            marginBottom: 10,
          }}>
          {room.listOfUsers} speakers
        </Text>
        <TouchableOpacity
          style={{
            width: constants.width * 0.65,
            height: 40,
            flexDirection: 'row',
            marginTop: 25,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginHorizontal: 10,
            backgroundColor: constants.primary,
          }}
          onPress={handleJoinRoom}>
          <Text
            style={{
              fontFamily: 'Helvetica',
              color: 'white',
              fontSize: 15,
            }}>
            Join Room
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: constants.width * 0.65,
            height: 40,
            flexDirection: 'row',
            marginTop: 25,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginHorizontal: 10,
            backgroundColor: constants.primary,
          }}
          onPress={() => navigation.replace('DrawerNavigator')}>
          <Text
            style={{
              fontFamily: 'Helvetica',
              color: 'white',
              fontSize: 15,
            }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
