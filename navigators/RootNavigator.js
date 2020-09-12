import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../shared/Context';
import LogIn from '../screens/root/LogIn';
import SignUp from '../screens/root/SignUp';
import Onboard from '../screens/root/Onboard';
import SetUpProfile from '../screens/root/SetUpProfile';
import ForgotPassword from '../screens/root/ForgotPassword';
import SplashScreen from '../screens/root/SplashScreen';
import DrawerNavigator from './DrawerNavigator';
import ForgotPasswordConfirmation from '../screens/root/ForgotPasswordConfirmation';
import Phone from '../screens/root/Phone';
import {getUserMe} from '../backend/database/apiCalls';
import {getToken} from '../shared/KeyChain';
import {storeUserData, getTheme} from '../shared/AsyncStore';
import {CustomErrorToast} from '../shared/CustomToast';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [splashScreen, setSplashScreen] = React.useState(true);
  const {user, setUser} = useContext(UserDetailsContext);
  const {setData} = useContext(ThemeContext);
  const {setToken} = React.useContext(TokenContext);

  React.useEffect(() => {
    console.log('[Setting Data Root Navigator]');
    getToken().then((token) => {
      getUserMe(token).then((response) => {
        setUser(response.user);
        getTheme().then((theme) => {
          setData(theme);
          setSplashScreen(false);
          setToken(token);
          storeUserData(response.user);
        });
      });
    });
  }, []);

  const deepLinking = {
    prefixes: ['fluxroom://', 'https://fluxroom.com'],
    config: {
      screens: {
        JoinRoomWithLink: {
          path: 'room/join/:id',
          initialRouteName: 'JoinRoomWithLink',
        },
      },
    },
  };

  if (splashScreen) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer linking={deepLinking}>
      {user === null || user === undefined ? (
        <AuthStackNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboard"
        component={Onboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          title: 'Log In',
          headerStyle: {
            backgroundColor: '#4640C1',
            borderBottomWidth: 0,
            borderBottomColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Phone"
        component={Phone}
        options={{
          title: 'LogIn with Phone Number',
          headerStyle: {
            backgroundColor: '#4640C1',
            borderBottomWidth: 0,
            borderBottomColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Join Fluxroom',
          headerStyle: {
            backgroundColor: '#4640C1',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: 'Forgot Password',
          headerStyle: {
            backgroundColor: '#4640C1',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordConfirmation"
        component={ForgotPasswordConfirmation}
        options={{
          title: 'Change Password',
          headerStyle: {
            backgroundColor: '#4640C1',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SetUpProfile"
        component={SetUpProfile}
        options={{
          title: 'Set Up your Profile',
          headerStyle: {
            backgroundColor: '#4640C1',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
