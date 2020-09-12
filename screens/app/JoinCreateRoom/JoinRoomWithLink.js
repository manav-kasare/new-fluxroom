import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import {getChatroomInfo} from '../../../backend/database/apiCalls';
import {
  ThemeContext,
  UserDetailsContext,
  TokenContext,
} from '../../../shared/Context';
import {joinRoom} from '../../../backend/database/apiCalls';
import {storeUserData} from '../../../shared/AsyncStore';

export default function JoinRoomWithLink({route, navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {token} = React.useContext(TokenContext);
  const {user, setUser} = React.useContext(UserDetailsContext);
  const {id} = route.params;
  const [room, setRoom] = React.useState({
    name: '',
    listOfUsers: '',
  });

  React.useEffect(() => {
    checkIfAlreadyJoined();
    getData();
  }, []);

  const getData = () => {
    const url = 'https://fluxroom-backend-beta.herokuapp.com';
    fetch(`${url}/room/${id}`)
      .then((response) => response.text())
      .then((responseData) => {
        alert(responseData);
        console.log('[Chat Room Info]', responseData);
        setRoom(responseData);
      });
  };

  const checkIfAlreadyJoined = () => {
    const rooms = user.joinedRooms;
    rooms.map((_room) => {
      if (_room._id === id) {
        navigation.replace('Room', {room: room});
      }
    });
  };

  const handleJoinRoom = () => {
    joinRoom(room._id, token).then((response) => {
      setUser(response);
      setLoading(false);
      storeUserData(response);
      navigation.replace('ChatRoomNavigator', {
        screen: 'Room',
        params: {room: room},
      });
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
      </View>
    </SafeAreaView>
  );
}
