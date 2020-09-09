import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from 'react-native-unimodules';
import {CustomErrorTost} from './CustomToast';

export const storeUserData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    AsyncStorage.setItem('user', jsonValue).then(() => {
      return;
    });
  } catch (e) {
    CustomErrorTost('An Error Occured !');
  }
};

export const getUserData = async () => {
  try {
    await AsyncStorage.getItem('user').then((user) => {
      return user;
    });
  } catch (e) {
    CustomErrorTost('An Error Occured !');
  }
};

export const storeTheme = async (value) => {
  try {
    await AsyncStorage.setItem('theme', value).then(() => {
      return;
    });
  } catch (e) {
    CustomErrorTost('An Error Occured !');
  }
};

export const getTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    return theme;
  } catch (e) {
    CustomErrorTost('An Error Occured !');
  }
};
