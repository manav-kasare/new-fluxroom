import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

import {ThemeContext} from '../../../../shared/Context';
import CircleAvatar from '../../../../shared/CircleAvatar';

export default function ChangeRoomSettings({route, navigation}) {
  const {constants, darkTheme} = React.useContext(ThemeContext);
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
            <CircleAvatar
              size={constants.height * 0.145}
              uri={room.profilePic}
            />
          </TouchableOpacity>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: darkTheme
                ? constants.background3
                : constants.primary,
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
              borderColor: constants.lineColor,
              borderBottomWidth: 0.2,
              borderTopWidth: 0.2,
            }}>
            <Text style={{color: 'grey', marginRight: 25}}>Description</Text>
            <TextInput
              style={{
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
