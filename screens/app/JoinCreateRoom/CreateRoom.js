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
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import randomID from '../../../backend/database/randomID';
import {createRoom} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';

export default function CreateRoom({navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const [room, setRoom] = useState({
    name: '',
    description: '',
    profilePhoto: undefined,
    id: '',
  });

  const handleCreateRoom = () => {
    const _randomID = randomID();
    setRoom({...room, id: _randomID});

    navigation.navigate('ShareRoomLink', {room: room});

    // createRoom(user.id, room).then((responseText) => {
    //   if (responseText === 'success') {

    //   } else {
    //     alert('An Error Occured !');
    //   }
    // });
  };

  const pickImage = () => {
    const options = {
      title: 'Select Image',
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else {
        setRoom({...room, profilePhoto: response.uri});
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const anon = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: constants.background1,
          paddingVertical: 25,
          alignItems: 'center',
        }}>
        <View style={{marginTop: 50}}>
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
              width: constants.width * 0.8,
              height: 45,
              backgroundColor: constants.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              marginTop: 15,
            }}
            onPress={room.name.length > 3 ? handleCreateRoom : anon}>
            <Text
              style={{
                fontFamily: 'Helvetica',
                color: 'white',
              }}>
              Create Room
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
