import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Share,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ThemeContext, TokenContext} from '../../../../shared/Context';
import CircleAvatar from '../../../../shared/CircleAvatar';
import {CustomErrorToast, CustomToast} from '../../../../shared/CustomToast';
import {updateRoom} from '../../../../backend/database/apiCalls';
import {ActivityIndicator} from 'react-native-paper';

export default function RoomSettings({route, navigation}) {
  const {description, id, profilePic} = route.params;
  const {token} = React.useContext(TokenContext);
  const {constants} = React.useContext(ThemeContext);
  const [descriptionFocus, setDescriptionFocus] = useState(false);
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const [loadingProfilePic, setLoadingProfilePic] = useState(false);
  const link = `fluxroom://room/join/${id}`;

  const [_description, _setDescription] = useState(description);
  const [_profilePic, _setProfilePic] = useState(profilePic);

  useEffect(() => {
    if (descriptionFocus) {
      if (_description !== description) {
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
  }, [descriptionFocus]);

  const goBack = () => {
    navigation.goBack();
  };

  const cancelEditing = () => {
    Keyboard.dismiss();
    setDescriptionFocus(false);
    _setDescription(description);
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
        setLoadingProfilePic(true);
        updateRoom(token, id, {
          profilePic: response.uri,
        }).then((_response) => {
          setLoadingProfilePic(false);
          if (_response.message === 'Room updated') {
            _setProfilePic(response.uri);
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
    updateRoom(token, id, {description: _description}).then((response) => {
      if (response.message === 'Room updated') {
        setDescriptionLoading(false);
        CustomToast('Updated !');
      } else if (response.message === 'Room does not exist') {
        setDescriptionLoading(false);
        CustomErrorToast('Room does not exist !');
      }
    });
  };

  const shareLink = () => {
    Share.share(
      {title: 'Room Link', url: link},
      {
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToWeibo',
          'com.apple.UIKit.activity.Print',
          'com.apple.UIKit.activity.AssignToContact',
          'com.apple.UIKit.activity.SaveToCameraRoll',
          'com.apple.UIKit.activity.AddToReadingList',
          'com.apple.UIKit.activity.PostToFlickr',
          'com.apple.UIKit.activity.PostToVimeo',
          'com.apple.UIKit.activity.PostToTencentWeibo',
          'com.apple.UIKit.activity.AirDrop',
          'com.apple.UIKit.activity.OpenInIBooks',
          'com.apple.UIKit.activity.MarkupAsPDF',
          'com.apple.reminders.RemindersEditorExtension',
          'com.apple.mobilenotes.SharingExtension',
          'com.apple.mobileslideshow.StreamShareService',
          'com.linkedin.LinkedIn.ShareExtension',
          'pinterest.ShareExtension',
          'com.google.GooglePlus.ShareExtension',
          'com.tumblr.tumblr.Share-With-Tumblr',
          'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
        ],
      },
    );
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
              uri={_profilePic}
              type="room"
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
            {loadingProfilePic ? (
              <ActivityIndicator color="white" animating={true} />
            ) : (
              <MaterialCommunityIcons size={20} color="white" name="camera" />
            )}
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
              value={_description}
              onChangeText={(text) => _setDescription(text)}
            />
            {descriptionLoading ? (
              <ActivityIndicator
                color={constants.primary}
                size="small"
                animating={true}
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
          }}>
          Share Link
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
          onPress={shareLink}>
          <Text style={{color: 'grey'}}>{link}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
