import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Appbar } from "react-native-paper";

import constants from "../../../shared/constants";

export default function JoinRoom({ navigation }) {
  const [link, setLink] = React.useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: constants.background1 }}>
        <Appbar.Header style={constants.header}>
          <Appbar.Content title="Join Room" titleStyle={constants.headerText} />
          <Appbar.Action
            icon="menu"
            color={constants.background2}
            onPress={() => navigation.openDrawer()}
          />
        </Appbar.Header>
        <View
          style={{
            flex: 1,
            paddingVertical: 25,
            paddingHorizontal: 25,
            backgroundColor: constants.background1,
          }}
        >
          <Text
            style={{
              color: constants.text1,
              fontSize: 24,
              fontWeight: "400",
              fontFamily: "Helvetica",
              marginBottom: 15,
            }}
          >
            Paste the link here.
          </Text>
          <View style={{ alignItems: "center" }}>
            <TextInput
              placeholder="Link"
              placeholderTextColor="grey"
              value={link}
              onChangeText={(text) => setLink(text)}
              style={constants.input}
            />
            <TouchableOpacity
              style={{
                width: constants.width * 0.75,
                height: 45,
                backgroundColor: constants.background2,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                marginTop: 5,
              }}
            >
              <Text style={{ color: constants.text2 }}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
