import {Linking} from 'react-native';
// import * as ImagePicker from "expo-image-picker";
// import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";

export const PickImage = async () => {
  // if (Constants.platform.ios) {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (status === "granted") {
  //     try {
  //       let result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.All,
  //         allowsEditing: true,
  //         aspect: [4, 3],
  //         quality: 1,
  //       });
  //       if (!result.cancelled) {
  //         return result.uri;
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   } else {
  //     Linking.openURL("app-settings");
  //   }
  // }
};
