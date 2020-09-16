import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Settings from '../screens/app/UserProfile/Settings/Settings';
import {ThemeContext} from '../shared/Context';
import DataPolicy from '../screens/app/UserProfile/Settings/DataPolicy';
import TermsOfService from '../screens/app/UserProfile/Settings/TermsOfService';
import AboutUs from '../screens/app/UserProfile/Settings/AboutUs';
import Issues from '../screens/app/UserProfile/Extras/Issues';

const Stack = new createStackNavigator();
const AboutUsStack = new createStackNavigator();

export default function SettingsNavigator() {
  const {constants} = React.useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
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
      <Stack.Screen
        name="AboutUsNavigator"
        component={AboutUsStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
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
    </Stack.Navigator>
  );
}

const AboutUsStackNavigator = () => {
  const {constants} = React.useContext(ThemeContext);
  return (
    <AboutUsStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <AboutUsStack.Screen
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
      <AboutUsStack.Screen
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
      <AboutUsStack.Screen
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
    </AboutUsStack.Navigator>
  );
};
