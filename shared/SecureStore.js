import * as SecureStore from 'expo-secure-store';

export const storeToken = (token) => {
  return SecureStore.setItemAsync('accessToken', token).then((reponse) => {
    return response;
  });
};

export const getToken = () => {
  return SecureStore.getItemAsync('accessToken').then((token) => {
    console.log('TOKEN', token);
    return token;
  });
};

export const deleteToken = () => {
  return SecureStore.deleteItemAsync('accessToken');
};
