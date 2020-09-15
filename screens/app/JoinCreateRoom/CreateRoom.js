import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';

import {createRoom, joinRoom} from '../../../backend/database/apiCalls';
import {
  ThemeContext,
  UserDetailsContext,
  TokenContext,
} from '../../../shared/Context';
import {CustomErrorToast} from '../../../shared/CustomToast';
import CachedImage from '../../../shared/CachedImage';
import {storeUserData} from '../../../shared/AsyncStore';

export default function CreateRoom({navigation, isVisible, setIsVisible}) {
  const {token} = React.useContext(TokenContext);
  const {setUser} = React.useContext(UserDetailsContext);
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [room, setRoom] = useState({
    name: '',
    description: '',
    profilePic: undefined,
  });
  const [loading, setLoading] = useState(false);

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
        joinRoom(response.room._id, token).then((_response) => {
          setLoading(false);
          setIsVisible(false);
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
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      deviceWidth={constants.width}
      deviceHeight={constants.height}
      style={{
        width: constants.width,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: constants.height * 0.1,
        backgroundColor: constants.background3,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 25,
      }}
      onBackdropPress={() => setIsVisible(false)}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOut="slideOutDown">
      <>
        <View
          style={{
            backgroundColor: 'grey',
            height: 5,
            width: 50,
            alignSelf: 'center',
            borderRadius: 10,
            position: 'absolute',
            top: 10,
          }}
        />
        <View
          style={{marginTop: 50, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 75,
              height: 75,
              borderRadius: 75 / 2,
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
                <Feather name="camera" size={16} color="white" />
              </View>
            ) : (
              <CachedImage
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 75 / 2,
                }}
                uri={room.profilePic}
              />
            )}
          </TouchableOpacity>
          <View>
            <TextInput
              style={{
                marginLeft: 15,
                fontFamily: 'Helvetica',
                marginVertical: 10,
                height: 45,
                paddingHorizontal: 25,
                color: 'black',
                borderRadius: 8,
                backgroundColor: 'rgba(130,130,130, 0.1)',
              }}
              placeholder="What would you talk about ?"
              placeholderTextColor="grey"
              value={room.name}
              onChangeText={(text) => setRoom({...room, name: text})}
            />
            {room.name.length < 4 ? (
              <Text
                style={{
                  fontFamily: 'Helvetica',
                  color: 'crimson',
                  marginLeft: 25,
                }}>
                At least 4 characters
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View style={{marginTop: 25}}>
          <TextInput
            style={constants.input}
            placeholder="Describe the topic briefly"
            placeholderTextColor="grey"
            value={room.description}
            onChangeText={(text) => setRoom({...room, description: text})}
          />
          {loading ? (
            <View style={{height: 50, marginVertical: 10, marginTop: 15}}>
              <ActivityIndicator color={constants.background2} size="small" />
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
      </>
    </Modal>
  );
}
