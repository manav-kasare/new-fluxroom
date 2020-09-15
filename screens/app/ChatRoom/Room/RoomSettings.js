import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ThemeContext, TokenContext} from '../../../../shared/Context';
import CircleAvatar from '../../../../shared/CircleAvatar';
import {CustomErrorToast, CustomToast} from '../../../../shared/CustomToast';
import {updateRoom} from '../../../../backend/database/apiCalls';

export default function RoomSettings({route, navigation}) {
  const {room, setRoom} = route.params;
  const {token} = React.useContext(TokenContext);
  const {constants} = React.useContext(ThemeContext);
  const [copiedText, setCopiedText] = useState('');
  const [descriptionFocus, setDescriptionFocus] = useState(false);
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const link = `fluxroom://room/join/${room._id}`;
  const [_room, _setRoom] = useState(room);

  useEffect(() => {
    if (descriptionFocus) {
      if (room.description !== _room.description) {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              onPress={updateDescription}
              style={{marginRight: 25}}>
              <Text
                style={{
                  color: 'dodgerblue',
                  fontSize: 20,
                }}>
                Done
              </Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={cancelEditing} style={{marginLeft: 10}}>
              <Text
                style={{
                  color: 'dodgerblue',
                  fontSize: 20,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          ),
        });
      }
    } else {
      navigation.setOptions({
        headerRight: () => <></>,
        headerLeft: () => (
          <TouchableOpacity onPress={goBack}>
            {Platform.OS === 'ios' ? (
              <Ionicons name="chevron-back" size={25} color="white" />
            ) : (
              <Ionicons name="arrow-back" size={25} color="white" />
            )}
          </TouchableOpacity>
        ),
      });
    }
  }, [descriptionFocus, _room]);

  const goBack = () => {
    navigation.goBack();
  };

  const cancelEditing = () => {
    Keyboard.dismiss();
    setDescriptionFocus(false);
    _setRoom(room);
  };

  const pickImage = () => {
    const options = {
      title: 'Room Photo',
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        CustomErrorToast('An Error Occured !');
      } else {
        updateRoom(token, room._id, {
          profilePic: response.uri,
        }).then((_response) => {
          if (_response.message === 'Room updated') {
            setRoom({...room, profilePic: response.uri});
            _setRoom({...room, profilePic: response.uri});
            CustomToast('Updated !');
          } else if (_response.message === 'Room does not exist') {
            CustomErrorToast('Room does not exist !');
          }
        });
      }
    });
  };

  const updateDescription = () => {
    Keyboard.dismiss();
    setDescriptionFocus(false);
    setDescriptionLoading(true);
    updateRoom(token, room._id, {description: _room.description}).then(
      (response) => {
        if (response.message === 'Room updated') {
          setRoom({...room, description: _room.description});
          _setRoom({...room, description: _room.description});
          setDescriptionLoading(false);
          CustomToast('Updated !');
        } else if (response.message === 'Room does not exist') {
          setDescriptionLoading(false);
          CustomErrorToast('Room does not exist !');
        }
      },
    );
  };

  const copyText = () => {
    Clipboard.setString(`fluxroom://room/join/${room._id}`);
    fetchCopiedText();
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  return (
    <SafeAreaView style={constants.screen}>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', paddingVertical: 25}}>
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
              uri={_room.profilePic}
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
              // height: 50,
              paddingVertical: 15,
              marginTop: 30,
              backgroundColor: constants.background3,
              paddingLeft: 10,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{color: 'grey', marginRight: 25}}>Description</Text>
            <TextInput
              multiline
              onFocus={() => setDescriptionFocus(true)}
              style={{
                flex: 1,
                marginRight: 75,
                color: constants.text1,
              }}
              value={_room.description}
              onChangeText={(text) => _setRoom({..._room, description: text})}
            />
            {descriptionLoading ? (
              <ActivityIndicator
                size="small"
                sstyle={{position: 'absolute', right: 20}}
                color={constants.background2}
              />
            ) : (
              <MaterialCommunityIcons
                name="pencil"
                style={{
                  position: 'absolute',
                  right: 20,
                }}
                color={constants.background2}
                size={20}
              />
            )}
          </View>
        </View>
        <Text
          style={{
            color: constants.text1,
            marginLeft: 10,
            marginVertical: 10,
            fontSize: 20,
            color: 'grey',
          }}>
          Copy Link
        </Text>
        <TouchableOpacity
          style={{
            width: constants.width,
            height: 50,
            backgroundColor: constants.background3,
            paddingLeft: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={copyText}>
          <Text style={{color: 'grey'}}>{link}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
