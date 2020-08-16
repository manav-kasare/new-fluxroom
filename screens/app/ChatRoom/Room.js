import React, {useEffect, useContext, useReducer} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import TileAvatar from './TileAvatar';
import Host from './Host';
import MemberYou from './MemberYou';
import Member from './Member';

import {getUserInfo, getChatroomInfo} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import PhotoAvatar from './PhotoAvatar';
import CircleAvatar from '../../../shared/CircleAvatar';
import CachedImage from '../../../shared/CachedImage';

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'append':
      return {
        membersInfo: [
          ...state.membersInfo,
          {
            id: action.id,
            username: action.id,
            profilePhoto: action.profilePhoto,
          },
        ],
      };
    default:
      return state;
  }
}

var test = [];
for (var i = 0; i < 15; i++) {
  test.push(i);
}

export default function Room({route, navigation}) {
  const {room} = route.params;
  const {constants} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const [{membersInfo}, dispatch] = useReducer(reducer, {
    membersInfo: [],
  });
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  // get members info
  useEffect(() => {
    handleFetch(room.host);
    room.members.map((member) => handleFetch(member));
  }, []);

  const handleFetch = (id) => {
    getUserInfo(id).then((data) => {
      dispatch({
        type: 'append',
        id: data.id,
        username: data.username,
        profilePhoto: data.profilePhoto,
      });
    });
  };

  return (
    <SafeAreaView
      style={{
        height: constants.height,
        width: constants.width,
        backgroundColor: constants.background1,
      }}>
      <View
        style={{
          width: constants.width,
          height: constants.height * 0.1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {Platform.OS === 'ios' ? (
              <Ionicons
                name="chevron-back"
                size={25}
                color={constants.background2}
              />
            ) : (
              <Ionicons
                name="arrow-back"
                size={25}
                color={constants.background2}
              />
            )}
          </TouchableOpacity>
          <View style={{marginHorizontal: 20}}>
            <CircleAvatar
              uri="https://images.unsplash.com/photo-1596461097642-b697ec879ced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              size={50}
              itemName="roomProfilePhoto"
            />
          </View>
          <View>
            <Text
              style={{
                color: constants.text1,
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Helvetica',
              }}>
              {room.name}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 15,
                fontWeight: '400',
                fontFamily: 'Helvetica',
              }}>
              {room.description}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RoomSettings', {
              room: room,
            })
          }>
          <Feather name="menu" size={25} color={constants.background2} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={test}
        columnWrapperStyle={{
          justifyContent: 'space-evenly',
          width: constants.width,
        }}
        style={{flex: 1, paddingTop: 10}}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          if (index === 0) {
            return (
              <RoomAvatar
                uri="https://images.unsplash.com/photo-1596461097642-b697ec879ced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                size={100}
                isHost={true}
              />
            );
          }
          // else if (item.id === user.id && item.id !== hostID) {
          //   return <MemberYou />;
          // } else if (item.id !== user.id && item.id !== hostID) {
          //   return <Member id={item.id} />;
          // }
          return (
            <RoomAvatar
              uri="https://images.unsplash.com/photo-1596461097642-b697ec879ced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              size={100}
            />
          );
        }}
      />
      <View
        style={{
          width: constants.width,
          height: 50,
          alignItems: 'center',
          flexDirection: 'row',
          paddingTop: 10,
        }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: constants.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
          }}
          onPress={() => setIsSpeaking(!isSpeaking)}>
          {isSpeaking ? (
            <Ionicons size={24} color="white" name="ios-mic-outline" />
          ) : (
            <Ionicons size={24} color="white" name="ios-mic-off-outline" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: constants.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
          }}>
          <MaterialCommunityIcons size={30} color="white" name="hand" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const RoomAvatar = ({size, uri, isHost}) => {
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
    <View>
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
};
