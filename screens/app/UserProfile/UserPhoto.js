import React, {useContext, useState, useEffect} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import {UserDetailsContext, ThemeContext} from '../../../shared/Context';

// import CachedImage from '../../../shared/CachedImage';
import {updateProfilePhoto} from '../../../backend/database/apiCalls';

export default function UserPhoto() {
  const {user} = useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    setTimeout(() => {}, 100);
    console.log(user.profilePhoto);
    setProfilePhoto(user.profilePhoto);
  }, [setProfilePhoto]);

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
        updateProfilePhoto(user.id, response.uri).then((responseText) => {
          console.log(responseText);
          if (responseText === 'success') {
            setProfilePhoto(response.uri);
          }
        });
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  return (
    <TouchableOpacity
      style={{
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: constants.background4,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={pickImage}>
      {profilePhoto === 'undefined' || profilePhoto === '' ? (
        <View
          style={{
            width: 85,
            height: 85,
            borderRadius: 85 / 2,
            borderColor: 'grey',
            borderWidth: 0.2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Feather name="camera" size={20} color={constants.text1} />
        </View>
      ) : (
        <Image
          style={{
            width: 75,
            height: 75,
            borderRadius: 75 / 2,
          }}
          source={{uri: profilePhoto}}
          // uri={profilePhoto}
        />
      )}
    </TouchableOpacity>
  );
}
