import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import ChatRooms from '../screens/app/ChatRoom/ChatRooms';
import Room from '../screens/app/ChatRoom/Room/Room';
import Invitations from '../screens/app/ChatRoom/Invitations';
import JoinRoomWithLink from '../screens/app/JoinCreateRoom/JoinRoomWithLink';
import RoomSettings from '../screens/app/ChatRoom/Room/RoomSettings';
import {ThemeContext} from '../shared/Context';

const ChatRoomStack = createStackNavigator();

export default function ChatRoomNavigator({route, navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }

  return (
    <ChatRoomStack.Navigator
      initialRouteName="ChatRooms"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      headerMode="float">
      <ChatRoomStack.Screen
        name="ChatRooms"
        component={ChatRooms}
        options={{
          title: 'Fluxroom',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: darkTheme ? constants.background3 : '#4b00d8',
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
        }}
      />
      <ChatRoomStack.Screen
        name="Room"
        component={Room}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
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
