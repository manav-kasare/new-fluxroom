import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function MessageShare() {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
      }}>
      <Feather name="message-circle" size={24} color="black" />
    </TouchableOpacity>
  );
}
