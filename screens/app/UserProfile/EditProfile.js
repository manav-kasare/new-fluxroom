import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

import CustomToast from '../../../shared/CustomToast';
import Loading from '../../../shared/Loading';
import {updateDescription} from '../../../backend/database/apiCalls';
import {UserDetailsContext, ThemeContext} from '../../../shared/Context';

export default function EditProfile({navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {user} = useContext(UserDetailsContext);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(() => {
    setDescription(user.description);
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    updateDescription(user.id, description).then((responseText) => {
      if (responseText === 'success') {
        setIsLoading(false);
        handleGoBack();
      } else {
        setIsLoading(false);
        CustomToast('An Error Occured');
        handleGoBack();
      }
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const anon = () => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <View
        style={{
          width: constants.width * 0.8,
          marginTop: 20,
          alignSelf: 'center',
          height: 50,
        }}>
        <TextInput
          autoFocus={true}
          style={constants.input}
          placeholder="Description"
          placeholderTextColor="grey"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>
      <View style={{marginTop: 5, marginLeft: constants.width * 0.1}}>
        <Text
          style={{
            color: description.length < 150 ? constants.text1 : 'red',
            fontSize: 12,
            margin: 5,
          }}>
          [ {description.length} / 150 ]
        </Text>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 25,
          borderRadius: 10,
          height: 50,
          width: constants.width * 0.8,
          backgroundColor: constants.primary,
        }}
        onPress={description.length < 150 ? handleSubmit : anon}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontFamily: 'Helvetica',
            fontWeight: '700',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
