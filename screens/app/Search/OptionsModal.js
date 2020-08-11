import React, {useEffect, useContext} from 'react';
import {
  SafeAreaView,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import constants from '../../../shared/constants';
import CustomToast from '../../../shared/CustomToast';
import {sendFriendRequest} from '../../../backend/database/apiCalls';
import {UserDetailsContext} from '../../../shared/Context';

const OptionsModal = React.memo(({isModalVisible, setIsModalVisible, id}) => {
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
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        <SafeAreaView
          style={{
            width: constants.width,
            height: constants.height * 0.75,
          }}
        />
      </TouchableWithoutFeedback>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: constants.background3,
          alignItems: 'center',
          height: constants.height * 0.25,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
        }}>
        <View
          style={{
            width: constants.width * 0.9,
            height: constants.height * 0.05,
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 25,
            borderBottomColor: constants.background4,
            borderBottomWidth: 0.5,
          }}>
          <TouchableOpacity
            style={{
              width: constants.width * 0.9,
              height: constants.height * 0.05,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
            onPress={handleRequest}>
            <Ionicons name="ios-call" size={24} color="white" />
            <Text
              style={{
                marginLeft: 25,
                color: constants.text1,
                fontFamily: 'Helvetica',
                fontSize: 20,
              }}>
              Connect
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
});

export default OptionsModal;
