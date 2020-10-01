import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
import il8n from '../../locales/il8n';

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
        <Dialog.Title>{il8n.t('emailVerification.heading')}</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={{color: 'grey'}}>
            {il8n.t('emailVerification.emailSent')} {user.email}
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          {resendLoading ? (
            <ActivityIndicator color="#03449e" size="small" animating={true} />
          ) : (
            <Button mode="text" color="#03449e" onPress={resendEmail}>
              {il8n.t('buttons.resend')}
            </Button>
          )}
          {loading ? (
            <ActivityIndicator color="#03449e" size="small" />
          ) : (
            <Button mode="text" color="#03449e" onPress={checkVerification}>
              {il8n.t('buttons.verify')}
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
