import React, {useContext, useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import {PickImage} from '../../../shared/PickImage';
import CachedImage from '../../../shared/CachedImage';
import {updateProfilePhoto} from '../../../backend/database/apiCalls';

export default function UserPhoto() {
  const {user} = useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);
  const [profilePhoto, setProfilePhoto] = useState('undefined');

  useEffect(() => {
    setTimeout(() => {}, 100);
    setProfilePhoto(user.profile_photo);
  }, []);

  const pickImage = async () => {
    const uri = PickImage();
    updateProfilePhoto(user.id, uri).then((responseText) => {
      if (responseText !== 'succes') {
        setProfilePhoto(uri);
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
          <Feather name="camera" size={20} color="white" />
        </View>
      ) : (
        <CachedImage
          style={{
            width: 75,
            height: 75,
            borderRadius: 75 / 2,
          }}
          uri={profilePhoto}
        />
      )}
    </TouchableOpacity>
  );
}
