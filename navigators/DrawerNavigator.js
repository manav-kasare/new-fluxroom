import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import DrawerContent from './DrawerContent';
import Friends from '../screens/app/UserProfile/Friends';
import JoinRoom from '../screens/app/JoinCreateRoom/JoinRoom';
import SettingsNavigator from './SettingsNavigator';
import HomeNavigator from './HomeNavigator';
import CreateRoom from '../screens/app/JoinCreateRoom/CreateRoom';
import {ThemeContext} from '../shared/Context';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const {constants} = React.useContext(ThemeContext);

  return (
    <Drawer.Navigator
      edgeWidth={constants.width}
      drawerType="back"
      drawerPosition="right"
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({color, size}) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Friends"
        component={Friends}
        options={{
          drawerLabel: 'Friends',
          drawerIcon: ({color, size}) => (
            <FontAwesome5 name="user-friends" size={size - 2} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="JoinRoom"
        component={JoinRoom}
        options={{
          drawerLabel: 'Join Room',
          drawerIcon: ({color, size}) => (
            <Icon name="plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="CreateRoom"
        component={CreateRoom}
        options={{
          drawerLabel: 'Create Room',
          drawerIcon: ({color, size}) => (
            <Icon name="pencil" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
