import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {UserDetailsContext} from '../../shared/Context';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '319098514342-ec5ut0da1vommbf6509siiaj8k2piuoi.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export default function Google() {
  const {setUser} = React.useContext(UserDetailsContext);
  const [loading, setLoading] = React.useState(false);

  const storeData = async (_userInfo) => {
    try {
      const jsonValue = JSON.stringify(_userInfo);
      AsyncStorage.setItem('user', jsonValue).then(() => {
        setUser(_userInfo);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then((userInfo) => {
        const googleCredential = auth.GoogleAuthProvider.credential(
          userInfo.idToken,
        );
        auth()
          .signInWithCredential(googleCredential)
          .then(() => {
            setLoading(false);
            storeData(userInfo);
            setUser(userInfo);
          });
      });
    } catch (error) {
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={signIn}
      style={{
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#4640C1',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <AntDesign name="google" size={25} color="white" />
      )}
    </TouchableOpacity>
  );
}
