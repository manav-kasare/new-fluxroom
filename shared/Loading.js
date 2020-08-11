import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Modal,
  View,
  Text,
} from "react-native";

export default function Loading({ isLoading }) {
  return (
    <Modal visible={isLoading} transparent={true}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.8)",
        }}
      >
        <ActivityIndicator size="small" color="white" />
      </SafeAreaView>
    </Modal>
  );
}
