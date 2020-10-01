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
import il8n from '../locales/il8n';

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
      }}
      headerMode="screen">
      <ProfileStack.Screen
        name="Profile"
        component={UserProfile}
        options={{
          title: il8n.t('screens.profile'),
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: darkTheme
              ? constants.background3
              : constants.primary,
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            height: 100,
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
          title: il8n.t('screens.settings'),
          gestureDirection: 'vertical-inverted',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: il8n.t('screens.aboutUs'),
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name="DataPolicy"
        component={DataPolicy}
        options={{
          title: il8n.t('screens.dataPolicy'),
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={{
          title: il8n.t('screens.termsOfService'),
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name="Issues"
        component={Issues}
        options={{
          title: il8n.t('screens.issues'),
          headerStyle: constants.headerStyle,
          headerTitleStyle: constants.headerText,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
      />
    </ProfileStack.Navigator>
  );
}
