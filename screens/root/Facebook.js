import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Auth, Hub} from 'aws-amplify';
import {withOAuth} from 'aws-amplify-react-native';
import {UserDetailsContext} from '../../shared/Context';
import CustomToast from '../../shared/CustomToast';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
  const {type, url: newUrl} = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

const Facebook = () => {
  const {setUser} = React.useContext(UserDetailsContext);

  React.useEffect(() => {
    Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then((userData) => {
            // console.log(userData);
            // _user = {
            //   email: userData.attributes.email,

            // }
            setUser({
              email: userData.attributes.email,
            });
          });
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
          CustomToast('An Error Occured');
        case 'cognitoHostedUI_failure':
          CustomToast('Sign in failure', data);
          break;
      }
    });

    getUser().then((userData) => {
      console.log(userData);
      // setUser(userData);
    });
  }, []);

  const getUser = () => {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
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
      onPress={() => Auth.federatedSignIn({provider: 'Facebook'})}>
      <FontAwesome5 name="facebook-f" size={25} color="white" />
    </TouchableOpacity>
  );
};

export default withOAuth(Facebook);
