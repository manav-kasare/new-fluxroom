import React from 'react';
import {View} from 'react-native';
import {ThemeContext} from './Context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import CachedImage from './CachedImage';

export default function CircleAvatar({size, uri, type}) {
  const {darkTheme} = React.useContext(ThemeContext);

  if (uri === undefined || uri === null) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: darkTheme ? '#212121' : '#868489',
        }}>
        {type === 'room' ? (
          <FontAwesome5 name="users" color="white" size={size / 2} />
        ) : (
          <FontAwesome5 name="user-alt" color="white" size={size / 2} />
        )}
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
