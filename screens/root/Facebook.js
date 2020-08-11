import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import constants from '../../shared/constants';

export default function Facebook() {
  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#4640C1',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FontAwesome5 name="facebook-f" size={25} color="white" />
    </TouchableOpacity>
  );
}
