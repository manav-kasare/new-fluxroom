import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {PickImage} from '../../../shared/PickImage';
import Feather from 'react-native-vector-icons/Feather';

import randomID from '../../../backend/database/randomID';
import {createRoom} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';

export default function CreateRoom({navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const [_createRoom, setCreateRoom] = useState(false);
  const [room, setRoom] = useState({
    name: '',
    description: '',
    profilePhoto: undefined,
    id: '',
  });

  const pickImage = () => {
    const uri = PickImage();
    setRoom({...room, profilePhoto: uri});
  };

  const handleCreateRoom = () => {
    const id = randomID();
    setRoom({...room, id: id});
    createRoom(user.id).then((responseText) => {
      if (responseText === 'success') {
        setCreateRoom(!_createRoom);
      } else {
        alert('An Error Occured !');
      }
    });
  };

  if (_createRoom) {
    navigation.replace('ChatRoomNavigator', {
      screen: 'ShareRoomLink',
      params: {roomName: room.name, roomID: room.id},
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
        <Appbar.Header style={constants.header}>
          <Appbar.Content
            title="Create Room"
            titleStyle={constants.headerText}
          />
          <Appbar.Action
            icon="menu"
            color={constants.background2}
            onPress={() => navigation.openDrawer()}
          />
        </Appbar.Header>
        <View
          style={{
            flex: 1,
            paddingVertical: 25,
            alignItems: 'center',
            backgroundColor: constants.background1,
          }}>
          <View>
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                borderColor: 'grey',
                borderWidth: 0.2,
                alignContent: 'center',
                backgroundColor: constants.background4,
              }}
              onPress={pickImage}>
              {room.profilePhoto === undefined ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Feather name="camera" size={25} color="white" />
                </View>
              ) : (
                <Image
                  style={{
                    width: 98,
                    height: 98,
                    borderRadius: 98 / 2,
                  }}
                  source={{
                    uri: room.profilePhoto,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 25}}>
            <TextInput
              style={constants.input}
              placeholder="Name"
              placeholderTextColor="grey"
              value={room.name}
              onChangeText={(text) => setRoom({...room, name: text})}
            />
            {room.name.length < 4 ? (
              <Text style={{fontFamily: 'Helvetica', color: 'crimson'}}>
                Name must be at least 4 characters
              </Text>
            ) : (
              <></>
            )}
            <TextInput
              style={constants.input}
              placeholder="Description"
              placeholderTextColor="grey"
              value={room.description}
              onChangeText={(text) => setRoom({...room, description: text})}
            />
            <TouchableOpacity
              style={{
                width: constants.width * 0.75,
                height: 45,
                backgroundColor: constants.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginTop: 5,
              }}
              onPress={room.name.length > 3 ? handleCreateRoom : () => {}}>
              <Text
                style={{
                  fontFamily: 'Helvetica',
                  color: constants.text2,
                }}>
                Create Room
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
