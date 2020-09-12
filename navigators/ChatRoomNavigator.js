import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FullPhoto from '../screens/app/ChatRoom/FullPhoto';
import ChatRooms from '../screens/app/ChatRoom/ChatRooms';
import Room from '../screens/app/ChatRoom/Room/Room';
import Invitations from '../screens/app/ChatRoom/Invitations';
import JoinRoomWithLink from '../screens/app/JoinCreateRoom/JoinRoomWithLink';
import RoomSettings from '../screens/app/ChatRoom/Room/RoomSettings';
import ChangeRoomSettings from '../screens/app/ChatRoom/Room/ChangeRoomSettings';
import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../shared/Context';
import InvitationsIcon from '../screens/app/ChatRoom/InvitationsIcon';

const ChatRoomStack = createStackNavigator();

export default function ChatRoomNavigator({route, navigation}) {
  const {setToken} = React.useContext(TokenContext);
  const {user, setUser} = React.useContext(UserDetailsContext);
  const {constants, darkTheme} = React.useContext(ThemeContext);

  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }

  return (
    <ChatRoomStack.Navigator initialRouteName="ChatRoom">
      <ChatRoomStack.Screen
        name="ChatRooms"
        component={ChatRooms}
        options={({navigation}) => ({
          title: 'Fluxroom',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: darkTheme ? constants.background3 : '#4640C1',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            height: 125,
          },
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: '700',
            fontFamily: 'Helvetica',
            color: 'white',
          },
          headerRight: () => (
            <InvitationsIcon id={user.id} navigation={navigation} />
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
          headerTintColor: 'white',
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
          headerTintColor: 'white',
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
          headerTintColor: 'white',
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
          headerTintColor: 'white',
        })}
      />
      <ChatRoomStack.Screen
        name="Invitations"
        component={Invitations}
        options={{
          title: 'Invitations',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}
      />
    </ChatRoomStack.Navigator>
  );
}
