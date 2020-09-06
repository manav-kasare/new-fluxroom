import * as Keychain from 'react-native-keychain';

export const storeToken = async (id, token) => {
  await Keychain.setGenericPassword(id, token);
};

export const getToken = async () => {
  try {
    const token = await Keychain.getGenericPassword();
    return token.password;
  } catch (e) {
    return e;
  }
};

export const deleteToken = async () => {
  await Keychain.resetGenericPassword();
};
