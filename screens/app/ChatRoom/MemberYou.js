import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import RoomUserPhoto from './RoomUserPhoto';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';

const MemberYou = React.memo(() => {
  const {user} = useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);
  return (
    <TouchableOpacity>
      <View
        style={{
          width: constants.width,
          height: constants.height * 0.1,
          alignItems: 'center',
          paddingHorizontal: 10,
          flexDirection: 'row',
          borderBottomColor: constants.lineColor,
          borderBottomWidth: 0.2,
          backgroundColor: constants.background1,
          opacity: 1,
        }}>
        <TouchableOpacity>
          <RoomUserPhoto profilePhoto={user.profilePhoto} />
        </TouchableOpacity>
        <View
          style={{
            paddingRight: 15,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                color: constants.text1,
                marginLeft: 10,
                fontSize: 20,
                fontWeight: '300',
              }}>
              {user.username}
            </Text>
            <Text
              style={{
                color: 'grey',
                marginLeft: 10,
                fontSize: 15,
                fontWeight: '300',
              }}>
              {user.description}
            </Text>
          </View>
          <Text style={{fontSize: 20, color: 'grey', fontWeight: '300'}}>
            You
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default MemberYou;
