import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import EditProfile from '../screens/app/UserProfile/EditProfile';
import DrawerContent from './DrawerContent';
import Friends from '../screens/app/UserProfile/Friends';
import JoinRoom from '../screens/app/JoinCreateRoom/JoinRoom';
import CreateRoom from '../screens/app/JoinCreateRoom/CreateRoom';
import SettingsNavigator from './SettingsNavigator';
import HomeNavigator from './HomeNavigator';
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
          drawerIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
        options={{
          drawerIcon: ({color, size}) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Friends"
        component={Friends}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="account-plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="JoinRoom"
        component={JoinRoom}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="CreateRoom"
        component={CreateRoom}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="pencil" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
