import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import il8n, {setLocale} from '../locales/il8n';
import {
  UserDetailsContext,
  ThemeContext,
  TokenContext,
} from '../shared/Context';
import Onboard from '../screens/root/Onboard';
import SetUpProfile from '../screens/root/SetUpProfile';
import SplashScreen from '../screens/root/SplashScreen';
import OtpVerification from '../screens/root/OtpVerification';
import {getUserMe} from '../backend/database/apiCalls';
import {getToken} from '../shared/KeyChain';
import {storeUserData, getTheme} from '../shared/AsyncStore';
import ChatRoomNavigator from './ChatRoomNavigator';
import {fcmService} from '../firebase/FCMService';
import {localNotificationService} from '../firebase/LocalNotificationService';
import {Linking} from 'react-native';
import * as RNLocalize from 'react-native-localize';

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
  const {token, setToken} = React.useContext(TokenContext);

  React.useEffect(() => {
    initializeUser();
    initializeFCM();
  }, []);

  const initializeUser = () => {
    setLocale(RNLocalize.getLocales()[0].languageCode);
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
  };

  const initializeFCM = () => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister() {}

    function onNotification(notify) {
      console.log('[On Notification]', notify);
      const options = {
        soundName: 'default',
        playSound: true,
        largeIcon: 'logo',
        smallIcon: 'logo',
      };
      localNotificationService.showNotification(
        0,
        notify.notification.title,
        notify.notification.body,
        notify.data,
        token,
        options,
      );
    }

    async function onOpenNotification(data) {
      console.log('[On Open Notification]', data);
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
        Invitations: {
          path: '/invitations',
          initialRouteName: 'Invitations',
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
        name="OtpVerification"
        component={OtpVerification}
        options={{
          title: 'Verify OTP',
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
        name="SetUpProfile"
        component={SetUpProfile}
        options={{
          title: il8n.t('screens.setUpProfile'),
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
