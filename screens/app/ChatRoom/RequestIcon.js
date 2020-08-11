import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import constants from '../../../shared/constants';
import {getUserInfo} from '../../../backend/database/apiCalls';

export default function RequestIcon({navigation, id}) {
  const [requests, setRequests] = useState(0);

  useEffect(() => {
    getUserInfo(id).then((data) => {
      setRequests(JSON.parse(data.requests).requests.length);
    });
  }, []);

  return (
    <View
      style={{
        marginRight: 15,
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
        <Ionicons
          name="ios-notifications-outline"
          size={25}
          color={constants.background2}
        />
      </TouchableOpacity>
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 10 / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'crimson',
          position: 'relative',
          bottom: 10,
        }}>
        <Text
          style={{
            fontSize: 10,
            color: 'white',
            fontFamily: 'Helvetica',
          }}>
          {requests}
        </Text>
      </View>
    </View>
  );
}
