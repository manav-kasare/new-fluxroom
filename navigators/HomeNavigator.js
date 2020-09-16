import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatRoomNavigator from './ChatRoomNavigator';
import ProfileNavigator from './ProfileNavigator';
import {ThemeContext} from '../shared/Context';
import SearchNavigator from './SearchNavigator';

const BottomTabs = createBottomTabNavigator();

export default function HomeNavigator() {
  const {constants} = React.useContext(ThemeContext);

  return (
    <BottomTabs.Navigator
      lazy={true}
      tabBarOptions={{
        activeTintColor: '#4640C1',
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
      initialRouteName="Rooms">
      <BottomTabs.Screen
        name="Rooms"
        component={ChatRoomNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="search" size={30} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="UserProfile"
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
