import React, {useContext, useState, useEffect} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import base64 from 'react-native-base64';

import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import CircleAvatar from '../../../shared/CircleAvatar';
import {updateProfilePhoto} from '../../../backend/database/apiCalls';

export default function UserProfilePhoto() {
  const {user} = useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);
  const [profilePhoto, setProfilePhoto] = useState(
    'https://images.unsplash.com/photo-1598368006967-b76b790494c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  );

  // useEffect(() => {
  //   setProfilePhoto(profilePhoto);
  // }, [setProfilePhoto]);

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
        width: 125,
        height: 125,
        borderRadius: 125 / 2,
        backgroundColor: constants.background4,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={pickImage}>
      <CircleAvatar
        size={125}
        uri={profilePhoto}
        itemName="profilePhoto"
        key={user.id}
      />
    </TouchableOpacity>
  );
}
