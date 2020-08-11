import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {UserDetailsContext} from '../../shared/Context';
import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';
import {
  updateUsernameDescription,
  checkIfUsernameIsRegistered,
} from '../../backend/database/apiCalls';
import CustomToast from '../../shared/CustomToast';

export default function SetUpProfile({route}) {
  const {user, setUser} = useContext(UserDetailsContext);
  // const {id} = route.params;
  const id = 'ksnfdkaf';
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const position = useState(new Animated.Value(constants.width))[0];
  const [isUsernameRegistered, setIsUsernameRegistered] = useState(false);

  useEffect(() => {
    Animated.spring(position, {
      bounciness: 5,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const ifUsernameExists = (q) => {
    checkIfUsernameIsRegistered(q).then((responseText) => {
      if (responseText === 'exists') {
        setIsUsernameRegistered(true);
      } else {
        setIsUsernameRegistered(false);
      }
    });
  };

  const isUsernameValid = (q) => {
    return /^[a-z0-9_-]{3,15}$/.test(q);
  };

  const handleSubmit = () => {
    ifUsernameExists(username);
    if (isUsernameRegistered) {
      CustomToast('Username already in use');
    } else {
      updateUsernameDescription({
        id: id,
        username: username,
        description: description,
      }).then((responseText) => {
        if (responseText === 'success') {
          setUser({
            ...user,
            id: id,
            username: username,
            description: description,
          });
        }
      });
    }
  };

  // Picking image from image picker
  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // if (!result.cancelled) {
    //   updateProfilePhoto(id, result.uri).then(() => {
    //     setProfilePhoto(result.uri);
    //   });
    // }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
        <Animated.View
          style={{
            alignSelf: 'center',
            marginTop: 50,
            width: constants.width * 0.9,
            backgroundColor: 'white',
            borderRadius: 10,
            paddingVertical: 25,
            borderColor: 'grey',
            borderWidth: 0.3,
            paddingHorizontal: 25,
            transform: [
              {
                translateX: position,
              },
            ],
            alignItems: 'center',
          }}>
          {profilePhoto === null ? (
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#4640C1',
                marginBottom: 10,
              }}
              onPress={pickImage}>
              <Feather name="camera" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <Image
              style={{
                marginBottom: 10,
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
              }}
              source={{
                uri: profilePhoto,
              }}
            />
          )}
          <Animated.View style={globalStyles.input}>
            <AntDesign name="user" size={20} color={constants.primary} />
            <TextInput
              autoFocus={true}
              style={globalStyles.textInput}
              placeholder="Username"
              placeholderTextColor="grey"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </Animated.View>
          {isUsernameValid(username) ? (
            <></>
          ) : (
            <Text style={globalStyles.error}>Invaliid Username</Text>
          )}
          <Animated.View style={globalStyles.input}>
            <MaterialIcons
              name="description"
              size={20}
              color={description.length <= 150 ? constants.primary : 'crimson'}
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
          </Animated.View>

          <TouchableOpacity
            style={globalStyles.button}
            onPress={isUsernameValid(username) ? handleSubmit : () => {}}>
            <Text style={globalStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
