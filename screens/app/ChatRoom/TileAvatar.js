import React from 'react';
import {View} from 'react-native';
import CachedImage from '../../../shared/CachedImage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {ThemeContext} from '../../../shared/Context';

export default function TileAvatar({profilePhoto}) {
  const {constants} = React.useContext(ThemeContext);
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderColor: constants.lineColor,
        borderWidth: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {profilePhoto === undefined ? (
        <EvilIcons name="user" size={50} color={constants.background2} />
      ) : (
        <CachedImage
          style={{width: 50, height: 50, borderRadius: 50 / 2}}
          uri={profilePhoto}
          itemName="tileAvatar"
        />
      )}
    </View>
  );
}
