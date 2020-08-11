import React, {useState, useEffect, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  UserDetailsContext,
  IsSignedInContext,
  ThemeContext,
} from '../shared/Context';
import LogIn from '../screens/root/LogIn';
import SignUp from '../screens/root/SignUp';
import Onboard from '../screens/root/Onboard';
import SetUpProfile from '../screens/root/SetUpProfile';
import EmailVerification from '../screens/root/EmailVerification';
import ForgotPassword from '../screens/root/ForgotPassword';
import SplashScreen from '../screens/root/SplashScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [splashScreen, setSplashScreen] = useState(true);
  const {isSignedIn} = React.useContext(IsSignedInContext);
  const [user, setUser] = useState(null);

  const userDetailsValue = useMemo(() => ({user, setUser}), [user, setUser]);

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 1000);
  }, []);

  if (splashScreen) {
    return <SplashScreen />;
  }

  return (
    <UserDetailsContext.Provider value={userDetailsValue}>
      <NavigationContainer>
        {!isSignedIn ? (
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
    </UserDetailsContext.Provider>
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
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: 'Forgot Password',
          headerStyle: {
            backgroundColor: 'white',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          title: 'Log In',
          headerStyle: {
            backgroundColor: 'white',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Register to FluxRoom',
          headerStyle: {
            backgroundColor: 'white',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerification}
        options={{
          title: 'Verify your Email',
          headerStyle: {
            backgroundColor: 'white',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SetUpProfile"
        component={SetUpProfile}
        options={{
          title: 'Set Up your Profile',
          headerStyle: {
            backgroundColor: 'white',
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'Helvetica',
          },
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
