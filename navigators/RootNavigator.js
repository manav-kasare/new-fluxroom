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
import {fcmService} from '../firebase/FCMService';
import {localNotificationService} from '../firebase/LocalNotificationService';
import {Linking} from 'react-native';

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
          initializeFCM();
        });
      });
    });
  }, []);

  const initializeFCM = () => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[On Register]', token);
    }

    function onNotification(notify) {
      console.log('[On Nofication]', notify);
      const options = {
        soundName: 'default',
        playSound: true, //,
        largeIcon: 'logo', // add icon large for Android (Link: app/src/main/mipmap)
        smallIcon: 'logo', // add icon small for Android (Link: app/src/main/mipmap)
      };
      localNotificationService.showNotification(
        0,
        notify.notification.title,
        notify.notification.body,
        notify.data,
        options,
      );
    }

    async function onOpenNotification(data) {
      console.log('[Opened Notification]', data);
      const initialUrl = await Linking.getInitialURL();
      console.log(initialUrl);
      await Linking.openURL(data.url);
    }

    return () => {
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  };

  const deepLinking = {
    prefixes: ['fluxroom://', 'http://app.fluxroomapp.com'],
    config: {
      screens: {
        JoinRoomWithLink: {
          path: '/join/:id',
          initialRouteName: 'JoinRoomWithLink',
        },
        Room: {
          path: '/room/:id',
          initialRouteName: 'Room',
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
            backgroundColor: '#03449e',
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
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Phone"
        component={Phone}
        options={{
          title: 'LogIn with Phone Number',
          headerStyle: {
            backgroundColor: '#03449e',
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
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Join Fluxroom',
          headerStyle: {
            backgroundColor: '#03449e',
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
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: 'Forgot Password',
          headerStyle: {
            backgroundColor: '#03449e',
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
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="SetUpProfile"
        component={SetUpProfile}
        options={{
          title: 'Set Up your Profile',
          headerStyle: {
            backgroundColor: '#03449e',
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
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
