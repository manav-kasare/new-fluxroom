import * as SecureStore from 'expo-secure-store';

export const storeTokensLocally = (token) => {
  SecureStore.setItemAsync('accessToken', token);
};

export const getTokensLocally = () => {
  return SecureStore.getItemAsync('accessToken');
};
