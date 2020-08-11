import React from 'react';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Phone() {
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
      <Entypo name="phone" size={25} color="white" />
    </TouchableOpacity>
  );
}
