import React from 'react';
import {Linking} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-fast-toast';
import Entypo from 'react-native-vector-icons/Entypo';
import {fcmService} from './firebase/FCMService';
import {localNotificationService} from './firebase/LocalNotificationService';

import RootNavigator from './navigators/RootNavigator';
import {
  UserDetailsContext,
  ThemeProvider,
  TokenContextProvider,
} from './shared/Context';

function App() {
  const [user, setUser] = React.useState(null);
  const userDetailsValue = React.useMemo(() => ({user, setUser}), [
    user,
    setUser,
  ]);

  const toast = React.useRef(null);

  React.useEffect(() => {
    // Here
    global['toast'] = toast.current;
  }, []);

  // Notifications
  React.useEffect(() => {
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
      await Linking.openURL(data.url);
    }

    return () => {
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  return (
    <>
      <TokenContextProvider>
        <ThemeProvider>
          <UserDetailsContext.Provider value={userDetailsValue}>
            <PaperProvider>
              <RootNavigator />
            </PaperProvider>
          </UserDetailsContext.Provider>
        </ThemeProvider>
      </TokenContextProvider>
      <Toast
        ref={toast}
        successIcon={<Entypo name="check" color="white" size={20} />}
        dangerIcon={<Entypo name="cross" color="white" size={20} />}
      />
    </>
  );
}

export default App;
