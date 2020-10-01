import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import il8n from '../locales/il8n';
import {ThemeContext} from '../shared/Context';
import Search from '../screens/app/Search/Search';
import ChatRooms from '../screens/app/ChatRoom/ChatRooms';
import ProfileNavigator from './ProfileNavigator';

const BottomTabs = createBottomTabNavigator();

export default function HomeNavigator() {
  const {constants} = React.useContext(ThemeContext);

  return (
    <BottomTabs.Navigator
      lazy={true}
      tabBarOptions={{
        activeTintColor: constants.primary,
        inactiveTintColor: 'grey',
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: constants.background3,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderTopColor: 'transparent',
        },
      }}
      initialRouteName="ChatROoms">
      <BottomTabs.Screen
        name="ChatRooms"
        component={ChatRooms}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="search" size={30} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person" size={30} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
