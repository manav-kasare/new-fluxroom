import React from 'react';
import {View, Image} from 'react-native';
import {CachedImage} from '../../../shared/CachedImage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import constants from '../../../shared/constants';

export default function RoomPhotoTile({profilePhoto}) {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderColor: constants.lineColor,
        borderWidth: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {profilePhoto === 'undefined' || profilePhoto === '' ? (
        <EvilIcons name="user" size={50} color={constants.background2} />
      ) : (
        <Image
          style={{width: 50, height: 50, borderRadius: 50 / 2}}
          source={{uri: profilePhoto}}
        />
      )}
    </View>
  );
}

{
  /* <CachedImage
  style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
  uri={profilePhoto}
/>; */
}
