import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Settings from '../screens/app/UserProfile/Settings/Settings';
import ChangePassword from '../screens/app/UserProfile/Settings/ChangePassword';
import {ThemeContext} from '../shared/Context';
import DataPolicy from '../screens/app/UserProfile/Settings/DataPolicy';
import TermsOfService from '../screens/app/UserProfile/Settings/TermsOfService';
import AboutUs from '../screens/app/UserProfile/Settings/AboutUs';

const Stack = new createStackNavigator();
const AboutUsStack = new createStackNavigator();

export default function SettingsNavigator() {
  const {constants} = React.useContext(ThemeContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({navigation}) => ({
          title: 'Settings',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{marginRight: 15}}>
              <Ionicons name="md-menu" size={25} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change Password',
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
          // title: '',
          // headerStyle: constants.headerStyle,
          // headerTitleStyle: constants.headerText,
          // headerBackTitleVisible: false,
          // headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

const AboutUsStackNavigator = () => {
  const {constants} = React.useContext(ThemeContext);
  return (
    <AboutUsStack.Navigator>
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
