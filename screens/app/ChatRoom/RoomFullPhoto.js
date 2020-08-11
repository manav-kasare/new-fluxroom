import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import constants from '../../../shared/constants';
import CachedImage from '../../../shared/CachedImage';

export default function RoomFullPhoto({navigation, route}) {
  const {url} = route.params;
  const [isHost, setIsHost] = useState(true);

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // if (!result.cancelled) {
    //   setImage(result.uri);
    // }
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
      <StatusBar backgroundColor={constants.background3} barStyle="default" />
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
