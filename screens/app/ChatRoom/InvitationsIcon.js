import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default function InvitationsIcon({navigation, invitations}) {
  const navigateInvitations = () => {
    navigation.navigate('Invitations');
  };

  return (
    <TouchableOpacity
      onPress={navigateInvitations}
      style={{
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ba0000',
      }}>
      <Text
        style={{
          fontSize: 15,
          color: 'white',
          fontFamily: 'Helvetica',
        }}>
        {invitations}
      </Text>
    </TouchableOpacity>
  );
}
