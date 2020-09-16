import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {ThemeContext} from '../../../shared/Context';
import InvitationsIcon from './InvitationsIcon';

export default function ChatRoomsHeader({
  id,
  navigation,
  setIsCreateRoomModal,
}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  const toggleCreateRoomModal = () => {
    setIsCreateRoomModal(true);
  };

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: darkTheme ? constants.background4 : constants.primary,
      borderWidth: 0,
      borderColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 75,
      paddingBottom: 25,
      alignItems: 'center',
      elevation: 0,
      shadowOpacity: 0,
      width: constants.width,
      paddingHorizontal: 25,
    },
    headerTitleStyle: {
      fontSize: 30,
      fontWeight: '800',
      fontFamily: 'Helvetica',
      color: 'white',
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    createRoomAction: {
      marginRight: 15,
    },
  });

  return (
    <View style={styles.headerStyle}>
      <Text style={styles.headerTitleStyle}>Fluxroom</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={toggleCreateRoomModal}
          style={styles.createRoomAction}>
          <Entypo size={30} color="white" name="plus" />
        </TouchableOpacity>
        <InvitationsIcon id={id} navigation={navigation} />
      </View>
    </View>
  );
}
