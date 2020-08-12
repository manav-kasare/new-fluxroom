import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

import EditProfile from '../screens/app/UserProfile/EditProfile';
import UserProfile from '../screens/app/UserProfile/UserProfile';
import {ThemeContext} from '../shared/Context';

const ProfileStack = createStackNavigator();

export default function ProfileNavigator({route, navigation}) {
  const {constants} = React.useContext(ThemeContext);

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
        options={({navigation}) => ({
          title: 'Profile',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 15,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={20} color={constants.background2} />
            </TouchableOpacity>
          ),
        })}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit Profile',
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitle: 'Profile',
        }}
      />
    </ProfileStack.Navigator>
  );
}
