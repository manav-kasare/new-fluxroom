import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

import {createRoom, joinRoom} from '../../../backend/database/apiCalls';
import {
  ThemeContext,
  UserDetailsContext,
  TokenContext,
} from '../../../shared/Context';
import {CustomErrorToast} from '../../../shared/CustomToast';
import CachedImage from '../../../shared/CachedImage';
import {storeUserData} from '../../../shared/AsyncStore';
import {ActivityIndicator} from 'react-native-paper';

export default function CreateRoom({navigation, isVisible, setIsVisible}) {
  const {token} = React.useContext(TokenContext);
  const {setUser} = React.useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);
  const [room, setRoom] = useState({
    name: '',
    description: '',
    profilePic: undefined,
  });
  const [loading, setLoading] = useState(false);

  const verifyDescription = () => {
    if (room.description.length > 100) {
      ReactNativeHapticFeedback.trigger('notificationError', options);
    } else {
      handleCreateRoom();
    }
  };

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
          storeUserData(_response).then(() => {
            setUser(_response);
            navigation.navigate('Room', {
              id: response.room._id,
              name: response.room.name,
              profilePic: response.room.profilePic,
              description: response.room.description,
            });
            setIsVisible(false);
            setRoom({
              name: '',
              description: '',
              profilePic: undefined,
            });
          });
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

  const styles = StyleSheet.create({
    modal: {
      width: constants.width,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      marginTop: constants.height * 0.1,
      backgroundColor: constants.background3,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 25,
    },
    topLine: {
      backgroundColor: 'grey',
      height: 3,
      width: 50,
      alignSelf: 'center',
      borderRadius: 10,
      position: 'absolute',
      top: 5,
    },
    headingText: {
      color: constants.text1,
      fontWeight: '500',
      fontFamily: 'Helvetica Neue',
      fontSize: 20,
      marginTop: 20,
    },
    image: {
      width: 75,
      height: 75,
      borderRadius: 75 / 2,
      alignItems: 'center',
      backgroundColor: constants.primary,
      justifyContent: 'center',
    },
    cameraIcon: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cachedImage: {
      width: 75,
      height: 75,
      borderRadius: 75 / 2,
    },
    nameInput: {
      width: constants.width * 0.6,
      marginHorizontal: 15,
      paddingLeft: 10,
      fontFamily: 'Helvetica',
      marginVertical: 10,
      height: 45,
      color: constants.text1,
      borderRadius: 8,
      backgroundColor: 'rgba(130,130,130, 0.1)',
    },
    submitButton: {
      width: constants.width * 0.8,
      height: 45,
      backgroundColor: constants.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 15,
    },
    descriptionInput: {
      fontFamily: 'Helvetica',
      marginVertical: 15,
      height: 50,
      width: constants.width * 0.8,
      paddingHorizontal: 15,
      color: room.description.length > 100 ? 'crimson' : constants.text1,
      borderRadius: 8,
      backgroundColor: 'rgba(130,130,130, 0.1)',
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      deviceWidth={constants.width}
      deviceHeight={constants.height}
      onModalHide={() => {
        setRoom({
          name: '',
          description: '',
          profilePic: undefined,
        });
      }}
      onDismiss={() => {
        setRoom({
          name: '',
          description: '',
          profilePic: undefined,
        });
      }}
      style={styles.modal}
      onBackdropPress={() => setIsVisible(false)}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOut="slideOutDown">
      <>
        <View style={styles.topLine} />
        <Text style={styles.headingText}>Create your own room</Text>
        <View
          style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={styles.image} onPress={pickImage}>
            {room.profilePic === undefined ? (
              <View style={styles.cameraIcon}>
                <Feather name="camera" size={16} color="white" />
              </View>
            ) : (
              <CachedImage style={styles.cachedImage} uri={room.profilePic} />
            )}
          </TouchableOpacity>
          <View>
            <TextInput
              autoFocus={true}
              style={styles.nameInput}
              placeholder="What would you talk about ?"
              placeholderTextColor="grey"
              value={room.name}
              onChangeText={(text) => setRoom({...room, name: text})}
            />
          </View>
        </View>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Describe in less than 100 characters."
          placeholderTextColor="grey"
          multiline
          value={room.description}
          onChangeText={(text) => setRoom({...room, description: text})}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={verifyDescription}>
          {loading ? (
            <ActivityIndicator color="white" animating={true} />
          ) : (
            <Text
              style={{
                fontFamily: 'Helvetica',
                color: 'white',
              }}>
              Create Room
            </Text>
          )}
        </TouchableOpacity>
      </>
    </Modal>
  );
}
