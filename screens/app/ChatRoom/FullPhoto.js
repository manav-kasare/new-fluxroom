import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import CachedImage from '../../../shared/CachedImage';
import {ThemeContext} from '../../../shared/Context';

export default function FullPhoto({navigation, route}) {
  const {uri} = route.params;
  const [_uri, setUri] = useState(uri);
  const {constants} = React.useContext(ThemeContext);
  const [isHost, setIsHost] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={pickImage} style={{marginRight: 25}}>
          <Text
            style={{
              color: constants.text1,
              fontSize: 20,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

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
        setUri(response.uri);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: constants.background1,
      }}>
      <CachedImage
        uri={_uri}
        style={{
          width: constants.width,
          height: constants.height * 0.4,
          marginTop: constants.height * 0.2,
        }}
        itemName="tileAvatar"
      />
    </SafeAreaView>
  );
}
