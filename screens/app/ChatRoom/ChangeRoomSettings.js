import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

import {ThemeContext} from '../../../shared/Context';

export default function ChangeRoomSettings({route, navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {room} = route.params;
  const [roomDetails, setRoomDetails] = React.useState(room);
  const [editingDescription, setEditingDescription] = React.useState(false);

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
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={constants.screen}>
        <View style={{flex: 1, alignItems: 'center', paddingVertical: 25}}>
          <TouchableOpacity
            style={{
              width: constants.height * 0.15,
              height: constants.height * 0.15,
              borderRadius: (constants.height * 0.15) / 2,
              borderWidth: 1,
              borderColor: constants.background2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={pickImage}>
            <Image
              style={{
                width: constants.height * 0.145,
                height: constants.height * 0.145,
                borderRadius: (constants.height * 0.145) / 2,
              }}
              source={{
                uri: `https://images.unsplash.com/photo-1596461097642-b697ec879ced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: constants.primary,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              bottom: 25,
              left: 25,
            }}>
            <MaterialCommunityIcons size={20} color="white" name="camera" />
          </View>
          <View
            style={{
              width: constants.width,
              height: 50,
              marginTop: 30,
              backgroundColor: constants.background3,
              paddingHorizontal: 20,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderColor: constants.lineColor,
              borderBottomWidth: 0.2,
              borderTopWidth: 0.2,
            }}>
            <TextInput
              placeholder="Description"
              placeholderTextColor={constants.text1}
              style={{
                width: constants.width * 0.7,
                height: 40,
                color: constants.text1,
              }}
              value={roomDetails.description}
              onChangeText={(text) =>
                setRoomDetails({...room, description: text})
              }
              onFocus={() => setEditingDescription(!editingDescription)}
              onBlur={() => setEditingDescription(!editingDescription)}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
