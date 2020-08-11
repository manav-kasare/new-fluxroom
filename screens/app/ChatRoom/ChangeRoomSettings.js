import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  View,
  TextInput,
  Text,
} from "react-native";
import { Appbar } from "react-native-paper";

import constants from "../../../shared/constants";

export default function ChangeRoomSettings({ route, navigation }) {
  const { room } = route.params;
  const [roomDetails, setRoomDetails] = React.useState(room);
  const [editingDescription, setEditingDescription] = React.useState(false);

  const handleSumbit = () => {};

  return (
    <SafeAreaView style={constants.screen}>
      {/* <Appbar.Header style={constants.header}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          title="Edit"
          titleStyle={constants.headerText}
          style={{
            position: "absolute",
            left: constants.width * 0.4,
          }}
        />
        {editingDescription ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 10,
              top: 20,
            }}
            onPress={handleSumbit}
          >
            <Appbar.Content
              title="Submit"
              titleStyle={{ color: "dodgerblue", fontSize: 20 }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </Appbar.Header> */}
      <View style={{ flex: 1, alignItems: "center", paddingVertical: 25 }}>
        <TouchableWithoutFeedback onPress={() => console.log("Pressed")}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: constants.height * 0.15,
                height: constants.height * 0.15,
                borderRadius: (constants.height * 0.15) / 2,
                borderWidth: 1,
                borderColor: constants.background2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
            </View>
            <Text style={{ color: "dodgerblue", fontSize: 25, marginTop: 25 }}>
              Edit
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            width: constants.width,
            height: constants.height * 0.075,
            marginTop: 30,
            backgroundColor: constants.background4,
            paddingHorizontal: 20,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: constants.lineColor,
            borderBottomWidth: 0.2,
            borderTopWidth: 0.2,
          }}
        >
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
              setRoomDetails({ ...room, description: text })
            }
            onFocus={() => setEditingDescription(!editingDescription)}
            onBlur={() => setEditingDescription(!editingDescription)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
