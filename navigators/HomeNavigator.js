import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ChatRoomNavigator from './ChatRoomNavigator';
import Search from '../screens/app/Search/Search';
import ProfileNavigator from './ProfileNavigator';
import {ThemeContext} from '../shared/Context';

const BottomTabs = createBottomTabNavigator();

export default function HomeNavigator() {
  const {constants} = React.useContext(ThemeContext);

  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        activeTintColor: '#4640C1',
        inactiveTintColor: constants.background2,
        showLabel: false,
        style: {
          backgroundColor: constants.background3,
          borderTopWidth: 0.2,
          elevation: 0,
          shadowOpacity: 0,
          borderTopColor: constants.lineColor,
        },
      }}
      sceneAnimationEnabled={true}
      shifting={true}
      initialRouteName="ChatRoomNavigator">
      <BottomTabs.Screen
        name="ChatRoomNavigator"
        component={ChatRoomNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="mic" size={20} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => (
            <AntDesign name="search1" size={20} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="UserProfile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user-alt" size={18} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
