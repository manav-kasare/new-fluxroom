import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Room from '../screens/app/ChatRoom/Room/Room';
import Invitations from '../screens/app/ChatRoom/Invitations';
import JoinRoomWithLink from '../screens/app/JoinCreateRoom/JoinRoomWithLink';
import RoomSettings from '../screens/app/ChatRoom/Room/RoomSettings';
import {ThemeContext} from '../shared/Context';
import HomeNavigator from './HomeNavigator';

const ChatRoomStack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 500,
    damping: 10000,
    mass: 2,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function ChatRoomNavigator() {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  return (
    <ChatRoomStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
      headerMode="screen">
      <ChatRoomStack.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <ChatRoomStack.Screen
        name="Room"
        component={Room}
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
        options={{
          title: 'Settings',
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
