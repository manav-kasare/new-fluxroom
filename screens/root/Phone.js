import React from 'react';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import constants from '../../shared/constants';

export default function Phone() {
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
      <Entypo name="phone" size={25} color="white" />
    </TouchableOpacity>
  );
}
