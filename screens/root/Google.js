import React from 'react';
import {TouchableOpacity, Linking, ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Auth, Hub} from 'aws-amplify';
import {withOAuth} from 'aws-amplify-react-native';
import {UserDetailsContext} from '../../shared/Context';
import CustomToast from '../../shared/CustomToast';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';

import {getUserInfo, createUser} from '../../backend/database/apiCalls';

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

const Google = () => {
  const {setUser} = React.useContext(UserDetailsContext);
  const [loading, setLoading] = React.useState(false);

  const handleCognitoHostedUI = () => {
    getUser().then((userData) => {
      setUser(userData);

      const identities = JSON.parse(userData.attributes.identities)[0];
      const attributes = userData.attributes;
      // getUserInfo(identities.userId).then((responseData) => {
      //   if (responseData.id) {
      //     setUser(responseData);
      //   } else {
      //     createUser({
      //       id: identities.userId,
      //       email: attributes.email,
      //     }).then(({data}) => {
      //       if (data.error) {
      //         CustomToast('An Error Occured');
      //       } else {
      //         navigation.navigate('SetUpProfile', {
      //           id: identities.userId,
      //         });
      //       }
      //     });
      //   }
      // });
    });
  };

  React.useEffect(() => {
    Hub.listen('auth', ({payload: {event, data}}) => {
      setLoading(false);
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          handleCognitoHostedUI();
          break;
        case 'signIn_failure':
          CustomToast('An Error Occured');
        case 'cognitoHostedUI_failure':
          CustomToast('Sign in failure', data);
          break;
      }
    });
  }, []);

  const getUser = () => {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  };

  const federatedSignIn = () => {
    setLoading(true);
    Auth.federatedSignIn({provider: 'Google'}).then((response) =>
      console.log(response),
    );
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
      onPress={federatedSignIn}>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <AntDesign name="google" size={25} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default withOAuth(Google);
