import React from 'react';
import {View} from 'react-native';
import {ThemeContext} from './Context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import CachedImage from './CachedImage';

export default function CircleAvatar({size, uri}) {
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
          backgroundColor: constants.primary,
        }}>
        <FontAwesome5 name="user-alt" color="white" size={20} />
      </View>
    );
  } else {
    return (
      <CachedImage
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
        uri={uri}
      />
    );
  }
}
