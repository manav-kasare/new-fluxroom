import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

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
      <TouchableOpacity
        style={{
          height: 70,
          width: constants.width * 0.9,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handleRequest}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Helvetica Neue',
            fontSize: 18,
          }}>
          Connect
        </Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default OptionsModal;
