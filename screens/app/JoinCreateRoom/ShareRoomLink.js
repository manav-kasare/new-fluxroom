import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Share} from 'react-native';
import Modal from 'react-native-modal';

import {ThemeContext} from '../../../shared/Context';
import globalStyles from '../../../shared/GlobalStyles';

export default function ShareRoomLink({
  navigation,
  isVisible,
  room,
  setIsVisible,
}) {
  const {constants} = React.useContext(ThemeContext);
  const [url, setUrl] = React.useState(null);

  React.useEffect(() => {
    console.log('[Shared Room Link]', room._id);
    setUrl(`fluxroom://app/home/rooms/join/${room._id}`);
  }, []);

  const shareLink = () => {
    Share.share(
      {title: 'Room Link', url: url},
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

  const handleContinue = () => {
    setIsVisible(false);
    navigation.navigate('Room', {room: room});
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      deviceWidth={constants.width}
      deviceHeight={constants.height}
      style={{
        width: constants.width * 0.9,
        borderRadius: 10,
        position: 'absolute',
        bottom: 0,
        backgroundColor: constants.background3,
        alignItems: 'center',
        paddingVertical: 25,
      }}
      onBackdropPress={() => setIsVisible(false)}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOut="slideOutDown">
      <View
        style={{
          backgroundColor: 'grey',
          height: 5,
          width: 50,
          alignSelf: 'center',
          borderRadius: 10,
          position: 'absolute',
          top: 10,
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <TextInput
          value={url}
          editable={false}
          style={{
            color: constants.text1,
            width: constants.width * 0.8,
            height: 50,
            fontSize: 12,
            borderRadius: 8,
            marginHorizontal: 10,
            paddingHorizontal: 10,
            marginTop: 15,
            marginBottom: 10,
            backgroundColor: constants.background4,
          }}
        />
        <TouchableOpacity style={globalStyles.button} onPress={shareLink}>
          <Text style={globalStyles.buttonText}>Share Link</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.button} onPress={handleContinue}>
          <Text style={globalStyles.buttonText}>Continue to {room.name}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
