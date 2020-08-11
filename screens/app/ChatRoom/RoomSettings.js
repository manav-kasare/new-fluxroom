import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import constants from '../../../shared/constants';
import {getChatroomInfo} from '../../../backend/database/apiCalls';

export default function RoomSettings({route, navigation}) {
  const {room} = route.params;
  const link = useState(
    'asjdf;asfnksnfsdlfknafdlsajflsadfkaskfjaslkfakfjkashsafnasfnas;fdsajdfhwenfasdhfksnfa;fashjf',
  )[0];

  return (
    <SafeAreaView style={constants.screen}>
      <StatusBar
        barStyle={constants.isDark ? 'light-content' : 'dark-content'}
      />
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            navigation.navigate('ChangeRoomSettings', {
              room: room,
            })
          }>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 42 / 2,
                borderColor: constants.lineColor,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{
                  uri: `https://images.unsplash.com/photo-1596461097642-b697ec879ced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
                  // uri: roomDetails.profile_photo,
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40 / 2,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  color: constants.text1,
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '400',
                  fontFamily: 'Helvetica',
                }}>
                {room.name}
              </Text>
              <Text
                style={{
                  color: 'grey',
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '400',
                  fontFamily: 'Helvetica',
                }}>
                {room.description}
              </Text>
            </View>
          </View>
          <MaterialIcons name="edit" size={20} color={constants.background2} />
        </TouchableOpacity>
        <Text
          style={{
            color: constants.text1,
            marginLeft: 10,
            marginVertical: 10,
            fontSize: 20,
          }}>
          Copy Link
        </Text>
        <TouchableOpacity style={styles.container}>
          <Text style={{color: 'grey'}}>{link}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    width: constants.width,
    height: constants.height * 0.075,
    marginBottom: 25,
    backgroundColor: constants.background4,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: constants.lineColor,
    paddingHorizontal: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
