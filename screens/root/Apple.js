import React from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserDetailsContext} from '../../shared/Context';
import auth from '@react-native-firebase/auth';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

export default function Apple({navigation}) {
  const {setUser} = React.useContext(UserDetailsContext);
  const [loading, setLoading] = React.useState(false);

  const signIn = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    auth()
      .signInWithCredential(appleCredential)
      .then((userInfo) => {
        setLoading(false);
        if (userInfo.additionalUserInfo.isNewUser) {
          navigation.navigate('SetUpProfile', {
            email: userInfo.user.email,
            appleData: userInfo,
          });
        } else {
          getUserByEmail(userInfo.user.email).then((response) => {
            loginUser({
              username: response.username,
              password: '89337133-17c9-42e3-9fef-78416a25651a',
            }).then((_response) => {
              if (_response.err) {
                setLoading(false);
                ReactNativeHaptic.generate('notificationError');
                CustomToast('An Error Occured');
              } else {
                ReactNativeHaptic.generate('notificationSuccess');
                storeToken(_response.user._id, _response.token);
                storeUserData(_response.user);
                storeTheme('light');
                setLoading(false);
                setUser(_response.user);
              }
            });
          });
        }
      });
  };

  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#4640C1',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={signIn}>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <AntDesign name="apple1" size={25} color="white" />
      )}
    </TouchableOpacity>
  );
}
