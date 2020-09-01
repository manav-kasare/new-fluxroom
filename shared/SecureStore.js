import * as SecureStore from 'expo-secure-store';

export const storeTokens = (token) => {
  SecureStore.setItemAsync('accessToken', token);
};

export const getTokens = () => {
  return SecureStore.getItemAsync('accessToken');
};
