import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function EmailShare() {
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
      <MaterialIcons name="email" size={24} color="black" />
    </TouchableOpacity>
  );
}
