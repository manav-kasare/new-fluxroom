import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import RaisingHand from './RaisingHand';
import ToggleMic from './ToggleMic';
import {ThemeContext} from '../../../../shared/Context';

export default function RoomBottomView({
  isSpeaking,
  setIsSpeaking,
  someoneRaisingHand,
  setSomeoneRaisingHand,
  setInviteModal,
}) {
  const {constants} = React.useContext(ThemeContext);

  const handleInvite = () => {
    setInviteModal(true);
  };

  const anon = () => {};

  const styles = StyleSheet.create({
    bottomView: {
      width: constants.width,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 25,
      backgroundColor: 'transparent',
    },
    inviteIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: constants.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
    },
    leaveRoomIcon: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      backgroundColor: '#ba0000',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.bottomView}>
      <View style={{flexDirection: 'row'}}>
        <ToggleMic isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking} />
        <RaisingHand
          someoneRaisingHand={someoneRaisingHand}
          setSomeoneRaisingHand={setSomeoneRaisingHand}
        />
        <TouchableOpacity style={styles.inviteIcon} onPress={handleInvite}>
          <Entypo size={30} color="white" name="plus" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.leaveRoomIcon} onPress={anon}>
        <FontAwesome5 name="phone-slash" color="white" size={16} />
      </TouchableOpacity>
    </View>
  );
}
