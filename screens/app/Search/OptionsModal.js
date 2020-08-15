import React, {useEffect, useContext} from 'react';
import {
  SafeAreaView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomToast from '../../../shared/CustomToast';
import {sendFriendRequest} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';
import {constant} from 'lodash';

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
    <Modal animationType="fade" transparent={true} visible={isModalVisible}>
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <TouchableOpacity
            style={{
              width: constants.width * 0.9,
              height: constants.height * 0.075,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: constants.primary,
              borderRadius: 10,
              position: 'absolute',
              bottom: Platform.OS === 'ios' ? 25 : 15,
              alignSelf: 'center',
            }}
            onPress={handleRequest}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Helvetica',
                fontSize: 20,
              }}>
              Connect
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OptionsModal;
