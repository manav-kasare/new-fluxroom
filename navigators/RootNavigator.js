import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import {UserDetailsContext, ThemeContext} from '../shared/Context';
import LogIn from '../screens/root/LogIn';
import SignUp from '../screens/root/SignUp';
import Onboard from '../screens/root/Onboard';
import SetUpProfile from '../screens/root/SetUpProfile';
import ForgotPassword from '../screens/root/ForgotPassword';
import SplashScreen from '../screens/root/SplashScreen';
import DrawerNavigator from './DrawerNavigator';
import ForgotPasswordConfirmation from '../screens/root/ForgotPasswordConfirmation';
import Phone from '../screens/root/Phone';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [splashScreen, setSplashScreen] = React.useState(true);
  const {user, setUser} = useContext(UserDetailsContext);
  const {getData} = useContext(ThemeContext);

  const deepLinking = {
    prefixes: ['fluxroom://'],
    config: {
      screens: {
        DrawerNavigator: {
          path: 'app',
          initialRouteName: 'DrawerNavigator',
          screens: {
            Home: {
              path: 'home',
              screens: {
                ChatRoomNavigator: {
                  path: 'rooms',
                  initialRouteName: 'ChatRoomNavigator',
                  screens: {
                    JoinRoomWithLink: 'join/:id',
                  },
                },
              },
            },
            Settings: 'settings',
          },
        },
      },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 500);
    getUserData();
    getThemeData();
  }, []);

  const getThemeData = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      getData(theme);
    } catch (err) {}
  };

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      console.log(jsonValue);
      if (jsonValue !== null) {
        setUser(JSON.parse(jsonValue));
      }
    } catch (err) {}
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
