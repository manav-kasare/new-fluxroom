import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Share,
  Linking,
} from 'react-native';
import {ThemeContext} from '../../../shared/Context';

export default function ShareRoomLink({route, navigation}) {
  const {constants} = React.useContext(ThemeContext);
  const {room, id} = route.params;
  const [url, setUrl] = React.useState(null);

  React.useEffect(() => {
    console.log(room);
    setUrl(`fluxroom://app/home/rooms/join/${room.id}`);
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
    navigation.navigate('ChatRoomNavigator', {
      screen: 'Room',
      params: {room: room},
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: constants.background1}}>
      <View
        style={{
          flex: 1,
          marginTop: 50,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 25,
            color: constants.text1,
            fontWeight: '700',
            marginBottom: 10,
            fontFamily: 'Helvetica',
          }}>
          {room.name}
        </Text>
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
            backgroundColor: constants.background4,
          }}
        />
        <TouchableOpacity
          style={{
            width: constants.width * 0.8,
            height: 50,
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginHorizontal: 10,
            backgroundColor: constants.primary,
          }}
          onPress={shareLink}>
          <Text
            style={{
              fontFamily: 'Helvetica',
              color: constants.text2,
              fontSize: 15,
            }}>
            Share Link
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: constants.width * 0.8,
            height: 50,
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginHorizontal: 10,
            backgroundColor: constants.primary,
          }}
          onPress={handleContinue}>
          <Text
            style={{
              fontFamily: 'Helvetica',
              color: constants.text2,
              fontSize: 15,
            }}>
            Continue to {room.name}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
