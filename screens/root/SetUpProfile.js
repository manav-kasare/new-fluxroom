import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

import {UserDetailsContext} from '../../shared/Context';
import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';
import {createUser, getUserMe} from '../../backend/database/apiCalls';
import CustomToast from '../../shared/CustomToast';

export default function SetUpProfile({route}) {
  const {setUser} = useContext(UserDetailsContext);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const isUsernameValid = (q) => {
    return /^[a-z0-9_-]{3,15}$/.test(q);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await auth()
        .currentUser.updateProfile({
          displayName: username,
          photoURL: profilePhoto,
        })
        .then(() => {
          createUser({
            username: username,
            description: description,
          }).then((response) => {
            if (response.error) {
              setLoading(false);
              console.log(response.error);
            } else {
              getUserMe(response.token[0].token).then((data) => {
                storeData({...data, token: response.token[0].token});
                setUser({...data, token: response.token[0].token});
                setLoading(false);
              });
            }
          });
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const pickImage = () => {
    const options = {
      title: 'Select Image',
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else {
        // updateProfilePhoto(id, result.uri).then(() => {
        setProfilePhoto(response.uri);
        // });
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const anon = () => {};

  return (
    <KeyboardAwareScrollView
      style={{width: constants.width, height: constants.height}}
      keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            width: constants.width,
            height: constants.height,
            backgroundColor: 'white',
          }}>
          <SafeAreaView
            style={{
              flex: 1,
              marginBottom: 50,
              backgroundColor: '#4640C1',
            }}>
            <Image
              style={{
                width: constants.width,
                marginVertical: 30,
                height: constants.height * 0.2,
              }}
              resizeMode="contain"
              source={require('/Users/manav/projects/fluxroom/assets/setup_profile.png')}
            />

            <View
              style={{
                flex: 1,
                width: constants.width,
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 25,
                backgroundColor: 'white',
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
              }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100 / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: profilePhoto === null ? '#4640C1' : 'white',
                  marginBottom: 10,
                  borderWidth: 0.3,
                  borderColor: 'grey',
                }}
                onPress={pickImage}>
                {profilePhoto === null ? (
                  <Feather name="camera" size={20} color="white" />
                ) : (
                  <Image
                    style={{
                      width: 97,
                      height: 97,
                      borderRadius: 97 / 2,
                    }}
                    source={{
                      uri: profilePhoto,
                    }}
                  />
                )}
              </TouchableOpacity>
              <View style={globalStyles.input}>
                <FontAwesome5
                  name="user-alt"
                  size={18}
                  color={
                    isUsernameValid(username) ? constants.primary : 'crimson'
                  }
                />
                <TextInput
                  autoFocus={true}
                  style={globalStyles.textInput}
                  placeholder="Username"
                  placeholderTextColor="grey"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  autoCapitalize="none"
                />
              </View>
              <View style={globalStyles.input}>
                <MaterialIcons
                  name="description"
                  size={20}
                  color={
                    description.length <= 150 ? constants.primary : 'crimson'
                  }
                />
                <TextInput
                  style={globalStyles.textInput}
                  placeholder="Description"
                  placeholderTextColor="grey"
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 10,
                    color: description.length <= 150 ? 'dodgerblue' : 'crimson',
                  }}>
                  [ {description.length} / 150 ]
                </Text>
              </View>
              {loading ? (
                <View
                  style={{
                    height: 50,
                    width: constants.width * 0.8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 25,
                  }}>
                  <ActivityIndicator color="#0d0c0a" size="small" />
                </View>
              ) : (
                <TouchableOpacity
                  style={globalStyles.button}
                  onPress={isUsernameValid(username) ? handleSubmit : anon}>
                  <Text style={globalStyles.buttonText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
