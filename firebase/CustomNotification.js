import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {declineInvitation, joinRoom} from '../backend/database/apiCalls';
import {CustomErrorToast} from '../shared/CustomToast';
import {Notifier} from 'react-native-notifier';

export default function CustomNotification({
  title,
  description,
  roomID,
  token,
}) {
  const [loading, setLoading] = React.useState(false);

  const handleAccept = () => {
    setLoading(true);
    joinRoom(roomID, token).then(async (response) => {
      if (response.error) {
        setLoading(false);
        CustomErrorToast('An Error Occured');
      } else {
        setLoading(false);
        await Linking.openURL(`fluxroom://room/${roomID}`);
        declineInvitation(token, roomID);
      }
    });
  };

  const handleDecline = () => {
    Notifier.hideNotification();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleDecline} style={styles.button1}>
            <Text style={{color: 'white'}}>Not Now</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAccept} style={styles.button2}>
            <Text style={{color: 'black'}}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#03449e',
    alignItems: 'center',
  },
  container: {
    padding: 20,
  },
  title: {color: 'white', fontWeight: 'bold', fontSize: 20},
  description: {color: 'white'},
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
  button1: {
    borderWidth: 0.2,
    borderRadius: 10,
    width: 100,
    height: 30,
    borderColor: 'white',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  button2: {
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    backgroundColor: 'white',
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
