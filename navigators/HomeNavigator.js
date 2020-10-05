import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import il8n from '../locales/il8n';
import {ThemeContext, UserDetailsContext} from '../shared/Context';
import Search from '../screens/app/Search/Search';
import ChatRooms from '../screens/app/ChatRoom/ChatRooms';
import ProfileNavigator from './ProfileNavigator';
import CircleAvatar from '../shared/CircleAvatar';
import PeopleNavigator from './PeopleNavigator';

const BottomTabs = createBottomTabNavigator();

export default function HomeNavigator() {
  const {user} = React.useContext(UserDetailsContext);
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
        name="People"
        component={PeopleNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="users" size={20} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({color}) =>
            user.profilePic === undefined ? (
              <MaterialIcons name="person" size={30} color={color} />
            ) : (
              <View
                style={{
                  height: 31,
                  width: 31,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: 'grey',
                }}>
                <CircleAvatar uri={user.profilePic} size={30} />
              </View>
            ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
