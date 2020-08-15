import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import PhotoAvatar from './PhotoAvatar';
import {getUserInfo} from '../../../backend/database/apiCalls';
import {ThemeContext} from '../../../shared/Context';

export default function Member({id}) {
  const {constants} = React.useContext(ThemeContext);
  const [memberInfo, setMemberInfo] = useState({
    username: null,
    description: null,
    profilePhoto: undefined,
  });

  useEffect(() => {
    getUserInfo(id).then((data) => {
      setMemberInfo({
        username: data.username,
        description: data.description,
        profilePhoto: data.profilePhoto,
      });
    });
  }, []);

  return (
    <TouchableOpacity>
      <View
        style={{
          width: constants.width,
          height: constants.height * 0.1,
          alignItems: 'center',
          backgroundColor: constants.background1,
          opacity: 1,
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity>
          <PhotoAvatar profilePhoto={memberInfo.profilePhoto} />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: constants.text1,
              marginLeft: 10,
              fontSize: 20,
              fontWeight: '300',
            }}>
            {memberInfo.username}
          </Text>
          <Text
            style={{
              color: 'grey',
              marginLeft: 10,
              fontSize: 15,
              fontWeight: '300',
            }}>
            {memberInfo.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
