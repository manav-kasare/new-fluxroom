import React, {useContext, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import CircleAvatar from '../../../shared/CircleAvatar';
import {updateProfilePhoto} from '../../../backend/database/apiCalls';

export default function UserProfilePhoto() {
  const {user, setUser} = useContext(UserDetailsContext);
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const [profilePhoto, setProfilePhoto] = useState(user.profilePic);

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
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProfilePhoto(response.uri);
        setUser({...user, profilePic: response.uri});
      }
    });
  };

  return (
    <TouchableOpacity
      style={{
        width: 130,
        height: 130,
        borderRadius: 130 / 2,
        borderWidth: 1,
        borderColor: constants.lineColor,
        backgroundColor: constants.background4,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={pickImage}>
      <CircleAvatar size={125} uri={profilePhoto} key={user._id} />
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 10,
          backgroundColor: darkTheme
            ? constants.primary
            : constants.background3,
          position: 'absolute',
          right: 10,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
        }}>
        <MaterialIcons
          size={20}
          color={constants.background2}
          name="edit"
          style={{
            marginTop: 2,
            marginLeft: 2,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
