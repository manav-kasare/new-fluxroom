import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function WhatsAppShare() {
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
      <FontAwesome name="whatsapp" size={24} color="black" />
    </TouchableOpacity>
  );
}
