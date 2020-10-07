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
  Appearance,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import {ActivityIndicator} from 'react-native-paper';

import {UserDetailsContext, TokenContext} from '../../shared/Context';
import constants from '../../shared/constants';
import globalStyles from '../../shared/GlobalStyles';
import {createUser} from '../../backend/database/apiCalls';
import {CustomErrorToast} from '../../shared/CustomToast';
import {storeToken} from '../../shared/KeyChain';
import {storeUserData, storeTheme} from '../../shared/AsyncStore';
import CachedImage from '../../shared/CachedImage';
import {firebase} from '@react-native-firebase/messaging';

const colorScheme = Appearance.getColorScheme();

export default function SetUpProfile({route}) {
  const {setUser} = useContext(UserDetailsContext);
  const {setToken} = useContext(TokenContext);
  const {phoneNumber, phoneData} = route.params;
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState(null);

  React.useEffect(() => {
    getFCMToken();
  }, []);

  const getFCMToken = () => {
    firebase
      .messaging()
      .getToken()
      .then((token) => {
        setFcmToken(token);
      });
  };

  const isUsernameValid = (q) => {
    return /^[a-z0-9_-]{3,15}$/.test(q);
  };

  const phoneSignUp = () => {
    setLoading(true);
    try {
      createUser({
        username: username,
        phone: phoneNumber,
        notificationID: fcmToken,
        phoneData: phoneData,
        description: description,
        profilePic: profilePhoto,
      }).then((response) => {
        console.log('[Create User response]', response);
        if (response.error) {
          ReactNativeHapticFeedback.trigger('notificationError', options);
          setLoading(false);
          if (response.error.code === 11000) {
            CustomErrorToast('Username Already taken');
          } else {
            CustomErrorToast('An unexpected error occured');
          }
        } else {
          storeToken(response.user._id, response.token[0].token).then(() => {
            setToken(response.token[0].token);
            storeUserData(response.user);
            storeTheme(colorScheme);
            setUser(response.user);
            ReactNativeHapticFeedback.trigger('notificationSuccess', options);
            setLoading(false);
          });
        }
      });
    } catch (e) {
      setLoading(false);
      ReactNativeHapticFeedback.trigger('notificationError', options);
      CustomErrorToast('An Error Occured !');
    }
  };

  const handleSubmit = () => {
    phoneSignUp();
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              backgroundColor: '#03449e',
            }}>
            <Image
              style={{
                width: constants.width,
                marginVertical: 30,
                height: constants.height * 0.2,
              }}
              resizeMode="contain"
              source={require('../../assets/setup_profile.webp')}
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
                  backgroundColor: profilePhoto === null ? '#03449e' : 'white',
                  marginBottom: 10,
                  borderWidth: 0.3,
                  borderColor: 'grey',
                }}
                onPress={pickImage}>
                {profilePhoto === null ? (
                  <Feather name="camera" size={20} color="white" />
                ) : (
                  <CachedImage
                    style={{
                      width: 97,
                      height: 97,
                      borderRadius: 97 / 2,
                    }}
                    uri={profilePhoto}
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
              <TouchableOpacity
                style={globalStyles.button}
                onPress={isUsernameValid(username) ? handleSubmit : anon}>
                {loading ? (
                  <ActivityIndicator
                    color="white"
                    size="small"
                    animating={true}
                  />
                ) : (
                  <Text style={globalStyles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
