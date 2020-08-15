import React from 'react';
import {View} from 'react-native';
import {ThemeContext} from './Context';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import CachedImage from './CachedImage';

export default function CircleAvatar({size, uri, itemName}) {
  const {constants} = React.useContext(ThemeContext);

  if (uri === undefined) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroudColor: constants.background3,
        }}>
        <EvilIcons name="user" size={50} color={constants.background2} />
      </View>
    );
  }

  return (
    <CachedImage
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      uri={uri}
      itemName={itemName}
    />
  );
}
