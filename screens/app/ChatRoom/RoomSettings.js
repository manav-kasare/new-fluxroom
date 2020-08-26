import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Image, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {getChatroomInfo} from '../../../backend/database/apiCalls';
import {ThemeContext} from '../../../shared/Context';

export default function RoomSettings({route, navigation}) {
  const {room} = route.params;
  const {constants} = React.useContext(ThemeContext);
  const link =
    'asjdf;asfnksnfsdlfknafdlsajflsadfkaskfjaslkfakfjkashsafnasfnas;fdsajdfhwenfasdhfksnfa;fashjf';

  const styles = {
    container: {
      width: constants.width,
      height: constants.height * 0.075,
      marginBottom: 25,
      backgroundColor: constants.background3,
      borderBottomWidth: 0.2,
      borderTopWidth: 0.2,
      borderColor: constants.lineColor,
      paddingHorizontal: 25,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  };

  return (
    <SafeAreaView style={constants.screen}>
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
                  // uri: roomDetails.profilePhoto,
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
