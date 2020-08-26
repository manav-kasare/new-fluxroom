import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../../shared/Context';

export default function RaisingHand({
  someoneRaisingHand,
  setSomeoneRaisingHand,
}) {
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
      onPress={() => setSomeoneRaisingHand(!someoneRaisingHand)}>
      <MaterialCommunityIcons size={30} color="white" name="hand" />
    </TouchableOpacity>
  );
}
