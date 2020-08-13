import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CachedImage from '../../../shared/CachedImage';
import {ThemeContext} from '../../../shared/Context';

export default function RoomFullPhoto({navigation, route}) {
  const {url} = route.params;
  const {constants} = React.useContext(ThemeContext);
  const [isHost, setIsHost] = useState(true);

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
        setImage(response.uri);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const editButton = () => {
    if (isHost) {
      return (
        <TouchableOpacity onPress={pickImage}>
          <Text
            style={{
              color: constants.text1,
              fontSize: 20,
              textDecorationLine: 'underline',
            }}>
            Edit
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View
      style={{
        backgroundColor: constants.background3,
        flex: 1,
      }}>
      <SafeAreaView
        style={{width: constants.width, height: constants.height * 0.05}}
      />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: constants.background1,
        }}>
        <View
          style={{
            width: constants.width,
            height: 50,
            backgroundColor: constants.background3,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
            paddingRight: 25,
          }}>
          <TouchableOpacity
            style={{paddingLeft: 10}}
            onPress={() => navigation.goBack()}>
            <Ionicons name="md-arrow-round-back" size={30} color="white" />
          </TouchableOpacity>
          <View>{editButton()}</View>
        </View>
        {url && (
          <CachedImage
            source={url}
            style={{
              width: constants.width,
              height: constants.height * 0.4,
              marginTop: constants.height * 0.2,
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
