import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {sendNotifactionFirebaseApi} from '../backend/database/apiCalls';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          // User has permissions
          this.getToken(onRegister);
        } else {
          // User doesn't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {});
  };

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
        }
      })
      .catch((error) => {});
  };

  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch((error) => {});
  };

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {});
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('[onNotificationOpenedApp]', remoteMessage);
      if (remoteMessage) {
        const notification = remoteMessage;
        onOpenNotification(notification);
        // this.removeDeliveredNotification(notification.notificationId)
      }
    });

    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log('[getInitialNotification]', remoteMessage);
        if (remoteMessage) {
          const notification = remoteMessage;
          onOpenNotification(notification);
          //  this.removeDeliveredNotification(notification.notificationId)
        }
      });

    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('[onMessage]', remoteMessage);
      if (remoteMessage) {
        if (Platform.OS === 'ios') {
          onNotification(remoteMessage.data);
        } else {
          onNotification(remoteMessage);
        }
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      onRegister(fcmToken);
    });
  };

  sendNotification = (data, regIds, title, body) => {
    const FIREBASE_API_KEY =
      'AAAASkvA66Y:APA91bH_KVzhPVBFyvLuqxl1O_9JVT7BZx34fC6IcIb4G0e0P1jJ7dd--xkf4r7Lq-7K9rfPoFda6RpMQCX_pGRo6d4WN9Ipr4uWXEjHEntUqeeB4v5jHvUQjnPMSZGhqpccdX2xCdtV';
    const message = {
      registration_ids: regIds,
      notification: {
        title: title,
        body: body,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: 'high',
        content_available: true,
      },
      data: data,
    };

    sendNotifactionFirebaseApi(message, FIREBASE_API_KEY).then((response) => {
      console.log('[Firebase notification API response]', response);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();
