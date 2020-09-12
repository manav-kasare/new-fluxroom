import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CachedImage from '../../../../shared/CachedImage';
import {ThemeContext} from '../../../../shared/Context';

export default function RoomAvatar({size, uri, isHost, name}) {
  const {constants} = React.useContext(ThemeContext);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [handRaised, setHandRaised] = React.useState(true);

  return (
    <View style={{marginVertical: 10}}>
      {uri === undefined ? (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: constants.primary,
            opacity: 0.75,
          }}>
          <FontAwesome5 name="user-alt" color="white" size={20} />
        </View>
      ) : (
        <CachedImage
          style={{
            width: size,
            height: size,
            borderRadius: 40,
            borderWidth: isHost ? 5 : 1,
            borderColor: isHost ? '#fcdf05' : 'grey',
          }}
          uri={uri}
        />
      )}

      <View style={{flexDirection: 'row', height: 20}}>
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 10,
            backgroundColor: isSpeaking ? constants.primary : 'crimson',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            bottom: 25,
          }}>
          {isSpeaking ? (
            <Ionicons size={20} color="white" name="ios-mic-outline" />
          ) : (
            <Ionicons size={20} color="white" name="ios-mic-off-outline" />
          )}
        </View>

        {handRaised ? (
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 10,
              backgroundColor: constants.primary,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              bottom: 25,
              left: 35,
            }}>
            <MaterialCommunityIcons size={25} color="white" name="hand" />
          </View>
        ) : (
          <></>
        )}
      </View>
      <Text
        style={{
          color: constants.text1,
          fontSize: 16,
          fontWeight: '500',
          fontFamily: 'Helvetica Neue',
          alignSelf: 'center',
        }}>
        {name}
      </Text>
    </View>
  );
}
