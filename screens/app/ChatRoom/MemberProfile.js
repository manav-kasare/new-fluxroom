import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";

import constants from "../../../shared/constants";

export default function MemberProfile({ visible }) {
  const [modalVisible, setModalVisible] = useState(visible);
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.75)" }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: constants.width * 0.1,
            marginVertical: constants.height * 0.1,
            backgroundColor: "#ecf3f9",
            borderRadius: 25,
            padding: 25,
          }}
        >
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ color: "white" }}>Modal</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
