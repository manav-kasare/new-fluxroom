import React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {ThemeContext} from '../../../shared/Context';
import InvitationsIcon from './InvitationsIcon';

export default function ChatRoomsHeader({
  id,
  navigation,
  setIsCreateRoomModal,
}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);

  const createRoomIcon = () => <Entypo size={30} color="white" name="plus" />;

  const toggleCreateRoomModal = () => {
    setIsCreateRoomModal(true);
  };

  const renderInvitationsIcon = () => (
    <InvitationsIcon id={id} navigation={navigation} />
  );

  const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: darkTheme ? constants.background3 : '#4b00d8',
      borderWidth: 0,
      borderColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      height: constants.height * 0.1,
      width: constants.width,
    },
    headerContentStyle: {
      position: 'absolute',
      left: 10,
    },
    headerTitleStyle: {
      fontSize: 30,
      fontWeight: '800',
      fontFamily: 'Helvetica',
      color: 'white',
    },
    actions: {
      position: 'absolute',
      right: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <Appbar.Header style={styles.headerStyle}>
      <Appbar.Content
        title="Fluxroom"
        titleStyle={styles.headerTitleStyle}
        style={styles.headerContentStyle}
      />
      <View style={styles.actions}>
        <Appbar.Action
          style={styles.createRoomAction}
          icon={createRoomIcon}
          onPress={toggleCreateRoomModal}
          animated={false}
        />
        <Appbar.Action
          icon={renderInvitationsIcon}
          onPress={toggleCreateRoomModal}
        />
      </View>
    </Appbar.Header>
  );
}
