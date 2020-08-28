import React from 'react';
import {TouchableWithoutFeedback, View, Button} from 'react-native';
import Modal from 'react-native-modal';

import {ThemeContext} from '../../../shared/Context';

export default function RoomUserProfile({isVisible, setIsVisible}) {
  const {constants} = React.useContext(ThemeContext);

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
        bottom: 0,
        height: constants.height * 0.25,
        backgroundColor: constants.background1,
      }}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOut="slideOutDown"
      onSwipeComplete={() => setIsVisible(false)}
      swipeDirection="down">
      <View
        style={{
          backgroundColor: 'grey',
          height: 5,
          width: 50,
          alignSelf: 'center',
          borderRadius: 10,
          position: 'absolute',
          top: 10,
        }}
      />
      <Button title="Close" onPress={() => setIsVisible(false)} />
    </Modal>
  );
}
