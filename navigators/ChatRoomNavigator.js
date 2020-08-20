import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';

import FullPhoto from '../screens/app/ChatRoom/FullPhoto';
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
import {getUserInfo} from '../backend/database/apiCalls';

const ChatRoomStack = createStackNavigator();

export default function ChatRoomNavigator({route, navigation}) {
  const {user, setUser} = React.useContext(UserDetailsContext);
  const {constants} = React.useContext(ThemeContext);

  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }

  React.useEffect(() => {
    getUserInfo(user.id).then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <ChatRoomStack.Navigator initialRouteName="ChatRooms" mode="card">
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
        options={{headerShown: false}}
      />
      <ChatRoomStack.Screen
        name="FullPhoto"
        component={FullPhoto}
        options={{
          title: null,
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: constants.background2,
        }}
      />
      <ChatRoomStack.Screen
        name="RoomSettings"
        component={RoomSettings}
        options={({route}) => ({
          title: 'Settings',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: constants.background2,
        })}
      />
      <ChatRoomStack.Screen
        name="ChangeRoomSettings"
        component={ChangeRoomSettings}
        options={{
          title: 'Edit Settings',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: constants.background2,
        }}
      />
      <ChatRoomStack.Screen
        name="JoinRoomWithLink"
        component={JoinRoomWithLink}
        options={({navigation}) => ({
          title: 'Join Room',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: constants.background2,
        })}
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
