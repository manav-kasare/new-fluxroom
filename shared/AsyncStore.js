import AsyncStorage from '@react-native-community/async-storage';
import {CustomErrorToast} from './CustomToast';
import {firebase} from '@react-native-firebase/messaging';

export const storeUserData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    AsyncStorage.setItem('user', jsonValue).then(() => {
      return;
    });
  } catch (e) {
    CustomErrorToast('An Error Occured !');
  }
};

export const getUserData = async () => {
  try {
    await AsyncStorage.getItem('user').then((user) => {
      return user;
    });
  } catch (e) {
    CustomErrorToast('An Error Occured !');
  }
};

export const storeTheme = async (value) => {
  try {
    await AsyncStorage.setItem('theme', value).then(() => {
      return;
    });
  } catch (e) {
    CustomErrorToast('An Error Occured !');
  }
};

export const getTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    return theme;
  } catch (e) {
    CustomErrorToast('An Error Occured !');
  }
};

export const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
  return fcmToken;
};
