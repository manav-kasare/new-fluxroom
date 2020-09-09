import React from 'react';
import {View, Image, ImagePropTypes} from 'react-native';

import CachedImage from '../../../../shared/CachedImage';
import {ThemeContext} from '../../../../shared/Context';

export default function PhotoAvatar({profilePhoto, borderColor}) {
  const {constants} = React.useContext(ThemeContext);
  const outerRadius = constants.width * 0.25;
  const innerRadius = constants.width * 0.23;
  return (
    <View
      style={{
        width: outerRadius,
        height: outerRadius,
        borderRadius: 50,
        borderColor: borderColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
      }}>
      {profilePhoto === undefined ? (
        <View
          style={{
            width: innerRadius,
            height: innerRadius,
            borderRadius: 50,
            backgroundColor: constants.background1,
          }}
        />
      ) : (
        <CachedImage
          style={{
            width: innerRadius,
            height: innerRadius,
            borderRadius: 50,
          }}
          uri={profilePhoto}
        />
      )}
    </View>
  );
}
