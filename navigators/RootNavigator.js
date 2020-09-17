import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

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
import Phone from '../screens/root/Phone';
import {getUserMe} from '../backend/database/apiCalls';
import {getToken} from '../shared/KeyChain';
import {storeUserData, getTheme} from '../shared/AsyncStore';
import ChatRoomNavigator from './ChatRoomNavigator';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 500,
    damping: 10000,
    mass: 5,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function RootNavigator() {
  const [splashScreen, setSplashScreen] = React.useState(true);
  const {user, setUser} = useContext(UserDetailsContext);
  const {setData} = useContext(ThemeContext);
  const {setToken} = React.useContext(TokenContext);

  React.useEffect(() => {
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
        <ChatRoomNavigator />
      )}
    </NavigationContainer>
  );
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
      headerMode="screen">
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
            backgroundColor: '#3f00a6',
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
            backgroundColor: '#3f00a6',
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
            backgroundColor: '#3f00a6',
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
            backgroundColor: '#3f00a6',
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
            backgroundColor: '#3f00a6',
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
