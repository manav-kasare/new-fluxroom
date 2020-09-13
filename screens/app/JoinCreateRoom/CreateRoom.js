import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import {Appbar} from 'react-native-paper';

import {createRoom, joinRoom} from '../../../backend/database/apiCalls';
import {
  ThemeContext,
  UserDetailsContext,
  TokenContext,
} from '../../../shared/Context';
import {CustomErrorToast} from '../../../shared/CustomToast';
import ShareRoomLink from './ShareRoomLink';
import CachedImage from '../../../shared/CachedImage';
import {storeUserData} from '../../../shared/AsyncStore';

export default function CreateRoom({navigation}) {
  const {token} = React.useContext(TokenContext);
  const {setUser} = React.useContext(UserDetailsContext);
  const [roomId, setRoomId] = React.useState(null);
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [room, setRoom] = useState({
    name: '',
    description: '',
    profilePic: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shareRoom, setShareRoom] = useState({name: '', _id: ''});

  const handleCreateRoom = () => {
    setLoading(true);
    createRoom(room).then((response) => {
      if (response.err) {
        setLoading(false);
        if (response.err.code === 11000) {
          CustomErrorToast('Room name Already Taken !');
        } else {
          CustomErrorToast('An Error Occured !');
        }
      } else {
        setShareRoom(response.room);
        joinRoom(response.room._id, token).then((_response) => {
          setLoading(false);
          setIsVisible(true);
          setUser(_response);
          storeUserData(_response);
        });
      }
    });
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
        setRoom({...room, profilePic: response.uri});
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const anon = () => {};

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          SafeAreaView
          style={{
            flex: 1,
            backgroundColor: darkTheme
              ? constants.background3
              : constants.primary,
          }}>
          <Appbar.Header style={constants.header}>
            <Appbar.Content
              title="Create Room"
              titleStyle={constants.headerText}
            />
            <Appbar.Action
              icon="menu"
              color="white"
              onPress={() => navigation.openDrawer()}
            />
          </Appbar.Header>
          {isVisible ? (
            <ShareRoomLink
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              navigation={navigation}
              room={shareRoom}
            />
          ) : (
            <></>
          )}
          <View
            style={{
              flex: 1,
              width: constants.width,
              alignItems: 'center',
              backgroundColor: constants.background1,
            }}>
            <View style={{marginTop: 50}}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100 / 2,
                  borderColor: constants.lineColor,
                  borderWidth: 0.5,
                  alignItems: 'center',
                  backgroundColor: constants.primary,
                  justifyContent: 'center',
                }}
                onPress={pickImage}>
                {room.profilePic === undefined ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Feather name="camera" size={25} color="white" />
                  </View>
                ) : (
                  <CachedImage
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 100 / 2,
                    }}
                    uri={room.profilePic}
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
              {loading ? (
                <View style={{height: 50, marginVertical: 10, marginTop: 15}}>
                  <ActivityIndicator
                    color={constants.background2}
                    size="small"
                  />
                </View>
              ) : (
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
              )}
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <View style={{height: 50, backgroundColor: constants.background1}} />
    </>
  );
}
