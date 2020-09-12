import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../../../shared/Context';

export default function RaisingHand({
  someoneRaisingHand,
  setSomeoneRaisingHand,
}) {
  const {constants} = React.useContext(ThemeContext);

  const toggleRaiseHand = () => {
    setSomeoneRaisingHand(!someoneRaisingHand);
  };

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: constants.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
      }}
      onPress={toggleRaiseHand}>
      <MaterialCommunityIcons size={30} color="white" name="hand" />
    </TouchableOpacity>
  );
}
