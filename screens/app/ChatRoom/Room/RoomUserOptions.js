import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ThemeContext} from '../../../../shared/Context';
import il8n from '../../../../locales/il8n';

export default function RoomUserOptions({isVisible, setIsVisible}) {
  const {constants} = React.useContext(ThemeContext);

  const toggleVisible = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      deviceWidth={constants.width}
      deviceHeight={constants.height}
      style={{
        width: constants.width * 0.9,
        borderRadius: 10,
        alignSelf: 'center',
        position: 'absolute',
        justifyContent: 'flex-start',
        paddingTop: 30,
        bottom: 0,
        height: constants.height * 0.25,
        backgroundColor: constants.background1,
      }}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOut="slideOutDown"
      onBackButtonPress={() => setIsVisible(false)}
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
      <TouchableOpacity
        style={{
          height: 50,
          width: constants.width * 0.9,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 25,
          marginVertical: 10,
        }}>
        <FontAwesome5
          name="user-plus"
          size={18}
          color={constants.background2}
        />
        <Text
          style={{
            color: constants.text1,
            fontFamily: 'Helvetica Neue',
            marginLeft: 25,
            fontSize: 16,
          }}>
          {il8n.t('chatRooms.reportUser')}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={constants.background2}
          style={{position: 'absolute', right: 20}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 30,
          width: constants.width * 0.9,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 25,
          marginVertical: 10,
        }}>
        <FontAwesome5
          name="user-slash"
          size={18}
          color={constants.background2}
        />
        <Text
          style={{
            color: constants.text1,
            fontFamily: 'Helvetica Neue',
            marginLeft: 25,
            fontSize: 16,
          }}>
          {il8n.t('chatRooms.blockUser')}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={constants.background2}
          style={{position: 'absolute', right: 20}}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleVisible}>
        <Text
          style={{
            color: 'dodgerblue',
            fontSize: 18,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          {il8n.t('buttons.close')}
        </Text>
      </TouchableOpacity>
    </Modal>
  );
}
