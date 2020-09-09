import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {UserDetailsContext} from '../../shared/Context';
import CustomToast from '../../shared/CustomToast';

import {getUserInfo, createUser} from '../../backend/database/apiCalls';

export default function Apple({navigation}) {
  const {setUser} = React.useContext(UserDetailsContext);
  const [loading, setLoading] = React.useState(false);

  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#4640C1',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {}}>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <FontAwesome5 name="facebook-f" size={25} color="white" />
      )}
    </TouchableOpacity>
  );
}
