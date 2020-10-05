import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ThemeContext} from '../../../../shared/Context';
import il8n from '../../../../locales/il8n';

export default function RoomUserOptions({isVisible, setIsVisible}) {
  const {constants} = React.useContext(ThemeContext);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [moderator, setModerator] = React.useState(true);
  const [alreadySpeaker, setAlreadySpeaker] = React.useState(false);

  const styles = StyleSheet.create({
    modal: {
      width: constants.width * 0.9,
      borderRadius: 10,
      alignSelf: 'center',
      position: 'absolute',
      justifyContent: 'flex-start',
      paddingVertical: 30,
      bottom: 0,
      backgroundColor: constants.background1,
    },
    button: {
      height: 50,
      width: constants.width * 0.9,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 25,
    },
    buttonText: {
      color: constants.text1,
      fontFamily: 'Helvetica Neue',
      marginLeft: 25,
      fontSize: 16,
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      deviceWidth={constants.width}
      deviceHeight={constants.height}
      style={styles.modal}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOut="slideOutDown"
      onBackdropPress={() => setIsVisible(false)}
      swipeDirection="down">
      <View
        style={{
          backgroundColor: 'grey',
          height: 3,
          width: 50,
          alignSelf: 'center',
          borderRadius: 10,
          position: 'absolute',
          top: 10,
        }}
      />
      {moderator ? (
        alreadySpeaker ? (
          <TouchableOpacity style={styles.button}>
            <FontAwesome5
              name="microphone-slash"
              size={18}
              color={constants.background2}
            />
            <Text style={styles.buttonText}>
              {il8n.t('chatRooms.moveToAudience')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={constants.background2}
              style={{position: 'absolute', right: 20}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button}>
            <FontAwesome5
              name="microphone"
              size={18}
              color={constants.background2}
            />
            <Text style={styles.buttonText}>
              {il8n.t('chatRooms.inviteToSpeak')}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={constants.background2}
              style={{position: 'absolute', right: 20}}
            />
          </TouchableOpacity>
        )
      ) : (
        <></>
      )}
      {isFollowing ? (
        <TouchableOpacity style={styles.button}>
          <FontAwesome5
            name="user-minus"
            size={18}
            color={constants.background2}
          />
          <Text style={styles.buttonText}>{il8n.t('chatRooms.unFollow')}</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={constants.background2}
            style={{position: 'absolute', right: 20}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button}>
          <FontAwesome5
            name="user-plus"
            size={18}
            color={constants.background2}
          />
          <Text style={styles.buttonText}>{il8n.t('chatRooms.follow')}</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={constants.background2}
            style={{position: 'absolute', right: 20}}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{il8n.t('chatRooms.reportUser')}</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={constants.background2}
          style={{position: 'absolute', right: 20}}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{il8n.t('chatRooms.blockUser')}</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={constants.background2}
          style={{position: 'absolute', right: 20}}
        />
      </TouchableOpacity>
    </Modal>
  );
}
