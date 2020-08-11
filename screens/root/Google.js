import React from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Google() {
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
      <AntDesign name="google" size={25} color="white" />
    </TouchableOpacity>
  );
}
