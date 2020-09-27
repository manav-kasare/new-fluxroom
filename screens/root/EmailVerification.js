import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';

import {CustomErrorToast} from '../../shared/CustomToast';

export default function EmailVerification({
  isVisible,
  setIsVisible,
  navigation,
  userInfo,
  user,
}) {
  const [loading, setLoading] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);

  const checkVerification = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((_userInfo) => {
        if (_userInfo.user.emailVerified) {
          setLoading(false);
          setIsVisible(false);
          navigation.navigate('SetUpProfile', {email: user.email});
        } else {
          setLoading(false);
        }
      });
  };

  const resendEmail = () => {
    setResendLoading(true);
    try {
      userInfo.user.sendEmailVerification.then(() => {
        setLoading(false);
      });
    } catch (err) {
      CustomErrorToast('An Error Occured !');
    }
  };

  return (
    <Portal>
      <Dialog visible={isVisible} dismissable={false}>
        <Dialog.Title>Please verify your email address</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={{color: 'grey'}}>
            We have sent you an email at {user.email}
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          {resendLoading ? (
            <ActivityIndicator color="#03449e" size="small" animating={true} />
          ) : (
            <Button mode="text" color="#03449e" onPress={resendEmail}>
              Resend Email
            </Button>
          )}
          {loading ? (
            <ActivityIndicator color="#03449e" size="small" />
          ) : (
            <Button mode="text" color="#03449e" onPress={checkVerification}>
              Check
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
