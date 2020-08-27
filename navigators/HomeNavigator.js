import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ChatRoomNavigator from './ChatRoomNavigator';
import ProfileNavigator from './ProfileNavigator';
import {ThemeContext} from '../shared/Context';
import SearchNavigator from './SearchNavigator';

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
          tabBarIcon: ({color, focused}) =>
            // <Entypo name="mic" size={20} color={color} />
            focused ? (
              <MaterialIcons name="mic" size={25} color={color} />
            ) : (
              <MaterialIcons name="mic-none" size={25} color={color} />
            ),
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="search" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="UserProfile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <MaterialIcons name="person-outline" size={25} color={color} />
            ) : (
              <MaterialIcons name="person" size={25} color={color} />
            ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
