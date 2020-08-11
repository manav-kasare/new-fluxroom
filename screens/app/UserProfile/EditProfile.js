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

import constants from '../../../shared/constants';
import CustomToast from '../../../shared/CustomToast';
import Loading from '../../../shared/Loading';
import {updateDescription} from '../../../backend/database/apiCalls';
import {UserDetailsContext} from '../../../shared/Context';

export default function EditProfile({navigation}) {
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

  return isLoading ? (
    <Loading />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <View
        style={{
          width: constants.width * 0.8,
          marginTop: 20,
          alignSelf: 'center',
          height: 50,
          borderBottomColor: 'grey',
          borderBottomWidth: 0.2,
        }}>
        <TextInput
          autoFocus={true}
          style={{
            flex: 1,
            color: 'grey',
            fontSize: 25,
            fontFamily: 'Helvetica',
          }}
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
            color:
              description.length > 0 && description.length < 150
                ? constants.text1
                : 'red',
          }}>
          [ {description.length} / 150 ]
        </Text>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 25,
          marginLeft: constants.width * 0.1,
          width: 75,
        }}
        onPress={
          description.length > 0 && description.length < 150
            ? handleSubmit
            : () => {}
        }>
        <Text
          style={{
            color:
              description.length > 0 && description.length < 150
                ? 'dodgerblue'
                : 'grey',
            fontSize: 25,
            fontFamily: 'Helvetica',
            fontWeight: '700',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
