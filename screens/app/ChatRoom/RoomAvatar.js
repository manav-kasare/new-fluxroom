import React from 'react';
import {View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CachedImage from '../../../shared/CachedImage';
import {ThemeContext} from '../../../shared/Context';

export default function RoomAvatar({size, uri, isHost}) {
  const {constants} = React.useContext(ThemeContext);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [handRaised, setHandRaised] = React.useState(true);

  if (uri === undefined) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: constants.background3,
        }}>
        <EvilIcons name="user" size={50} color={constants.background2} />
      </View>
    );
  }

  return (
    <View style={{height: 100, marginVertical: 20}}>
      <CachedImage
        style={{
          width: size,
          height: size,
          borderRadius: 40,
          borderWidth: isHost ? 5 : 0,
          borderColor: isHost ? 'yellow' : 'transparent',
        }}
        uri={uri}
        itemName="roomPhoto"
      />
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: constants.primary,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            bottom: 25,
          }}>
          {isSpeaking ? (
            <Ionicons size={24} color="white" name="ios-mic-outline" />
          ) : (
            <Ionicons size={24} color="white" name="ios-mic-off-outline" />
          )}
        </View>

        {handRaised ? (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: constants.primary,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              bottom: 25,
              left: 25,
            }}>
            <MaterialCommunityIcons size={30} color="white" name="hand" />
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
