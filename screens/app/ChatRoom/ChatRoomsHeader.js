import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {ThemeContext} from '../../../shared/Context';
import InvitationsIcon from './InvitationsIcon';

export default function ChatRoomsHeader({
  id,
  navigation,
  setIsCreateRoomModal,
  invitations,
}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  const toggleCreateRoomModal = () => {
    setIsCreateRoomModal(true);
  };

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: darkTheme ? constants.background1 : constants.primary,
      borderWidth: 0,
      borderColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 100,
      alignItems: 'center',
      elevation: 0,
      shadowOpacity: 0,
      width: constants.width,
    },
    headerTitleStyle: {
      fontSize: 30,
      fontWeight: '700',
      color: 'white',
      marginLeft: 25,
    },
    actions: {
      marginRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    createRoomAction: {
      marginRight: 15,
    },
  });

  return (
    <SafeAreaView style={styles.headerStyle}>
      <Text style={styles.headerTitleStyle}>Rooms</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={toggleCreateRoomModal}
          style={styles.createRoomAction}>
          <Entypo size={30} color="white" name="plus" />
        </TouchableOpacity>
        <InvitationsIcon
          id={id}
          navigation={navigation}
          invitations={invitations}
        />
      </View>
    </SafeAreaView>
  );
}
