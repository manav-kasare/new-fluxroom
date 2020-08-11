import React from "react";
import { SafeAreaView, Text, ActivityIndicator } from "react-native";

import constants from "../../shared/constants";

export default function SplashScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.background1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 40,
          fontWeight: "200",
          letterSpacing: 2,
          fontFamily: "Helvetica Neue",
          marginVertical: 25,
        }}
      >
        FLUXROOM
      </Text>
      <ActivityIndicator size="small" color="white" />
    </SafeAreaView>
  );
}
