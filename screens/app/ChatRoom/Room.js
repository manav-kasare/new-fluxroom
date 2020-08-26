import React, {useEffect, useContext, useReducer} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Platform,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';

import Host from './Host';
import MemberYou from './MemberYou';
import Member from './Member';
import RaisingHand from './RaisingHand';
import ToggleMic from './ToggleMic';

import {getUserInfo, getChatroomInfo} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import CircleAvatar from '../../../shared/CircleAvatar';
import RoomAvatar from './RoomAvatar';

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
  test.push({key: i, name: `user ${i}`});
}

const Room = ({route, navigation}) => {
  const {room} = route.params;
  const {constants, darkTheme} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const [{membersInfo}, dispatch] = useReducer(reducer, {
    membersInfo: [],
  });
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [someoneRaisingHand, setSomeoneRaisingHand] = React.useState(false);

  // get members info
  // useEffect(() => {
  //   handleFetch(room.host);
  //   room.members.map((member) => handleFetch(member));
  // }, []);
  // const handleFetch = (id) => {
  //   getUserInfo(id).then((data) => {
  //     dispatch({
  //       type: 'append',
  //       id: data.id,
  //       username: data.username,
  //       profilePhoto: data.profilePhoto,
  //     });
  //   });
  // };

  const anon = () => {};

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: darkTheme
            ? constants.background1
            : constants.primary,
        }}>
        <StatusBar
          backgroundColor={
            darkTheme ? constants.background1 : constants.primary
          }
        />
        <View style={{backgroundColor: constants.background1, flex: 1}}>
          <View
            style={{
              width: constants.width,
              height: constants.height * 0.1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              backgroundColor: darkTheme
                ? constants.background1
                : constants.primary,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {Platform.OS === 'ios' ? (
                  <Ionicons name="chevron-back" size={25} color="white" />
                ) : (
                  <Ionicons name="arrow-back" size={25} color="white" />
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
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '600',
                    fontFamily: 'Helvetica',
                  }}>
                  {room.name}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight: '200',
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
              <Feather name="menu" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={test}
            style={{backgroundColor: constants.background1}}
            columnWrapperStyle={{
              justifyContent: 'space-evenly',
              width: constants.width,
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              if (index === 0) {
                return (
                  <View style={{flexDirection: 'column'}}>
                    <RoomAvatar
                      uri="https://images.unsplash.com/photo-1596461097642-b697ec879ced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                      size={100}
                      isHost={true}
                    />
                    <Text
                      style={{
                        color: constants.text1,
                        fontSize: 16,
                        fontWeight: '500',
                        fontFamily: 'Helvetica',
                        alignSelf: 'center',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                );
              }
              // else if (item.id === user.id && item.id !== hostID) {
              //   return <MemberYou />;
              // } else if (item.id !== user.id && item.id !== hostID) {
              //   return <Member id={item.id} />;
              // }
              return (
                <View style={{flexDirection: 'column'}}>
                  <RoomAvatar
                    uri="https://images.unsplash.com/photo-1596461097642-b697ec879ced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    size={100}
                  />
                  <Text
                    style={{
                      color: constants.text1,
                      fontSize: 16,
                      fontWeight: '500',
                      fontFamily: 'Helvetica',
                      alignSelf: 'center',
                    }}>
                    {item.name}
                  </Text>
                </View>
              );
            }}
          />
          <View
            style={{
              width: constants.width,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              backgroundColor: constants.background1,
            }}>
            <View style={{flexDirection: 'row'}}>
              <ToggleMic
                isSpeaking={isSpeaking}
                setIsSpeaking={setIsSpeaking}
              />
              <RaisingHand
                someoneRaisingHand={someoneRaisingHand}
                setSomeoneRaisingHand={setSomeoneRaisingHand}
              />
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginRight: 25,
                borderRadius: 20,
                backgroundColor: constants.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={anon}>
              <Text style={{color: 'white'}}>Leave Room</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            width: constants.width,
            height: 40,
            backgroundColor: constants.background1,
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(Room);
