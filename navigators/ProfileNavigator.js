import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

import UserProfile from '../screens/app/UserProfile/UserProfile';
import Issues from '../screens/app/UserProfile/Extras/Issues';
import {ThemeContext} from '../shared/Context';
import SettingsNavigator from './SettingsNavigator';

const ProfileStack = createStackNavigator();

export default function ProfileNavigator({route, navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={UserProfile}
        options={{
          title: 'Profile',
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
        }}
      />

      <ProfileStack.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          title: 'Settings',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}
      />
      <ProfileStack.Screen
        name="Issues"
        component={Issues}
        options={{
          title: 'Send us Feedback',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}
      />
    </ProfileStack.Navigator>
  );
}
