import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Appbar} from 'react-native-paper';

import CustomToast from '../../../../shared/CustomToast';
import {
  verifyPassword,
  changePassword,
} from '../../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../../shared/Context';

export default function ChangePassword({navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  const handleSubmit = () => {
    verifyPassword(user.id, currentPass).then((responseText) => {
      if (responseText === 'valid') {
        if (newPass === confirmNewPass) {
          changePassword(user.id, newPass).then((responseText) => {
            if (responseText === 'success') {
              CustomToast('Password Changed');
            } else {
              CustomToast('An Error Occured');
            }
          });
        } else {
          CustomToast('Passwords do not match');
        }
      } else {
        CustomToast('Incorrect Password');
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.background1,
        alignItems: 'center',
      }}>
      <View style={{flex: 1, marginTop: 50}}>
        <TextInput
          autoFocus={true}
          autoCompleteType="off"
          style={constants.input}
          secureTextEntry={true}
          placeholder="Current Password"
          placeholderTextColor="grey"
          value={currentPass}
          onChangeText={(text) => setCurrentPass(text)}
        />
        <TextInput
          style={constants.input}
          secureTextEntry={true}
          placeholder="New Password"
          placeholderTextColor="grey"
          value={newPass}
          onChangeText={(text) => setNewPass(text)}
        />
        <TextInput
          style={constants.input}
          secureTextEntry={true}
          placeholder="Confirm New Password"
          placeholderTextColor="grey"
          value={confirmNewPass}
          onChangeText={(text) => setConfirmNewPass(text)}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            width: constants.width * 0.75,
            height: 45,
            backgroundColor: constants.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            marginTop: 10,
          }}>
          <Text style={{color: 'white', marginLeft: 10}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
