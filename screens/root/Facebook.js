import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import constants from '../../shared/constants';

export default function Facebook() {
  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FontAwesome name="facebook-f" size={25} color="white" />
    </TouchableOpacity>
  );
}
