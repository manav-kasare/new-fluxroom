import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import UserProfile from '../screens/app/UserProfile/UserProfile';
import Issues from '../screens/app/UserProfile/Extras/Issues';
import {ThemeContext} from '../shared/Context';
import Settings from '../screens/app/UserProfile/Settings/Settings';
import TermsOfService from '../screens/app/UserProfile/Settings/TermsOfService';
import DataPolicy from '../screens/app/UserProfile/Settings/DataPolicy';
import AboutUs from '../screens/app/UserProfile/Settings/AboutUs';

const ProfileStack = createStackNavigator();

export default function ProfileNavigator({route, navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }

  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={UserProfile}
        options={{
          title: 'Profile',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: darkTheme
              ? constants.background3
              : constants.primary,
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
        component={Settings}
        options={{
          title: 'Settings',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}
      />
      <ProfileStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'About Us',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}
      />
      <ProfileStack.Screen
        name="DataPolicy"
        component={DataPolicy}
        options={{
          title: 'Data Policy',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}
      />
      <ProfileStack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={{
          title: 'Terms Of Service',
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
          title: 'Issues',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}
      />
    </ProfileStack.Navigator>
  );
}
