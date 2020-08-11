import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RoomPhotoTile from '../ChatRoom/RoomPhotoTile';
import {ThemeContext} from '../../../shared/Context';

export default function PersonalChat({navigation, route}) {
  const {constants} = React.useContext(ThemeContext);
  const {username} = route.params;
  const {profilePhoto} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <View
        style={{
          width: constants.width,
          height: constants.height * 0.1,
          borderBottomColor: constants.background4,
          borderBottomWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: constants.width,
            height: constants.height * 0.1,
            backgroundColor: constants.background1,
            borderBottomColor: constants.background3,
            borderBottomWidth: 2,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{marginLeft: 10, marginRight: 30}}
            onPress={() => navigation.goBack()}>
            <Ionicons name="md-arrow-round-back" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderColor: 'grey',
              borderRadius: 50 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
            }}
            onPress={() => navigation.navigate('RoomFullPhoto')}>
            <RoomPhotoTile profilePhoto={profilePhoto} />
          </TouchableOpacity>

          <Text
            style={{
              color: constants.text1,
              fontSize: 25,
              fontWeight: '700',
              marginHorizontal: 10,
            }}>
            {username}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
