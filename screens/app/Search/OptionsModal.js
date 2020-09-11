import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomToast from '../../../shared/CustomToast';
import {sendFriendRequest} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';

const OptionsModal = ({isModalVisible, setIsModalVisible, id}) => {
  const {constants} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);

  const handleRequest = () => {
    setIsModalVisible(false);
    sendFriendRequest(user.id, id).then((responseText) => {
      if (responseText !== 'success') {
        CustomToast('An Error Occured');
      }
    });
  };

  return (
    <Modal
      isVisible={isModalVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      deviceWidth={constants.width}
      deviceHeight={constants.height}
      style={{
        height: 70,
        width: constants.width * 0.9,
        borderRadius: 10,
        position: 'absolute',
        bottom: 25,
        backgroundColor: constants.background3,
        alignItems: 'center',
      }}
      onBackButtonPress={() => setIsModalVisible(false)}
      animationIn="fadeIn"
      animationInTiming={500}
      animationOut="fadeOut">
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
        onPress={() => {}}
        style={{
          height: 50,
          width: constants.width * 0.9,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 25,
          marginVertical: 10,
        }}>
        <FontAwesome5 name="plus" size={18} color={constants.background2} />
        <Text
          style={{
            color: constants.text1,
            fontFamily: 'Helvetica Neue',
            marginLeft: 25,
            fontSize: 16,
          }}>
          Join Room
        </Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={constants.background2}
          style={{position: 'absolute', right: 20}}
        />
      </TouchableOpacity>
    </Modal>
  );
};

export default OptionsModal;
