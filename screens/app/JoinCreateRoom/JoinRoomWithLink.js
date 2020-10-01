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
import il8n from '../../../locales/il8n';

export default function JoinRoomWithLink({route, navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {token} = React.useContext(TokenContext);
  const [loading, setLoading] = React.useState(false);
  const {user, setUser} = React.useContext(UserDetailsContext);
  const {id} = route.params;
  const [noRoomExists, setNoRoomExists] = React.useState(false);
  const [room, setRoom] = React.useState({
    name: '',
    description: '',
  });

  React.useEffect(() => {
    checkIfAlreadyJoined();
    getData();
  }, []);

  const getData = () => {
    getChatroomInfo(id).then((response) => {
      if (response.message === 'No room with this ID exists') {
        setNoRoomExists(true);
      } else {
        setRoom({
          ...room,
          name: response.name,
          description: response.description,
        });
      }
    });
  };

  const checkIfAlreadyJoined = () => {
    user.joinedRooms.map((_id) => {
      if (_id === id) {
        navigation.replace('Room', {
          id: id,
        });
      }
    });
  };

  const handleJoinRoom = () => {
    setLoading(true);
    joinRoom(id, token).then((response) => {
      storeUserData(response).then(() => {
        setUser(response);
        setLoading(false);
        navigation.replace('Room', {
          id: id,
        });
      });
    });
  };

  const handleClose = () => {
    navigation.replace('Home');
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
              fontSize: 20,
              color: constants.text1,
              marginBottom: 10,
            }}>
            {room.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'grey',
              marginBottom: 10,
            }}>
            {room.description}
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
            {loading ? (
              <ActivityIndicator color="white" size="small" animating={true} />
            ) : (
              <Text
                style={{
                  fontFamily: 'Helvetica',
                  color: 'white',
                  fontSize: 15,
                }}>
                {il8n.t('buttons.joinRoom')}
              </Text>
            )}
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
            onPress={handleClose}>
            <Text
              style={{
                fontFamily: 'Helvetica',
                color: 'white',
                fontSize: 15,
              }}>
              {il8n.t('buttons.close')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
