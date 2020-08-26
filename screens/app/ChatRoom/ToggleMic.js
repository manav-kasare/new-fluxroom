import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ThemeContext} from '../../../shared/Context';

export default function ToggleMic({isSpeaking, setIsSpeaking}) {
  const {constants} = React.useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: constants.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
      }}
      onPress={() => setIsSpeaking(!isSpeaking)}>
      {isSpeaking ? (
        <Ionicons size={24} color="white" name="ios-mic-outline" />
      ) : (
        <Ionicons size={24} color="white" name="ios-mic-off-outline" />
      )}
    </TouchableOpacity>
  );
}
