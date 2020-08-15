import React, {useContext, useEffect, useReducer} from 'react';
import {View, FlatList, Text} from 'react-native';

import {getUserInfo, getChatroomInfo} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import CircleAvatar from '../../../shared/CircleAvatar';

function reducer(state, action) {
  switch (action.type) {
    case 'append':
      return {
        hostedRooms: [
          ...state.hostedRooms,
          {
            id: action.id,
            name: action.name,
            profilePhoto: action.profilePhoto,
          },
        ],
      };
    case 'clear':
      return {
        hostedRooms: [],
      };
    default:
      return state;
  }
}

export default function HostedRooms({navigation}) {
  const {user} = useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);
  const [{hostedRooms}, dispatch] = useReducer(reducer, {hostedRooms: []});

  useEffect(() => {
    getUserInfo(user.id).then((data) => {
      const hostArray = JSON.parse(data.chatrooms).host;
      hostArray.map((id) => {
        handleChatroomInfo(id);
      });
    });

    return () => dispatch({type: 'clear'});
  }, []);

  const handleChatroomInfo = (id) => {
    getChatroomInfo(id, 'room').then((data) => {
      dispatch({
        type: 'append',
        id: data.id,
        name: data.name,
        profilePhoto: data.profilePhoto,
      });
    });
  };

  return (
    <View
      style={{
        height: constants.height * 0.15,
        width: constants.width,
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}>
      <FlatList
        data={hostedRooms}
        horizontal={true}
        renderItem={({item}) => (
          <View style={{alignItems: 'center'}}>
            <CircleAvatar
              uri={item.profilePhoto}
              itemName="hostedRooms"
              onPress={() =>
                navigation.navigate('ChatRoomNavigator', {
                  screen: 'Room',
                  params: {
                    roomID: item.id,
                  },
                })
              }
            />
            <Text
              style={{
                color: constants.text1,
                marginTop: 5,
                fontWeight: '300',
              }}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
