import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {getUserMe} from '../../../backend/database/apiCalls';
import {ThemeContext, TokenContext} from '../../../shared/Context';

export default function InvitationsIcon({navigation, id}) {
  const {token} = React.useContext(TokenContext);
  const [invitations, setInvitations] = useState(0);

  useEffect(() => {
    getUserMe(token).then((response) => {
      setInvitations(response.invitedToRooms.length());
    });
  }, []);

  return (
    <View
      style={{
        marginRight: 10,
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Invitations')}>
        <Ionicons name="ios-notifications-outline" size={25} color="white" />
      </TouchableOpacity>
      <View
        style={{
          width: 17,
          height: 17,
          borderRadius: 17 / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'crimson',
          position: 'relative',
          bottom: 10,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: 'white',
            fontFamily: 'Helvetica',
          }}>
          {invitations}
        </Text>
      </View>
    </View>
  );
}
