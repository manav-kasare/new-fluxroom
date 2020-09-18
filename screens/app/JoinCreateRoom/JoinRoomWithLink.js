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
import {ActivityIndicator} from 'react-native-paper';

export default function JoinRoomWithLink({route, navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {token} = React.useContext(TokenContext);
  const [loading, setLoading] = React.useState(false);
  const {user, setUser} = React.useContext(UserDetailsContext);
  const {id} = route.params;
  const [noRoomExists, setNoRoomExists] = React.useState(false);
  const [room, setRoom] = React.useState({
    name: '',
  });

  React.useEffect(() => {
    checkIfAlreadyJoined();
    getData();
  }, []);

  const getData = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return fetch(
      `https://fluxroom-backend-beta.herokuapp.com/room/${id}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'No room with this ID exists') {
          setNoRoomExists(true);
        } else {
          setRoom(data);
        }
      });
  };

  const checkIfAlreadyJoined = () => {
    const rooms = user.joinedRooms;
    rooms.map((_room) => {
      if (_room._id === id) {
        navigation.replace('Room', {id: _room._id, title: _room.name});
      }
    });
  };

  const handleJoinRoom = () => {
    setLoading(true);
    joinRoom(room._id, token).then((response) => {
      setUser(response);
      setLoading(false);
      storeUserData(response);
      navigation.replace('Room', {id: room._id, title: room.name});
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      {noRoomExists ? (
        <Text
          style={{
            color: 'crimson',
            fontSize: 20,
            fontWeight: '700',
            alignSelf: 'center',
            marginTop: 25,
          }}>
          No Room such exists !
        </Text>
      ) : (
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
          {loading ? (
            <View
              style={{
                width: constants.width * 0.65,
                height: 40,
                flexDirection: 'row',
                marginTop: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator
                color={constants.primary}
                size="small"
                animating={true}
              />
            </View>
          ) : (
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
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
