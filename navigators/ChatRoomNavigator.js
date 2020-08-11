import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

import RoomFullPhoto from '../screens/app/ChatRoom/RoomFullPhoto';
import ChatRooms from '../screens/app/ChatRoom/ChatRooms';
import Room from '../screens/app/ChatRoom/Room';
import PersonalChat from '../screens/app/ChatRoom/PersonalChat';
import Requests from '../screens/app/ChatRoom/Requests';
import JoinRoomWithLink from '../screens/app/JoinCreateRoom/JoinRoomWithLink';
import ShareRoomLink from '../screens/app/JoinCreateRoom/ShareRoomLink';
import RoomSettings from '../screens/app/ChatRoom/RoomSettings';
import ChangeRoomSettings from '../screens/app/ChatRoom/ChangeRoomSettings';
import {UserDetailsContext, ThemeContext} from '../shared/Context';
import RequestIcon from '../screens/app/ChatRoom/RequestIcon';

const ChatRoomStack = createStackNavigator();

export default function ChatRoomNavigator({route, navigation}) {
  const {user} = React.useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);

  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }

  return (
    <ChatRoomStack.Navigator initialRouteName="ChatRooms">
      <ChatRoomStack.Screen
        name="ChatRooms"
        component={ChatRooms}
        options={({navigation}) => ({
          title: 'Rooms',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerRight: () => (
            <RequestIcon id={user.id} navigation={navigation} />
          ),
        })}
      />
      <ChatRoomStack.Screen
        name="Room"
        component={Room}
        options={({route, navigation}) => ({
          title: route.params.room.name,
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitle: 'Rooms',
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 15,
                width: 40,
                height: 40,
              }}
              onPress={() =>
                navigation.navigate('RoomSettings', {
                  room: route.params.room,
                })
              }>
              <Feather name="menu" size={25} color={constants.background2} />
            </TouchableOpacity>
          ),
        })}
      />
      <ChatRoomStack.Screen
        name="RoomFullPhoto"
        component={RoomFullPhoto}
        options={{
          headerShown: false,
        }}
      />
      <ChatRoomStack.Screen
        name="RoomSettings"
        component={RoomSettings}
        options={({route}) => ({
          title: 'Settings',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitle: route.params.room.name,
        })}
      />
      <ChatRoomStack.Screen
        name="ChangeRoomSettings"
        component={ChangeRoomSettings}
        options={{
          title: 'Edit Settings',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitle: 'Settings',
        }}
      />
      <ChatRoomStack.Screen
        name="JoinRoomWithLink"
        component={JoinRoomWithLink}
        options={{
          headerShown: false,
        }}
      />
      <ChatRoomStack.Screen
        name="ShareRoomLink"
        component={ShareRoomLink}
        options={{
          headerShown: false,
        }}
      />

      <ChatRoomStack.Screen
        name="PersonalChat"
        component={PersonalChat}
        options={{headerShown: false}}
      />
      <ChatRoomStack.Screen
        name="Requests"
        component={Requests}
        options={{
          title: 'Requests',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: constants.background2,
        }}
      />
    </ChatRoomStack.Navigator>
  );
}
