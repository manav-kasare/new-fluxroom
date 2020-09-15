import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {getUserMe} from '../../../backend/database/apiCalls';
import {TokenContext, UserDetailsContext} from '../../../shared/Context';

export default function InvitationsIcon({navigation, id}) {
  const {token} = React.useContext(TokenContext);
  const {user} = React.useContext(UserDetailsContext);
  const [invitations, setInvitations] = useState(user.invitedToRooms.length);

  useEffect(() => {
    getUserMe(token).then((response) => {
      setInvitations(response.user.invitedToRooms.length);
    });
  }, []);

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
