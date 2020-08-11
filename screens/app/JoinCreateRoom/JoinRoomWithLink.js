import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import {Appbar} from 'react-native-paper';

import {getChatroomInfo} from '../../../backend/database/apiCalls';
import {ThemeContext} from '../../../shared/Context';

export default function JoinRoomWithLink({navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const [room, setRoom] = React.useState({
    id: '',
    name: '',
    membersLength: null,
  });

  React.useEffect(() => {
    const {queryParams} = Linking.parseInitialURLAsync();
    setRoom({...room, id: queryParams.roomID});
    getChatroomInfo(room.id, 'room').then((data) => {
      setRoom({
        ...room,
        name: data.name,
        membersLength: JSON.parse(data.members).members.length,
      });
    });
  }, []);

  const handleJoinRoom = () => {
    navigation.replace('ChatRoomNavigator', {
      screen: 'Room',
      params: {roomID: room.id},
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <Appbar.Header style={constants.header}>
        <Appbar.BackAction
          onPress={() => navigation.replace('ChatRoomNavigator')}
        />
        <Appbar.Content title="Join Room" titleStyle={constants.headerText} />
      </Appbar.Header>
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
          {room.membersLength} members
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
            backgroundColor: constants.background2,
          }}
          onPress={handleJoinRoom}>
          <Text
            style={{
              fontFamily: 'Helvetica',
              color: constants.text2,
              fontSize: 15,
            }}>
            Join Room
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
